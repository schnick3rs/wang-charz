<template lang="html">

  <v-layout justify-center row wrap>

    <v-flex xs12>

      <div>
        <h2 class="headline">Characters</h2>

      </div>

    </v-flex>

    <v-flex xs12 sm6 md4 v-if="characters">

      <v-card
        v-for="character in characters"
        v-bind:key="character.id"
      >
        {{ JSON.parse(character.character_object) }}

      </v-card>

    </v-flex>

  </v-layout>

</template>

<script lang="js">
  import axios from 'axios';
  import SpeciesRepositoryMixin from '~/mixins/SpeciesRepositoryMixin.js';
  import ArchetypeRepositoryMixin from '~/mixins/ArchetypeRepositoryMixin.js';

  export default {
  name: 'Setting',
  layout: 'builder',
  mixins: [SpeciesRepositoryMixin, ArchetypeRepositoryMixin],
  props: [],
  data() {
    return {

    };
  },
  async asyncData ({ params }) {
    const response = await axios.get(`http://localhost:3000/api/characters` )
    return { characters : response.data };
  },
  computed: {
    settingTier() { return this.$store.state.settingTier; },
  },
  methods: {
    setSettingTier(event) {
      this.$store.commit('setSettingTier', { amount: event });
    },
    applySetting() {
      this.$store.commit('setSetting', { setting: this.setting });
      this.$router.push({ name: 'builder-char-species' });
    },
    clearState() {
      this.$store.commit('resetState');
    },
    updateHomebrew(homebrew) {
      const enabled = this.enabledHomebrews.includes(homebrew.key);
      if ( enabled ) {
        this.$store.commit('addHomebrewContent', { key: homebrew.key});
      } else {
        this.$store.commit('removeHomebrewContent', { key: homebrew.key});
      }
    },
    loadChar(){
      this.$store.dispatch('loadCharacterFromDatabase', { id: 3 } );

    },
    saveChar(){
      this.$store.dispatch('saveCurrentCharacterToDatabase', { id: 1 } );
    },
    registerUser(){
      this.$store.commit('user/generateNewHash', {});
    },
  },
};
</script>

<style scoped lang="css">

</style>
