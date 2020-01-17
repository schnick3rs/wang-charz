<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <div>

    <v-row justify="center">
      <v-col :cols="12" class="elevation-4 mb-2 pa-0 ma-0">
        <v-breadcrumbs
          :items="breadcrumbItems"
          class="pa-2"
        >
          <template v-slot:item="{ item }">
            <v-breadcrumbs-item
              :nuxt="true"
              :to="item.to"
              :disabled="item.disabled"
              :exact="item.exact"
            >
              <img v-if="item.to == '/'" src="/favicon-16x16.png">
              {{ item.text }}
            </v-breadcrumbs-item>
          </template>

          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </v-col>
    </v-row>

    <v-row justify="center" align="center">

      <v-col :cols="3" :sm="2" :md="1">
        <v-avatar tile size="64">
          <img :src="avatar" >
        </v-avatar>
      </v-col>

      <!-- avatar, name, rank, tier, archetype, species -->
      <v-col :cols="8" :sm="6" :md="6">
        <v-row no-gutters>
          <v-col :cols="12">{{ characterName }}</v-col>
          <v-col :cols="12" class="caption">{{ [ characterSpeciesLabel, archetypeLabel ].join(' • ')  }}</v-col>
          <v-col :cols="12" class="caption">
            <span>{{ [ `Tier ${characterSettingTier}`, `Rank ${characterRank}`, `${campaignCustomXp} XP`].join(' • ') }}</span>
          </v-col>
          <v-col :cols="12" class="caption">
            <v-progress-linear :value="campaignCustomXp" height="2" color="red"></v-progress-linear>
          </v-col>
          <v-col :cols="12" class="caption" align="center">{{ keywords.join(' • ') }}</v-col>
        </v-row>
      </v-col>

      <!-- actions -->
      <v-col :cols="12" :sm="4" :md="5" align="right">
        <v-btn small outlined color="success" v-if="false">share</v-btn>
        <v-btn small outlined color="success" v-if="false">campaign</v-btn>
        <v-btn
          nuxt
          :to="`/forge/characters/${characterId}/builder/print`"
          color="success"
          target="_blank"
          outlined
          small
        >
          <v-icon left small>print</v-icon>
          Print View
        </v-btn>
        <v-btn
          nuxt
          :to="`/forge/characters/${characterId}/builder/setting`"
          color="success"
          small
        >
          <v-icon left small>edit</v-icon>
          Edit
        </v-btn>
      </v-col>

    </v-row>

    <v-row justify="center" no-gutters>

      <!-- attributes and traits -->
      <v-col :cols="12" :sm="6" :md="3">

        <v-row no-gutters>
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
                  {{ item.value }}
                </td>
                <td class="text-center pa-1 small">
                  {{ item.enhancedValue }}
                </td>
              </tr>
              </tbody>
            </v-simple-table>
          </v-card>
        </v-col>
        </v-row>

        <v-row no-gutters>
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
                  <span v-if="item.name === 'Wounds'" style="float: right;">
                          {{ '☐'.repeat( Math.ceil(item.enhancedValue/2) ) }}
                          •
                          {{ '☐'.repeat( Math.floor(item.enhancedValue/2) ) }}
                        </span>
                  <span v-if="item.name === 'Shock'" style="float: right;">{{ '☐'.repeat(item.enhancedValue) }}</span>
                  <em v-if="item.name==='Resilience' && armour.length>0">
                    @{{ armour[0].name }} ({{ armour[0].meta[0].armourRating }})
                  </em>
                </td>
                <td v-if="item.name==='Resilience'" class="text-center pa-1 small">
                  {{ item.enhancedValue + ( armour.length>0 ? armour[0].meta[0].armourRating : 0 ) }}
                </td>
                <td v-else class="text-center pa-1 small">
                  {{ item.enhancedValue }}
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
        </v-row>

      </v-col>

      <!-- skills -->
      <v-col :cols="12" :sm="6" :md="3">
        <v-row no-gutters>
          <v-col :cols="12" class="pa-1">
          <v-card style="height: 612px;">
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
                </td>
                <td class="text-center pa-1 small">
                  {{ computeSkillPool(item) }}
                </td>
              </tr>
              </tbody>
            </v-simple-table>
          </v-card>
        </v-col>
        </v-row>
      </v-col>

      <!-- actions, gear, feats, spells, ... -->
      <v-col :cols="12" :sm="12" :md="6" class="pa-1 ">
        <v-card>

          <v-tabs centered grow color="red">

            <!--  DNDBYOND
              Actions
                All, Attack, Action, Bonus Action, Reaction, Others, Limited Use
              Equipment
                All, Inventory, Attunement, Other Possessions
              Features & Traits
                All, Class, Race, Feats
              Description
                All, Background, Characteritics, Apperance
              Notes
                All, Orgs, Enemies, Backstory, other
              Extras
                Creatures na Vehicles
            -->

            <!-- W&G

              Actions
                All, Weapon, Powers, Other

              Wargear
                All, Weapons, Armour, Gear, Other Possessions

              Abilities & Traits
                All, Race, Archetype, Talents, Other

              Psychic Powers
                All, <Disciplines>

              Description
                All, Background, Objectives, Keywords

            -->

            <v-tab class="caption" key="actions" :href="`#tab-actions`">Weapons</v-tab>
            <v-tab class="caption" key="wargear" :href="`#tab-wargear`">Wargear</v-tab>
            <v-tab class="caption" key="abilities-talents" :href="`#tab-abilities-talents`">Abilities</v-tab>
            <v-tab class="caption" key="psychic-powers" :href="`#tab-psychic-powers`">Powers</v-tab>
            <v-tab class="caption" key="objectives" :href="`#tab-objectives`">Objectives</v-tab>

            <!-- actions (all, weapons, powers, other) -->
            <v-tab-item
              class="my-tab-item"
              key="actions"
              :value="`tab-actions`"
            >
              <div class="pa-2">
                <v-data-table
                  :headers="weaponHeaders"
                  :items="weapons"
                  hide-default-footer
                >
                  <template v-slot:item="{ item }">
                    <tr>
                      <td class="text-left pa-1 small">
                        {{ item.name }}
                      </td>
                      <td class="text-center pa-1 small">
                        <div v-if="item.meta && item.meta.length > 0 && item.meta[0].damage">
                          <span v-if="item.type==='Melee Weapon'">{{ item.meta[0].damage.static + characterAttributesEnhanced.strength }}*</span>
                          <span v-else>{{ item.meta[0].damage.static }}</span>
                          <span> + </span>
                          <span>{{ item.meta[0].damage.ed }} ED</span>
                        </div>
                      </td>
                      <td class="text-center pa-1 small">
                        <span v-if="item.meta && item.meta.length > 0">{{ item.meta[0].ap }}</span>
                      </td>
                      <td class="text-center pa-1 small">
                        <span v-if="item.meta && item.meta.length > 0">{{ item.meta[0].salvo < 0 ? '-' : item.meta[0].salvo }}</span>
                      </td>
                      <td class="text-center pa-1 small">
                        <span v-if="item.meta && item.meta.length > 0 && item.meta[0].range > 1">{{ item.meta[0].range }} m</span>
                        <span v-if="item.meta && item.meta.length > 0 && item.meta[0].range === 1">melee</span>
                      </td>
                      <td class="text-left pa-1 small">
                        <span v-if="item.meta && item.meta.length > 0 && item.meta[0].traits && item.meta[0].traits.length >0">{{ item.meta[0].traits.join(', ') }}</span>
                      </td>
                    </tr>
                  </template>
                </v-data-table>
                <div class="mt-4">
                  <p
                    v-for="trait in weaponsTraitSet"
                    v-if="traitByName(trait)"
                    :key="trait"
                    class="body-2 mb-2 caption"
                  >
                    <strong>{{ traitByName(trait).name }}: </strong>
                    <span v-if="traitByName(trait).crunch">{{ traitByName(trait).crunch }}</span>
                    <span v-else>{{ traitByName(trait).description }}</span>
                  </p>
                </div>
              </div>
            </v-tab-item>

            <!-- wargear (All, Weapons, Armour, Gear, Other Possessions) -->
            <v-tab-item
              class="my-tab-item"
              key="wargear"
              :value="`tab-wargear`"
            >
              <div class="pa-2">
                <div v-for="gearItem in wargear" :key="gearItem.name" class="caption">
                  <strong>{{ gearItem.name }}</strong>
                  <p>{{ gearItem.description }}</p>
                </div>

              </div>
            </v-tab-item>

            <!-- abilities (All, Race, Archetype, Talents, Other) -->
            <v-tab-item
              class="my-tab-item"
              key="abilities-talents"
              :value="`tab-abilities-talents`"
            >
              <div class="pa-2">
                <v-chip-group mandatory active-class="red--text">
                  <v-chip label small v-for="item in [`All`,`Species`, `Archetype`, `Talents`, `Other`]" :key="item">{{item}}</v-chip>
                </v-chip-group>
                <div v-for="ability in abilities" :key="ability.name" class="caption">
                  <strong>{{ ability.name }}</strong><em v-if="ability.source"> • {{ ability.source }}</em>
                  <p v-html="computeFormatedText(ability.effect)" />
                </div>
                <div v-for="talent in talents" :key="talent.name" class="caption">
                  <strong>{{ talent.name }}</strong><em> • Talent</em>
                  <p v-html="computeFormatedText(talent.description)" />
                </div>
              </div>
            </v-tab-item>

            <!-- powers -->
            <v-tab-item
              class="my-tab-item"
              key="psychic-powers"
              :value="`tab-psychic-powers`"
            >
              <div class="pa-2">
                <v-data-table
                  :headers="psychicPowersHeaders"
                  :items="psychicPowers"
                  hide-default-footer
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
              </div>
            </v-tab-item>

            <!-- objectives -->
            <v-tab-item
              class="my-tab-item"
              key="objectives"
              :value="`tab-objectives`"
            >
              <div class="pa-2">
                <div
                  v-for="(objective, index) in objectives"
                  :key="objective.name"
                  class="pl-2 pr-2 pt-1 pb-1 caption"
                >
                  <strong>{{ index+1 }}:</strong> {{ objective.text }}
                </div>
              </div>

              <v-row no-gutters>
                <v-col :cols="6" class="pa-1">
                  <v-card height="100%" class="flexcard">
                    <v-card-text>
                      <p class="caption">
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
                  </v-card>
                </v-col>

                <v-col :cols="6" class="pa-1">
                  <v-card height="100%" class="flexcard">
                    <v-card-text>
                      <p class="caption">
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
              </v-row>

            </v-tab-item>

          </v-tabs>

        </v-card>

      </v-col>

    </v-row>

  </div>

</template>

<script lang="js">
import BackgroundRepositoryMixin from '~/mixins/BackgroundRepositoryMixin';
import StatRepositoryMixin from '~/mixins/StatRepositoryMixin';
import SluggerMixin from '~/mixins/SluggerMixin';
import WargearTraitRepositoryMixin from '~/mixins/WargearTraitRepositoryMixin';

export default {
  name: 'in-app-view',
  //layout: '',
  mixins: [
    BackgroundRepositoryMixin,
    StatRepositoryMixin,
    SluggerMixin,
    WargearTraitRepositoryMixin,
  ],
  props: [],
  data() {
    return {
      attributeHeaders: [
        {
          text: 'Attribute', sortable: false, align: 'left', class: 'small pa-1',
        },
        {
          text: 'Rating', sortable: false, align: 'center', class: 'small pa-1',
        },
        {
          text: 'Adjusted', sortable: false, align: 'center', class: 'small pa-1',
        },
      ],
      traitHeaders: [
        {
          text: 'Trait', sortable: false, align: 'left', class: 'small pa-1',
        },
        {
          text: 'Rating', sortable: false, align: 'center', class: 'small pa-1',
        },
      ],
      skillHeaders: [
        {
          text: 'Skill', sortable: false, align: 'left', class: 'small pa-1',
        },
        {
          text: 'Rating', sortable: false, align: 'center', class: 'small pa-1',
        },
        {
          text: 'Att', sortable: false, align: 'center', class: 'small pa-1',
        },
        {
          text: 'Total', sortable: false, align: 'center', class: 'small pa-1',
        },
      ],
      weaponHeaders: [
        {
          text: 'Name', sortable: false, align: 'left', class: 'small pa-1',
        },
        {
          text: 'Damage', sortable: false, align: 'center', class: 'small pa-1',
        },
        {
          text: 'AP', sortable: false, align: 'center', class: 'small pa-1',
        },
        {
          text: 'Salvo', sortable: false, align: 'center', class: 'small pa-1',
        },
        {
          text: 'Range', sortable: false, align: 'center', class: 'small pa-1',
        },
        {
          text: 'Traits', sortable: false, align: 'left', class: 'small pa-1',
        },
      ],
      psychicPowersHeaders: [
        {
          text: 'Name', sortable: false, align: 'left', class: 'small pa-1',
        },
        {
          text: 'DN', sortable: false, align: 'center', class: 'small pa-1',
        },
        {
          text: 'Activation', sortable: false, align: 'center', class: 'small pa-1',
        },
        {
          text: 'Duration', sortable: false, align: 'center', class: 'small pa-1',
        },
        {
          text: 'Range', sortable: false, align: 'center', class: 'small pa-1',
        },
        {
          text: 'Multi-Target', sortable: false, align: 'center', class: 'small pa-1',
        },
        {
          text: 'Effect', sortable: false, align: 'left', class: 'small pa-1',
        },
      ],
    };
  },
  computed: {
    characterName() {
      return this.$store.getters['characters/characterNameById'](this.characterId);
    },
    characterSettingTier() {
      return this.$store.getters['characters/characterSettingTierById'](this.characterId);
    },
    characterRank() {
      return this.$store.getters['characters/characterCampaignCustomRankById'](this.characterId);
    },
    campaignCustomXp() {
      return this.$store.getters['characters/characterCampaignCustomXpById'](this.characterId);
    },

    characterSpeciesLabel() {
      return this.$store.getters['characters/characterSpeciesLabelById'](this.characterId);
    },
    speciesAstartesChapter() {
      return this.$store.getters['characters/characterSpeciesAstartesChapterById'](this.characterId);
    },

    characterBackground() {
      return this.$store.getters['characters/characterBackgroundLabelById'](this.characterId);
    },

    keywords() {
      return this.$store.getters['characters/characterKeywordsFinalById'](this.characterId);
    },
    avatar() {
      if (this.archetypeLabel !== undefined && !['Ratling', 'Ogryn'].includes(this.characterSpeciesLabel)) {
        return `/img/icon/archetype/archetype_${this.textToKebab(this.archetypeLabel)}_avatar.png`;
      }

      if (this.characterSpeciesLabel !== undefined) {
        return `/img/icon/species/species_${this.textToKebab(this.characterSpeciesLabel)}_avatar.png`;
      }

      return '/img/icon/species/species_human_avatar.png';
    },
    archetypeLabel() {
      return this.$store.getters['characters/characterArchetypeLabelById'](this.characterId);
    },
    characterAttributesEnhanced() {
      return this.$store.getters['characters/characterAttributesEnhancedById'](this.characterId);
    },
    attributes() {
      const attributes = this.$store.getters['characters/characterAttributesById'](this.characterId);
      return this.attributeRepository.map((a) => ({
        ...a,
        value: attributes[a.name.toLowerCase()],
        enhancedValue: this.characterAttributesEnhanced[a.name.toLowerCase()],
      }));
    },
    traits() {
      const traits = this.$store.getters['characters/characterTraitsById'](this.characterId);
      const traitsEnhanced = this.$store.getters['characters/characterTraitsEnhancedById'](this.characterId);
      return this.traitRepository.map((t) => ({
        ...t,
        value: traits[t.name.toLowerCase()],
        enhancedValue: traitsEnhanced[t.name.toLowerCase()],
      }));
    },
    groupedTraits() {
      return [
        ...this.traits.filter((i) => i.type === 'Combat'),
        ...this.traits.filter((i) => i.type === 'Mental'),
        ...this.traits.filter((i) => i.type === 'Social'),
      ];
    },
    skills() {
      const skills = this.$store.getters['characters/characterSkillsById'](this.characterId);
      return this.skillRepository.map((s) => ({
        ...s,
        value: skills[s.key],
        enhancedValue: skills[s.key],
      }));
    },
    enhancements() {
      return this.$store.getters['characters/characterEnhancementsById'](this.characterId);
    },

    abilities() {
      const abilities = [];

      // species
      if (this.characterSpeciesLabel !== undefined) {
        const species = this.speciesRepository.find((s) => s.name === this.characterSpeciesLabel);
        if (species !== undefined && species.abilities) {
          const speciesAbilityNames = species.abilities.split(',');
          if (speciesAbilityNames.length > 0) {
            speciesAbilityNames.forEach((speciesAbilityName) => {
              if (speciesAbilityName === 'Honour the Chapter') {
                const chapter = this.astartesChapterRepository.find((a) => a.name === this.speciesAstartesChapter) || [];
                const traditions = chapter.beliefsAndTraditions;
                if (traditions !== undefined) {
                  traditions.forEach((t) => {
                    const tradition = {
                      name: t.name,
                      effect: t.effect,
                      source: this.speciesAstartesChapter,
                    };
                    abilities.push(tradition);
                  });
                }
              } else {
                const ability = species.abilityObjects.find((a) => a.name === speciesAbilityName);
                ability.source = this.characterSpeciesLabel;
                abilities.push(ability);
              }
            });
          }
        }
      }

      // archetype
      if (this.archetypeLabel !== undefined) {
        const archetype = this.archetypeRepository.find((a) => a.name === this.archetypeLabel);
        if (archetype !== undefined) {
          archetype.abilities.forEach((a) => {
            a.source = this.archetypeLabel;
            abilities.push(a);
          });
        }
      }

      if (this.keywords.find( k => k ==='Adeptus Mechanicus')) {
        abilities.push({
          name: 'Data is Currency',
          effect:
            'Characters with the Adeptus Mechanicus keyword may use Intellect ' +
            'in place of Fellowship when calculating Influence.',
          source: 'Adeptus Mechanicus'
        });
      }

      // background abilities
      if (this.characterBackground) {
        const background = this.backgroundRepository
          .filter((b) => b.name === this.characterBackground)
          .map((b) => ({
            name: b.name,
            effect: b.bonus,
            source: 'Background',
          }));
        abilities.push(background[0]);
      }

      // other
      if (this.customAbilities) {
        this.customAbilities.forEach((item) => {
          const ability = {
            name: item.name,
            effect: item.effect,
            source: 'Ascension?',
          };
          abilities.push(ability);
        });
      }

      return abilities;
    },
    customAbilities() {
      const characterEnhancements = this.$store.getters['characters/characterEnhancementsById'](this.characterId);
      return characterEnhancements ? characterEnhancements.filter( (i) => i.targetGroup === 'abilities' ) : [];
    },
    talents() {
      const characterTalents = this.$store.getters['characters/characterTalentsById'](this.characterId);
      const finalTalents = [];
      characterTalents.forEach((charTalent) => {
        const rawTalent = this.talentRepository.find((t) => t.name === charTalent.name);
        rawTalent.source = undefined;
        if (charTalent.selected) {
          rawTalent.name = rawTalent.name.replace(/(<.*>)/, `[${charTalent.selected}]`);
        }
        finalTalents.push(rawTalent);
      });
      return finalTalents;
    },
    wargear() {
      const wargearLabels = this.$store.getters['characters/characterWargearById'](this.characterId).map((w) => w.name);
      const wargear = [];
      wargearLabels.forEach((wargearName) => {
        const foundGear = this.wargearRepository.find((w) => w.name === wargearName);
        if (foundGear) {
          wargear.push(foundGear);
        } else {
          wargear.push({ name: wargearName, type: 'Misc' });
        }
      });
      return wargear;
    },
    weapons() {
      return this.wargear.filter((w) => ['Ranged Weapon', 'Melee Weapon'].includes(w.type));
    },
    armour() {
      return this.wargear.filter((w) => ['Armour'].includes(w.type));
    },
    gear() {
      return this.wargear.filter((w) => !['Armour', 'Ranged Weapon', 'Melee Weapon'].includes(w.type));
    },
    psychicPowers() {
      const powers = this.$store.getters['characters/characterPsychicPowersById'](this.characterId).map((p) => p.name);
      const items = [];
      powers.forEach((name) => {
        const power = this.psychicPowersRepository.find((power) => power.name === name);
        items.push(power);
      });
      return items;
    },
    objectives() {
      if (this.archetypeLabel && this.objectiveRepository) {
        const archetype = this.archetypeRepository.find((a) => a.name === this.archetypeLabel);
        if (archetype) {
          const objectiveList = this.objectiveRepository.find((o) => o.group === archetype.group);
          if (objectiveList) {
            return objectiveList.objectives.map((o) => ({ text: o }));
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
  async asyncData({ params, $axios }) {
    const sourceFilter = '?source=core,coreab';
    const talentResponse = await $axios.get('/api/talents/');
    const wargearResponse = await $axios.get('/api/wargear/');
    const psychicPowersResponse = await $axios.get('/api/psychic-powers/');
    const archetypeResponse = await $axios.get(`/api/archetypes/${sourceFilter}`);
    const objectiveResponse = await $axios.get('/api/archetypes/objectives/');
    const chaptersResponse = await $axios.get('/api/species/chapters/');
    const speciesResponse = await $axios.get(`/api/species/${sourceFilter}`);

    return {
      characterId: params.id,
      astartesChapterRepository: chaptersResponse.data,
      objectiveRepository: objectiveResponse.data,
      psychicPowersRepository: psychicPowersResponse.data,
      speciesRepository: speciesResponse.data,
      archetypeRepository: archetypeResponse.data,
      talentRepository: talentResponse.data,
      wargearRepository: wargearResponse.data,
      breadcrumbItems: [
        {
          text: '', nuxt: true, exact: true, to: '/',
        },
        {
          text: 'Forge', nuxt: true, exact: true, to: '/forge/my-characters',
        },
        {
          text: 'Character', nuxt: true, exact: true, to: `/forge/characters/${params.id}`,
        },
      ],
    };
  },
  head() {
    return {
      // title: [this.name, this.species, this.archetype].join(' • '),
      title: this.characterName,
      // titleTemplate: '%s | W&G Character Sheet',
    };
  },
  methods: {
    traitByName(name) {
      // const prefix = name.split(/ ?\(/)[0];
      // return this.combinedTraitsRepository.find( item => item.name.indexOf(prefix) >= 0);
      return this.wargearTraitRepository.find((item) => item.name === name);
    },
    computeSkillPool(skill) {
      const attribute = this.attributes.find((a) => a.name === skill.attribute);
      return attribute.enhancedValue + skill.enhancedValue;
    },
    computeFormatedText(text) {
      const rank = this.characterRank;
      let computed = text;

      // computed = computed.replace(/(1d3\+Rank Shock)/g, `<strong>1d3+${rank} Shock</strong>`);
      computed = computed.replace(/(\d+ Faith)/g, '<strong>$1</strong>');
      computed = computed.replace(/(\d+ meters)/g, '<strong>$1</strong>');
      computed = computed.replace(/(\d+ metres)/g, '<strong>$1</strong>');
      computed = computed.replace(/15 \+ Rank meters/g, `<strong data-hint="15 + Rank meters">${15 + rank} meters</strong>`);
      computed = computed.replace(/15 \+ Rank metres/g, `<strong>${15 + rank} metres</strong>`);
      computed = computed.replace(/\+½ Rank/g, `<strong data-hint="+½ Rank">+${Math.round(rank / 2)}</strong>`);
      computed = computed.replace(/\+ ?Rank/g, `<strong data-hint="+ Rank">+${rank}</strong>`);

      return computed;
    },
  },
};
</script>

<style scoped lang="scss">

  .page-title {
  }

  .small {
    height: 24px;
  }

  td.small {
    font-size: 12px;
  }

  .my-tabs-container {
    height: 620px;
    overflow: hidden;
  }

  .my-tab-item {
    height: 564px;
    overflow-y: auto;
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
