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

    <v-col v-if="!characterBackground" :cols="12">
      <v-card>
        <v-list>
          <v-list-item
            v-for="item in backgroundRepository"
            :key="item.key"
            @click.stop="openDialog(item)"
          >
            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.hint }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-icon color="primary">
                arrow_forward_ios
              </v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list>
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
      characterBackground: undefined,
      languageInput: '',
      languageCostMarker: false,
    };
  },
  computed: {
    characterBackgroundKey() {
      return this.$store.getters['characters/characterBackgroundKeyById'](this.characterId);
    },
    characterBackgroundSnippet() {
      return this.$store.getters['characters/characterBackgroundById'](this.characterId);
    },
    characterLanguages() {
      return this.$store.getters['characters/characterLanguagesById'](this.characterId);
    },
  },
  watch: {
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
