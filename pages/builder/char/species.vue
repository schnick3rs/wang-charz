<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <v-layout justify-center row wrap>

    <v-flex v-if="!characterSpecies || changeSpeciesMode">
      <h1 class="headline">Select a Species</h1>
    </v-flex>

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
            :disabled="item.baseTier > settingTier"
            @click.stop="updatePreview(item)"
          >

            <v-list-tile-avatar tile>
              <img :src="getAvatar(item.name)" />
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ item.name }}</v-list-tile-title>
              <v-list-tile-sub-title>{{item.hint}}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action >
              <v-chip color="green" text-color="white">
                <v-avatar class="green darken-4">{{item.cost}}</v-avatar>
                BP
              </v-chip>
            </v-list-tile-action>

            <v-list-tile-action>
              <v-chip color="red" text-color="white">
                <v-avatar class="red darken-4">{{item.baseTier}}</v-avatar>
                Tier
              </v-chip>
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
  import SpeciesPreview from '~/components/builder/SpeciesPreview.vue';
  import SpeciesRepositoryMixin from '~/mixins/SpeciesRepositoryMixin.js';

  export default {
  name: 'SpeciesSelection',
  layout: 'builder',
  components: { SpeciesPreview },
  mixins: [ SpeciesRepositoryMixin ],
  props: [],
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
    settingTier() { return this.$store.state.settingTier; },
    characterSpecies() { return this.getSpeciesBy(this.characterSpeciesName); },
    characterSpeciesName() { return this.$store.state.species.value; },
  },
  methods: {
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
