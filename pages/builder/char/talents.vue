<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <v-layout justify-center row wrap>

    <v-layout justify-center row wrap>

      <v-flex xs12>

        <v-card>
          <v-card-text>
            <v-chip
              v-for="talent in characterTalents"
              :key="talent.key"
              close
              @input="removeTalent(talent)"
            >
              {{talent}}
            </v-chip>
          </v-card-text>
        </v-card>

      </v-flex>

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
            :items="talents"
            :search="searchQuery"
            :headers="headers"
          >
            <template v-slot:no-data>
            </template>
            <template v-slot:items="props">
              <td class="caption">{{props.item.name}}</td>
              <td class="caption text-xs-center" >{{props.item.cost}}</td>
              <td class="caption" v-html="prerequisitesToText(props.item).join(', ')"></td>
              <td class="caption">
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

  </v-layout>

</template>

<script lang="js">
  import axios from "axios";

  export default {
  name: 'Archetype',
  layout: 'builder',
  props: [],
  async asyncData({ params }) {
    const talentResponse = await axios.get(`https://api.sheety.co/060cab8e-6b58-421f-9322-8274946b12b7`);
    return {
      talentRepository: talentResponse.data || [],
    };
  },
  data() {
    return {
      searchQuery: '',
      headers: [
        { text: 'Name', value: 'name', align: 'left', sortable: true },
        { text: 'Cost', value: 'cost', align: 'center', sortable: true },
        { text: 'Prerequisites', value: 'prerequisites', sortable: false },
        { text: 'Effect', value: 'effect', sortable: false },
        { text: 'Buy', align: 'center', sortable: false },
      ],
      talents: [
        {
          name: 'Acts of Faith',
          cost: 40,
          prerequisites: [
            { condition: 'must', type: 'keyword', key: [ 'Adeptus Ministorum', 'Adepta Sororitas' ] },
            { condition: 'must', type: 'attribute', key: 'Willpower', value: '3+' },
            { condition: 'mustNot', type: 'keyword', key: ['chaos'] },
          ],
          effect: 'Grants Faith and bonuses with various options.',
          source: {
            book: 'core',
            version: 'v1',
            page: '171',
          },
          crunch: [
            { type: 'ability' }
          ],
        },
        {
          name: 'Marksman',
          cost: 20,
          prerequisites: [
            { condition: 'must', type: 'skill', key: 'Ballistic Skill', value: '3+' },
          ],
          effect: 'Aim may reduce Called Shot DN.',
          source: {
            book: 'core',
            version: 'v1',
            page: '177',
          },
          crunch: [
            {
              type: 'hint',
              hooks: [ 'Ballistic Skill' ],
              text: 'If a Marksman takes the Aim option, instead of taking its normal bonus, ' +
                'they may reduce the Difficulty Number increase for a Called Shot option by +1/2 ' +
                'Rank, to a minimum increase of 0.'
            }
          ],
        },
        {
          name: 'Sidestep',
          cost: 30,
          prerequisites: [
            { condition: 'must', type: 'attribute', key: 'Initiative', value: '3+' },
          ],
          effect: 'Sacrifice move to gain +Rank Defence and +Rank resilience vs. one attack.',
          source: {
            book: 'core',
            version: 'v1',
            page: '177',
          },
          crunch: [
            {
              type: 'hint',
              hooks: [ 'Defence', 'Resilience' ],
              text: 'A defending character may take a Sidestep any time they are attacked in ' +
                'melee and are aware of the attacker. This action must be taken after the ' +
                'attacker declares the attack, but before the dice are rolled. The defending ' +
                'character must sacrifice their next move action (either from this combat round ' +
                'or the next one) to gain +Rank Defence and +Rank Resilience for resolving this ' +
                'attack. Note that a Sidestep may only be taken once per round and only applies ' +
                'to a single attack.'
            }
          ],
        },
      ],
    }
  },
  computed: {
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
    },
    prerequisitesToText(item) {
      let texts = [];

      item.prerequisites.forEach( p => {
        let text = '';

        switch (p.type) {
          case 'keyword':
            if ( p.condition === 'mustNot' ) {
              text = `<strong>must not</strong> possess the ${p.key.join(' or ')} keyword`;
            } else {
              text = `${p.key.join(' or ')}`;
            }
            break;

          case 'attribute':
          case 'skill':
            text = `${p.key} ${p.value}`;
            break;

          default:
            text = `${p.key}`
        }
        texts.push(text);
      });

      return texts;
    }
  }
}
</script>

<style scoped lang="css">
</style>
