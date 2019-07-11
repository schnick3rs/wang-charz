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
          <v-select v-if="characterAscension.storyElementOptions.length > 0" solo dense label="Story Element" :items="characterAscension.storyElementOptions.map( i => i.text )"></v-select>

          <v-divider class="mb-2"></v-divider>

          <p class="text-lg-justify"><strong>Wargear:</strong> {{ characterAscension.wargearText }}</p>
          <v-select v-if="characterAscension.wargearOptions.length > 0" solo dense label="Wargear" :items="characterAscension.wargearOptions.map( i => i.text )"></v-select>

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
  import AscensionPreview from '~/components/builder/AscensionPreview.vue';
  import KeywordSelect from '~/components/builder/KeywordSelect.vue';

  export default {
  name: 'Ascension',
  layout: 'builder',
  props: [],
  mixins: [AscensionRepositoryMixin, KeywordRepositoryMixin],
  components: { AscensionPreview, KeywordSelect },
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
