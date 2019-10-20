<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <v-row justify="center">

    <v-dialog
      v-model="dialog"
      width="600px"
      scrollable
    >
      <archetype-preview
        v-if="selectedArchetype"
        v-bind:characterId="characterId"
        v-bind:item="selectedArchetype"
        v-on:select="selectArchetypeForChar"
        v-on:cancel="dialog = false"
        chooseMode
      ></archetype-preview>
    </v-dialog>

    <v-col v-if="!characterArchetype || changeMode">
      <h1 class="headline">Select an Archetype</h1>

      <v-alert
        :value="!characterSpeciesLabel"
        type="warning"
      >You need to select a Species first.</v-alert>
    </v-col>

    <v-col :cols="12" v-if="!characterArchetype || changeMode">
      <v-text-field
        solo
        placeholder="Search..."
        v-model="searchQuery"
        prepend-inner-icon="search"
        clearable
      ></v-text-field>
    </v-col>

    <v-col :cols="12" v-if="!characterArchetype || changeMode">

      <v-card v-if="loaded">

        <div
          v-for="(group, key) in archetypeGroups"
          :key="key"
        >

          <v-divider></v-divider>

          <v-list subheader v-if="archetypesByGroup(group).length > 0">

            <v-subheader>{{ group }}</v-subheader>

            <v-list-item
              two-line
              v-for="item in archetypesByGroup(group)"
              :key="item.key"
              @click.stop="updatePreview(item)"
              :disabled="item.species !== characterSpeciesLabel || item.tier > settingTier"
            >

              <v-list-item-avatar tile>
                <img :src="getAvatar(item.name)">
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{item.name}}</v-list-item-title>
                <v-list-item-subtitle>{{item.hint}}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action class="hidden-sm-and-up">
                <v-btn dense icon>
                  <v-icon color="primary">arrow_forward_ios</v-icon>
                </v-btn>
              </v-list-item-action>
              <v-list-item-action class="hidden-xs-only">
                <v-chip pill color="green" text-color="white">
                  <v-avatar left class="green darken-4">{{item.cost}}</v-avatar>
                  BP
                </v-chip>
              </v-list-item-action>
              <v-list-item-action class="hidden-xs-only">
                <v-chip pill color="red" text-color="white">
                  <v-avatar left class="red darken-4">{{item.tier}}</v-avatar>
                  Tier
                </v-chip>
              </v-list-item-action>

            </v-list-item>

          </v-list>

        </div>
      </v-card>

    </v-col>

    <v-col :cols="12" v-if="characterArchetype && !changeMode">

      <archetype-preview
        v-bind:characterId="characterId"
        v-bind:item="characterArchetype"
        v-bind:keywords="keywords"
        v-bind:psychicPowersRepository="psychicPowersRepository"
        v-on:change="doChangeMode"
        v-on:select="selectArchetypeForChar"
        v-on:reset="resetArchetype"
        manageMode
      ></archetype-preview>

    </v-col>

  </v-row>

</template>

<script lang="js">
import ArchetypePreview from '~/components/forge/ArchetypePreview';
import ArchetypeRepositoryMixin from '~/mixins/ArchetypeRepositoryMixin';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Archetype',
  layout: 'forge',
  components: { ArchetypePreview },
  mixins: [ArchetypeRepositoryMixin],
  props: [],
  head() {
    return {
      title: 'Select Archetype',
    }
  },
  async asyncData({ params, $axios }) {
    const response = await $axios.get(`/api/psychic-powers/?fields=id,name,effect,discipline&discipline=Minor,Universal`);
    return {
      psychicPowersRepository: response.data,
      characterId: params.id,
    };
  },
  data() {
    return {
      dialog: false,
      changeMode: false,
      searchQuery: '',
      selectedArchetype: undefined,
    };
  },
  methods: {
    ...mapMutations('characters', ['setCharacterArchetype']),
    getAvatar(name) {
      const slug = name.toLowerCase().replace(/\s/gm, '-');
      return `/img/icon/archetype/archetype_${slug}_avatar.png`;
    },
    doChangeMode() {
      this.changeMode = true;
    },
    getArchetypeBy(name) {
      if (this.archetypeRepository) {
        return this.archetypeRepository.find(s => s.name === name);
      }
      return undefined;
    },
    archetypesByGroup(groupName) {
      let archetypes = this.archetypeRepository;

      /* filter by archetype group */
      archetypes = archetypes.filter(a => a.group === groupName);

      /* filter by  */
      if (this.characterSpeciesLabel) {
        archetypes = archetypes.filter(a => a.species === this.characterSpeciesLabel);
      }

      if (this.settingTier !== undefined) {
        archetypes = archetypes.filter(a => a.tier <= this.settingTier);
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
      mods.push({ targetGroup: 'traits', targetValue: 'influence', modifier: item.influence, hint: item.name, source: 'archetype'});
      this.$store.commit('characters/setCharacterModifications', { id: this.characterId, content: { modifications: mods, source: 'archetype' } });

      this.$store.commit('characters/clearCharacterKeywordsBySource', { id: this.characterId, source: 'archetype' });
      // keywords = String[]
      if ( item.keywords ) {
        const itemKeywords = item.keywords.split(',');
        itemKeywords.forEach(keyword => {
          const payload = {
            name: keyword,
            source: 'archetype',
            type: (keyword.indexOf('<')>=0) ? 'placeholder': 'keyword',
            replacement: undefined,
          };
          this.$store.commit('characters/addCharacterKeyword', { id: this.characterId, keyword: payload });
        });
      }

      this.$store.commit('characters/clearCharacterPsychicPowersBySource', { id: this.characterId, source: 'archetype'});
      if ( item.psychicPowers && item.psychicPowers.discount && item.psychicPowers.discount.length > 0 ) {
        item.psychicPowers.discount.forEach( d => {
          if ( d.selected ) {
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
      this.setCharacterArchetype({ id: this.characterId, archetype: { value: undefined, cost: 0} });
    },
    updatePreview(item) {
      this.selectedArchetype = item;
      this.dialog = true;
    },
  },
  computed: {
    loaded() { return this.archetypeRepository !== undefined; },
    settingTier(){
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
          archetypes = archetypes.filter(a => a.species === this.characterSpeciesLabel);
        }

        if (this.settingTier !== undefined) {
          archetypes = archetypes.filter(a => a.tier <= this.settingTier);
        }

        return [...new Set(archetypes.map(item => item.group))];
      }

      return [];
    },
    keywords(){
      return this.$store.getters['characters/characterKeywordsRawById'](this.characterId);
    },
  },
};
</script>

<style scoped lang="css">
</style>
