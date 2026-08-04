<template>
  <div>
    <dod-default-breadcrumbs :items="breadcrumbItems" />

    <v-row>

      <v-col :cols="12">
        <v-btn :disabled="!userId" color="success" @click.stop="createCampaign">Create campaign</v-btn>
        <v-btn :disabled="!!userId" color="success" @click.stop="createUserIdentity">Create User Identity</v-btn>
      </v-col>

      <v-col
          v-for="campaign in campaigns"
          :key="campaign.id"
          :cols="12"
          :sm="12"
          :md="6"
          :lg="4"
          :xl="4"
      >
        <campaign-preview-card :campaign="campaign"></campaign-preview-card>

      </v-col>

    </v-row>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import DodDefaultBreadcrumbs from '~/components/DodDefaultBreadcrumbs';
import SluggerMixin from '~/mixins/SluggerMixin';

import { v4 } from 'uuid'
import CampaignPreviewCard from "~/components/forge/CampaignPreviewCard.vue";

function randomId(length = 8) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789-';
  const bytes = crypto.getRandomValues(new Uint8Array(length));

  return Array.from(bytes, b => alphabet[b % alphabet.length]).join('');
}

export default {
  name: 'ForgeCampaign',
  components: {
    CampaignPreviewCard,
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
        { text: 'Campaigns', disabled: false, nuxt: true, exact: true, to: '/forge/my-campaigns' },
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
      userId: 'user/getUuid',
      campaignIds: 'campaigns/campaignIds',
      campaigns: "campaigns/campaignSets",
    }),
  },
  methods: {
    async createCampaign() {
      const id = randomId(12);
      const name = 'Some name';
      const tier = 2;
      this.$store.commit('campaigns/create', { id, name, tier });
    },
    async createUserIdentity() {
      this.$store.commit('user/setUuid', v4());
    }
  },
};
</script>

<style scoped>

</style>
