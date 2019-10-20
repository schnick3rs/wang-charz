<template lang="html">

  <v-row justify="center">

    <v-col
      v-bind:cols="12"
      v-bind:md="10"
    >

      <div>
        <h2 class="headline">Characters</h2>

        <v-btn large color="primary" v-on:click="newCharacter">Create a Character</v-btn>

      </div>

      <v-row justify="left">

        <v-col
          v-if="characterSets"
          v-for="character in characterSets.filter(i=>i !== undefined)"
          v-bind:key="character.id"
          v-bind:cols="12"
          v-bind:sm="6"
          v-bind:md="6"
          v-bind:lg="6"
        >

          <v-card v-if="character">

            <div class="card">

            <div class="card__image-container">
              <div
                class="card__image"
                v-bind:style="{ backgroundImage: 'url('+getAvatar(characterSpeciesLabel(character.id), characterArchetypeLabel(character.id))+')' }"
                loading
              ></div>
            </div>

            <v-card-text class="pa-0">

              <div class="card__content-container pa-4">

                <h3>{{ characterName(character.id) }}</h3>

                <div>
                  <span>{{ characterSpeciesLabel(character.id) }} • {{ characterArchetypeLabel(character.id) }}</span>
                </div>

                <div>
                  <span>Rank {{ characterRank(character.id) }} • {{ characterSpendBp(character.id) }} / {{ characterTotalBp(character.id) }} BP</span>
                </div>

               </div>
            </v-card-text>

            </div>

            <v-divider/>

            <v-card-text class="pa-2 card__campaign-container"><strong>Tier {{characterSettingTier(character.id)}}:</strong> <em>{{ characterSettingTitle(character.id) }}</em></v-card-text>

            <v-divider/>

            <v-card-actions >
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
                v-on:click="deleteCharacter(character.id)"
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
    /*const response = await app.$axios.get('http://localhost:3000/api/characters')
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
    }*/
    return { };
  },
  computed: {
    characters() {
      return [
        ...this.localCharacter,
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
      deleteCharacter: 'characters/remove',
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
    characterRank(id){
      return this.$store.getters['characters/characterCampaignCustomRankById'](id);
    },
    characterTotalBp(id) {
      return this.$store.getters['characters/characterTotalBuildPointsById'](id);
    },
    characterSpendBp(id){
      return this.$store.getters['characters/characterSpendBuildPointsById'](id);
    },
    characterSettingTitle(id){
      return this.$store.getters['characters/characterSettingTitleById'](id);
    },
    characterSettingTier(id){
      return this.$store.getters['characters/characterSettingTierById'](id);
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

<style scoped lang="scss">
  .card {

    //max-width: 640px;
    height: 120px;
    display: flex;

    &__image-container {
      width: 120px;
      min-width: 120px;
      object-fit: contain;
      align-self: flex-start;
    }

    &__image {
      background-position: center center;
      background-size: cover;
      height: 120px;
      width: 120px;
    }

    &__content-container {
      flex: 1 1 auto;
      color: rgba(0, 0, 0, 0.54);
    }

    &__campaign-container {
      //color: rgba(255, 255, 255, 0.7);
      //background-color: #424242;
    }

    &__content-subtitle {

    }

    &__content-footer {
      position: absolute;
      bottom: 10px;
      right: 10px;
    }
  }
</style>
