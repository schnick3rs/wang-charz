<template lang="html">
  <v-card v-if="item" class="pa-0">
    <v-card-title v-if="chooseMode" style="background-color: #262e37; color: #fff;">
      <span>Confirm Archetype</span>
      <v-spacer />
      <v-icon dark @click="$emit('cancel')">
        close
      </v-icon>
    </v-card-title>

    <v-card-text class="pt-4">
      <div class="hidden-xs-only" style="float: right;">
        <img :src="getAvatar(item.key)" style="width:96px">
      </div>

      <div style="width: 75%">
        <h3 class="headline md0">
          {{ item.name }}
          <v-btn
            v-if="manageMode"
            text
            outlined
            small
            color="primary"
            @click="$emit('change')"
          >
            <v-icon left>
              settings
            </v-icon>
            change archetype
          </v-btn>
        </h3>
        <span class="subtitle-1 grey--text">{{ item.hint }}</span>
      </div>

      <p class="text-lg-justify"><strong>Tier:</strong> {{ item.tier }}</p>

      <p class="text-lg-justify"><strong>Species:</strong> {{ item.species.join(', ') }}</p>

      <p class="text-lg-justify"><strong>XP Cost:</strong> {{ item.cost }}, incl. Archetype ({{ item.costs.archetype }} XP) and Stats ({{ item.costs.stats }} XP)</p>

      <p><v-divider /></p>

      <p class="text-lg-justify">
        <strong>Attributes:</strong> {{ attributePrerequisites }}
      </p>

      <p class="text-lg-justify">
        <strong>Skills:</strong> {{ skillPrerequisites }}
      </p>

      <p class="text-lg-justify" v-if="item.prerequisiteText">
        <strong>Others:</strong> {{ item.prerequisiteText }}
      </p>

      <p class="text-lg-justify">
        <strong>Keywords: </strong>
        <span style="text-transform: uppercase; color: darkred;">{{ item.keywords.split(',').map((i)=>i.trim()).join(', ') }}</span>
      </p>

      <div
        v-for="placeholder in itemKeywordPlaceholders"
        v-if="manageMode"
        :key="placeholder.key"
      >
        <v-select
          v-model="placeholder.selected"
          :label="placeholder.name +' Keyword'"
          :items="placeholder.options"
          :hint="keywordHint(placeholder.selected, placeholder)"
          item-text="name"
          item-value="name"
          persistent-hint
          solo
          dense
          @change="updateKeyword(placeholder, placeholder.selected)"
        />

        <p
          v-if="selectedKeywords[placeholder.name]"
          class="ma-4"
        >
          {{ keywordEffect(selectedKeywords[placeholder.name]) }}
        </p>
      </div>

      <div
        v-for="feature in item.archetypeFeatures"
        class="text-lg-justify"
      >
        <div>
          <strong>{{ feature.name }}</strong>
          <div v-if="feature.description" v-html="feature.description"></div>
          <p v-else>{{ feature.snippet }}</p>
          <v-alert
            v-if="feature.alert"
            :type="feature.alert.type"
            dense
            text
          >{{feature.alert.text}}</v-alert>
        </div>

        <div
          v-if="manageMode && feature.options && feature.options.length > 0"
        >
          <div v-for="inx in feature.selected.length">
            <v-select
              :items="feature.options"
              v-model="feature.selected[inx-1]"
              item-value="name"
              item-text="name"
              @change="changeFeatureSelectedOption(feature, inx-1)"
              dense
              solo
            ></v-select>
            <div
              v-if="feature.selected[inx-1] && feature.selected[inx-1].length > 0"
              class="ml-4 mr-4"
            >
              <div
                v-if="feature.options.find((o)=>o.name === feature.selected[inx-1]).description"
                v-html="feature.options.find((o)=>o.name === feature.selected[inx-1]).description"
              ></div>
              <p v-else>{{feature.options.find((o)=>o.name === feature.selected[inx-1]).snippet}}</p>
            </div>
          </div>
        </div>

        <div v-if="manageMode && feature.psychicPowers">

          <div v-for="selections in feature.psychicPowers" :key="selections.name">
            <v-select
              v-if="selections.query && !selections.query.name"
              v-model="selections.selected"
              :readonly="selections.options.length <= 1"
              :items="selections.options"
              item-value="name"
              item-text="name"
              persistent-hint
              dense
              solo
              class="ml-2 mr-2"
              @change="updatePsychicPowers(selections)"
            />
            <v-checkbox
              v-else
              class="ml-2 mr-2"
              v-model="selections.query.name"
              :label="selections.query.name"
              :hint="psychicPowerHint(selections.query.name)"
              persistent-hint
              dense
              disabled
            ></v-checkbox>
          </div>
        </div>

      </div>

      <p class="text-lg-justify">
        <strong>Wargear:</strong> {{ wargearText }}
      </p>
      <v-alert text border-left dense type="info" class="caption">
        You can add your (starting) equipment in the <em>6. Wargear</em> section.
      </v-alert>

      <div v-if="false">
        <p><v-divider /></p>
        <blockquote class="blockquote font-italic">
          <p>"{{ item.description }}"</p>
          <span class="float-right">- from the Wrath & Glory Corerules -</span>
        </blockquote>
      </div>

      <p class="text-lg-justify" v-if="item.influence && item.influence != 0">
        <strong>Influence Bonus: </strong>
        {{ `${item.influence > 0 ? '+' : ''}${item.influence}` }}
      </p>

    </v-card-text>

    <v-divider v-if="chooseMode" />
    <v-card-actions v-if="chooseMode">
      <v-btn left outlined color="red" @click="$emit('cancel')">
        Cancel
      </v-btn>
      <v-spacer />
      <v-btn right color="green" @click="$emit('select', item)">
        Select Archetype
      </v-btn>
    </v-card-actions>
  </v-card>
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
      default: () => [],
    },
    psychicPowers: {
      type: Array,
      required: false,
      default: () => [],
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
      psychicPowersDiscount: [],
    };
  },
  mounted() {

    const featuresWithPowers = this.item.archetypeFeatures.filter( (f) => f.psychicPowers !== undefined);
    if ( featuresWithPowers ) {
      featuresWithPowers.forEach( (feature) => {
        feature.psychicPowers.forEach( (powerSelections) => {
          this.getPsychicPowerOptions(powerSelections);
          const found = this.psychicPowers.find( (p) => p.source && p.source === `archetype.${powerSelections.name}`);
          if ( found ) {
            console.info(`Power ${found.name} found for the archetype feature ${feature.name} / power ${powerSelections.name}.`);
            powerSelections.selected = found.name;
          }
        });
      });
    }

    const featuresWithOptions = this.item.archetypeFeatures.filter( (f) => f.options !== undefined);
    if ( featuresWithOptions && this.manageMode ) {
      featuresWithOptions.forEach((feature) => {

        // keywords
        const found = this.keywords.find((k) => k.source === `archetype.${feature.name}`);
        if (found) {
          feature.options.forEach((options) => {
            console.info(`Keyword [${found.name}] found for the archetype feature [${feature.name}].`);
            feature.selected = found.name;
          });
        }


      });
    }
  },
  computed: {
    selectedKeywords() {
      const selectedKeywords = {};
      if (this.keywords) {
        this.keywords.filter((k) => (k.replacement)).forEach((r) => {
          selectedKeywords[r.name] = r.replacement;
        });
      }
      console.log(selectedKeywords);
      return selectedKeywords;
    },
    itemKeywordPlaceholders() {
      const placeholderKeywords = this.item.keywords.split(',').map((i)=>i.trim()).filter((k) => k.includes('['));

      const placeholderSet = [];

      placeholderKeywords.forEach((placeholder) => {
        let wordy = {};
        if (placeholder.toLowerCase() === '[any]') {
          const levelOneKeywords = this.keywordRepository.filter((k) => k.name.toLowerCase() !== placeholder.toLowerCase());
          wordy = { name: placeholder, options: levelOneKeywords, selected: '' };
        } else {
          const subKeywords = this.keywordSubwordRepository.filter((k) => k.placeholder.toLowerCase() === placeholder.toLowerCase());
          wordy = { name: placeholder, options: subKeywords, selected: '' };
        }
        if (this.selectedKeywords[placeholder]) {
          wordy.selected = this.selectedKeywords[placeholder];
        }
        placeholderSet.push(wordy);
      });

      return placeholderSet;
    },
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
          .map((a) => `${this.getSkillByKey(a.value).name} ${a.threshold}`)
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
  },
  methods: {
    getAvatar(key) {
      return `/img/avatars/archetype/${key}.png`;
    },
    keywordOptions(wildcard) {
      if (wildcard === '[Any]') {
        // return all but the any keyword
        return this.keywordRepository.filter((k) => k.name.toLowerCase() !== '[any]');
      }
      return this.keywordSubwordRepository.filter((k) => k.placeholder.toLowerCase() === wildcard.toLowerCase());
    },
    keywordEffect(keyword) {
      const keywordCombinedRepository = [...this.keywordSubwordRepository];
      const foundKeyword = keywordCombinedRepository.find((k) => k.name.toLowerCase() === keyword.toLowerCase());
      if (foundKeyword !== undefined) {
        return foundKeyword.effect;
      }
    },
    keywordHint(keyword, parentKeyword) {
      let foundKeyword = this.keywordCombinedRepository.find((k) => k.name.toLowerCase() === keyword.toLowerCase());
      if (foundKeyword !== undefined) {
        return foundKeyword.description;
      }

      foundKeyword = this.keywordCombinedRepository.find((k) => k.name === parentKeyword);
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
      /*
      const power = this.psychicPowersRepository.find( p => p.name === powerName );

      if ( power ) {
        return power.effect;
      }
*/
      return '';
    },
    getPsychicPowerOptions(psychicPowerSelection) {
      const config = {
        params: {
          ...psychicPowerSelection.query,
          fields: 'id,name,effect,discipline',
        },
      };

      this.$axios.get('/api/psychic-powers/', config)
      .then( (response) => {
        psychicPowerSelection.options = response.data;
      });
    },
    changeFeatureSelectedOption(feature, inx) {
      const selectedOption =  feature.options.find((option) => option.name === feature.selected[inx]);

      this.$store.commit('characters/clearCharacterEnhancementsBySource', { id: this.characterId, source: `archetype.${feature.name}.${inx}.` });
      // the option has a snippet, that is thus added as a custom ability
      if ( selectedOption.snippet ) {
        const content = {
          modifications: [{
            name: selectedOption.name,
            targetGroup: 'abilities',
            targetValue: '',
            effect: selectedOption.snippet,
          }],
          source: `archetype.${feature.name}.${inx}.${selectedOption.name}`,
        };
        this.$store.commit('characters/addCharacterModifications', { id: this.characterId, content });
      }

      // the selected option has modifications that are saved as such
      if ( selectedOption.modifications ) {
        const content = {
          modifications: selectedOption.modifications,
          source: `archetype.${feature.name}.${inx}.${selectedOption.name}`,
        };
        this.$store.commit('characters/addCharacterModifications', { id: this.characterId, content });
      }

      if ( selectedOption.keywords ) {
        const payload = { id: this.characterId, source: `archetype.${feature.name}`, cascade: true };
        this.$store.commit('characters/clearCharacterKeywordsBySource', payload);
        selectedOption.keywords.forEach( (keyword) => {
          const payload = {
            name: keyword,
            source: `archetype.${feature.name}`,
            type: 'keyword',
            replacement: undefined,
          };
          this.$store.commit('characters/addCharacterKeyword', { id: this.characterId, keyword: payload });
        });
      }

    },
    updatePsychicPowers(option) {
      const payload = { id: this.characterId, source: `archetype.${option.name}` };
      this.$store.commit('characters/clearCharacterPsychicPowersBySource', payload);
      this.$store.commit('characters/addCharacterPsychicPower', {
        id: this.characterId,
        name: option.selected,
        cost: option.free ? 0 : option.options.find((o)=>o.name === option.selected).cost,
        source: `archetype.${option.name}`,
      });
    },
  },
};
</script>

<style scoped lang="css">

</style>
