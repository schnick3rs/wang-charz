<template>

  <v-row justify="center">

    <v-overlay :value="!species" dark opacity="0.3">
      <v-progress-circular v-if="!species" indeterminate color="success" size="128" width="12"></v-progress-circular>
    </v-overlay>

    <v-col v-if="species" v-bind:xs="12">
      <species-preview
        v-bind:species="species"
        v-on:changeSpecies="doChangeSpeciesMode"
        v-on:changeChapter="updateAstartesChapter"
        manageMode
      />
    </v-col>

  </v-row>

</template>

<script>
import SpeciesPreview from '~/components/forge/SpeciesPreview.vue';

export default {
  name: "manage",
  components: {
    SpeciesPreview,
  },
  asyncData({ params }) {
    return {
      characterId: params.id,
    };
  },
  data() {
    return {
      loading: false,
      species: undefined,
    };
  },
  mounted() {
  },
  watch: {
    'characterSpeciesLabel': {
      handler (newVal) {
        if ( newVal ) {
          this.getSpecies(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
  },
  computed: {
    characterSpeciesLabel() {
      return this.$store.getters['characters/characterSpeciesLabelById'](this.characterId);
    },
    characterSpeciesAstartesChapter() {
      return this.$store.getters['characters/characterSpeciesAstartesChapterById'](this.characterId);
    },
  },
  methods: {
    async getSpecies(name) {
      this.loading = true;
      const slug = name.toLowerCase().replace(/\W/gm, '-');
      const {data} = await this.$axios.get(`/api/species/${slug}`)
      const chapter = this.characterSpeciesAstartesChapter;
      if (chapter) {
        data['chapter'] = chapter;
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
        name: `forge-characters-id-builder-species-choose`,
        params: { id: this.characterId }
      });
    },
    updateAstartesChapter(chapterName){
      this.$store.commit('characters/setCharacterSpeciesAstartesChapter', { id: this.characterId, speciesAstartesChapter: chapterName });
    },
  }
}
</script>

<style scoped>

</style>
