<template lang="html">

  <v-card v-if="item" class="pa-0">

    <v-card-title v-if="chooseMode" style="background-color: #262e37; color: #fff;">
      <span>Confirm Archetype</span>
      <v-spacer></v-spacer>
      <v-icon dark @click="$emit('cancel')">close</v-icon>
    </v-card-title>

    <v-card-text class="pt-4">

      <div class="hidden-xs-only" style="float: right;">
        <img :src="getAvatar(item.name)" style="width:96px" />
      </div>

      <div style="width: 75%">
        <h3 class="headline md0">
          {{ item.name }}
          <v-btn
            v-if="manageMode"
            text outlined small
            color="primary"
            @click="$emit('change')"
          >
            <v-icon left>settings</v-icon>
            change archetype
          </v-btn>
        </h3>
        <span class="subtitle-1 grey--text">{{ item.hint }}</span>
      </div>

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
        v-if="manageMode"
        v-for="placeholder in itemKeywordPlaceholders"
        v-bind:key="placeholder.key"
      >

        <v-select
          v-model="placeholder.selected"
          v-bind:label="placeholder.name +' Keyword'"
          v-bind:items="placeholder.options"
          v-bind:hint="keywordHint(placeholder.selected, placeholder)"
          v-on:change="updateKeyword(placeholder, placeholder.selected)"
          item-text="name"
          item-value="name"
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

    </v-card-text>

    <v-divider v-if="chooseMode"></v-divider>
    <v-card-actions v-if="chooseMode">
      <v-btn left outlined color="red" @click="$emit('cancel')" >Cancel</v-btn>
      <v-spacer />
      <v-btn right color="green" @click="$emit('select', item)" >Select Archetype</v-btn>
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
    characterId: {
      type: String,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
    keywords: {
      type: Array,
      required: false,
    },
    psychicPowersRepository: {
      type: Array,
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

    };
  },
  methods: {
    getAvatar(name) {
      const slug = name.toLowerCase().replace(/\s/gm, '-');
      return `/img/icon/archetype/archetype_${slug}_avatar.png`;
    },
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
    /**
     *
     * @param placeholder {name:String, options:[]}
     * @param selection String
     */
    updateKeyword(placeholder, selection) {
      console.log(`selected ${selection} for ${placeholder.name}`);

      this.$store.commit('characters/replaceCharacterKeywordPlaceholder', {
        id: this.characterId,
        // the name of the keyword to be replaced
        placeholder: placeholder.name,
        // the new selected choice
        replacement: selection,
        // the source of the keyword
        source: 'archetype',
      });
      placeholder.selected = selection;
    },
    psychicPowerHint(powerName) {

      const power = this.psychicPowersRepository.find( p => p.name === powerName );

      if ( power ) {
        return power.effect;
      }

      return '';
    },
    updatePsychicPowers(option) {
      this.$store.commit('clearPowersBySource', { source: `archetype.${option.name}` });
      this.$store.commit('addPower', {
        name: option.selected,
        cost: 0,
        source: `archetype.${option.name}`,
      });
    },
  },
  computed: {
    selectedKeywords(){
      let selectedKeywords = {};
      if ( this.keywords) {
        this.keywords.filter(k=> (k.replacement)).forEach(r=>{
          selectedKeywords[r.name] = r.replacement
        });
      }
      console.log(selectedKeywords);
      return selectedKeywords;
    },
    mergedKeywords() {
      return [...this.keywordRepository, ...this.keywordSubwordRepository];
    },
    itemKeywordPlaceholders() {
      const placeholderKeywords = this.item.keywords.split(',').filter( (k) => { return k.indexOf('<')>=0; } );

      let placeholderSet = [];

      placeholderKeywords.forEach(placeholder => {
        let wordy= {};
        if ( placeholder.toLowerCase() === '<any>' ) {
          const levelOneKeywords = this.keywordRepository.filter(k => k.name.toLowerCase() !== placeholder.toLowerCase());
          wordy = { name: placeholder, options: levelOneKeywords, selected: '', };
        } else {
          const subKeywords = this.keywordSubwordRepository.filter(k => k.placeholder === placeholder);
          wordy = { name: placeholder, options: subKeywords, selected: '', };
        }
        console.log(this.selectedKeywords[placeholder]);
        if ( this.selectedKeywords[placeholder] ){
          wordy.selected = this.selectedKeywords[placeholder];
        }
        placeholderSet.push(wordy);
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
