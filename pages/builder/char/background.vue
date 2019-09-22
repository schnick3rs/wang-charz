<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <v-row justify-center row wrap>

    <v-col
      xs12
      v-if="characterBackground"
    >
      <v-card>

        <v-card-title primary-title>
          <div>
            <div class="headline">{{ characterBackground.name }}</div>
            <span class="grey--text">{{ characterBackground.hint}}</span>
          </div>
          <div>
            <v-btn
              text
              color="red"
              @click="removeBackground(characterBackground)"
            >
              <v-icon>remove_circle</v-icon>
              remove background
            </v-btn>
          </div>
        </v-card-title>

        <v-card-text>
          <p>{{characterBackground.crunch.effect}}</p>
        </v-card-text>

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

  </v-row>

</template>

<script lang="js">
import BackgroundRepositoryMixin from '~/mixins/BackgroundRepositoryMixin';
import BackgroundPreview from '~/components/builder/BackgroundPreview.vue';

export default {
  name: 'Background',
  layout: 'builder',
  mixins: [ BackgroundRepositoryMixin ],
  components: { BackgroundPreview },
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
      backgroundRepositoryDeprecated: [
        {
          name: 'Origin (Shock)',
          hint: '+3 Shock',
          crunch: {
            targetGroup: 'traits',
            targetValue: 'shock',
            modifier: 3,
            hint: 'Origin as Background',
            source: 'background',
          },
        },
        {
          name: 'Origin (Wounds)',
          hint: '+1 Wound',
          crunch: {
            targetGroup: 'traits',
            targetValue: 'wounds',
            modifier: 1,
            hint: 'Origin as Background',
            source: 'background',
          },
        },
        {
          name: 'Keyword',
          hint: 'Close connection to the organisation and valuable contacts.',
          crunch: {
            effect: 'Send message. Access information, equipment and small favours once per '
              + 'session.',
            hint: 'Keyword as Background',
            source: 'background',
          },
        },
        {
          name: 'Accomplishment (Influence)',
          hint: '+1 Influence',
          crunch: {
            targetGroup: 'traits',
            targetValue: 'influence',
            modifier: 1,
            hint: 'Accomplishment as Background',
            source: 'background',
          },
        },
        {
          name: 'Accomplishment (Wealth)',
          hint: '+2 Wealth',
          crunch: {
            targetGroup: 'traits',
            targetValue: 'wealth',
            modifier: 2,
            hint: 'Accomplishment as Background',
            source: 'background',
          },
        },
        {
          name: 'Goal',
          hint: 'Additional Glory on accomplishing Objectives.',
          crunch: {
            effect: 'Characters who choose a goal as their background gain +1 Glory in addition '
              + 'to gaining +1 Wrath any time that they accomplish an Objective.',
            hint: 'Goal as Background',
            source: 'background',
          },
        },
      ],
    };
  },
  computed: {
    characterBackgroundName() {
      return this.$store.state.background;
    },
    characterBackground() {
      return this.backgroundRepositoryDeprecated.find(i => i.name === this.characterBackgroundName);
    },
  },
  methods: {
    openDialog(item) {
      this.dialogItem = item;
      this.dialog = true;
    },
    selectBackgroundForChar(item) {
      console.info(`${item.name} selected.`);
      this.dialog = false;
    },
    select(item) {
      this.$store.commit('setBackground', { name: item.name });
      this.$store.commit('setBackgroundModifications', { modifications: [item.crunch] });
      this.selectedBackground = item;
    },
    removeBackground() {
      this.$store.commit('setBackground', { name: undefined });
      this.$store.commit('clearEnhancementsBySource', { source: 'background' });
      this.selectedBackground = undefined;
    }
  },
};
</script>

<style scoped lang="css">
</style>
