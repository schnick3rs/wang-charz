<template lang="html">

  <v-card v-if="item">

    <v-card-title v-if="chooseMode" style="background-color: #262e37; color: #fff;">
      <span>Confirm Ascension</span>
      <v-spacer />
      <v-icon dark @click="$emit('cancel')">
        close
      </v-icon>
    </v-card-title>

    <v-card-text class="pt-4">
      <div class="pb-2">
        <div class="headline">
          {{ item.name }}
        </div>
        <span class="subtitle-1 grey--text">{{ item.teaser }}</span>
      </div>

      <p class="text-lg-justify">
        <strong>Build Point Cost:</strong> (New Tier x {{ item.cost }})
      </p>

      <span class="mt-2 grey--text">Prerequisites</span>
      <v-divider class="mb-2" />
      <p class="text-lg-justify">
        <strong>Minimum Campaign Tier:</strong> {{ item.minimumCampaignTier }}+
      </p>
      <p class="text-lg-justify">
        <strong>Attribute:</strong> {{ item.attributePrerequisites && item.attributePrerequisites.length > 0 ? item.attributePrerequisites.join(', ') : 'none' }}
      </p>
      <p class="text-lg-justify">
        <strong>Skill:</strong> {{ item.skillPrerequisites && item.skillPrerequisites.length > 0 ? item.skillPrerequisites.join(', ') : 'none' }}
      </p>

      <span class="mt-2 grey--text">Benefits</span>
      <v-divider class="mb-2" />

      <p class="text-lg-justify">
        <strong>Keywords:</strong> {{ item.keywords ? item.keywords.join(', ') : '' }}
      </p>

      <p class="text-lg-justify">
        <strong>Influence Bonus:</strong> {{ item.influencePerTier }} per Tier ascended
      </p>

      <p class="text-lg-justify">
        <strong>Story Element:</strong> {{ item.storyElementString }}
      </p>

      <p class="text-lg-justify">
        <strong>Wargear:</strong> {{ item.wargearString }}
      </p>
    </v-card-text>

    <v-divider />

    <v-card-actions v-if="chooseMode">
      <v-row justify="center" no-gutters>
        <v-col :cols="2">
          <v-select
            :items="[currentCharacterTier]"
            :value="currentCharacterTier"
            label="Current Tier"
            dense
            disabled
            readonly
          />
        </v-col>

        <v-col class="justify" :cols="2" style="text-align:center;">
          <v-avatar size="32" color="primary">
            <v-icon color="white">
              arrow_forward
            </v-icon>
          </v-avatar>
        </v-col>

        <v-col cols="2">
          <v-select
            v-model="targetTier"
            :items="targetTierOptions"
            dense
            label="Target Tier"
          />
        </v-col>
      </v-row>
    </v-card-actions>

    <v-card-actions v-if="chooseMode">
      <v-btn left outlined color="red" @click="$emit('cancel')">
        Cancel
      </v-btn>
      <v-spacer />
      <v-btn right color="green" @click="$emit('select', item, targetTier)">
        Select Package
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="js">
export default {
  name: 'AscensionPreview',
  props: {
    currentCharacterTier: {
      type: Number,
      required: true,
    },
    maxTargetTier: {
      type: Number,
      required: true,
    },
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
      targetTier: this.maxTargetTier,
    };
  },
  computed: {
    targetTierOptions() {
      return this.range(this.currentCharacterTier + 1, this.maxTargetTier);
    },
  },
  methods: {
    range(start, end) {
      return Array(end - start + 1).fill().map((_, idx) => start + idx);
    },
  },
};
</script>

<style scoped lang="css">

</style>
