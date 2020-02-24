<template>
  <div>
    <dod-default-breadcrumbs :items="breadcrumbItems" />

    <v-row justify="center">

      <v-dialog
        v-model="attributeDialog"
        width="600px"
        scrollable
        :fullscreen="$vuetify.breakpoint.xsOnly"
      >
        <v-card>
          <v-card-title style="background-color: #262e37; color: #fff;">
            Select Attribute modification
            <v-spacer />
            <v-icon dark @click="attributeDialog = false">close</v-icon>
          </v-card-title>
          <v-card-text class="pt-4">
            <v-select
              dense outlined
              v-model="statKey"
              :items="[...attributeRepository, ...traitRepository].filter((i)=>i.key !== 'speed')"
              item-text="name"
              item-value="key"
            ></v-select>

            <v-text-field
              v-model="statValue"
              label="Modification"
              type="number"
              dense outlined
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn color="error" @click="attributeDialog = false">Cancel</v-btn>
            <v-spacer />
            <v-btn color="success" @click="addModification">Add modification</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
        v-model="abilityDialog"
        width="600px"
        scrollable
        :fullscreen="$vuetify.breakpoint.xsOnly"
      >
        <v-card>
          <v-card-title style="background-color: #262e37; color: #fff;">
            Create Ability
            <v-spacer />
            <v-icon dark @click="abilityDialog = false">
              close
            </v-icon>
          </v-card-title>
          <v-card-text class="pt-4">
            <v-text-field v-model="featureName" label="Name" dense outlined required></v-text-field>
            <v-textarea v-model="featureSnippet" label="Effect" dense outlined required></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-btn color="error" @click="abilityDialog = false">Cancel</v-btn>
            <v-spacer />
            <v-btn color="success" @click="addAbility">Add ability</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-col :cols="12">

        <v-card v-if="species">
          <v-card-title></v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pt-4">
            <v-row>
              <v-col :cols="12" :sm="4"><v-text-field v-model="species.name" label="Species Name" dense outlined></v-text-field></v-col>
              <v-col :cols="12" :sm="4">
                <v-select
                  label="Species Variant"
                  dense outlined
                  v-model="species.variant"
                  :items="speciesVariants"
                  item-text="name"
                  item-value="key"
                  hint="Select a species variant, to allow this species access to the respective Archeytypes."
                  persistent-hint
                ></v-select>
              </v-col>
              <v-col :cols="12" :sm="4">
                <v-select
                  label="Group / Faction"
                  dense outlined
                  v-model="species.group"
                  :items="groupOptions"
                  item-text="name"
                  item-value="name"
                  hint="Select a Group or Faction"
                  persistent-hint
                ></v-select>
              </v-col>
              <v-col><v-text-field v-model="species.cost" label="BP Cost" dense outlined></v-text-field></v-col>
              <v-col><v-text-field v-model="species.baseTier" label="Base Tier" dense outlined></v-text-field></v-col>
              <v-col><v-text-field v-model="species.speed" label="Speed" dense outlined></v-text-field></v-col>
            </v-row>
            <div>
              <h5>Abilities</h5>
              <div v-for="feature in species.speciesFeatures">
                <p v-if="feature.modifications"><strong>{{ feature.name }}:</strong>
                  <span v-for="m in feature.modifications">{{`${m.targetValue} ${m.modifier>0?'+':''}${m.modifier}`}}
                    <v-icon color="error" small @click="removeModification(m.targetValue)">remove_circle</v-icon>, </span>
                </p>
                <p v-else><strong>{{ feature.name }}:</strong> {{ feature.snippet }} <v-icon color="error" small @click="removeAbility(feature.name)">remove_circle</v-icon></p>
              </div>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            <v-btn outlined small color="primary" @click="openModificationDialog">Open Modification Editor</v-btn>
            <v-btn outlined small color="primary" @click="abilityDialog = true">Open Ability Editor</v-btn>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" small @click="addCustomSpecies">Save Species</v-btn>
          </v-card-actions>
        </v-card>

      </v-col>

      <v-col :cols="12">
        <v-card class="mt-2">
          <v-card-text>
            <pre>{{species}}</pre>
          </v-card-text>
        </v-card>

      </v-col>
    </v-row>
  </div>
</template>

<script>
import SluggerMixin from '~/mixins/SluggerMixin';
import StatRepositoryMixin from '~/mixins/StatRepositoryMixin';
import DodDefaultBreadcrumbs from '~/components/DodDefaultBreadcrumbs';

export default {
  name: 'Edit',
  components: {
    DodDefaultBreadcrumbs,
  },
  mixins: [
    SluggerMixin,
    StatRepositoryMixin,
  ],
  asyncData({ params }) {
    return {
      speciesKey: params.key,
      breadcrumbItems: [
        { text: '', disabled: false, nuxt: true, exact: true, to: '/' },
        { text: 'Forge', disabled: false, nuxt: true, exact: true, to: '/forge/my-characters' },
        { text: 'Species', disabled: false, nuxt: true, exact: true, to: '/forge/species' },
        { text: 'Some fancy name', disabled: false, nuxt: true, exact: true, to: '' },
      ]
    };
  },
  data() {
    return {
      loading: false,
      showAbilityEditor: true,
      showAttributeEditor: true,
      statKey: '',
      statValue: 0,
      featureName: '',
      featureSnippet: '',
      attributeDialog: false,
      abilityDialog: false,
      species: undefined,
      groupOptions: [
        { name: 'Other' },
        { name: 'Mankind' },
        { name: 'Aeldari' },
        { name: 'Orks' },
        { name: 'Chaos' },
        { name: 'Necrons' },
        { name: 'Tau' },
        { name: 'Tyranids' },
      ],
      speciesVariants: [
        { key: '', name: 'No Variant', source: '' },
        { key: 'core-human', name: 'Human', source: 'core' },
        { key: 'core-eldar', name: 'Eldar', source: 'core' },
        { key: 'core-ork', name: 'Ork', source: 'core' },
        { key: 'core-adeptus-astartes', name: 'Adeptus Astartes', source: 'core' },
        { key: 'core-primaris-astartes', name: 'Primaris Astartes', source: 'core' },
      ],
    };
  },
  computed: {
    speciesListener() {
      return this.$store.getters['species/getSpecies'](this.speciesKey);
    }
  },
  watch: {
    speciesListener: {
      handler(newVal) {
        if (newVal) {
          this.loadSpecies(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
  },
  methods: {
    loadSpecies() {
      const species = this.$store.getters['species/getSpecies'](this.speciesKey);
      this.species = JSON.parse(JSON.stringify(species));
    },
    openModificationDialog() {
      this.attributeDialog = true;
    },
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
        modifier: parseInt(this.statValue),
      };
      currentAttributeMod.modifications.push(modification);
      currentAttributeMod.snippet = currentAttributeMod.modifications.map((m) => `${m.targetValue} ${m.modifier>0?'+':''}${m.modifier}`).join(', ');
      this.attributeDialog = false;
    },
    removeModification(key) {
      let currentAttributeMod = this.species.speciesFeatures.find((f) => f.name === 'Attribute Modifications');
      if (currentAttributeMod) {
        currentAttributeMod.modifications = currentAttributeMod.modifications.filter((m)=>m.targetValue !== key);
      }
      if (currentAttributeMod.modifications.length<=0) {
        this.species.speciesFeatures = this.species.speciesFeatures.filter((f) => f.name !== 'Attribute Modifications');
      } else {
        currentAttributeMod.snippet = currentAttributeMod.modifications.map((m) => `${m.targetValue} ${m.modifier>0?'+':''}${m.modifier}`).join(', ');
      }
    },
    addCustomSpecies() {
      const key = this.speciesKey;
      const species = this.species;
      species.key = key;

      this.$store.commit('species/update', { key, species });

      this.$router.push({
        name: 'forge-species',
      });
    },
    addAbility() {
      const ability = {
        name: this.featureName,
        snippet: this.featureSnippet,
      };
      this.species.speciesFeatures.push(ability);
      this.featureName  = '';
      this.featureSnippet  = '';
      this.abilityDialog = false;
    },
    removeAbility(abilityName){
      this.species.speciesFeatures = this.species.speciesFeatures.filter((f) => f.name !== abilityName);
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
  },
};
</script>

<style scoped>

</style>
