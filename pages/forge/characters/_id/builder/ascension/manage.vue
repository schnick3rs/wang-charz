<template>
  <v-row justify="center">

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

          <span class="mt-2 grey--text">Prerequisites</span>
          <v-divider class="mb-2" />

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

            <div
              v-if="keywordPlaceholders(feature).length > 0"
              v-for="placeholder in keywordPlaceholders(feature)"
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
                @change="updateKeyword(placeholder, placeholder.selected, characterAscension, feature)"
              />

              <p v-if="selectedKeywords[placeholder.name]" class="ma-4" >
                {{ keywordEffect(selectedKeywords[placeholder.name]) }}
              </p>

            </div>

            <div v-if="feature.options && feature.options.length > 0">

              <v-select
                :items="feature.options"
                v-model="feature.selected"
                item-value="key"
                item-text="name"
                @change="setFeatureOptionChoice(characterAscension, feature)"
                dense
                solo
              ></v-select>

              <div
                v-if="feature.selected && feature.selected.length > 0"
                class="ml-4 mr-4"
              >
                <!-- feature text and/or description -->
                <div
                  v-if="featureOptionChoice(feature).description"
                  v-html="featureOptionChoice(feature).description"
                ></div>
                <p v-else>{{featureOptionChoice(feature).snippet}}</p>

                <!-- feature options selection -->
                <div class="ml-2 mr-2">

                  <div
                    v-if="featureOptionChoice(feature) && featureOptionChoice(feature).wargear && featureOptionChoice(feature).wargear.length > 0"
                  >
                    <div
                      v-for="wargearOption in featureOptionChoice(feature).wargear"
                      :key="wargearOption.key"
                    >
                      wargearOption.selected::{{wargearOption.selected}}
                      <wargear-select
                        :item="wargearOption.selected"
                        :repository="computeWargearOptionsByFilter(wargearOption.options[0], characterAscension)"
                        class="mb-4"
                        @input="setFeatureOptionWargearChoice($event, characterAscension, feature, wargearOption.key)"
                      />
                      <!--@input="updateAscensionPackageWargearOptionChoice($event.payload[0], wargearOption.key, characterAscension)"-->
                    </div>

                  </div>

                  <!--
                  <v-select
                    v-model="featureOptionChoice(feature).selected"
                    :items="characterAscension.wargearOptions"
                    item-text="text"
                    item-value="key"
                    label="Wargear Options"
                    solo
                    dense
                  />
                  -->
                  <!--@input="updateAscensionPackageWargearOption($event, characterAscension)"-->

                  <!--
                  <div
                    v-if="characterAscension.wargearChoice"
                    class="ml-2 mr-2"
                  >
                    <div
                      v-for="selectItem in characterAscension.wargearOptions.find( o => o.key === characterAscension.wargearChoice ).selectList"
                      :key="selectItem.key"
                    >
                      <wargear-select
                        :item="selectItem.itemChoice"
                        :repository="wargearRepository.filter(selectItem.query(characterAscension.targetTier))"
                        class="mb-4"
                        @input="updateAscensionPackageWargearOptionChoice($event.name, selectItem.key, characterAscension)"
                      />
                    </div>
                  </div>
                  -->
                </div>

              </div>

            </div>

          </div>

        </v-card-text>
      </v-card>
    </v-col>

    <v-col>
      <v-btn
        @click="choosePackage"
        color="success"
        text
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

export default {
  name: 'ascension-manage',
  components: { KeywordSelect, WargearSelect },
  mixins: [
    KeywordRepositoryMixin,
    StatRepositoryMixin,
  ],
  async asyncData({ params, $axios, error }) {
    const wargearResponse = await $axios.get('/api/wargear/');
    const powersResponse = await $axios.get('/api/psychic-powers/?fields=id,name,effect,discipline&discipline=Minor,Universal');
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
      //ascensionPackagesList: undefined,
    };
  },
  computed: {
    sources() {
      return [
        'core',
        'coreab',
        ...this.settingHomebrews
      ];
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
        this.keywords.filter((k) => (k.replacement)).forEach((r) => {
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

        const packageKeyword = this.keywords.find((k) => k.source === `ascension.${characterPackage.key}`);
        if (packageKeyword && packageKeyword.replacement) {
          characterPackage.selected = packageKeyword.replacement;
        } else {
          characterPackage.selected = '';
        }

        /**
         * Enrich the spell options with the selected ones. We fetch the psychic powers and check for matching sources.
         */
        if (characterPackage.storyElementOptions && characterPackage.storyElementOptions.length > 0) {
          const { storyElementOptions } = characterPackage;

          storyElementOptions.forEach((storyElementOption) => {
            if (storyElementOption.type === 'spells' && storyElementOption.discount.length > 0) {
              storyElementOption.discount.forEach((d) => {
                if (!d.selected) {
                  // ToDo
                }
              });
            }
          });
        }

        characterPackage.ascensionFeatures
        .filter((feature) => feature.options)
        .forEach((feature) => {

          const featureKey = characterPackage.featureChoices ? characterPackage.featureChoices[feature.name] : false;
          if ( featureKey ) {
            feature.selected = characterPackage.featureChoices[feature.name];
          }

          const enhancement = this.enhancements.find((m) => m.source.startsWith(`ascension.${characterPackage.key}.${feature.name}`) );
          if ( enhancement ) {
            feature.selected = enhancement.source.split('.').pop();
          }

          const gear = this.characterWargear.filter((gear) => gear.source && gear.source.startsWith(`ascension.${characterPackage.key}.${feature.name}`));
          console.info(gear)
          /*
          if (gear) {
            gear.forEach((g) => {
              characterPackage
              .wargearOptions.find((o) => o.key === characterPackage.wargearChoice)
              .selectList.find((s) => g.source.endsWith(s.key))
                .itemChoice = g.name;
            });
          }
          */

        });

        return characterPackage;
      });
    },
    characterAscensionKeywordPlaceholders() {
      const placeholderSet = [];

      const placeholderKeywords = this.item.keywords.split(',').filter((k) => k.includes('<'));
      placeholderKeywords.forEach((placeholder) => {
        let wordy = {};
        if (placeholder.toLowerCase() === '<any>') {
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
          console.info(data);
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

    choosePackage(){
      this.$router.push({
        name: 'forge-characters-id-builder-ascension-choose',
        params: { id: this.characterId },
      });
    },

    updateKeyword(placeholder, selected, ascensionPackage, feature) {
      console.log(`selected ${selected} for ${placeholder.name}`);
      const id = this.characterId;

      this.$store.commit('characters/replaceCharacterKeywordPlaceholder', {
        id,
        // the name of the keyword to be replaced
        placeholder: placeholder.name,
        // the new selected choice
        replacement: selected,
        // the source of the keyword
        source: `ascension.${ascensionPackage.key}.${feature.name}`,
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
    // $event.payload[0], characterAscension, feature, wargearOption.key
    setFeatureOptionWargearChoice(item, ascension, feature, wargearOptionKey) {
      //const wargearOption = ascension.wargearOptions.find((o) => o.key === ascension.wargearChoice);
      const payload = {
        id: this.characterId,
        name: item.name,
        source: `ascension.${ascension.key}.${feature.name}.${wargearOptionKey}.${item.name}`,
      };
      this.$store.commit('characters/addCharacterWargear', payload);
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
      if (wildcard === '<Any>') {
        // return all but the any keyword
        return this.keywordRepository.filter((k) => k.name !== '<Any>');
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
    updatePsychicPowers(characterAscension, option) {
      this.$store.commit('characters/clearCharacterPsychicPowersBySource', { id: this.characterId, source: `ascension.${characterAscension.key}.${option.name}` });
      this.$store.commit('characters/addCharacterPsychicPower', {
        id: this.characterId,
        name: option.selected,
        cost: 0,
        source: `ascension.${characterAscension.key}.${option.name}`,
      });
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
          .filter((keyword) => keyword.includes('<'))
          // map to placeholder object
          .map((placeholder) => {
            let wordy = {};
            if (placeholder.toLowerCase() === '<any>') {
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

    /**
     *
     * @param ascension
     * @param feature
     * @param type
     */
    setFeatureOptionChoice(ascension, feature, type = 'ascension') {
      const id = this.characterId;
      const sourcePrefix = `${type}.${ascension.key}.${feature.name}`;
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
        const content = {
          modifications: selectedOption.modifications,
          source: `${sourcePrefix}.${selectedOption.key}`,
        };
        this.$store.commit('characters/addCharacterModifications', { id, content });
      }
    },
    featureOptionChoice(feature){
      return feature.options.find((o)=>o.key === feature.selected);
    },
    computeWargearOptionsByFilter(filter, ascension = {targetTier:0}) {
      const { valueFilter, rarityFilter, typeFilter, subtypeFilter, keywordFilter } = filter;
      if ( this.wargearList ) {
        return this.wargearList.filter( (gear) => {
          let valueReq = true;
          if ( valueFilter ) {
            let maxValue = 0;
            maxValue += valueFilter.fixedValue ? valueFilter.fixedValue : 0;
            maxValue += valueFilter.useSettingTier ? this.settingTier : 0;
            maxValue += valueFilter.useAscensionTargetTier ? ascension.targetTier : 0;
            // maxValue += valueFilter.useCharacterTier ? this.settingTier : 0;
            valueReq = gear.value <= maxValue;
          }
          const rarityReq = rarityFilter ? rarityFilter.includes(gear.rarity) : true;
          const typeReq = typeFilter ? typeFilter.includes(gear.type) : true;
          const subtypeReq = subtypeFilter ? (gear.subtype && gear.subtype !== null ? gear.subtype.includes(subtypeFilter) : false ) : true;
          const keywordReq = keywordFilter ? (gear.keywords ? gear.keywords.includes(keywordFilter) : false) : true;
          return valueReq && rarityReq && typeReq && subtypeReq && keywordReq;
        });
      }
      return [];
    },
  },
}
</script>

<style scoped lang="scss">
</style>
