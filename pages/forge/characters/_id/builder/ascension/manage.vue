<template>
  <v-row justify="center">

    <v-col>
      <h1 class="headline">
        Manage Ascension Package(s)
      </h1>
    </v-col>

    <v-col
      v-if="characterAscensionPackages.length > 0"
      :cols="12"
    >
      <v-card
        v-for="characterAscension in characterAscensionPackages"
        :key="characterAscension.key"
        class="mb-2"
      >
        <div class="d-flex flex-no-wrap justify-space-between">

          <div>
            <v-card-title
              class="headline"
              v-text="characterAscension.name"
            ></v-card-title>
            <v-card-subtitle v-text="characterAscension.teaser"></v-card-subtitle>
            <v-btn
              small
              text
              color="red"
              @click="removePackage(characterAscension)"
            >
              <v-icon left>
                remove_circle
              </v-icon>
              remove package
            </v-btn>
          </div>

            <v-avatar
              class="ma-2"
              size="100"
              tile
            >
              <img :alt="characterAscension.name" :src="`/img/avatars/ascension/${characterAscension.key}.png`" />
            </v-avatar>
        </div>

        <v-card-text>
          <p class="text-lg-justify">
            <strong>Ascended Tier: </strong>{{ characterAscension.sourceTier }} -> {{ characterAscension.targetTier }}
          </p>
          <p class="text-lg-justify">
            <strong>Build Point Cost: </strong>
            {{ (characterAscension.targetTier * characterAscension.costPerTier) + characterAscension.cost }}
            <span v-if="characterAscension.costPerTier > 0">(New Tier x {{ characterAscension.costPerTier }})</span>
          </p>

          <div v-if="characterAscension.prerequisites && characterAscension.prerequisites.length > 0">
            <span class="mt-2 grey--text">Prerequisites</span>
            <v-divider class="mb-2" />

            <ul class="text-lg-justify mb-4">
              <li v-for="prerequisite in characterAscension.prerequisites">{{prerequisite}}</li>
            </ul>
          </div>

          <span class="mt-2 grey--text">Benefits</span>
          <v-divider class="mb-2" />

          <p class="text-lg-justify">
            <strong>Influence Bonus: </strong>
            {{ (characterAscension.influencePerTier * (characterAscension.targetTier - characterAscension.sourceTier)) + characterAscension.influenceBonus }}
            <span v-if="characterAscension.influencePerTier > 0">( {{ characterAscension.influencePerTier }} per tier ascended)</span>
          </p>

          <div
            v-if="characterAscension.ascensionFeatures"
            v-for="feature in characterAscension.ascensionFeatures"
            class="text-lg-justify"
          >
            <strong>{{ feature.name }}</strong>
            <div v-if="feature.description" v-html="feature.description"></div>
            <p v-else>{{ feature.snippet }}</p>

            <!-- keyword with <> Keyword choice -->
            <div
              class="ml-2 mr-2"
              v-if="keywordPlaceholders(feature).length > 0"
              v-for="placeholder in keywordPlaceholders(feature)"
              :key="placeholder.key"
            >
              <v-select
                v-model="placeholder.selected"
                :label="` Choose ${placeholder.name} Keyword`"
                :items="placeholder.options"
                :hint="keywordHint(placeholder.selected, placeholder)"
                item-text="name"
                item-value="name"
                persistent-hint
                solo
                dense
                @change="updateKeyword(placeholder, placeholder.selected, characterAscension, feature)"
              />

              <p v-if="selectedKeywords[placeholder.name]" class="ma-4" >
                {{ keywordEffect(selectedKeywords[placeholder.name]) }}
              </p>

            </div>

            <!-- feature with spells -->
            <div class="ml-2 mr-2" v-if="feature.psychicPowers">

              <div
                v-for="powerOption in feature.psychicPowers"
                class="ml-2 mr-2"
              >
                <v-select
                  v-if="powerOption.query && !powerOption.query.name"
                  v-model="powerOption.selected"
                  :items="computeSpellOptions(powerOption)"
                  item-value="name"
                  item-text="name"
                  :hint="psychicPowerHint(powerOption.selected)"
                  persistent-hint
                  @change="setFeaturePowersChoice($event, characterAscension, feature, powerOption)"
                  v-show="!(powerOption.requiredAscendedTiers && (characterAscension.targetTier - characterAscension.sourceTier) < powerOption.requiredAscendedTiers)"
                  dense
                  solo
                />
                <v-checkbox
                  v-else
                  class="mb-4"
                  v-model="powerOption.query.name"
                  :label="powerOption.query.name"
                  :hint="psychicPowerHint(powerOption.query.name)"
                  persistent-hint
                  dense
                  disabled
                ></v-checkbox>

              </div>
            </div>

            <!-- feature with wargear -->
            <div
              v-if="feature.wargear && feature.wargear.length > 0"
            >
              <!-- features wargear options -->
              <div
                v-for="wargearOption in feature.wargear.filter((w) => w.options)"
                :key="wargearOption.key"
              >
                <wargear-select
                  :item="wargearOption.selected"
                  :repository="computeWargearOptionsByFilter(wargearOption.options[0], characterAscension)"
                  class="mb-4"
                  @input="setFeatureWargearChoice($event, characterAscension, feature, wargearOption.key)"
                />
              </div>
            </div>

            <!-- Feature with Options -->
            <div class="ml-2 mr-2" v-if="feature.options && feature.options.length > 0">

              <v-select
                :items="feature.options"
                v-model="feature.selected"
                item-value="key"
                item-text="name"
                @change="setFeatureOptionChoice(characterAscension, feature)"
                :placeholder="feature.optionsPlaceholder"
                dense
                solo
              ></v-select>

              <div
                v-if="feature.selected && feature.selected.length > 0 && featureOptionChoice(feature)"
                class="ml-4 mr-4"
              >
                <!-- feature text and/or description -->
                <div
                  v-if="featureOptionChoice(feature).description"
                  v-html="featureOptionChoice(feature).description"
                ></div>
                <p v-else>{{featureOptionChoice(feature).snippet}}</p>

                <!-- feature options selection -->
                <div class="ml-2 mr-2" v-if="featureOptionChoice(feature)">

                  <div
                    v-if="featureOptionChoice(feature).wargear && featureOptionChoice(feature).wargear.length > 0"
                  >
                    <!-- features options with wargear options -->
                    <div
                      v-for="wargearOption in featureOptionChoice(feature).wargear"
                      :key="wargearOption.key"
                    >
                      <wargear-select
                        :item="wargearOption.selected"
                        :repository="computeWargearOptionsByFilter(wargearOption.options[0], characterAscension)"
                        class="mb-4"
                        @input="setFeatureOptionWargearChoice($event, characterAscension, feature, wargearOption.key)"
                      />
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </v-card-text>
      </v-card>
    </v-col>

    <v-col :cols="12">
      <v-alert
        v-for="alert in alerts"
        :key="alert.key"
        :value="true"
        :type="alert.type"
        text dense
      >
        {{ alert.text }}
      </v-alert>
      <v-btn
        @click="choosePackage"
        color="success"
        text
        :disabled="effectiveCharacterTier >= settingTier"
      >
        <v-icon>add</v-icon>
        Add an Ascension Package
      </v-btn>
    </v-col>

  </v-row>

</template>

<script lang="js">
import KeywordRepositoryMixin from '~/mixins/KeywordRepositoryMixin';
import KeywordSelect from '~/components/forge/KeywordSelect.vue';
import WargearSelect from '~/components/forge/WargearSelect.vue';
import StatRepositoryMixin from '~/mixins/StatRepositoryMixin';
import WargearMixin from '~/mixins/WargearMixin';

export default {
  name: 'ascension-manage',
  components: { KeywordSelect, WargearSelect },
  mixins: [
    KeywordRepositoryMixin,
    StatRepositoryMixin,
    WargearMixin,
  ],
  async asyncData({ params, $axios, error }) {
    const wargearResponse = await $axios.get('/api/wargear/');
    const powersResponse = await $axios.get('/api/psychic-powers/?fields=id,name,effect,discipline,cost');
    const archetypeResponse = await $axios.get('/api/archetypes/?source=core,coreab');
    return {
      characterId: params.id,
      archetypeRepository: archetypeResponse.data,
      psychicPowersRepository: powersResponse.data,
      wargearRepository: wargearResponse.data,
    };
  },
  data() {
    return {
      ascensionPackagesRepository: undefined,
      wargearList: undefined,
      psychicPowerList: undefined,
      //ascensionPackagesList: undefined,
    };
  },
  computed: {
    sources() {
      return [
        'core',
        'fspg',
        'red1',
        'cos',
        // 'tnh',
        ...this.settingHomebrews
      ];
    },
    settingTier() {
      return this.$store.getters['characters/characterSettingTierById'](this.characterId);
    },
    effectiveCharacterTier() {
      return this.$store.getters['characters/characterEffectiveTierById'](this.characterId);
    },
    alerts() {
      const alerts = [];
      if (!this.characterArchetypeLabel) {
        alerts.push({ type: 'warning', text: 'You need to select an Archetype first.' });
      }
      if (this.effectiveCharacterTier >= this.settingTier) {
        alerts.push({ type: 'warning', text: 'Your character already has reached a tier sufficient for the Campaign Tier.' });
      }
      return alerts;
    },
    settingHomebrews() {
      return this.$store.getters['characters/characterSettingHomebrewsById'](this.characterId);
    },
    characterArchetypeLabel() {
      return this.$store.getters['characters/characterArchetypeLabelById'](this.characterId);
    },
    characterWargear() {
      return this.$store.getters['characters/characterWargearById'](this.characterId);
    },
    characterPsychicPowers() {
      return this.$store.getters['characters/characterPsychicPowersById'](this.characterId);
    },
    keywords() {
      return this.$store.getters['characters/characterKeywordsRawById'](this.characterId);
    },
    enhancements() {
      return this.$store.getters['characters/characterEnhancementsById'](this.characterId);
    },
    finalKeywords() {
      return this.$store.getters['characters/characterKeywordsFinalById'](this.characterId);
    },
    selectedKeywords() {
      const selectedKeywords = {};
      if (this.keywords) {
        this.keywords
          .filter((k) => k.source.indexOf('ascension') >= 0)
          .filter((k) => (k.replacement))
          .forEach((r) => {
            selectedKeywords[r.name] = r.replacement;
        });
      }
      console.log(selectedKeywords);
      return selectedKeywords;
    },
    characterSelectedPackages() {
      return this.$store.getters['characters/characterAscensionPackagesById'](this.characterId);
    },
    characterAscensionPackages() {
      if ( !this.characterSelectedPackages || this.characterSelectedPackages.length <= 0 ) return [];
      if ( !this.ascensionPackagesRepository || this.ascensionPackagesRepository.length <= 0 ) return [];

      return this.characterSelectedPackages.map((ascensionPackage) => {

        const characterPackage = this.ascensionPackagesRepository.find((j) => j.key === ascensionPackage.key);

        characterPackage.sourceTier = ascensionPackage.sourceTier;
        characterPackage.targetTier = ascensionPackage.targetTier;
        characterPackage.featureChoices = ascensionPackage.featureChoices;

        // Prerequisites
        if (false && this.characterArchetypeLabel && this.archetypeRepository) {
          const archetype = this.archetypeRepository.find((archetype) => archetype.name === this.characterArchetypeLabel);
          if (archetype && archetype.prerequisites && archetype.prerequisites.length > 0) {
            let effPreq = [];
            const ascensionPrerequisites = characterPackage.prerequisites(archetype.prerequisites);
            effPreq = ascensionPrerequisites.map( (p) => {
              return {
                ...p,
                name: p.group === 'attributes' ? this.getAttributeByKey(p.value).name : this.getSkillByKey(p.value).name,
              };
            });
            characterPackage.effectivePrerequisites = effPreq;
          }
        }

        const packageKeyword = this.keywords.find((k) => k.source.startsWith(`ascension.${characterPackage.key}`));
        if (packageKeyword && packageKeyword.replacement) {
          characterPackage.selected = packageKeyword.replacement;
        } else {
          characterPackage.selected = '';
        }

        // selected psychic powers
        characterPackage.ascensionFeatures
        .filter((feature) => feature.psychicPowers)
        .forEach((featureWithPowers) => {
          const sourcePrefix = `ascension.${characterPackage.key}.${featureWithPowers.key}`;
          const associatedPsychicPowers = this.characterPsychicPowers.filter((psychicPower) => psychicPower.source && psychicPower.source.startsWith(sourcePrefix));

          if (associatedPsychicPowers) {
            featureWithPowers.psychicPowers.forEach((power) => {
                const powerFound = associatedPsychicPowers.find((a) => a.source.endsWith(power.key));
              power.selected = powerFound ? powerFound.name : '';
            });
          }
        });

        // selected wargear
        characterPackage.ascensionFeatures
        .filter((feature) => feature.wargear)
        .forEach((featureWithWargear) => {
          const sourcePrefix = `ascension.${characterPackage.key}.${featureWithWargear.key}`;
          const associatedGear = this.characterWargear.filter((gear) => gear.source && gear.source.startsWith(sourcePrefix));

          if (associatedGear) {
            const wargearWithOptions = featureWithWargear.wargear.filter((w) => w.options);
            wargearWithOptions.forEach((w) => {
              const gearFound = associatedGear.find((a) => a.source.endsWith(w.key));
              w.selected = gearFound ? gearFound.name : '';
            });
          }
        });

        // set selected fields for feature with options
        characterPackage.ascensionFeatures
        .filter((feature) => feature.options)
        .forEach((featureWithOptions) => {

          // generic setting
          const featureKey = characterPackage.featureChoices ? characterPackage.featureChoices[featureWithOptions.name] : false;
          if ( featureKey ) {
            featureWithOptions.selected = characterPackage.featureChoices[featureWithOptions.name];
          }

          // ToDo remove
          const enhancement = this.enhancements.find((m) => m.source.startsWith(`ascension.${characterPackage.key}.${featureWithOptions.key}`) );
          if ( enhancement ) {
            featureWithOptions.selected = enhancement.source.split('.').pop();
          }

          // selected wargear
          const associatedGear = this.characterWargear
            .filter((gear) => gear.source && gear.source.startsWith(`ascension.${characterPackage.key}.${featureWithOptions.key}`));
          if (associatedGear) {
            const optionsWithWargear = featureWithOptions.options.filter((f)=>f.wargear);
            optionsWithWargear.forEach((o) => {
              o.wargear.forEach((w) => {
                const gearFound = associatedGear.find((a) => a.source.endsWith(w.key));
                w.selected = gearFound ? gearFound.name : '';
              })
            });
          }

        });

        return characterPackage;
      });
    },
    characterAscensionKeywordPlaceholders() {
      const placeholderSet = [];

      const placeholderKeywords = this.item.keywords.split(',').filter((k) => k.includes('['));
      placeholderKeywords.forEach((placeholder) => {
        let wordy = {};
        if (placeholder.toLowerCase() === '[any]') {
          const levelOneKeywords = this.keywordRepository.filter((k) => k.name.toLowerCase() !== placeholder.toLowerCase());
          wordy = { name: placeholder, options: levelOneKeywords, selected: '' };
        } else {
          const subKeywords = this.keywordSubwordRepository.filter((k) => k.placeholder === placeholder);
          wordy = { name: placeholder, options: subKeywords, selected: '' };
        }
        placeholderSet.push(wordy);
      });

      return placeholderSet;
    },
  },
  watch: {
    characterSelectedPackages: {
      handler(newVal) {
        if (newVal && newVal !== 'unknown') {
          this.getAscensionPackageList(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
    sources: {
      handler(newVal) {
        if (newVal) {
          this.getWargearList(newVal);
          this.getPsychicPowers(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
  },
  methods: {
    async getAscensionPackageList(ascensionList) {
      let packages = [];
      if ( ascensionList.length > 0 ){
        for (const ascension of ascensionList) {
          const { data } = await this.$axios.get(`/api/ascension-packages/${ascension.key}`);
          packages.push(data);
        }
      }
      this.ascensionPackagesRepository = packages;
    },
    async getWargearList(sources) {
      const config = {
        params: {
          source: sources.join(','),
        },
      };
      const { data } = await this.$axios.get('/api/wargear/', config);
      this.wargearList = data.filter((i) => i.stub === undefined || i.stub === false);
    },
    async getPsychicPowers(sources) {
      const config = {
        params: {
          source: this.sources.join(','),
          fields: 'id,name,effect,discipline,cost',
        },
      };
      const { data } = await this.$axios.get('/api/psychic-powers/', config);
      this.psychicPowerList = data;
    },

    choosePackage(){
      this.$router.push({
        name: 'forge-characters-id-builder-ascension-choose',
        params: { id: this.characterId },
      });
    },

    updateKeyword(placeholder, selected, ascension, feature) {
      console.log(`selected ${selected} for ${placeholder.name}`);
      const id = this.characterId;

      this.$store.commit('characters/replaceCharacterKeywordPlaceholder', {
        id,
        // the name of the keyword to be replaced
        placeholder: placeholder.name,
        // the new selected choice
        replacement: selected,
        // the source of the keyword
        source: `ascension.${ascension.key}.${feature.key}`,
      });

      placeholder.selected = selected;
    },

    /**
     * @param modificationList [ {} ]
     */
    updateAscensionPackageStoryElement(choiceValue, ascensionObject) {
      const storyElementOption = ascensionObject.storyElementOptions.find((o) => o.key === choiceValue);
      const content = {
        modifications: [storyElementOption.modifications[0]],
        source: `ascension.${ascensionObject.key}.storyElement`,
      };
      this.$store.commit('characters/setCharacterModifications', { id: this.characterId, content: content });
      const storyPayload = {
        id: this.characterId,
        ascensionPackageKey: ascensionObject.key,
        ascensionPackageTargetTier: ascensionObject.targetTier,
        ascensionPackageStoryElementKey: storyElementOption.key,
      };
      this.$store.commit('characters/setCharacterAscensionPackageStoryElement', storyPayload);
    },
    setFeatureWargearChoice(item, ascension, feature, wargearOptionKey) {
      const id = this.characterId;
      const name = item.name;
      const source = `ascension.${ascension.key}.${feature.key}.${wargearOptionKey}`;

      this.$store.commit('characters/removeCharacterWargearBySource', { id, source });
      this.$store.commit('characters/addCharacterWargear', { id, name, source });
    },
    setFeatureOptionWargearChoice(item, ascension, feature, wargearOptionKey) {
      const id = this.characterId;
      const name = item.name;
      const source = `ascension.${ascension.key}.${feature.key}.${feature.selected}.${wargearOptionKey}`;

      this.$store.commit('characters/removeCharacterWargearBySource', { id, source });
      this.$store.commit('characters/addCharacterWargear', { id, name, source });
    },
    removePackage(ascensionPackage) {
      const id = this.characterId;
      const payload = {
        id,
        value: ascensionPackage.name,
        key: ascensionPackage.key,
        sourceTier: ascensionPackage.sourceTier,
        targetTier: ascensionPackage.targetTier,
      };
      this.$store.dispatch('characters/clearCharacterAscensionPackage', payload);
    },
    keywordOptions(wildcard) {
      if (wildcard === '[Any]') {
        // return all but the any keyword
        return this.keywordRepository.filter((k) => k.name !== '[Any]');
      }
      return this.keywordRepository.filter((k) => k.name === wildcard);
    },
    subKeywordOptions(placeholder) {
      return this.keywordSubwordRepository.filter((k) => k.placeholder === placeholder);
    },
    psychicPowerHint(powerName) {
      const power = this.psychicPowersRepository.find((p) => p.name === powerName);

      if (power) {
        return power.effect;
      }

      return '';
    },

    // @change="setFeaturePowersChoice($event, characterAscension, feature, powerOption.key)"
    setFeaturePowersChoice(powerName, ascension, feature, option) {
      const id = this.characterId;
      const source = `ascension.${ascension.key}.${feature.key}.${option.key}`;
      const cost = 0;
      const name = powerName;
      this.$store.commit('characters/clearCharacterPsychicPowersBySource', { id, source });
      this.$store.commit('characters/addCharacterPsychicPower', { id, name, cost, source });
    },
    keywordPlaceholders(feature) {
      let placeholderKeywords = [];

      if ( feature.modifications ) {

        placeholderKeywords = feature.modifications
          // only keyword modifications
          .filter((modification) => modification.targetGroup === 'keywords')
          // reduce to keyword string
          .map((modification) => modification.targetValue)
          // filter placeholder keywords
          .filter((keyword) => keyword.includes('['))
          // map to placeholder object
          .map((placeholder) => {
            let wordy = {};
            if (placeholder.toLowerCase() === '[any]') {
              const levelOneKeywords = this.keywordRepository.filter((k) => k.name.toLowerCase() !== placeholder.toLowerCase());
              wordy = { name: placeholder, options: levelOneKeywords, selected: '' };
            } else {
              const subKeywords = this.keywordSubwordRepository.filter((k) => k.placeholder === placeholder);
              wordy = { name: placeholder, options: subKeywords, selected: '' };
            }

            if (this.selectedKeywords[placeholder]) {
              wordy.selected = this.selectedKeywords[placeholder];
            }

            return wordy;
          });
      }
      return placeholderKeywords;
    },
    keywordHint(keyword, parentKeyword) {
      let foundKeyword = this.keywordCombinedRepository.find((k) => k.name === keyword);
      if (foundKeyword !== undefined) {
        return foundKeyword.description;
      }

      foundKeyword = this.keywordCombinedRepository.find((k) => k.name === parentKeyword);
      if (foundKeyword !== undefined) {
        return foundKeyword.description;
      }

      return '';
    },
    keywordEffect(keyword) {
      const keywordCombinedRepository = [...this.keywordSubwordRepository];
      const foundKeyword = keywordCombinedRepository.find((k) => k.name === keyword);
      if (foundKeyword !== undefined) {
        return foundKeyword.effect;
      }
    },

    computeSpellOptions(powerOption) {
      const { name, discipline } = powerOption.query;
      let items = [];
      if (this.psychicPowerList) {
        this.psychicPowerList
        .filter((power) => {
            let validName = name ? power.name === name : true;
            let validDiscipline = discipline ? power.discipline === discipline : true;
            return validName && validDiscipline;
        })
        .forEach((validPower) => {
          items.push(validPower);
        });
      }
      return items;
    },

    /**
     *
     * @param ascension
     * @param feature
     * @param type
     */
    setFeatureOptionChoice(ascension, feature, type = 'ascension') {
      const id = this.characterId;
      const sourcePrefix = `${type}.${ascension.key}.${feature.key}`;
      const selectedOption =  feature.options.find( (o) => o.key === feature.selected );

      console.log(`Set choice for ${feature.name} -> ${selectedOption.name}`);

      const ascensionFeatureOptionChoicePayload = {
        id: this.characterId,
        ascensionPackageKey: ascension.key,
        ascensionPackageTargetTier: ascension.targetTier,
        ascensionPackageFeatureName: feature.name,
        ascensionPackageFeatureOptionChoiceKey: selectedOption.key,
      };
      this.$store.commit('characters/setCharacterAscensionPackageWargearOption', ascensionFeatureOptionChoicePayload);

      this.$store.commit('characters/clearCharacterEnhancementsBySource', { id, source: `${sourcePrefix}` });

      // the option has a snippet, that is thus added as a custom ability
      if ( selectedOption.snippet ) {
        const content = {
          modifications: [{
            name: selectedOption.name,
            targetGroup: 'abilities',
            targetValue: '',
            effect: selectedOption.snippet,
          }],
          source: `${sourcePrefix}.${selectedOption.key}`,
        };
        this.$store.commit('characters/addCharacterModifications', { id, content });
      }

      // the selected option has modifications that are saved as such
      if ( selectedOption.modifications ) {
        const ascendedTiers = ascension.targetTier - ascension.sourceTier;
        const modz = selectedOption.modifications
          .filter((mod) => {
            if (mod.requiredAscendedTiers === undefined) return true;
            if (mod.requiredAscendedTiers <= ascendedTiers) return true;
          })
          .map((mod) => {
            return {
              name: `${feature.name} • ${selectedOption.name}`,
              ascendedTiers,
              ...mod,
            }
          });
        const content = {
          modifications: modz,
          source: `${sourcePrefix}.${selectedOption.key}`,
        };
        this.$store.commit('characters/addCharacterModifications', { id, content });
      }
    },
    featureOptionChoice(feature){
      return feature.options.find((o)=>o.key === feature.selected);
    },
    computeWargearOptionsByFilter(filter, ascension = {targetTier:0}) {
      return this.wargearList ? this.filterWargear(this.wargearList, filter, this.settingTier, ascension) : [];
    },
  },
}
</script>

<style scoped lang="scss">
</style>
