<template lang="html">
  <div>
    <div class="hidden-xs-only" style="float: right;">
      <img :src="getAvatar(item.key)" style="width:96px">
    </div>

    <div style="width: 75%">
      <h3 class="headline md0">
        {{ item.name }}
      </h3>
      <span class="subtitle-1 grey--text">{{ item.hint }}</span>
    </div>

    <p class="text-lg-justify">
      <strong>Build Point Cost:</strong> {{ item.cost }}
    </p>

    <span class="mt-2 grey--text">Prerequisites</span>
    <p><v-divider /></p>

    <p class="text-lg-justify">
      <strong>Tier:</strong> {{ item.tier }}
    </p>
    <p class="text-lg-justify">
      <strong>Species:</strong> {{ item.species.join(', ') }}
    </p>
    <p class="text-lg-justify">
      <strong>Attributes:</strong> {{ attributePrerequisites }}
    </p>
    <p class="text-lg-justify">
      <strong>Skills:</strong> {{ skillPrerequisites }}
    </p>

    <span class="mt-2 grey--text">Benefits</span>
    <p><v-divider /></p>

    <p class="text-lg-justify">
      <strong>Keywords:</strong> {{ keywords }}
    </p>

    <p class="text-lg-justify">
      <strong>Influence Bonus:</strong> {{ item.influence }}
    </p>

    <div
      v-if="item.archetypeFeatures"
      v-for="feature in item.archetypeFeatures"
      class="text-lg-justify"
    >
      <strong>{{ feature.name }}</strong>
      <div v-if="feature.description" v-html="feature.description"></div>
      <p v-else>{{ feature.snippet }}</p>
    </div>

    <p class="text-lg-justify">
      <strong>Wargear:</strong> {{ wargearText }}
    </p>

    <div v-if="false">
      <p><v-divider /></p>
      <blockquote class="blockquote font-italic">
        <p>"{{ item.description }}"</p>
        <span class="float-right">- from the Wrath & Glory Corerules -</span>
      </blockquote>
    </div>
  </div>
</template>

<script lang="js">
import KeywordRepository from '~/mixins/KeywordRepositoryMixin';
import StatRepository from '~/mixins/StatRepositoryMixin';
import SluggerMixin from '~/mixins/SluggerMixin';

export default {
  name: 'ArchetypePreview',
  mixins: [
    KeywordRepository,
    StatRepository,
    SluggerMixin,
  ],
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {

    };
  },
  computed: {
    attributePrerequisites() {
      if (this.item.prerequisites) {
        return this.item.prerequisites
          .filter((p) => p.group === 'attributes')
          .map((a) => `${this.getAttributeByKey(a.value).name} ${a.threshold}`)
          .join(', ');
      }
      return this.item.attributes;
    },
    skillPrerequisites() {
      if (this.item.prerequisites) {
        return this.item.prerequisites
          .filter((p) => p.group === 'skills')
          .map((a) => `${this.getSkillByKey(a.value).name} (${a.threshold})`)
          .join(', ');
      }
      return this.item.skills;
    },
    abilityObjects() {
      if (Array.isArray(this.item.abilities)) {
        return this.item.abilities;
      }
      return [];
    },
    wargearText() {
      if ( this.item.wargearString ) {
        return this.item.wargearString;
      }
      if ( this.item.wargear && this.item.wargear.length > 0 ) {
        return this.item.wargear.map((g) => {
          if (g.amount) {
            return `${g.amount}x ${g.name}`;
          }
          return `${g.name}`;
        }).join(', ');
      }
      return this.item.wargear;
    },
    keywords() {
      if (this.item.keywords) {
        return this.item.keywords.split(',').join(', ');
      }
      return '';
    },
  },
  methods: {
    getAvatar(key) {
      return `/img/avatars/archetype/${key}.png`;
    },
  },
};
</script>

<style scoped lang="css">

</style>
