<template lang="html">

  <section class="species-selection">

    <h2>Select a species</h2>

    <v-container grid-list-md>

      <v-layout row>

        <v-flex xs6>
          <div class="species-selection__list">
            <v-list two-line>

              <v-list-tile
                      v-for="species in speciesOptions"
                      avatar
                      @click="selectedSpecies = species"
              >
                <v-list-tile-avatar tile>
                  <img :src="species.avatar" />
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title>{{species.label}}</v-list-tile-title>
                  <v-list-tile-sub-title>{{species.description}}</v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-btn icon ripple>
                    <v-icon color="grey lighten-1">info</v-icon>
                  </v-btn>
                </v-list-tile-action>

              </v-list-tile>

            </v-list>
          </div>
        </v-flex>

        <v-flex xs6>

          <v-card v-if="selectedSpecies">
            <v-img :src="selectedSpecies.avatar" height="200px"></v-img>
            <v-card-title primary-title>
              <div>
                <h3 class="headline md0">{{selectedSpecies.label}}</h3>
              </div>
            </v-card-title>
            <v-card-text>{{selectedSpecies.description}}</v-card-text>
            <v-card-actions>
              <v-btn color="primary">Select Species</v-btn>
            </v-card-actions>
          </v-card>

        </v-flex>

      </v-layout>

    </v-container>

  </section>

</template>

<script lang="js">
  export default  {
    name: 'species-selection',
    props: [],
    mounted() {

    },
    data() {
      return {
        speciesOptions: {
          human: {
            label: 'Human',
            description: 'Each human is just one of untold billions spread across the galaxy over millions of planets. Those in the Imperium live under the authority of the Emperor, but He has not stirred from His Golden Throne on Holy Terra for over ten thousand years. The remorseless government agencies of the Imperium use His authority to mercilessly rule Humanity according to their interpretations of the Emperor’s will. Every planet has its own culture and unique interpretations of the Imperium’s laws and sacred beliefs, but a few things are especially common.',
            avatar: 'https://i.pinimg.com/originals/b1/89/a9/b189a958966e0ff84b9ae2ed9dc10659.png',
            cost: 0,
            minTier: 0
          },
          astartes: { label: 'Astartes', description: 'DEMIGOODS', cost: 50, minTier: 2 },
        },
        selectedSpecies: null
      }
    },
    methods: {

    },
    computed: {

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
  .species-selection__list-item-label {}
  .species-selection__list-item-text {}
</style>
