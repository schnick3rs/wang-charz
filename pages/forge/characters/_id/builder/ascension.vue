<template lang="html">
  <v-row justify="center" no-gutters>

    <nuxt-child />

    <!-- Ascension Dialog -->
    <v-dialog
      v-model="dialog"
      width="600px"
      scrollable
    >
      <ascension-preview
        v-if="selectedPreview"
        :item="selectedPreview"
        :current-character-tier="effectiveCharacterTier"
        :max-target-tier="settingTier"
        choose-mode
        @select="selectPackageForChar"
        @cancel="dialog = false"
      />
    </v-dialog>

    <!-- selected ascensions -->
    <v-col
      v-if="characterAscensionPackages.length > 0"
      :cols="12"
    >
      <v-card
        v-for="characterAscension in characterAscensionPackages"
        :key="characterAscension.key"
        class="mb-2"
      >
        <v-card-title primary-title>
          <div>
            <div class="headline">{{ characterAscension.name }}</div>
            <span class="subtitle-1 grey--text">{{ characterAscension.teaser }}</span>
          </div>
          <div>
            <v-btn
              small
              outlined
              color="red"
              @click="removePackage(characterAscension)"
            >
              <v-icon left>
                remove_circle
              </v-icon>
              remove package
            </v-btn>
          </div>
        </v-card-title>

        <v-card-text>
          <p class="text-lg-justify">
            <strong>Ascended Tier: </strong>{{ characterAscension.sourceTier }} => {{ characterAscension.targetTier }}
          </p>
          <p class="text-lg-justify">
            <strong>Build Point Cost: </strong>
            {{ characterAscension.targetTier * characterAscension.cost }}
            (New Tier x {{ characterAscension.cost }})
          </p>

          <span class="mt-2 grey--text">Prerequisites</span>
          <v-divider class="mb-2" />

          <div v-if="characterAscension.effectivePrerequisites">
            {{ characterAscension.effectivePrerequisites.map(a => `${a.name} (${a.threshold})`).join(", ") }}
          </div>
          <div v-else>
            {{ characterAscension.skillPrerequisites.join(', ' )}}
          </div>

          <span class="mt-2 grey--text">Benefits</span>
          <v-divider class="mb-2" />

          <p class="text-lg-justify">
            <strong>Keywords:</strong> {{ characterAscension.keywords.join(', ') }}
          </p>

          <div
            v-for="placeholderName in characterAscension.keywords.filter(k=>k.indexOf('<')>=0)"
            :key="placeholderName.key"
          >
            <keyword-select
              v-model="characterAscension.selected"
              :placeholder="placeholderName"
              :selection="characterAscension.selected"
              :exclude="finalKeywords.filter(k=>k.indexOf('<')<0)"
              @input="updateKeyword($event, placeholderName, characterAscension)"
            />
          </div>

          <!-- selection for the sub keyword -->

          <v-divider class="mb-2" />

          <p class="text-lg-justify">
            <strong>Influence Bonus: </strong>
            {{ characterAscension.influencePerTier * (characterAscension.targetTier - characterAscension.sourceTier) }}
            ( {{ characterAscension.influencePerTier }} per tier ascended)
          </p>

          <!-- Story Element -->

          <v-divider class="mb-2" />

          <p class="text-lg-justify">
            <strong>Story Element:</strong> {{ characterAscension.storyElementText }}
          </p>

          <div
            v-if="characterAscension.storyElementOptions.length > 0"
          >
            <div
              v-if="characterAscension.storyElementOptions[0].type === 'spells'"
            >
              <div
                v-for="option in characterAscension.storyElementOptions[0].discount.slice(0,3)"
                :key="option.name"
              >
                <v-select
                  v-model="option.selected"
                  :readonly="psychicPowersRepository.filter(option.filter).length <= 1"
                  :items="psychicPowersRepository.filter(option.filter)"
                  :hint="psychicPowerHint(option.selected)"
                  item-value="name"
                  item-text="name"
                  persistent-hint
                  dense
                  solo
                  class="ml-2 mr-2"
                  @change="updatePsychicPowers(characterAscension, option)"
                />
              </div>
            </div>

            <v-select
              v-else
              v-model="characterAscension.storyElementChoice"
              :items="characterAscension.storyElementOptions"
              item-text="text"
              item-value="key"
              label="Story Element"
              solo
              dense
              @input="updateAscensionPackageStoryElement($event, characterAscension)"
            />
          </div>

          <v-divider class="mb-2" />

          <p class="text-lg-justify">
            <strong>Wargear:</strong> {{ characterAscension.wargearText }}
          </p>

          <div class="ml-2 mr-2">
            <v-select
              v-if="characterAscension.wargearOptions.length > 0"
              v-model="characterAscension.wargearChoice"
              :items="characterAscension.wargearOptions"
              item-text="text"
              item-value="key"
              label="Wargear Options"
              solo
              dense
              @input="updateAscensionPackageWargearOption($event, characterAscension)"
            />

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
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- ascension list -->
    <v-col>
      <h1 class="headline">
        Select an Ascension Package
      </h1>

      <v-alert
        v-for="alert in alerts"
        :key="alert.key"
        :value="true"
        :type="alert.type"
      >
        {{ alert.text }}
      </v-alert>
    </v-col>

    <!-- ascension options -->
    <v-col
      v-if="alerts.length === 0"
      :cols="12"
    >
      <v-card>
        <v-list>
          <v-list-item
            v-for="item in ascensionPackagesList"
            :key="item.key"
            two-line
            @click.stop="openDialog(item)"
          >
            <v-list-item-avatar tile>
              <img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.hint }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn dense icon>
                <v-icon color="primary">
                  arrow_forward_ios
                </v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="js">
import KeywordRepositoryMixin from '~/mixins/KeywordRepositoryMixin';
import AscensionPreview from '~/components/forge/AscensionPreview.vue';
import KeywordSelect from '~/components/forge/KeywordSelect.vue';
import WargearSelect from '~/components/forge/WargearSelect.vue';
import StatRepositoryMixin from '~/mixins/StatRepositoryMixin';

export default {
  name: 'Ascension',
  layout: 'forge',
  components: { AscensionPreview, KeywordSelect, WargearSelect },
  mixins: [
    KeywordRepositoryMixin,
    StatRepositoryMixin,
  ],
  props: [],
  head() {
    return {
      title: 'Select Ascension Package',
    };
  },
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
      dialog: false,
      selectedPreview: undefined,
      ascensionPackagesList: undefined,
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
    settingTier() {
      return this.$store.getters['characters/characterSettingTierById'](this.characterId);
    },
    characterArchetypeLabel() {
      return this.$store.getters['characters/characterArchetypeLabelById'](this.characterId);
    },
    keywords() {
      return this.$store.getters['characters/characterKeywordsRawById'](this.characterId);
    },
    finalKeywords() {
      return this.$store.getters['characters/characterKeywordsFinalById'](this.characterId);
    },
    characterWargear() {
      return this.$store.getters['characters/characterWargearById'](this.characterId);
    },
    characterAscensionPackages() {
      const characterAscensionPackages = this.$store.getters['characters/characterAscensionPackagesById'](this.characterId);
      return characterAscensionPackages.map((ascensionPackage) => {
        const characterPackage = this.ascensionRepository.find((j) => j.name === ascensionPackage.value);
        characterPackage.sourceTier = ascensionPackage.sourceTier;
        characterPackage.targetTier = ascensionPackage.targetTier;
        characterPackage.storyElementChoice = ascensionPackage.storyElementChoice;
        characterPackage.wargearChoice = ascensionPackage.wargearChoice;

        if (this.characterArchetypeLabel && this.archetypeRepository) {
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

        const sourceKey = `ascension.${characterPackage.key}.${characterPackage.wargearChoice}`;
        const gear = this.characterWargear.filter((gear) => gear.source && gear.source.startsWith(sourceKey));
        if (gear) {
          gear.forEach((g) => {
            characterPackage
              .wargearOptions.find((o) => o.key === characterPackage.wargearChoice)
              .selectList.find((s) => g.source.endsWith(s.key))
              .itemChoice = g.name;
          });
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


        return characterPackage;
      });
    },
    characterAscensionKeywordPlaceholders() {
      const placeholderSet = [];

      this.characterAscensionPackages();

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
    sources: {
      handler(newVal) {
        if (newVal) {
          this.getAscensionPackageList(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
  },
  methods: {
    async getAscensionPackageList(sources) {
      const config = {
        params: {
          source: sources.join(','),
        },
      };
      const { data } = await this.$axios.get('/api/ascension-packages/', config);
      //this.itemList = data.filter((i) => i.stub === undefined || i.stub === false);
      this.ascensionPackagesList = data;
    },
    openDialog(item) {
      this.selectedPreview = item;
      this.dialog = true;
    },
    selectPackageForChar(ascensionPackage, targetTier) {
      ascensionPackage.sourceTier = this.effectiveCharacterTier;
      ascensionPackage.targetTier = targetTier;

      const payload = {
        id: this.characterId,
        key: ascensionPackage.key,
        value: ascensionPackage.name,
        cost: ascensionPackage.cost * targetTier,
        sourceTier: ascensionPackage.sourceTier,
        targetTier,
      };
      this.$store.commit('characters/addCharacterAscensionPackage', payload);

      if (ascensionPackage.keywords) {
        ascensionPackage.keywords.forEach((ascensionKeyword) => {
          const keyword = {
            name: ascensionKeyword,
            source: `ascension.${ascensionPackage.key}`,
            type: (ascensionKeyword.includes('<')) ? 'placeholder' : 'keyword',
            replacement: undefined,
          };
          this.$store.commit('characters/addCharacterKeyword', { id: this.characterId, keyword });
        });
      }

      const influenceDifference = ascensionPackage.targetTier - ascensionPackage.sourceTier;
      const influenceModifier = influenceDifference * ascensionPackage.influencePerTier;
      const modificationPayload = {
        targetGroup: 'traits',
        targetValue: 'influence',
        modifier: influenceModifier,
      };
      const content = { modifications: [modificationPayload], source: `ascension.${ascensionPackage.key}.influence`, };
      this.$store.commit('characters/setCharacterModifications', { id: this.characterId, content: content });

      if (ascensionPackage.storyElementOptions && ascensionPackage.storyElementOptions.length > 0) {
        const { storyElementOptions } = ascensionPackage;
        storyElementOptions.forEach((storyElementOption) => {
          if (storyElementOption.type === 'spells' && storyElementOption.discount.length > 0) {
            storyElementOption.discount.forEach((d) => {
              if (d.selected) {
                const payload = {
                  id: this.characterId,
                  name: d.selected,
                  cost: 0,
                  source: `ascension.${ascensionPackage.key}.${d.name}`,
                };
                this.$store.commit('characters/addCharacterPsychicPower', payload);
              }
            });
          }
        });
      }

      this.characterAscension = ascensionPackage;

      this.dialog = false;
    },
    /**
     * @param placeholder {name:String, options:[]}
     * @param selection String
     */
    updateKeyword(selected, placeholder, ascensionPackage) {
      console.log(`selected ${selected} for ${placeholder}`);

      this.$store.commit('characters/replaceCharacterKeywordPlaceholder', {
        id: this.characterId,
        // the name of the keyword to be replaced
        placeholder,
        // the new selected choice
        replacement: selected,
        // the source of the keyword
        source: `ascension.${ascensionPackage.key}`,
      });

      ascensionPackage.selected = selected;
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
    updateAscensionPackageWargearOption(choiceValue, ascensionObject) {
      const wargearOption = ascensionObject.wargearOptions.find((o) => o.key === choiceValue);
      const wargearOptionPayload = {
        id: this.characterId,
        ascensionPackageKey: ascensionObject.key,
        ascensionPackageTargetTier: ascensionObject.targetTier,
        ascensionPackageWargearOptionKey: wargearOption.key,
      };
      this.$store.commit('characters/setCharacterAscensionPackageWargearOption', wargearOptionPayload);
    },
    updateAscensionPackageWargearOptionChoice(choiceValue, itemKey, ascensionObject) {
      const wargearOption = ascensionObject.wargearOptions.find((o) => o.key === ascensionObject.wargearChoice);
      const payload = {
        id: this.characterId,
        name: choiceValue,
        source: `ascension.${ascensionObject.key}.${wargearOption.key}.${itemKey}`,
      };
      this.$store.commit('characters/addCharacterWargear', payload);
    },
    removePackage(ascensionPackage) {
      const payload = {
        id: this.characterId,
        value: ascensionPackage.name,
        key: ascensionPackage.key,
        sourceTier: ascensionPackage.sourceTier,
        targetTier: ascensionPackage.targetTier,
      };
      this.$store.commit('characters/removeCharacterAscensionPackage', payload);
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
  },
};
</script>

<style scoped lang="css">
</style>
