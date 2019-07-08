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
            :items="talentRepository"
            :search="searchQuery"
            :headers="headers"
            hide-actions
          >
            <template v-slot:no-data>
            </template>
            <template v-slot:items="props">
              <td class="caption">
                <span >{{props.item.name}}</span>
                <span class="hidden-md-and-up" style="display:block; color:grey;">{{props.item.effect}}</span>
              </td>
              <td class="caption text-xs-center" >{{props.item.cost}}</td>
              <td class="caption hidden-xs-and-down" v-html="prerequisitesToText(props.item).join(', ')"></td>
              <td class="caption hidden-sm-and-down">{{props.item.effect}}</td>
              <td class="text-xs-center">
                <v-btn
                  icon
                  @click="addTalent(props.item)"
                  :disabled="characterTalents.includes(props.item.name)"
                >
                  <v-icon :color="affordableColor(props.item.cost)">add_circle</v-icon>
                </v-btn>
              </td>
            </template>
            <template v-slot:no-results>
              <div class="text-xs-center">Your search for "{{ searchQuery }}" found no results.</div>
            </template>
          </v-data-table>

        </v-card>

      </v-flex>

    </v-layout>

  </v-layout>

</template>

<script lang="js">
  import TalentRepositoryMixin from '~/mixins/TalentRepositoryMixin.js';

  export default {
  name: 'Talents',
  layout: 'builder',
  props: [],
  mixins: [ TalentRepositoryMixin ],
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
          text: 'Prerequisites',
          value: 'prerequisites',
          sortable: false,
          //class: 'hidden-sm-and-down',
        },
        {
          text: 'Effect',
          value: 'effect',
          sortable: false,
          class: 'hidden-sm-and-down',
        },
        {
          text: 'Buy',
          align: 'center',
          sortable: false,
        },
      ],
    };
  },
  computed: {
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
    remainingBuildPoints() { return this.$store.getters['remainingBuildPoints']
      ; },
    //TODO
    characterKeywords() {
      return ['Adepta Sororitas', 'Imperium'];
    },
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
    prerequisitesToText(item) {
      const texts = [];

      if (item.prerequisites.length <= 0) {
        return ['None'];
      }

      item.prerequisites.forEach((p) => {
        let text = '';

        switch (p.type) {
          case 'keyword':
          case 'talent':
            if (p.condition === 'mustNot') {
              text = `<strong>must not</strong> possess the ${p.key.join(' or ')} ${p.type}`;
            } else {
              text = `${p.key.join(' or ')}`;
            }
            break;

          case 'attribute':
          case 'skill':
          case 'character':
            text = `${p.key} ${p.value}`;
            break;

          default:
            text = `${p.key}`;
        }
        texts.push(text);
      });

      return texts;
    },
  },
};
</script>

<style scoped lang="css">
</style>
