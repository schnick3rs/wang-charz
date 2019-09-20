<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <v-row justify="center">

    <v-col :cols="12" v-if="!characterSpecies || changeSpeciesMode">
      <h1 class="headline">Select a Species</h1>
    </v-col>

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

    <v-col v-if="!characterSpecies || changeSpeciesMode" xs12>
      <v-card>
        <v-list>
          <v-list-item
            v-for="item in speciesRepository"
            :key="item.name"
            avatar
            :disabled="item.baseTier > settingTier"
            @click.stop="updatePreview(item)"
          >

            <v-list-item-avatar tile>
              <img :src="getAvatar(item.name)" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
              <v-list-item-subtitle>{{item.hint}}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action >
              <v-chip pill color="green" text-color="white">
                <v-avatar left class="green darken-4">{{item.cost}}</v-avatar>
                BP
              </v-chip>
            </v-list-item-action>

            <v-list-item-action>
              <v-chip pill color="red" text-color="white">
                <v-avatar left class="red darken-4">{{item.baseTier}}</v-avatar>
                Tier
              </v-chip>
            </v-list-item-action>

          </v-list-item>
        </v-list>
      </v-card>
    </v-col>

    <v-col v-if="characterSpecies && !changeSpeciesMode" xs12>
      <species-preview
        v-bind:species="characterSpecies"
        v-on:changeSpecies="doChangeSpeciesMode"
        v-on:select="selectSpeciesForChar"
        v-on:reset="resetSpecies"
        v-on:changeChapter="updateAstartesChapter"
        manageMode
      />
    </v-col>

  </v-row>
</template>

<script lang="js">
  import SpeciesPreview from '~/components/builder/SpeciesPreview.vue';
  import SpeciesRepositoryMixin from '~/mixins/SpeciesRepositoryMixin.js';
  import { mapGetters } from 'vuex';

  export default {
  name: 'SpeciesSelection',
  layout: 'builder',
  components: { SpeciesPreview },
  mixins: [ SpeciesRepositoryMixin ],
  props: [],
    head() {
      return {
        title: 'Select Species',
      }
    },
  data() {
    return {
      changeSpeciesMode: false,
      speciesDialog: false,
      selectedSpecies: undefined,
      previewSpeciesArchetypeOptions: [],
    };
  },
  computed: {
    loaded() { return this.speciesRepository !== undefined; },
    ...mapGetters([
      'settingTier',
      'speciesAstartesChapter',
    ]),
    characterSpeciesName() { return this.$store.state.species.value; },
    characterSpecies() {
      const species = this.getSpeciesBy(this.characterSpeciesName);
      const chapter = this.speciesAstartesChapter;
      if(chapter) {
        species['chapter'] = chapter;
      }
      return species;
    },
  },
  methods: {
    updateAstartesChapter(chapterName){
      this.$store.commit('setSpeciesAstartesChapter', { name: chapterName });
    },
    getAvatar(name) {
      const slug = name.toLowerCase().replace(/\s/gm, '-');
      return `/img/icon/species/species_${slug}_avatar.png`;
    },
    doChangeSpeciesMode() {
      this.changeSpeciesMode = true;
    },
    updatePreview(item) {
      this.selectedSpecies = item;
      this.speciesDialog = true;
    },
    selectSpeciesForChar(species) {
      this.$store.commit('setSpecies', { value: species.name, cost: species.cost });
      this.$store.commit('setSpeciesModifications', { modifications: species.modifications });
      this.speciesDialog = false;
      this.changeSpeciesMode = false;
    },
    resetSpecies() {
      this.selectedSpecies = undefined;
      this.$store.commit('setSpecies', { values: undefined, cost: 0 });
    },
    getSpeciesBy(name) {
      return this.speciesRepository.find(s => s.name === name);
    },
    getChapterTraditions(chapterName) {
      const chapter = this.astartesChapterRepository.find(a => a.name === chapterName) || [];
      if (chapter) {
        return chapter.beliefsAndTraditions;
      }
      return [];
    },
  },
};
</script>

<style scoped lang="css">
</style>
