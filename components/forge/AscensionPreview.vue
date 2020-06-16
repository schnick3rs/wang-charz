<template lang="html">

  <v-card v-if="item">

    <v-card-title v-if="chooseMode" style="background-color: #262e37; color: #fff;">
      <span>Confirm Ascension</span>
      <v-spacer />
      <v-icon dark @click="$emit('cancel')">
        close
      </v-icon>
    </v-card-title>

    <v-card-title primary-title>
      <div>
        <h3 class="headline md0">
          {{ item.name }}
        </h3>
        <span class="subtitle-1 grey--text">{{ item.teaser }}</span>
      </div>
      <v-spacer />
      <div class="hidden-xs-only">
        <v-avatar tile size="72">
          <img :src="`/img/avatars/ascension/${item.key}.png`">
        </v-avatar>
      </div>
    </v-card-title>

    <v-divider v-if="chooseMode" />

    <v-card-text class="pt-4">

      <v-alert v-if="item.alert" type="info" text dense class="caption" v-html="item.alert"></v-alert>

      <p class="text-lg-justify">
        <strong>Build Point Cost:</strong>
        <span v-if="item.costPerTier > 0">(New Tier x {{ item.costPerTier }})</span>
        <span v-if="item.costPerTier > 0 && item.cost > 0">+</span>
        <span v-if="item.cost > 0">{{item.cost}}</span>
      </p>

      <span class="mt-2 grey--text">Prerequisites</span>
      <v-divider class="mb-2" />

      <p class="text-lg-justify">
        <strong>Minimum Campaign Tier:</strong> {{ item.minimumCampaignTier }}+
      </p>

      <ul class="text-lg-justify pb-2" v-for="prerequisite in item.prerequisites">
        <li>{{prerequisite}}</li>
      </ul>

      <p class="text-lg-justify" v-if="false">
        <strong>Attribute:</strong> {{ item.attributePrerequisites && item.attributePrerequisites.length > 0 ? item.attributePrerequisites.join(', ') : 'none' }}
      </p>

      <p class="text-lg-justify" v-if="false">
        <strong>Skill:</strong> {{ item.skillPrerequisites && item.skillPrerequisites.length > 0 ? item.skillPrerequisites.join(', ') : 'none' }}
      </p>

      <span class="mt-2 grey--text">Benefits</span>
      <v-divider class="mb-2" />

      <p class="text-lg-justify">
        <strong>Keywords:</strong> <span class="text--keyword">{{ item.keywordString }}</span>
      </p>

      <p class="text-lg-justify">
        <strong>Influence Bonus:</strong>
        <span v-if="item.influenceBonus != 0">{{item.influenceBonus}}</span>
        <span v-if="item.influenceBonus != 0 && item.influencePerTier != 0">+</span>
        <span v-if="item.influencePerTier != 0">{{ item.influencePerTier }} per Tier ascended</span>
      </p>

      <div class="text-lg-justify mb-2">
        <strong>Story Element:</strong>
        <div v-html="item.storyElementDescription"></div>
      </div>
    </v-card-text>

    <v-divider />

    <v-card-actions v-if="chooseMode">

      <v-row v-if="!alertText" justify="center" no-gutters>
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

      <v-alert dense text type="warning" class="caption" style="width: 100%" v-if="alertText">
        {{alertText}}
      </v-alert>

    </v-card-actions>

    <v-card-actions v-if="chooseMode">
      <v-btn left outlined color="red" @click="$emit('cancel')">
        Cancel
      </v-btn>
      <v-spacer />
      <v-btn right color="green" @click="$emit('select', item, targetTier)" :disabled="alertText">
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
    alertText() {
      if (this.item.minimumCampaignTier > this.maxTargetTier) {
        return `The Campaign tier [${this.maxTargetTier}] does not meet the Ascensions prerequisites minimum tier [${this.item.minimumCampaignTier}]+`;
      }
      if (this.currentCharacterTier >= this.maxTargetTier) {
        return `Your character tier [${this.currentCharacterTier}] already matches the campaign tier [${this.maxTargetTier}]`;
      }
      return false;
    },
    hasValidTierPrerequisites() {
      return this.item.minimumCampaignTier <= this.maxTargetTier;
    },
    targetTierOptions() {
      const from = Math.max(this.currentCharacterTier + 1, this.item.minimumCampaignTier);
      const to = this.maxTargetTier;
      return from <= to ? this.range(from, to) : [];
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
