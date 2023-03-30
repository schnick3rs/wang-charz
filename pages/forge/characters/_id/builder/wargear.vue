<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-row justify="center">

    <!-- manage current inventory -->
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
          Manage Wargear ({{characterWargear.length}})
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
            <img :src="gear.avatar">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ gear.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ gear.subtitle }}</v-list-item-subtitle>
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

    <!-- starting gear -->
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

        <!-- show ADVANCED creation options -->
        <div v-if="showAdvancedStartingWargearSection && advancedWargearRestrictions">

          <div v-if="characterWargear.filter(g => g.source.startsWith('archetype.advanced')).length <= 0">

            <v-alert
              color="warning"
              border="left"
              dense text
              v-if="advancedShoppingChart.length <= 0"
            >
              {{getAdvancedWargearOptionByTier(this.characterArchetypeTier).wargearString}}
            </v-alert>

            <v-alert
              color="success"
              border="left"
              dense text
              v-if="advancedShoppingChart.length > 0 && advancedWargearViolations.length <= 0"
            >
              You spend {{advancedWargearSpend}} / {{advancedWargearRestrictions.total}} points.
            </v-alert>

            <v-alert
              v-show="advancedWargearViolations.length > 0"
              color="error"
              class="caption"
              border="left"
              text dense
            >
              <ul>
                <li v-for="item in advancedWargearViolations">{{item}}</li>
              </ul>
            </v-alert>

            <div v-if="advancedShoppingChart.length > 0">

              <v-list
                v-if="advancedShoppingChart"
                two-line
                avatar
                dense
              >
                <v-list-item
                  three-line
                  v-for="(gear, index) in advancedShoppingChart"
                  :key="index"
                >
                  <v-list-item-avatar tile>
                    <img :src="getAvatar(gear.type)">
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>{{ gear.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ wargearSubtitle(gear) }}</v-list-item-subtitle>
                    <v-list-item-subtitle>{{ gear.value }} {{ gear.rarity }}</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-btn
                      outlined x-small
                      color="error"
                      @click="removeFromBasket(index)"
                    >
                      <v-icon left>
                        delete
                      </v-icon>Remove
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>

              <div align="center">
                <v-btn
                  small dense dark
                  color="green"
                  @click="addWargearToCharacter(advancedShoppingChart, 'archetype.advanced')"
                >
                  Add starting wargear
                </v-btn>
              </div>
            </div>

            <wargear-search
              v-if="startingWargearExpand && wargearList"
              :repository="wargearList"
              @select="addToBasket"
            />
          </div>

          <div v-else>
            <v-card>
              <v-card-text>
                <v-icon>help</v-icon>
                Starting Wargear has been added, remove all starting wargear from your inventory to re-select the starting wargear
              </v-card-text>
            </v-card>
          </div>

        </div>

        <!-- show ARCHETYPE wargear options -->
        <div v-if="showArchetypeStartingWargearSection">
          <div v-if="characterWargear.filter(g => g.source.startsWith('archetype')).length <= 0" align="center">
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
              @click="addWargearToCharacter(startingWargear, 'archetype')"
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

      </div>

    </v-col>

    <!-- add additional Wargear -->
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
import CharacterCreationMixin from '~/mixins/CharacterCreationMixin';
import SluggerMixin from '~/mixins/SluggerMixin';
import WargearMixin from '~/mixins/WargearMixin';

export default {
  name: 'Wargear',
  layout: 'forge',
  components: {
    WargearSelect,
    WargearSearch,
  },
  mixins: [
    CharacterCreationMixin,
    SluggerMixin,
    WargearMixin,
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
      advancedShoppingChart: [],
    };
  },
  computed: {
    showAdvancedStartingWargearSection() {
      return this.characterArchetypeKey === 'advanced';
    },
    showArchetypeStartingWargearSection() {
      return this.characterArchetypeKey !== 'advanced' && this.startingWargear && this.startingWargear.length > 0;
    },
    // total: 20, max: 9, maxRarity: 'Rare', maxRarityItems: 2,
    advancedWargearRestrictions() {
      return this.getAdvancedWargearOptionByTier(this.characterArchetypeTier);
    },
    advancedWargearSpend() {
      let spend = 0;
      this.advancedShoppingChart.forEach((gear) => {
        spend += parseInt(gear.value);
      });
      return spend;
    },
    advancedWargearByRarity() {
      const rarityCount = {
        uncommon: this.advancedShoppingChart.filter((gear) => gear.rarity === 'Uncommon').length,
        common: this.advancedShoppingChart.filter((gear) => gear.rarity === 'Common').length,
        rare: this.advancedShoppingChart.filter((gear) => gear.rarity === 'Rare').length,
        veryRare: this.advancedShoppingChart.filter((gear) => gear.rarity === 'Very Rare').length,
        unique: this.advancedShoppingChart.filter((gear) => gear.rarity === 'Unique').length,
      };
      return rarityCount;
    },
    advancedWargearViolations() {
      const alerts = [];
      const restrictions = this.advancedWargearRestrictions;
      if (restrictions) {
        // max total spend
        if ( this.advancedWargearSpend > restrictions.total ) {
          alerts.push(`You spend ${this.advancedWargearSpend} of your allowed ${restrictions.total} points.`);
        }
        // max per item spend
        const violating = this.advancedShoppingChart.filter((gear) => gear.value > restrictions.max);
        if ( violating.length > 0 ) {
          alerts.push(`${violating.length} item|s cost more than ${restrictions.max}`);
        }
        // within rarity of items
        if ( restrictions.rarity && restrictions.rarity.rare > restrictions.rarity.rare ) {
          alerts.push(`You selected ${this.advancedWargearByRarity.rare} Rare items, but are only allowed ${restrictions.rarity.rare}`);
        }
        if ( restrictions.rarity && this.advancedWargearByRarity.veryRare > restrictions.rarity.veryRare ) {
          alerts.push(`You selected ${this.advancedWargearByRarity.veryRare} Very Rare items, but are only allowed ${restrictions.rarity.veryRare}`);
        }
        if ( restrictions.rarity && this.advancedWargearByRarity.unique > restrictions.rarity.unique ) {
          alerts.push(`You selected ${this.advancedWargearByRarity.unique} Unique items, but are only allowed ${restrictions.rarity.unique}`);
        }
        //this.advancedShoppingChart.
      }
      return alerts;
    },
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
    settingTier() {
      return this.$store.getters['characters/characterSettingTierById'](this.characterId);
    },
    characterArchetypeKey() {
      return this.$store.getters['characters/characterArchetypeKeyById'](this.characterId);
    },
    characterArchetypeLabel() {
      return this.$store.getters['characters/characterArchetypeLabelById'](this.characterId);
    },
    characterArchetypeTier() {
      return this.$store.getters['characters/characterArchetypeTierById'](this.characterId);
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
          gear = this.wargearList.find((wargear) => chargear.name.localeCompare(wargear.name, 'en' , {sensitivity: 'accent'}) === 0);
          if (gear) {
            gear.id = chargear.id;
            gear.source = chargear.source;
            characterWargear.push({
              id: chargear.id,
              name: gear.name,
              subtitle: this.wargearSubtitle(gear),
              type: gear.type,
              avatar: this.getAvatar(gear.type),
              source: chargear.source,
            });
          } else {
            characterWargear.push({
              id: chargear.id,
              name: chargear.name,
              type: 'Misc',
              subtitle: 'Misc',
              avatar: this.getAvatar('Misc'),
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
    getAvatar(type) {
      return `/img/icon/wargear/${this.textToKebab(type)}.svg`;
    },
    addToBasket(gear) {
      this.advancedShoppingChart.push(gear);
    },
    removeFromBasket(index) {
      console.info(index)
      this.advancedShoppingChart.splice(index, 1);
    },
    addWargearToCharacter(wargearOptions, source) {
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
        this.$store.commit('characters/addCharacterWargear', { id: this.characterId, name: w.name, variant: w.variant, source });
      });

      this.advancedShoppingChart.length = 0;
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
      return this.wargearList ? this.filterWargear(this.wargearList, filter, this.settingTier) : [];
    },
  },
};
</script>

<style scoped lang="css">
</style>
