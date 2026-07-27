<template>
  <div>
    <dod-default-breadcrumbs :items="breadcrumbItems" />

    <v-row justify="center">

      <v-col :cols="12">
        <v-btn color="success" @click.stop="createSpecies">Create campaign</v-btn>
      </v-col>

      <v-col :cols="12">

        <v-card v-if="speciesSets">

        </v-card>

      </v-col>

    </v-row>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import DodDefaultBreadcrumbs from '~/components/DodDefaultBreadcrumbs';
import SluggerMixin from '~/mixins/SluggerMixin';

export default {
  name: 'ForgeSpecies',
  components: {
    DodDefaultBreadcrumbs,
  },
  mixins: [
    SluggerMixin,
  ],
  data() {
    return {
      breadcrumbItems: [
        { text: '', disabled: false, nuxt: true, exact: true, to: '/' },
        { text: 'Forge', disabled: false, nuxt: true, exact: true, to: '/forge' },
        { text: 'Campaigns', disabled: false, nuxt: true, exact: true, to: '/forge/campaigns' },
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
      campaignIds: 'campaigns/campaignIds',
      campaigns: "campaigns/campaignSets",
    }),
  },
  methods: {
    createSpecies() {
      this.$store.commit('campaigns/create');
    },
  },
};
</script>

<style scoped>

</style>
