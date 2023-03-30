<template>
  <v-row justify="center">

    <v-col :cols="12">
      <h1 class="headline">
        Select a Species
      </h1>
    </v-col>

    <v-dialog
      v-model="speciesDialog"
      :fullscreen="$vuetify.breakpoint.xsOnly"
      width="600px"
      scrollable
    >
      <species-preview
        v-if="selectedSpecies"
        :character-id="characterId"
        :species="selectedSpecies"
        choose-mode
        @select="selectSpeciesForChar"
        @cancel="speciesDialog = false"
      />
    </v-dialog>

    <v-col cols="12">

      <v-progress-circular v-if="!speciesList" indeterminate color="success" size="128" width="12" />

      <v-card v-if="speciesList">
        <v-list>
          <v-list-item
            v-for="item in speciesList"
            :key="item.key"
            :disabled="item.baseTier > characterSettingTier"
            @click.stop="updatePreview(item)"
          >
            <v-list-item-avatar tile>
              <img :src="getAvatar(item.key)">
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                {{ item.name }}
                <v-chip
                  v-if="item.source && !['core', 'coreab'].includes(item.source.key)"
                  color="info"
                  outlined
                  tags
                  x-small
                  label
                >
                  {{item.source.key.toUpperCase()}}
                </v-chip>
              </v-list-item-title>
              <v-list-item-subtitle>{{ item.hint }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action class="d-none d-sm-inline">
              <v-chip pill color="green" text-color="white">
                <v-avatar left class="green darken-4">
                  {{ item.cost }}
                </v-avatar>
                XP
              </v-chip>
            </v-list-item-action>

            <v-list-item-action class="d-none d-sm-inline" v-if="false">
              <v-chip pill color="red" text-color="white">
                <v-avatar left class="red darken-4">
                  {{ item.baseTier }}
                </v-avatar>
                Tier
              </v-chip>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>

      <v-card class="mt-4">
        <v-card-text>
          <p>You can add your own <strong>custom species</strong> <nuxt-link to="/forge/species">here</nuxt-link>. You can then select it here.</p>
        </v-card-text>
      </v-card>

    </v-col>

  </v-row>
</template>

<script>
import SpeciesPreview from '~/components/forge/SpeciesPreview.vue';
import SluggerMixin from '~/mixins/SluggerMixin';

export default {
  name: 'Choose',
  components: {
    SpeciesPreview,
  },
  mixins: [
    SluggerMixin,
  ],
  data() {
    return {
      speciesList: undefined,
      selectedSpecies: undefined, // for he preview dialog box
      speciesDialog: false,
    };
  },
  computed: {
    sources() {
      return [
        'core',
        'fspg',
        'red1',
        'cos',
        // 'tnh',
        ...this.settingHomebrews
      ];
    },
    settingHomebrews() {
      return this.$store.getters['characters/characterSettingHomebrewsById'](this.characterId);
    },
    characterSettingTier() {
      return this.$store.getters['characters/characterSettingTierById'](this.characterId);
    },
    characterAttributes() {
      return this.$store.getters['characters/characterAttributesById'](this.characterId);
    },
    characterSkills() {
      return this.$store.getters['characters/characterSkillsById'](this.characterId);
    },
  },
  watch: {
    sources: {
      handler(newVal) {
        if (newVal) {
          this.getSpeciesList(newVal);
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
    async getSpeciesList(sources) {
      const config = {
        params: {
          source: sources.join(','),
        },
      };
      const { data } = await this.$axios.get('/api/species/', config);
      this.speciesList = data;

      if ( sources.includes('custom') ) {
        const customSpecies = this.$store.getters['species/speciesSets'];
        this.speciesList.push(...customSpecies);
      }
    },
    getAvatar(key) {
      return `/img/avatars/species/${key}.png`;
    },
    async updatePreview(item) {
      const slug = this.camelToKebab(item.key);
      if ( item.key.startsWith('custom-')) {
        const speciesDetails = this.$store.getters['species/getSpecies'](item.key);
        this.selectedSpecies = speciesDetails;
      } else {
        const speciesDetails = await this.$axios.get(`/api/species/${slug}`);
        this.selectedSpecies = speciesDetails.data;
      }
      this.speciesDialog = true;
    },
    selectSpeciesForChar(species) {

      // TODO ensure attributes and skills
      if (species.prerequisites) this.ensurePrerequisites(species.prerequisites);

      let modifications = [];
      species.speciesFeatures
        .filter( (t) => t.modifications !== undefined )
        .forEach( (t) => {
          modifications = [ ...modifications, ...t.modifications ];
        });

      this.$store.commit('characters/clearCharacterEnhancementsBySource', { id: this.characterId, source: 'species' });
      this.$store.commit('characters/setCharacterSpecies', { id: this.characterId, species: { key: species.key, label: species.name, cost: species.costs.species } });
      this.$store.commit('characters/setCharacterModifications', { id: this.characterId, content: { modifications: modifications, source: 'species' } });

      this.$store.commit('characters/clearCharacterKeywordsBySource', { id: this.characterId, source: 'species' });
      modifications.filter( (m) => m.targetGroup === 'keywords' ).forEach( (k) => {
        const payload = {
          name: k.targetValue,
          source: 'species',
          type: 'keyword',
          replacement: undefined,
        };
        this.$store.commit('characters/addCharacterKeyword', { id: this.characterId, keyword: payload });
      });

      this.$store.commit('characters/clearCharacterPsychicPowersBySource', { id: this.characterId, source: 'species' });
      const featuresWithPowers = species.speciesFeatures.filter( (f) => f.psychicPowers !== undefined);
      if ( featuresWithPowers ) {
        featuresWithPowers.forEach( (feature) => {
          feature.psychicPowers.forEach( (powerSelections) => {
            if ( powerSelections.selected ) {
              const payload = {
                id: this.characterId,
                name: powerSelections.selected,
                cost: 0,
                source: `species.${powerSelections.selected.name}`,
              };
              this.$store.commit('characters/addCharacterPsychicPower', payload);
            }
          });
        });
      }

      this.speciesDialog = false;
      this.$router.push({
        name: 'forge-characters-id-builder-species-manage',
        params: { id: this.characterId },
      });
    },
    openCustomEditor() {
      this.$router.push({
        name: 'forge-characters-id-builder-species-edit',
        params: { id: this.characterId, speciesKey: undefined },
      });
    },
    ensurePrerequisites(prerequisites) {
      const id = this.characterId;

      if (prerequisites && prerequisites.length > 0) {
        prerequisites.forEach((prerequisite) => {
          // { group: 'attributes', value: 'willpower', threshold: 3, }
          switch (prerequisite.group) {
            case 'attributes':
              const attributeValue = this.characterAttributes[prerequisite.value];
              if (attributeValue < prerequisite.threshold) {
                this.$store.commit('characters/setCharacterAttribute', { id, payload: { key: prerequisite.value, value: prerequisite.threshold } });
              }
              break;
            case 'skills':
              const skillValue = this.characterSkills[prerequisite.value];
              if (skillValue < prerequisite.threshold) {
                this.$store.commit('characters/setCharacterSkill', { id, payload: { key: prerequisite.value, value: prerequisite.threshold } });
              }
              break;
          }
        });
      }
    },
  },
};
</script>

<style scoped>

</style>
