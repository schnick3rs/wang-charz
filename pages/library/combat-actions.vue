<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <div>

    <dod-default-breadcrumbs v-bind:items="breadcrumbItems" />

    <v-row justify="center">

      <!-- filter -->
      <v-col v-bind:cols="12">

        <v-card>

          <v-card-text>

            <v-row justify="center" row wrap>

              <v-col v-bind:cols="12" >

                <v-text-field
                  v-model="searchQuery"
                  filled
                  dense
                  clearable
                  label="Search"></v-text-field>
              </v-col>

              <v-col v-bind:cols="12">
                <v-chip-group
                  v-model="filters.group.model"
                  active-class="primary--text"
                  column
                >

                  <v-chip
                    v-for="filter in filterGroupOptions"
                    v-bind:key="filter"
                    v-bind:value="filter"
                    filter
                    small
                    label
                  >
                    {{filter}}
                  </v-chip>

                </v-chip-group>
              </v-col>

            </v-row>

          </v-card-text>

        </v-card>

      </v-col>

      <!-- Table -->
      <v-col v-bind:cols="12">

        <v-expansion-panels multiple>

          <v-expansion-panel
            v-for="item in searchResult"
            v-bind:key="item.key"
          >

            <v-expansion-panel-header>

              <template v-slot:default="{ open }">

                <v-row no-gutters>
                  <v-col v-bind:cols="12">
                    <h3 class="subtitle-1">{{ item.name }}</h3>
                  </v-col>
                  <v-col v-bind:cols="12">
                    <span v-if="!open" class="caption grey--text">{{ item.group }}</span>
                  </v-col>
                </v-row>

              </template>

            </v-expansion-panel-header>

            <v-expansion-panel-content>

              <p v-html="item.shortDescriptionHtml" class="body-2"></p>

            </v-expansion-panel-content>

          </v-expansion-panel>

        </v-expansion-panels>

      </v-col>

    </v-row>

  </div>

</template>

<script>
import DodDefaultBreadcrumbs from '~/components/DodDefaultBreadcrumbs';
import RulesCombatActionsMixin from '~/mixins/RulesCombatActionsMixin';

export default {
  components: {
    DodDefaultBreadcrumbs,
  },
  mixins: [
    RulesCombatActionsMixin,
  ],
  head() {
    return {
      title: 'Combat Actions - Wrath & Glory Reference | Library',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '',
        },
      ],
    };
  },
  data() {
    return {
      breadcrumbItems: [
        { text: '', disabled: false, nuxt: true, exact: true, to: '/' },
        { text: 'Library', disabled: false, nuxt: true, exact: true, to: '/library' },
        { text: 'Combat Actions', disabled: false, nuxt: true, exact: true, to: '/library/combat-actions' },
      ],
      searchQuery: '',
      selectedTypeFilters: [],
      filters: {
        group: { model: [], label: 'Filter by Action-Group' },
      },
      pagination: {
        page: 1,
        pageCount: 0,
        sortBy: 'title',
        rowsPerPage: 25,
      },
      headers: [
        { text: 'Name', align: 'left', value: 'name', class: '' },
        { text: 'Group', align: 'left', value: 'group', class: '' },
        { text: 'Species', align: 'left', value: 'species', class: '' },
        { text: 'Tier', align: 'center', value: 'tier', class: '' },
        { text: 'Cost', align: 'center', value: 'cost', class: '' },
        { text: 'Source', align: 'left', value: 'source', class: '' },
      ],
      expand: false,
    };
  },
  computed: {
    activeRepository() {
      return this.combatActionsRepository;
    },
    searchResult() {
      if ( this.activeRepository === undefined ) {
        return [];
      }
      let filteredResults = this.activeRepository;

      let filter = this.filters.group;
      if (filter.model && filter.model.length > 0) {
        filteredResults = filteredResults.filter( item => filter.model.includes(item.group) );
      }

      return filteredResults;
    },
    filterGroupOptions() {
      const reduce = this.activeRepository.map( item => item.group );
      const distinct = [ ...new Set(reduce) ];
      return distinct.filter( d => d !== null ).sort();
    },
  },
  methods: {
  },
};
</script>

<style scoped lang="css">
</style>

