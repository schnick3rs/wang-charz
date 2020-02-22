<template>
  <v-row justify="center">
    <v-dialog
      v-model="previewDialog"
      width="600px"
      scrollable
    >
      <archetype-preview
        v-if="previewItem"
        :character-id="characterId"
        :item="previewItem"
        choose-mode
        @select="selectArchetypeForChar"
        @cancel="previewDialog = false"
      />
    </v-dialog>

    <v-col>
      <h1 class="headline">
        Select an Archetype
      </h1>

      <v-alert
        :value="!characterSpeciesLabel"
        type="warning"
        dense
      >
        You need to select a Species first.
      </v-alert>
    </v-col>

    <v-col :cols="12">
      <v-text-field
        v-model="searchQuery"
        solo
        placeholder="Search..."
        prepend-inner-icon="search"
        clearable
      />
    </v-col>

    <v-col :cols="12">
      <v-card>
        <div
          v-for="(group, key) in archetypeGroups"
          :key="key"
        >
          <v-divider />

          <v-list v-if="archetypesByGroup(group).length > 0" subheader>
            <v-subheader>{{ group }}</v-subheader>

            <v-list-item
              v-for="item in archetypesByGroup(group)"
              :key="item.key"
              two-line
              :disabled="item.tier > characterSettingTier"
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

              <v-list-item-action class="hidden-sm-and-up">
                <v-btn dense icon>
                  <v-icon color="primary">
                    arrow_forward_ios
                  </v-icon>
                </v-btn>
              </v-list-item-action>
              <v-list-item-action class="hidden-xs-only">
                <v-chip pill color="green" text-color="white">
                  <v-avatar left class="green darken-4">
                    {{ item.cost }}
                  </v-avatar>
                  BP
                </v-chip>
              </v-list-item-action>
              <v-list-item-action class="hidden-xs-only">
                <v-chip pill color="red" text-color="white">
                  <v-avatar left class="red darken-4">
                    {{ item.tier }}
                  </v-avatar>
                  Tier
                </v-chip>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapMutations } from 'vuex';
import ArchetypePreview from '~/components/forge/ArchetypePreview';

export default {
  name: 'ArchetypeChoose',
  components: { ArchetypePreview },
  mixins: [],
  asyncData({ params }) {
    return {
      characterId: params.id,
    };
  },
  data() {
    return {
      itemList: undefined,
      selectedItem: undefined, // for he preview dialog box
      previewDialog: false,
      previewItem: undefined,
      searchQuery: '',
      characterSpecies: undefined,
    };
  },
  computed: {
    sources() {
      return [
        'core',
        'coreab',
        ...this.settingHomebrews
      ];
    },
    settingHomebrews() {
      return this.$store.getters['characters/characterSettingHomebrewsById'](this.characterId);
    },
    characterSettingTier() {
      return this.$store.getters['characters/characterSettingTierById'](this.characterId);
    },
    characterSpeciesLabel() {
      return this.$store.getters['characters/characterSpeciesLabelById'](this.characterId);
    },
    characterSpeciesKey(){
      return this.$store.getters['characters/characterSpeciesKeyById'](this.characterId);
    },
    archetypeGroups() {
      if (this.itemList !== undefined) {
        let archetypes = this.itemList;

        if (this.characterSpecies) {
          archetypes = archetypes.filter((a) => {
            if ( a.speciesKey.includes(this.characterSpecies.key) ) return true;
            if ( a.speciesKey.includes(this.characterSpecies.variant) ) return true;
            return false;
          });

          if (this.characterSpecies.archetypeRestrictionsMaxTier) {
            archetypes = archetypes.filter((a) => a.tier <= this.characterSpecies.archetypeRestrictionsMaxTier);
          }
        }

        if (this.characterSettingTier !== undefined) {
          archetypes = archetypes.filter((a) => a.tier <= this.characterSettingTier);
        }

        return [...new Set(archetypes.map((item) => item.group))];
      }

      return [];
    },

  },
  watch: {
    characterSpeciesKey: {
      handler(newKey) {
        if (newKey) {
          this.loadSpecies(newKey);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
    sources: {
      handler(newVal) {
        if (newVal) {
          this.getArchetypeList(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
  },
  methods: {
    ...mapMutations('characters', ['setCharacterArchetype']),
    async getArchetypeList(sources) {
      const config = {
        params: {
          source: sources.join(','),
        },
      };
      const { data } = await this.$axios.get('/api/archetypes/', config);
      this.itemList = data.filter((i) => i.hint);
    },
    async loadSpecies(key) {
      if ( key ) {
        const { data } = await this.$axios.get(`/api/species/${key}`);
        this.characterSpecies = data;
      }
    },
    getAvatar(key) {
      return `/img/avatars/archetype/${key}.png`;
    },
    archetypesByGroup(groupName) {
      let archetypes = this.itemList;

      /* filter by archetype group */
      archetypes = archetypes.filter((a) => a.group === groupName);

      if (this.characterSpecies) {
        archetypes = archetypes.filter((a) => {
          if ( a.speciesKey.includes(this.characterSpecies.key) ) return true;
          if ( a.speciesKey.includes(this.characterSpecies.variant) ) return true;
          return false;
        });

        if (this.characterSpecies.archetypeRestrictionsMaxTier) {
          archetypes = archetypes.filter((a) => a.tier <= this.characterSpecies.archetypeRestrictionsMaxTier);
        }

      }

      if (this.characterSettingTier !== undefined) {
        archetypes = archetypes.filter((a) => a.tier <= this.characterSettingTier);
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
    updatePreview(item) {
      this.previewItem = item;
      this.previewDialog = true;
    },
    selectArchetypeForChar(item) {
      this.setCharacterArchetype({ id: this.characterId, archetype: { key: item.key, value: item.name, cost: item.cost, tier: item.tier } });

      const mods = [];
      mods.push({
        targetGroup: 'traits', targetValue: 'influence', modifier: item.influence, hint: item.name, source: 'archetype',
      });
      this.$store.commit('characters/setCharacterModifications', { id: this.characterId, content: { modifications: mods, source: 'archetype' } });

      this.$store.commit('characters/clearCharacterKeywordsBySource', { id: this.characterId, source: 'archetype', cascade: true });
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
      const featuresWithPowers = item.archetypeFeatures.filter( (f) => f.psychicPowers !== undefined);
      if ( featuresWithPowers ) {
        featuresWithPowers.forEach( (feature) => {
          feature.psychicPowers.forEach( (powerSelections) => {
            if ( powerSelections.selected ) {
              const payload = {
                id: this.characterId,
                name: powerSelections.selected,
                cost: 0,
                source: `archetype.${powerSelections.selected.name}`,
              };
              this.$store.commit('characters/addCharacterPsychicPower', payload);
            }
          });
        });
      }

      this.previewDialog = false;
      this.$router.push({ name: 'forge-characters-id-builder-archetype-manage', params: { id: this.characterId } });
    },
  },
};
</script>

<style scoped>

</style>
