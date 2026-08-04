<script lang="ts">
import {defineComponent} from 'vue'
import {fetchCampaignMeta, pushCharacter} from '~/services/campaignSync'
import {mapGetters} from "vuex";

export default defineComponent({
  name: "Join",
  async asyncData({ query }) {
    const campaignJoinId = query.c || null;
    const container = await fetchCampaignMeta(campaignJoinId)
    return {
      campaign: container.campaign,
      owner: container.owner,
      createdAt: container.createdAt,
      updatedAt: container.updatedAt,
    }
  },
  computed: {
    ...mapGetters({
      userId: 'user/getUuid',
      characterIds: 'characters/characterIds',
      characters: 'characters/characterSets',
    }),
  },
  methods: {
    effectiveTier(characterId: string) {
      return this.$store.getters['characters/characterEffectiveTierById'](characterId);
    },
    join(character: any) {
      pushCharacter(this.campaign.id, character.id, character)
    }
  },
})
</script>

<template>
  <div>
    You about to join the campaign {{ campaign?.name }}
    {{campaign}}

    <ul>
      <li v-for="character in characters" :key="character.id" class="mb-2">
        {{ character.name }}, the Tier {{ effectiveTier(character.id)}} {{ character.archetype.value }} of the {{ character.faction.label}}
        <v-btn small color="success" @click="join(character)">Join</v-btn>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="css">

</style>