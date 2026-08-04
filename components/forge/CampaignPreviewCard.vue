<script lang="ts">
import {defineComponent, type PropType} from 'vue'
import {Campaign, CampaignSchema} from "~/store/campaigns";
import {createCampaign, deleteCampaign, fetchAllCharacters} from "~/services/campaignSync";
import {mapGetters} from "vuex";

export default defineComponent({
  name: "CampaignPreviewCard",
  props: {
    campaign: {
      type: Object as PropType<Campaign>,
      required: true,
      validator: (value) => CampaignSchema.safeParse(value).success,
    }
  },
  data() {
    return {
      chars: [],
    };
  },
  async fetch() {
    const characterContainer = await fetchAllCharacters(this.campaign.id);
    this.chars = characterContainer.map((item) => item.character)
  },
  computed: {
    ...mapGetters({
      userId: 'user/getUuid',
    }),
    currentXp() {
      return this.campaign.chronic.map((c) => c.xpReward).reduce((sum, val) => sum + val, 0);
    },
    currentRank() {
      return this.campaign.chronic.filter((c) => c.rankIncrement === true).length + 1;
    },
  },
  methods: {
    formatDate(timestamp: string | number | Date) {
      return new Date(timestamp).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'medium' });
    },
    async publishCampaign(){
      const campaign = this.$store.getters['campaigns/getCampaign'](this.campaign.id);
      const response = await createCampaign(this.userId, campaign);
      console.info('campaign created in KV store', response)
    },
    async deleteCampaign() {
      this.$store.commit('campaigns/delete', { id: this.campaign.id });
      await deleteCampaign(this.campaign.id);
    },
    characterAvatar(id) {
      const customAvatarUrl = this.$store.getters['characters/characterAvatarUrlById'](id);
      if ( customAvatarUrl ) {
        return customAvatarUrl;
      }

      const archetypeKey = this.$store.getters['characters/characterArchetypeKeyById'](id);
      const speciesKey = this.$store.getters['characters/characterSpeciesKeyById'](id)
      if (archetypeKey !== undefined) {
        if (archetypeKey === 'advanced') {
          return '/img/avatar_placeholder.png';
        }
        if (!['core-ratling', 'core-ogryn'].includes(speciesKey)) {
          return `/img/avatars/archetype/${archetypeKey}.png`;
        }
      }

      if (speciesKey !== undefined) {
        return `/img/avatars/species/${speciesKey}.png`;
      }

      return '/img/avatars/species/core-human.png';
    },
  }
})
</script>

<template>
  <v-card>
    <v-card-title>{{campaign.name}}</v-card-title>
    <v-card-subtitle>Updated {{formatDate(campaign.updatedAt)}}</v-card-subtitle>
    <v-card-text style="height: 280px; text-align: center;">
      <div class="mb-2">
        <v-progress-circular size="75" width="10" color="success" :value="currentXp">{{currentXp}} XP</v-progress-circular>
        <v-progress-circular size="75" width="10" color="success" :value="100 / 3 * currentRank">Rank {{currentRank}}</v-progress-circular>
        <v-progress-circular size="75" width="10" color="success" :value="100 / 5 * campaign.tier">Tier {{campaign.tier}}</v-progress-circular>
      </div>

      <div>{{ chars.length}}</div>
      <strong>Agents</strong>

      <v-container
          grid-list-sm
          fluid
      >
        <v-layout row wrap justify-center>
          <v-flex
              v-for="character in chars"
              :key="character.id"
              xs2
              d-flex
          >
            <v-avatar
                tile
                :title="character.name"
                class="d-flex"

            >
              <img :src="characterAvatar(character.id)" />
            </v-avatar>
          </v-flex>
        </v-layout>
      </v-container>

      <div>{{ campaign.chronic.length }}</div>
      <div>Chronic Entries</div>
    </v-card-text>


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
          @click="publishCampaign()"
      >
        Publish
      </v-btn>
      <v-btn
          color="primary"
          text
          small
          :to="`/forge/my-campaigns/join?c=${campaign.id}`"
      >
        Join
      </v-btn>
      <v-btn
          color="error"
          text
          small
          @click="deleteCampaign()"
      >
        <v-icon small>delete</v-icon>Delete
      </v-btn>
    </v-card-actions>
  </v-card>

</template>

<style scoped lang="css">

</style>