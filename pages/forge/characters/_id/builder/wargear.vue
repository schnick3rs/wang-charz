<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-row justify="center">
    <v-col :cols="12">
      <v-card
        class="mb-4"
        dark
        dense
        outlined
        :color=" manageWargear ? 'info' : '' "
        @click="manageWargear = !manageWargear"
      >
        <v-card-text class="pa-1">
          <v-icon>{{ manageWargear ? 'expand_less' : 'expand_more' }}</v-icon>
          Manage Wargear
        </v-card-text>
      </v-card>

      <v-list
        v-if="manageWargear && characterWargear"
        two-line
        avatar
        dense
      >
        <v-list-item
          v-for="gear in characterWargear"
          :key="gear.id"
        >
          <v-list-item-avatar tile>
            <img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ gear.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ wargearSubtitle(gear) }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn outlined x-small color="error" @click="remove(gear)">
              <v-icon left>
                delete
              </v-icon>Remove
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-col>

    <v-col :cols="12">
      <v-card
        class="mb-4"
        dark
        dense
        outlined
        :color=" startingWargearExpand ? 'info' : '' "
        @click="startingWargearExpand = !startingWargearExpand"
      >
        <v-card-text class="pa-1">
          <v-icon>{{ startingWargearExpand ? 'expand_less' : 'expand_more' }}</v-icon>
          Add Starting Wargear
        </v-card-text>
      </v-card>

      <div v-if="startingWargearExpand && !loading">
        <div v-if="startingWargear && characterWargear.filter(g => g.source.startsWith('archetype')).length <= 0" align="center">
          <v-card
            v-for="gear in startingWargear"
            :key="gear.key"
            outlined
            dense
            class="mb-2"
          >
            <v-card-title class="pa-2">
              <span class="subtitle-1 mb-0">{{ gear.name }}</span>
            </v-card-title>

            <v-card-text v-if="gear.options && gear.options.length == 1 && gear.options[0].filter" >
              <wargear-select
                :item="gear.selected"
                :repository="computeWargearOptionsByFilter(gear.options[0])"
                class="mb-4"
                @input="gear.selected = $event.name"
              />
            </v-card-text>

            <v-card-text v-else-if="gear.options">
              <v-radio-group
                v-model="gear.selected"
                class="mt-0"
              >
                <v-radio
                  v-for="option in gear.options"
                  :key="option.key"
                  :label="option.name"
                  :value="option.name"
                />
              </v-radio-group>
            </v-card-text>
          </v-card>

          <v-btn
            v-if="startingWargearExpand"
            small
            dense
            color="green"
            @click="addWargearToCharacter(startingWargear)"
            dark
          >
            Add starting wargear
          </v-btn>
        </div>

        <div v-else>
          <v-card>
            <v-card-text>
              <v-icon>help</v-icon>
              Starting Wargear has been added, remove all starting wargear from your inventory to reselct the starting wargear
            </v-card-text>
          </v-card>
        </div>
      </div>
    </v-col>

    <v-col :cols="12">
      <v-card
        class="mb-4"
        dark
        outlined
        :color=" wargearSearchActive ? 'info' : '' "
        @click="wargearSearchActive = !wargearSearchActive"
      >
        <v-card-text class="pa-1">
          <v-icon>{{ wargearSearchActive ? 'expand_less' : 'expand_more' }}</v-icon>
          Add additional Wargear
        </v-card-text>
      </v-card>

      <wargear-search
        v-if="wargearSearchActive && wargearList"
        :repository="wargearList"
        @select="add"
      />
    </v-col>
  </v-row>
</template>

<script lang="js">
import WargearSearch from '~/components/forge/WargearSearch.vue';
import WargearSelect from '~/components/forge/WargearSelect.vue';
import SluggerMixin from '~/mixins/SluggerMixin';

export default {
  name: 'Wargear',
  layout: 'forge',
  components: {
    WargearSelect,
    WargearSearch,
  },
  mixins: [
    SluggerMixin,
  ],
  props: [],
  head() {
    return {
      title: 'Select Wargear',
    };
  },
  asyncData({ params }) {
    return {
      characterId: params.id,
    };
  },
  data() {
    return {
      manageWargear: true,
      startingWargearExpand: true,
      wargearSearchActive: false,
      loading: false,
      archetype: undefined,
      wargearList: undefined,
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
    settingTier() {
      return this.$store.getters['characters/characterSettingTierById'](this.characterId);
    },
    characterArchetypeKey() {
      return this.$store.getters['characters/characterArchetypeKeyById'](this.characterId);
    },
    characterArchetypeLabel() {
      return this.$store.getters['characters/characterArchetypeLabelById'](this.characterId);
    },
    characterWargearRaw() {
      return this.$store.getters['characters/characterWargearById'](this.characterId);
    },
    startingWargear() {
      if ( this.archetype ) {
        return this.archetype.wargear;
      }
      return [];
    },
    characterWargear() {
      const characterWargear = [];
      if (this.wargearList){
        this.characterWargearRaw.forEach((chargear) => {
          let gear = {};
          gear = this.wargearList.find((wargear) => {
            const compare = chargear.name.localeCompare(wargear.name, 'en' , {sensitivity: 'accent'});
            //console.info(`${chargear.name} <-> ${wargear.name} : ${compare}`);
            return compare === 0
          });
          if (gear) {
            gear.id = chargear.id;
            gear.source = chargear.source;
            characterWargear.push({
              id: chargear.id,
              name: chargear.name,
              type: this.wargearSubtitle(gear),
              source: chargear.source,
            });
          } else {
            characterWargear.push({
              id: chargear.id,
              name: chargear.name,
              type: 'Misc',
              source: chargear.source,
            });
          }
        });
      }
      return characterWargear;
    },
  },
  watch: {
    characterArchetypeKey: {
      handler(newVal) {
        if (newVal) {
          this.getArchetype(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
    sources: {
      handler(newVal) {
        if (newVal) {
          this.getWargearList(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
  },
  methods: {
    async getArchetype(key) {
      this.loading = true;
      const { data } = await this.$axios.get(`/api/archetypes/${key}`);
      this.loading = false;
      this.archetype = data;
    },
    async getWargearList(sources) {
      const config = {
        params: {
          source: sources.join(','),
        },
      };
      const { data } = await this.$axios.get('/api/wargear/', config);
      this.wargearList = data.filter((i) => i.stub === undefined || i.stub === false);
    },
    wargearSubtitle(item) {
      // const item = this.wargearRepository.find(i => i.name === gear);
      if (item) {
        const tags = [item.type];
        if (item.subtype) {
          tags.push(item.subtype);
        }
        return tags.filter((t) => t !== undefined).join(' • ');
      }
      return '';
    },
    getAvatar(name) {
      return `/img/icon/wargear/wargear_${this.textToKebab(name)}_avatar.png`;
    },
    addWargearToCharacter(wargearOptions) {
      const finalWargear = [];

      wargearOptions.forEach((i) => {
        if (i.options) {
          if (i.selected) {
            if (i.selected.indexOf(' and ') > 0) {
              i.selected.split(' and ').forEach((o) => {
                finalWargear.push({name:o});
              });
            } else {
              finalWargear.push({name: i.selected});
            }
          }
        } else {
          finalWargear.push({name: i.name, variant: i.variant});
        }
      });
      finalWargear.forEach((w) => {
        this.$store.commit('characters/addCharacterWargear', { id: this.characterId, name: w.name, variant: w.variant, source: 'archetype' });
      });
    },
    add(gear) {
      this.$store.commit('characters/addCharacterWargear', { id: this.characterId, name: gear.name, source: 'custom', gear });
    },
    remove(gear) {
      this.$store.commit('characters/removeCharacterWargear', { id: this.characterId, gearId: gear.id });
    },
    /**
     * {
        filter: true,
        valueFilter: { useCharacterTier: false, useSettingTier: true, fixedValue: 4 },
        rarityFilter: ['Uncommon', 'Common', 'Rare'],
        typeFilter: 'Ranged Weapon',
        subtypeFilter: 'Augmetics',
        keywordFilter: 'Imperium',
     * },
     * @param filter
     */
    /*
       item.value <= (this.settingTier + 4)
    && ['Uncommon', 'Common', 'Rare'].includes(item.rarity)
    && item.type.includes('Ranged Weapon')
    const keywordReq = (item.keywords) ? item.keywords.split(',').includes('Imperium') : false;
     */
    computeWargearOptionsByFilter(filter) {
      const { valueFilter, rarityFilter, typeFilter, subtypeFilter, triptypeFilter, keywordFilter } = filter;
      if ( this.wargearList ) {
        return this.wargearList.filter( (gear) => {
          let valueReq = true;
          if ( valueFilter ) {
            let maxValue = 0;
            maxValue += valueFilter.fixedValue ? valueFilter.fixedValue : 0;
            maxValue += valueFilter.useSettingTier ? this.settingTier : 0;
            // maxValue += valueFilter.useCharacterTier ? this.settingTier : 0;
            valueReq = gear.value <= maxValue;
          }
          const rarityReq = rarityFilter ? rarityFilter.includes(gear.rarity) : true;
          const typeReq = typeFilter ? typeFilter.includes(gear.type) : true;
          const subtypeReq = subtypeFilter ? (gear.subtype && gear.subtype !== null ? gear.subtype.includes(subtypeFilter) : false ) : true;
          const triptypeReq = triptypeFilter ? (gear.triptype && gear.triptype !== null ? gear.triptype.includes(triptypeFilter) : false ) : true;
          const keywordReq = keywordFilter ? (gear.keywords ? gear.keywords.includes(keywordFilter) : false) : true;
          return valueReq && rarityReq && typeReq && subtypeReq && triptypeReq && keywordReq;
        });
      }
      return [];
    },
    wargearSubtitle(item) {
      if (item) {
        const tags = [item.type];
        if (item.subtype) {
          tags.push(item.subtype);
        }
        return tags.filter((t) => t !== undefined).join(' • ');
      }
      return '';
    },
  },
};
</script>

<style scoped lang="css">
</style>
