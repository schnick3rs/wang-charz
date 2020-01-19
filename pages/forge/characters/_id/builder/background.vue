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
    };
  },
  computed: {
    characterBackgroundSnippet() {
      return this.$store.getters['characters/characterBackgroundById'](this.characterId);
    },
    characterBackgroundKey() {
      return this.$store.getters['characters/characterBackgroundKeyById'](this.characterId);
    },
    characterBackground() {
      const background = this.backgroundRepository.find((i) => i.key === this.characterBackgroundKey);
      if ( background ){
        background.selected = this.characterBackgroundSnippet.optionSelectedKey;
      }
      return background;
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
