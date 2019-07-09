<template lang="html">

  <v-card v-if="item">

    <v-card-title primary-title>
      <div>
        <h3 class="headline md0">
          {{ item.name }}
          <v-btn
            v-if="manageMode"
            flat
            color="primary"
            @click="$emit('change')"
          >
            <v-icon>settings</v-icon>
            change archetype
          </v-btn>
        </h3>
        <span class="grey--text">{{ item.hint }}</span>
      </div>
    </v-card-title>

    <v-card-text>
      <p class="text-lg-justify"><strong>Build Point Cost:</strong> {{ item.cost }}</p>

      <span class="mt-2 grey--text">Prerequisites</span>
      <p><v-divider></v-divider></p>

      <p class="text-lg-justify"><strong>Tier:</strong> {{ item.tier }}</p>
      <p class="text-lg-justify"><strong>Species:</strong> {{ item.species }}</p>
      <p class="text-lg-justify"><strong>Attributes:</strong> {{ attributePrerequisites }}</p>
      <p class="text-lg-justify"><strong>Skills:</strong> {{ skillPrerequisites }}</p>

      <span class="mt-2 grey--text">Benefits</span>
      <p><v-divider ></v-divider></p>

      <p class="text-lg-justify"><strong>Keywords:</strong> {{ item.keywords.split(',').join(', ') }}</p>

      <div
        v-for="placeholder in itemKeywordPlaceholders"
        :key="placeholder.key"
      >

        <v-select
          v-model="selectedKeywords[placeholder.name]"
          :label="placeholder.name +' Keyword'"
          :items="placeholder.options"
          item-text="name"
          item-value="name"
          :hint="keywordHint(selectedKeywords[placeholder.name], placeholder)"
          persistent-hint
          solo
          dense
        ></v-select>

        <p
          v-if="selectedKeywords[placeholder.name]"
          class="ma-4"
        >
          {{keywordEffect(selectedKeywords[placeholder.name])}}
        </p>

      </div>

      <p class="text-lg-justify"><strong>Influence Bonus:</strong> {{ item.influence }}</p>

      <div v-if="item.abilities"
           v-for="ability in abilityObjects"
           class="text-lg-justify"
      >
        <p><strong>{{ ability.name }}:</strong> {{ ability.effect}}</p>

      </div>

      <p class="text-lg-justify"><strong>Wargear:</strong> {{ wargearText }}</p>

      <div v-if="false">
        <p><v-divider></v-divider></p>
        <blockquote class="blockquote font-italic">
          <p>"{{ item.description }}"</p>
          <span class="right">- from the Wrath & Glory Corerules -</span>
        </blockquote>
      </div>

    </v-card-text>

    <v-card-actions v-if="chooseMode">
      <v-btn block color="green" @click="$emit('select', item)" >Select Archetype</v-btn>
      <v-btn block color="red" @click="$emit('cancel')" >Cancel</v-btn>
    </v-card-actions>
  </v-card>

</template>

<script lang="js">
  import KeywordRepository from '~/mixins/KeywordRepositoryMixin';
  import StatRepository from '~/mixins/StatRepositoryMixin';
  import WargearRepository from '~/mixins/WargearRepositoryMixin';

  export default {
  name: 'archetype-preview',
  mixins: [KeywordRepository, StatRepository, WargearRepository],
  props: {
    item: {
      type: Object,
      required: false,
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
      selectedKeywords: {}
    };
  },
  methods: {
    keywordOptions(wildcard) {
      if (wildcard === '<Any>') {
        // return all but the any keyword
        return this.keywordRepository.filter(k => k.name !== '<Any>');
      }

      return this.keywordSubwordRepository.filter(k => k.placeholder === wildcard);
    },
    keywordEffect(keyword) {
      const mergedKeywords = [...this.keywordSubwordRepository];
      let foundKeyword = mergedKeywords.find(k => k.name === keyword);
      if (foundKeyword !== undefined) {
        return foundKeyword.effect;
      }
    },
    keywordHint(keyword, parentKeyword) {

      let foundKeyword = this.mergedKeywords.find(k => k.name === keyword);
      if (foundKeyword !== undefined) {
        return foundKeyword.description;
      }

      foundKeyword = this.mergedKeywords.find(k => k.name === parentKeyword);
      if (foundKeyword !== undefined) {
        return foundKeyword.description;
      }

      return '';
    },
  },
  computed: {
    mergedKeywords() {
      return [...this.keywordRepository, ...this.keywordSubwordRepository];
    },
    itemKeywordPlaceholders() {
      const placeholderKeywords = this.item.keywords.split(',').filter( (k) => { return k.indexOf('<')>=0; } );

      let placeholderSet = [];

      placeholderKeywords.forEach(placeholder => {
        if ( placeholder.toLowerCase() === '<any>' ) {
          const levelOneKeywords = this.keywordRepository.filter(k => k.name.toLowerCase() !== placeholder.toLowerCase());
          placeholderSet.push({ name: placeholder, options: levelOneKeywords });
        } else {
          const subKeywords = this.keywordSubwordRepository.filter(k => k.placeholder === placeholder);
          placeholderSet.push({ name: placeholder, options: subKeywords });
        }
      });

      return placeholderSet;
    },
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
  },
};
</script>

<style scoped lang="css">

</style>
