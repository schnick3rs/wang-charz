<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <dod-default-breadcrumbs :items="breadcrumbItems" />

    <v-row justify="center">
      <!-- filter -->
      <v-col :cols="12">
        <v-card>
          <v-card-text>
            <v-row justify="center">
              <v-col :cols="12">
                <v-text-field
                  v-model="searchQuery"
                  filled
                  dense
                  clearable
                  label="Search"
                />
              </v-col>

              <v-col :cols="12">
                <v-chip-group
                  v-model="filters.group.model"
                  active-class="primary--text"
                  column
                >
                  <v-chip
                    v-for="filter in filterGroupOptions"
                    :key="filter"
                    :value="filter"
                    filter
                    small
                    label
                  >
                    {{ filter }}
                  </v-chip>
                </v-chip-group>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Table -->
      <v-col :cols="12">
        <v-expansion-panels multiple>
          <v-expansion-panel
            v-for="item in searchResult"
            :key="item.key"
          >
            <v-expansion-panel-header class="pa-4 pt-2 pb-2">
              <template v-slot:default="{ open }">
                <v-row no-gutters>
                  <v-col :cols="12">
                    <h3 class="subtitle-1">
                      {{ item.name }}
                    </h3>
                  </v-col>
                  <v-col :cols="12">
                    <span class="caption grey--text">{{ item.group }}</span>
                  </v-col>
                </v-row>
              </template>
            </v-expansion-panel-header>

            <v-expansion-panel-content>
              <p class="body-2">
                <em>{{ item.hint }}</em>
              </p>

              <div v-if="item.hint === undefined" class="body-2 mb-2" v-html="item.shortDescriptionHtml" />

              <p class="caption">
                <strong>Source:</strong> {{ item.source.book }}, pg. {{ item.source.page }}
              </p>
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
    const title = 'Combat Actions - Wrath & Glory Reference | Codex';
    const description = 'This Quick Reference for Wrath and Glory shows the various combat actions and options.';
    const image = 'https://www.doctors-of-doom.com/img/artwork_codex_book.jpg';

    return {
      title,
      meta: [
        { hid: 'description', name: 'description', content: description },
        { hid: 'og:title', name: 'og:title', content: title },
        { hid: 'og:description', name: 'og:description', content: description },
        { hid: 'og:image', name: 'og:image', content: image },
      ],
    };
  },
  data() {
    return {
      breadcrumbItems: [
        {
          text: '', disabled: false, nuxt: true, exact: true, to: '/',
        },
        {
          text: 'Codex', disabled: false, nuxt: true, exact: true, to: '/codex',
        },
        {
          text: 'Combat Actions', disabled: false, nuxt: true, exact: true, to: '/codex/combat-actions',
        },
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
        {
          text: 'Name', align: 'left', value: 'name', class: '',
        },
        {
          text: 'Group', align: 'left', value: 'group', class: '',
        },
        {
          text: 'Species', align: 'left', value: 'species', class: '',
        },
        {
          text: 'Tier', align: 'center', value: 'tier', class: '',
        },
        {
          text: 'Cost', align: 'center', value: 'cost', class: '',
        },
        {
          text: 'Source', align: 'left', value: 'source', class: '',
        },
      ],
      expand: false,
    };
  },
  computed: {
    activeRepository() {
      return [
        ...this.combatActionsRepository,
        ...this.combatOptionsRepository.map((item) => ({ group: 'Option', ...item })),
        ...this.combatEffectsRepository.map((item) => ({ group: 'Effect', ...item })),
      ].sort((a, b) => a.name.localeCompare(b.name));
    },
    searchResult() {
      if (this.activeRepository === undefined) {
        return [];
      }
      let filteredResults = this.activeRepository;

      if (this.searchQuery && this.searchQuery.length > 0) {
        filteredResults = filteredResults.filter((item) => item.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
      }

      const filter = this.filters.group;
      if (filter.model && filter.model.length > 0) {
        filteredResults = filteredResults.filter((item) => filter.model.includes(item.group));
      }

      return filteredResults;
    },
    filterGroupOptions() {
      const reduce = this.activeRepository.map((item) => item.group);
      const distinct = [...new Set(reduce)];
      return distinct.filter((d) => d !== null).sort();
    },
  },
  methods: {
  },
};
</script>

<style scoped lang="css">
</style>
