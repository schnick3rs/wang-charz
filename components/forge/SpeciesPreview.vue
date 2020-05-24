<template lang="html">
  <v-card>

    <v-card-title v-if="chooseMode" style="background-color: #262e37; color: #fff;">
      <span>Confirm Species</span>
      <v-spacer />
      <v-icon dark @click="$emit('cancel')">
        close
      </v-icon>
    </v-card-title>

    <v-divider v-if="chooseMode" />

    <v-card-title primary-title>
      <div>
        <h3 class="headline md0">
          {{ species.name }}
        </h3>
        <span class="subtitle-1 grey--text">{{ species.hint }}</span>
      </div>
      <v-spacer />
      <div >
        <img :src="avatar" style="width:96px">
      </div>
    </v-card-title>

    <v-divider v-if="chooseMode" />

    <v-card-text class="pa-6">
      <p class="text-lg-justify">
        <strong>XP Cost:</strong> {{ species.cost }}, incl. Stats ({{ species.costs.stats }} XP)
      </p>

      <p><v-divider /></p>

      <p class="text-lg-justify" v-if="attributes">
        <strong>Attributes:</strong> {{attributes}}
      </p>

      <p class="text-lg-justify" v-if="skills">
        <strong>Skills:</strong> {{skills}}
      </p>

      <p class="text-lg-justify">
        <strong>Speed:</strong> {{ species.speed }}
      </p>

      <div v-if="species.speciesFeatures">
        <span class="mt-2 grey--text">Abilities</span>
        <p><v-divider /></p>

        <span v-if="species.speciesFeatures.length <= 0">No Abilities? At least your xp cost are low...</span>

        <div
          v-for="feature in species.speciesFeatures"
          class="text-lg-justify"
        >
          <div
            v-if="feature.description"
          >
            <strong>{{feature.name}}</strong><div v-html="feature.description"></div>
          </div>
          <p v-else><strong>{{feature.name}}: </strong>{{feature.snippet}}</p>

        </div>

      </div>
    </v-card-text>

    <v-divider v-if="chooseMode" />
    <v-card-actions v-if="chooseMode">
      <v-btn outlined color="red" left @click="$emit('cancel')">
        Cancel
      </v-btn>
      <v-spacer />
      <v-btn color="success" right @click="$emit('select', species)">
        Select Species
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="js">
import SluggerMixin from '~/mixins/SluggerMixin';
import StatRepositoryMixin from '~/mixins/StatRepositoryMixin';

export default {
  name: 'SpeciesPreview',
  mixins: [
    SluggerMixin,
    StatRepositoryMixin,
  ],
  props: {
    characterId: {
      type: String,
      required: true,
    },
    species: {
      type: Object,
      required: true,
    },
    psychicPowers: {
      type: Array,
      required: false,
      default: () => [],
    },
    chooseMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      chapterList: undefined,
    };
  },
  computed: {
    avatar() {
      if (this.species === undefined) return '';
      return `/img/avatars/species/${this.species.key}.png`;
    },
    attributes() {
      if (this.species === undefined || this.species.prerequisites === undefined) return undefined;
      return this.species.prerequisites.filter(pre => pre.group === 'attributes').map(pre => `${this.getAttributeByKey(pre.value).name} ${pre.threshold}`).join(', ');
    },
    skills() {
      if (this.species === undefined || this.species.prerequisites === undefined) return undefined;
      return this.species.prerequisites.filter(pre => pre.group === 'skills').map(pre => `${this.getSkillByKey(pre.value).name} ${pre.threshold}`).join(', ');
    },
  },
};
</script>

<style scoped lang="css">

</style>
