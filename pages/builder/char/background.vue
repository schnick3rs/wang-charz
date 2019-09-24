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
          @click="removeBackground(characterBackground)"
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
import BackgroundPreview from '~/components/builder/BackgroundPreview.vue';
import IssueList from '~/components/IssueList.vue';

export default {
  name: 'Background',
  layout: 'builder',
  mixins: [ BackgroundRepositoryMixin ],
  components: { BackgroundPreview, IssueList },
  props: [],
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
      return this.$store.state.background;
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
      console.info(`Background: ${item.name} selected.`);
      this.$store.commit('setBackground', { name: item.name });
      if ( item.modifier ) {
        this.$store.commit('setBackgroundModifications', { modifications: [item.modifier] });
      }
      this.dialog = false;
    },
    select(item) {
      this.$store.commit('setBackground', { name: item.name });
      //this.$store.commit('setBackgroundModifications', { modifications: [item.modifier] });
      this.selectedBackground = item;
    },
    removeBackground(item) {
      this.$store.commit('setBackground', { name: undefined });
      this.$store.commit('clearEnhancementsBySource', { source: `background.${item.key}` });
      this.selectedBackground = undefined;
    },
    selectBackgroundChoice(background, choiceKey) {
      const choice = background.choice.find( (choice) => choice.key === choiceKey );

      console.info(`Background ${background.name} with choice ${choice.name}.`);

      this.$store.commit('setBackgroundModifications', { modifications: [choice.modifier] });
    },
  },
};
</script>

<style scoped lang="css">
</style>
