<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <v-layout justify-center row wrap>

    <v-flex v-if="!characterArchetype || changeMode">
      <h1 class="headline">Manage Powers</h1>

      <v-alert
        :value="alerts.length > 0"
        v-for="alert in alerts"
        :key="alert.key"
        :type="alert.type"
      >{{alert.text}}</v-alert>
    </v-flex>

    <v-flex xs12>

      <v-card>
        <v-card-text>
          <v-chip
            v-for="item in characterPowers"
            :key="item.key"
            close
            @input="removePower(item)"
          >
            {{item}}
          </v-chip>
        </v-card-text>
      </v-card>

    </v-flex>

    <v-flex xs12>

      <v-text-field
        solo
        placeholder="Search..."
        v-model="searchQuery"
        prepend-inner-icon="search"
        clearable
      ></v-text-field>

      <v-chip
        v-for="discipline in disciplines"
        :key="discipline.key"
        @click="toggleDisciplineFilter(discipline.name)"
        :color="selectedDisciplines.includes(discipline.name) ? 'success' : ''"
        small
        label
      >
        {{discipline.name}}
      </v-chip>
    </v-flex>

    <v-flex xs12>

      <v-card>

        <v-data-table
          :items="filteredPowers"
          :search="searchQuery"
          :headers="headers"
        >
          <template v-slot:no-data>
          </template>
          <template v-slot:items="props">
            <td class="caption">{{props.item.name}}</td>
            <td class="caption">{{props.item.discipline}}</td>
            <td class="caption"><span class="hidden-sm-and-down">{{props.item.effect}}</span></td>
            <td class="caption text-xs-center" >{{props.item.cost}}</td>
            <td>
              <v-btn
                icon
                @click="addPower(props.item)"
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

</template>

<script lang="js">

  export default {
  name: 'psychic-powers',
  layout: 'builder',
  props: [],
  async asyncData({ params }) {
  },
  data() {
    return {
      searchQuery: '',
      headers: [
        { text: 'Name', value: 'name', align: 'left', sortable: true },
        { text: 'Discipline', value: 'discipline', sortable: true },
        { text: 'Effect', value: 'effect', sortable: false },
        { text: 'Cost', value: 'cost', align: 'center', sortable: true },
        { text: 'Learn', align: 'center', sortable: false },
      ],
      disciplines: [
        { name: 'Minor', },
        { name: 'Universal', },
        { name: 'Biomancy', },
        { name: 'Divination', },
        { name: 'Pyromancy', },
        { name: 'Telekinesis', },
        { name: 'Telepathy', },
        { name: 'Maleficarum', },
        { name: 'Runes of Battle', },
      ],
      selectedDisciplines: [],
      powers: [
        {
          name: 'Smite',
          cost: 0,
          discipline: 'Universal',
          keywords: [ 'Psychic' ],
          effect: 'Inflict 1d3 Mortal Wounds',
          source: {
            book: 'core',
            version: 'v1',
            page: '343',
          },
          prerequisites: [],
          crunch: {
            dn: '',
            activation: '',
            duration: '',
            range: '',
            multiTarget: true,
            effect: '',
            potency: [],
          },
        },
        {
          name: 'Compel',
          cost: 10,
          discipline: 'Minor',
          keywords: [ 'Psychic' ],
          effect: 'Command a target to perform a short, simple act',
          source: {
            book: 'core',
            version: 'v1',
            page: '349',
          },
          prerequisites: [],
          crunch: {
            dn: '5',
            activation: '2 Simple Actions',
            duration: '1 Round',
            range: '5 meters',
            multiTarget: false,
            effect: 'The psyker implants a simple command in the mind of a nearby creature. This command must be short (consisting of a single action), simple and obvious, but can otherwise overcome the given creature’s own interests or base instincts. Example commands include: “drop the weapon,” “open the door” or “push him.” Suggestions cannot make a creature perform an action that they are simply incapable of performing—a psyker cannot make a cyber mastiff work a door handle for example. The target creature must successfully pass a Willpower test (DN 4) or is compelled to obey the Compel.',
            potency: [
              { value: 1, text: '+1DN to the Willpower test to resist.' }
            ],
          },
        },
      ],
    }
  },
  computed: {
    alerts() {
      let alerts = [];

      if ( !this.isPsychic ) {
        let alert = {
          type: 'warning',
          text: 'You need to either possess the <strong>Psychic</strong> Keyword or have at ' +
            'least learned one rank in the <strong>Psychc Mastery</strong> skill',
        };
        alerts.push(alert);
      }
      return alerts;
    },
    isPsychic() {
      const hasSkill = this.$store.state.skills.psychicMastery > 0;
      const hasKeyword = this.$store.state.keywords.includes("Psychic");
      return ( hasSkill || hasKeyword );
    },
    characterPowers() { return this.$store.state.psychicPowers.map( p => p.name) },
    filteredPowers() {

      if ( this.powers === undefined ) {
        return [];
      }

      let filteredPowers = this.powers;

      console.log(this.selectedDisciplines);
      if ( this.selectedDisciplines.length > 0 ) {
        filteredPowers = filteredPowers.filter((p) => {
          return this.selectedDisciplines.includes(p.discipline)
        });
      }

      //filteredTalents = filteredTalents.filter( t => !this.characterTalents.includes(t.name) );

      return filteredPowers;
    },
    remainingBuildPoints() { return this.$store.getters.remainingBuildPoints; },
    //TODO
    characterKeywords() {
      return ['Adepta Sororitas', 'Imperium'];
    }
  },
  methods: {
    affordableColor(cost) {
      return (cost <= this.remainingBuildPoints) ? 'green' : 'grey';
    },
    addPower(power) {
      this.$store.commit('addPower', { name: power.name, cost: power.cost });
    },
    removePower(power) {
      this.$store.commit('removePower', { name: power } );
    },
    toggleDisciplineFilter(name) {
      if ( this.selectedDisciplines.includes(name) ) {
        this.selectedDisciplines = this.selectedDisciplines.filter( d => d != name);
      } else {
        this.selectedDisciplines.push(name);
      }
    },
  }
}
</script>

<style scoped lang="css">
</style>
