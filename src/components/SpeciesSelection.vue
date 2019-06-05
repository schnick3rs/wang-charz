<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <section class="species-selection">

    <h2>Select a species</h2>

    <v-container grid-list-md>

      <v-layout row>

        <v-flex xs6>
          <div class="species-selection__list">
            <v-list >

              <v-list-tile
                      v-for="item in speciesRepository"
                      avatar
                      @click="updatePreview(item)"
              >
                <v-list-tile-avatar tile>
                  <img :src="item.avatar" />
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title>{{item.name}}</v-list-tile-title>

                </v-list-tile-content>

                <v-list-tile-action>

                  <v-badge overlap color="green" :disabled="item.baseTier <= settingTier">
                    <template v-slot:badge><span>{{item.cost}}</span></template>
                    <v-icon color="grey">attach_money</v-icon>
                  </v-badge>

                </v-list-tile-action>
                <v-list-tile-action>

                  <v-badge overlap color="red" :disabled="item.baseTier <= settingTier">
                    <template v-slot:badge><span>{{item.baseTier}}</span></template>
                    <v-icon color="grey">account_balance</v-icon>
                  </v-badge>

                </v-list-tile-action>

              </v-list-tile>

            </v-list>
          </div>
        </v-flex>

        <v-flex xs6>

          <v-card v-if="selectedSpecies">
            <v-img :src="selectedSpecies.cover" height="200px"></v-img>
            <v-card-title primary-title>
              <div>
                <h3 class="headline md0">{{selectedSpecies.name}}</h3>
              </div>
            </v-card-title>
            <v-card-text>{{selectedSpecies.description}}</v-card-text>
            <v-card-text>
              <ul>
                <li v-for="item in previewSpeciesArchetypeOptions">
                  {{ item.name }}
                </li>
              </ul>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="selectSpeciesForChar(selectedSpecies)" >Select Species</v-btn>
            </v-card-actions>
          </v-card>

        </v-flex>

      </v-layout>

    </v-container>

  </section>

</template>

<script lang="js">
  import axios from "axios";

  export default  {
    name: 'species-selection',
    props: [],
    mounted() {
      axios.get('https://api.sheety.co/04c8f13a-c4ed-4f05-adad-7cf11db62151')
        .then((response) => {
          this.speciesRepository = response.data; // all archetypes;
        })
    },
    data() {
      return {
        speciesRepository: undefined,
        selectedSpecies: undefined,
        //previewSpeciesArchetypeOptions: null,
        previewSpeciesArchetypeOptions: []
      }
    },
    methods: {
      resolveImage(group, value, type) {
        // require(`../assets/species_${item.name}_avatar.svg`)
        group = group || "species";
        value = value.toLowerCase();
        //return require('../assets/'+group+'_'+value+'_'+type+'.png');
        return '@/assets/'+group+'_'+value+'_'+type+'.png';
      },
      updatePreview: function(item) {
        this.previewSpeciesArchetypeOptions = [];
        this.selectedSpecies = item;
        this.getArchetypesBySpecies(this.selectedSpecies.name);
      },
      selectSpeciesForChar: function(item) {
        this.$store.commit('setSpecies', { value: item.name, cost: item.cost });
      },
      getArchetypesBySpecies: function(speciesName) {
        axios.get('https://api.sheety.co/e39d8899-85e5-4281-acf4-4d854bd39994')
                .then((response) => {
                  this.previewSpeciesArchetypeOptions = response.data.filter( i => i.species == speciesName )
                })
      }
    },
    computed: {
      settingTier() { return this.$store.getters.settingTier; },
    }
}
</script>

<style scoped lang="css">
  .species-selection {}
  .species-selection__list {}
  .species-selection__list-item {
    width: 50%;
    border: 1px grey solid;
    border-radius: 15px;
    padding: 10px;
  }
  .species-selection__list-item:hover {
    background-color: lightblue;
  }
  .species-selection__list-item-name {}
  .species-selection__list-item-text {}
</style>
