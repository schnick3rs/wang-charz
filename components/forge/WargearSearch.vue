<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <div>

    <v-card class="mb-4">

      <v-card-text>
        <v-text-field
          v-model="searchQuery"
          filled
          dense
          clearable
          prepend-inner-icon="search"
          clearable
          label="Search"
        ></v-text-field>

        <v-chip
          v-if="typeFilters.length > 1"
          v-for="filter in typeFilters"
          v-bind:key="filter.key"
          v-bind:color="selectedTypeFilters.includes(filter.name) ? 'primary' : ''"
          v-on:click="toggleTypeFilter(filter.name)"
          small
          label
          class="mr-2 mb-2"
        >
          {{filter.name}}
        </v-chip>
      </v-card-text>
    </v-card>

    <v-card>
      <v-data-table
        v-bind:headers="headers"
        v-bind:items="searchResult"
        item-key="name"
        v-bind:search="searchQuery"
        v-bind:page.sync="pagination.page"
        v-on:page-count="pagination.pageCount = $event"
        hide-default-footer
        show-expand
      >
        <template v-slot:item.name="{ item }">
          {{ item.name }} <br>
          <span class="grey--text caption">{{ wargearSubtitle(item) }}</span>
        </template>

        <template v-slot:item.action-add="{ item }">
          <v-btn color="success" x-small v-on:click="$emit('select', item)">add</v-btn>
        </template>

        <template v-slot:expanded-item="{ headers, item }">
          <td v-bind:colspan="headers.length">
            <p class="mt-2">{{item.hint}}</p>
          </td>
        </template>

      </v-data-table>

      <div class="text-xs-center pt-2">
        <v-pagination v-model="pagination.page" v-bind:length="pagination.pageCount" />
      </div>
    </v-card>

  </div>

</template>

<script>
  export default {
    name: "wargear-search",
    props: {
      repository: Array,
    },
    data() {
      return {
        searchQuery: '',
        selectedTypeFilters: [],
        pagination: {
          page: 1,
          pageCount: 0,
          sortBy: 'title',
          rowsPerPage: 25,
        },
        headers: [
          { text: 'Name', align: 'left', value: 'name', class: '' },
          { text: '', align: 'right', value: 'action-add', class: '' },
        ],
      };
    },
    computed: {
      typeFilters() {
        if ( this.repository === undefined ) {
          return [];
        }
        const reduceToType = this.repository.map( item => item.type );
        const distinctTypes = [ ...new Set(reduceToType) ];
        const types = distinctTypes.map( t => { return { name: t } });
        return types;
      },
      searchResult() {
        if ( this.repository === undefined ) {
          return [];
        }
        let searchResult = this.repository;

        if (this.selectedTypeFilters.length > 0) {
          searchResult = searchResult.filter( item => this.selectedTypeFilters.includes(item.type));
        }

        return searchResult;
      },
    },
    methods: {
      toggleTypeFilter(name) {
        if (this.selectedTypeFilters.includes(name)) {
          this.selectedTypeFilters = this.selectedTypeFilters.filter(d => d != name);
        } else {
          this.selectedTypeFilters.push(name);
        }
      },
      wargearSubtitle(item) {
        //const item = this.wargearRepository.find(i => i.name === gear);
        if (item) {
          let tags = [item.type];
          if ( item.subtype ) {
            tags.push(item.subtype);
          }
          return tags.filter(t=> t!== undefined).join(' • ');
        }
        return '';
      },
    },
  }
</script>

<style scoped>

</style>
