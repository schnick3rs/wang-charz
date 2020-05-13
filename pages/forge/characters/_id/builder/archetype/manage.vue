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
    enhancements() {
      return this.$store.getters['characters/characterEnhancementsById'](this.characterId);
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
  methods: {
    async getArchetype(key) {
      this.loading = true;
      let finalData = {};
      const { data } = await this.$axios.get(`/api/archetypes/${key}`);
      finalData = data;

      finalData.archetypeFeatures
        .filter((feature) => feature.options)
        .forEach((feature) => {
          const enhancements = this.enhancements.filter((modifier) => modifier.source.startsWith(`archetype.${feature.name}`) );
          if (enhancements) {
            enhancements.forEach((e) => {
              let foundInd = /\.(\d)\./.exec(e.source);
              if (foundInd) {
                feature.selected[foundInd[1]] = e.source.split('.').pop();
              }
            });
          } else {
            const enhancement = this.enhancements.find((modifier) => modifier.source.startsWith(`archetype.${feature.name}`) );
            if ( enhancement ) {
              feature.selected = enhancement.source.split('.').pop();
            }
          }
        });

      this.loading = false;
      this.item = finalData;
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
