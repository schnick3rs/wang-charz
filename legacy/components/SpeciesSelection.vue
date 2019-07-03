<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <section class="species-selection">

    <v-container grid-list-md>

      <v-layout justify-center row wrap>

        <v-flex xs12 sm10 md8 lg8 v-if="!loaded">

          <v-card height="50%">
            <v-card-text class="text-xs-center">
              <v-progress-circular indeterminate size="64"></v-progress-circular>
            </v-card-text>
          </v-card>

        </v-flex>

        <v-flex xs12 sm10 md8 lg8 v-if="!(selectedSpecies || characterSpecies ) && loaded">

          <v-card>

            <v-list>

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

          </v-card>

        </v-flex>

        <v-flex xs12 sm10 md8 lg8 v-if="characterSpecies">

          <species-preview
                  :species="characterSpecies"
                  :actions="true"
                  @select="selectSpeciesForChar"
                  @reset="resetSpecies"
          ></species-preview>

        </v-flex>

        <v-flex xs12 sm10 md8 lg8 v-if="selectedSpecies && !characterSpecies">

          <species-preview
                  :species="selectedSpecies"
                  :actions="true"
                  @select="selectSpeciesForChar"
                  @reset="resetSpecies"
          ></species-preview>

        </v-flex>

      </v-layout>

    </v-container>

  </section>

</template>

<script lang="js">
  import SpeciesRepositoryMixin from '../mixins/SpeciesRepositoryMixin';
  import SpeciesPreview from './builder/species/SpeciesPreview';

  export default {
  name: 'species-selection',
  props: [],
  components: { SpeciesPreview },
  mixins: [SpeciesRepositoryMixin],
  data() {
    return {
      publicPath: process.env.BASE_URL,
      selectedSpecies: undefined,
      previewSpeciesArchetypeOptions: [],
    };
  },
  methods: {
    updatePreview(item) {
      this.selectedSpecies = item;
    },
    selectSpeciesForChar(species) {
      this.$store.commit('setSpecies', { value: species.name, cost: species.cost });
    },
    resetSpecies() {
      this.selectedSpecies = undefined;
      this.$store.commit('setSpecies', { values: undefined, cost: 0 });
    },
    getSpeciesBy(name) {
      if (this.speciesRepository) {
        return this.speciesRepository.find(s => s.name === name);
      }
      return undefined;
    },
    getChapterTraditions(chapterName) {
      const chapter = this.astartesChapterRepository.find(a => a.name === chapterName) || [];
      if (chapter) {
        return chapter.beliefsAndTraditions;
      }
      return [];
    },
  },
  computed: {
    loaded() { return this.speciesRepository !== undefined; },
    settingTier() { return this.$store.getters.settingTier; },
    characterSpecies() { return this.getSpeciesBy(this.characterSpeciesName); },
    characterSpeciesName() { return this.$store.getters.species; },
  },
};
</script>

<style scoped lang="css">
</style>
