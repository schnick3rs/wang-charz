<template>
  <v-row justify="center">
    <v-progress-circular v-if="!species" indeterminate color="success" size="128" width="12" />

    <v-col v-if="species" :xs="12">
      <species-preview
        :species="species"
        manage-mode
        @changeSpecies="doChangeSpeciesMode"
        @changeChapter="updateAstartesChapter"
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
    characterSpeciesLabel() {
      return this.$store.getters['characters/characterSpeciesLabelById'](this.characterId);
    },
    characterSpeciesAstartesChapter() {
      return this.$store.getters['characters/characterSpeciesAstartesChapterById'](this.characterId);
    },
  },
  watch: {
    characterSpeciesLabel: {
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
  mounted() {
  },
  methods: {
    async getSpecies(name) {
      this.loading = true;
      const slug = this.textToKebab(name);
      const { data } = await this.$axios.get(`/api/species/${slug}`);
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
  },
};
</script>

<style scoped>

</style>
