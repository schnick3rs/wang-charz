<template>
  <v-row justify="center">

    <v-col :xs="12">

      <v-card>
        <v-card-title></v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pt-4">
          <v-text-field v-model="species.name" label="Name" dense outlined></v-text-field>
          <v-text-field v-model="species.cost" label="BP Cost" dense outlined></v-text-field>
          <v-text-field v-model="species.baseTier" label="Base Tier" dense outlined></v-text-field>
          <v-text-field v-model="species.speed" label="Speed" dense outlined></v-text-field>
          <div>
            <h5>Abilities</h5>
            <div v-for="feature in species.speciesFeatures">
              <p v-if="feature.modifications"><strong>{{ feature.name }}</strong>
                {{ feature.modifications.map((m)=>`${m.targetValue} ${m.modifier>0?'+':''}${m.modifier}`).join(', ') }}
              </p>
              <p v-else><strong>{{ feature.name }}</strong> {{ feature.snippet }}</p>
            </div>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text v-if="showAttributeEditor">
          <v-row>
            <v-col :cols="7" :sm="8">
              <v-select
                outlined dense
                v-model="statKey"
                :items="[...attributeRepository, ...traitRepository]"
                item-text="name"
                item-value="key"
              ></v-select>
            </v-col>
            <v-col :cols="5" :sm="4">
              <v-text-field
                v-model="statValue"
                label="Modification"
                dense outlined
                append-outer-icon="add_circle"
                @click:append-outer="addModification"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text v-if="showAbilityEditor">
          <v-text-field v-model="featureName" label="Name" dense outlined></v-text-field>
          <v-textarea v-model="featureSnippet" label="Effect" dense outlined></v-textarea>
          <v-btn outlined x-small color="primary" @click="addAbility">Add Ability</v-btn>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" small @click="addCustomSpecies">Save changes</v-btn>
        </v-card-actions>
      </v-card>

    </v-col>
  </v-row>
</template>

<script>
import SluggerMixin from '~/mixins/SluggerMixin';
import StatRepositoryMixin from '~/mixins/StatRepositoryMixin';

export default {
  name: 'Manage',
  components: {},
  mixins: [
    SluggerMixin,
    StatRepositoryMixin,
  ],
  data() {
    return {
      loading: false,
      showAbilityEditor: true,
      showAttributeEditor: true,
      statKey: '',
      statValue: 0,
      featureName: '',
      featureSnippet: '',
      species: {
        name: 'Ad Hoc-iel',
        cost: 0,
        baseTier: 1,
        speed: 6,
        source: {
          book: 'Custom',
          key: 'custom',
        },
        speciesFeatures: [],
      },
    };
  },
  computed: {
    characterSpeciesKey() {
      return this.$store.getters['characters/characterSpeciesKeyById'](this.characterId);
    },
  },
  watch: {
    characterSpeciesKey: {
      handler(newVal) {
        if (newVal) {
          //this.getSpecies(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
  },
  asyncData({ params }) {
    return {
      characterId: params.id,
    };
  },
  methods: {
    addModification() {
      const reps = [...this.attributeRepository, ...this.traitRepository];
      const newModification = reps.find((i) => i.key === this.statKey);
      let currentAttributeMod = this.species.speciesFeatures.find((f) => f.name === 'Attribute Modifications');
      if ( currentAttributeMod === undefined ) {
        this.addAttributes();
        currentAttributeMod = this.species.speciesFeatures.find((f) => f.name === 'Attribute Modifications');
      }
      const modification = {
        targetGroup: newModification.type ? 'traits' : 'attributes',
        targetValue: this.statKey,
        modifier: this.statValue,
      };
      currentAttributeMod.modifications.push(modification);

    },
    addCustomSpecies() {

    },
    addAbility() {
      const ability = {
        name: this.featureName,
        snippet: this.featureSnippet,
      };
      this.species.speciesFeatures.push(ability);
      this.featureName  = '';
      this.featureSnippet  = '';
    },
    addAttributes() {
      const modifications = [];
      const attributeSnippet = '';
      const ability = {
        name:'Attribute Modifications',
        snippet: attributeSnippet,
        modifications: [],
      };
      this.species.speciesFeatures.push(ability);
    },
    resetSpecies() {
      this.selectedSpecies = undefined;
      this.$store.commit('characters/setCharacterSpecies', { id: this.characterId, species: { value: undefined, cost: 0 } });
    },
    doChangeSpeciesMode() {
      this.$router.push({
        name: 'forge-characters-id-builder-species-choose',
        params: { id: this.characterId },
      });
    },
    updateAstartesChapter(chapterName) {
      const content = {
        speciesAstartesChapter: chapterName,
      };
      this.$store.commit('characters/setCharacterSpeciesAstartesChapter', { id: this.characterId, ...content });
    },
    /**
     * clear previous option
     *
     * @param speciesTrait
     */
    setSpeciesTraitOption(speciesTrait) {
      const selectedOption =  speciesTrait.options.find( (o) => o.name === speciesTrait.selected );

      this.$store.commit('characters/clearCharacterEnhancementsBySource', { id: this.characterId, source: `species.${speciesTrait.name}.` });
      // the option has a snippet, that is thus added as a custom ability
      if ( selectedOption.snippet ) {
        const content = {
          modifications: [{
            name: selectedOption.name,
            targetGroup: 'abilities',
            targetValue: '',
            effect: selectedOption.snippet,
          }],
          source: `species.${speciesTrait.name}.${selectedOption.name}`,
        };
        this.$store.commit('characters/addCharacterModifications', { id: this.characterId, content });
      }

      // the selected option has modifications that are saved as such
      if ( selectedOption.modifications ) {
        const content = {
          modifications: selectedOption.modifications,
          source: `species.${speciesTrait.name}.${selectedOption.name}`,
        };
        this.$store.commit('characters/addCharacterModifications', { id: this.characterId, content });
      }
    },
  },
};
</script>

<style scoped>

</style>
