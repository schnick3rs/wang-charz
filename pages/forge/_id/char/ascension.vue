<template lang="html">

  <v-row justify="center" no-gutters>

    <!-- Ascension Dialog -->
    <v-dialog
      v-model="dialog"
      width="600px"
      scrollable
    >
      <ascension-preview
        v-if="selectedPreview"
        v-bind:item="selectedPreview"
        v-bind:currentCharacterTier="effectiveCharacterTier"
        v-bind:maxTargetTier="settingTier"
        v-on:select="selectPackageForChar"
        v-on:cancel="dialog = false"
        chooseMode
      ></ascension-preview>
    </v-dialog>

    <!-- selected ascension -->
    <v-col
      :cols="12"
      v-if="characterAscensionPackages.length > 0"
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
              small outlined
              color="red"
              @click="removePackage(characterAscension)"
            >
              <v-icon left>remove_circle</v-icon>
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
          <v-divider class="mb-2"></v-divider>

          <div>
            {{ characterAscension.effectivePrerequisites.map(a => `${a.value} (${a.threshold})`).join(", ") }}
          </div>

          <span class="mt-2 grey--text">Benefits</span>
          <v-divider class="mb-2"></v-divider>

          <p class="text-lg-justify"><strong>Keywords:</strong> {{ characterAscension.keywords.join(', ') }}</p>

          <div
            v-for="placeholderName in characterAscension.keywords.filter(k=>k.indexOf('<')>=0)"
            v-bind:key="placeholderName.key"
          >
            <keyword-select
              v-model="characterAscension.selected"
              v-bind:placeholder="placeholderName"
              v-bind:selection="characterAscension.selected"
              v-bind:exclude="finalKeywords.filter(k=>k.indexOf('<')<0)"
              v-on:input="updateKeyword($event, placeholderName, characterAscension)"
            />
          </div>

          <!-- selection for the sub keyword -->

          <v-divider class="mb-2"></v-divider>

          <p class="text-lg-justify">
            <strong>Influence Bonus: </strong>
            {{ characterAscension.influencePerTier * (characterAscension.targetTier - characterAscension.sourceTier) }}
            ( {{characterAscension.influencePerTier}} per tier ascended)
          </p>

          <!-- Story Element -->

          <v-divider class="mb-2"></v-divider>

          <p class="text-lg-justify"><strong>Story Element:</strong> {{ characterAscension.storyElementText }}</p>

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
                v-bind:readonly="psychicPowersRepository.filter(option.filter).length <= 1"
                v-model="option.selected"
                v-bind:items="psychicPowersRepository.filter(option.filter)"
                v-bind:hint="psychicPowerHint(option.selected)"
                v-on:change="updatePsychicPowers(characterAscension, option)"
                item-value="name"
                item-text="name"
                persistent-hint
                dense
                solo
                class="ml-2 mr-2"
              ></v-select>
              </div>
            </div>

            <v-select
              v-else
              v-model="characterAscension.storyElementChoice"
              v-bind:items="characterAscension.storyElementOptions"
              v-on:input="updateAscensionPackageStoryElement($event, characterAscension)"
              item-text="text"
              item-value="key"
              label="Story Element"
              solo
              dense
            ></v-select>

          </div>

          <v-divider class="mb-2"></v-divider>

          <p class="text-lg-justify"><strong>Wargear:</strong> {{ characterAscension.wargearText }}</p>

          <div class="ml-2 mr-2">

            <v-select
              v-if="characterAscension.wargearOptions.length > 0"
              v-model="characterAscension.wargearChoice"
              v-bind:items="characterAscension.wargearOptions"
              v-on:input="updateAscensionPackageWargearOption($event, characterAscension)"
              item-text="text"
              item-value="key"
              label="Wargear Options"
              solo
              dense
            ></v-select>

            <div
              v-if="characterAscension.wargearChoice"
              class="ml-2 mr-2"
            >
              <div
                v-for="selectItem in characterAscension.wargearOptions.find( o => o.key === characterAscension.wargearChoice ).selectList"
                v-bind:key="selectItem.key"
              >

                <wargear-select
                  :item="selectItem.itemChoice"
                  :repository="wargearRepository.filter(selectItem.query(characterAscension.targetTier))"
                  @input="updateAscensionPackageWargearOptionChoice($event, selectItem.key, characterAscension)"
                  class="mb-4"
                ></wargear-select>

              </div>

            </div>

          </div>

        </v-card-text>

      </v-card>

    </v-col>

    <!-- ascension list -->
    <v-col>
      <h1 class="headline">Select an Ascension Package</h1>

      <v-alert
        v-for="alert in alerts"
        :key="alert.key"
        :value="true"
        :type="alert.type"
      >{{alert.text}}</v-alert>

    </v-col>

    <!-- ascension options -->
    <v-col
      :cols="12"
      v-if="alerts.length === 0"
    >
      <v-card>

        <v-list>

          <v-list-item
            two-line
            v-for="item in ascensionRepository"
            :key="item.key"
            @click.stop="openDialog(item)"
          >

            <v-list-item-avatar tile>
              <img />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{item.name}}</v-list-item-title>
              <v-list-item-subtitle>{{item.teaser}}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn dense icon>
                <v-icon color="primary">arrow_forward_ios</v-icon>
              </v-btn>
            </v-list-item-action>

          </v-list-item>

        </v-list>

      </v-card>

    </v-col>

  </v-row>

</template>

<script lang="js">
import AscensionRepositoryMixin from '~/mixins/AscensionRepositoryMixin';
import KeywordRepositoryMixin from '~/mixins/KeywordRepositoryMixin';
import ArchetypeRepositoryMixin from '~/mixins/ArchetypeRepositoryMixin';
import AscensionPreview from '~/components/forge/AscensionPreview.vue';
import KeywordSelect from '~/components/forge/KeywordSelect.vue';
import WargearSelect from '~/components/forge/WargearSelect.vue';

export default {
  name: 'Ascension',
  layout: 'forge',
  props: [],
  mixins: [ArchetypeRepositoryMixin, AscensionRepositoryMixin, KeywordRepositoryMixin],
  components: { AscensionPreview, KeywordSelect, WargearSelect },
  head() {
    return {
      title: 'Select Ascension Package',
    }
  },
  async asyncData({ params, $axios, error }) {
    const wargearResponse = await $axios.get(`/api/wargear/`);
    const powersResponse = await $axios.get(`/api/psychic-powers/?fields=id,name,effect,discipline&discipline=Minor,Universal`);
    return {
      wargearRepository: wargearResponse.data,
      psychicPowersRepository: powersResponse.data,
      characterId: params.id,
    };
  },
  data() {
    return {
      dialog: false,
      selectedPreview: undefined,
    };
  },
  computed: {
    effectiveCharacterTier() {
      return 1;
    },
    alerts() {
      const alerts = [];
      if (!this.characterArchetype) {
        alerts.push({ type: 'warning', text: 'You need to select an Archetype first.' });
      }
      if (this.effectiveCharacterTier >= this.settingTier) {
        alerts.push({ type: 'warning', text: 'Your character already has reached a tier sufficient for the Campaign Tier.' });
      }
      return alerts;
    },
    settingTier(){
      return this.$store.getters['characters/characterSettingTierById'](this.characterId);
    },
    characterArchetypeLabel() {
      return this.$store.getters['characters/characterArchetypeLabelById'](this.characterId);
    },
    keywords(){
      return this.$store.getters['characters/characterKeywordsRawById'](this.characterId);
    },
    finalKeywords(){
      return this.$store.getters['characters/characterKeywordsFinalById'](this.characterId);
    },
    characterWargear() {
      return this.$store.getters['characters/characterWargearById'](this.characterId);
    },
    characterAscensionPackages() {
      const characterAscensionPackages = this.$store.getters['characters/characterAscensionPackagesById'](this.characterId);
      return characterAscensionPackages.map(ascensionPackage => {
        const characterPackage = this.ascensionRepository.find(j => {
          return j.name === ascensionPackage.value;
        });
        characterPackage.sourceTier = ascensionPackage.sourceTier;
        characterPackage.targetTier = ascensionPackage.targetTier;
        characterPackage.storyElementChoice = ascensionPackage.storyElementChoice;
        characterPackage.wargearChoice = ascensionPackage.wargearChoice;

        if ( this.characterArchetypeLabel && this.archetypeRepository ) {
          const archetype = this.archetypeRepository.find( archetype => archetype.name === this.characterArchetypeLabel );
          if ( archetype && archetype.prerequisites && archetype.prerequisites.length > 0 ) {
            characterPackage.effectivePrerequisites = characterPackage.prerequisites(archetype.prerequisites);
          }
        }

        const sourceKey = `ascension.${characterPackage.key}.${characterPackage.wargearChoice}`;
        const gear = this.characterWargear.filter(gear => gear.source && gear.source.startsWith(sourceKey));
        if (gear) {
          gear.forEach(g=>{
            characterPackage
              .wargearOptions.find(o=>o.key === characterPackage.wargearChoice)
              .selectList.find(s=> g.source.endsWith(s.key))
              .itemChoice = g.name
          });
        }

        const packageKeyword = this.keywords.find(k => k.source === `ascension.${characterPackage.key}`);
        if(packageKeyword && packageKeyword.replacement) {
          characterPackage.selected = packageKeyword.replacement;
        } else {
          characterPackage.selected = '';
        }

        return characterPackage;
      });
    },
    characterArchetype() {
      return this.$store.state.archetype.value;
    },
    characterAscensionKeywordPlaceholders(){
      let placeholderSet = [];

      this.characterAscensionPackages()

      const placeholderKeywords = this.item.keywords.split(',').filter( (k) => { return k.indexOf('<')>=0; } );
      placeholderKeywords.forEach(placeholder => {
        let wordy= {};
        if ( placeholder.toLowerCase() === '<any>' ) {
          const levelOneKeywords = this.keywordRepository.filter(k => k.name.toLowerCase() !== placeholder.toLowerCase());
          wordy = { name: placeholder, options: levelOneKeywords, selected: '', };
        } else {
          const subKeywords = this.keywordSubwordRepository.filter(k => k.placeholder === placeholder);
          wordy = { name: placeholder, options: subKeywords, selected: '', };
        }
        placeholderSet.push(wordy);
      });

      return placeholderSet;
    },
  },
  methods: {
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
        targetTier: targetTier,
      };
      this.$store.commit('characters/addCharacterAscensionPackage', payload);

      if ( ascensionPackage.keywords ) {
        ascensionPackage.keywords.forEach(ascensionKeyword => {
          const keyword = {
            name: ascensionKeyword,
            source: `ascension.${ascensionPackage.key}`,
            type: (ascensionKeyword.indexOf('<')>=0) ? 'placeholder': 'keyword',
            replacement: undefined,
          };
          this.$store.commit('characters/addCharacterKeyword', { id: this.characterId, keyword: keyword });
        });
      }

      const influenceDifference = ascensionPackage.targetTier - ascensionPackage.sourceTier;
      const influenceModifier = influenceDifference * ascensionPackage.influencePerTier;
      const modificationPayload = {
        targetGroup: 'traits',
        targetValue: 'influence',
        modifier: influenceModifier,
        source: `ascension.${ascensionPackage.key}.influence`,
      };
      this.$store.commit('characters/setCharacterModifications', { id: this.characterId, content: { modifications: [modificationPayload] } });

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
        placeholder: placeholder,
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
    updateAscensionPackageStoryElement(choiceValue, ascensionObject){
      const storyElementOption = ascensionObject.storyElementOptions.find(o => o.key === choiceValue);
      const modification = {
        ...storyElementOption.modifications[0],
        source: `ascension.${ascensionObject.key}.storyElement`,
      };
      this.$store.commit('characters/setCharacterModifications', { id: this.characterId, content: { modifications: [modification] } });
      const storyPayload = {
        id: this.characterId,
        ascensionPackageKey: ascensionObject.key,
        ascensionPackageTargetTier: ascensionObject.targetTier,
        ascensionPackageStoryElementKey: storyElementOption.key,
      };
      this.$store.commit('characters/setCharacterAscensionPackageStoryElement', storyPayload);
    },
    updateAscensionPackageWargearOption(choiceValue, ascensionObject){
      const wargearOption = ascensionObject.wargearOptions.find(o => o.key === choiceValue);
      const wargearOptionPayload = {
        id: this.characterId,
        ascensionPackageKey: ascensionObject.key,
        ascensionPackageTargetTier: ascensionObject.targetTier,
        ascensionPackageWargearOptionKey: wargearOption.key,
      };
      this.$store.commit('characters/setCharacterAscensionPackageWargearOption', wargearOptionPayload);
    },
    updateAscensionPackageWargearOptionChoice(choiceValue, itemKey, ascensionObject){
      const wargearOption = ascensionObject.wargearOptions.find(o => o.key === ascensionObject.wargearChoice);
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
        return this.keywordRepository.filter(k => k.name !== '<Any>');
      }
      return this.keywordRepository.filter(k => k.name === wildcard);
    },
    subKeywordOptions(placeholder) {
      return this.keywordSubwordRepository.filter(k => k.placeholder === placeholder);
    },
    psychicPowerHint(powerName) {

      const power = this.psychicPowersRepository.find( p => p.name === powerName );

      if ( power ) {
        return power.effect;
      }

      return '';
    },
    updatePsychicPowers(characterAscension, option) {
      this.$store.commit('clearPowersBySource', { source: `ascension.${characterAscension.key}.${option.name}` });
      this.$store.commit('addPower', {
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
