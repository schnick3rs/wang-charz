<template lang="html">

  <v-layout justify-center row wrap>

    <v-flex xs12>

      <div>
        <h2 class="headline">Characters</h2>

        <v-btn block large color="primary">Create a Character</v-btn>

      </div>

    </v-flex>

    <v-flex xs12 sm6 md5
      v-if="characters"
      v-for="character in characters"
      v-bind:key="character.id"
    >

      <v-card>

        <v-card-title>
          <h3 class="headline">{{character.name}}</h3>
          <v-spacer></v-spacer>
          <v-icon v-if="character.storage === 'local'">storage</v-icon>
          <v-icon v-if="character.storage === 'db'">cloud</v-icon>
        </v-card-title>

        <v-card-text>
          <v-avatar color="red" size="64">
            <img src="/img/icon/species/species_ork_avatar.png" />
          </v-avatar>
          <div>
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
            v-on:click="edit(character.id)"
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
  import ArchetypeRepositoryMixin from '~/mixins/ArchetypeRepositoryMixin.js';
  import SpeciesRepositoryMixin from '~/mixins/SpeciesRepositoryMixin.js';

  export default {
  name: 'my-characters',
  //layout: 'builder',
  mixins: [
    ArchetypeRepositoryMixin,
    SpeciesRepositoryMixin,
  ],
  props: [],
  data() {
    return {
    };
  },
  async asyncData ({ params, store, app }) {
    const response = await app.$axios.get('http://localhost:3000/api/characters')
      .catch( (e) => { console.warn(`Could not fetch character.`); });
    if ( response && response.data) {
      let characters = [];
      characters = response.data.map( (charState) => {
        return {
          id: charState.id,
          name: charState.name,
          species: charState.species.value,
          archetype: charState.archetype.value,
          storage: 'db',
        };

      });
      return { persistedCharacters : characters };
    }
    return { persistedCharacters: [] };
  },
  computed: {
    characters() {
      return [
        ...this.localCharacter,
        ...this.persistedCharacters,
      ];
    },
    localCharacter() {
      return [{
        id: this.$store.getters.id,
        name: this.$store.getters.name,
        species: this.$store.getters.species,
        archetype: this.$store.getters.archetype,
        storage: 'local',
      }];
    },
    settingTier() { return this.$store.state.settingTier; },
  },
  methods: {
    edit(characterId) {
      console.info(characterId);
      this.$store.dispatch('loadCharacterFromDatabase', { id: characterId } );
    },
    loadChar(){
      this.$store.dispatch('loadCharacterFromDatabase', { id: 3 } );
    },
    saveChar(){
      this.$store.dispatch('saveCurrentCharacterToDatabase', { id: 1 } );
    },
  },
};
</script>

<style scoped lang="css">

</style>
