<template lang="html">

  <div>
    <div class="hidden-xs-only" style="float: right;">
      <img v-bind:src="getAvatar(item.name)" style="width:96px" />
    </div>

    <div style="width: 75%">
      <h3 class="headline md0">
        {{ item.name }}
      </h3>
      <span class="subtitle-1 grey--text">{{ item.hint }}</span>
    </div>

    <p class="text-lg-justify"><strong>Build Point Cost:</strong> {{ item.cost }}</p>

    <span class="mt-2 grey--text">Prerequisites</span>
    <p><v-divider></v-divider></p>

    <p class="text-lg-justify"><strong>Tier:</strong> {{ item.tier }}</p>
    <p class="text-lg-justify"><strong>Species:</strong> {{ item.species.join(', ') }}</p>
    <p class="text-lg-justify"><strong>Attributes:</strong> {{ attributePrerequisites }}</p>
    <p class="text-lg-justify"><strong>Skills:</strong> {{ skillPrerequisites }}</p>

    <span class="mt-2 grey--text">Benefits</span>
    <p><v-divider ></v-divider></p>

    <p class="text-lg-justify"><strong>Keywords:</strong> {{ keywords }}</p>

    <p class="text-lg-justify"><strong>Influence Bonus:</strong> {{ item.influence }}</p>

    <div v-if="item.abilities"
         v-for="ability in abilityObjects"
         class="text-lg-justify"
    >
      <p><strong>{{ ability.name }}:</strong> {{ ability.effect}}</p>
      <div v-if="item.psychicPowers && psychicPowersRepository">

        <div v-for="option in item.psychicPowers.discount" v-bind:key="option.name">
          <v-select
            v-bind:readonly="psychicPowersRepository.filter(option.filter).length <= 1"
            v-model="option.selected"
            v-bind:items="psychicPowersRepository.filter(option.filter)"
            v-bind:hint="psychicPowerHint(option.selected)"
            v-on:change="updatePsychicPowers(option)"
            item-value="name"
            item-text="name"
            persistent-hint
            dense
            solo
            class="ml-2 mr-2"
          ></v-select>
        </div>

      </div>
    </div>

    <p class="text-lg-justify"><strong>Wargear:</strong> {{ wargearText }}</p>

    <div v-if="false">
      <p><v-divider></v-divider></p>
      <blockquote class="blockquote font-italic">
        <p>"{{ item.description }}"</p>
        <span class="right">- from the Wrath & Glory Corerules -</span>
      </blockquote>
    </div>

  </div>

</template>

<script lang="js">
import KeywordRepository from '~/mixins/KeywordRepositoryMixin';
import StatRepository from '~/mixins/StatRepositoryMixin';
import WargearRepository from '~/mixins/WargearRepositoryMixin';

export default {
  name: 'archetype-preview',
  mixins: [
    KeywordRepository,
    StatRepository,
    WargearRepository,
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
      if ( this.item.prerequisites ) {
        return this.item.prerequisites
        .filter( p => p.group === 'attributes' )
        .map( a => `${this.getAttributeByKey(a.value).name} ${a.threshold}` )
        .join(", ");
      }
      return this.item.attributes;
    },
    skillPrerequisites() {
      if ( this.item.prerequisites ) {
        return this.item.prerequisites
        .filter(p => p.group === 'skills')
        .map(a => `${this.getSkillByKey(a.value).name} (${a.threshold})`)
        .join(", ");
      }
      return this.item.skills;
    },
    abilityObjects() {
      if ( this.item.abilities instanceof Array) {
        return this.item.abilities;
      }
      return [];
    },
    wargearText() {
      const charGear = this.archetypeWargearRepository.find(a => a.name === this.item.name);
      if ( charGear ) {
        return charGear.options.map( g => {
          if ( g.amount ) {
            return `${g.amount}x ${g.name}`;
          }
          return `${g.name}`;
        }).join(', ');
      }
      return this.item.wargear;
    },
    keywords() {
      if ( this.item.keywords ) {
        return this.item.keywords.split(',').join(', ');
      }
      return '';
    },
  },
  methods: {
    getAvatar(name) {
      const slug = this.textToKebab(name);
      return `/img/icon/archetype/archetype_${slug}_avatar.png`;
    },
  },
};
</script>

<style scoped lang="css">

</style>
