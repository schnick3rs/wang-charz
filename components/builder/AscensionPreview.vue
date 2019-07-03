<template lang="html">

  <v-card v-if="item">

    <v-card-title primary-title>
      <div>
        <div class="headline">{{ item.name }}</div>
        <span class="grey--text">{{ item.teaser }}</span>
      </div>
    </v-card-title>

    <v-card-text>

      <p class="text-lg-justify"><strong>Build Point Cost:</strong> (New Tier x {{ item.cost }})</p>

      <span class="mt-2 grey--text">Prerequisites</span>
      <v-divider class="mb-2"></v-divider>
      <p class="text-lg-justify"><strong>Minimum Campaign Tier:</strong> {{ item.minimumCampaignTier }}+</p>
      <p class="text-lg-justify"><strong>Attribute:</strong> {{ item.attributePrerequisites.length > 0 ? item.attributePrerequisites.join(', ') : 'none' }}</p>
      <p class="text-lg-justify"><strong>Skill:</strong> {{ item.skillPrerequisites.length > 0 ? item.skillPrerequisites.join(', ') : 'none' }}</p>

      <span class="mt-2 grey--text">Benefits</span>
      <v-divider class="mb-2"></v-divider>

      <p class="text-lg-justify"><strong>Keywords:</strong> {{ item.keywords.join(', ') }}</p>

      <p class="text-lg-justify"><strong>Influence Bonus:</strong> {{ item.influencePerTier }} per Tier ascended</p>

      <p class="text-lg-justify"><strong>Story Element:</strong> {{ item.storyElementText }}</p>

      <p class="text-lg-justify"><strong>Wargear:</strong> {{ item.wargearText }}</p>

    </v-card-text>

    <v-card-actions v-if="chooseMode">
      <v-btn block color="green" @click="$emit('select', item, targetTier)" >Select Package</v-btn>
      <v-btn block color="red" @click="$emit('cancel')" >Cancel</v-btn>
    </v-card-actions>
  </v-card>

</template>

<script lang="js">
export default {
  name: 'ascension-preview',
  props: {
    currentCharacterTier: {},
    item: {
      type: Object,
      required: true,
    },
    manageMode: {
      type: Boolean,
      default: false,
    },
    chooseMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      targetTier: 3,
    };
  },
  methods: {
  },
  computed: {
  },
};
</script>

<style scoped lang="css">

</style>
