<template lang="html">

  <v-row justify="center">

    <v-col
      v-bind:cols="10"
      v-bind:md="8"
    >

      <div>
        <h2 class="headline">Characters</h2>

        <v-btn large color="primary" v-on:click="newCharacter">Create a Character</v-btn>

      </div>

      <v-row justify="center">

        <v-col
          v-if="characterSets"
          v-for="character in characterSets.filter(i=>i !== undefined)"
          v-bind:key="character.id"
          v-bind:cols="12"
          v-bind:md="12"
          v-bind:lg="6"
        >

          <v-card v-if="character">

            <v-card-title>
              <h3 class="headline">{{ characterName(character.id) }}</h3>
              <v-spacer></v-spacer>
              <v-icon v-if="character.storage === 'local'">storage</v-icon>
              <v-icon v-if="character.storage === 'db'">cloud</v-icon>
            </v-card-title>

            <v-card-text>
              <v-avatar color="red" size="64">
                <img v-bind:src="getAvatar(characterSpeciesLabel(character.id), characterArchetypeLabel(character.id))" />
              </v-avatar>
              <div>
                <span>{{ characterSpeciesLabel(character.id) }} • {{ characterArchetypeLabel(character.id) }}</span>
              </div>
              <div>
                <span>{{ characterSettingTitle(character.id) }}</span>
              </div>
            </v-card-text>


            <v-card-actions>
              <v-btn
                color="primary"
                outlined
                small
                disabled
                v-if="false"
              >
                <v-icon small>description</v-icon>
                View
              </v-btn>
              <v-btn
                nuxt
                v-bind:to="`/forge/${character.id}/setting`"
                color="primary"
                outlined
                small
              >
                <v-icon small>edit</v-icon>
                Edit
              </v-btn>
              <v-btn
                color="red"
                outlined
                small
                v-on:click="deleteChar(character.id)"
              >
                <v-icon small>delete</v-icon>
                Delete
              </v-btn>
            </v-card-actions>

          </v-card>

        </v-col>

      </v-row>

    </v-col>

  </v-row>

</template>

<script lang="js">
import {mapGetters, mapMutations, mapState} from 'vuex';
import ArchetypeRepositoryMixin from '~/mixins/ArchetypeRepositoryMixin.js';
import SpeciesRepositoryMixin from '~/mixins/SpeciesRepositoryMixin.js';

export default {
  name: 'my-characters',
  //layout: 'forge',
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
    ...mapGetters({
      characterIds: 'characters/characterIds',
      characterSets: 'characters/characterSets',
    }),
    localCharacter() {
      return [{
        id: this.$store.getters.id,
        name: this.$store.getters.name,
        species: this.$store.getters.species,
        archetype: this.$store.getters.archetype,
        storage: 'local',
      }];
    },
  },
  methods: {
    ...mapMutations({
      deleteChar: 'characters/remove',
    }),
    characterName(id){
      return this.$store.getters['characters/characterNameById'](id);
    },
    characterSpeciesLabel(id) {
      return this.$store.getters['characters/characterSpeciesLabelById'](id);
    },
    characterArchetypeLabel(id) {
      return this.$store.getters['characters/characterArchetypeLabelById'](id);
    },
    characterSettingTitle(id){
      return this.$store.getters['characters/characterSettingTitleById'](id);
    },
    getAvatar(speciesLabel, archetypeLabel) {

      if ( archetypeLabel !== undefined ) {
        const slug = archetypeLabel.toLowerCase().replace(/\s/gm, '-');
        return `/img/icon/archetype/archetype_${slug}_avatar.png`;
      }

      if ( speciesLabel !== undefined ) {
        const slug = speciesLabel.toLowerCase().replace(/\s/gm, '-');
        return `/img/icon/species/species_${slug}_avatar.png`;
      }

      return `/img/icon/species/species_human_avatar.png`;
    },
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
    newCharacter(){
      let newCharId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
      this.$store.commit('characters/create', newCharId);
    },
  },
};
</script>

<style scoped lang="css">

</style>
