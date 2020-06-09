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
        />

        <v-chip
          v-for="filter in typeFilters"
          v-if="typeFilters.length > 1"
          :key="filter.key"
          :color="selectedTypeFilters.includes(filter.name) ? 'primary' : ''"
          small
          label
          class="mr-2 mb-2"
          @click="toggleTypeFilter(filter.name)"
        >
          {{ filter.name }}
        </v-chip>
      </v-card-text>
    </v-card>

    <v-card>
      <v-data-table
        :headers="headers"
        :items="searchResult"
        item-key="key"
        :search="searchQuery"
        :page.sync="pagination.page"
        hide-default-footer
        show-expand
        @page-count="pagination.pageCount = $event"
      >
        <template v-slot:item.name="{ item }">
          {{ item.name }} <br>
          <span class="grey--text caption">{{ wargearSubtitle(item) }}</span>
        </template>

        <template v-slot:item.value="{ item }">
          {{ item.value }} {{ item.rarity }}
        </template>

        <template v-slot:item.action-add="{ item }">
          <v-btn color="success" x-small @click="$emit('select', item)">
            add
          </v-btn>
        </template>

        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <div class="pa-2 pt-4 pb-4">
              <span>{{ item.hint }}</span>
              <p v-if="item.snippet">{{ item.snippet }}</p>
              <div v-else-if="item.description" v-html="item.description"></div>

              <dod-simple-weapon-stats
                v-if="item.meta !== undefined && item.meta.length > 0 && ['ranged-weapon','melee-weapon'].includes(item.meta[0].type)"
                :name="item.name"
                :stats="item.meta[0]"
                :show-traits="false"
                class="mb-2"
              />
              <dod-simple-armour-stats
                v-if="item.meta !== undefined && item.meta.length > 0 && ['armour'].includes(item.meta[0].type)"
                :name="item.name"
                :stats="item.meta[0]"
                :show-traits="false"
                class="mb-2"
              />
            </div>
          </td>
        </template>
      </v-data-table>

      <div class="text-center pt-2">
        <v-pagination v-model="pagination.page" :length="pagination.pageCount" />
      </div>
    </v-card>
  </div>
</template>

<script>
import DodSimpleWeaponStats from '~/components/DodSimpleWeaponStats';
import DodSimpleArmourStats from '~/components/DodSimpleArmourStats';

export default {
  name: 'WargearSearch',
  components: {
    DodSimpleArmourStats,
    DodSimpleWeaponStats,
  },
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
        { text: 'Value', align: 'left', value: 'value', class: '' },
        { text: '', align: 'right', value: 'action-add', class: '' },
      ],
    };
  },
  computed: {
    typeFilters() {
      if (this.repository === undefined) {
        return [];
      }
      const reduceToType = this.repository.map((item) => item.type);
      const distinctTypes = [...new Set(reduceToType)];
      const types = distinctTypes.map((t) => ({ name: t }));
      return types;
    },
    searchResult() {
      if (this.repository === undefined) {
        return [];
      }
      let searchResult = this.repository;

      if (this.selectedTypeFilters.length > 0) {
        searchResult = searchResult.filter((item) => this.selectedTypeFilters.includes(item.type));
      }

      return searchResult;
    },
  },
  methods: {
    toggleTypeFilter(name) {
      if (this.selectedTypeFilters.includes(name)) {
        this.selectedTypeFilters = this.selectedTypeFilters.filter((d) => d != name);
      } else {
        this.selectedTypeFilters.push(name);
      }
    },
    wargearSubtitle(item) {
      // const item = this.wargearRepository.find(i => i.name === gear);
      if (item) {
        const tags = [item.type];
        if (item.subtype) {
          tags.push(item.subtype);
        }
        return tags.filter((t) => t !== undefined).join(' • ');
      }
      return '';
    },
  },
};
</script>

<style scoped>

</style>
