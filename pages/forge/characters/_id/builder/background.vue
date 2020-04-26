<template lang="html">
  <v-row justify="center">
    <v-col
      v-if="characterBackground"
      :cols="12"
    >
      <v-card>
        <v-card-title primary-title>
          <div>
            <div class="headline">
              {{ characterBackground.name }}
            </div>
            <span class="subtitle-2">{{ characterBackground.hint }}</span>
          </div>
        </v-card-title>

        <v-card-text>
          <p>{{ characterBackground.bonus }}</p>

          <div v-if="characterBackground.choice">
            <v-select
              v-model="characterBackground.selected"
              label="Some text"
              :items="characterBackground.choice"
              item-text="name"
              item-value="key"
              solo
              dense
              @change="selectBackgroundChoice(characterBackground, characterBackground.selected)"
            />
          </div>
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-btn
            text
            outlined
            color="red"
            @click="removeBackground(characterBackground)"
          >
            <v-icon left>
              remove_circle
            </v-icon>
            remove background
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>

    <v-dialog
      v-model="dialog"
      width="600px"
      scrollable
    >
      <background-preview
        v-if="dialogItem"
        :item="dialogItem"
        @select="selectBackgroundForChar"
        @cancel="dialog = false"
      />
    </v-dialog>

    <v-col v-if="!characterBackground" :cols="12">
      <h1 class="headline">
        Select a background
      </h1>
    </v-col>

    <v-col>

    </v-col>

    <v-col v-if="!characterBackground" :cols="12">
      <v-card>
        <v-card-text v-if="plusOne">
          <p><strong>{{plusOne.title}}:</strong>{{ plusOne.snippet }}</p>
          <p>You add +1 to your {{plusOne.plusOne}}</p>
        </v-card-text>
        <v-card-text>
          <div v-for="type in backgroundSectionTypes">
            <h3>{{type}}</h3>
            <v-radio-group v-model="selectedBackgrounds[type.toLowerCase()]">
              <v-radio
                v-for="item in backgroundsByType(type)"
                :key="item.key"
                :label="item.title"
                :value="item.key"
              >
                <span slot="label">
                  <strong>{{ item.title }}: </strong>
                  <v-chip
                    small
                    label
                    :disabled="selectedBackgrounds[type.toLowerCase()] !== item.key"
                    :color="plusOne && plusOne.key === item.key ? 'success' : ''"
                  >{{ item.plusOne }}</v-chip>
                  <v-btn
                    icon
                    x-small
                    v-show="selectedBackgrounds[type.toLowerCase()] === item.key && ( plusOne === undefined || plusOne.key !== item.key)"
                    :color="plusOne && plusOne.key === item.key ? 'success' : ''"
                    @click="selectPlusOne(item)"
                  ><v-icon>add_circle</v-icon></v-btn>
                </span>
              </v-radio>
            </v-radio-group>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

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
              <span v-if="language.cost > 0">({{ language.cost }} BP)</span>
            </v-chip>
          </v-chip-group>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
          <p>
            Every character starts with <strong>Low Gothic</strong> and an additional language, common to your homeworld or origin.
          </p>
          <p>
            You can learn additional languages for 1 BP each. Exotic languages might cost more. Check with your GM.
          </p>
          <v-text-field
            v-model="languageInput"
            persistent-hint
            hint="Enter a custom language and hit enter or click the [+] icon. Toggle the [$] for 0/1 BP."
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
import BackgroundRepositoryMixin from '~/mixins/BackgroundRepositoryMixin';
import BackgroundPreview from '~/components/forge/BackgroundPreview.vue';
import IssueList from '~/components/IssueList.vue';

export default {
  name: 'Background',
  layout: 'forge',
  components: { BackgroundPreview, IssueList },
  mixins: [BackgroundRepositoryMixin],
  props: [],
  data() {
    return {
      dialog: false,
      dialogItem: undefined,
      issues: [
        'Add option to select specific keyword for "Keywords as a Background" Option',
        'Allow to select a second background if the respective talent is chosen',
      ],
      characterFaction: undefined,
      characterBackground: undefined,
      languageInput: '',
      languageCostMarker: false,
      selectedBackgrounds: {
        origin: undefined,
        accomplishment: undefined,
        goal: undefined,
      },
      plusOne: undefined,
    };
  },
  computed: {
    characterFactionKey() {
      return this.$store.getters['characters/characterFactionKeyById'](this.characterId);
    },
    characterBackgroundKey() {
      return this.$store.getters['characters/characterBackgroundKeyById'](this.characterId);
    },
    characterBackgroundSnippet() {
      return this.$store.getters['characters/characterBackgroundById'](this.characterId);
    },
    characterLanguages() {
      return this.$store.getters['characters/characterLanguagesById'](this.characterId);
    },
    backgroundSectionTypes() {
      if (this.characterFaction) {
        const types = this.characterFaction.backgroundSection.map(section => section.type);
        return [...new Set(types)];
      }
      return [];
    },
  },
  watch: {
    characterFactionKey: {
      handler(newVal) {
        if (newVal) {
          this.loadFaction(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
    characterBackgroundKey: {
      handler(newVal) {
        console.log(`key change ${newVal}`)
        this.getBackground(newVal);
      },
      immediate: true, // make this watch function is called when component created
    },
  },
  asyncData({ params }) {
    return {
      characterId: params.id,
    };
  },
  head() {
    return {
      title: 'Select Background',
    };
  },
  methods: {
    async loadFaction(key) {
      if ( key ) {
        const { data } = await this.$axios.get(`/api/factions/${key}`);
        this.characterFaction = data;
      }
    },
    backgroundsByType(type) {
      if (this.characterFaction) {
        return this.characterFaction.backgroundSection.filter(section => section.type === type);
      }
      return [];
    },
    selectPlusOne(background) {
      this.plusOne = background;
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
    getBackground(key) {
      const background = this.backgroundRepository.find((i) => i.key === key);
      if ( background ){
        background.selected = this.characterBackgroundSnippet.optionSelectedKey;
      }
      this.characterBackground = background;
    },
    openDialog(item) {
      this.dialogItem = item;
      this.dialog = true;
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

      console.info(`Background ${background.name} with choice ${choice.name}.`);
      const backgroundContent = { key: background.key, label: background.name, optionSelectedKey: choice.key };
      this.$store.commit('characters/setCharacterBackground', { id: this.characterId, content: backgroundContent });

      const content = { modifications: [choice.modifier], source: choice.modifier.source };
      this.$store.commit('characters/setCharacterModifications', { id: this.characterId, content });
    },
  },
};
</script>

<style scoped lang="css">
</style>
