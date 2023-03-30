<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <div class="page page--din-a-4">
      <!-- grid list with low margin -->
      <v-container>
        <v-row no-gutters>
          <v-col :cols="12" style="text-align: center;">
            <h1 class="headline" >
              {{ characterName }}
            </h1>
            <span class="caption" >
              {{ [ `Rank ${characterRank}`, speciesLabel, archetypeLabel, `Tier ${characterSettingTier}` ].join(' • ') }}
            </span>
            <span class="sexy_line" />
            <span class="caption mb-2">
              {{ keywords.join(' • ') }}
            </span>
          </v-col>

          <!-- attributes and traits -->
          <v-col :cols="4">
            <v-col :cols="12" class="pa-1">
              <v-card>
                <v-toolbar color="red" dark dense height="32">
                  <v-toolbar-title>Attributes</v-toolbar-title>
                </v-toolbar>

                <v-simple-table
                  dense
                >
                  <thead>
                    <tr>
                      <th v-for="header in attributeHeaders">
                        {{ header.text }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in attributes">
                      <td class="text-left pa-1 small">
                        {{ item.name }}
                      </td>
                      <td class="text-center pa-1 small">
                        {{ item.rating }}
                      </td>
                      <td class="text-center pa-1 small">
                        {{ item.adjustedRating }}
                      </td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </v-card>
            </v-col>

            <v-col :cols="12" class="pa-1">
              <v-card>
                <v-toolbar color="red" dark dense height="32">
                  <v-toolbar-title>Traits</v-toolbar-title>
                </v-toolbar>

                <v-simple-table
                  :headers="traitHeaders"
                  :items="groupedTraits"
                  dense
                >
                  <tbody>
                    <tr v-for="item in groupedTraits">
                      <td class="text-left pa-1 small">
                        <span>{{ item.name }}</span>
                        <span v-if="item.name === 'Max Wounds'" style="float: right;">{{ '☐'.repeat(item.adjustedRating) }}</span>
                        <span v-if="item.name === 'Max Shock'" style="float: right;">{{ '☐'.repeat(item.adjustedRating) }}</span>
                        <span v-if="item.name === 'Wealth'" style="float: right;">{{ '☐'.repeat(item.adjustedRating) }}</span>
                        <em v-if="item.name==='Resilience' && armour.length>0">
                          @{{ armour[0].name }} ({{ armour[0].meta[0].armourRating }})
                        </em>
                      </td>
                      <td v-if="item.name==='Resilience'" class="text-center pa-1 small">
                        {{ item.adjustedRating}}
                      </td>
                      <td v-else class="text-center pa-1 small">
                        {{ item.adjustedRating }}<span v-if="item.alternativeRating">/{{ item.alternativeRating }}</span>
                      </td>
                    </tr>
                    <tr v-if="characterFaith && characterFaith.points > 0">
                      <td class="text-left pa-1 small">
                        <span>Faith</span>
                        <span style="float: right;">{{ '☐'.repeat(characterFaith.points) }}</span>
                      </td>
                      <td class="text-center pa-1 small">
                        {{ characterFaith.points }}
                      </td>
                    </tr>
                  </tbody>
                </v-simple-table>

                <v-data-table
                  v-if="false"
                  :headers="traitHeaders"
                  :items="traits.filter(i=>i.type === 'Combat')"
                  hide-footer
                  hide-actions
                >
                  <template v-slot:items="props">
                    <tr>
                      <td class="text-left pa-1 small">
                        {{ item.name }}
                      </td>
                      <td class="text-center pa-1 small">
                        {{ item.enhancedValue }}
                      </td>
                    </tr>
                  </template>
                </v-data-table>

                <v-data-table
                  v-if="false"
                  :headers="traitHeaders"
                  :items="traits.filter(i=>i.type === 'Mental')"
                  hide-footer
                  hide-actions
                >
                  <template v-slot:items="props">
                    <tr>
                      <td class="text-left pa-1 small">
                        {{ item.name }}
                      </td>
                      <td class="text-center pa-1 small">
                        {{ item.enhancedValue }}
                      </td>
                    </tr>
                  </template>
                </v-data-table>

                <v-data-table
                  v-if="false"
                  :headers="traitHeaders"
                  :items="traits.filter(i=>i.type === 'Social')"
                  hide-footer
                  hide-actions
                >
                  <template v-slot:items="props">
                    <tr>
                      <td class="text-left pa-1 small">
                        {{ item.name }}
                      </td>
                      <td class="text-center pa-1 small">
                        {{ item.enhancedValue }}
                      </td>
                    </tr>
                  </template>
                </v-data-table>
              </v-card>
            </v-col>
          </v-col>

          <!-- skills -->
          <v-col :cols="4">
            <v-col :cols="12" class="pa-1">
              <v-card>
                <v-toolbar color="red" dark dense height="32">
                  <v-toolbar-title>Skills</v-toolbar-title>
                </v-toolbar>

                <v-simple-table
                  dense
                >
                  <thead>
                    <tr>
                      <th v-for="header in skillHeaders">
                        {{ header.text }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in skills">
                      <td class="text-left pa-1 small">
                        {{ item.name }}
                      </td>
                      <td class="text-center pa-1 small">
                        {{ item.value }}
                      </td>
                      <td class="text-center pa-1 small">
                        {{ item.attribute.substring(0,3) }}
                        ({{item.attributeObject.adjustedRating}})
                      </td>
                      <td class="text-center pa-1 small">
                        {{ computeSkillPool(item) }}<span v-if="item.conditionalAdjustment !== 0">/{{ computeSkillPool(item)+item.conditionalAdjustment }}</span>
                      </td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </v-card>
            </v-col>
          </v-col>

          <v-col :cols="4">
            <v-row justify="center" no-gutters>
              <v-col :cols="12" class="pa-1">
                <v-card >
                  <v-toolbar color="red" dark dense height="32">
                    <v-toolbar-title>Objectives</v-toolbar-title>
                  </v-toolbar>

                  <v-card-text
                    v-for="(objective, index) in objectives"
                    :key="objective.name"
                    class="pl-2 pr-2 pt-1 pb-1 caption"
                  >
                    <strong>{{ index+1 }}:</strong> {{ objective.text }}
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col :cols="12" class="pa-1" v-show="false">
                <v-card >
                  <v-card-text class="pa-1 pl-2 pr-2">
                    <p class="caption mb-1">
                      Spend one <strong>Wrath</strong> to:
                    </p>
                    <ul class="pl-3">
                      <li class="caption">
                        Re-roll failures once on a test
                      </li>
                      <li class="caption">
                        Re-roll failures once on a soak attempt
                      </li>
                      <li class="caption">
                        Add +1 to a Defiance check
                      </li>
                      <li class="caption">
                        Make a narrative declaration
                      </li>
                      <li class="caption">
                        As an Action: restore 1d3+1 Shock
                      </li>
                    </ul>
                  </v-card-text>

                  <v-card-text class="pa-1 pl-2 pr-2">
                    <p class="caption mb-1">
                      Spend one <strong>Glory</strong> to:
                    </p>
                    <ul class="pl-3">
                      <li class="caption">
                        Add +1d to a test after any re-rolls
                      </li>
                      <li class="caption">
                        Add +1 damage to a successful attack
                      </li>
                      <li class="caption">
                        Increase the severity of a Critical Hit
                      </li>
                      <li class="caption">
                        Seize the Initiative
                      </li>
                    </ul>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col :cols="12" class="pa-1">
                <v-card>
                  <v-toolbar color="red" dark dense height="32">
                    <v-toolbar-title>Languages</v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                    <p>{{ languages.map((l)=>l.name).join(' • ') }}</p>
                  </v-card-text>
                </v-card>
              </v-col>

            </v-row>
          </v-col>


          <v-col :cols="12">
            <v-card>
              <v-toolbar color="red" dark dense height="32">
                  <v-toolbar-title>Weapons</v-toolbar-title>
              </v-toolbar>

              <v-data-table
                :headers="weaponHeaders"
                :items="weapons"
                hide-default-footer
                dense
              >
                <template v-slot:item="{ item }">

                  <tr
                      v-if="item.meta"
                      v-for="(meta, metaIndex) in item.meta.filter(m => m.type.indexOf('-weapon') > 0)"
                      :key="`${item.name}-${metaIndex}`"
                  >

                    <td class="text-left pa-1 small">
                      {{ item.name }}
                      <template v-if="item.meta.length > 1">
                        <span v-if="meta.type === 'melee-weapon'">(Melee)</span>
                        <span v-else-if="meta.type === 'ranged-weapon'">(Ranged)</span>
                      </template>
                    </td>

                    <td class="text-center pa-1 small">
                      <div v-if="meta.damage">
                        <div v-if="meta.damage.static === '*'">*</div>
                        <div v-else>
                          <span v-if="meta.type==='melee-weapon'">{{ meta.damage.static + attributes.find((a)=>a.key==='strength').adjustedRating }}*</span>
                          <span v-else>{{ meta.damage.static }}</span>
                          <span> + </span>
                          <span>{{ meta.damage.ed }} ED</span>
                        </div>
                      </div>
                    </td>

                    <td class="text-center pa-1 small">
                      {{meta.ap}}
                    </td>

                    <td class="text-center pa-1 small">
                      {{ isNaN(meta.salvo) ? '-' : meta.salvo }}
                    </td>

                    <td class="text-center pa-1 small">
                        <span v-if="meta.range > 4">
                          {{ meta.range/2 }} | {{ meta.range }} | {{ meta.range*1.5 }}
                        </span>
                      <span v-else-if="meta.range > 1">{{ meta.range }} m</span>
                      <span v-if="meta.range === 1">melee</span>
                      <span v-if="isNaN(meta.range) && meta.range.startsWith('STRx')">{{meta.range}}</span>
                    </td>

                    <td class="text-left pa-1 small">
                      <span v-if="meta.traits && meta.traits.length >0">{{ meta.traits.join(', ') }}</span>
                      <span v-else>-</span>
                    </td>

                  </tr>
                </template>
              </v-data-table>

              <div class="ma-1">
                <p
                  v-for="trait in weaponsTraitSet"
                  v-if="traitByName(trait)"
                  :key="trait"
                  class="body-2 caption text-snippet"
                >
                  <strong>{{ traitByName(trait).name }}: </strong>
                  <span v-if="traitByName(trait).crunch">{{ traitByName(trait).crunch }}</span>
                  <span v-else>{{ traitByName(trait).description }}</span>
                </p>
              </div>

            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div class="page page--din-a-4">
      <!-- grid list with low margin -->
      <v-container>
        <v-row justify="center" no-gutters>
          <v-col :cols="12">
            <v-row justify="left" no-gutters>


              <!-- powers -->
              <v-col :cols="12" class="pa-1">
                <v-card v-if="psychicPowers.length > 0">
                  <v-toolbar color="red" dark dense height="32">
                    <v-toolbar-title>Psychic Powers</v-toolbar-title>
                  </v-toolbar>

                  <v-data-table
                    :headers="psychicPowersHeaders"
                    :items="psychicPowers"
                    hide-default-footer
                    :items-per-page="-1"
                  >
                    <template v-slot:item="{ item }">
                      <tr>
                        <td class="text-left pa-1 small">
                          {{ item.name }}
                        </td>
                        <td class="text-center pa-1 small">
                          {{ item.crunch_difficulty_number }}
                        </td>
                        <td class="text-center pa-1 small">
                          {{ item.crunch_activation }}
                        </td>
                        <td class="text-center pa-1 small">
                          {{ item.crunch_duration }}
                        </td>
                        <td class="text-center pa-1 small">
                          {{ item.crunch_range }}
                        </td>
                        <td class="text-center pa-1 small">
                          {{ item.crunch_multi_target }}
                        </td>
                        <td class="text-left pa-1 small">
                          {{ item.effect }}
                        </td>
                      </tr>
                    </template>
                  </v-data-table>
                </v-card>
              </v-col>

              <!-- abilities -->

              <v-col :cols="6" class="pa-1">
                <v-card>
                  <v-toolbar color="red" dark dense height="32">
                    <v-toolbar-title>Abilities</v-toolbar-title>
                  </v-toolbar>

                  <v-card-text class="pa-0 pl-1 pr-1">

                    <div v-for="ability in abilities" :key="ability.name" class="caption pb-3">

                      <strong>{{ ability.name }}</strong>
                      <em v-if="ability.source">  • {{ ability.source }}</em>

                      <div v-if="ability.snippet"><span v-html="computeFormatedText(ability.snippet)"></span></div>
                      <div v-else v-html="computeFormatedText(ability.description)"></div>

                      <div v-if="ability.selectedOption" class="ml-1 pl-2 mt-1" style="border-left: solid 3px lightgrey;">
                        <strong v-if="ability.selectedOption.name">{{ ability.selectedOption.name }}</strong>
                        <span v-if="ability.selectedOption.snippet">{{ability.selectedOption.snippet}}</span>
                      </div>

                      <div
                          v-if="ability.selectedOptions"
                          v-for="selectedOption in ability.selectedOptions"
                          class="ml-1 pl-2 mt-1"
                          style="border-left: solid 3px lightgrey;"
                      >
                        <strong>{{ selectedOption.name }}</strong>
                        <div v-if="selectedOption.snippet"><p class="mb-1" v-html="computeFormatedText(selectedOption.snippet)"></p></div>
                        <div v-else v-html="computeFormatedText(selectedOption.description)"></div>
                      </div>

                    </div>

                  </v-card-text>

                </v-card>
              </v-col>

              <v-col :cols="6">
                <v-col v-if="talents.length > 0" :cols="12" class="pa-1">
                  <v-card>
                    <v-toolbar color="red" dark dense height="32">
                      <v-toolbar-title>Talents</v-toolbar-title>
                    </v-toolbar>

                    <v-card-text class="pa-0 pl-1 pr-1">
                      <div v-for="talent in talents" :key="talent.name" class="mb-3 caption">
                        <strong>{{ talent.name }}</strong>
                        <div v-if="talent.snippet"><p class="mb-1" v-html="computeFormatedText(talent.snippet)"></p></div>
                        <div v-else v-html="computeFormatedText(talent.description)"></div>
                        <div
                          v-if="talent.selectedOptions"
                          v-for="selectedOption in talent.selectedOptions"
                          class="ml-1 pl-2"
                          style="border-left: solid 3px lightgrey;"
                        >
                          <strong>{{ selectedOption.name }}</strong>
                          <div v-if="selectedOption.snippet"><p class="mb-1" v-html="computeFormatedText(selectedOption.snippet)"></p></div>
                          <div v-else v-html="computeFormatedText(selectedOption.description)"></div>
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>

                <v-col v-if="gear.length > 0" :cols="12" class="pa-1">
                  <v-card>
                    <v-toolbar color="red" dark dense height="32">
                      <v-toolbar-title>Gear</v-toolbar-title>
                    </v-toolbar>

                    <v-card-text v-for="gearItem in gear" :key="gearItem.name" class="pa-1 caption">
                      <div v-if="gearItem.variant" style="display: inline;">
                        <strong >{{ gearItem.variant }}</strong>
                        <span> ({{ gearItem.name }})</span>
                      </div>
                      <strong v-else>{{ gearItem.name }}</strong>
                      <em v-if="gearItem.type"> • {{gearItem.type}}</em>
                      <span v-if="gearItem.source">
                        <em v-if="gearItem.source.key"> • {{ gearItem.source.key }}</em><em v-if="!isNaN(gearItem.source.page)">, pg. {{ gearItem.source.page }}</em>
                      </span>
                      <p class="mb-0">{{ gearItem.snippet ? gearItem.snippet : gearItem.description }}</p>

                      <div
                        v-if="gearItem.meta !== undefined && gearItem.meta.length > 0 && ['armour'].includes(gearItem.meta[0].type)"
                      >
                          <p
                            class="ml-1 pl-2 mb-1"
                            style="border-left: solid 3px lightgrey;"
                            v-for="trait in gearItem.meta[0].traits"
                            v-if="traitByName(trait, true)"
                            :key="trait"
                          >
                            <strong>{{ trait }}: </strong>
                            {{ traitByName(trait, true).crunch }}
                          </p>
                      </div>

                    </v-card-text>
                  </v-card>
                </v-col>
              </v-col>

            </v-row>
          </v-col>


        </v-row>
      </v-container>
    </div>

  </div>
</template>

<script lang="js">
import BackgroundRepositoryMixin from '~/mixins/BackgroundRepositoryMixin';
import StatRepositoryMixin from '~/mixins/StatRepositoryMixin';
import MutationsMixin from '~/mixins/MutationsMixin';
import WargearTraitRepositoryMixin from '~/mixins/WargearTraitRepositoryMixin';
import KeywordRepository from '~/mixins/KeywordRepositoryMixin';

export default {
  name: 'Print',
  layout: 'print',
  components: {},
  mixins: [
    BackgroundRepositoryMixin,
    StatRepositoryMixin,
    MutationsMixin,
    KeywordRepository,
    WargearTraitRepositoryMixin,
  ],
  props: [],
  head() {
    return {
      title: this.characterName,
    };
  },
  async asyncData({ params, $axios }) {

    const psychicPowersResponse = await $axios.get('/api/psychic-powers/');
    const psychicAbilitiesResponse = await $axios.get('/api/psychic-powers/universal-abilities');
    const factionResponse = await $axios.get('/api/factions/');
    const chaptersResponse = await $axios.get('/api/species/chapters/');
    const talentResponse = await $axios.get('/api/talents/');

    return {
      characterId: params.id,
      astartesChapterRepository: chaptersResponse.data,
      psychicPowersRepository: psychicPowersResponse.data,
      psychicAbilitiesRepository: psychicAbilitiesResponse.data,
      factionRepository: factionResponse.data,
      talentRepository: talentResponse.data,
    };
  },
  data() {
    return {
      attributeHeaders: [
        { text: 'Attribute', sortable: false, align: 'left', class: 'small pa-1' },
        { text: 'Rating', sortable: false, align: 'center', class: 'small pa-1' },
        { text: 'Adjusted', sortable: false, align: 'center', class: 'small pa-1' },
      ],
      traitHeaders: [
         { text: 'Trait', sortable: false, align: 'left', class: 'small pa-1' },
        { text: 'Rating', sortable: false, align: 'center', class: 'small pa-1',
        },
      ],
      skillHeaders: [
        { text: 'Skill', sortable: false, align: 'left', class: 'small pa-1' },
        { text: 'Val', sortable: false, align: 'center', class: 'small pa-1' },
        { text: 'Att', sortable: false, align: 'center', class: 'small pa-1' },
        { text: 'Total', sortable: false, align: 'center', class: 'small pa-1' },
      ],
      weaponHeaders: [
        { text: 'Name', sortable: false, align: 'left', class: 'small pa-1' },
        { text: 'Damage', sortable: false, align: 'center', class: 'small pa-1' },
        { text: 'AP', sortable: false, align: 'center', class: 'small pa-1' },
        { text: 'Salvo', sortable: false, align: 'center', class: 'small pa-1' },
        { text: 'Range', sortable: false, align: 'center', class: 'small pa-1' },
        { text: 'Traits', sortable: false, align: 'left', class: 'small pa-1' },
      ],
      psychicPowersHeaders: [
         { text: 'Name', sortable: false, align: 'left', class: 'small pa-1' },
        { text: 'DN', sortable: false, align: 'center', class: 'small pa-1' },
        { text: 'Activation', sortable: false, align: 'center', class: 'small pa-1' },
        { text: 'Duration', sortable: false, align: 'center', class: 'small pa-1' },
        { text: 'Range', sortable: false, align: 'center', class: 'small pa-1' },
        { text: 'Multi-Target', sortable: false, align: 'center', class: 'small pa-1' },
        { text: 'Effect', sortable: false, align: 'left', class: 'small pa-1' },
      ],
      //
      characterSpecies: undefined,
      characterArchetype: undefined,
      ascensionPackagesRepository: undefined,
      wargearRepository: undefined,
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
    characterName() {
      return this.$store.getters['characters/characterNameById'](this.characterId);
    },
    characterSettingTier() {
      return this.$store.getters['characters/characterSettingTierById'](this.characterId);
    },
    characterRank() {
      return this.$store.getters['characters/characterCampaignCustomRankById'](this.characterId);
    },


    speciesKey() {
      return this.$store.getters['characters/characterSpeciesKeyById'](this.characterId);
    },
    speciesLabel() {
      return this.$store.getters['characters/characterSpeciesLabelById'](this.characterId);
    },
    speciesAstartesChapter() {
      return this.$store.getters['characters/characterSpeciesAstartesChapterById'](this.characterId);
    },
    characterMutations() {
      return this.$store.getters['characters/characterMutationsById'](this.$route.params.id);
    },
    archetypeKey() {
      return this.$store.getters['characters/characterArchetypeKeyById'](this.characterId);
    },
    archetypeLabel() {
      return this.$store.getters['characters/characterArchetypeLabelById'](this.characterId);
    },
    characterFactionKey() {
      return this.$store.getters['characters/characterFactionKeyById'](this.characterId);
    },
    characterBackgroundKey() {
      return this.$store.getters['characters/characterBackgroundKeyById'](this.characterId);
    },
    characterAscensionPackages() {
      return this.$store.getters['characters/characterAscensionPackagesById'](this.characterId);
    },

    keywords() {
      return this.$store.getters['characters/characterKeywordsFinalById'](this.characterId);
    },

    languages() {
      return this.$store.getters['characters/characterLanguagesById'](this.characterId);
    },

    characterAttributesEnhanced() {
      let enhancedAttributes = this.$store.getters['characters/characterAttributesEnhancedById'](this.characterId);
      // enrich with (equipped) gear
      if ( this.armour && this.armour.length > 0 ) {
        const armour = this.armour[0];
        const traits = armour.meta[0].traits;
        let poweredString = traits.find((trait)=>trait.includes('Powered'));
        if (poweredString) {
          const trait = this.normalizeTrait(poweredString);
          if ( trait.variant) {
            enhancedAttributes.strength = parseInt(enhancedAttributes.strength) + parseInt(trait.variant);
          }
        }
      }

      return enhancedAttributes;
    },
    attributes() {

      const characterAttributes = this.$store.getters['characters/characterAttributesById'](this.characterId);
      let attributes = this.attributeRepository.map((repositoryAttribute) => {
        /* {
           key: 'strength',
           name: 'Strength',
           description: 'Raw physical power.',
         } */
        return {
          ...repositoryAttribute,
          value: characterAttributes[repositoryAttribute.key],
          enhancedValue: parseInt(this.characterAttributesEnhanced[repositoryAttribute.key]),
          rating: characterAttributes[repositoryAttribute.key],
          adjustedRating: parseInt(characterAttributes[repositoryAttribute.key]),
          adjustment: 0,
          modifiers: [],
        };
      });

      this.enhancements
      .filter((enhancement)=>enhancement.targetGroup==='attributes')
      .forEach((enhancement)=>{
        // {"targetGroup":"attributes","targetValue":"strength","modifier":1,"source":"species"}
        let attr = attributes.find((a)=>a.key===enhancement.targetValue);
        attr.adjustment += enhancement.modifier;
        attr.adjustedRating += enhancement.modifier;
        attr.modifiers.push(`${enhancement.modifier < 0 ? '-' : '+'}${enhancement.modifier} • ${enhancement.provider} • ${enhancement.category}`);
      });

      attributes = attributes.map((a) => {
        if (a.adjustedRating < 1) {
          a.adjustedRating = Math.max(1, a.adjustedRating);
          a.modifiers.push('(i) Value is increase to at least 1.');
        }
        return a;
      });

      let poweredStrength = 0;
      // enrich with (equipped) gear
      if ( this.armour && this.armour.length > 0 ) {
        const armour = this.armour[0];
        const traits = armour.meta[0].traits;
        let poweredString = traits.find((trait)=>trait.includes('Powered'));
        if (poweredString) {
          const trait = this.normalizeTrait(poweredString);
          if ( trait.variant) {
            poweredStrength = parseInt(trait.variant);
            let strength = attributes.find((a)=>a.key==='strength');
            strength.adjustedRating += poweredStrength;
            strength.adjustment += poweredStrength;
            strength.modifiers.push(`+${poweredStrength} from Armour • ${armour.name}`);
          }
        }
      }

      return attributes;
    },
    traits() {
      const characterTraits = this.$store.getters['characters/characterTraitsById'](this.characterId);
      const traitsEnhanced = this.$store.getters['characters/characterTraitsEnhancedById'](this.characterId);
      const attributes = this.attributes;

      let finalTraits = this.traitRepository.map((t) => {

        let baseTraitValue = 0;

        let relatedAttribute = attributes.find((attribute) => attribute.name === t.attribute);
        if (t.key === 'influence' && this.speciesKey === 'core-ork') {
          relatedAttribute = attributes.find((attribute) => attribute.name === 'Strength');
        }

        if (relatedAttribute) {
          baseTraitValue += Math.ceil(relatedAttribute.adjustedRating * t.compute.multi);
        } else {
          let relatedSkill = this.skills.find((skill) => skill.name === t.skill);
          if (relatedSkill) {
            // todo better find the correct value
            baseTraitValue += Math.ceil(this.computeSkillPool(relatedSkill) * t.compute.multi);
          }
        }

        if (t.key === 'speed') {
          baseTraitValue = traitsEnhanced[t.key];
        }

        baseTraitValue += t.compute.static;
        baseTraitValue += t.compute.tier * this.characterSettingTier ;

        const enhancedValue = baseTraitValue;
        const aggregatedTrait = {
          ...t,
          value: enhancedValue,
          enhancedValue: enhancedValue,
          rating: enhancedValue,
          adjustedRating: enhancedValue,
          adjustment: 0,
          modifiers: [`Base = ${baseTraitValue}`],
        };

        return aggregatedTrait;
      });

      this.enhancements
      .filter((enhancement) => enhancement.targetGroup==='traits')
      .forEach((enhancement) => {
        // {"targetGroup":"attributes","targetValue":"strength","modifier":1,"source":"species"}
        let traity = finalTraits.find((a) => a.key === enhancement.targetValue);
        let mody = enhancement.modifier;
        if (enhancement.rank) {
          mody += (enhancement.rank * this.characterRank );
        }
        if (enhancement.modifierPerAscendedTier) {
          mody += (enhancement.modifierPerAscendedTier * enhancement.ascendedTiers);
        }
        if ( traity ) {
          traity.adjustment += mody;
          traity.adjustedRating += mody;
          traity.modifiers.push(`${mody < 0 ? '-' : '+'}${mody} • ${enhancement.provider} (${enhancement.category})`);
        } else {
          console.warn(`Unexpected undefined trait for ${enhancement.targetValue}.`);
        }
      });

      if (this.armour && this.armour.length > 0) {
        let resilience = finalTraits.find((a) => a.key === 'resilience');
        let defence = finalTraits.find((a) => a.key === 'defence');
        const wornArmour = this.armour
        .filter((armour) => !armour.meta[0].traits.includes('Shield'))
        .sort((a, b) => a.meta[0].armourRating < b.meta[0].armourRating ? 1 : -1)
        .find((i) => true)
        if (wornArmour) {
          resilience.adjustment += wornArmour.meta[0].armourRating;
          resilience.adjustedRating += wornArmour.meta[0].armourRating;
          resilience.modifiers.push(`+${wornArmour.meta[0].armourRating} from ${wornArmour.name}`);
        }
        const wornShield = this.armour
        .filter((armour) => armour.meta[0].traits.includes('Shield'))
        .sort((a, b) => a.meta[0].armourRating < b.meta[0].armourRating ? 1 : -1)
        .find((i) => true);
        if (wornShield) {
          resilience.adjustment += wornShield.meta[0].armourRating;
          resilience.adjustedRating += wornShield.meta[0].armourRating;
          resilience.modifiers.push(`+${wornShield.meta[0].armourRating} from ${wornShield.name}`);
          defence.adjustment += wornShield.meta[0].armourRating;
          defence.adjustedRating += wornShield.meta[0].armourRating;
          defence.modifiers.push(`+${wornShield.meta[0].armourRating} from ${wornShield.name}`);
        }
      }

      let influence = finalTraits.find((t) => t.key === 'influence');
      if (influence && this.keywords.includes('Adeptus Mechanicus')) {
        const intellect = attributes.find((attribute) => attribute.name === 'Intellect');
        let baseIntellect = 0;
        baseIntellect = influence.calculate(intellect.adjustedRating);
        influence.baseHelp = `${influence.baseHelp} / ${baseIntellect} (with Adeptus Mechanicus)`;
        influence.alternativeRating = baseIntellect + influence.adjustment;
      }

      finalTraits
      .filter((t)=>['maxWounds', 'maxShock', 'wealth'].includes(t.key))
      .forEach((t)=>{
        t.spend = this.$store.getters['characters/characterResourceSpendById'](this.characterId, t.key);
      });

      return finalTraits;
    },
    groupedTraits() {
      return [
        ...this.traits.filter((i) => i.type === 'Combat'),
        ...this.traits.filter((i) => i.type === 'Mental'),
        ...this.traits.filter((i) => i.type === 'Social'),
      ];
    },
    skills() {
      const customSkills = this.$store.getters['characters/characterCustomSkillsById'](this.characterId);
      const adHocSkillRepository = [
        ...this.skillRepository,
        ...customSkills,
      ];

      const characterSkills = this.$store.getters['characters/characterSkillsById'](this.characterId);

      let skills = adHocSkillRepository.map((repositorySkill) => {
        const skill = {
          ...repositorySkill,
          value: characterSkills[repositorySkill.key],
          enhancedValue: parseInt(characterSkills[repositorySkill.key]),
          rating: characterSkills[repositorySkill.key],
          adjustedRating: parseInt(characterSkills[repositorySkill.key]),
          adjustment: 0,
          conditionalAdjustment: 0,
          dnPenalty: 0,
          modifiers: [],
          conditionals: [],
          adjustedAttributeValue: 0,
          attributeObject: {},
        };
        const attribute = this.attributes.find((a) => a.name === skill.attribute);
        if (attribute) {
          skill.attributeObject = attribute;
          skill.adjustedAttributeValue = attribute.adjustedRating;
        }
        return skill;
      });

      /**
       * modifiers [
       *  { value: 3, type: 'BONUS_DICE', condition: null || 'when attacking AELDARI', provider: 'Hatret (AELDARI)', category: 'Talent' },
       * ]
       */

      // We search all enhancements that have SKILL modifications
      this.enhancements
      .filter((enhancement) => enhancement.targetGroup==='skills')
      .forEach((enhancement) => {
        let skill = skills.find((a) => a.key === enhancement.targetValue);
        let mody = enhancement.modifier;
        if (enhancement.rank) {
          mody += (enhancement.rank * this.characterRank);
        }
        if ( skill ) {
          const modifier = {
            value: mody,
            valueString: `${mody < 0 ? '-' : '+'}${mody}`,
            type: 'MODIFIER',
            condition: enhancement.condition || null,
            provider: enhancement.provider,
            category: enhancement.category,
          };
          skill.modifiers.push(modifier);
          if (enhancement.condition) {
            skill.conditionalAdjustment += mody;
          } else {
            skill.adjustment += mody;
            skill.adjustedRating += mody;
          }
        } else {
          console.warn(`Unexpected undefined skill for ${enhancement.targetValue}.`);
        }
      });

      return skills;
    },

    talentsForFaith() {
      if ( this.talents.length > 0 ) {
        return this.talents.filter( talent => talent.groupKey && talent.groupKey === 'core-faith' );
      }
      return [];
    },

    characterFaith() {
      //const points = this.$store.getters['characters/characterFaithPointsById'](this.characterId);
      const spend = this.$store.getters['characters/characterFaithSpendById'](this.characterId);
      let points = 0;
      this.talentsForFaith.forEach((t)=>{
        points += 1;
      });

      return { points, spend };
    },

    characterEnhancements() {
      return this.$store.getters['characters/characterEnhancementsById'](this.characterId);
    },

    /**
     * Enriched enhancements, gather all directly given and also drived from other sources
     * modifier (current) { targetGroup, targetValue, modifier, rank, condition, source }
     * modifier (proposal) { value: 3, type: 'BONUS_DICE', condition: null || 'when attacking AELDARI', provider: 'Hatret (AELDARI)', category: 'Talent' },
     */
    enhancements() {
      let finalEnhancements = [];

      if (!this.wargearRepository) {
        return finalEnhancements;
      }

      // from species
      if (this.characterSpecies) {
        this.characterSpecies.speciesFeatures
        .filter((feature) => feature.modifications)
        .forEach((feature) => {
          feature.modifications.forEach((mod) => {
            const newMod = {
              ...mod,
              provider: feature.name,
              category: this.characterSpecies.name,
              source: this.characterSpecies.source,
            };
            finalEnhancements.push(newMod);
          });
          if ( feature.options ) {
            const traitSelection = this.characterEnhancements.find( (e) => e.source.startsWith(`species.${feature.name}.`));
            console.info(traitSelection)
          }
        })
      }

      // from archetype
      if (this.characterArchetype) {
        this.characterArchetype.archetypeFeatures
        .filter((feature) => feature.modifications)
        .forEach((feature) => {
          feature.modifications.forEach((mod) => {
            const newMod = {
              ...mod,
              provider: feature.name,
              category: this.characterArchetype.name,
              source: this.characterArchetype.source,
            };
            finalEnhancements.push(newMod);
          });
        });
        if(this.characterArchetype.influence) {
          const newMod = {
            targetGroup: 'traits',
            targetValue: 'influence',
            modifier: this.characterArchetype.influence,
            provider: 'Archetype Influence',
            category: this.characterArchetype.name,
            source: this.characterArchetype.source,
          };
          finalEnhancements.push(newMod);
        }
      }

      // from ascensions
      const ascensionRepository = this.ascensionPackagesRepository;
      if (ascensionRepository && ascensionRepository.length > 0) {
        ascensionRepository.forEach((ascension) => {
          const ascendedTiers = ascension.targetTier - ascension.sourceTier;
          ascension.ascensionFeatures.forEach((feature) => {
            if (feature.modifications) {
              feature.modifications.forEach((mod) => {
                const newMod = {
                  ...mod,
                  ascendedTiers,
                  provider: feature.name,
                  category: ascension.name,
                  source: ascension.source,
                };
                finalEnhancements.push(newMod);
              });
            }
          });
        });
      }

      // existing enhancements (Excluding those from the RAW package)
      if (this.characterEnhancements) {
        this.characterEnhancements
        .filter((mod) => mod.source
          && mod.source !== 'species'
          && mod.source !== 'archetype'
          && mod.source !== 'ascension'
        )
        .forEach((mod) => {
          let provider = 'Unknown';
          let category = 'Unknown';
          const sourceParts = mod.source.split('.');
          if (sourceParts.length === 1) {
            provider = '';
            category = sourceParts[0].charAt(0).toUpperCase() + sourceParts[0].slice(1);
          }
          if (sourceParts.length > 1) {
            provider = mod.name || sourceParts.slice(1).join(' • ');
            category = sourceParts[0].charAt(0).toUpperCase() + sourceParts[0].slice(1);
          }
          const newMod = {
            ...mod,
            provider,
            category,
          };
          finalEnhancements.push(newMod);
        });
      }

      // from talents
      this.talents
      .filter((talent) => talent.modifications)
      .forEach((talent) => {
        talent.modifications.forEach((mod) => {
          const newMod = {
            ...mod,
            provider: talent.name,
            category: 'Talent',
          };
          finalEnhancements.push(newMod);
        });
      });

      // from (equipped) wargear, mostly cybernetics
      if (this.gear && this.gear.length >0) {
        let modGear = this.gear
        .filter((gear) => gear.modifications)
        .forEach((gear) => {
          gear.modifications.forEach(mod => {
            const newMod = {
              ...mod,
              provider: gear.name,
              category: 'Wargear',
            };
            return finalEnhancements.push(newMod);
          });
        });
      }

      // from keywords
      this.keywords.forEach( k => {
        const keyword = this.keywordCombinedRepository.find( i => i.name === k );
        if ( keyword === undefined ) {
          console.warn(`No keyword found for ${k}!`);
        } else if ( keyword.modifications ) {
          keyword.modifications.forEach(mod => {
            const newMod = {
              ...mod,
              provider: keyword.name,
              category: 'Keyword',
            };
            return finalEnhancements.push(newMod);
          });
        }
      });

      // from mutations
      this.mutations
      .filter((mutation) => mutation.modifications)
      .forEach((mutation) => {
        if (mutation.modifications) {
          mutation.modifications.forEach(mod => {
            const newMod = {
              ...mod,
              provider: mutation.name,
              category: 'Mutation',
            };
            return finalEnhancements.push(newMod);
          });
        }
      });

      // from others TODO

      return finalEnhancements;
    },

    speciesAbilities(){
      const abilities = [];

      if (this.characterSpecies !== undefined && this.characterSpecies.speciesFeatures) {

        this.characterSpecies.speciesFeatures.forEach( (speciesTrait) => {
          // Honour the Chapter
          if (speciesTrait.name === 'Honour the Chapter') {
            const chapter = this.astartesChapterRepository.find((a) => a.key === this.speciesAstartesChapter) || [];
            const traditions = chapter.beliefsAndTraditions;
            if (traditions !== undefined) {
              traditions.forEach((t) => {
                const tradition = {
                  name: t.name,
                  effect: t.effect,
                  snippet: t.effect,
                  source: chapter.name,
                };
                abilities.push(tradition);
              });
            }
          } else {
            // other abilities
            const ability = {
              name: speciesTrait.name,
              effect: speciesTrait.snippet ? speciesTrait.snippet : speciesTrait.description,
              snippet: speciesTrait.snippet,
              description: speciesTrait.description,
              source: this.speciesLabel,
              hint: this.speciesLabel,
              selectedOptions: [],
            };
            if ( speciesTrait.options ) {
              const traitSelections = this.characterEnhancements.filter( (e) => e.source.startsWith(`species.${speciesTrait.name}.`));
              if ( traitSelections ) {
                traitSelections.forEach((selection) => {
                  if (selection.effect) {
                    ability.selectedOptions.push({
                      name: selection.name,
                      effect: selection.effect,
                      snippet: selection.effect,
                    });
                  } else if (selection.name) {
                    ability.selectedOptions.push({
                      name: selection.name,
                    });
                  }
                })
              }
            }
            abilities.push(ability);
          }
        });
      }

      return abilities;
    },
    archetypeAbilities() {
      const abilities = [];
      const archetype = this.characterArchetype;

      if (archetype && archetype.archetypeFeatures) {
        archetype.archetypeFeatures.forEach( (item) => {
          const ability = {
            name: item.name,
            effect: item.snippet ? item.snippet : item.description,
            snippet: item.snippet,
            description: item.description,
            source: archetype.name,
            hint: archetype.name,
          };
          abilities.push(ability);
        });
      }
      return abilities;
    },
    ascensionAbilities() {
      const abilities = [];

      const ascensionPackages = this.characterAscensionPackages;
      const ascensionRepository = this.ascensionPackagesRepository;

      if (ascensionRepository && ascensionRepository.length > 0) {

        ascensionRepository.forEach((ascension) => {

          ascension.ascensionFeatures
          .filter((feature) => feature.hideInSheet === undefined || feature.hideInSheet === false)
          .forEach((feature) => {
            const ability = {
              name: feature.name,
              effect: feature.snippet ? feature.snippet : feature.description, // todo deprecated
              snippet: feature.snippet,
              description: feature.description,
              source: ascension.name,
              hint: ascension.name,
            };

            if ( feature.options ) {
              const featureOption = this.characterEnhancements.find( (e) => e.source.startsWith(`ascension.${ascension.key}.${feature.key}.`));
              if ( featureOption ) {
                if ( featureOption.targetValue ) {
                  ability['selectedOption'] = {
                    effect: featureOption.targetValue, // todo e.g. corruption
                    snippet: featureOption.targetValue,
                  };
                } else { // e.g. memorabie injury
                  ability['selectedOption'] = {
                    name: featureOption.name,
                    effect: featureOption.effect,
                    snippet: featureOption.effect,
                  };
                }
              }
            }
            abilities.push(ability);
          });
        });
      }

      return abilities;
    },
    otherAbilities() {
      const abilities = [];

      // keyword abilities
      this.keywords.forEach( k => {
        const keyword = this.keywordCombinedRepository.find( i => i.name === k );
        if ( keyword === undefined ) {
          console.warn(`No keyword found for ${k}!`);
        } else if ( keyword.effect ) {
          const keywordAbility = {
            name: keyword.effectLabel ? keyword.effectLabel : keyword.name,
            effect: keyword.effect, // Deprecated
            snippet: keyword.effect,
            source: keyword.effectLabel ? `${keyword.name} Keyword` : `${keyword.type} Keyword`,
          };
          abilities.push(keywordAbility);
        }
      });

      // background abilities
      if (this.characterBackgroundKey) {
        this.backgroundRepository
        .filter((b) => b.key === this.characterBackgroundKey)
        .forEach((b) => {
          const backgroundAbility = {
            name: b.name,
            effect: b.bonus, // Deprecated
            snippet: b.bonus,
            source: 'Background',
          };
          const backgroundEnhancements = this.characterEnhancements.find( (e) => e.source.startsWith(`background.`));
          if (backgroundEnhancements) {
            backgroundAbility.selectedOption = {
              name: backgroundEnhancements.targetValue,
            }
          }
          abilities.push(backgroundAbility);
        });
      }

      // mutations
      if (this.mutations) {
        this.mutations.forEach((item) => {
          item.source = 'Mutation',
            abilities.push(item);
        });
      }

      // other
      if (this.customAbilities) {
        this.customAbilities
        .filter( (a) => a.source && !a.source.startsWith('species.') && !a.source.startsWith('ascension.') )
        .forEach((item) => {
          const ability = {
            name: item.name,
            effect: item.effect,
            snippet: item.effect,
          };
          abilities.push(ability);
        });
      }

      return abilities;
    },
    abilities() {
      return [
        ...this.speciesAbilities,
        ...this.archetypeAbilities,
        ...this.ascensionAbilities,
        ...this.otherAbilities
      ];
    },

    customAbilities() {
      return this.characterEnhancements ? this.characterEnhancements.filter( (i) => i.targetGroup === 'abilities' ) : [];
    },
    talents() {
      const characterTalents = this.$store.getters['characters/characterTalentsById'](this.characterId);
      const finalTalents = [];
      characterTalents.forEach((charTalent) => {
        const rawTalent = this.talentRepository.find((t) => t.key === charTalent.key);
        if (rawTalent) {
          const ability = {
            name: rawTalent.name,
            snippet: rawTalent.snippet,
            description: rawTalent.description,
            source: rawTalent.source,
            hint: rawTalent.name,
            groupKey: rawTalent.groupKey,
            selectedOptions: [],
            modifications: rawTalent.modifications || [],
          };

          if (rawTalent.wargear && this.charGear){

            const gear = this.charGear.filter((g) => g.source && g.source.startsWith(`talent.${charTalent.id}.`));
            if (gear) {
              gear.forEach((g) => {
                ability.selectedOptions.push({ name: g.name });
              });
            }
          }

          if (charTalent.selected) {
            if (rawTalent.options) {
              const choice = this.getTalentOption(rawTalent, charTalent.selected);
              ability.name = ability.name.replace(/\[.*\]/, `(${choice.name})`);

              if (choice.modifications) {
                console.info(`Additional modifications found for the selected choice.`)
                ability.modifications.push(...choice.modifications);
              }

              if (choice.effect || choice.snippet ) {
                ability.selectedOptions.push({ name: choice.name, snippet: choice.snippet });
              }
            } else {
              ability.name = ability.name.replace(/\[.*\]/, `(${charTalent.selected})`);
            }
          }
          finalTalents.push(ability);
        } else {
          console.info(`No talent found for ${charTalent.key}`);
        }
      });
      return finalTalents.sort((a, b) => a.name.localeCompare(b.name));
    },
    mutations() {
      const finalMutations = [];
      this.characterMutations.forEach((charMutation) => {
        const rawMutation = this.mutationsRepository.find((m) => m.key === charMutation.key);
        if (rawMutation) {
          const ability = {
            id: charMutation.id,
            name: rawMutation.name, // we use the custom name
            snippet: rawMutation.snippet,
            description: rawMutation.description,
            source: rawMutation.source,
            hint: rawMutation.name,
            selectedOptions: [],
            modifications: rawMutation.modifications || [],
          };
          if (charMutation.selected) {
            if (rawMutation.options) {
              const choice = rawMutation.options.find((m) => m.key === charMutation.selected);
              if (choice.modifications) {
                console.info(`Additional modifications found for the selected choice.`)
                ability.modifications.push(...choice.modifications);
              }
              if (choice.snippet ) {
                ability.selectedOptions.push(choice);
              }
            } else {
              ability.name = ability.name.replace(/\[.*\]/, `(${charMutation.selected})`);
            }
          }
          finalMutations.push(ability);
        } else {
          console.info(`No mutation found for ${charMutation.key}`);
        }
      });
      return finalMutations.sort((a, b) => a.name.localeCompare(b.name));
    },
    charGear() {
      return this.$store.getters['characters/characterWargearById'](this.characterId);
    },
    wargear() {
      const chargear = this.charGear;
      const wargear = [];
      if(this.wargearRepository) {
        chargear.forEach((gear) => {
          const foundGear = this.wargearRepository.find((w) => gear.name.localeCompare(w.name,
            'en',
            { sensitivity: 'accent' }) === 0);
          if (foundGear) {
            wargear.push({ ...foundGear, variant: gear.variant });
          } else {
            wargear.push({ name: gear.name, variant: gear.variant, type: 'Misc' });
          }
        });
      }
      return wargear;
    },
    weapons() {
      return this.wargear.filter((w) => ['Ranged Weapon', 'Melee Weapon'].includes(w.type));
    },
    armour() {
      return this.wargear.filter((w) => ['Armour'].includes(w.type));
    },
    gear() {
      return this.wargear.filter((w) => !['Ranged Weapon', 'Melee Weapon'].includes(w.type));
    },
    psychicPowers() {
      const powers = this.$store.getters['characters/characterPsychicPowersById'](this.characterId).map((p) => p.name);
      const items = [];
      powers.forEach((name) => {
        const power = this.psychicPowersRepository.find((power) => power.name === name);
        items.push(power);
      });
      if (
          ( this.keywords && this.keywords.includes('Psyker') ) ||
          items.length > 0
      ) {
        items.push(...this.psychicAbilitiesRepository);
      }
      return items;
    },
    objectives() {
      if (this.characterArchetype && this.factionRepository) {
        const faction = this.factionRepository.find((faction) => faction.name === this.characterArchetype.faction);
        if (faction) {
          const objectiveList = faction.objectives;
          if (objectiveList) {
            return objectiveList.map((o) => ({ text: o }));
          }
        }
      } else {
        if (this.characterFactionKey) {
          const faction = this.factionRepository.find((faction) => faction.key === this.characterFactionKey);
          if (faction) {
            const objectiveList = faction.objectives;
            if (objectiveList) {
              return objectiveList.map((o) => ({ text: o }));
            }
          }
        }
      }
      return [];
    },
    weaponsTraitSet() {
      let weaponsTraitSet = [];
      const { weapons } = this;

      weapons.forEach((weapon) => {
        // item.meta[0].traits
        if (weapon.meta[0] && weapon.meta[0].traits && weapon.meta[0].traits.length > 0) {
          weaponsTraitSet = [...weaponsTraitSet, ...weapon.meta[0].traits];
        }
      });
      weaponsTraitSet = weaponsTraitSet.map((t) => t.split(/ ?\(/)[0]);
      return [...new Set(weaponsTraitSet)].sort();
    },
  },
  watch: {
    speciesKey: {
      handler(newVal) {
        if (newVal && newVal !== 'unknown') {
          this.loadSpecies(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
    archetypeKey: {
      handler(newVal) {
        if (newVal) {
          this.loadArchetype(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
    characterAscensionPackages: {
      handler(newVal) {
        if (newVal && newVal !== 'unknown') {
          this.getAscensionPackageList(newVal);
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
    async loadSpecies(key) {
      let finalData = {};
      if ( key.startsWith('custom-')) {
        const speciesDetails = this.$store.getters['species/getSpecies'](key);
        finalData = speciesDetails;
      } else {
        const { data } = await this.$axios.get(`/api/species/${key}`);
        finalData = data;
      }
      this.characterSpecies = finalData;
    },
    async loadArchetype(key) {
      if ( key ) {
        if (key === 'advanced'){
          const mimic = this.$store.getters['characters/characterArchetypeMimicById'](this.characterId);
          if (mimic) {
            const { data } = await this.$axios.get(`/api/archetypes/${mimic}`);
            this.characterArchetype = {
              faction: this.characterFactionKey.toLowerCase(),
              factionKey: this.characterFactionKey,
              archetypeFeatures: data.archetypeFeatures,
            };
          }
        } else {
          const { data } = await this.$axios.get(`/api/archetypes/${key}`);
          this.characterArchetype = data;
        }
      }
    },
    async getAscensionPackageList(ascensionList) {

      let packages = [];

      if ( ascensionList.length > 0 ){
        for (const ascension of ascensionList) {
          const { data } = await this.$axios.get(`/api/ascension-packages/${ascension.key}`);
          const enrichedAscension = {
            ...data,
            ...ascension,
          };
          packages.push(enrichedAscension);
        }
      }
      this.ascensionPackagesRepository = packages;
    },
    async getWargearList(sources) {
      const config = {
        params: {
          source: sources.join(','),
        },
      };
      const { data } = await this.$axios.get('/api/wargear/', config);
      //this.wargearRepository = data.filter((i) => i.stub === undefined || i.stub === false);
      this.wargearRepository = data;
    },
    computeSkillPool(skill) {
      const attribute = this.attributes.find((a) => a.name === skill.attribute);
      if (attribute) {
        return attribute.adjustedRating + skill.adjustedRating;
      }
      return skill.adjustedRating;
    },
    normalizeTrait(traitString) {
      const regex = /(\w+) ?\(?(\w+)?\)?/m;
      let trait = traitString.match(regex);
      let traitFromRep = this.wargearTraitRepository.find((item) => item.name === trait[1]);
      return {
        ...traitFromRep,
        variant: trait[2],
      };
    },
    traitByName(name, withParantesis = false) {
      if ( withParantesis ) {
        name = name.split(/ ?\(/)[0];
      }
      return this.wargearTraitRepository.find((item) => item.name === name);
    },
    getTalentOption(talent, choiceKey) {
      return talent.options.find((t) => t.key === choiceKey);
    },
    computeFormatedText(text) {
      if ( text === undefined ) {
        return text;
      }
      const rank = this.characterRank;
      let computed = text;

      // computed = computed.replace(/(1d3\+Rank Shock)/g, `<strong>1d3+${rank} Shock</strong>`);
      computed = computed.replace(/(\d+) Faith/g, '<em>$1 Faith</em>');
      computed = computed.replace(/(\d+ meters)/g, '<strong>$1</strong>');
      computed = computed.replace(/(\d+ metres)/g, '<strong>$1</strong>');
      computed = computed.replace(/15 \+Rank metres/g, `<strong title="15 +Rank meters">${15 + rank} meters</strong>`);
      computed = computed.replace(/15 \+Rank meters/g, `<strong title="15 +Rank meters">${15 + rank} meters</strong>`);
      computed = computed.replace(/15\+Double Rank metres/g, `<strong>${15 + (2*rank)} metres</strong>`);
      computed = computed.replace(/1\+Rank/g, `<strong>${(rank)+1}</strong>`);
      computed = computed.replace(/1\+Double Rank/g, `<strong>+${(2*rank)+1}</strong>`);
      computed = computed.replace(/2\+Double Rank/g, `<strong>${(2*rank)+2}</strong>`);
      computed = computed.replace(/3\+Double Rank/g, `<strong>${(2*rank)+3}</strong>`);
      computed = computed.replace(/15\+Double Rank/g, `<strong>${(2*rank)+15}</strong>`);
      computed = computed.replace(/20\+Double Rank/g, `<strong>${(2*rank)+20}</strong>`);
      computed = computed.replace(/\+Rank/g, `<strong>+${rank}</strong>`);
      computed = computed.replace(/\+Double Rank/g, `<strong>+${2*rank}</strong>`);
      computed = computed.replace(/10 ?x ?Rank/g, `<strong>${10*rank}</strong>`);
      computed = computed.replace(/10 ?x ?Double Rank/g, `<strong>${10*2*rank}</strong>`);
      computed = computed.replace(/ Double Rank/g, ` <strong>${2*rank}</strong>`);

      return computed;
    },
  },
};
</script>

<style scoped lang="css">

  .page {
    page-break-inside: avoid;
  }

  .page--din-a-4 {
    height: 297mm;
    width: 220mm;
    overflow: hidden;
  }

  .page-title {
  }

  .text-snippet {
    margin-bottom: 1.5mm;
    line-height: 1rem;
  }

  .small {
    height: 24px;
  }

  td.small {
    font-size: 3mm !important;
    height: 4mm !important;
  }

  .sexy_line{
    display:block;
    border:none;
    color:white;
    height:1px;
    background:black;
    background: -webkit-gradient(radial, 50% 50%, 0, 50% 50%, 350, from(#000), to(#fff));
  }
</style>
