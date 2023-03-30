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

    <v-col>
      <h1 class="headline">
        Select an Faction
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
        <v-list v-if="factionOptions.length > 0">
          <v-list-item
            v-for="item in factionList"
            :key="item.key"
            two-line
            @click=""
          >
            <v-list-item-avatar tile>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                {{ item.name }}
                <v-chip
                  v-if="item.source && !['core'].includes(item.source.key)"
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
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapMutations } from 'vuex';
import ArchetypePreview from '~/components/forge/ArchetypePreview';
import CharacterCreationMixin from '~/mixins/CharacterCreationMixin';

export default {
  name: 'AdvancedArchetypeChoose',
  components: { ArchetypePreview },
  mixins: [
    CharacterCreationMixin,
  ],
  asyncData({ params }) {
    return {
      characterId: params.id,
    };
  },
  data() {
    return {
      factionList: undefined,
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
    // aggregate factions and unaligned options to a single variant
    factionOptions() {
      const options = [];
      if (this.factionList) {
        this.factionList.forEach((faction) => {
          const option = {
            key: faction.key,
            name: faction.name,
            source: faction.source,

          };
          options.push(option);
        });
      }

      return options;
    }
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
          this.loadFactions(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
  },
  methods: {
    ...mapMutations('characters', ['setCharacterArchetype','setCharacterFaction']),
    async loadSpecies(key) {
      if ( key ) {
        const { data } = await this.$axios.get(`/api/species/${key}`);
        this.characterSpecies = data;
      }
    },
    async loadFactions(sources) {
      if ( sources ) {
        const config = {
          params: {
            source: sources.join(','),
          },
        };
        const { data } = await this.$axios.get(`/api/factions/`, config);
        this.factionList = data;
      }
    },
  },
};
</script>

<style scoped>

</style>
