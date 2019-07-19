<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <!-- a dina4 print page -->
  <div class="page page--din-a-4">

    <!-- grid list with low margin -->
    <v-container grid-list-xs>

      <v-layout justify-center wrap row>

        <v-flex xs12>

          <p class="display-1 text-xs-center mb-0">{{ name }}</p>
          <p class="text-xs-center mb-0">{{ [species, archetype].join(' • ') }}</p>
          <span class="sexy_line"></span>
          <p class="text-xs-center">{{ keywords.join(' • ') }}</p>

        </v-flex>

        <!-- attributes and traits -->
        <v-flex xs4>

          <v-flex xs12>

            <v-card>

              <v-toolbar color="red" dark dense height="32">
                <v-toolbar-title>Attributes</v-toolbar-title>
              </v-toolbar>

              <v-data-table
                :headers="attributeHeaders"
                :items="attributes"
                hide-footer
                hide-actions
              >
                <template v-slot:items="props">
                  <tr>
                    <td class="text-xs-left pa-1 small">{{ props.item.name }}</td>
                    <td class="text-xs-center pa-1 small">{{ props.item.value }}</td>

                    <td class="text-xs-center pa-1 small">{{ props.item.enhancedValue }}</td>
                  </tr>
                </template>
              </v-data-table>

            </v-card>

          </v-flex>

          <v-flex xs12>

            <v-card>

              <v-toolbar color="red" dark dense height="32">
                <v-toolbar-title>Traits</v-toolbar-title>
              </v-toolbar>

              <v-data-table
                :headers="traitHeaders"
                :items="groupedTraits"
                hide-footer
                hide-headers
                hide-actions
              >
                <template v-slot:items="props">
                  <tr v-if="['Defence', 'Conviction', 'Influence'].includes(props.item.name)">
                    <td v-if="props.item.name==='Defence'" class="text-xs-left pa-1 body-2 small grey" colspan="2">Combat Traits</td>
                    <td v-if="props.item.name==='Conviction'" class="text-xs-left pa-1 body-2 small grey" colspan="2">Mental Traits</td>
                    <td v-if="props.item.name==='Influence'" class="text-xs-left pa-1 body-2 small grey" colspan="2">Social Traits</td>
                  </tr>
                  <tr>
                    <td class="text-xs-left pa-1 small">
                      {{ props.item.name }}
                      <em v-if="props.item.name==='Resilience' && armour.length>0">@{{armour[0].name}}</em>
                    </td>
                    <td class="text-xs-center pa-1 small">{{ props.item.enhancedValue }}</td>
                  </tr>
                </template>
              </v-data-table>

              <v-data-table v-if="false"
                :headers="traitHeaders"
                :items="traits.filter(i=>i.type === 'Combat')"
                hide-footer
                hide-actions
              >
                <template v-slot:items="props">
                  <tr>
                    <td class="text-xs-left pa-1 small">{{ props.item.name }}</td>
                    <td class="text-xs-center pa-1 small">{{ props.item.enhancedValue }}</td>
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
                    <td class="text-xs-left pa-1 small">{{ props.item.name }}</td>
                    <td class="text-xs-center pa-1 small">{{ props.item.enhancedValue }}</td>
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
                    <td class="text-xs-left pa-1 small">{{ props.item.name }}</td>
                    <td class="text-xs-center pa-1 small">{{ props.item.enhancedValue }}</td>
                  </tr>
                </template>
              </v-data-table>

            </v-card>

          </v-flex>

        </v-flex>

        <!-- skills -->
        <v-flex xs4>

          <v-card>

            <v-toolbar color="red" dark dense height="32">
              <v-toolbar-title>Skills</v-toolbar-title>
            </v-toolbar>

            <v-data-table
              :headers="skillHeaders"
              :items="skills"
              hide-footer
              hide-actions
            >
              <template v-slot:items="props">
                <tr>
                  <td class="text-xs-left pa-1 small">{{ props.item.name }}</td>
                  <td class="text-xs-center pa-1 small">{{ props.item.value }}</td>
                  <td class="text-xs-center pa-1 small">{{ props.item.attribute.substring(0,3) }}</td>
                  <td class="text-xs-center pa-1 small">{{ computeSkillPool(props.item) }}</td>
                </tr>
              </template>
            </v-data-table>

          </v-card>

        </v-flex>

        <!-- abilities -->
        <v-flex xs4>

          <v-flex xs12>

            <v-card>

              <v-toolbar color="red" dark dense height="32">
                <v-toolbar-title>Abilities</v-toolbar-title>
              </v-toolbar>

              <v-card-text v-for="ability in abilities" class="pa-2 caption">
                <strong>{{ ability.name }}:</strong> {{ ability.effect }} <em v-if="ability.source">@{{ ability.source }}</em>
              </v-card-text>

            </v-card>

          </v-flex>

          <v-flex xs12>

            <v-card>

              <v-toolbar color="red" dark dense height="32">
                <v-toolbar-title>Talents</v-toolbar-title>
              </v-toolbar>

              <v-card-text v-for="talent in talents" class="pa-2 caption">
                <strong>{{ talent.name }}:</strong> {{ talent.effect }}
              </v-card-text>

            </v-card>

          </v-flex>

          <v-flex xs12>

            <v-card>

              <v-toolbar color="red" dark dense height="32">
                <v-toolbar-title>Gear</v-toolbar-title>
              </v-toolbar>

              <v-card-text class="pa-2 caption">
               {{ gear.map( g => g.name ).join(', ') }}
              </v-card-text>

            </v-card>

          </v-flex>

        </v-flex>

        <v-flex xs12>

          <v-card>

            <v-toolbar color="red" dark dense height="32">
              <v-toolbar-title>Weapons</v-toolbar-title>
            </v-toolbar>

            <v-data-table
              :headers="weaponHeaders"
              :items="weapons"
              hide-footer
              hide-actions
            >
              <template v-slot:items="props">
                <tr>
                  <td class="text-xs-left pa-1 small">{{ props.item.name }}</td>
                  <td class="text-xs-center pa-1 small">
                    <div v-if="props.item.meta && props.item.meta[0].damage">
                      <span v-if="props.item.type==='Melee Weapon'">{{ props.item.meta[0].damage.static + charAttributesEnhanced.strength }}*</span>
                      <span v-else>{{ props.item.meta[0].damage.static }}</span>
                      <span> + </span>
                      <span>{{ props.item.meta[0].damage.ed }} ED</span>
                    </div>
                  </td>
                  <td class="text-xs-center pa-1 small"><span v-if="props.item.meta">{{ props.item.meta[0].ap }}</span></td>
                  <td class="text-xs-center pa-1 small"><span v-if="props.item.meta">{{ props.item.meta[0].salvo }}</span></td>
                  <td class="text-xs-center pa-1 small"><span v-if="props.item.meta">{{ props.item.meta[0].range }} m</span></td>
                  <td class="text-xs-left pa-1 small">
                    <span v-if="props.item.meta && props.item.meta[0].traits && props.item.meta[0].traits.length >0">{{ props.item.meta[0].traits.join(', ') }}</span>
                  </td>
                </tr>
              </template>
            </v-data-table>

          </v-card>

        </v-flex>

      </v-layout>

    </v-container>

  </div>

</template>

<script lang="js">
  import ArchetypeRepositoryMixin from '~/mixins/ArchetypeRepositoryMixin.js';
  import SpeciesRepositoryMixin from '~/mixins/SpeciesRepositoryMixin.js';
  import StatRepositoryMixin from '~/mixins/StatRepositoryMixin.js';
  import TalentRepositoryMixin from '~/mixins/TalentRepositoryMixin.js';
  import WargearRepositoryMixin from '~/mixins/WargearRepositoryMixin.js';
  import { mapGetters } from 'vuex';

  export default {
  name: 'Print',
  layout: 'print',
  mixins: [ArchetypeRepositoryMixin, SpeciesRepositoryMixin, StatRepositoryMixin, TalentRepositoryMixin, WargearRepositoryMixin],
  props: [],
  async asyncData({ params }) {
    return {};
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
    };
  },
  computed: {
    ...mapGetters({
      keywords: 'finalKeywords',
      name: 'name',
      species: 'species',
      archetype: 'archetype',
      charAttributes: 'attributes',
      charAttributesEnhanced: 'attributesEnhanced',
      charTraits: 'traits',
      charTraitsEnhanced: 'traitsEnhanced',
      charSkills: 'skills',
      charTalents: 'talents',
      charWargear: 'wargear',
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
              const ability = this.speciesAbilitiesRepository.find(a => a.name === speciesAbilityName);
              ability['source'] = this.species;
              abilities.push(ability);
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

      // TODO background abilities

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
    height: 24px;
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
