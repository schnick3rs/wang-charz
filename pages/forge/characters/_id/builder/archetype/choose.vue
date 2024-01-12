<template>
  <v-row justify="center">
    <v-dialog
      v-model="previewDialog"
      width="600px"
      scrollable
      :fullscreen="$vuetify.breakpoint.xsOnly"
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

    <v-dialog
      v-model="advancedKeywordsDialog"
      width="600px"
      scrollable
      :fullscreen="$vuetify.breakpoint.xsOnly"
    >
      <v-card class="pa-0">
        <v-card-title style="background-color: #262e37; color: #fff;">
          <span>Build Advanced Character</span>
          <v-spacer />
          <v-icon dark @click="advancedKeywordsDialog = false">
            close
          </v-icon>
        </v-card-title>
        <v-card-text class="pt-8">

          <v-alert
            type="info"
            dense outlined border="left"
            class="caption pb-4"
          >Advanced Character Creation is described on CORE pg. 38 and allows for more influence on Keywords and Wargear at the cost of a dedicated archetype ability.</v-alert>

          <v-select
            dense outlined
            label="Select the tier, defining your access to wargear"
            v-model="advancedTier"
            :items="advancedTierOptions"
          />

          <v-select
            dense outlined
            label="Select a faction or stay unaligned"
            v-model="advancedFaction"
            :items="allArchetypeFactions"
          ></v-select>

          <v-autocomplete
            outlined
            label="Select fitting keywords"
            persistent-hint
            class="mb-4"
            hint="Work with your GM/Group to define keywords"
            v-model="advancedKeywords"
            :items="keywordCombinedRepository.filter((k) => !k.name.startsWith('['))"
            item-text="name"
            item-value="key"
            multiple
            chips
          >
            <template v-slot:selection="data">
              <v-chip
                v-bind="data.attrs"
                :input-value="data.selected"
                close
                @click="data.select"
                @click:close="remove(data.item)"
              >
                {{ data.item.name }}
              </v-chip>
            </template>
            <template v-slot:item="data">
              <v-list-item-content>
                <v-list-item-title v-html="data.item.name"></v-list-item-title>
                <v-list-item-subtitle>{{data.item.type}}</v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </v-autocomplete>

          <v-text-field
            dense outlined
            placeholder="Unaligned Rascal"
            v-model="advancedName"
            label="A short name, describing this 'Archetype'"
          >
          </v-text-field>

          <v-autocomplete
            outlined
            label="Select Archetype Ability (optional)"
            persistent-hint
            class="mb-4"
            hint="You may buy (ask your GM) one Archetype Ability for it`s tier x 10 XP"
            v-model="advancedArchetype"
            :items="itemList"
            item-text="name"
            item-value="key"
            return-object
            clearable
          >
            <template v-slot:item="data">
              <v-list-item-content>
                <v-list-item-title>{{data.item.name}} {{data.item.tier*10}} XP</v-list-item-title>
                <v-list-item-subtitle>{{data.item.archetypeFeatures.map((f) => f.name).join(' • ')}}</v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </v-autocomplete>

        </v-card-text>
        <v-card-actions>
          <v-btn left outlined color="red" @click="advancedKeywordsDialog = false">
            Cancel
          </v-btn>
          <v-spacer />
          <v-btn right color="success" @click="createAdvancedArchetype(advancedName, advancedFaction, advancedKeywords, advancedTier, advancedArchetype)">
            Confirm choices
          </v-btn>
        </v-card-actions>
      </v-card>
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
        <div>
          <v-divider />
          <v-list subheader>
            <v-subheader>Advanced Character Creation</v-subheader>
            <v-list-item
              two-line
              @click.stop="advancedKeywordsDialog = true"
            >
              <v-list-item-avatar tile>
                <img :src="getAvatar()">
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  Unaligned Rascal
                </v-list-item-title>
                <v-list-item-subtitle>Select a faction, keywords and tier...</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>
        <div
          v-for="(group, key) in archetypeFaction"
          :key="key"
        >
          <v-divider />

          <v-list v-if="archetypesByFaction(group).length > 0" subheader>
            <v-subheader>{{ group }}</v-subheader>

            <v-list-item
              v-for="item in archetypesByFaction(group)"
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
                  XP
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
import {mapMutations} from 'vuex';
import ArchetypePreview from '~/components/forge/ArchetypePreview';
import KeywordRepositoryMixin from '~/mixins/KeywordRepositoryMixin';

export default {
  name: 'ArchetypeChoose',
  components: { ArchetypePreview },
  mixins: [ KeywordRepositoryMixin ],
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
      characterFactions: undefined,
      // advanced character creation
      advancedName: 'Unaligned Scoundrel',
      advancedKeywordsDialog: false,
      advancedFaction: undefined,
      advancedKeywords: [],
      advancedArchetype: undefined,
      advancedTier: 1,
      advancedTierOptions: [
        { text: '1 - One among billions', value: 1, naming: 'Unknown' },
        { text: '2 - Stalwart Defenders', value: 2, naming: 'Tested' },
        { text: '3 - Elite Guardians', value: 3, naming: 'Veteran' },
        { text: '4 - Heroic Operatives', value: 4, naming: 'Heroic' },
        // { text: '5 - Agents of Fate', value: 5 },
      ],
    };
  },
  computed: {
    sources() {
      return [
        'core',
        'fspg',
        'red1',
        'cos',
        // 'tnh',
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
    allArchetypeFactions() {
      if (this.itemList !== undefined) {
        let archetypes = this.itemList;

        if (this.characterSpecies) {
          archetypes = archetypes.filter((a) => {
            if ( a.species.some((s) => s.key.includes(this.characterSpecies.key) ) ) return true;
            if ( a.species.some((s) => s.key.includes(this.characterSpecies.variant) ) ) return true;
            return false;
          });

          if (this.characterSpecies.archetypeRestrictionsMaxTier) {
            archetypes = archetypes.filter((a) => a.tier <= this.characterSpecies.archetypeRestrictionsMaxTier);
          }
        }

        return [ 'Unaligned', ...new Set(archetypes.map((item) => item.faction))];
      }

      return [];
    },
    archetypeFaction() {
      if (this.itemList !== undefined) {
        let archetypes = this.itemList;

        if (this.characterSpecies) {
          archetypes = archetypes.filter((a) => {
            if ( a.species.some((s) => s.key.includes(this.characterSpecies.key) ) ) return true;
            if ( a.species.some((s) => s.key.includes(this.characterSpecies.variant) ) ) return true;
            return false;
          });

          if (this.characterSpecies.archetypeRestrictionsMaxTier) {
            archetypes = archetypes.filter((a) => a.tier <= this.characterSpecies.archetypeRestrictionsMaxTier);
          }
        }

        if (this.characterSettingTier !== undefined) {
          archetypes = archetypes.filter((a) => a.tier <= this.characterSettingTier);
        }

        return [ 'Unaligned', ...new Set(archetypes.map((item) => item.faction))];
      }

      return [];
    },
    characterAttributes() {
      return this.$store.getters['characters/characterAttributesById'](this.characterId);
    },
    characterSkills() {
      return this.$store.getters['characters/characterSkillsById'](this.characterId);
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
          this.loadFactions(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
  },
  methods: {
    ...mapMutations('characters', ['setCharacterArchetype','setCharacterFaction']),
    async getArchetypeList(sources) {
      const config = {
        params: {
          source: sources.join(','),
        },
      };
      const { data } = await this.$axios.get('/api/archetypes/', config);
      // only those that have a HINT indicating they are not only stubs
      this.itemList = data.filter((i) => i.hint);
    },
    async loadSpecies(key) {
      if ( key ) {
        const { data } = await this.$axios.get(`/api/species/${key}`);
        this.characterSpecies = data;
      }
    },
    async loadFactions(sources) {
      const config = {
        params: {
          source: sources.join(','),
        },
      };
      const { data } = await this.$axios.get(`/api/factions/`, config);
      this.characterFactions = data;
    },
    getAvatar(key) {
      if (key === undefined || key === 'advanced' ) return '/img/avatar_placeholder.png';
      return `/img/avatars/archetype/${key}.png`;
    },
    archetypesByFaction(groupName) {
      let archetypes = this.itemList;

      /* filter by archetype group */
      archetypes = archetypes.filter((a) => a.faction === groupName);

      if (this.characterSpecies) {
        archetypes = archetypes.filter((a) => {
          if ( a.species.some((s) => s.key.includes(this.characterSpecies.key) ) ) return true;
          if ( a.species.some((s) => s.key.includes(this.characterSpecies.variant) ) ) return true;
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
    createAdvancedArchetype(name, factionName, keywords, tier, archetype) {
      const id = this.characterId;

      const settingTier = this.$store.getters['characters/characterSettingTierById'](this.characterId);
      let cost = -1 * settingTier * 10;
      cost += archetype ? archetype.tier * 10 : 0;

      const mimic = archetype ? archetype.key : undefined;

      this.$store.commit('characters/clearCharacterEnhancementsBySource', { id, source: 'archetype' });
      this.$store.commit('characters/clearCharacterKeywordsBySource', { id, source: 'archetype', cascade: true });

      let faction = { key: 'core-unaligned', name: factionName };
      const factionData = this.characterFactions.find((f) =>  f.name === factionName);
      if (factionData) {
        faction = factionData;
      }

      this.setCharacterArchetype({ id, archetype: { key: 'advanced', value: name, cost, tier, keywords, mimic } });
      this.setCharacterFaction({ id, faction: { key: faction.key, label: faction.name } });

      keywords.forEach((k) => {
        const keyword = {
          name: k,
          source: 'archetype',
          type: (k.includes('[')) ? 'placeholder' : 'keyword',
          replacement: undefined,
        };
        this.$store.commit('characters/addCharacterKeyword', { id, keyword });
      });

      this.advancedKeywordsDialog = false;
      this.$router.push({ name: 'forge-characters-id-builder-archetype-manage', params: { id } });
    },
    selectArchetypeForChar(item) {
      const id = this.characterId;

      this.setCharacterArchetype({ id, archetype: { key: item.key, value: item.name, cost: item.costs.archetype, tier: item.tier } });
      this.setCharacterFaction({ id, faction: { key: item.factionKey, label: item.faction } });

      // TODO ensure species

      // TODO ensure attributes and skills
      this.ensurePrerequisites(item);

      this.$store.commit('characters/clearCharacterEnhancementsBySource', { id: this.characterId, source: 'archetype' });
      const mods = [];
      if (item.influence) {
        mods.push({
          targetGroup: 'traits', targetValue: 'influence', modifier: item.influence, hint: item.name, source: 'archetype',
        });
      }
      if (item.modifications){
        mods.push(...item.modifications);
      }
      item.archetypeFeatures
        .filter((feature) => feature.modifications)
        .forEach((feature) => {
          feature.modifications.forEach((mod) => {
            mods.push(mod);
          });
        });

      this.$store.commit('characters/setCharacterModifications', { id: this.characterId, content: { modifications: mods, source: 'archetype' } });


      this.$store.commit('characters/clearCharacterTalentsBySource', { id: this.characterId, source: 'archetype', cascade: true });
      item.archetypeFeatures
          // get all features with modifications
          .filter((feature) => feature.modifications)
          // for each of those features
          .forEach((feature) => {
            feature.modifications
                // get all modifications that affect talents
                .filter( (m) => m.targetGroup === 'talents' )
                .forEach( (t) => {
                  const talent = {
                    name: t.meta.name,
                    key: t.targetValue,
                    cost: 0,
                    placeholder: undefined,
                    selected: undefined,
                    source: `archetype.${item.key}.${t.key}`,
                  };
                  this.$store.commit('characters/addCharacterTalent', { id, talent });
                });
          });

      this.$store.commit('characters/clearCharacterKeywordsBySource', { id: this.characterId, source: 'archetype', cascade: true });
      // keywords = String[]
      if (item.keywords) {
        const itemKeywords = item.keywords.split(',').map((i) => i.trim());
        itemKeywords.forEach((keyword) => {
          const payload = {
            name: keyword,
            source: 'archetype',
            type: (keyword.includes('[')) ? 'placeholder' : 'keyword',
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
    ensurePrerequisites(item) {
      const archetype = item;

      if (archetype && archetype.prerequisites.length > 0) {
        archetype.prerequisites.forEach((prerequisite) => {
          // { group: 'attributes', value: 'willpower', threshold: 3, }
          switch (prerequisite.group) {
            case 'attributes':
              const attributeValue = this.characterAttributes[prerequisite.value];
              if (attributeValue < prerequisite.threshold) {
                this.$store.commit('characters/setCharacterAttribute', { id: this.characterId, payload: { key: prerequisite.value, value: prerequisite.threshold } });
              }
              break;
            case 'skills':
              const skillValue = this.characterSkills[prerequisite.value];
              if (skillValue < prerequisite.threshold) {
                this.$store.commit('characters/setCharacterSkill', { id: this.characterId, payload: { key: prerequisite.value, value: prerequisite.threshold } });
              }
              break;
          }
        });
      }
    },
  },
};
</script>

<style scoped>

</style>
