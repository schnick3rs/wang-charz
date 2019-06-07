<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <section class="archetype-selection">
    <h1>archetype-selection Component</h1>

    <v-container grid-list-md>

      <v-layout row flex>

        <v-flex xs12 sm6 md6 lg6>
          <div class="species-selection__list">

            <v-list two-line>

              <v-list-group v-for="(group, key) in archetypeGroups">

                  <template v-slot:activator>
                      <v-list-tile>
                          <v-list-tile-avatar tile>
                              <img src="http://www.nomta.org/wp-content/uploads/2013/01/Fleur-de-lis-fill.svg_1.png" />
                          </v-list-tile-avatar>
                          <v-list-tile>{{group}}</v-list-tile>
                      </v-list-tile>
                  </template>

                  <v-list-tile
                          v-for="item in archetypesByGroup(group)"
                          avatar
                          @click="selectedArchetype = item"
                          v-if="item.species === characterSpecies"
                  >
                      <v-list-tile-avatar tile>
                          <img :src="item.avatar" />
                      </v-list-tile-avatar>

                      <v-list-tile-content>
                          <v-list-tile-title>{{item.name}}</v-list-tile-title>
                      </v-list-tile-content>

                      <v-list-tile-action>
                          <v-chip color="green" text-color="white">
                              <v-avatar class="green darken-4">{{item.cost}}</v-avatar>
                              <v-icon>attach_money</v-icon>
                          </v-chip>
                      </v-list-tile-action>
                      <v-list-tile-action>
                          <v-chip color="red" text-color="white">
                              <v-avatar class="red darken-4">{{item.tier}}</v-avatar>
                              <v-icon >account_balance</v-icon>
                          </v-chip>
                      </v-list-tile-action>

                  </v-list-tile>

              </v-list-group>

            </v-list>
          </div>
        </v-flex>

        <v-flex xs6>

          <v-card v-if="selectedArchetype">
            <v-img :src="selectedArchetype.theme" height="200px" position="top, center"></v-img>
            <v-card-title primary-title>
              <div>
                <h3 class="headline md0">{{selectedArchetype.name}}</h3>
              </div>
            </v-card-title>
            <v-card-text>{{selectedArchetype.description}}</v-card-text>
            <v-card-text>
              <h4 class="title md0">Prerequisites</h4>
              <h5 class="subheading md0">Attributes</h5>
              <ul v-for="(value, key) in selectedArchetype.attributes">
                <li>{{key | capitalize}}: {{value}}</li>
              </ul>
              <h5 class="subheading md0">Skills</h5>
              <ul v-for="(value, key) in selectedArchetype.skills">
                <li>{{key | capitalize}}: {{value}}</li>
              </ul>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="selectArchetypeForChar(selectedArchetype)" >Select Archetype</v-btn>
            </v-card-actions>
          </v-card>

        </v-flex>

      </v-layout>

    </v-container>

  </section>

</template>

<script lang="js">
  import ArchetypeRepository from '../mixins/ArchetypeRepositoryMixin';

  export default  {
    name: 'archetype-selection',
    props: [],
    mixins: [ ArchetypeRepository ],
    data() {
      return {
        archetypeRepository: undefined,
        selectedArchetype: undefined,
      }
    },
    methods: {
        archetypesByGroup: function(groupName) {
            return this.archetypeRepository
                //.filter( a => a.species === this.characterSpecies )
                .filter( a => a.group === groupName );
        },
        selectArchetypeForChar: function(item) {
            this.$store.commit('setArchetype', { value: item.name, cost: item.cost });
        },
    },
    computed: {
      characterSpecies() { return this.$store.getters.species; },
      archetypeGroups: function() {
        if ( this.archetypeRepository !== undefined ) {
          return [...new Set(this.archetypeRepository.map(item => item.group))]
        }
        return []
      }
    },
    filters: {
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    }
}
</script>

<style scoped lang="css">
  .archetype-selection {

  }
</style>
