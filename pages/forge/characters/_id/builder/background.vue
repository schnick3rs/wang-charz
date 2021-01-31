<template lang="html">

  <v-row justify="center">

    <!-- headline -->
    <v-col :cols="12">

      <h2>Manage Backgrounds</h2>
      <span>Select a background for each Section and choose a single Trait bonus.</span>

      <v-alert v-if="selectedPlusOne" type="info" text dense>
        <strong>{{selectedPlusOne.title}}: </strong>You add +1 to your {{selectedPlusOne.plusOne}}
      </v-alert>

    </v-col>

    <!-- Backgrounds -->
    <v-col :cols="12">
      <v-alert
          v-if="backgroundSectionTypes.length <= 0"
          type="warning"
          dense text
      >
        No fitting associated faction found for <strong>{{characterFactionKey}}</strong>. Check with your GM what background options are available.
      </v-alert>
      <div v-for="type in backgroundSectionTypes" class="mt-2 mb-4">
        <h3>{{type}}</h3>
        <v-select
            v-model="selectedBackgrounds[type.toLowerCase()]"
            :items="backgroundsByType(type)"
            outlined
            dense
            @change="changeBackground"
            item-value="key"
            item-text="label"
            persistent-hint
            :hint="backgroundHint(selectedBackgrounds[type.toLowerCase()])"
        ></v-select>
        <v-btn
            small
            :disabled="!selectedBackgrounds[type.toLowerCase()] || (selectedPlusOne && selectedPlusOne.key === selectedBackgrounds[type.toLowerCase()])"
            :color="selectedPlusOne && selectedPlusOne.key === selectedBackgrounds[type.toLowerCase()] ? 'success' : ''"
            @click="selectPlusOne(selectedBackgrounds[type.toLowerCase()])"
        >Use this bonus</v-btn>
      </div>
    </v-col>

    <!-- Languages -->
    <v-col :cols="12">
      <v-card>
        <v-card-title>Manage Languages</v-card-title>
        <v-card-text>
          <p><em>Learned languages:</em></p>
          <v-chip-group column>
            <v-chip
              v-for="language in characterLanguages"
              :key="language.name"
              label
              small
              :close="language.name != 'Low Gothic'"
              @click:close="removeLanguage(language.name)"
            >
              <strong>{{language.name}}</strong>&nbsp;
              <span v-if="language.cost > 0">({{ language.cost }} XP)</span>
            </v-chip>
          </v-chip-group>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
          <p>
            Every character starts with <strong>Low Gothic</strong> and an additional language, common to your homeworld or origin.
          </p>
          <p>
            You can learn additional languages for 1 XP each. Exotic languages might cost more. Check with your GM.
          </p>
          <v-text-field
            v-model="languageInput"
            persistent-hint
            hint="Enter a custom language and hit enter or click the [+] icon. Toggle the [$] for 0/1 XP."
            :prepend-icon="languageCostMarker ? 'attach_money' : 'money_off'"
            @click:prepend="languageCostMarker = !languageCostMarker"
            append-outer-icon="add_box"
            @click:append-outer="addLanguage(languageInput)"
            @keypress.enter="addLanguage(languageInput)"
          ></v-text-field>
        </v-card-text>
      </v-card>
    </v-col>

    <issue-list :items="issues" />
  </v-row>
</template>

<script lang="js">
import BackgroundPreview from '~/components/forge/BackgroundPreview.vue';
import IssueList from '~/components/IssueList.vue';

export default {
  name: 'Background',
  layout: 'forge',
  components: { BackgroundPreview, IssueList },
  mixins: [],
  props: [],
  asyncData({ params }) {
    return {
      characterId: params.id,
    };
  },
  data() {
    return {
      dialog: false,
      dialogItem: undefined,
      issues: [],
      characterSpecies: undefined,
      characterFaction: undefined,
      characterBackground: undefined,
      languageInput: '',
      languageCostMarker: false,
    };
  },
  head() {
    return {
      title: 'Select Background',
    };
  },
  computed: {
    characterSpeciesKey() {
      return this.$store.getters['characters/characterSpeciesKeyById'](this.characterId);
    },
    characterFactionKey() {
      return this.$store.getters['characters/characterFactionKeyById'](this.characterId);
    },
    characterBackgrounds() {
      return this.$store.getters['characters/characterBackgroundById'](this.characterId);
    },
    selectedBackgrounds() {
      if (this.characterBackgrounds) {
        const { origin, accomplishment, goal } = this.characterBackgrounds;
        return { origin, accomplishment, goal };
      }
      return {
        origin: undefined,
        accomplishment: undefined,
        goal: undefined,
      };
    },
    characterBackgroundPlusOneKey() {
      if (this.characterBackgrounds && this.characterBackgrounds.plusOne) {
        return this.characterBackgrounds.plusOne;
      }
      return undefined;
    },
    characterLanguages() {
      return this.$store.getters['characters/characterLanguagesById'](this.characterId);
    },
    backgroundSectionTypes() {
      if (this.backgroundRepository) {
        const types = this.backgroundRepository.map(section => section.type);
        return [...new Set(types)];
      }
      return [];
    },
    selectedPlusOne() {
      if (this.characterBackgroundPlusOneKey) {
        return this.getBackgroundBySectionByKey(this.characterBackgroundPlusOneKey);
      }
      return undefined;
    },
    backgroundRepository() {
      let repository = [];
      if (this.characterSpecies && this.characterSpecies.backgroundSection) {
        repository.push(...this.characterSpecies.backgroundSection);
      }
      if (this.characterFaction && this.characterFaction.backgroundSection) {
        repository.push(...this.characterFaction.backgroundSection);
      }
      return repository;
    },
  },
  watch: {
    characterSpeciesKey: {
      handler(newVal) {
        if (newVal) {
          this.loadSpecies(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
    characterFactionKey: {
      handler(newVal) {
        if (newVal) {
          this.loadFaction(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
  },
  methods: {
    async loadSpecies(key) {
      if ( key ) {
        const { data } = await this.$axios.get(`/api/species/${key}`);
        this.characterSpecies = data;
      }
    },
    async loadFaction(key) {
      if ( key ) {
        const { data } = await this.$axios.get(`/api/factions/${key}`);
        this.characterFaction = data;
      }
    },
    backgroundsByType(type) {
      if (this.backgroundRepository) {
        return this.backgroundRepository
          .filter(section => section.type === type)
          .map((section) => {
            return {
              ...section,
              label: `${section.title} - ${section.plusOne}`,
            }
          });
      }
      return [];
    },
    getBackgroundBySectionByKey(key) {
      if (this.backgroundRepository && key) {
        return this.backgroundRepository.find(section => section.key === key);
      }
      return undefined;
    },
    backgroundHint(key) {
      if (this.characterFaction && key) {
        const background = this.getBackgroundBySectionByKey(key);
        return background ? background.snippet : 'Could not load background hint.';
      }
      return '';
    },
    changeBackground(key) {
      const item = this.getBackgroundBySectionByKey(key);
      const id = this.characterId;
      const type = item.type.toLowerCase();
      //const key = item.key;
      this.$store.commit('characters/setCharacterBackground', { id, type, key })
    },
    selectBackgroundForChar(item) {
      const backgroundContent = { key: item.key, label: item.name };
      this.$store.commit('characters/setCharacterBackground', { id: this.characterId, content: backgroundContent });

      if (item.modifier) {
        const content = { modifications: [item.modifier], source: item.modifier.source };
        this.$store.commit('characters/setCharacterModifications', { id: this.characterId, content });
      }

      this.dialog = false;
    },
    removeBackground(item) {
      this.$store.commit('characters/clearCharacterEnhancementsBySource', { id: this.characterId, source: `background.${item.key}` });
      const backgroundContent = { key: undefined, label: '', optionSelectedKey: undefined };
      this.$store.commit('characters/setCharacterBackground', { id: this.characterId, content: backgroundContent });
    },
    selectBackgroundChoice(background, choiceKey) {
      const choice = background.choice.find((choice) => choice.key === choiceKey);

      const backgroundContent = { key: background.key, label: background.name, optionSelectedKey: choice.key };
      this.$store.commit('characters/setCharacterBackground', { id: this.characterId, content: backgroundContent });

      const content = { modifications: [choice.modifier], source: choice.modifier.source };
      this.$store.commit('characters/setCharacterModifications', { id: this.characterId, content });
    },
    selectPlusOne(backgroundKey) {
      this.clearPlusOne();
      const background = this.getBackgroundBySectionByKey(backgroundKey);

      const id = this.characterId;
      const type = background.type.toLowerCase();
      const { key, plusOne } = background;
      this.$store.commit('characters/setCharacterBackground', { id, type, key, plusOne })
      this.$store.commit('characters/setCharacterBackgroundPlusOne', { id, type, key, plusOne })

      const content = { modifications: [background.modification], source: `background.plus-one` };
      this.$store.commit('characters/setCharacterModifications', { id, content });

      if (background.modification.targetGroup === 'keywords') {
        const keyword = {
          name: background.modification.targetValue,
          source: `background.plus-one`,
          type: 'keyword',
          replacement: undefined,
        };
        this.$store.commit('characters/addCharacterKeyword', { id, keyword });
      }
    },
    clearPlusOne() {
      const id = this.characterId;
      const source = `background.plus-one`;
      this.$store.commit('characters/clearCharacterEnhancementsBySource', { id, source });
      this.$store.commit('characters/clearCharacterKeywordsBySource', { id, source, cascade: true });
    },
    addLanguage(language) {
      const name = language;
      const cost = this.languageCostMarker ? 1 : 0;
      const source = 'creation';
      this.$store.commit('characters/addCharacterLanguage', { id: this.characterId, name, cost, source })
      this.languageInput = '';
    },
    removeLanguage(name) {
      this.$store.commit('characters/removeCharacterLanguage', { id: this.characterId, name })
    },
  },
};
</script>

<style scoped lang="css">
</style>
