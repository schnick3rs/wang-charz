<script lang="ts">
import {defineComponent} from 'vue'
import {createCampaign, fetchAllCharacters, fetchCampaignMeta} from "~/services/campaignSync";
import {mapGetters} from "vuex";
import {ChronicEntry, ChronicEntrySchema} from "~/store/campaigns";

export default defineComponent({
  name: "Index",
  async asyncData({ params }) {
    const campaignJoinId = params.id || null;

    const container = await fetchCampaignMeta(campaignJoinId)
    const characters = await fetchAllCharacters(campaignJoinId)
    console.info('joind chars', characters)
    return {
      campaignId: campaignJoinId,
      cloudCampaign: container?.campaign,
      characters: characters.map((c) => c.character),
      owner: container.owner,
      createdAt: container.createdAt,
      updatedAt: container.updatedAt,
    }
  },
  data() {
    return {
      newChronicEntryDialog: false,
      chronicDate: new Date().toISOString().slice(0, 10), // "2026-08-03"
      chronicXp: 0,
      chronicText: '',
      chronicRank: false,
      chronicTier: false,
      chronicReward: [],
    }
  },
  computed: {
    ...mapGetters({
      userId: 'user/getUuid',
    }),
    campaign() {
      return this.$store.getters['campaigns/getCampaign'](this.campaignId)
    },
    youAreTheOwner() {
      return this.userId === this.owner;
    },
    currentXp() {
      return this.campaign.chronic.map((c) => c.xpReward).reduce((sum, val) => sum + val, 0);
    },
    currentRank() {
      return this.campaign.chronic.filter((c) => c.rankIncrement === true).length + 1;
    },
  },
  methods: {
    formatDate(timestamp: string | number | Date) {
      return new Date(timestamp).toLocaleString(undefined, { dateStyle: 'medium' });
    },
    effectiveTier(characterId: string) {
      return this.$store.getters['characters/characterEffectiveTierById'](characterId);
    },
    addChronicEntry() {
      const entry: ChronicEntry = ChronicEntrySchema.parse({
        timestamp: this.chronicDate,
        xpReward: this.chronicXp,
        text: this.chronicText,
        rankIncrement: this.chronicRank,
        tierIncrement: this.chronicTier,
      });
      console.info('new entry created, adding and update store', entry)
      this.$store.commit('campaigns/addChronicEntry', { id: this.campaign.id, entry: entry})
      this.newChronicEntryDialog = false;
      this.saveCampaign()
    },
    async saveCampaign(){
      const response = await createCampaign(this.userId, this.campaign);
      console.info('campaign pushed in KV store', response)
    },
  },
})
</script>

<template>
  <div v-if="campaign">
    <h1>Campaign: {{ campaign.name }}</h1>
    <div> a Tier {{ campaign.tier }}, Rank {{currentRank}} Campaign</div>

    <v-progress-circular size="75" width="10" :value="currentXp" color="success">{{ currentXp }} XP</v-progress-circular>

    <div v-if="youAreTheOwner">Your hosted campaign</div>
    <div v-if="!youAreTheOwner">Joined campaign as a player</div>

    <h2>Active Agents</h2>
    <ul>
      <li v-for="character in characters" :key="character.id" class="mb-2">
        {{ character.name }}, the {{ character.archetype.value }} of the {{ character.faction.label}}
      </li>
    </ul>

    <h2>Chronic & Rewards</h2>

    <v-btn @click="newChronicEntryDialog = !newChronicEntryDialog">New Chronicle entry...</v-btn>
    <v-dialog
        v-model="newChronicEntryDialog"
        width="800px"
        scrollable
        :fullscreen="$vuetify.breakpoint.xsOnly"
    >
      <v-card>

        <v-card-title style="background-color: #262e37; color: #fff;" class="mb-4">
          Add Chronic Entry
          <v-spacer />
          <v-icon dark @click="$emit('cancel')">
            close
          </v-icon>
        </v-card-title>

        <v-card-text>
          <h3 class="mt-4">A history of </h3>
          <p>Shows the modifiers and thus history of your changes.</p>
          <v-row>

            <v-col :cols="12" :md="8">
              <v-text-field
                  v-model="chronicDate"
                  type="date"
                  dense outlined required
                  label="Session Datetime"
                  persistent-hint
                  hint="The Date when the reward or session occurred"
              ></v-text-field>
            </v-col>

            <v-col :cols="12" :md="4">
              <v-text-field
                  v-model="chronicXp"
                  type="number"
                  dense outlined required
                  label="XP gained"
                  hint="The amount of XP rewarded to the group."
                  persistent-hint
              ></v-text-field>
            </v-col>

            <v-col :cols="12">
              <v-textarea
                  v-model="chronicText"
                  dense outlined required
                  label="Summary and notes"
                  persistent-hint
              ></v-textarea>
            </v-col>

            <v-col :cols="12" :md="4">
              <v-switch
                  v-model="chronicRank"
                  type="number"
                  dense outlined required
                  label="Rank Inkrement?"
                  persistent-hint
                  hint="Usual#ly done at 40 and 70 XP"
              ></v-switch>
            </v-col>

            <v-col :cols="12" :md="6">
              <v-switch
                  v-model="chronicTier"
                  type="number"
                  dense outlined required
                  label="Tier Inkrement / Ascension"
                  persistent-hint
                  hint="Usually done at 100 XP"
              ></v-switch>
            </v-col>

          </v-row>

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer />
          <v-btn color="success" @click="addChronicEntry()">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <v-timeline align-top dense>
      <v-timeline-item
          v-for="entry in campaign.chronic"
          :key="entry.id"
          small
      >
        <v-card class="elevation-2">
          <v-card-title>{{ formatDate(entry.timestamp) }}</v-card-title>
          <v-card-text v-if="entry.text">{{ entry.text }}</v-card-text>
          <v-card-actions>

            <v-chip v-if="entry.xpReward !== 0" color="warning" class="mr-2">
              <v-icon left small>mdi-star</v-icon>
              +{{ entry.xpReward }} XP
            </v-chip>


            <v-chip v-if="entry.rankIncrement" color="info" class="mr-2">
              <v-icon left small>mdi-upload</v-icon>
              Rank Increased
            </v-chip>

            <v-chip v-if="entry.tierIncrement" color="info" class="mr-2">
              <v-icon left small>mdi-upload</v-icon>
              Tier Increased
            </v-chip>

          </v-card-actions>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>

<style scoped lang="css">

</style>