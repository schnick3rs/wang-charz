<template>

  <v-row justify="center">

    <v-progress-circular v-if="!item" indeterminate color="success" size="128" width="12"></v-progress-circular>

    <v-col v-bind:cols="12" v-if="item">

      <archetype-preview
        v-bind:characterId="characterId"
        v-bind:item="item"
        v-bind:keywords="keywords"
        v-on:change="doChangeMode"
        manageMode
      ></archetype-preview>

    </v-col>

  </v-row>

</template>

<script>
import ArchetypePreview from '~/components/forge/ArchetypePreview';

export default {
  name: "manage",
  components: { ArchetypePreview },
  asyncData({ params }) {
    return {
      characterId: params.id,
    };
  },
  data() {
    return {
      loading: false,
      item: undefined,
    };
  },
  mounted() {
  },
  watch: {
    'characterArchetypeLabel': {
      handler (newVal) {
        if ( newVal && newVal !== 'unknown' ) {
          this.getArchetype(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
  },
  computed: {
    characterArchetypeLabel() {
      return this.$store.getters['characters/characterArchetypeLabelById'](this.characterId);
    },
    keywords(){
      return this.$store.getters['characters/characterKeywordsRawById'](this.characterId);
    },
  },
  methods: {
    async getArchetype(name) {
      this.loading = true;
      const slug = name.toLowerCase().replace(/\W/gm, '-');
      const {data} = await this.$axios.get(`/api/archetypes/${slug}`)
      this.loading = false;
      this.item = data;
    },
    doChangeMode() {
      this.$router.push({
        name: `forge-characters-id-builder-archetype-choose`,
        params: { id: this.characterId }
      });
    },
  },
}
</script>

<style scoped>

</style>
