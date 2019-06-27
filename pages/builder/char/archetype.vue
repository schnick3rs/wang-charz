<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <v-layout justify-center row wrap>

    <v-dialog
      v-model="dialog"
      width="600px"
      scrollable
    >
      <archetype-preview
        :item="selectedArchetype"
        chooseMode
        @select="selectArchetypeForChar"
        @cancel="dialog = false"
      ></archetype-preview>
    </v-dialog>

    <v-flex xs12 v-if="!characterArchetype || changeMode">
      <v-text-field
        solo
        placeholder="Search..."
        v-model="searchQuery"
        prepend-inner-icon="search"
        clearable
      ></v-text-field>
    </v-flex>

    <v-flex xs12 v-if="!characterArchetype || changeMode">

      <v-card v-if="loaded">

        <div v-for="(group, key) in archetypeGroups">

          <v-divider></v-divider>

          <v-list subheader v-if="archetypesByGroup(group).length > 0">

            <v-subheader>{{ group }}</v-subheader>

            <v-list-tile
              two-line
              v-for="item in archetypesByGroup(group)"
              avatar
              @click.stop="updatePreview(item)"
              :disabled="item.species !== characterSpecies"
            >

              <v-list-tile-content>
                <v-list-tile-title>{{item.name}}</v-list-tile-title>
                <v-list-tile-sub-title>{{item.hint}}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-chip color="green" text-color="white">
                  <v-avatar class="green darken-4">{{item.cost}}</v-avatar>
                  <v-icon>attach_money</v-icon>
                </v-chip>
              </v-list-tile-action>
              <v-list-tile-action>
                <v-chip color="red" text-color="white">
                  <v-avatar class="red darken-4">{{item.tier}}</v-avatar>
                  <v-icon >account_balance</v-icon>
                </v-chip>
              </v-list-tile-action>

            </v-list-tile>

          </v-list>

        </div>
      </v-card>

    </v-flex>

    <v-flex xs12 v-if="characterArchetype && !changeMode">

      <archetype-preview
        :item="characterArchetype"
        manageMode
        @change="doChangeMode"
        @select="selectArchetypeForChar"
        @reset="resetArchetype"
      ></archetype-preview>

    </v-flex>

  </v-layout>

</template>

<script lang="js">
  import axios from 'axios';
  import ArchetypePreview from '~/components/builder/ArchetypePreview';

  export default {
    name: 'Archetype',
    layout: 'builder',
    components: { ArchetypePreview },
    props: [],
    data() {
      return {
        dialog: false,
        changeMode: false,
        searchQuery: '',
        selectedArchetype: undefined,
      }
    },
    async asyncData({ params }) {
      const archetypeResponse = await axios.get(`https://api.sheety.co/e39d8899-85e5-4281-acf4-4d854bd39994`);
      const archetypeAbilityResponse = await axios.get(`https://api.sheety.co/6790490e-d9cc-439f-839b-dec3f1f8edc0`);
      return {
        archetypeRepository: archetypeResponse.data || [],
        archetypeAbilityRepository: archetypeAbilityResponse.data || [],
      }
    },
    methods: {
      doChangeMode() {
        this.changeMode = true;
      },
      getArchetypeBy(name) {
        if ( this.archetypeRepository ) {
          return this.archetypeRepository.find( s => s.name === name );
        }
        return undefined;
      },
      archetypesByGroup(groupName) {
        let archetypes = this.archetypeRepository;

        /* filter by archetype group */
        archetypes = archetypes.filter( a => a.group === groupName );

        /* filter by  */
        if ( this.characterSpecies ) {
          archetypes = archetypes.filter( a => a.species === this.characterSpecies )
        }

        /* filter by search query */
        if ( this.searchQuery ) {
          let lowerCaseSearchQuery = this.searchQuery.toLowerCase();
          archetypes = archetypes.filter( a => {
            let lowerCaseArchetype = a.name.toLowerCase();
            return lowerCaseArchetype.indexOf(lowerCaseSearchQuery) >= 0;
          } );
        }

        return archetypes;
      },
      selectArchetypeForChar(item) {
        this.$store.commit('setArchetype', { value: item.name, cost: item.cost });
        this.dialog = false;
        this.changeMode = false;
      },
      resetArchetype() {
        this.selectedArchetype = undefined;
        this.$store.commit('setArchetype', { values: undefined, cost: 0} );
      },
      updatePreview(item) {
        this.selectedArchetype = item;
        this.dialog = true;
      },
    },
    computed: {
      loaded() { return this.archetypeRepository !== undefined; },
      characterArchetypeName() { return this.$store.getters.archetype; },
      characterArchetype() { return this.getArchetypeBy(this.characterArchetypeName); },
      characterSpecies() { return this.$store.getters.species; },
      archetypeGroups: function() {

        if ( this.archetypeRepository !== undefined ) {

          let archetypes = this.archetypeRepository;

          if ( this.characterSpecies !== undefined ) {
            archetypes = archetypes.filter( a => a.species === this.characterSpecies );
          }

          return [...new Set(archetypes.map(item => item.group))]
        }

        return []
      }
    },
  }
</script>

<style scoped lang="css">
</style>
