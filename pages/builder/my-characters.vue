<template lang="html">

  <v-row justify="center">

    <v-col
      v-bind:cols="12"
    >

      <div>
        <h2 class="headline">Characters</h2>

        <v-btn large color="primary">Create a Character</v-btn>

      </div>

    </v-col>

    <v-col
      v-if="characters"
      v-for="character in characters"
      v-bind:key="character.id"
      v-bind:cols="6"
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
            color="primary"
            outlined
            x-small
            disabled
          >
            <v-icon small>description</v-icon>
            View
          </v-btn>
          <v-btn
            nuxt
            v-bind:to="`/builder/${character.id}/setting`"
            color="primary"
            outlined
            x-small
          >
            <v-icon small>edit</v-icon>
            Edit
          </v-btn>
          <v-btn
            v-on:click="saveChar"
            color="primary"
            outlined
            x-small
          >
            <v-icon small>save</v-icon>
            Save
          </v-btn>
          <v-btn
            v-on:click="load(character.id)"
            color="primary"
            outlined
            x-small
          >
            <v-icon small>edit</v-icon>
            Load
          </v-btn>
          <v-btn
            color="red"
            outlined
            x-small
          >
            <v-icon small>delete</v-icon>
            Delete
          </v-btn>
        </v-card-actions>

      </v-card>

    </v-col>

  </v-row>

</template>

<script lang="js">
import ArchetypeRepositoryMixin from '~/mixins/ArchetypeRepositoryMixin.js';
import SpeciesRepositoryMixin from '~/mixins/SpeciesRepositoryMixin.js';

export default {
  name: 'my-characters',
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
      .catch( error => { console.warn(`Could not fetch character during async: ${error}`); });
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
    load(characterId) {
      this.$axios.get(`/api/characters/${characterId}`)
        .then( response => {
          this.$store.dispatch('populateState', response)
        });

      //this.$store.dispatch('loadCharacterFromDatabase', characterId );
    },
    loadChar(){
      this.$store.dispatch('loadCharacterFromDatabase', { id: 3 } );
    },
    saveChar(){
      this.$store.dispatch('saveCurrentCharacterToDatabase');
    },
  },
};
</script>

<style scoped lang="css">

</style>
