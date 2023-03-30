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
            :key="talent.id"
          >
            <v-expansion-panel-header>
              <template v-slot:default="{ open }">
                <v-row no-gutters>
                  <v-col :cols="8" :sm="10" class="subtitle-1">
                    <span v-html="talent.label" />
                  </v-col>
                  <v-col :cols="4" :sm="2">
                    <v-btn color="error" x-small @click.stop.prevent="removeTalent(talent)">remove</v-btn>
                  </v-col>
                  <v-col v-if="!open" :cols="8" :sm="10" class="caption grey--text">
                    {{ talent.snippet }}
                  </v-col>
                </v-row>
              </template>
            </v-expansion-panel-header>

            <v-expansion-panel-content>
              <div class="mb-4">
                <span>Cost:</span>
                <v-chip v-if="talent.extraCost" label x-small>
                  {{ talent.cost+talent.extraCost }} XP
                </v-chip>
                <v-chip v-else label x-small>
                  {{ talent.cost }} XP
                </v-chip>
              </div>

              <div class="body-2 mb-2" v-html="talent.snippet"></div>

              <v-alert
                v-if="talent.alert"
                :type="talent.alert.type"
                dense
                text
              >{{talent.alert.text}}</v-alert>

              <div v-if="talent.options">
                <v-select
                  :value="talent.selected"
                  :items="talent.options"
                  item-text="name"
                  item-value="key"
                  :placeholder="talent.optionsPlaceholder"
                  filled
                  dense
                  @input="talentUpdateSelected($event, talent)"
                />
              </div>

              <div v-if="['core-loremaster','core-hatred'].includes(talent.key)">
                <v-select
                  :value="talent.selected"
                  :items="selectableKeywordOptions"
                  item-text="name"
                  item-value="name"
                  label="Select a keyword, you know much about those dudes, like really much"
                  filled
                  dense
                  @input="talentUpdateSelected($event, talent)"
                />
              </div>

              <div v-if="talent.key === 'core-trademark-weapon'">
                <v-select
                  :value="talent.selected"
                  :items="talentTrademarkWeaponOptions.filter( w => ['Melee Weapon','Ranged Weapon'].includes(w.type))"
                  item-text="name"
                  item-value="name"
                  label="This weapon and you are good pals"
                  filled
                  dense
                  @input="talentUpdateSelected($event, talent)"
                />
              </div>

              <div v-if="talent.key && talent.key.startsWith('core-augmetic')">
                <wargear-select
                  v-if="wargearList"
                  v-for="(gearOptions, index) in talent.wargear"
                  :key="index"
                  :item="gearOptions.selected"
                  :repository="computeWargearOptionsByFilter(gearOptions.options[0])"
                  class="mb-4"
                  @input="talentAugmeticImplantsUpdateImplantChoice($event, gearOptions.key, talent)"
                />
              </div>

              <div v-if="talent.key === 'red1-devastator-doctrine'">
                <v-select
                  v-if="wargearList"
                  :value="talent.selected"
                  :items="wargearList.filter((gear) => ['Heavy Bolter','Heavy Flamer','Lascannon','Missile Launcher','Multi-Melta','Plasma Cannon'].includes(gear.name))"
                  item-text="name"
                  item-value="key"
                  label="Select your big big heretic purging tool"
                  filled
                  dense
                  @input="talentDevastatorDoctrineWeaponChoiceLabel($event, talent)"
                />
              </div>

              <div v-if="talent.key === 'core-special-weapons-trooper'">
                <v-select
                  v-if="wargearList"
                  :value="talent.selected"
                  :items="wargearList.filter((gear) => ['Combat Shotgun','Flamer','Hot-Shot Lasgun','Meltagun','Plasma Gun','Voss Pattern Grenade Launcher', 'Astartes Sniper Rifle'].includes(gear.name))"
                  item-text="name"
                  item-value="key"
                  label="Select a Special Weapon to make YOU special"
                  filled
                  dense
                  @input="talentSpecialWeaponTrooperUpdateWeaponChoiceLabel($event, talent)"
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
                :disabled="characterTalentLabels.includes(item.name) && !item.allowedMultipleTimes"
                x-small
                @click="addTalent(item)"
              >
                add
              </v-btn>
            </template>

            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <div class="pt-4 pb-2" v-html="item.snippet">
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
import WargearMixin from '~/mixins/WargearMixin';
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
    WargearMixin,
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
        /*{
          text: 'Effect',
          value: 'effect',
          sortable: false,
        },*/
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
        'fspg',
        'red1',
        'cos',
        // 'tnh',
        ...this.settingHomebrews,
      ];
    },
    remainingBuildPoints() {
      return this.$store.getters['characters/characterRemainingBuildPointsById'](this.characterId);
    },
    speciesLabel() {
      return this.$store.getters['characters/characterSpeciesLabelById'](this.characterId);
    },
    finalKeywords() {
      return this.$store.getters['characters/characterKeywordsFinalById'](this.characterId);
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
      return this.characterTalents.filter((talent) => talent).map((talent) => talent.name);
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

      const talents = characterTalents.filter((t) => t).map((talent) => {

        // find the plain talent by key
        const rawTalent = this.talentList.find((r) => r.key === talent.key);

        // not found? return a custom talent without special properties and no cost
        if (rawTalent === undefined) {
          console.warn(`No talent found for ${talent.key}::${talent.name}, using dummy talent.`);
          return {
            id: talent.id,
            label: `${talent.name} (<strong>Broken</strong>, please remove!)`,
            name: talent.name,
            key: talent.key,
            snippet: 'ATTENTION, this is a legacy talent, remove and re-add again.',
            cost: 0,
          }
        }

        const aggregatedTalent = Object.assign({}, rawTalent);
        console.info(`[${talent.id}] Found ${aggregatedTalent.name} for ${talent.key}`);

        aggregatedTalent.id = talent.id;
        aggregatedTalent.cost = talent.cost;
        aggregatedTalent.label = aggregatedTalent.name;

        // for each special talent, check respectively
        if (talent.selected) {
          aggregatedTalent.selected = talent.selected;
          aggregatedTalent.extraCost = 0;
          if (talent.extraCost && typeof talent.extraCost === 'object') {
            Object.keys(talent.extraCost).forEach((extraCostKey) => {
              aggregatedTalent.extraCost  += talent.extraCost[extraCostKey] ? talent.extraCost[extraCostKey] : 0;
            });
          } else {
            aggregatedTalent.extraCost += talent.extraCost && parseInt(talent.extraCost) ? talent.extraCost : 0;
          }
          if (aggregatedTalent.options) {
            const replacementTargetString = aggregatedTalent.options.find((t) => t.key === talent.selected).name;
            aggregatedTalent.label = aggregatedTalent.name.replace(/(\[.*\])/, `<em>(${replacementTargetString})</em>`);
            console.info(`[${talent.id}] Compute label ${aggregatedTalent.label} from ${talent.selected}/${replacementTargetString}`);
          } else {
            aggregatedTalent.label = aggregatedTalent.name.replace(/(\[.*\])/, `<em>(${talent.selected})</em>`);
          }
        }

        // Fetch gear for selected weapon trooper
        if (['core-special-weapons-trooper'].includes(aggregatedTalent.key)) {
          const sourceKey = `talent.${aggregatedTalent.id}`;
          const charGear = this.characterWargear.filter((gear) => gear.source && gear.source.startsWith(sourceKey));
          if (charGear && charGear.length > 0 && this.wargearList) {
            const wargear = this.wargearList.find((g) => g.name === charGear[0].name);
            aggregatedTalent.selected = wargear.key;
            aggregatedTalent.label = `${aggregatedTalent.name} <em>(${wargear.name})</em>`;
            /*
            charGear.forEach( g => {
              characterPackage
              .wargearOptions.find(o=>o.key === characterPackage.wargearChoice)
              .selectList.find(s=> g.source.endsWith(s.key))
                .itemChoice = g.name
            });
            */
          }
        }

        if (['red1-devastator-doctrine'].includes(aggregatedTalent.key)) {
          const sourceKey = `talent.${aggregatedTalent.id}`;
          const charGear = this.characterWargear.filter((gear) => gear.source && gear.source.startsWith(sourceKey));
          if (charGear && charGear.length > 0 && this.wargearList) {
            const wargear = this.wargearList.find((g) => g.name === charGear[0].name);
            aggregatedTalent.selected = wargear.key;
            aggregatedTalent.label = `${aggregatedTalent.name} <em>(${wargear.name})</em>`;
          }
        }

        // Fetch gear for selected augmetis
        if (aggregatedTalent.key.startsWith('core-augmetic')) {
          console.info(`[${aggregatedTalent.id}] Check if gear exists for ...`)
          aggregatedTalent.wargear.forEach((g, i, warArray) => {
            const sourceKey = `talent.${aggregatedTalent.id}.${g.key}`;
            console.info(`[${aggregatedTalent.id}] Searching for <${sourceKey}>...`);
            const charGear = this.characterWargear.filter((gear) => gear.source && gear.source.startsWith(sourceKey));
            if (charGear && charGear.length > 0 && this.wargearList) {
              console.info(`[${aggregatedTalent.id}] Found ${charGear.length} gears ${charGear[0].name} for the source...`);
              const wargear = this.wargearList.find((g) => g.name === charGear[0].name);
              console.info(`[${aggregatedTalent.id}] found ${wargear.name}...`);
              g.selected = wargear.name;
              console.info(g.selected)

            }
          });
          console.info(`[${aggregatedTalent.id}] DONE.`);
        }

        return aggregatedTalent;
      }).sort((a, b) => a.id.localeCompare(b.id));
      //console.warn(talents.map((t) => t.wargear[0].selected).join('-'));
      return talents;
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
      //filteredTalents = filteredTalents.filter((t) => t.allowedMultipleTimes || !this.characterTalentLabels.includes(t.name));

      filteredTalents = filteredTalents.map((talent) => {
        let fulfilled = true;

        // has prerequisites
        if (talent.requirements && talent.requirements.length > 0) {
          talent.requirements.forEach((requirement) => {
            switch (requirement.type) {

              // condition: 'must', type: 'keyword', key: ['Adeptus Ministorum', 'Adepta Sororitas'],
              case 'keyword':
                const lowercaseKeywords = this.finalKeywords.map((k) => k.toUpperCase());
                const found = requirement.key.some((k) => {
                  return lowercaseKeywords.includes(k.toString().toUpperCase());
                });
                if (
                  (requirement.condition === 'must' && !found)
                  || (requirement.condition === 'mustNot' && found)
                ) {
                  fulfilled = false;
                }
                break;

              // condition: 'must', type: 'attribute', key: 'Willpower', value: '3+',
              case 'attribute':
                const attribute = this.attributeRepository.find((a) => a.key == requirement.key);
                if (attribute) {
                  const charAttributeValue = this.characterAttributesEnhanced[attribute.key];
                  if (charAttributeValue < requirement.value) {
                    fulfilled = false;
                  }
                } else {
                  console.warn(`No attribute found for ${requirement.key}.`);
                }
                break;

              // condition: 'must', type: 'skill', key: 'Ballistic Skill', value: '4+',
              case 'skill':
                const skill = this.skillRepository.find((a) => a.key == requirement.key);
                if (skill) {
                  const charSkillValue = this.characterSkills[skill.key];
                  if (charSkillValue < requirement.value) {
                    fulfilled = false;
                  }
                } else {
                  console.warn(`No skill found for ${requirement.key}.`);
                }
                break;

              case 'character':
                switch (requirement.key) {
                  case 'Tier':
                    fulfilled = (this.effectiveCharacterTier <= requirement.value)
                    break;
                  case 'Rank':
                    fulfilled = (this.characterRank <= requirement.value)
                    break;
                }
                break;

              case 'species':
                fulfilled = requirement.value.some((s) => s.toString() === this.speciesLabel);
                break;

              default:
                console.info(`Unexpected requirement -> ${JSON.stringify(requirement)}`);
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
    talentHatredKeywordOptions() {
      return this.keywordRepository.filter((k) => k.placeholder === undefined && k.name.indexOf('<') !== 0);
    },
    selectableKeywordOptions() {
      return this.keywordRepository.filter((k) => k.name.indexOf('[') !== 0);
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
          const prerequisitesHtml = this.requirementsToText(talent).join(', ');
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
      const talentUniqueId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
      const payload = {
        id: talentUniqueId,
        name: talent.name,
        key: talent.key,
        cost: talent.cost,
        placeholder: (match !== null && match !== undefined) ? match[1] : undefined,
        selected: undefined,
        source: `talent.${talentUniqueId}`,
      };
      this.$store.commit('characters/addCharacterTalent', { id: this.characterId, talent: payload });
    },
    removeTalent(talent) {
      const id = this.characterId;
      const source = `talent.${talent.id}`;
      this.$store.commit('characters/clearCharacterEnhancementsBySource', { id, source });
      this.$store.commit('characters/removeCharacterWargearBySource', { id, source });
      this.$store.commit('characters/removeCharacterTalent', { id, talentId: talent.id });
    },
    requirementsToText(item) {
      const texts = [];

      if (item.requirements === undefined || item.requirements.length <= 0) {
        return ['-'];
      }

      item.requirements.forEach((p) => {
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
            text = `${this.getAttributeByKey(p.key).name} Rating ${p.value}+`;
            break;

          case 'skill':
            text = `${this.getSkillByKey(p.key).name} Rating ${p.value}+`;
            break;

          case 'character':
            text = `${p.key} ${p.value}+`;
            break;

          case 'species':
            if (p.condition === 'mustNot') {
              text = `<strong>must not</strong> ${p.value} Species`;
            } else {
              text = `${p.value} Species`
            }
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
      const id = this.characterId;
      const talentPayload = {
        id: talent.id,
        key: talent.key,
        name: talent.name,
        selected: selectedValue,
      };
      /*
      const selectedOption = talent.options.find((o) => o.key === selectedValue);
      if(selectedOption && selectedOption.modifications) {
        this.$store.commit('characters/setCharacterModifications', { id: this.characterId, content: { modifications: selectedOption.modifications, source: `talent.${talent.id}` } });
      }
      */
      this.$store.commit('characters/setCharacterTalentSelected', { id, talent: talentPayload });
    },
    talentAugmeticImplantsUpdateImplantChoice(gear, itemKey, talent) {

      const id = this.characterId;
      const name = gear.name;
      const source = `talent.${talent.id}.${itemKey}`;

      this.$store.commit('characters/removeCharacterWargearBySource', { id, source });
      this.$store.commit('characters/addCharacterWargear', { id, name, source });

      // TODO obsolete ?
      this.talentUpdateSelected(name, talent);

      // We add the additional point costs to the talent
      const talentPayload = {
        charId: this.characterId,
        id: talent.id,
        key: talent.key,
        name: talent.name,
        extraKey: itemKey,
        extraCost: parseInt(gear.value),
      };
      this.$store.commit('characters/setCharacterTalentExtraCost', talentPayload);
    },
    talentSpecialWeaponTrooperUpdateWeaponChoiceLabel(key, talent) {
      const wargear = this.wargearList.find((gear) => gear.key === key);
      this.talentSpecialWeaponTrooperUpdateWeaponChoice(wargear, talent);
    },
    talentSpecialWeaponTrooperUpdateWeaponChoice(wargear, talent) {
      const payload = {
        id: this.characterId,
        name: wargear.name,
        source: `talent.${talent.id}.weapon`,
      };
      this.$store.commit('characters/removeCharacterWargearBySource', payload);
      this.$store.commit('characters/addCharacterWargear', payload);

      this.talentUpdateSelected(wargear.name, talent);

      // We add the additional point costs to the talent
      const talentPayload = {
        charId: this.characterId,
        id: talent.id,
        key: talent.key,
        name: talent.name,
        extraKey: 'special-weapon',
        extraCost: parseInt(wargear.value),
      };
      this.$store.commit('characters/setCharacterTalentExtraCost', talentPayload);
    },
    talentDevastatorDoctrineWeaponChoiceLabel(key, talent) {
      const wargear = this.wargearList.find((gear) => gear.key === key);
      this.talentDevastatorDoctrineUpdateWeaponChoice(wargear, talent);
    },
    talentDevastatorDoctrineUpdateWeaponChoice(wargear, talent) {
      const payload = {
        id: this.characterId,
        name: wargear.name,
        source: `talent.${talent.id}.weapon`,
      };
      this.$store.commit('characters/removeCharacterWargearBySource', payload);
      this.$store.commit('characters/addCharacterWargear', payload);

      this.talentUpdateSelected(wargear.name, talent);
    },
    toggleTalentGroupsFilter(name) {
      if (this.selectedTalentGroups.includes(name)) {
        this.selectedTalentGroups = this.selectedTalentGroups.filter((d) => d !== name);
      } else {
        this.selectedTalentGroups.push(name);
      }
    },
    computeWargearOptionsByFilter(filter) {
      return this.wargearList ? this.filterWargear(this.wargearList, filter, this.settingTier) : [];
    },
  },
};
</script>

<style scoped lang="css">
</style>
