<template lang="html">

  <v-row justify="center">

    <v-col
      v-bind:cols="12"
      v-if="characterBackground"
    >
      <v-card>

        <v-card-title primary-title>
          <div>
            <div class="headline">{{ characterBackground.name }}</div>
            <span class="subtitle-2">{{ characterBackground.hint}}</span>
          </div>
        </v-card-title>

        <v-card-text>
          <p>{{ characterBackground.bonus }}</p>

          <div v-if="characterBackground.choice">
            <v-select
              v-model="characterBackground.selected"
              label="Some text"
              v-bind:items="characterBackground.choice"
              v-on:change="selectBackgroundChoice(characterBackground, characterBackground.selected)"
              item-text="name"
              item-value="key"
              solo
              dense
            ></v-select>
          </div>
        </v-card-text>

        <v-divider/>

        <v-card-actions>
        <v-btn
          text
          outlined
          color="red"
          v-on:click="removeBackground(characterBackground)"
        >
          <v-icon>remove_circle</v-icon>
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
        v-bind:item="dialogItem"
        v-on:select="selectBackgroundForChar"
        v-on:cancel="dialog = false"
      >
      </background-preview>
    </v-dialog>

    <v-col v-bind:cols="12" v-if="!characterBackground">

      <h1 class="headline">Select a background</h1>

    </v-col>

    <v-col v-bind:cols="12" v-if="!characterBackground">

      <v-card>

        <v-list>

          <v-list-item
            v-for="item in backgroundRepository"
            v-bind:key="item.key"
            v-on:click.stop="openDialog(item)"
          >

            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.hint }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-icon color="primary">arrow_forward_ios</v-icon>
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
  mixins: [ BackgroundRepositoryMixin ],
  components: { BackgroundPreview, IssueList },
  props: [],
  asyncData({ params }) {
    return {
      characterId: params.id,
    };
  },
  head() {
    return {
      title: 'Select Background',
    }
  },
  data() {
    return {
      dialog: false,
      dialogItem: undefined,
      issues: [
        'Add option to select specific keyword for "Keywords as a Background" Option',
        'Allow to select a second background if the respective talent is chosen',
      ]
    };
  },
  computed: {
    characterBackgroundName() {
      return this.$store.getters['characters/characterBackgroundLabelById'](this.characterId);
    },
    characterBackground() {
      return this.backgroundRepository.find((i) => i.name === this.characterBackgroundName);
    },
  },
  methods: {
    openDialog(item) {
      this.dialogItem = item;
      this.dialog = true;
    },
    selectBackgroundForChar(item) {
      this.$store.commit('characters/setCharacterBackground', { id: this.characterId, backgroundName: item.name });
      if ( item.modifier ) {
        const content = { modifications: [item.modifier], source: item.modifier.source };
        this.$store.commit('characters/setCharacterModifications', { id: this.characterId, content: content });
      }
      this.dialog = false;
    },
    removeBackground(item) {
      this.$store.commit('characters/setCharacterBackground', { id: this.characterId, backgroundName: undefined });
      this.$store.commit('characters/clearCharacterEnhancementsBySource', {  id: this.characterId, source: `background.${item.key}` });
    },
    selectBackgroundChoice(background, choiceKey) {
      const choice = background.choice.find( (choice) => choice.key === choiceKey );

      console.info(`Background ${background.name} with choice ${choice.name}.`);

      const content = { modifications: [choice.modifier], source: choice.modifier.source };
      this.$store.commit('characters/setCharacterModifications', { id: this.characterId, content: content });
    },
  },
};
</script>

<style scoped lang="css">
</style>
