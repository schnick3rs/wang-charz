<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <div>

    <div class="page page--din-a-4">

      <!-- grid list with low margin -->
      <v-container>

        <v-row justify="center" no-gutters>

          <v-col v-bind:cols="12">

            <p class="display-1 text-center mb-0">{{ name }}</p>
            <p class="text-center mb-0">{{ [species, archetype].join(' • ') }}</p>
            <span class="sexy_line"></span>
            <p class="text-center">{{ keywords.join(' • ') }}</p>

          </v-col>

          <!-- attributes and traits -->
          <v-col v-bind:cols="4">

            <v-col v-bind:cols="12" class="pa-1">

              <v-card>

                <v-toolbar color="red" dark dense height="32">
                  <v-toolbar-title>Attributes</v-toolbar-title>
                </v-toolbar>

                <v-simple-table
                  dense
                >
                  <thead>
                    <tr>
                      <th v-for="header in attributeHeaders">{{ header.text }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in attributes">
                      <td class="text-xs-left pa-1 small">{{ item.name }}</td>
                      <td class="text-center pa-1 small">{{ item.value }}</td>
                      <td class="text-center pa-1 small">{{ item.enhancedValue }}</td>
                    </tr>
                  </tbody>
                </v-simple-table>

              </v-card>

            </v-col>

            <v-col v-bind:cols="12"  class="pa-1">

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
                      <td class="text-xs-left pa-1 small">
                        <span>{{ item.name }}</span>
                        <span v-if="item.name === 'Wounds'" style="float: right;">
                          {{ '☐'.repeat( Math.ceil(item.enhancedValue/2) ) }}
                          •
                          {{ '☐'.repeat( Math.floor(item.enhancedValue/2) ) }}
                        </span>
                        <span v-if="item.name === 'Shock'" style="float: right;">{{ '☐'.repeat(item.enhancedValue) }}</span>
                        <em v-if="item.name==='Resilience' && armour.length>0">
                          @{{armour[0].name}} ({{ armour[0].meta[0].armourRating }})
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

                <v-data-table v-if="false"
                  :headers="traitHeaders"
                  :items="traits.filter(i=>i.type === 'Combat')"
                  hide-footer
                  hide-actions
                >
                  <template v-slot:items="props">
                    <tr>
                      <td class="text-xs-left pa-1 small">{{ item.name }}</td>
                      <td class="text-center pa-1 small">{{ item.enhancedValue }}</td>
                    </tr>
                  </template>
                </v-data-table>

                <v-data-table v-if="false"
                  :headers="traitHeaders"
                  :items="traits.filter(i=>i.type === 'Mental')"
                  hide-footer
                  hide-actions
                >
                  <template v-slot:items="props">
                    <tr>
                      <td class="text-xs-left pa-1 small">{{ item.name }}</td>
                      <td class="text-center pa-1 small">{{ item.enhancedValue }}</td>
                    </tr>
                  </template>
                </v-data-table>

                <v-data-table v-if="false"
                  :headers="traitHeaders"
                  :items="traits.filter(i=>i.type === 'Social')"
                  hide-footer
                  hide-actions
                >
                  <template v-slot:items="props">
                    <tr>
                      <td class="text-xs-left pa-1 small">{{ item.name }}</td>
                      <td class="text-center pa-1 small">{{ item.enhancedValue }}</td>
                    </tr>
                  </template>
                </v-data-table>

              </v-card>

            </v-col>

          </v-col>

          <!-- skills -->
          <v-col v-bind:cols="4">

            <v-col v-bind:cols="12" class="pa-1">
            <v-card>

              <v-toolbar color="red" dark dense height="32">
                <v-toolbar-title>Skills</v-toolbar-title>
              </v-toolbar>

              <v-simple-table
                dense
              >
                <thead>
                  <tr>
                    <th v-for="header in skillHeaders">{{ header.text }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in skills">
                    <td class="text-xs-left pa-1 small">{{ item.name }}</td>
                    <td class="text-center pa-1 small">{{ item.value }}</td>
                    <td class="text-center pa-1 small">{{ item.attribute.substring(0,3) }}</td>
                    <td class="text-center pa-1 small">{{ computeSkillPool(item) }}</td>
                  </tr>
                </tbody>
              </v-simple-table>

            </v-card>

            </v-col>

          </v-col>

          <!-- abilities -->
          <v-col v-bind:cols="4">

            <v-col v-bind:cols="12" class="pa-1">

              <v-card>

                <v-toolbar color="red" dark dense height="32">
                  <v-toolbar-title>Abilities</v-toolbar-title>
                </v-toolbar>

                <v-card-text v-for="ability in abilities" v-bind:key="ability.name" class="pa-2 caption">
                  <strong>{{ ability.name }}:</strong> {{ ability.effect }} <em v-if="ability.source">@{{ ability.source }}</em>
                </v-card-text>

              </v-card>

            </v-col>

            <v-col v-bind:cols="12" class="pa-1" v-if="talents.length > 0">

              <v-card>

                <v-toolbar color="red" dark dense height="32">
                  <v-toolbar-title>Talents</v-toolbar-title>
                </v-toolbar>

                <v-card-text v-for="talent in talents" v-bind:key="talent.name" class="pa-2 caption">
                  <strong>{{ talent.name }}:</strong> {{ talent.effect }}
                </v-card-text>

              </v-card>

            </v-col>

            <v-col v-bind:cols="12" class="pa-1" v-if="gear.length > 0">

              <v-card>

                <v-toolbar color="red" dark dense height="32">
                  <v-toolbar-title>Gear</v-toolbar-title>
                </v-toolbar>

                <v-card-text v-for="gearItem in gear" v-bind:key="gearItem.id" class="pa-2 caption">
                  <strong>{{ gearItem.name }}:</strong> {{ gearItem.hint }}
                </v-card-text>

              </v-card>

            </v-col>

          </v-col>

          <v-col v-bind:cols="12">

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
                    <td class="text-xs-left pa-1 small">{{ item.name }}</td>
                    <td class="text-center pa-1 small">
                      <div v-if="item.meta && item.meta.length > 0 && item.meta[0].damage">
                        <span v-if="item.type==='Melee Weapon'">{{ item.meta[0].damage.static + charAttributesEnhanced.strength }}*</span>
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
                    <td class="text-xs-left pa-1 small">
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

          <v-col v-bind:cols="12">

            <v-row justify="left" no-gutters>

              <v-col v-bind:cols="6" class="pa-1" v-if="gear.length > 0">

                <v-card>

                  <v-toolbar color="red" dark dense height="32">
                    <v-toolbar-title>Gear</v-toolbar-title>
                  </v-toolbar>

                  <v-card-text v-for="gearItem in gear" v-bind:key="gearItem.name" class="pa-2 caption">
                    <strong>{{ gearItem.name }}:</strong> {{ gearItem.description }}
                  </v-card-text>

                </v-card>

              </v-col>

              <v-col v-bind:cols="6" class="pa-1" v-if="talents.length > 0">

                <v-card>

                  <v-toolbar color="red" dark dense height="32">
                    <v-toolbar-title>Talents</v-toolbar-title>
                  </v-toolbar>

                  <v-card-text v-for="talent in talents" v-bind:key="talent.name" class="pa-2 caption">
                    <strong>{{ talent.name }}:</strong> {{ talent.description }}
                  </v-card-text>

                </v-card>

              </v-col>

            </v-row>

          </v-col>

          <v-col v-bind:cols="12" class="pa-1">

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
                    <td class="text-xs-left pa-1 small">{{ item.name }}</td>
                    <td class="text-center pa-1 small">{{ item.crunch_difficulty_number }}</td>
                    <td class="text-center pa-1 small">{{ item.crunch_activation }}</td>
                    <td class="text-center pa-1 small">{{ item.crunch_duration }}</td>
                    <td class="text-center pa-1 small">{{ item.crunch_range }}</td>
                    <td class="text-center pa-1 small">{{ item.crunch_multi_target }}</td>
                    <td class="text-xs-left pa-1 small">{{ item.effect }}</td>
                  </tr>
                </template>
              </v-data-table>

            </v-card>

          </v-col>

          <v-col v-bind:cols="12">

            <v-row justify="center" no-gutters>

              <v-col v-bind:cols="4" class="pa-1">

                <v-card height="100%" class="flexcard">

                  <v-toolbar color="red" dark dense height="32">
                    <v-toolbar-title>Objectives</v-toolbar-title>
                  </v-toolbar>

                  <v-card-text
                    v-for="(objective, index) in objectives"
                    v-bind:key="objective.name"
                    class="pl-2 pr-2 pt-1 pb-1 caption"
                  >
                    <strong>{{ index+1 }}:</strong> {{ objective.text }}
                  </v-card-text>

                </v-card>

              </v-col>

              <v-col v-bind:cols="4" class="pa-1">

                <v-card height="100%" class="flexcard">

                  <v-card-text>
                    <p class="caption">Spend one <strong>Wrath</strong> to:</p>
                    <ul class="pl-3">
                      <li class="caption">Re-roll failures once on a test</li>
                      <li class="caption">Re-roll failures once on a soak attempt</li>
                      <li class="caption">Add +1 to a Defiance check</li>
                      <li class="caption">Make a narrative declaration</li>
                      <li class="caption">As an Action: restore 1d3+1 Shock</li>
                    </ul>
                  </v-card-text>

                </v-card>

              </v-col>

              <v-col v-bind:cols="4" class="pa-1">

                <v-card height="100%" class="flexcard">

                  <v-card-text>
                    <p class="caption">Spend one <strong>Glory</strong> to:</p>
                    <ul class="pl-3">
                      <li class="caption">Add +1d to a test after any re-rolls</li>
                      <li class="caption">Add +1 damage to a successful attack</li>
                      <li class="caption">Increase the severity of a Critical Hit</li>
                      <li class="caption">Seize the Initiative</li>
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
import { mapGetters } from 'vuex';
import ArchetypeRepositoryMixin from '~/mixins/ArchetypeRepositoryMixin.js';
import BackgroundRepositoryMixin from '~/mixins/BackgroundRepositoryMixin.js';
import SpeciesRepositoryMixin from '~/mixins/SpeciesRepositoryMixin.js';
import StatRepositoryMixin from '~/mixins/StatRepositoryMixin.js';

export default {
  name: 'Print',
  layout: 'print',
  mixins: [
    ArchetypeRepositoryMixin,
    BackgroundRepositoryMixin,
    SpeciesRepositoryMixin,
    StatRepositoryMixin,
  ],
  props: [],
  async asyncData({ params, $axios, error }) {
    const talentResponse = await $axios.get(`/api/talents/`);
    const wargearResponse = await $axios.get(`/api/wargear/`);
    const psychicPowersResponse = await $axios.get(`/api/psychic-powers/`);

    return {
      wargearRepository: wargearResponse.data,
      talentRepository: talentResponse.data,
      psychicPowersRepository: psychicPowersResponse.data,
    };
  },
  head() {
    return {
      //title: [this.name, this.species, this.archetype].join(' • '),
      title: this.name,
      //titleTemplate: '%s | W&G Character Sheet',
    };
  },
  data() {
    return {
      attributeHeaders: [
        { text: "Attribute", sortable: false, align: 'left', class: 'small pa-1' },
        { text: "Rating", sortable: false, align: 'center', class: 'small pa-1' },
        { text: "Adjusted", sortable: false, align: 'center', class: 'small pa-1' },
      ],
      traitHeaders: [
        { text: "Trait", sortable: false, align: 'left', class: 'small pa-1' },
        { text: "Rating", sortable: false, align: 'center', class: 'small pa-1' },
      ],
      skillHeaders: [
        { text: "Skill", sortable: false, align: 'left', class: 'small pa-1' },
        { text: "Rating", sortable: false, align: 'center', class: 'small pa-1' },
        { text: "Att", sortable: false, align: 'center', class: 'small pa-1' },
        { text: "Total", sortable: false, align: 'center', class: 'small pa-1' },
      ],
      weaponHeaders: [
        { text: "Name", sortable: false, align: 'left', class: 'small pa-1' },
        { text: "Damage", sortable: false, align: 'center', class: 'small pa-1' },
        { text: "AP", sortable: false, align: 'center', class: 'small pa-1' },
        { text: "Salvo", sortable: false, align: 'center', class: 'small pa-1' },
        { text: "Range", sortable: false, align: 'center', class: 'small pa-1' },
        { text: "Traits", sortable: false, align: 'left', class: 'small pa-1' },
      ],
      psychicPowersHeaders: [
        { text: "Name", sortable: false, align: 'left', class: 'small pa-1' },
        { text: "DN", sortable: false, align: 'center', class: 'small pa-1' },
        { text: "Activation", sortable: false, align: 'center', class: 'small pa-1' },
        { text: "Duration", sortable: false, align: 'center', class: 'small pa-1' },
        { text: "Range", sortable: false, align: 'center', class: 'small pa-1' },
        { text: "Multi-Target", sortable: false, align: 'center', class: 'small pa-1' },
        { text: "Effect", sortable: false, align: 'left', class: 'small pa-1' },
      ],
    };
  },
  computed: {
    ...mapGetters({
      keywords: 'finalKeywords',
      name: 'name',
      species: 'species',
      astartesChapter: 'speciesAstartesChapter',
      archetype: 'archetype',
      charBackground: 'background',
      charAttributes: 'attributes',
      charAttributesEnhanced: 'attributesEnhanced',
      charTraits: 'traits',
      charTraitsEnhanced: 'traitsEnhanced',
      charSkills: 'skills',
      charTalents: 'talents',
      charWargear: 'wargear',
      charPsychicPowers: 'psychicPowers',
    }),
    attributes() {
      return this.attributeRepository.map( a => {
        return {
          ...a,
          value: this.charAttributes[a.name.toLowerCase()],
          enhancedValue: this.charAttributesEnhanced[a.name.toLowerCase()],
        }
      });
    },
    traits() {
      return this.traitRepository.map( t => {
        return {
          ...t,
          value: this.charTraits[t.name.toLowerCase()],
          enhancedValue: this.charTraitsEnhanced[t.name.toLowerCase()],
        }
      });
    },
    groupedTraits() {
      return [
        ...this.traits.filter(i=>i.type === 'Combat'),
        ...this.traits.filter(i=>i.type === 'Mental'),
        ...this.traits.filter(i=>i.type === 'Social'),
      ]
    },
    skills() {
      return this.skillRepository.map( s => {
        return {
          ...s,
          value: this.charSkills[s.key],
          enhancedValue: this.charSkills[s.key],
        }
      });
    },
    abilities() {

      let abilities = [];

      // species
      if (this.species) {
        const species = this.speciesRepository.find( s => s.name === this.species);
        if ( species && species.abilities ) {
          let speciesAbilityNames = species.abilities.split(',');
          if (speciesAbilityNames.length > 0) {
            speciesAbilityNames.forEach(speciesAbilityName => {

              if ( speciesAbilityName === 'Honour the Chapter' ) {
                const chapter = this.astartesChapterRepository.find(a => a.name === this.astartesChapter) || [];
                const traditions = chapter.beliefsAndTraditions;
                traditions.forEach( t => {
                  let tradition = {
                    name: t.name,
                    effect: t.effect,
                    source: this.astartesChapter,
                  };
                  abilities.push(tradition);
                });
              } else {
                const ability = this.speciesAbilitiesRepository.find(a => a.name === speciesAbilityName);
                ability['source'] = this.species;
                abilities.push(ability);
              }
            });
          }
        }
      }

      // archetype
      if (this.archetype){
        const archetype = this.archetypeRepository.find( a => a.name === this.archetype );
        archetype.abilities.forEach(a => {
          a['source'] = this.archetype;
          abilities.push(a);
        });
      }

      // background abilities
      if ( this.charBackground ) {
        const background = this.backgroundRepository
          .filter((b) => b.name === this.charBackground)
          .map((b) =>  {
            return {
              name: b.name,
              effect: b.bonus,
              source: 'Background'
            };
          });
        abilities.push(background[0]);
      }

      // other


      return abilities;
    },
    talents() {
      let talents = [];
      this.charTalents.forEach( talentName => {
        const talent = this.talentRepository.find( t => t.name === talentName );
        talent['source'] = undefined;
        talents.push(talent);
      });
      return talents;
    },
    wargear() {
      let wargear = [];
      this.charWargear.forEach( wargearName => {
        const foundGear = this.wargearRepository.find(w => w.name === wargearName);
        if ( foundGear ){
          wargear.push(foundGear);
        } else {
          wargear.push({name: wargearName, type: 'Misc'});
        }
      });
      return wargear;
    },
    weapons() {
      return this.wargear.filter( w => ['Ranged Weapon', 'Melee Weapon'].includes(w.type) );
    },
    armour() {
      return this.wargear.filter( w => ['Armour'].includes(w.type) );
    },
    gear() {
      return this.wargear.filter( w => !['Armour', 'Ranged Weapon', 'Melee Weapon'].includes(w.type) );
    },
    psychicPowers() {
      let items = [];
      this.charPsychicPowers.forEach( name => {
        const power = this.psychicPowersRepository.find( power => power.name === name );
        items.push(power);
      });
      return items;
    },
    objectives() {
      if (this.archetype) {
        const archetype = this.archetypeRepository.find(a => a.name === this.archetype);
        if ( archetype ) {
          const objectiveList = this.objectiveRepository.find(o => o.group === archetype.group);
          if ( objectiveList ) {
            return objectiveList.objectives.map(o => { return {text: o}; });
          }
        }
      }
      return [];
    },
  },
  methods: {
    computeSkillPool(skill) {
      let attribute = this.attributes.find(a => a.name === skill.attribute);
      return attribute.enhancedValue + skill.enhancedValue;
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
