<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <nuxt-child />
</template>

<script lang="js">
import { mapMutations } from 'vuex';
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
    const config = {
      params: {
        source: 'core,coreab',
      },
    };
    // const archetypeResponse = await $axios.get(`/api/archetypes/`, config);
    return {
      characterId: params.id,
      // psychicPowersRepository: psychicPowersResponse.data,
      // archetypeRepository: archetypeResponse.data,
    };
  },
  created() {
    const config = {
      params: {
        source: 'core,coreab',
      },
    };
    this.$axios.get('/api/archetypes/', config)
      .then((response) => {
        this.archetypeRepository = response.data;
      });
  },
  methods: {
    ...mapMutations('characters', ['setCharacterArchetype']),
    getAvatar(name) {
      return `/img/icon/archetype/archetype_${this.textToKebab(name)}_avatar.png`;
    },
    doChangeMode() {
      this.changeMode = true;
    },
    getArchetypeBy(name) {
      if (this.archetypeRepository) {
        return this.archetypeRepository.find((s) => s.name === name);
      }
      return undefined;
    },
    archetypesByGroup(groupName) {
      let archetypes = this.archetypeRepository;

      /* filter by archetype group */
      archetypes = archetypes.filter((a) => a.group === groupName);

      /* filter by  */
      if (this.characterSpeciesLabel) {
        archetypes = archetypes.filter((a) => a.species.includes(this.characterSpeciesLabel));
      }

      if (this.settingTier !== undefined) {
        archetypes = archetypes.filter((a) => a.tier <= this.settingTier);
      }

      /* filter by search query */
      if (this.searchQuery) {
        const lowerCaseSearchQuery = this.searchQuery.toLowerCase();
        archetypes = archetypes.filter((a) => {
          const lowerCaseArchetype = a.name.toLowerCase();
          return lowerCaseArchetype.startsWith(lowerCaseSearchQuery);
        });
      }

      return archetypes.sort((a, b) => { if (a.tier > b.tier) { return 1; } if (b.tier > a.tier) { return -1; } return 0; });
    },
    selectArchetypeForChar(item) {
      this.setCharacterArchetype({ id: this.characterId, archetype: { value: item.name, cost: item.cost, tier: item.tier } });

      const mods = [];
      mods.push({
        targetGroup: 'traits', targetValue: 'influence', modifier: item.influence, hint: item.name, source: 'archetype',
      });
      this.$store.commit('characters/setCharacterModifications', { id: this.characterId, content: { modifications: mods, source: 'archetype' } });

      this.$store.commit('characters/clearCharacterKeywordsBySource', { id: this.characterId, source: 'archetype' });
      // keywords = String[]
      if (item.keywords) {
        const itemKeywords = item.keywords.split(',');
        itemKeywords.forEach((keyword) => {
          const payload = {
            name: keyword,
            source: 'archetype',
            type: (keyword.includes('<')) ? 'placeholder' : 'keyword',
            replacement: undefined,
          };
          this.$store.commit('characters/addCharacterKeyword', { id: this.characterId, keyword: payload });
        });
      }

      this.$store.commit('characters/clearCharacterPsychicPowersBySource', { id: this.characterId, source: 'archetype' });
      if (item.psychicPowers && item.psychicPowers.discount && item.psychicPowers.discount.length > 0) {
        item.psychicPowers.discount.forEach((d) => {
          if (d.selected) {
            const payload = {
              id: this.characterId,
              name: d.selected,
              cost: 0,
              source: 'archetype',
            };
            this.$store.commit('characters/addCharacterPsychicPower', payload);
          }
        });
      }

      this.dialog = false;
      this.changeMode = false;
    },
    resetArchetype() {
      this.selectedArchetype = undefined;
      this.setCharacterArchetype({ id: this.characterId, archetype: { value: undefined, cost: 0 } });
    },
    updatePreview(item) {
      this.selectedArchetype = item;
      this.dialog = true;
    },
  },
  computed: {
    loaded() { return this.archetypeRepository !== undefined; },
    settingTier() {
      return this.$store.getters['characters/characterSettingTierById'](this.characterId);
    },
    characterArchetypeLabel() {
      return this.$store.getters['characters/characterArchetypeLabelById'](this.characterId);
    },
    characterArchetype() {
      return this.getArchetypeBy(this.characterArchetypeLabel);
    },
    characterSpeciesLabel() {
      return this.$store.getters['characters/characterSpeciesLabelById'](this.characterId);
    },
    archetypeGroups() {
      if (this.archetypeRepository !== undefined) {
        let archetypes = this.archetypeRepository;

        if (this.characterSpeciesLabel !== undefined) {
          archetypes = archetypes.filter((a) => a.species.includes(this.characterSpeciesLabel));
        }

        if (this.settingTier !== undefined) {
          archetypes = archetypes.filter((a) => a.tier <= this.settingTier);
        }

        return [...new Set(archetypes.map((item) => item.group))];
      }

      return [];
    },
    keywords() {
      return this.$store.getters['characters/characterKeywordsRawById'](this.characterId);
    },
  },
};
</script>

<style scoped lang="css">
</style>
