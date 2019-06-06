<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <v-container grid-list-md>

    <section class="talent-selection">
      <h1>talent-selection Component</h1>
    </section>

    <v-layout row>

      <v-flex xs12>

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

          <v-data-table
                  :items="filteredTalentRepository"
                  :search="searchQuery"
                  :headers="headers"
          >
            <template v-slot:no-data>
              <v-alert :value="true" color="error" icon="warning">
                Sorry, nothing to display here :(
              </v-alert>
            </template>
            <template v-slot:items="props">
              <td>{{props.item.name}}</td>
              <td class="text-xs-right" >{{props.item.cost}}</td>
              <td>{{props.item.prerequisites}}</td>
              <td>{{props.item.type}}</td>
              <td>{{props.item.effect}}</td>
              <td><v-btn icon><v-icon :color="affordableColor(props.item.cost)">add_circle</v-icon></v-btn></td>
            </template>
            <template v-slot:no-results>
              <v-alert :value="true" color="error" icon="warning">
                Your search for "{{ searchQuery }}" found no results.
              </v-alert>
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
    },
    computed: {
      filteredTalentRepository() {
        console.log('filter talent repository...');
        if ( this.talentRepository === undefined ) {
          return [];
        }

        let filteredTalents = this.talentRepository.filter((t) => {
          return ( !t.prerequisitesKeywords ||
            t.prerequisitesKeywords.split(',').some((r)=>this.characterKeywords.indexOf(r) >= 0) );
        });

        console.log(`Returning ${filteredTalents.length} entries.`);
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
