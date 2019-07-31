<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <div>
    <div class="elevation-4 mb-4 p-0">
      <ul class="v-breadcrumbs theme--light">
        <li class="v-breadcrumbs__item">
          <nuxt-link to="/" class="v-breadcrumbs__item"><img src="/favicon-16x16.png" /></nuxt-link>
        </li>
        <li class="v-breadcrumbs__divider">/</li>
        <li class="v-breadcrumbs__item">
          <nuxt-link to="/library" class="v-breadcrumbs__item">Library</nuxt-link>
        </li>
        <li class="v-breadcrumbs__divider">/</li>
        <li class="v-breadcrumbs__item">
          <nuxt-link to="/library/wargear" class="v-breadcrumbs__item">Wargear</nuxt-link>
        </li>
        <li class="v-breadcrumbs__divider">/</li>
        <li class="v-breadcrumbs__item">
          <nuxt-link to="/library/wargear/weapons" class="v-breadcrumbs__item--disabled v-breadcrumbs__item">Weapons</nuxt-link>
        </li>
      </ul>
    </div>

  <v-layout justify-center row wrap>

    <v-flex xs12>
      <v-card>
        <v-card-text>
          <v-layout justify-center row wrap>
            <v-flex xs12 sm6>
              <v-text-field
                v-model="searchQuery"
                box
                dense
                clearable
                label="Search"></v-text-field>
            </v-flex>

          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>

    <v-flex xs12>
      <v-card>
        <v-data-table
          v-bind:headers="headers"
          v-bind:items="weapons"
          v-bind:pagination.sync="pagination"
          v-bind:expand="expand"
          v-bind:search="searchQuery"
          disable-initial-sort
          item-key="title"
          hide-actions
        >
          <template v-slot:items="props">
            <tr>
              <td>{{ props.item.name }}</td>
              <td>{{ props.item.subtype }}</td>
              <td>
                <div v-if="props.item.meta && props.item.meta.length > 0 && props.item.meta[0].damage">
                  <span v-if="props.item.type==='Melee Weapon'">{{ props.item.meta[0].damage.static }}*</span>
                  <span v-else>{{ props.item.meta[0].damage.static }}</span>
                  <span> + </span>
                  <span>{{ props.item.meta[0].damage.ed }} ED</span>
                </div>
              </td>
              <td>
                <span v-if="props.item.meta && props.item.meta.length > 0">{{ props.item.meta[0].ap }}</span>
              </td>
              <td>
                <span v-if="props.item.meta && props.item.meta.length > 0">{{ props.item.meta[0].salvo }}</span>
              </td>
              <td>
                <span v-if="props.item.meta && props.item.meta.length > 0">{{ props.item.meta[0].range }} m</span>
              </td>
              <td>
                <span v-if="props.item.meta && props.item.meta.length > 0 && props.item.meta[0].traits && props.item.meta[0].traits.length >0">{{ props.item.meta[0].traits.join(', ') }}</span>
              </td>
              <td>{{ props.item.keywords.join(', ') }}</td>
            </tr>
          </template>

        </v-data-table>

        <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :length="pages" />
        </div>
      </v-card>
    </v-flex>

    <v-flex xs12>

      <v-card>
        <v-card-text>
        </v-card-text>
      </v-card>

    </v-flex>
  </v-layout>
  </div>


</template>

<script>
export default {
  components: {},
  head() {
    return {
      title: 'Weapons - Wrath & Glory Wargear Reference | Library',
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
  async asyncData({ app }) {
    const response = await app.$axios.get(`/api/wargear/`);
    return {
      wargearRepository: response.data,
    };
  },
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
        { text: 'Name', align: 'left', value: 'name', class: '' },
        { text: 'Subtype', align: 'left', value: 'subtype', class: '' },
        { text: 'Damage', align: 'left', value: 'damage', class: '' },
        { text: 'AP', align: 'left', value: 'ap', class: '' },
        { text: 'Salvo', align: 'left', value: 'salvo', class: '' },
        { text: 'Range', align: 'left', value: 'range', class: '' },
        { text: 'Traits', align: 'left', value: 'traits', class: '' },
        { text: 'Keywords', align: 'left', value: 'keywords', class: '' },
      ],
      expand: false,
    };
  },
  computed: {
    weapons() {
      return this.wargearRepository.filter( gear => ['Ranged Weapon', 'Melee Weapon'].includes(gear.type));
    },
    searchResults() {
      let filteredResults = this.vaultItems;

      if (this.searchQuery) {
        // filteredResults = filteredResults.filter(h => (h.title.toLowerCase().indexOf(this.searchQuery.toLowerCase()) >= 0))
      }

      if (this.contentFilter.length > 0) {
        filteredResults = filteredResults.filter(h => [...h.topics, ...h.keywords]
          .some(c => this.contentFilter.includes(c)));
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
  methods: {
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
