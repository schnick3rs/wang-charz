<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <!-- a dina4 print page -->
  <div class="page page--din-a-4">

    <!-- grid list with low margin -->
    <v-container grid-list-xs>

      <v-layout justify-center wrap row>

        <v-flex xs12>

          <p class="display-1 text-xs-center mb-0">Simsel Simselman</p>
          <p class="text-xs-center mb-0">{{ [species, archetype].join(' • ') }}</p>
          <span class="sexy_line"></span>
          <p class="text-xs-center">{{ keywords.join(' • ') }}</p>

        </v-flex>

        <!-- attributes and traits -->
        <v-flex xs4>

          <v-flex xs12>

            <v-card>

              <v-toolbar color="red" dark dense>
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

              <v-toolbar color="red" dark dense>
                <v-toolbar-title>Combat Traits</v-toolbar-title>
              </v-toolbar>

              <v-data-table
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

              <v-data-table
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

              <v-data-table
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

            <v-toolbar color="red" dark dense>
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

              <v-toolbar color="red" dark dense>
                <v-toolbar-title>Abilities</v-toolbar-title>
              </v-toolbar>

              <v-card-text v-for="ability in abilities" class="pa-2 caption">
                <strong>{{ ability.name }}:</strong> {{ ability.effect }} <em v-if="ability.source">@{{ ability.source }}</em>
              </v-card-text>

            </v-card>

          </v-flex>

        </v-flex>

        <v-flex xs12>
          <h2 style="background-color: orangered; color: white;">Weapons</h2>
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
  import { mapGetters } from 'vuex';

  export default {
  name: 'Print',
  layout: 'print',
  mixins: [ArchetypeRepositoryMixin, SpeciesRepositoryMixin, StatRepositoryMixin, TalentRepositoryMixin],
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
    };
  },
  computed: {
    ...mapGetters({
      keywords: 'finalKeywords',
      species: 'species',
      archetype: 'archetype',
      charAttributes: 'attributes',
      charAttributesEnhanced: 'attributesEnhanced',
      charTraits: 'traits',
      charTraitsEnhanced: 'traitsEnhanced',
      charSkills: 'skills',
      talents: 'talents',
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
        const species = this.speciesRepository.find( s => s.name === this.species)
        let speciesAbilityNames = species.abilities.split(',');
        if (speciesAbilityNames.length > 0) {
          speciesAbilityNames.forEach( speciesAbilityName => {
            const ability = this.speciesAbilitiesRepository.find( a => a.name === speciesAbilityName );
            ability['source'] = this.species;
            abilities.push(ability);
          });
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

      // talents
      this.talents.forEach( talentName => {
        const talent = this.talentRepository.find( t => t.name === talentName );
        talent['source'] = undefined;
        abilities.push(talent);
      });

      return abilities;
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
