<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>

    <v-row justify="center">

      <v-col :cols="12">
        <h1 class="headline">
          Manage Talents
        </h1>
      </v-col>

      <v-progress-circular v-if="!talentList && !wargearList" indeterminate color="success" size="128" width="12" />

      <v-col :cols="12">
        <v-expansion-panels multiple>
          <v-expansion-panel
            v-for="talent in characterTalentsEnriched"
            :key="talent.key"
          >
            <v-expansion-panel-header>
              <template v-slot:default="{ open }">
                <v-row no-gutters>
                  <v-col :cols="8" :sm="10" class="subtitle-1">
                    <span v-if="talent.selected" v-html="talent.name.replace(/(<.*>)/, `<em>${talent.selected}</em>`)" />
                    <span v-else>{{ talent.name }}</span>
                  </v-col>
                  <v-col :cols="4" :sm="2">
                    <v-btn color="error" x-small @click.stop.prevent="removeTalent(talent)">
                      remove
                    </v-btn>
                  </v-col>

                  <v-col v-if="!open" :cols="8" :sm="10" class="caption grey--text">
                    {{ talent.snippet ? talent.snippet : talent.effect }}
                  </v-col>
                </v-row>
              </template>
            </v-expansion-panel-header>

            <v-expansion-panel-content>
              <div class="mb-4">
                <span>Cost:</span>
                <v-chip v-if="talent.extraCost" label x-small>
                  {{ talent.cost+talent.extraCost }} BP
                </v-chip>
                <v-chip v-else label x-small>
                  {{ talent.cost }} BP
                </v-chip>
              </div>

              <div class="body-2" v-html="talent.description"></div>

              <div v-if="talent.id === 15">
                <v-select
                  :value="talent.selected"
                  :items="talentHatredKeywordOptions"
                  item-text="name"
                  item-value="name"
                  label="Select a species or faction to hate with the blaze of a thousand suns"
                  filled
                  dense
                  @input="talentUpdateSelected($event, talent)"
                />
              </div>

              <div v-if="talent.id === 20">
                <v-select
                  :value="talent.selected"
                  :items="talentLoremasterKeywordOptions"
                  item-text="name"
                  item-value="name"
                  label="Select a keyword, you know much about those dudes, like really much"
                  filled
                  dense
                  @input="talentUpdateSelected($event, talent)"
                />
              </div>

              <div v-if="talent.id === 54">
                <v-select
                  :value="talent.selected"
                  :items="talentTrademarkWeaponOptions.filter( w => w.type === 'Melee Weapon')"
                  item-text="name"
                  item-value="name"
                  label="This weapon and you are good pals"
                  filled
                  dense
                  @input="talentUpdateSelected($event, talent)"
                />
              </div>

              <div v-if="talent.id === 53">
                <v-select
                  :value="talent.selected"
                  :items="talentTrademarkWeaponOptions.filter( w => w.type === 'Ranged Weapon')"
                  item-text="name"
                  item-value="name"
                  label="You are often seen with that range weapon"
                  filled
                  dense
                  @input="talentUpdateSelected($event, talent)"
                />
              </div>

              <div v-if="talent.id === 83">
                <wargear-select
                  v-if="wargearList"
                  :item="talent.selected"
                  :repository="wargearList.filter( gear => {
                    const typeReq = ['Cybernetic'].includes(gear.type);
                    return (typeReq);
                  })"
                  class="mb-4"
                  @input="talentAugmeticImplantsUpdateImplantChoice($event, 'implant', talent)"
                />

                <v-alert type="info" dense elevation="2">
                  Currently, only the variant for a single item works correct.
                </v-alert>
              </div>

              <div v-if="false">
                <wargear-select
                  v-if="wargearList"
                  :item="talent.selected"
                  :repository="wargearList.filter( gear => {
                    const typeReq = ['Cybernetic'].includes(gear.type);
                    const rarityReq = ['Common', 'Uncommon', 'Rare'].includes(gear.rarity);
                    return (typeReq && rarityReq);
                  })"
                  class="mb-4"
                  @input="talentAugmeticImplantsUpdateImplantChoice($event, 'implant', talent)"
                />
              </div>

              <div v-if="talent.id === 36">
                <v-select
                  v-if="wargearList"
                  :value="talent.selected"
                  :items="wargearList.filter( gear => ['Combat Shotgun','Flamer','Hot-Shot Lasgun','Meltagun','Plasma Gun','Voss Pattern Grenade Launcher', 'Astartes Sniper Rifle'].includes(gear.name) )"
                  item-text="name"
                  item-value="name"
                  label="Select a Special Weapon to make YOU special"
                  filled
                  dense
                  @input="talentSpecialWeaponTrooperUpdateWeaponChoiceLabel($event, 'weapon', talent)"
                />
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>

      <v-col :cols="12" v-if="visibleTalentGroups.length > 1">
        <h3>
          Filter by Talent Group
          <span>
          <v-btn
            icon
            @click="talentGroupFilterHelp = !talentGroupFilterHelp"
            :color="talentGroupFilterHelp ? 'info' : ''"
          >
            <v-icon>{{talentGroupFilterHelp ? 'help' : 'help_outline'}}</v-icon>
          </v-btn>
        </span>
        </h3>
        <div v-show="talentGroupFilterHelp">
          <v-alert
            v-for="group in talentGroupList" :key="group.key"
            color="info"
            dense text
          >
            <strong>{{group.name}}</strong>
            <em class="caption"> • <abbr :title="group.source.book">{{ group.source.key }}</abbr> • pg. {{ group.source.page }}</em>
            <div v-html="group.description" class="caption"></div>
          </v-alert>
        </div>
        <v-chip
          v-for="item in visibleTalentGroups"
          :key="item.key"
          :color="selectedTalentGroups.includes(item.name) ? 'green' : ''"
          small
          label
          class="mr-2"
          @click="toggleTalentGroupsFilter(item.name)"
        >
          {{ item.name }}
        </v-chip>
      </v-col>

      <v-col :cols="12">
        <v-card>
          <v-card-title>
            <v-text-field
              v-model="searchQuery"
              filled
              dense
              prepend-inner-icon="search"
              clearable
              label="Search"
            />

            <v-switch
              v-model="filterOnlyPrerequisites"
              color="primary"
              label="Show only fulfilled prerequisites"
              class="pl-2"
            />
          </v-card-title>

          <v-data-table
            :headers="headers"
            :items="filteredTalents"
            :search="searchQuery"
            :page.sync="pagination.page"
            show-expand
            item-key="name"
            hide-default-footer
            :loading="!talentList"
            loading-text="Loading Talents... Please Wait"
            @page-count="pagination.pageCount = $event"
          >
            <template v-slot:no-data />

            <template v-slot:item.name="{ item }">
              <span>{{ item.name }}</span>
            </template>

            <template v-slot:item.cost="{ item }">
              <v-chip v-if="isAffordable(item.cost)" label x-small>
                {{ item.cost }}
              </v-chip>
              <v-chip v-else label x-small color="warning">
                {{ item.cost }}
              </v-chip>
            </template>

            <template v-slot:item.prerequisitesHtml="{ item }">
              <span v-html="item.prerequisitesHtml" />
            </template>

            <template v-slot:item.effect="{ item }">
              <span>{{ item.effect }}</span>
            </template>

            <template v-slot:item.buy="{ item }">
              <v-btn
                :color="'success'"
                :disabled="characterTalentLabels.includes(item.name)"
                x-small
                @click="addTalent(item)"
              >
                add
              </v-btn>
            </template>

            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <div class="pt-4 pb-2" v-html="item.description">
                </div>
              </td>
            </template>

            <template v-slot:no-results>
              <span class="text-center">Your search for "{{ searchQuery }}" found no results.</span>
            </template>
          </v-data-table>
          <div class="text-center pt-2">
            <v-pagination v-model="pagination.page" :length="pagination.pageCount" />
          </div>
        </v-card>
      </v-col>

      <issue-list :items="issues" />
    </v-row>
  </div>
</template>

<script lang="js">
import KeywordRepositoryMixin from '~/mixins/KeywordRepositoryMixin';
import StatRepositoryMixin from '~/mixins/StatRepositoryMixin';
import IssueList from '~/components/IssueList.vue';
import WargearSelect from '~/components/forge/WargearSelect.vue';

export default {
  name: 'Talents',
  layout: 'forge',
  components: {
    WargearSelect,
    IssueList,
  },
  mixins: [
    KeywordRepositoryMixin,
    StatRepositoryMixin,
  ],
  props: [],
  head() {
    return {
      title: 'Select Talents',
    };
  },
  async asyncData({ params, error }) {
    return {
      characterId: params.id,
    };
  },
  data() {
    return {
      issues: [
        'Allow to select specific "Acts of Faith".',
        'Allow to pick "Augments", add them to the wargear and compute the cost accordingly.',
        'Allow to pick some talents multiple times.',
      ],
      searchQuery: '',
      filterOnlyPrerequisites: false,
      pagination: {
        page: 1,
        pageCount: 0,
        sortBy: 'name',
        rowsPerPage: 25,
      },
      headers: [
        {
          text: 'Name',
          value: 'name',
          align: 'left',
          sortable: true,
        },
        {
          text: 'Cost',
          value: 'cost',
          align: 'center',
          sortable: true,
        },
        {
          text: 'Prerequisites',
          value: 'prerequisitesHtml',
          sortable: false,
        },
        {
          text: 'Effect',
          value: 'effect',
          sortable: false,
        },
        {
          text: 'Buy',
          value: 'buy',
          align: 'center',
          sortable: false,
        },
      ],
      talentDialog: false,
      talentList: undefined,
      wargearList: undefined,
      loading: false,
      talentGroupFilterHelp: false,
      selectedTalentGroups: ['Talents'],
      // Exarch Powers, Priest Prayers & Litanies, Chaos Rituals, ...
      talentGroupList: [
        {
          source: {
            book: 'Core Rules',
            key: 'core',
            page: 169,
          },
          key: 'core-talents',
          name: 'Talents',
          description:
            '<p>Talents represent a knack that a character possesses. Many grant characters a ' +
            'special ability, which others cannot undertake. Other talents provide situational ' +
            'benefits to a character. Each talent has an associated build point cost, and may have ' +
            'prerequisite attributes, keywords, skills, or species. Players are not required to ' +
            'select any talents for their characters. The maximum number of talents that may be ' +
            'purchased is limited by Tier.</p>',
        },
        /*
        {
          source: {
            book: 'An Abundance of Apocrypha',
            key: 'aaoa',
            page: 147,
          },
          key: 'aaoa-exarch-powers',
          name: 'Exarch Powers',
          description:
            '<p>The following abilities are unique powers and combat techniques exhibited by Exarchs, ' +
            'mighty Aeldari warriors who lead the Aspect Warrior shrines into battle and maintain ' +
            'those shrines during the all-too-rare times of peace.</p>' +
            '<p>An Exarch may <strong>purchase up to two of these powers</strong>, at the costs ' +
            'listed, so long as the Exarch meets the listed prerequisites. Some of the powers in ' +
            'this section are distinct to Exarchs of particular Aspect Temples, and they may only ' +
            'be selected by an Exarch of that temple.</p>' +
            '<p>Many of the powers in this section affect the Exarch’s students as well, granting a ' +
            'benefit to the Aspect Warriors under their command. An Exarch may <strong>consider all Aspect ' +
            'Warriors of the same type as the Exarch within 10m as being part of the Exarch’s squad.</strong></p>',
        },
        */
      ],
    };
  },
  computed: {
    settingHomebrews() {
      return this.$store.getters['characters/characterSettingHomebrewsById'](this.characterId);
    },
    sources() {
      return [
        'core',
        'coreab',
        ...this.settingHomebrews
      ];
    },
    effectiveCharacterTier() {
      return this.$store.getters['characters/characterEffectiveTierById'](this.characterId);
    },
    characterAttributesEnhanced() {
      return this.$store.getters['characters/characterAttributesEnhancedById'](this.characterId);
    },
    characterSkills() {
      return this.$store.getters['characters/characterSkillsById'](this.characterId);
    },
    characterTalents() {
      return this.$store.getters['characters/characterTalentsById'](this.characterId);
    },
    characterTalentLabels() {
      return this.characterTalents.map((t) => t.name);
    },
    characterWargear() {
      return this.$store.getters['characters/characterWargearById'](this.characterId);
    },
    characterTalentsEnriched() {
      // { id, name, cost, selection}
      if (this.talentList === undefined) {
        return [];
      }
      const characterTalents = this.$store.getters['characters/characterTalentsById'](this.characterId);

      return characterTalents.map((talent) => {
        const enrichedTalent = this.talentList.find((r) => r.name === talent.name);

        if (enrichedTalent === undefined) {
          return {
            name: talent.name,
            cost: 0,
          }
        }

        // for each special talent, check respectively
        if (talent.selected) {
          enrichedTalent.selected = talent.selected;
          enrichedTalent.extraCost = talent.extraCost;
        }

        // Fetch gear for selected weapon trooper
        if (['Special Weapons Trooper', 'Augmetic <Specific Implants>'].includes(enrichedTalent.name)) {
          const sourceKey = `talent.${enrichedTalent.id}`;
          const gear = this.characterWargear.filter((gear) => gear.source && gear.source.startsWith(sourceKey));
          if (gear && gear.length > 0) {
            console.log(gear);
            // enrichedTalent.selected = gear[0].name;
            /*
            gear.forEach( g => {
              characterPackage
              .wargearOptions.find(o=>o.key === characterPackage.wargearChoice)
              .selectList.find(s=> g.source.endsWith(s.key))
                .itemChoice = g.name
            });
            */
          }
        }

        return enrichedTalent;
      }).sort((a, b) => a.name.localeCompare(b.name));
    },
    filteredTalents() {
      if (this.talentList === undefined) {
        return [];
      }

      let filteredTalents = this.talentList;

      if (this.selectedTalentGroups.length > 0) {
        filteredTalents = filteredTalents.filter((t) => {
          return this.selectedTalentGroups.includes(t.talentGroup) || (t.talentGroup === undefined && this.selectedTalentGroups.includes('Talents'))
        });
      }

      // exclude those already picked
      filteredTalents = filteredTalents.filter((t) => !this.characterTalentLabels.includes(t.name));

      filteredTalents = filteredTalents.map((talent) => {
        let fulfilled = true;

        // has prerequisites
        if (talent.prerequisites.length > 0) {
          talent.prerequisites.forEach((prerequisite) => {
            switch (prerequisite.type) {
              // condition: 'must', type: 'keyword', key: ['Adeptus Ministorum', 'Adepta Sororitas'],
              case 'keyword':
                const found = prerequisite.key.some((prereqKeyword) => this.finalKeywords.includes(prereqKeyword));
                if (
                  (prerequisite.condition === 'must' && !found)
                  || (prerequisite.condition === 'mustNot' && found)
                ) {
                  fulfilled = false;
                }
                break;

              // condition: 'must', type: 'attribute', key: 'Willpower', value: '3+',
              case 'attribute':
                const attribute = this.attributeRepository.find((a) => a.name == prerequisite.key);
                if (attribute) {
                  const charAttributeValue = this.characterAttributesEnhanced[attribute.key];
                  const prereqAttributeValue = prerequisite.value.split('+')[0];
                  if (charAttributeValue < prereqAttributeValue) {
                    fulfilled = false;
                  }
                } else {
                  console.warn(`No attribute found for ${prerequisite.key}.`);
                }
                break;

              // condition: 'must', type: 'skill', key: 'Ballistic Skill', value: '4+',
              case 'skill':
                const skill = this.skillRepository.find((a) => a.name == prerequisite.key);
                if (skill) {
                  const charSkillValue = this.characterSkills[skill.key];
                  const prereqSkillValue = prerequisite.value.split('+')[0];
                  if (charSkillValue < prereqSkillValue) {
                    fulfilled = false;
                  }
                } else {
                  console.warn(`No skill found for ${prerequisite.key}.`);
                }
                break;

              // condition: 'must', type: 'character', key: 'Tier', value: '2+',
              case 'character':
                if (prerequisite.key === 'Tier') {
                  const prereqTierValue = prerequisite.value.split('+')[0];
                  if (this.effectiveCharacterTier <= prereqTierValue) {
                    fulfilled = false;
                  }
                }
                break;
            }
          });
        }
        talent.prerequisitesFulfilled = fulfilled;
        return talent;
      });

      // only show those whose prerequisites are met
      if (this.filterOnlyPrerequisites) {
        filteredTalents = filteredTalents.filter((talent) => talent.prerequisitesFulfilled === true);
      }

      return filteredTalents;
    },
    remainingBuildPoints() {
      return this.$store.getters['characters/characterRemainingBuildPointsById'](this.characterId);
    },
    finalKeywords() {
      return this.$store.getters['characters/characterKeywordsFinalById'](this.$route.params.id);
    },
    talentHatredKeywordOptions() {
      return this.keywordRepository.filter((k) => k.placeholder === undefined && k.name.indexOf('<') !== 0);
    },
    talentLoremasterKeywordOptions() {
      return this.keywordRepository.filter((k) => k.name.indexOf('<') !== 0);
    },
    talentTrademarkWeaponOptions() {
      const wargearLabels = this.$store.getters['characters/characterWargearById'](this.characterId).map((w) => w.name);
      const wargear = [];
      if (this.wargearList) {
        wargearLabels.sort().forEach((wargearName) => {
          const foundGear = this.wargearList.find((w) => w.name === wargearName);
          if (foundGear && ['Melee Weapon', 'Ranged Weapon'].includes(foundGear.type)) {
            wargear.push(foundGear);
          }
        });
      }
      return wargear;
    },
    visibleTalentGroups() {
      return this.talentGroupList.filter((t) => this.sources.includes(t.source.key));
    }
  },
  watch: {
    sources: {
      handler(newVal) {
        if (newVal) {
          this.getTalents(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
  },
  methods: {
    async getTalents(sources) {
      this.loading = true;
      const config = {
        params: { source: this.sources.join(','), },
      };
      {
        const { data } = await this.$axios.get('/api/talents/', config);
        this.talentList = data.map(talent => {
          const prerequisitesHtml = this.prerequisitesToText(talent).join(', ');
          return {
            ...talent,
            prerequisitesHtml,
          }
        });
      }
      {
        const { data } = await this.$axios.get('/api/wargear/', config);
        this.wargearList = data;
      }
      this.loading = false;
    },
    dynamicSort(property) {
      let sortOrder = 1;
      if (property[0] === '-') {
        sortOrder = -1;
        property = property.substr(1);
      }
      return function (a, b) {
        /* next line works with strings and numbers,
         * and you may want to customize it to your needs
         */
        const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
      };
    },
    isAffordable(cost) {
      return cost <= this.remainingBuildPoints;
    },
    addTalent(talent) {
      const match = talent.name.match(/(<.*>)/);
      const payload = {
        name: talent.name,
        key: talent.key,
        cost: talent.cost,
        placeholder: (match !== null && match !== undefined) ? match[1] : undefined,
        selected: undefined,
      };
      this.$store.commit('characters/addCharacterTalent', { id: this.characterId, talent: payload });
    },
    removeTalent(talent) {
      const payload = {
        id: this.characterId,
        source: `talent.${talent.id}`,
      };
      // ToDo? clear modifications by source
      this.$store.commit('characters/removeCharacterWargearBySource', payload);
      this.$store.commit('characters/removeCharacterTalent', { id: this.characterId, name: talent.name });
    },
    prerequisitesToText(item) {
      const texts = [];

      if (item.prerequisites === undefined || item.prerequisites.length <= 0) {
        return ['None'];
      }

      item.prerequisites.forEach((p) => {
        let text = '';

        switch (p.type) {
          case 'keyword':
          case 'talent':
            if (p.condition === 'mustNot') {
              text = `<strong>must not</strong> possess the ${p.key.join(' or ')} ${p.type}`;
            } else {
              text = `${p.key.join(' or ')}`;
            }
            break;

          case 'attribute':
          case 'skill':
          case 'character':
            text = `${p.key} ${p.value}`;
            break;

          default:
            text = `${p.key}`;
        }
        texts.push(text);
      });

      return texts;
    },

    /** Special Talent Selections */
    talentUpdateSelected(selectedValue, talent) {
      const talentPayload = {
        id: this.characterId,
        name: talent.name,
        selected: selectedValue,
      };
      this.$store.commit('characters/setCharacterTalentSelected', talentPayload);
    },
    talentAugmeticImplantsUpdateImplantChoice(gear, itemKey, talent) {
      const payload = {
        id: this.characterId,
        name: gear.name,
        source: `talent.${talent.id}.${itemKey}`,
      };
      this.$store.commit('characters/removeCharacterWargearBySource', payload);
      this.$store.commit('characters/addCharacterWargear', payload);

      this.talentUpdateSelected(gear.name, talent);

      // We add the additional point costs to the talent
      const talentPayload = {
        id: this.characterId,
        name: talent.name,
        extraCost: gear.value,
      };
      this.$store.commit('characters/setCharacterTalentExtraCost', talentPayload);
    },
    talentSpecialWeaponTrooperUpdateWeaponChoiceLabel(wargearName, itemKey, talent) {
      const wargear = this.wargearList.find((gear) => gear.name === wargearName);
      this.talentSpecialWeaponTrooperUpdateWeaponChoice(wargear, itemKey, talent);
    },
    talentSpecialWeaponTrooperUpdateWeaponChoice(wargear, itemKey, talent) {
      const payload = {
        id: this.characterId,
        name: wargear.name,
        source: `talent.${talent.id}.${itemKey}`,
      };
      this.$store.commit('characters/removeCharacterWargearBySource', payload);
      this.$store.commit('characters/addCharacterWargear', payload);

      this.talentUpdateSelected(wargear.name, talent);

      // We add the additional point costs to the talent
      const talentPayload = {
        id: this.characterId,
        name: talent.name,
        extraCost: wargear.value,
      };
      this.$store.commit('characters/setCharacterTalentExtraCost', talentPayload);
    },
    toggleTalentGroupsFilter(name) {
      if (this.selectedTalentGroups.includes(name)) {
        this.selectedTalentGroups = this.selectedTalentGroups.filter((d) => d !== name);
      } else {
        this.selectedTalentGroups.push(name);
      }
    },
  },
};
</script>

<style scoped lang="css">
</style>
