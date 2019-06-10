<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <v-container grid-list-md>

    <v-layout justify-center row wrap>

      <v-flex xs10>

        <v-card>
          <v-card-text>
            <v-chip v-for="talent in characterTalents" close @input="removeTalent(talent)" >{{talent}}</v-chip>
          </v-card-text>
        </v-card>

      </v-flex>

      <v-flex xs10>

        <v-card>

          <v-card-title>
            <v-text-field
                    v-model="searchQuery"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
            ></v-text-field>
          </v-card-title>

          <v-data-table :loading="!loaded"
                  :items="filteredTalentRepository"
                  :search="searchQuery"
                  :headers="headers"
          >
            <template v-slot:no-data>
            </template>
            <template v-slot:items="props">
              <td>{{props.item.name}}</td>
              <td class="text-xs-center" >{{props.item.cost}}</td>
              <td>{{props.item.prerequisites}}</td>
              <td>{{props.item.type}}</td>
              <td>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon class="hidden-md-and-up" v-on="on" color="primary">help</v-icon>
                  </template>
                  <span>{{props.item.effect}}</span>
                </v-tooltip>
                <span class="hidden-sm-and-down">{{props.item.effect}}</span>
              </td>
              <td>
                <v-btn icon
                  @click="addTalent(props.item)"
                >
                  <v-icon :color="affordableColor(props.item.cost)">add_circle</v-icon>
                </v-btn>
              </td>
            </template>
            <template v-slot:no-results>
              <div class="text-lg-center">Your search for "{{ searchQuery }}" found no results.</div>
            </template>
          </v-data-table>

        </v-card>

      </v-flex>

    </v-layout>

  </v-container>

</template>

<script lang="js">
  import axios from "axios";

  export default  {
    name: 'talent-selection',
    props: [],
    mounted() {
      console.info('Fetching from sheety.co ...');
      axios.get('https://api.sheety.co/060cab8e-6b58-421f-9322-8274946b12b7')
        .then((response) => {
          this.talentRepository = response.data; // all talents;
          console.log(`Fetched ${this.talentRepository.length} talents.`);
        })
    },
    data() {
      return {
        searchQuery: '',
        headers: [
          { text: 'Name', value: 'name', align: 'left', sortable: true },
          { text: 'Cost', value: 'cost', align: 'center', sortable: true },
          { text: 'Prerequisites', value: 'prerequisites', sortable: false },
          { text: 'Type', value: 'type', sortable: false },
          { text: 'Effect', value: 'effect', sortable: false },
          { text: 'Buy', align: 'center', sortable: false },
        ],
        talentRepository: undefined,
      }
    },
    methods: {
      affordableColor(cost) {
        return (cost <= this.remainingBuildPoints) ? 'green' : 'grey';
      },
      addTalent(talent) {
        this.$store.commit('addTalent', { name: talent.name, cost: talent.cost });
      },
      removeTalent(talent) {
        this.$store.commit('removeTalent', { name: talent } );
      }
    },
    computed: {
      loaded() { return this.talentRepository !== undefined; },
      characterTalents() { return this.$store.getters.talents },
      filteredTalentRepository() {

        if ( this.talentRepository === undefined ) {
          return [];
        }

        let filteredTalents = this.talentRepository.filter((t) => {
          return ( !t.prerequisitesKeywords ||
            t.prerequisitesKeywords.split(',').some((r)=>this.characterKeywords.indexOf(r) >= 0) );
        });

        filteredTalents = filteredTalents.filter( t => !this.characterTalents.includes(t.name) );

        return filteredTalents;
      },
      remainingBuildPoints() { return this.$store.getters.remainingBuildPoints; },
      //TODO
      characterKeywords() {
        return ['Adepta Sororitas', 'Imperium'];
      }
    }
}
</script>

<style scoped lang="css">
  .talent-selection {

  }
</style>
