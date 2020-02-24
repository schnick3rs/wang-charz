<template>
  <div>
    <dod-default-breadcrumbs :items="breadcrumbItems" />

    <v-row justify="center">

      <v-col :cols="12">
        <v-btn color="success" @click.stop="createSpecies">Create new Species</v-btn>
      </v-col>

      <v-col :cols="12">

        <v-card v-if="speciesSets">
          <v-data-table
            :headers="headers"
            :items="speciesSets"
            :items-per-page="25"
            item-key="key"
            sort-by="name"
            show-expand
            hide-default-footer
          >

            <!-- Detail Page link -->
            <template v-slot:item.actions="{ item }">
              <v-btn x-small color="success" nuxt :to="`/forge/species/${textToKebab(item.key)}/edit`">
                Edit
              </v-btn>
            </template>

            <!-- Expand -->
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <div class="pa-4">
                  <dod-species-details
                    :item="item"
                    class="pa-2 pb-4"
                  />

                  <v-btn
                    color="error"
                    small
                    @click.stop="deleteSpecies(item.key)"
                  >
                    Delete
                  </v-btn>

                  <v-btn
                    color="success"
                    small
                    nuxt
                    :to="`/forge/species/${textToKebab(item.key)}/edit`"
                  >
                    Edit
                  </v-btn>
                </div>
              </td>
            </template>
          </v-data-table>
        </v-card>

      </v-col>

    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import DodDefaultBreadcrumbs from '~/components/DodDefaultBreadcrumbs';
import DodSpeciesDetails from '~/components/DodSpeciesDetails';
import SluggerMixin from '~/mixins/SluggerMixin';

export default {
  name: 'forge-species',
  components: {
    DodDefaultBreadcrumbs,
    DodSpeciesDetails,
  },
  mixins: [
    SluggerMixin,
  ],
  data() {
    return {
      breadcrumbItems: [
        { text: '', disabled: false, nuxt: true, exact: true, to: '/' },
        { text: 'Forge', disabled: false, nuxt: true, exact: true, to: '/forge' },
        { text: 'Species', disabled: false, nuxt: true, exact: true, to: '/forge/species' },
      ],
      headers: [
        { text: 'Name', align: 'start', value: 'name', class: '' },
        { text: 'Group', align: 'start', value: 'group', class: '' },
        { text: 'Hint', align: 'start', value: 'hint', class: '' },
        { text: 'Base Tier', align: 'center', value: 'baseTier', class: '' },
        { text: 'Cost', align: 'center', value: 'cost', class: '' },
        { text: '', align: 'end', value: 'actions', class: '', sortable: false },
      ],
    };
  },
  computed: {
    ...mapGetters({
      speciesKeys: 'species/speciesKeys',
      speciesSets: 'species/speciesSets',
    }),
  },
  methods: {
    createSpecies() {
      const hash = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
      const key = `custom-${hash}`;
      this.$store.commit('species/create', { key });
      this.$ga.event('New Species', 'click', key, 1);
    },
    deleteSpecies(key) {
      this.$store.commit('species/delete', { key });
    }
  },
};
</script>

<style scoped>

</style>
