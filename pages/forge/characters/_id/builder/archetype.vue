<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <nuxt-child />
</template>

<script lang="js">
import {mapMutations} from 'vuex';
import ArchetypePreview from '~/components/forge/ArchetypePreview';
import SluggerMixin from '~/mixins/SluggerMixin';

export default {
  name: 'Archetype',
  layout: 'forge',
  components: { ArchetypePreview },
  mixins: [
    SluggerMixin,
  ],
  props: [],
  head() {
    return {
      title: 'Select Archetype',
    };
  },
  data() {
    return {
      archetypeRepository: [],
      dialog: false,
      changeMode: false,
      searchQuery: '',
      selectedArchetype: undefined,
    };
  },
  async asyncData({ params, $axios }) {
    // const archetypeResponse = await $axios.get(`/api/archetypes/`, config);
    return {
      characterId: params.id,
      // psychicPowersRepository: psychicPowersResponse.data,
      // archetypeRepository: archetypeResponse.data,
    };
  },
  methods: {
    ...mapMutations('characters', ['setCharacterArchetype']),
    getArchetypeBy(name) {
      if (this.archetypeRepository) {
        return this.archetypeRepository.find((s) => s.name === name);
      }
      return undefined;
    },
  },
  computed: {
    settingTier() {
      return this.$store.getters['characters/characterSettingTierById'](this.characterId);
    },
    characterArchetypeLabel() {
      return this.$store.getters['characters/characterArchetypeLabelById'](this.characterId);
    },
    characterArchetype() {
      return this.getArchetypeBy(this.characterArchetypeLabel);
    },
    keywords() {
      return this.$store.getters['characters/characterKeywordsRawById'](this.characterId);
    },
  },
};
</script>

<style scoped lang="css">
</style>
