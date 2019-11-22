<template>

  <v-row justify="center">

    <v-dialog
      v-model="previewDialog"
      width="600px"
      scrollable
    >
      <archetype-preview
        v-if="previewItem"
        v-bind:characterId="characterId"
        v-bind:item="previewItem"
        v-on:select="selectArchetypeForChar"
        v-on:cancel="previewDialog = false"
        chooseMode
      ></archetype-preview>
    </v-dialog>

    <v-col>
      <h1 class="headline">Select an Archetype</h1>

      <v-alert
        v-bind:value="!characterSpeciesLabel"
        type="warning"
        dense
      >You need to select a Species first.</v-alert>
    </v-col>

    <v-col v-bind:cols="12">
      <v-text-field
        solo
        placeholder="Search..."
        v-model="searchQuery"
        prepend-inner-icon="search"
        clearable
      ></v-text-field>
    </v-col>

    <v-col v-bind:cols="12">

      <v-card>

        <div
          v-for="(group, key) in archetypeGroups"
          v-bind:key="key"
        >

          <v-divider></v-divider>

          <v-list subheader v-if="archetypesByGroup(group).length > 0">

            <v-subheader>{{ group }}</v-subheader>

            <v-list-item
              two-line
              v-for="item in archetypesByGroup(group)"
              v-bind:key="item.key"
              v-on:click.stop="updatePreview(item)"
              v-bind:disabled="!item.species.includes(characterSpeciesLabel) || item.tier > characterSettingTier"
            >

              <v-list-item-avatar tile>
                <img v-bind:src="getAvatar(item.name)">
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

  </v-row>

</template>

<script>
import ArchetypePreview from '~/components/forge/ArchetypePreview';
import { mapMutations } from 'vuex';

export default {
  name: "archetype-choose",
  components: { ArchetypePreview },
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
    }
  },
  watch: {
    'sources': {
      handler (newVal) {
        if ( newVal ) {
          this.getArchetypeList(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
  },
  computed: {
    sources() {
      return ['core','coreab'];
    },
    characterSettingTier() {
      return this.$store.getters['characters/characterSettingTierById'](this.characterId);
    },
    characterSpeciesLabel() {
      return this.$store.getters['characters/characterSpeciesLabelById'](this.characterId);
    },
    archetypeGroups() {
      if (this.itemList !== undefined) {
        let archetypes = this.itemList;

        if (this.characterSpeciesLabel !== undefined) {
          archetypes = archetypes.filter( a => a.species.includes(this.characterSpeciesLabel) );
        }

        if (this.characterSettingTier !== undefined) {
          archetypes = archetypes.filter(a => a.tier <= this.characterSettingTier);
        }

        return [...new Set(archetypes.map(item => item.group))];
      }

      return [];
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
      const { data } = await this.$axios.get(`/api/archetypes/`, config);
      this.itemList = data;
    },
    getAvatar(name) {
      const slug = name.toLowerCase().replace(/\s/gm, '-');
      return `/img/icon/archetype/archetype_${slug}_avatar.png`;
    },
    archetypesByGroup(groupName) {
      let archetypes = this.itemList;

      /* filter by archetype group */
      archetypes = archetypes.filter(a => a.group === groupName);

      /* filter by  */
      if (this.characterSpeciesLabel) {
        archetypes = archetypes.filter( a => a.species.includes(this.characterSpeciesLabel) );
      }

      if (this.characterSettingTier !== undefined) {
        archetypes = archetypes.filter(a => a.tier <= this.characterSettingTier);
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

      this.previewDialog = false;
      this.$router.push({ name: `forge-characters-id-builder-archetype-manage`, params: { id: this.characterId } });
    },
  },
}
</script>

<style scoped>

</style>
