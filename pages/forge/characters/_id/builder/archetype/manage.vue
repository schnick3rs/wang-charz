<template>
  <v-row justify="center">

    <v-progress-circular v-if="!item" indeterminate color="success" size="128" width="12" />

    <v-col v-if="item" :xs="12">

      <div class="d-flex flex-no-wrap justify-space-between mb-2">
        <div>
          <h3 class="headline">{{ item.name }}</h3>
          <h4 class="subtitle-2 grey--text">{{ item.hint }}</h4>
          <v-btn
            small outlined
            color="primary"
            @click="doChangeMode"
          >
            <v-icon small>settings</v-icon>
            change archetype
          </v-btn>
        </div>
        <v-avatar size="96" tile><img :src="avatar"></v-avatar>
        <div v-if="false">
          <v-avatar size="128" tile><img :src="avatar"></v-avatar>
          <v-btn x-small text color="primary">change archetype</v-btn>
        </div>
      </div>

      <v-divider></v-divider>

      <div class="mt-2 body-2 text-justify">

        <v-alert
          v-if="item.alerts"
          v-for="(alert, index) in item.alerts"
          :key="index"
          :type="alert.type"
          class="caption"
          dense text
        >{{alert.text}}</v-alert>

        <p><strong>Tier:</strong> {{ item.tier }}</p>

        <p><strong>Species:</strong> {{ item.species.map((s)=>s.name).join(', ') }}</p>

        <p><strong>XP Cost:</strong> {{ item.cost }}, incl. Archetype ({{ item.costs.archetype }} XP) and Stats ({{ item.costs.stats }} XP)</p>

        <v-alert
          v-if="item.costs.archetype !== characterArchetypeCost"
          type="warning"
          class="caption ml-4 mr-4"
          dense outlined border="left"
        >
          <p>
            It seems that the cost that you payed for this archetype ({{characterArchetypeCost}} XP) are not in line with the latest Errata ({{item.costs.archetype}} XP). This will probably <strong>free up {{ characterArchetypeCost - item.costs.archetype }} XP</strong>.
          </p>
          <v-btn color="success" @click="updateArchetypeCost()">Update XP Cost</v-btn>
        </v-alert>

        <v-divider class="mb-2"></v-divider>

        <p v-if="attributePrerequisites"><strong>Attributes:</strong> {{ attributePrerequisites }}</p>

        <p v-if="(skillPrerequisites && skillPrerequisites.length > 0) || item.prerequisitesSkillString">
          <strong>Skills:</strong>
          <span v-for="(skill, index) in skillPrerequisites">
            {{ skill.name }} {{ skill.threshold }}<!--
            <v-icon x-small color="success" v-if="skill.fulfilled">check_circle</v-icon>
            <v-icon x-small color="warning" v-else-if="!skill.fulfilled">check_circle</v-icon>
            -->{{ index < skillPrerequisites.length-1 ? ', ' : '' }}
          </span>
          <span v-if="item.prerequisitesSkillString">{{item.prerequisitesSkillString}}</span>
        </p>

        <p v-if="item.influence && item.influence != 0">
          <strong>Influence Modifier: </strong>
          {{ `${item.influence > 0 ? '+' : ''}${item.influence}` }}
        </p>

        <p>
          <strong>Keywords: </strong>
          <span style="text-transform: uppercase; color: #F44336;" v-if="item.keywords">{{ item.keywords.split(',').map((i)=>i.trim()).join(', ') }}</span>
          <span v-else>none</span>
        </p>

        <div
          v-for="placeholder in itemKeywordPlaceholders"
          :key="placeholder.key"
          class="ml-4 mr-4"
        >
          <v-select
            v-model="placeholder.selected"
            :label="placeholder.name +' Keyword'"
            :items="placeholder.options"
            item-text="name"
            item-value="name"
            persistent-hint
            :hint="keywordHint(placeholder.selected, placeholder)"
            solo
            dense
            @change="updateKeyword(placeholder, placeholder.selected)"
          >
            <template v-slot:item="data">
              <v-list-item-content>
                <v-list-item-title v-html="data.item.name"></v-list-item-title>
                <v-list-item-subtitle v-if="data.item.description">{{data.item.description}}</v-list-item-subtitle>
                <v-list-item-subtitle v-if="data.item.effect">{{data.item.effect}}</v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </v-select>

          <p
            v-if="selectedKeywords[placeholder.name] && keywordEffect(selectedKeywords[placeholder.name])"
            class="ma-4"
          >
            <strong>Effect: </strong>{{ keywordEffect(selectedKeywords[placeholder.name]) }}
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
              v-if="feature.alerts"
              v-for="(alert, index) in feature.alerts"
              :key="index"
              :type="alert.type"
              dense
              text
            >{{alert.text}}</v-alert>
          </div>

          <div
            v-if="feature.options && feature.options.length > 0"
            class="ml-4 mr-4"
          >
            <div v-for="inx in feature.selected.length">
              <v-select
                :items="feature.options"
                v-model="feature.selected[inx-1]"
                item-value="name"
                item-text="name"
                @change="changeSelectedOption(feature, inx-1)"
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

          <!-- features with CORRUPTION -->
          <div v-if="feature.corruption">
            <!-- corruption: { static: 0, diceCount: 1, diceSides: 3, multiply: 1 }, -->
            {{ feature.corruption }}
            <v-text-field
              type="number"
              dense solo
              style="width: 50%;"
              prepend-icon="filter_none"
              @click:prepend="rollCorruption(feature.corruption, feature)"
            ></v-text-field>
          </div>

          <div v-if="feature.psychicPowers">

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

        <!-- Wargear -->
        <div>
          <strong>Wargear</strong>
          <p>{{ wargearText }}</p>
        </div>
        <v-alert text border-left dense type="info" class="caption ml-4 mr-4">
          You can add your (starting) equipment in the <em>6. Wargear</em> section.
        </v-alert>

        <v-divider class="mb-4" v-if="suggestedSkills"></v-divider>

        <div v-if="suggestedSkills">
          <p><strong>Suggested Skills:</strong>
            <span v-for="(skill, index) in suggestedSkills">
            {{ skill.name }} {{ skill.threshold }}<v-icon x-small color="success" v-if="skill.fulfilled">check_circle</v-icon>{{ index < suggestedSkills.length-1 ? ', ' : '' }}
            </span>
          </p>
          <v-btn :disabled="!suggestedSkills.find((s) => s.fulfilled === false)" x-small @click="learnSuggestedSkills">Learn suggested Skills.</v-btn>
        </div>


      </div>

    </v-col>

  </v-row>
</template>

<script>
import ArchetypePreview from '~/components/forge/ArchetypePreview';
import CharacterCreationMixin from '~/mixins/CharacterCreationMixin';
import SluggerMixin from '~/mixins/SluggerMixin';
import KeywordRepository from '~/mixins/KeywordRepositoryMixin';
import StatRepository from '~/mixins/StatRepositoryMixin';

export default {
  name: 'archetype-manage',
  components: { ArchetypePreview },
  mixins: [
    CharacterCreationMixin,
    SluggerMixin,
    KeywordRepository,
    StatRepository,
  ],
  asyncData({ params }) {
    return {
      characterId: params.id,
    };
  },
  data() {
    return {
      loading: false,
      item: undefined,
    };
  },
  computed: {
    characterSettingTier() {
      return this.$store.getters['characters/characterSettingTierById'](this.characterId);
    },
    characterFactionKey() {
      return this.$store.getters['characters/characterFactionKeyById'](this.characterId);
    },
    characterSpeciesLabel() {
      return this.$store.getters['characters/characterSpeciesLabelById'](this.characterId);
    },
    characterSpeciesKey(){
      return this.$store.getters['characters/characterSpeciesKeyById'](this.characterId);
    },
    characterArchetypeKey() {
      return this.$store.getters['characters/characterArchetypeKeyById'](this.characterId);
    },
    characterArchetypeCost() {
      return this.$store.getters['characters/characterArchetypeCostsById'](this.$route.params.id);
    },
    characterArchetypeLabel() {
      return this.$store.getters['characters/characterArchetypeLabelById'](this.characterId);
    },
    characterArchetypeTier() {
      return this.$store.getters['characters/characterArchetypeTierById'](this.characterId);
    },
    characterArchetypeKeywords() {
      return this.$store.getters['characters/characterArchetypeKeywordsById'](this.characterId);
    },
    characterArchetypeMimic() {
      return this.$store.getters['characters/characterArchetypeMimicById'](this.characterId);
    },
    characterAttributes() {
      return this.$store.getters['characters/characterAttributesById'](this.characterId);
    },
    characterSkills() {
      return this.$store.getters['characters/characterSkillsById'](this.characterId);
    },
    keywords() {
      return this.$store.getters['characters/characterKeywordsRawById'](this.characterId);
    },
    enhancements() {
      return this.$store.getters['characters/characterEnhancementsById'](this.characterId);
    },
    psychicPowers() {
      return this.$store.getters['characters/characterPsychicPowersById'](this.characterId);
    },
    avatar() {
      if (this.item === undefined || this.item.key === 'advanced' ) return '/img/avatar_placeholder.png';
      return `/img/avatars/archetype/${this.item.key}.png`;
    },
    attributePrerequisites() {
      if (this.item && this.item.prerequisites) {
        return this.item.prerequisites
        .filter((p) => p.group === 'attributes')
        .map((a) => `${this.getAttributeByKey(a.value).name} ${a.threshold}`)
        .join(', ');
      }
      return this.item.attributes;
    },
    skillPrerequisites() {
      if (this.item && this.item.prerequisites) {
        return this.item.prerequisites
        .filter((p) => p.group === 'skills')
        .map((a) => {
          const skill = this.getSkillByKey(a.value);
          const currentSkillValue = this.characterSkills[a.value];
          return {
            ...skill,
            threshold: a.threshold,
            fulfilled: currentSkillValue >= a.threshold ? true : false,
          };
        });
      }
      return this.item.skills;
    },
    suggestedSkills() {
      if (this.item.suggestedStats) {
        return this.item.suggestedStats
          .filter((p) => p.group === 'skills')
          .map((a) => {
            const skill = this.getSkillByKey(a.value);
            const currentSkillValue = this.characterSkills[a.value];
            return {
              ...skill,
              threshold: a.threshold,
              fulfilled: currentSkillValue >= a.threshold ? true : false,
            };
          });
      }
      return this.item.skills;
    },
    selectedKeywords() {
      const selectedKeywords = {};
      if (this.keywords) {
        this.keywords
          .filter((keyword) => keyword.source.indexOf('archetype') >= 0)
          .filter((k) => (k.replacement))
          .forEach((r) => {
          selectedKeywords[r.name] = r.replacement;
        });
      }
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
          const subKeywords = this.keywordSubwordRepository.filter((k) => k.placeholder?.toLowerCase() === placeholder.toLowerCase());
          wordy = { name: placeholder, options: subKeywords, selected: '' };
        }
        if (this.selectedKeywords[placeholder]) {
          wordy.selected = this.selectedKeywords[placeholder];
        }
        placeholderSet.push(wordy);
      });

      return placeholderSet;
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
  watch: {
    characterArchetypeKey: {
      handler(key) {
        if (key) {
          if (key === 'unknown') {
            console.info(`Found unexpected key -> ${key}`);
            return;
          }
          if (key === 'advanced'){
            this.loadAdvancedArchetype();
            return;
          }
          this.loadArchetype(key);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
  },
  methods: {
    async loadAdvancedArchetype(){
      this.loading = true;
      console.info(`loading advanced character pseudo archetype...`);
      let cost = -1 * this.characterSettingTier * 10;
      const mimic = this.characterArchetypeMimic;
      let data = {
        archetypeFeatures: [],
      };
      if (mimic) {
        const response = await this.$axios.get(`/api/archetypes/${this.characterArchetypeMimic}`);
        data = response.data;
        cost += data.tier * 10;
      }
      let advancedArchetype = {
        // source:
        key: `advanced`,
        name: this.characterArchetypeLabel,
        hint: 'Created using Advanced Character creation.',
        cost: cost,
        costs: {
          total: cost,
          archetype: cost,
          stats: 0,
          species: 0,
          other: 0,
        },
        tier: this.characterArchetypeTier,
        faction: this.characterFactionKey.toLowerCase(),
        factionKey: this.characterFactionKey,
        species: [
          {
            name: this.characterSpeciesLabel,
            key: this.characterSpeciesKey,
            sourceKey: 'core',
          },
        ],
        wargearString: this.getAdvancedWargearOptionByTier(this.characterArchetypeTier).wargearString,
        prerequisites: [],
        archetypeFeatures: data.archetypeFeatures,
        influence: 0,
        keywords: this.characterArchetypeKeywords.join(','),
      };
      advancedArchetype = this.enrichArchetypeFeatures(advancedArchetype);
      this.item = advancedArchetype;
      this.loading = false;
    },
    async loadArchetype(key) {
      this.loading = true;

      let finalData = {};
      const { data } = await this.$axios.get(`/api/archetypes/${key}`);
      finalData = data;

      finalData = this.enrichArchetypeFeatures(finalData);

      this.item = finalData;
      this.loading = false;
    },
    enrichArchetypeFeatures(archetype){
      archetype.archetypeFeatures
      .filter((feature) => feature.options)
      .forEach((feature) => {
        const enhancements = this.enhancements.filter((modifier) => modifier.source.startsWith(`archetype.${feature.name}`) );
        if (enhancements) {
          enhancements.forEach((e) => {
            let foundInd = /\.(\d)\./.exec(e.source);
            if (foundInd) {
              feature.selected[foundInd[1]] = e.source.split('.').pop();
            }
          });
        } else {
          const enhancement = this.enhancements.find((modifier) => modifier.source.startsWith(`archetype.${feature.name}`) );
          if ( enhancement ) {
            feature.selected = enhancement.source.split('.').pop();
          }
        }
      });

      const featuresWithPowers = archetype.archetypeFeatures.filter( (f) => f.psychicPowers !== undefined);
      if ( featuresWithPowers ) {
        featuresWithPowers.forEach( (feature) => {
          feature.psychicPowers.forEach( (powerSelections) => {
            this.getPsychicPowerOptions(powerSelections);
            const found = this.psychicPowers.find( (p) => p.source && p.source === `archetype.${powerSelections.name}`);
            if ( found ) {
              console.info(`Power ${found.name} found for the archetype feature ${feature.name} / power ${powerSelections.name}.`);
              powerSelections.selected = found.name;
            } else {
              console.warn(`No Power found for ${powerSelections.name}.`)
            }
          });
        });
      }

      return archetype;
    },
    doChangeMode() {
      this.$router.push({
        name: 'forge-characters-id-builder-archetype-choose',
        params: { id: this.characterId },
      });
    },

    updateArchetypeCost() {
      const id = this.characterId;
      const cost = this.item.costs.archetype;
      this.$store.commit('characters/setCharacterArchetypeCost', { id, cost });
    },

    /** Keywords */
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
    changeSelectedOption(feature, inx) {
      const selectedOption =  feature.options.find( (o) => o.name === feature.selected[inx] );

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
    learnSuggestedSkills() {
      const archetype = this.item;

      if (this.item.suggestedStats) {
        this.item.suggestedStats
          .filter((p) => p.group === 'skills')
          .forEach((suggestedSkill) => {
          // { group: 'attributes', value: 'willpower', threshold: 3, }
          const skillValue = this.characterSkills[suggestedSkill.value];
          if (skillValue < suggestedSkill.threshold) {
            this.$store.commit('characters/setCharacterSkill', { id: this.characterId, payload: { key: suggestedSkill.value, value: suggestedSkill.threshold } });
          }
        });
      }
    },
    rollCorruption(config, feature) {
      // config: { static: 0, diceCount: 1, diceSides: 3, multiply: 1 },
      const randomDice = config.static + this.diceRoll(config.diceSides) * config.multiply;
      console.log(`Rolled ${randomDice}...`);

      const id = this.characterId;
      const source = `archetype.${feature.name}`;
      const content = {
        modifications: [{
          targetGroup: 'traits',
          targetValue: 'corruption',
          modifier: parseInt(randomDice),
        }],
        source,
      };
      this.$store.commit('characters/clearCharacterEnhancementsBySource', { id, source });
      this.$store.commit('characters/addCharacterModifications', { id, content });
    },
    diceRoll(sides) {
      return Math.floor(Math.random() * sides) + 1;
    }
  },
};
</script>

<style scoped>

</style>
