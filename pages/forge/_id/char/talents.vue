<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <div>

    <v-row justify="center">

      <v-col v-bind:cols="12">

        <v-card>
          <v-card-text>
            <v-chip
              v-for="talent in characterTalents"
              v-bind:key="talent.key"
              close
              @click:close="removeTalent(talent)"
              class="mr-2"
            >
              {{talent}}
            </v-chip>
          </v-card-text>
        </v-card>

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

            <v-switch
              v-model="filterOnlyPrerequisites"
              color="primary"
              label="Show only fulfilled prerequisites"
            >
            </v-switch>

          </v-card-title>

          <v-data-table
            v-bind:headers="headers"
            v-bind:items="filteredTalents"
            v-bind:search="searchQuery"          
            v-bind:items-per-page="-1"
            show-expand
            sort-by="name"
            item-key="name"
            hide-default-footer
          >
            <template v-slot:no-data>
            </template>

            <template v-slot:item.name="{ item }">
              <span >{{ item.name }}</span>
            </template>

            <template v-slot:item.cost="{ item }">
              <span>{{ item.cost }}</span>
            </template>
            
            <template v-slot:item.prerequisites="{ item }">
              <span v-html="prerequisitesToText(item).join(', ')"></span>
            </template>

            <template v-slot:item.effect="{ item }">
              <span>{{ item.effect }}</span>
            </template>

            <template v-slot:item.buy="{ item }">
                <v-btn
                  v-bind:disabled="characterTalents.includes(item.name)"
                  v-on:click="addTalent(item)"
                  v-bind:color="item.prerequisitesFulfilled ? affordableColor(item.cost) : 'orange'"
                  x-small
                >add</v-btn>
            </template>

            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <p class="pt-4">{{ item.description }}</p>
              </td>
            </template>

            <template v-slot:no-results>
              <span class="text-center">Your search for "{{ searchQuery }}" found no results.</span>
            </template>

          </v-data-table>

        </v-card>

      </v-col>

      <issue-list :items="issues" />

    </v-row>

  </div>

</template>

<script lang="js">
import { mapGetters } from 'vuex';
import StatRepositoryMixin from '~/mixins/StatRepositoryMixin';
import IssueList from '~/components/IssueList.vue';

export default {
  name: 'Talents',
  layout: 'forge',
  props: [],
  mixins: [ StatRepositoryMixin ],
  components: { IssueList },
  head() {
    return {
      title: 'Select Talents',
    }
  },
  async asyncData({ params, $axios, error }) {
    const response = await $axios.get(`/api/talents/`);
    return {
      talentRepository: response.data,
      characterId: params.id,
    };
  },
  data() {
    return {
      issues: [
        'Allow to select specific "Acts of Faith".',
        'Allow to pick a "Special Weapon", add it to the wargear and compute the cost accordingly.',
        'Allow to pick "Augments", add them to the wargear and compute the cost accordingly.',
      ],
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
        },
        {
          text: 'Effect',
          value: 'effect',
          sortable: false,
        },
        {
          text: 'Buy',
          value: 'buy',
          align: 'center',
          sortable: false,
        },
      ],
    };
  },
  computed: {
    ...mapGetters([
      'effectiveCharacterTier',
    ]),
    characterAttributesEnhanced() {
      return this.$store.getters['characters/characterAttributesEnhancedById'](this.characterId);
    },
    characterSkills() {
      return this.$store.getters['characters/characterSkillsById'](this.characterId);
    },
    characterTalents() {
      return this.$store.getters['characters/characterTalentsById'](this.characterId).map( t => t.name );
    },
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
                  const charAttributeValue = this.characterAttributesEnhanced[attribute.key];
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
                  const charSkillValue = this.characterSkills[skill.key];
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
    remainingBuildPoints() {
      return this.$store.getters['remainingBuildPoints'];
    },
    finalKeywords(){
      return this.$store.getters['characters/characterKeywordsFinalById'](this.$route.params.id);
    },
  },
  methods: {
    affordableColor(cost) {
      return (cost <= this.remainingBuildPoints) ? 'green' : 'grey';
    },
    addTalent(talent) {
      this.$store.commit('characters/addCharacterTalent', { id: this.characterId, name: talent.name, cost: talent.cost });
    },
    removeTalent(talent) {
      this.$store.commit('characters/removeCharacterTalent', { id: this.characterId, name: talent });
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
