<template lang="html">

  <section class="species-selection">

    <h2>Select a species</h2>

    <v-container grid-list-md>

      <v-layout row>

        <v-flex xs6>
          <div class="species-selection__list">
            <v-list >

              <v-list-tile
                      v-for="item in speciesOptions"
                      avatar
                      @click="updatePreview(item)"
              >
                <v-list-tile-avatar tile>
                  <img :src="item.meta.avatar" />
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

            </v-list>
          </div>
        </v-flex>

        <v-flex xs6>

          <v-card v-if="selectedSpecies">
            <v-img :src="selectedSpecies.meta.cover" height="200px"></v-img>
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
              <v-btn color="primary">Select Species</v-btn>
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
      //this.previewSpeciesArchetypeOptions = this.getArchetypesBySpecies("Human");
    },
    data() {
      return {
        //previewSpeciesArchetypeOptions: null,
        speciesOptions: {
          human: {
            name: 'Human',
            tier: 1,
            speed: 6,
            cost: 0,
            attributes: {},
            effects: [],
            meta: {
              description: 'Each human is just one of untold billions spread across the galaxy over millions of planets. Those in the Imperium live under the authority of the Emperor, but He has not stirred from His Golden Throne on Holy Terra for over ten thousand years. The remorseless government agencies of the Imperium use His authority to mercilessly rule Humanity according to their interpretations of the Emperor’s will. Every planet has its own culture and unique interpretations of the Imperium’s laws and sacred beliefs, but a few things are especially common.',
              avatar: 'https://i.pinimg.com/originals/b1/89/a9/b189a958966e0ff84b9ae2ed9dc10659.png',
              cover: 'https://i.pinimg.com/originals/b1/89/a9/b189a958966e0ff84b9ae2ed9dc10659.png'
            }
          },
          eldar: {
            name: 'Eldar',
            tier: 1,
            speed: 8,
            cost: 10,
            attributes: { agility:1 },
            effects: [
              { name: 'Outsider', description: '+2 DN to all Interaction tests with those with the Keyword &lt;Imperium&gt;.' },
              { name: 'Intense Emotion', description: '+1 DN to all Resolve tests. Failing a Willpower-based test in a scene involving intense emotion grants the GM +1 Ruin.' },
              { name: 'Psychosensitive', description: 'All Eldar may purchase 1 minor Psychic Power if they also purchase the Psychic Mastery skill. ...' },
            ],
            meta: {
              description: '',
              avatar: 'https://memestatic1.fjcdn.com/comments/I+think+eldar+are+the+coolest+faction+_697d83551982120f79db2c532c2c181b.jpg',
              cover: 'https://memestatic1.fjcdn.com/comments/I+think+eldar+are+the+coolest+faction+_697d83551982120f79db2c532c2c181b.jpg'
            }
          },
          astartes: {
            name: 'Adeptus Astartes',
            tier: 2,
            speed: 7,
            cost: 50,
            attributes: { strength:1, agility:1, toughness:1, resolve:1 },
            effects: [
              { name: 'Angel of Death', description: '' },
              { name: 'Honour the Chapter', description: '' },
              { name: 'Space Marine Implants', description: '' },
            ],
            meta: {
              description: '',
              avatar: 'https://s-media-cache-ak0.pinimg.com/originals/87/cc/4a/87cc4a4357a32444e7498a6c2927eda9.jpg',
              cover: 'https://s-media-cache-ak0.pinimg.com/originals/87/cc/4a/87cc4a4357a32444e7498a6c2927eda9.jpg'
            }
          },
        },
        selectedSpecies: undefined,
        previewSpeciesArchetypeOptions: []
      }
    },
    methods: {
      updatePreview: function(item) {
        this.selectedSpecies = item;
        this.getArchetypesBySpecies(this.selectedSpecies.name)
      },
      getArchetypesBySpecies: function(speciesName) {
        axios.get('https://api.sheety.co/e39d8899-85e5-4281-acf4-4d854bd39994')
                .then((response) => {
                  this.previewSpeciesArchetypeOptions = response.data.filter( i => i.species == speciesName )
                })
      }
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
  .species-selection__list-item-name {}
  .species-selection__list-item-text {}
</style>
