<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <section class="species-selection">

    <v-container grid-list-md>

      <v-layout justify-center row wrap>

        <v-flex xs12 sm10 md8 lg8 v-if="!selectedSpecies">

          <v-card>
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
          </v-card>
        </v-flex>

        <v-flex xs12 sm10 md8 lg8 v-if="selectedSpecies">

          <v-card >

            <v-card-title primary-title>
              <div>
                <h3 class="headline md0">{{ selectedSpecies.name }}</h3>
                <span class="subheading">{{ selectedSpecies.hint }}</span>
              </div>
            </v-card-title>

            <v-card-text>
              <p class="text-lg-justify"><strong>Build Point Cost:</strong> {{ selectedSpecies.cost }}</p>

              <p><v-divider></v-divider></p>

              <p class="text-lg-justify"><strong>Base Tier:</strong> {{ selectedSpecies.baseTier }}</p>
              <p class="text-lg-justify"><strong>Speed:</strong> {{ selectedSpecies.speed }}</p>
              <p class="text-lg-justify"><strong>Modifications:</strong> {{ selectedSpecies.attributes }}</p>
              <p class="text-lg-justify"><strong>Abilities:</strong> {{ selectedSpecies.abilities }}</p>

              <p v-if="selectedSpecies.abilities"><v-divider></v-divider></p>

              <div v-if="selectedSpecies.abilities"
                 v-for="ability in getAbilitiesForSpecies(selectedSpecies)"
                 class="text-lg-justify"
              >
                <p><strong>{{ ability.name }}:</strong> {{ ability.effect}}</p>

                <v-select
                        v-model="selectedSpecies['chapter']"
                        v-if="ability.name === 'Honour the Chapter'"
                        label="Select your Chapter"
                        dense
                        solo
                        :items="astartesChapterRepository"
                        item-text="name"
                        item-value="name"
                ></v-select>

                <p v-if="ability.name === 'Honour the Chapter' && selectedSpecies['chapter']"
                   v-for="tradition in getChapterTraditions(selectedSpecies['chapter'])"
                >
                  <strong>{{ tradition.name }}:</strong> {{ tradition.effect }}
                </p>

              </div>

              <p><v-divider></v-divider></p>
              <p>{{ selectedSpecies.description }}</p>
            </v-card-text>

            <v-card-actions>
              <v-btn color="primary" @click="selectSpeciesForChar(selectedSpecies)" >Select Species</v-btn>
              <v-btn color="red" @click="selectedSpecies = undefined" >Cancle selection</v-btn>
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
      },
      getAbilitiesForSpecies(species) {
        let abilities = species.abilities ? species.abilities.split(',') : [];
        return this.speciesAbilitiesRepository.filter( a => abilities.includes(a.name) );
      },
      getChapterTraditions(chapterName) {
        let chapter = this.astartesChapterRepository.find(a=>a.name === chapterName) || [];
        if ( chapter ) {
         return chapter.beliefsAndTraditions;
        }
        return [];
      },
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
</style>
