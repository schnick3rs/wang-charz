<template>
  <v-row justify="center">

    <v-col>
      <v-btn @click="choosePackage">Select Package</v-btn>
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
            <strong>Ascended Tier: </strong>{{ characterAscension.sourceTier }} -> {{ characterAscension.targetTier }}
          </p>
          <p class="text-lg-justify">
            <strong>Build Point Cost: </strong>
            {{ characterAscension.targetTier * characterAscension.costPerTier }}
            (New Tier x {{ characterAscension.costPerTier }})
          </p>

          <span class="mt-2 grey--text">Prerequisites</span>
          <v-divider class="mb-2" />

          <span class="mt-2 grey--text">Benefits</span>
          <v-divider class="mb-2" />

          <p class="text-lg-justify">
            <strong>Influence Bonus: </strong>
            {{ characterAscension.influencePerTier * (characterAscension.targetTier - characterAscension.sourceTier) }}
            ( {{ characterAscension.influencePerTier }} per tier ascended)
          </p>

          <div
            v-if="characterAscension.ascensionFeatures"
            v-for="feature in characterAscension.ascensionFeatures"
            class="text-lg-justify"
          >
            <strong>{{ feature.name }}</strong>
            <div v-if="feature.description" v-html="feature.description"></div>
            <p v-else>{{ feature.snippet }}</p>
          </div>

        </v-card-text>
      </v-card>
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
      //ascensionPackagesList: undefined,
    };
  },
  computed: {
    characterArchetypeLabel() {
      return this.$store.getters['characters/characterArchetypeLabelById'](this.characterId);
    },
    characterWargear() {
      return this.$store.getters['characters/characterWargearById'](this.characterId);
    },
    keywords() {
      return this.$store.getters['characters/characterKeywordsRawById'](this.characterId);
    },
    finalKeywords() {
      return this.$store.getters['characters/characterKeywordsFinalById'](this.characterId);
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
        characterPackage.storyElementChoice = ascensionPackage.storyElementChoice;
        characterPackage.wargearChoice = ascensionPackage.wargearChoice;

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

    choosePackage(){
      this.$router.push({
        name: 'forge-characters-id-builder-ascension-choose',
        params: { id: this.characterId },
      });
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
}
</script>

<style scoped lang="scss">
</style>
