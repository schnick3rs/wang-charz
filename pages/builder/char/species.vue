<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <v-layout justify-center row wrap>

    <v-dialog
      v-model="speciesDialog"
      width="600px"
      scrollable
    >
      <species-preview
        v-if="selectedSpecies"
        :species="selectedSpecies"
        chooseMode
        @select="selectSpeciesForChar"
        @cancel="speciesDialog = false"
      />
    </v-dialog>

    <v-flex v-if="!characterSpecies || changeSpeciesMode" xs12>
      <v-card>
        <v-list>
          <v-list-tile
            v-for="item in speciesRepository"
            :key="item.name"
            avatar
            @click.stop="updatePreview(item)"

          >
            <v-list-tile-avatar tile>
              <img :src="item.avatar">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ item.name }}</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-badge overlap color="green" :disabled="item.baseTier <= settingTier">
                <template v-slot:badge>
                  <span>{{ item.cost }}</span>
                </template>
                <v-icon color="grey">
                  attach_money
                </v-icon>
              </v-badge>
            </v-list-tile-action>
            <v-list-tile-action>
              <v-badge overlap color="red" :disabled="item.baseTier <= settingTier">
                <template v-slot:badge>
                  <span>{{ item.baseTier }}</span>
                </template>
                <v-icon color="grey">
                  account_balance
                </v-icon>
              </v-badge>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>

    <v-flex v-if="characterSpecies && !changeSpeciesMode" xs12>
      <species-preview
        :species="characterSpecies"
        manageMode
        @changeSpecies="doChangeSpeciesMode"
        @select="selectSpeciesForChar"
        @reset="resetSpecies"
      />
    </v-flex>

  </v-layout>
</template>

<script lang="js">
  import axios from 'axios'
  import SpeciesPreview from '~/components/builder/SpeciesPreview'

  export default {
  name: 'SpeciesSelection',
  layout: 'builder',
  components: { SpeciesPreview },
  mixins: [ ],
  props: [],
  data() {
    return {
      changeSpeciesMode: false,
      speciesDialog: false,
      selectedSpecies: undefined,
      previewSpeciesArchetypeOptions: []
    }
  },
  computed: {
    loaded() { return this.speciesRepository !== undefined },
    settingTier() { return this.$store.state.settingTier },
    characterSpecies() { return this.getSpeciesBy(this.characterSpeciesName) },
    characterSpeciesName() { return this.$store.state.species.value }
  },
  async asyncData({ params }) {
    const speciesResponse = await axios.get(`https://api.sheety.co/04c8f13a-c4ed-4f05-adad-7cf11db62151`)
    const speciesAbilitiesResponse = await axios.get(`https://api.sheety.co/a192e4d5-a73f-46c0-929e-f3eca3dde0a0`)
    return {
      speciesRepository: speciesResponse.data || [],
      speciesAbilitiesRepository: speciesAbilitiesResponse.data || []
    }
  },
  methods: {
    doChangeSpeciesMode() {
      this.changeSpeciesMode = true;
    },
    updatePreview: function (item) {
      this.selectedSpecies = item;
      this.speciesDialog = true;
    },
    selectSpeciesForChar(species) {
      this.$store.commit('setSpecies', { value: species.name, cost: species.cost })
      this.speciesDialog = false;
      this.changeSpeciesMode = false;
    },
    resetSpecies() {
      this.selectedSpecies = undefined
      this.$store.commit('setSpecies', { values: undefined, cost: 0 })
    },
    getSpeciesBy(name) {
      return this.speciesRepository.find(s => s.name === name)
    },
    getChapterTraditions(chapterName) {
      const chapter = this.astartesChapterRepository.find(a => a.name === chapterName) || []
      if (chapter) {
        return chapter.beliefsAndTraditions
      }
      return []
    }
  }
}
</script>

<style scoped lang="css">
</style>
