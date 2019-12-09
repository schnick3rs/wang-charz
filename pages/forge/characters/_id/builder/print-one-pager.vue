<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <div class="page page--din-a-4">
      <v-container>
        <v-row justify="center" no-gutters>
          <v-col :cols="12">
            <p class="display-1 text-center mb-0">
              {{ characterName }}
            </p>
            <p class="text-center mb-0">
              {{ [characterSpeciesLabel, archetypeLabel].join(' • ') }}
            </p>
            <span class="sexy_line" />
            <p class="text-center">
              {{ keywords.join(' • ') }}
            </p>
          </v-col>

          <!-- attributes, skills and traits -->
          <v-col :cols="3" class="pa-1">
            <v-card
              v-for="attribute in attributes"
              :key="attribute.name"
              class="mb-1"
            >
              <v-toolbar color="red" dark dense height="32">
                <v-toolbar-title>
                  {{ attribute.name }} <span>[{{ attribute.value }}/{{ attribute.enhancedValue }}]</span>
                </v-toolbar-title>
              </v-toolbar>

              <v-simple-table dense>
                <thead />
                <tbody>
                  <tr
                    v-for="skill in skills.filter( s => s.attribute === attribute.name)"
                    :key="skill"
                  >
                    <td class="text-left pa-1 small">
                      {{ skill.name }}
                    </td>
                    <td class="text-center pa-1 small">
                      {{ skill.enhancedValue }}
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-card>
          </v-col>

          <v-col :cols="9" class="pa-1">
            <v-card>
              <v-toolbar color="red" dark dense height="32">
                <v-toolbar-title>Weapons</v-toolbar-title>
              </v-toolbar>

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
              <v-col v-if="gear.length > 0" :cols="6" class="pa-1">
                <v-card>
                  <v-toolbar color="red" dark dense height="32">
                    <v-toolbar-title>Gear</v-toolbar-title>
                  </v-toolbar>

                  <v-card-text
                    v-for="gearItem in gear"
                    :key="gearItem.name"
                    class="pa-2 caption"
                  >
                    <strong>{{ gearItem.name }}:</strong> {{ gearItem.description }}
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col v-if="talents.length > 0" :cols="6" class="pa-1">
                <v-card>
                  <v-toolbar color="red" dark dense height="32">
                    <v-toolbar-title>Talents</v-toolbar-title>
                  </v-toolbar>

                  <v-card-text
                    v-for="talent in talents"
                    :key="talent.name"
                    class="pa-2 caption"
                  >
                    <strong>{{ talent.name }}:</strong> <span v-html="computeFormatedText(talent.description)" />
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>

          <v-col :cols="12" class="pa-1">
            <v-card v-if="psychicPowers.length > 0">
              <v-toolbar color="red" dark dense height="32">
                <v-toolbar-title>Psychic Powers</v-toolbar-title>
              </v-toolbar>

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
            </v-card>
          </v-col>

          <v-col :cols="12">
            <v-row justify="center" no-gutters>
              <v-col :cols="4" class="pa-1">
                <v-card height="100%" class="flexcard">
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

              <v-col :cols="4" class="pa-1">
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

              <v-col :cols="4" class="pa-1">
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
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script lang="js">
import BackgroundRepositoryMixin from '~/mixins/BackgroundRepositoryMixin';
import StatRepositoryMixin from '~/mixins/StatRepositoryMixin';

export default {
  name: 'Print',
  layout: 'print',
  mixins: [
    BackgroundRepositoryMixin,
    StatRepositoryMixin,
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
    characterRank() {
      return this.$store.getters['characters/characterCampaignCustomRankById'](this.characterId);
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
                const ability = this.speciesAbilitiesRepository.find((a) => a.name === speciesAbilityName);
                ability.source = this.species;
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

      return abilities;
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
      if (this.archetypeLabel) {
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
  },
  async asyncData({ params, $axios, error }) {
    const talentResponse = await $axios.get('/api/talents/');
    const wargearResponse = await $axios.get('/api/wargear/');
    const psychicPowersResponse = await $axios.get('/api/psychic-powers/');

    return {
      wargearRepository: wargearResponse.data,
      talentRepository: talentResponse.data,
      psychicPowersRepository: psychicPowersResponse.data,
      characterId: params.id,
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
    skillsByAttribute(attributeName) {

    },
    traitsByAttribute(attributeName) {
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

<style scoped lang="css">

  .page {
    page-break-inside: avoid;
  }

  .page--din-a-4 {
    height: 297mm;
    width: 220mm;
  }

  .page-title {
  }

  .small {
    height: 24px;
  }

  td.small {
    font-size: 12px;
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
