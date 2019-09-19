<template lang="html">

  <v-layout justify-center row wrap>

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
    <v-flex
      xs12
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
            <span class="grey--text">{{ characterAscension.teaser }}</span>
          </div>
          <div>
            <v-btn
              flat
              color="red"
              @click="removePackage(characterAscension)"
            >
              <v-icon>remove_circle</v-icon>
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
            ></keyword-select>

          </div>

          <!-- selection for the sub keyword -->

          <v-divider class="mb-2"></v-divider>

          <p class="text-lg-justify">
            <strong>Influence Bonus: </strong>
            {{ characterAscension.influencePerTier * (characterAscension.targetTier - characterAscension.sourceTier) }}
            ( {{characterAscension.influencePerTier}} per tier ascended)
          </p>

          <v-divider class="mb-2"></v-divider>

          <p class="text-lg-justify"><strong>Story Element:</strong> {{ characterAscension.storyElementText }}</p>
          <v-select
            v-if="characterAscension.storyElementOptions.length > 0"
            v-model="characterAscension.storyElementChoice"
            v-bind:items="characterAscension.storyElementOptions"
            v-on:input="updateAscensionPackageStoryElement($event, characterAscension)"
            item-text="text"
            item-value="key"
            label="Story Element"
            solo
            dense
          ></v-select>

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
                <v-select
                  v-model="selectItem.itemChoice"
                  v-bind:items="wargearRepository.filter(selectItem.query(characterAscension.targetTier))"
                  v-on:input="updateAscensionPackageWargearOptionChoice($event, selectItem.key, characterAscension)"
                  item-value="name"
                  item-text="name"
                  label="Item Option"
                  solo
                  dense
                ></v-select>
              </div>

            </div>

          </div>

        </v-card-text>

      </v-card>

    </v-flex>

    <!--  -->
    <v-flex>
      <h1 class="headline">Select an Ascension Package</h1>

      <v-alert
        v-for="alert in alerts"
        :key="alert.key"
        :value="true"
        :type="alert.type"
      >{{alert.text}}</v-alert>

    </v-flex>

    <!-- ascension options -->
    <v-flex
      xs12
      v-if="alerts.length === 0"
    >
      <v-card>

        <v-list>

          <v-list-tile
            two-line
            v-for="item in ascensionRepository"
            :key="item.key"
            avatar
            @click.stop="openDialog(item)"
          >

            <v-list-tile-avatar tile>
              <img />
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{item.name}}</v-list-tile-title>
              <v-list-tile-sub-title>{{item.teaser}}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn dense icon>
                <v-icon color="primary">arrow_forward_ios</v-icon>
              </v-btn>
            </v-list-tile-action>

          </v-list-tile>

        </v-list>

      </v-card>

    </v-flex>



  </v-layout>

</template>

<script lang="js">
import { mapGetters } from 'vuex';
import AscensionRepositoryMixin from '~/mixins/AscensionRepositoryMixin';
import KeywordRepositoryMixin from '~/mixins/KeywordRepositoryMixin';
import ArchetypeRepositoryMixin from '~/mixins/ArchetypeRepositoryMixin';
import AscensionPreview from '~/components/builder/AscensionPreview.vue';
import KeywordSelect from '~/components/builder/KeywordSelect.vue';
import WargearSelect from '~/components/builder/WargearSelect.vue';

export default {
  name: 'Ascension',
  layout: 'builder',
  props: [],
  mixins: [ArchetypeRepositoryMixin, AscensionRepositoryMixin, KeywordRepositoryMixin],
  components: { AscensionPreview, KeywordSelect, WargearSelect },
  head() {
    return {
      title: 'Select Ascension Package',
    }
  },
  async asyncData({ params, $axios, error }) {
    const response = await $axios.get(`/api/wargear/`);
    const wargearRepository = response.data;

    return {
      wargearRepository: wargearRepository,
    };
  },
  data() {
    return {
      dialog: false,
      selectedPreview: undefined,
    };
  },
  computed: {
    ...mapGetters([
      'settingTier',
      'effectiveCharacterTier',
      'keywords',
      'finalKeywords',
    ]),
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
    characterAscensionPackages() {
      return this.$store.state.ascensionPackages.map(packageName => {
        const characterPackage = this.ascensionRepository.find(j => {
          return j.name === packageName.value;
        })
        characterPackage.sourceTier = packageName.sourceTier;
        characterPackage.targetTier = packageName.targetTier;
        characterPackage.storyElementChoice = packageName.storyElementChoice;
        characterPackage.wargearChoice = packageName.wargearChoice;

        const archetypeName = this.$store.getters.archetype;
        if ( archetypeName && this.archetypeRepository ) {
          const archetype = this.archetypeRepository.find( archetype => archetype.name == archetypeName );
          if ( archetype && archetype.prerequisites && archetype.prerequisites.length > 0 ) {
            characterPackage.effectivePrerequisites = characterPackage.prerequisites(archetype.prerequisites);
          }
        }

        const sourceKey = `ascension.${characterPackage.key}.${characterPackage.wargearChoice}`;
        const gear = this.$store.state.wargear
          .filter(gear => gear.source && gear.source.startsWith(sourceKey));
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
        key: ascensionPackage.key,
        value: ascensionPackage.name,
        cost: ascensionPackage.cost * targetTier,
        sourceTier: ascensionPackage.sourceTier,
        targetTier: targetTier,
      };
      this.$store.commit('addAscension', payload);

      if ( ascensionPackage.keywords ) {
        ascensionPackage.keywords.forEach(keyword => {
          const payload = {
            name: keyword,
            source: `ascension.${ascensionPackage.key}`,
            type: (keyword.indexOf('<')>=0) ? 'placeholder': 'keyword',
            replacement: undefined,
          };
          this.$store.commit('addKeyword', payload);
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
      this.$store.commit('setAscensionModifications', modificationPayload);

      this.characterAscension = ascensionPackage;

      this.dialog = false;
    },
    /**
     * @param placeholder {name:String, options:[]}
     * @param selection String
     */
    updateKeyword(selected, placeholder, ascensionPackage) {
      console.log(`selected ${selected} for ${placeholder}`);

      this.$store.commit('replaceKeyword', {
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
      const payload = {
        ...storyElementOption.modifications[0],
        source: `ascension.${ascensionObject.key}.storyElement`,
      };
      this.$store.commit('setAscensionModifications', payload);
      const storyPayload = {
        ascensionPackageKey: ascensionObject.key,
        ascensionPackageTargetTier: ascensionObject.targetTier,
        ascensionPackageStoryElementKey: storyElementOption.key,
      };
      this.$store.commit('setAscensionPackageStoryElement', storyPayload);
    },
    updateAscensionPackageWargearOption(choiceValue, ascensionObject){
      const wargearOption = ascensionObject.wargearOptions.find(o => o.key === choiceValue);
      const wargearOptionPayload = {
        ascensionPackageKey: ascensionObject.key,
        ascensionPackageTargetTier: ascensionObject.targetTier,
        ascensionPackageWargearOptionKey: wargearOption.key,
      };
      this.$store.commit('setAscensionPackageWargearOption', wargearOptionPayload);
    },
    updateAscensionPackageWargearOptionChoice(choiceValue, itemKey, ascensionObject){
      const wargearOption = ascensionObject.wargearOptions.find(o => o.key === ascensionObject.wargearChoice);
      const payload = {
        name: choiceValue,
        source: `ascension.${ascensionObject.key}.${wargearOption.key}.${itemKey}`
      };
      this.$store.commit('addWargear', payload);
    },
    removePackage(ascensionPackage) {
      const payload = {
        value: ascensionPackage.name,
        key: ascensionPackage.key,
        sourceTier: ascensionPackage.sourceTier,
        targetTier: ascensionPackage.targetTier,
      };
      this.$store.commit('removeAscension', payload);
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
  },
};
</script>

<style scoped lang="css">
</style>
