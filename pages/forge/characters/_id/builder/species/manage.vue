<template>
  <v-row justify="center">
    <v-progress-circular v-if="!species" indeterminate color="success" size="128" width="12" />

    <v-col v-if="species" :xs="12">
      <species-preview
        :species="species"
        manage-mode
        @changeSpecies="doChangeSpeciesMode"
        @changeChapter="updateAstartesChapter"
        @changeSpeciesTraitOption="setSpeciesTraitOption"
      />
    </v-col>
  </v-row>
</template>

<script>
import SpeciesPreview from '~/components/forge/SpeciesPreview.vue';
import SluggerMixin from '~/mixins/SluggerMixin';

export default {
  name: 'Manage',
  components: {
    SpeciesPreview,
  },
  mixins: [
    SluggerMixin,
  ],
  data() {
    return {
      loading: false,
      species: undefined,
    };
  },
  computed: {
    characterSpeciesKey() {
      return this.$store.getters['characters/characterSpeciesKeyById'](this.characterId);
    },
    characterSpeciesAstartesChapter() {
      return this.$store.getters['characters/characterSpeciesAstartesChapterById'](this.characterId);
    },
    enhancements() {
      return this.$store.getters['characters/characterEnhancementsById'](this.characterId);
    },
  },
  watch: {
    characterSpeciesKey: {
      handler(newVal) {
        if (newVal) {
          this.getSpecies(newVal);
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
    getSpecies: async function (key) {
      this.loading = true;
      const { data } = await this.$axios.get(`/api/species/${key}`);
      data.speciesTraits.filter((t) => t.options).forEach((t) => {
        const enhancement = this.enhancements.find((m) => m.source.startsWith(`species.${t.name}`) );
        if ( enhancement ) {
          t.selected = enhancement.source.split('.').pop();
        }
      });
      const chapter = this.characterSpeciesAstartesChapter;
      if (chapter) {
        data.chapter = chapter;
      }
      this.loading = false;
      this.species = data;
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
      this.$store.commit('characters/setCharacterSpeciesAstartesChapter', { id: this.characterId, speciesAstartesChapter: chapterName });
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
