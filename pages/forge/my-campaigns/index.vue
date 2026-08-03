<template>
  <div>
    <dod-default-breadcrumbs :items="breadcrumbItems" />

    <v-row justify="center">

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
          :lg="4" :xl="4"
      >

        <v-card>
          <v-card-title>{{campaign.name}}</v-card-title>
          <v-card-text>A Tier {{campaign.tier}} Campaign</v-card-text>
          <v-card-text>Join via https://www.doctors-of-doom.com/forge/my-campaign/join?c={{campaign.id}}</v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
                color="primary"
                text
                small
                :to="`/forge/my-campaigns/${campaign.id}`"
            >
              View
            </v-btn>
            <v-btn
                color="primary"
                text
                small
                @click="publishCampaign(campaign.id)"
            >
              Publish
            </v-btn>
            <v-btn
                color="error"
                text
                small
                @click="deleteCampaign(campaign.id)"
            >
              <v-icon small>delete</v-icon>Delete
            </v-btn>
          </v-card-actions>
        </v-card>

      </v-col>

    </v-row>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import DodDefaultBreadcrumbs from '~/components/DodDefaultBreadcrumbs';
import SluggerMixin from '~/mixins/SluggerMixin';
import {createCampaign, deleteCampaign, fetchAllCharacters} from '~/services/campaignSync'

import { v4 } from 'uuid'

function randomId(length = 8) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789-';
  const bytes = crypto.getRandomValues(new Uint8Array(length));

  return Array.from(bytes, b => alphabet[b % alphabet.length]).join('');
}

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
      userId: 'user/getUuid',
      campaignIds: 'campaigns/campaignIds',
      campaigns: "campaigns/campaignSets",
    }),
  },
  methods: {
    async joinedChars(campaignId) {
      const chars = await fetchAllCharacters(campaignId)
      console.info('le chars', chars)
      return chars.length;
    },
    async createCampaign() {
      const id = randomId(12);
      const name = 'Some name';
      const tier = 2;
      this.$store.commit('campaigns/create', { id, name, tier });
    },
    async publishCampaign(id){
      const campaign = this.$store.getters['campaigns/getCampaign'](id);
      const response = await createCampaign(this.userId, campaign);
      console.info('campaign created in KV store', response)
    },
    async deleteCampaign(id) {
      this.$store.commit('campaigns/delete', { id });
      await deleteCampaign(id);
    },
    async createUserIdentity() {
      this.$store.commit('user/setUuid', v4());
    }
  },
};
</script>

<style scoped>

</style>
