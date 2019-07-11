<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <div class="page">

    <v-container grid-list-sm>

      <v-layout wrap>

        <v-flex xs5>

          <v-layout column>
            <div><strong>Name:</strong> Charim Sao</div>
            <div><strong>Tier:</strong> 3</div>
            <div><strong>Rank:</strong> 1</div>
          </v-layout>

          <v-flex xs12>

            <v-card>

              <v-toolbar color="red" dark dense>
                <v-toolbar-title>Attributes</v-toolbar-title>
              </v-toolbar>

              <v-list dense>

                <v-list-tile
                  v-for="item in attributes"
                  :key="item.key"
                >
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>[ {{item.value}} / {{item.enhancedValue}} ]</v-list-tile-action>
                </v-list-tile>

              </v-list>

            </v-card>

          </v-flex>

          <v-flex xs12>

            <v-card>

              <v-toolbar color="red" dark dense>
                <v-toolbar-title>Combat Traits</v-toolbar-title>
              </v-toolbar>

              <v-list dense>

                <v-list-tile
                  v-for="item in traits.filter(i=>i.type === 'Combat')"
                  :key="item.key"
                >
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>[ {{item.value}} / {{item.enhancedValue}} ]</v-list-tile-action>
                </v-list-tile>

              </v-list>

            </v-card>

          </v-flex>

          <v-flex xs12>

            <v-card>

              <v-toolbar color="red" dark dense>
                <v-toolbar-title>Mental Traits</v-toolbar-title>
              </v-toolbar>

              <v-list dense>

                <v-list-tile
                  v-for="item in traits.filter(i=>i.type === 'Mental')"
                  :key="item.key"
                >
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>[ {{item.value}} / {{item.enhancedValue}} ]</v-list-tile-action>
                </v-list-tile>

              </v-list>

            </v-card>

          </v-flex>

          <v-flex xs12>

            <v-card>

              <v-toolbar color="red" dark dense>
                <v-toolbar-title>Social Traits</v-toolbar-title>
              </v-toolbar>

              <v-list dense>

                <v-list-tile
                  v-for="item in traits.filter(i=>i.type === 'Social')"
                  :key="item.key"
                >
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>[ {{item.value}} / {{item.enhancedValue}} ]</v-list-tile-action>
                </v-list-tile>

              </v-list>

            </v-card>

          </v-flex>

        </v-flex>

        <v-flex xs7>

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
                  <td class="text-xs-left">{{ props.item.name }}</td>
                  <td class="text-xs-center">{{ props.item.value }}</td>
                  <td class="text-xs-center">{{ props.item.attribute }}</td>
                  <td class="text-xs-right">{{ computeSkillPool(props.item) }}</td>
                </tr>
              </template>
            </v-data-table>

          </v-card>

        </v-flex>

        <v-flex xs12>
          <h2 style="background-color: orangered; color: white;">Weapons</h2>
        </v-flex>

      </v-layout>

    </v-container>

  </div>

</template>

<script lang="js">
  import StatRepositoryMixin from '~/mixins/StatRepositoryMixin.js';
  import { mapGetters } from 'Vuex';

  export default {
  name: 'Print',
  layout: 'print',
  mixins: [StatRepositoryMixin],
  props: [],
  async asyncData({ params }) {
    return {};
  },
  data() {
    return {
      skillHeaders: [
        { text: "Skill", sortable: false, align: 'left', },
        { text: "Rating", sortable: false, align: 'center', },
        { text: "Linked Attribute", sortable: false, align: 'center', },
        { text: "Total", sortable: false, align: 'right', },
      ],
    };
  },
  computed: {
    ...mapGetters({
      charAttributes: 'attributes',
      charAttributesEnhanced: 'attributesEnhanced',
      charTraits: 'traits',
      charTraitsEnhanced: 'traitsEnhanced',
      charSkills: 'skills',
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

</style>
