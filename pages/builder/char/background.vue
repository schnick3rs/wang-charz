<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <v-layout justify-center row wrap>

    <v-flex
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
              flat
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

    </v-flex>

    <v-flex xs12 v-if="!characterBackground">

      <h1 class="headline">Select a background</h1>

      <v-card>

        <div
        >

          <v-list>

            <v-list-tile
              two-line
              v-for="item in backgroundRepository"
              :key="item.key"
              avatar
              @click.stop=""
            >

              <v-list-tile-content>
                <v-list-tile-title>{{item.name}}</v-list-tile-title>
                <v-list-tile-sub-title>{{item.hint}}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn icon
                       @click="select(item)"
                >
                  <v-icon color="green">add_circle</v-icon>
                </v-btn>
              </v-list-tile-action>

            </v-list-tile>

          </v-list>

        </div>
      </v-card>

    </v-flex>

  </v-layout>

</template>

<script lang="js">
export default {
  name: 'Background',
  layout: 'builder',
  props: [],
  data() {
    return {
      backgroundRepository: [
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
      return this.backgroundRepository.find(i => i.name === this.characterBackgroundName);
    },
  },
  methods: {
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
