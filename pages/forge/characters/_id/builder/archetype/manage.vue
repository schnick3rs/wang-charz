<template>
  <v-row justify="center">
    <v-progress-circular v-if="!item" indeterminate color="success" size="128" width="12" />

    <v-col v-if="item" :cols="12">
      <archetype-preview
        :character-id="characterId"
        :item="item"
        :keywords="keywords"
        :psychic-powers="psychicPowers"
        manage-mode
        @change="doChangeMode"
      />
    </v-col>
  </v-row>
</template>

<script>
import ArchetypePreview from '~/components/forge/ArchetypePreview';
import SluggerMixin from '~/mixins/SluggerMixin';

export default {
  name: 'Manage',
  components: { ArchetypePreview },
  mixins: [
    SluggerMixin,
  ],
  data() {
    return {
      loading: false,
      item: undefined,
    };
  },
  computed: {
    characterArchetypeKey() {
      return this.$store.getters['characters/characterArchetypeKeyById'](this.characterId);
    },
    characterArchetypeLabel() {
      return this.$store.getters['characters/characterArchetypeLabelById'](this.characterId);
    },
    keywords() {
      return this.$store.getters['characters/characterKeywordsRawById'](this.characterId);
    },
    psychicPowers() {
      return this.$store.getters['characters/characterPsychicPowersById'](this.characterId);
    }
  },
  watch: {
    characterArchetypeKey: {
      handler(newVal) {
        if (newVal && newVal !== 'unknown') {
          this.getArchetype(newVal);
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
    async getArchetype(key) {
      this.loading = true;
      const { data } = await this.$axios.get(`/api/archetypes/${key}`);
      this.loading = false;
      this.item = data;
    },
    doChangeMode() {
      this.$router.push({
        name: 'forge-characters-id-builder-archetype-choose',
        params: { id: this.characterId },
      });
    },
  },
};
</script>

<style scoped>

</style>
