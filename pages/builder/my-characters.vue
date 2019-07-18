<template lang="html">

  <v-layout justify-center row wrap>

    <v-flex xs12>

      <div>
        <h2 class="headline">Characters</h2>

        <v-btn block large color="primary">Create a Character</v-btn>

      </div>

    </v-flex>

    <v-flex xs12 sm6 md5 v-if="characters">

      <v-card
        v-for="character in characters"
        v-bind:key="character.id"
      >

        <v-card-text>
          <v-avatar color="red" size="64">
            <img src="/img/icon/species/species_ork_avatar.png" />
          </v-avatar>
          <div>
            <h3 class="headline">Simsel simselman</h3>
            <span>{{ character.species }} - {{ character.archetype }}</span>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-btn
            block
            color="primary"
            flat
            small
          >
            <v-icon>description</v-icon>
            View
          </v-btn>
          <v-btn
            block
            color="primary"
            flat
            small
          >
            <v-icon>edit</v-icon>
            Edit
          </v-btn>
          <v-btn
            block
            color="red"
            flat
            small
          >
            <v-icon>delete</v-icon>
            Delete
          </v-btn>
        </v-card-actions>

      </v-card>

    </v-flex>

  </v-layout>

</template>

<script lang="js">
  import axios from 'axios';
  import SpeciesRepositoryMixin from '~/mixins/SpeciesRepositoryMixin.js';
  import ArchetypeRepositoryMixin from '~/mixins/ArchetypeRepositoryMixin.js';

  export default {
  name: 'my-characters',
  //layout: 'builder',
  mixins: [SpeciesRepositoryMixin, ArchetypeRepositoryMixin],
  props: [],
  data() {
    return {

    };
  },
  async asyncData ({ params }) {
    const config = { headers: { 'X-USER-HASH': 'ecd016aa-afac-44e8-8448-ddd09197dbb8' } };
    const response = await axios.get(`http://localhost:3000/api/characters`, config).catch( (e) => { console.warn(e); });
    if ( response && response.data) {
      let characters = [];
      characters = response.data.map( (row) => {
        const charState = row.character_object;
        return {
          id: charState.id,
          species: charState.species.value,
          archetype: charState.archetype.value,
        };
      });
      return { characters : characters };
    }
    return { characters: undefined };
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
