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

            <v-switch
              v-model="filterOnlyPrerequisites"
              color="primary"
              label="Show only fulfilled prerequisites"
            >
            </v-switch>

          </v-card-title>

          <v-data-table
            :items="filteredTalents"
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
              <td class="caption hidden-xs-and-down">
                <span v-html="prerequisitesToText(props.item).join(', ')"></span>
              </td>
              <td class="caption hidden-sm-and-down">{{props.item.effect}}</td>
              <td class="text-xs-center">
                <v-btn
                  v-bind:disabled="characterTalents.includes(props.item.name)"
                  v-on:click="addTalent(props.item)"
                  icon
                >
                  <v-icon
                    v-if="!props.item.prerequisitesFulfilled"
                    color="orange"
                  >info</v-icon>
                  <v-icon
                    v-else
                    v-bind:color="affordableColor(props.item.cost)"
                  >add_circle</v-icon>
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
  import { mapGetters } from 'vuex';
  import StatRepositoryMixin from '~/mixins/StatRepositoryMixin.js';

  export default {
  name: 'Talents',
  layout: 'builder',
  props: [],
  mixins: [ StatRepositoryMixin ],
  async asyncData({ params, $axios, error }) {
    const response = await $axios.get(`/api/talents/`);
    return {
      talentRepository: response.data,
    };
  },
  data() {
    return {
      searchQuery: '',
      filterOnlyPrerequisites: false,
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
    ...mapGetters([
      'effectiveCharacterTier',
      'finalKeywords',
      'attributesEnhanced',
      'skills',
    ]),
    characterTalents() { return this.$store.getters.talents; },
    filteredTalents() {
      if (this.talentRepository === undefined) {
        return [];
      }

      let filteredTalents = this.talentRepository;

      // exclude those already picked
      filteredTalents = filteredTalents.filter(t => !this.characterTalents.includes(t.name));

      filteredTalents = filteredTalents.map( talent => {
        let fulfilled = true;

        // has prerequisites
        if ( talent.prerequisites.length > 0) {
          talent.prerequisites.forEach( prerequisite => {

            switch (prerequisite.type) {

              // condition: 'must', type: 'keyword', key: ['Adeptus Ministorum', 'Adepta Sororitas'],
              case 'keyword':
                const found = prerequisite.key.some( prereqKeyword => this.finalKeywords.includes(prereqKeyword) );
                if (
                  ( prerequisite.condition === 'must' && !found ) ||
                  ( prerequisite.condition === 'mustNot' && found )
                ){
                  fulfilled = false;
                }
                break;

              // condition: 'must', type: 'attribute', key: 'Willpower', value: '3+',
              case 'attribute':
                const attribute = this.attributeRepository.find(a => a.name == prerequisite.key);
                if (attribute) {
                  const charAttributeValue = this.attributesEnhanced[attribute.key];
                  const prereqAttributeValue = prerequisite.value.split('+')[0];
                  if ( charAttributeValue < prereqAttributeValue ) {
                    fulfilled = false;
                  }
                } else {
                  console.warn(`No attribute found for ${prerequisite.key}.`);
                }
                break;

              // condition: 'must', type: 'skill', key: 'Ballistic Skill', value: '4+',
              case 'skill':
                const skill = this.skillRepository.find(a => a.name == prerequisite.key);
                if (skill){
                  const charSkillValue = this.skills[skill.key];
                  const prereqSkillValue = prerequisite.value.split('+')[0];
                  if ( charSkillValue < prereqSkillValue ) {
                    fulfilled = false;
                  }
                } else {
                  console.warn(`No skill found for ${prerequisite.key}.`);
                }
                break;

              // condition: 'must', type: 'character', key: 'Tier', value: '2+',
              case 'character':
                if (prerequisite.key === 'Tier'){
                  const prereqTierValue = prerequisite.value.split('+')[0];
                  if (this.effectiveCharacterTier <= prereqTierValue) {
                    fulfilled = false;
                  }
                }
                break;
            }
          });
        }
        talent['prerequisitesFulfilled'] = fulfilled;
        return talent;
      });

      // only show those whose prerequisites are met
      if ( this.filterOnlyPrerequisites ){
        filteredTalents = filteredTalents.filter( talent => talent.prerequisitesFulfilled === true)
      }

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
