<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <v-container grid-list-md>


  </v-container>

</template>

<script lang="js">
  import axios from 'axios';

  export default {
  name: 'talent-selection',
  props: [],
  mounted() {
    console.info('Fetching from sheety.co ...');
    axios.get('https://api.sheety.co/060cab8e-6b58-421f-9322-8274946b12b7')
      .then((response) => {
        this.talentRepository = response.data; // all talents;
        console.log(`Fetched ${this.talentRepository.length} talents.`);
      });
  },
  data() {
    return {
      searchQuery: '',
      headers: [
        {
          text: 'Name', value: 'name', align: 'left', sortable: true,
        },
        {
          text: 'Cost', value: 'cost', align: 'center', sortable: true,
        },
        { text: 'Prerequisites', value: 'prerequisites', sortable: false },
        { text: 'Type', value: 'type', sortable: false },
        { text: 'Effect', value: 'effect', sortable: false },
        { text: 'Buy', align: 'center', sortable: false },
      ],
      talentRepository: undefined,
    };
  },
  methods: {
    affordableColor(cost) {
      return (cost <= this.remainingBuildPoints) ? 'green' : 'grey';
    },
    addTalent(talent) {
      this.$store.commit('addTalent', { name: talent.name, cost: talent.cost });
    },
    removeTalent(talent) {
      this.$store.commit('removeTalent', { name: talent });
    },
  },
  computed: {
    loaded() { return this.talentRepository !== undefined; },
    characterTalents() { return this.$store.getters.talents; },
    filteredTalentRepository() {
      if (this.talentRepository === undefined) {
        return [];
      }

      let filteredTalents = this.talentRepository.filter(t => (!t.prerequisitesKeywords
            || t.prerequisitesKeywords.split(',').some(r => this.characterKeywords.indexOf(r) >= 0)));

      filteredTalents = filteredTalents.filter(t => !this.characterTalents.includes(t.name));

      return filteredTalents;
    },
    remainingBuildPoints() { return this.$store.getters.remainingBuildPoints; },
    // TODO
    characterKeywords() {
      return ['Adepta Sororitas', 'Imperium'];
    },
  },
};
</script>

<style scoped lang="css">
  .talent-selection {

  }
</style>
