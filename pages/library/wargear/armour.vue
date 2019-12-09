<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <dod-default-breadcrumbs :items="breadcrumbItems" />

    <v-row justify="center">
      <v-col :cols="11">
        <v-card>
          <v-card-text>
            <v-row justify="center">
              <v-col :cols="12" :xs="6">
                <v-text-field
                  v-model="searchQuery"
                  box
                  dense
                  clearable
                  label="Search"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col :cols="11">
        <v-card>
          <v-data-table
            :headers="headers"
            :items="armour"
            :pagination.sync="pagination"
            :expand="expand"
            :search="searchQuery"
            disable-initial-sort
            item-key="title"
            hide-actions
          >
            <template v-slot:item="{ item }">
              <tr>
                <td>{{ item.name }}</td>
                <td>{{ item.subtype }}</td>
                <td class="text-lg-center">
                  <span v-if="item.meta && item.meta.length > 0">{{ item.meta[0].armourRating }}</span>
                </td>
                <td>{{ toTraitString(item) }}</td>
                <td>{{ item.value }} {{ item.rarity }}</td>
                <td>{{ item.keywords.join(', ') }}</td>
              </tr>
            </template>
          </v-data-table>

          <div class="text-center pt-2">
            <v-pagination v-model="pagination.page" :length="pages" />
          </div>
        </v-card>
      </v-col>

      <v-col :cols="12">
        <v-card>
          <v-card-text>
            <h1>Armour, protection and deflection.</h1>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import DodDefaultBreadcrumbs from '~/components/DodDefaultBreadcrumbs';

export default {
  components: { DodDefaultBreadcrumbs },
  head() {
    return {
      title: 'Armour - Wrath & Glory Wargear Reference | Library',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '',
        },
      ],
    };
  },
  layout: 'library',
  data() {
    return {
      searchQuery: '',
      settingFilter: [],
      contentFilter: [],
      pagination: {
        sortBy: 'title',
        rowsPerPage: -1,
      },
      headers: [
        {
          text: 'Name', align: 'left', value: 'name', class: '',
        },
        {
          text: 'Subtype', align: 'left', value: 'subtype', class: '',
        },
        {
          text: 'Armour Rating', align: 'center', value: 'damage', class: '',
        },
        {
          text: 'Traits', align: 'left', value: 'traits', class: '',
        },
        {
          text: 'Value', align: 'left', value: 'value', class: '',
        },
        {
          text: 'Keywords', align: 'left', value: 'keywords', class: '',
        },
      ],
      expand: false,
    };
  },
  computed: {
    armour() {
      return this.wargearRepository.filter((gear) => ['Armour'].includes(gear.type));
    },
    breadcrumbItems() {
      return [
        {
          text: '', disabled: false, nuxt: true, exact: true, to: '/',
        },
        {
          text: 'Library', disabled: false, nuxt: true, exact: true, to: '/library',
        },
        {
          text: 'Wargear', disabled: false, nuxt: true, exact: true, to: '/library/wargear',
        },
        {
          text: 'Armour', disabled: false, nuxt: true, exact: true, to: '/library/wargear/armour',
        },
      ];
    },
    searchResults() {
      let filteredResults = this.vaultItems;

      if (this.searchQuery) {
        // filteredResults = filteredResults.filter(h => (h.title.toLowerCase().indexOf(this.searchQuery.toLowerCase()) >= 0))
      }

      if (this.contentFilter.length > 0) {
        filteredResults = filteredResults.filter((h) => [...h.topics, ...h.keywords]
          .some((c) => this.contentFilter.includes(c)));
      }

      return filteredResults;
    },
    pages() {
      if (this.pagination.rowsPerPage == null
        || this.pagination.totalItems == null
      ) return 0;

      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage);
    },
  },
  async asyncData({ app }) {
    const response = await app.$axios.get('/api/wargear/');
    return {
      wargearRepository: response.data,
    };
  },
  methods: {
    toTraitString(item) {
      const armourMeta = item.meta.filter((i) => i.type === 'armour')[0];
      if (armourMeta) {
        if (armourMeta.traits && armourMeta.traits.length > 0) {
          return armourMeta.traits.join(', ');
        }
      }
      return '-';
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    },
  },
};
</script>

<style scoped lang="css">
</style>
