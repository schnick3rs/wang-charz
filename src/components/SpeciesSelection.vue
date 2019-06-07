<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <section class="species-selection">

    <v-container grid-list-md>

      <v-layout justify-center row wrap>

        <v-flex xs6 md6 lg4>

          <div class="species-selection__list">

            <v-card v-if="!loaded" height="50%">
              <v-card-text class="text-xs-center">
                <v-progress-circular indeterminate size="64"></v-progress-circular>
              </v-card-text>
            </v-card>

            <v-list v-if="loaded">

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
  import SpeciesRepositoryMixin from '../mixins/SpeciesRepositoryMixin';
  import ArchetypeRepositoryMixin from '../mixins/ArchetypeRepositoryMixin';

  export default  {
    name: 'species-selection',
    props: [],
    mixins: [ SpeciesRepositoryMixin, ArchetypeRepositoryMixin, ],
    data() {
      return {
        //loaded: false,
        publicPath: process.env.BASE_URL,
        selectedSpecies: undefined,
        //previewSpeciesArchetypeOptions: null,
        previewSpeciesArchetypeOptions: []
      }
    },
    methods: {
      updatePreview: function(item) {
        this.previewSpeciesArchetypeOptions = [];
        this.selectedSpecies = item;
        this.getArchetypesBySpecies(this.selectedSpecies.name);
      },
      selectSpeciesForChar: function(item) {
        this.$store.commit('setSpecies', { value: item.name, cost: item.cost });
      },
      getArchetypesBySpecies: function(speciesName) {
        return this.previewSpeciesArchetypeOptions = this.archetypeRepository.filter( i => i.species === speciesName );
      }
    },
    computed: {
      loaded() {
        return this.speciesRepository && this.archetypeRepository;
      },
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
