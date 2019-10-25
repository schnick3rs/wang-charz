<template lang="html">

  <v-row justify="center">

    <v-col v-bind:cols="12">

      <h2 class="headline">
        My Characters: <span style="color: #1976d2;">{{ characterSets.filter(i=>i !== undefined).length }} Slots</span>
      </h2>

      <v-btn large color="primary" v-on:click="newCharacter">Create a Character</v-btn>

    </v-col>

    <!-- No Chars yet info text -->
    <v-col v-bind:cols="12" v-if="characterSets.filter(i=>i !== undefined).length <= 0">
      <v-alert
        type="info"
        prominent
        text
        border="left"
        color="primary"
      >
        Just hit <strong>Create a Character</strong> and start building.
      </v-alert>
      <v-alert
        type="info"
        prominent
        text
        border="left"
        color="primary"
        v-if="false"
      >
        <p>
          <strong>You have been here before and miss your character?</strong>
          Sadly, to implement the handling of multiple characters, I had to make quite some changes.
          Migrating existing characters was not achievable without significant effort.
          So, after some considerations, I decided to skip the migration.
          However, due to changes within the code, upcoming migrations are feasible.
        </p>
      </v-alert>
    </v-col>

    <v-col v-bind:cols="12">

      <div>
        <v-card>

        </v-card>
      </div>

      <v-row justify="left">

        <v-col
          v-if="characterSets"
          v-for="character in characterSets.filter(i=>i !== undefined)"
          v-bind:key="character.id"
          v-bind:cols="12"
          v-bind:sm="6"
          v-bind:md="6"
          v-bind:lg="4"
        >

          <v-card v-if="character">

            <div class="card" >

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
                nuxt
                v-bind:to="`/forge/characters/${character.id}/builder/setting`"
                color="primary"
                small
              >
                <v-icon left small>edit</v-icon>
                Edit
              </v-btn>
              <v-btn
                nuxt
                v-bind:to="`/forge/characters/${character.id}/builder/print`"
                target="_blank"
                color="primary"
                outlined
                small
              >
                <v-icon small left>description</v-icon>
                Print
              </v-btn>
              <v-btn
                color="red"
                text
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

    <v-col :cols="12">

      <v-card>
        <v-card-text>
          <h1 class="headline">Character Generator for Wrath and Glory</h1>
          <p>
            This <strong>online character generator for Wrath & Glory</strong> allows you to create and <strong>organize multiple
            characters</strong>. Just define a Setting with a fitting Tier and start building.
            For severe issues, feedback and ideas, reach out to me via
            <a href="mailto:docsofdoom+forge@gmail.com?subject=Forge Feedback">docsofdoom+forge(at)gmail.com</a>.
          </p>
          <p>
            One last note, the generator is <strong>still missing some features</strong>, e.g. some Talents like <em>Special Weapon Troopes</em>,
            but the vast majority is working as expected.
            Still, please consider this a <em>late</em> <strong>BETA</strong> Version, so characters <em>might</em> be deleted (or broken) on future updates.
            I will try my best to migrate the existing ones to the new version.
          </p>
        </v-card-text>
      </v-card>

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
  head() {

    const title = 'My Characters | Forge';
    const description = 'The Forge allows you to create and organize multiple characters for the Wrath and Glory' +
      'Roleplaying game. Edit, change and view your characters online.';
    const image = 'https://www.doctors-of-doom.com/img/artwork_abstract.jpg';


    return {
      title: title,
      meta: [
        { hid: 'description', name: 'description', content: description },
        { hid: 'og:title', name: 'og:title', content: title },
        { hid: 'og:description', name: 'og:description', content: description },
        { hid: 'og:image', name: 'og:image', content: image },
      ],
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
      version: 'version',
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

      if ( archetypeLabel !== undefined && !['Ratling','Ogryn'].includes(speciesLabel) ) {
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
      this.$ga.event('New Character', 'click', newCharId, 10);
    },
    deleteCharacter(id){
      this.$store.commit('characters/remove', id);
      this.$ga.event('Delete Character', 'click', id, 1);
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
