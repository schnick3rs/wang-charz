<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <div>
    <div class="elevation-4 mb-4 p-0">
      <ul class="v-breadcrumbs theme--light">
        <li class="v-breadcrumbs__item">
          <nuxt-link to="/" class="v-breadcrumbs__item"><img src="/favicon-16x16.png" /></nuxt-link>
        </li>
        <li class="v-breadcrumbs__divider">/</li>
        <li class="v-breadcrumbs__item">
          <nuxt-link to="/vault" class="v-breadcrumbs__item--disabled v-breadcrumbs__item">Library</nuxt-link>
        </li>
      </ul>
    </div>

  <v-row justify-center row wrap>

    <v-col v-bind:cols="12">

      <v-card>

        <v-card-text>

          <v-row justify-center row wrap>

            <v-col v-bind:cols="12" >

              <v-text-field
                v-model="searchQuery"
                box
                dense
                clearable
                label="Search"></v-text-field>
            </v-col>

            <v-col v-bind:cols="12">

              <v-chip
                v-for="filter in typeFilters"
                v-bind:key="filter.key"
                v-bind:color="selectedTypeFilters.includes(filter.name) ? 'primary' : ''"
                v-on:click="toggleTypeFilter(filter.name)"
                small
                label
              >
                {{filter.name}}
              </v-chip>
            </v-col>

          </v-row>

        </v-card-text>

      </v-card>

    </v-col>

    <v-col v-bind:cols="12">

      <v-card>
        <v-data-table
          v-bind:headers="headers"
          v-bind:items="searchResult"
          v-bind:pagination.sync="pagination"
          v-bind:expand="expand"
          v-bind:search="searchQuery"
          item-key="name"
          disable-initial-sort
        >
          <template v-slot:items="props">
            <tr v-on:click="toggle(props)">
              <td>
                <p class="mb-0 body-1">{{ item.name }}</p>
                <p class="mb-0 grey--text">{{ toTypeString(item) }}</p>
              </td>
              <td class="text-xs-right hidden-xs-only">{{ item.value }}</td>
              <td class="hidden-xs-only">{{ item.rarity }}</td>
              <td class="hidden-sm-and-down">{{ item.keywords.join(', ') }}</td>
              <td>
                <v-icon v-if="props.expanded">expand_more</v-icon>
                <v-icon v-else>chevron_right</v-icon>
              </td>
            </tr>
          </template>

          <template v-slot:expand="props">
            <v-card>
              <v-card-text>
                <p>{{item.hint}}</p>

                <div v-if="item.meta && item.meta.find(i=>['ranged-weapon','melee-weapon'].includes(i.type))">

                  <v-data-table
                    v-bind:headers="weaponHeaders"
                    v-bind:items="item.meta.filter(i=>['ranged-weapon','melee-weapon'].includes(i.type))"
                    disable-initial-sort
                    hide-actions
                  >
                    <template v-slot:items="meta">
                        <td class="text-xs-left">{{ item.name }}</td>
                        <td class="text-center">
                          <div v-if="meta.item.damage">
                            <span>{{ meta.item.damage.static }}</span>
                            <span v-if="meta.item.type==='melee-weapon'">*</span>
                            <span> + </span>
                            <span>{{ meta.item.damage.ed }} ED</span>
                          </div>
                        </td>
                        <td class="text-center">
                          <span>{{ meta.item.ap }}</span>
                        </td>
                        <td class="text-center">
                          <span>{{ meta.item.salvo < 0 ? '-' : meta.item.salvo }}</span>
                        </td>
                        <td class="text-center">
                          <span v-if="meta.item.range > 1">{{ meta.item.range }} m</span>
                          <span v-if="meta.item.range === 1">melee</span>
                        </td>
                        <td class="text-xs-left">
                          <span v-if="meta.item.traits && meta.item.traits.length >0">{{ meta.item.traits.join(', ') }}</span>
                        </td>
                    </template>
                  </v-data-table>

                </div>
              </v-card-text>
            </v-card>
          </template>

        </v-data-table>

        <div class="text-center pt-2">
          <v-pagination v-model="pagination.page" :length="pages" />
        </div>
      </v-card>
    </v-col>

    <v-col v-bind:cols="12">

      <v-card>
        <v-card-text>
          <h1>Search the Library for available wargear</h1>
          <p>
            This is a reference table for the wargear used in the Wrath and Glory Role Playing Game.
           </p>
        </v-card-text>
      </v-card>

    </v-col>
  </v-row>
  </div>


</template>

<script>
export default {
  components: {},
  head() {
    return {
      title: 'Rules Reference Overview - Wrath & Glory Reference | Library',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'The Doctors of Doom Library contains holds vast information about the wargear ' +
            'used by friends and foes. Enter the library and search for weapons, armour and tools.',
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
      selectedTypeFilters: [],
      pagination: {
        sortBy: 'title',
        rowsPerPage: 25,
      },
      headers: [
        { text: 'Name', align: 'left', value: 'name', class: '' },
        { text: 'Value', align: 'right', value: 'value', class: 'hidden-xs-only' },
        { text: 'Rarity', align: 'left', value: 'rarity', class: 'hidden-xs-only' },
        { text: 'Keywords', align: 'left', value: 'keywords', class: 'hidden-sm-and-down' },
        { text: '', align: 'left', value: 'expand', class: '', sortable: false },
      ],
      weaponHeaders: [
        { text: 'Name', align: 'left', value: 'name', class: '', sortable: false },
        { text: 'Damage', align: 'center', value: 'damage', class: '', sortable: false },
        { text: 'AP', align: 'center', value: 'ap', class: '', sortable: false },
        { text: 'Salvo', align: 'center', value: 'salvo', class: '', sortable: false },
        { text: 'Range', align: 'center', value: 'range', class: '', sortable: false },
        { text: 'Traits', align: 'left', value: 'traits', class: '', sortable: false },
      ],
      expand: false,
    };
  },
  computed: {
    searchResult() {
      if ( this.wargearRepository === undefined ) {
        return [];
      }
      let searchResult = this.wargearRepository;

      console.log(this.selectedTypeFilters);
      if (this.selectedTypeFilters.length > 0) {
        searchResult = searchResult.filter( item => this.selectedTypeFilters.includes(item.type));
      }

      return searchResult;
    },
    typeFilters() {
      const reduceToType = this.wargearRepository.map( item => item.type );
      const distinctTypes = [ ...new Set(reduceToType) ];
      const types = distinctTypes.map( t => { return { name: t } });
      return types;
    },
    breadcrumbItems() {
      return [
        {
          text: 'D', disabled: false, nuxt: true, exact: true, to: '/',
        },
        {
          text: 'Vault', disabled: false, nuxt: true, exact: true, to: '/vault',
        },
      ];
    },
    pages() {
      if (this.pagination.rowsPerPage == null
        || this.pagination.totalItems == null
      ) return 0;

      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage);
    },
  },
  methods: {
    toTypeString(item) {
      let types = [ item.type ];
      if ( item.subtype ) {
        types.push(item.subtype)
      }
      return types.join(' • ');
    },
    toggleFilterFactionSelection(name) {
      if (this.selectedTypeFilters.includes(name)) {
        this.selectedTypeFilters = this.selectedTypeFilters.filter(d => d != name);
      } else {
        this.selectedTypeFilters.push(name);
      }
    },
    toggle(props) {
      props.expanded = !props.expanded;
    },
  },
};
</script>

<style scoped lang="css">
</style>
                                                                                                                                                                                                                                                                                                                                                                                           
