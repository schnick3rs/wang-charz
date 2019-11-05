<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <v-row justify="center" row wrap>

    <v-col>
      <h1 class="headline">Manage Powers</h1>

      <v-alert
        v-for="alert in alerts"
        v-bind:key="alert.key"
        v-bind:value="true"
        v-bind:type="alert.type"
      >{{ alert.text }}</v-alert>
    </v-col>

    <v-col v-bind:cols="12">

      <v-card>
        <v-card-text>
          <v-chip
            v-for="item in characterPowers"
            v-bind:key="item.name"
            v-bind:close="item.cost !== 0"
            v-on:click:close="removePower(item.name)"
            class="mr-2"          
          >
            {{item.name}}
          </v-chip>
        </v-card-text>
      </v-card>

    </v-col>

    <v-col v-bind:cols="12">

      <v-chip
        v-for="discipline in disciplines"
        v-bind:key="discipline.key"
        v-bind:color="selectedDisciplines.includes(discipline.name) ? 'green' : ''"
        v-on:click="toggleDisciplineFilter(discipline.name)"      
        small
        label
        class="mr-2"
      >
        {{discipline.name}}
      </v-chip>
    </v-col>

    <v-col v-bind:cols="12">

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
          v-bind:headers="headers"
          v-bind:items="filteredPowers"
          v-bind:search="searchQuery"        
          v-bind:items-per-page="-1"
          sort-by="name"
          item-key="name"
          hide-default-footer
        >

          <template v-slot:item.learn="{ item }">
              <span>              
                <v-btn
                v-on:click="addPower(item)"
                v-bind:disabled="characterPowers.map(i=>i.name).includes(item.name)"
                v-bind:color="affordableColor(item.cost)"
                v-bind:dark="!characterPowers.map(i=>i.name).includes(item.name)"
                x-small
              >
                add
              </v-btn>
            </span>
          </template>

          <template v-slot:no-results>
            <div class="text-lg-center">Your search for "{{ searchQuery }}" found no results.</div>
          </template>

        </v-data-table>

      </v-card>

    </v-col>

  </v-row>

</template>

<script lang="js">
export default {
  name: 'psychic-powers',
  layout: 'forge',
  props: [],
  head() {
    return {
      title: 'Select Psychic Powers',
    }
  },
  async asyncData({ params, $axios, error }) {
    const response = await $axios.get(`/api/psychic-powers/`);
    return {
      psychicPowersRepository: response.data,
      characterId: params.id,
    };
  },
  data() {
    return {
      searchQuery: '',
      headers: [
        {
          text: 'Name',
          value: 'name',
          align: 'left',
          sortable: true,
        },
        {
          text: 'Cost',
          value: 'cost',
          align: 'center',
          sortable: true,
        },
        {
          text: 'Discipline',
          value: 'discipline',
          sortable: true,
        },
        {
          text: 'Effect',
          value: 'effect',
          sortable: false,
        },
        {
          text: 'Learn',
          align: 'center',
          value: 'learn',
          sortable: false,
        },
      ],
      disciplines: [
        { name: 'Minor' },
        { name: 'Universal' },
        { name: 'Biomancy' },
        { name: 'Divination' },
        { name: 'Pyromancy' },
        { name: 'Telekinesis' },
        { name: 'Telepathy' },
        { name: 'Maleficarum' },
        { name: 'Runes of Battle' },
      ],
      selectedDisciplines: [],
      access: [
        {
          source: 'Eldar',
          disciplines: [],
          permission: [
            { type: 'Discipline', value: 'Minor' },
          ],
        },
        {
          source: 'Sanctioned Psyker',
          disciplines: ['Minor', 'Universal'],
          free: [
            { type: 'Power', value: 'Smite' },
            { type: 'Discipline', value: 'Minor' },
          ],
        },
        {
          source: 'Rogue Psyker',
          disciplines: ['Minor', 'Universal', 'Maleficarum'],
          free: [
            { type: 'Power', value: 'Smite' },
            { type: 'Discipline', value: 'Minor' },
          ],
        },
        {
          source: 'Warlock',
          disciplines: ['Minor', 'Universal', 'Runes of Battle'],
          free: [
            { type: 'Power', value: 'Psyniscience' },
            { type: 'Power', value: 'Smite' },
          ],
        },
        {
          source: 'Psychic Revelations',
          disciplines: ['Minor', 'Universal', '*'],
          free: [
            { type: 'Power', value: 'Smite' },
            { type: 'Discipline', value: 'Minor' },
          ],
        },
      ],
    };
  },
  computed: {
    allThe() {
      this.psychicPowersRepository.forEach( w => {
        //console.log(`INSERT INTO wrath_glory.psychic_powers (name, cost, keywords, effect) VALUES ('${w.name}', ${w.cost}, '{${w.keywords.join(',')}}', '${w.effect}' );`);
        //console.log(`UPDATE wrath_glory.psychic_powers SET discipline = '${w.discipline}' WHERE name = '${w.name}';`);
      });
    },
    alerts() {
      const alerts = [];

      if (!this.isPsychic) {
        const alert = {
          type: 'warning',
          text: 'You need to either possess the Psychic Keyword or have at least learned one rank in the Psychic Mastery skill',
        };
        alerts.push(alert);
      }
      return alerts;
    },
    isPsychic() {
      const skills = this.$store.getters['characters/characterSkillsById'](this.characterId);
      const keywords = this.$store.getters['characters/characterKeywordsRawById'](this.characterId);
      const hasSkill = skills.psychicMastery > 0;
      const hasKeyword = keywords.includes('Psychic');
      return (hasSkill || hasKeyword);
    },
    settingTier(){
      return this.$store.getters['characters/characterSettingTierById'](this.characterId);
    },
    maximumMinorPowers() { return this.settingTier; },
    maximumDisciplinePowers() { return Math.max(1, this.settingTier - 1); },
    maximumPsychicPowers() { return this.settingTier + 3; },
    characterPowers() {
      return this.$store.getters['characters/characterPsychicPowersById'](this.characterId);
    },
    filteredPowers() {
      if (this.psychicPowersRepository === undefined) {
        return [];
      }

      let filteredPowers = this.psychicPowersRepository;

      if (this.selectedDisciplines.length > 0) {
        filteredPowers = filteredPowers.filter(p => this.selectedDisciplines.includes(p.discipline));
      }
      // filteredTalents = filteredTalents.filter( t => !this.characterTalents.includes(t.name) );

      return filteredPowers;
    },
    remainingBuildPoints() {
      return this.$store.getters['characters/characterRemainingBuildPointsById'](this.characterId);
    },
  },
  methods: {
    affordableColor(cost) {
      return (cost <= this.remainingBuildPoints) ? 'green' : 'grey';
    },
    addPower(power) {
      this.$store.commit('characters/addCharacterPsychicPower', { id: this.characterId, name: power.name, cost: power.cost });
    },
    removePower(power) {
      this.$store.commit('characters/removeCharacterPsychicPower', { id: this.characterId, name: power });
    },
    toggleDisciplineFilter(name) {
      if (this.selectedDisciplines.includes(name)) {
        this.selectedDisciplines = this.selectedDisciplines.filter(d => d != name);
      } else {
        this.selectedDisciplines.push(name);
      }
    },
  },
};
</script>

<style scoped lang="css">
</style>
