<template>

  <v-app>

    <v-navigation-drawer
      app
      :clipped="drawer.clipped"
      :fixed="drawer.fixed"
      :permanent="drawer.permanent"
      :mini-variant="drawer.mini"
      v-model="drawer.open"
      width="220"
    >
      <v-list two-line subheader dense>

        <v-list-item
          nuxt
          to="/builder/setting"
        >
          <v-list-item-content >
            <v-list-item-title>Tier {{settingTier}} Campaign</v-list-item-title>
            <v-list-item-subtitle>Framework</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <span>{{spendBuildingPoints}} / {{totalBuildPoints}} BP</span>
          </v-list-item-action>

        </v-list-item>

        <div
          v-for="entry in helperBox"
          :key="entry.key"
        >
          <v-divider v-if="entry.divider"></v-divider>

          <v-list-item
            v-else
            nuxt
            :to="entry.path"
          >
            <v-list-item-content >
              <v-list-item-title>{{entry.text}}</v-list-item-title>
              <v-list-item-subtitle>{{entry.hint}}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <span v-if="entry.text">{{entry.cost}} BP</span>
              <v-icon v-else>info</v-icon>
            </v-list-item-action>

          </v-list-item>

        </div>

      </v-list>

    </v-navigation-drawer>

    <v-app-bar
      app
      dark
      dense    
      style="background-color: #212121;"
      :fixed="toolbar.fixed"
      :clipped-left="toolbar.clippedLeft"
    >

      <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>

      <v-toolbar-items>
        <v-btn icon nuxt to="/"><v-icon>home</v-icon></v-btn>
      </v-toolbar-items>

      <v-toolbar-title class="pl-4">Doctors of Doom</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>

      </v-toolbar-items>
    </v-app-bar>

    <v-content>

      <v-toolbar dense style="overflow: auto">
        <v-toolbar-items>
          <v-btn small text nuxt to="/builder/setting" >Setting</v-btn>
          <v-btn small text nuxt to="/builder/char/species" :disabled="!settingSelected">1. Species</v-btn>
          <v-btn small text nuxt to="/builder/char/archetype" :disabled="!settingSelected">2. Archetype</v-btn>
          <v-btn small text nuxt to="/builder/char/ascension" :disabled="!settingSelected">3. Ascension</v-btn>
          <v-btn small text nuxt to="/builder/char/stats" :disabled="!settingSelected">4. Stats</v-btn>
          <v-btn small text nuxt to="/builder/char/talents" :disabled="!settingSelected">5. Talents</v-btn>
          <v-btn small text nuxt to="/builder/char/wargear" :disabled="!settingSelected">6. Wargear</v-btn>
          <v-btn small text nuxt to="/builder/char/psychic-powers" :disabled="!settingSelected">7. Psychic Powers</v-btn>
          <v-btn small text nuxt to="/builder/char/background" :disabled="!settingSelected" >8. Background</v-btn>
          <v-btn
            small 
            nuxt
            icon
            to="/builder/char/print"
            v-bind:disabled="!settingSelected"
            target="_blank"
          >
            <v-icon>description</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-container>

        <v-btn
          v-if="false"
          small
          color="green lighten-2"
          style="position: fixed; top: 174px; right: 350px; margin-right: 50%;"
        >
          <v-icon>chevron_left</v-icon>
        </v-btn>

        <v-row justify="center">

          <v-col
            :cols="12"
            :sm="10"
            :md="10"
            :lg="7"
          >
            <nuxt />
          </v-col>

        </v-row>

        <v-btn
          v-if="false"
          small
          color="green lighten-2"
          style="position: fixed; top: 174px; left: 350px; margin-left: 50%;"
        >
          <v-icon>chevron_right</v-icon>
        </v-btn>

      </v-container>

    </v-content>

    <v-footer
      app
      dark
      v-bind:color="(spendBuildingPoints > totalBuildPoints) ? 'error' : ''"
      class="caption"
    >
      <div>{{spendBuildingPoints}} / {{totalBuildPoints}} BP</div>
      <v-spacer ></v-spacer>
      <div class="caption d-none d-sm-block">{{finalKeywords.join(' • ')}}</div>
      <v-spacer></v-spacer>
      <span>&copy; {{ new Date().getFullYear() }} </span><span class="d-none d-md-block"> Doctors of Doom</span>
    </v-footer>

  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import DefaultFooter from '~/components/DefaultFooter';
import Default from './default';

export default {
  components: {
    Default,
    DefaultFooter },
  head() {
    return {
      titleTemplate: '%s | Character Builder',
      title: 'Create your Character',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Build you Wrath & Glory Character and explore the Warhammer 40k Universe. ' +
            'Select Species and Archetype, learn some Talents, acquire Wargear and (if needed) ' +
            'tap into the warp powers.',
        },
      ],
      link: [
        { rel: 'canonical', href: `https://www.doctors-of-doom.com${this.$route.path}` },
      ],
    };
  },
  data() {
    return {
      drawer: {
        // sets the open status of the drawer
        open: true,
        // sets if the drawer is shown above (false) or below (true) the toolbar
        clipped: true,
        // sets if the drawer is CSS positioned as 'fixed'
        fixed: false,
        // sets if the drawer remains visible all the time (true) or not (false)
        permanent: false,
        // sets the drawer to the mini variant, showing only icons, of itself (true)
        // or showing the full drawer (false)
        mini: false,
      },
      toolbar: {
        fixed: true,
        // sets if the toolbar contents is leaving space for drawer (false) or not (true)
        clippedLeft: true,
      },
      footer: {
        // sets the CSS position of the footer
        fixed: true,
        // sets if the footer is full width (true) or gives space to the drawer (false)
        clippedLeft: true,
      },
    };
  },
  methods: {
    // changes the drawer to permanent
    makeDrawerPermanent() {
      this.drawer.permanent = true;
      // set the clipped state of the drawer and toolbar
      this.drawer.clipped = false;
      this.toolbar.clippedLeft = false;
    },
    // toggles the drawer variant (mini/full)
    toggleMiniDrawer() {
      this.drawer.mini = !this.drawer.mini;
    },
    // toggles the drawer type (permanent vs temporary) or shows/hides the drawer
    toggleDrawer() {
      if (this.drawer.permanent) {
        this.drawer.permanent = !this.drawer.permanent;
        // set the clipped state of the drawer and toolbar
        this.drawer.clipped = true;
        this.toolbar.clippedLeft = true;
      } else {
        // normal drawer
        this.drawer.open = !this.drawer.open;
      }
    },
  },
  computed: {
    helperBox() {
      return [
        // { path: '/builder/setting', hint: 'Framework', text: `Tier ${this.settingTier} Campaign`, cost: this.settingTier*100 },
        { divider: true },
        { path: '/builder/char/species', hint: 'Species', text: this.characterSpecies, cost: this.$store.state.species.cost },
        { path: '/builder/char/archetype', hint: 'Archetype', text: this.characterArchetype, cost: this.$store.state.archetype.cost },
        { path: '/builder/char/ascension', hint: 'Ascension Packages', text: this.characterAscension, cost: this.ascensionCosts },
        { path: '/builder/char/stats', hint: 'Stats', text: 'Attributes & Skills', cost: this.attributeCosts + this.skillCosts },
        { path: '/builder/char/talents', hint: `Talents (max ${this.maximumStartingTalents})`, text: `${this.characterTalents.length} Talents learned`, cost: this.talentCosts },
        { path: '/builder/char/psychic-powers', hint: `Powers (max ${this.maximumPsychicPowers})`, text: `${this.characterPsychicPowers.length} Powers learned`, cost: this.psychicPowerCosts },
        { divider: true },
        { path: '/builder/char/wargear', hint: '', text: 'Wargear', cost: undefined },
        { path: '/builder/char/background', hint: 'Background', text: this.characterBackground, cost: undefined },
      ];
    },

    ...mapGetters([
      // setting
      'settingSelected',
      'settingTier',
      // spending
      'spendBuildingPoints',
      // costs
      'attributeCosts',
      'skillCosts',
      'talentCosts',
      'psychicPowerCosts',
      'ascensionCosts',
      // misc
      'keywords',
      'finalKeywords',
    ]),

    totalBuildPoints() {
      const buildPoints = this.$store.state.settingTier * 100;
      const xp = this.$store.getters.customXp;
      return buildPoints + xp;
    },

    // see core page 156
    maximumBuildPointsForAttributes() {
      const bpLimits = [0, 100, 100, 150, 200, 300];
      return bpLimits[this.settingTier()];
    },
    maximumStartingTalents() { return Math.min(5, this.settingTier + 1); },
    maximumPsychicPowers() { return this.settingTier + 3; },

    characterSpecies() { return this.$store.state.species.value; },
    characterArchetype() { return this.$store.state.archetype.value; },
    characterTalents() { return this.$store.state.talents; },
    characterPsychicPowers() { return this.$store.state.psychicPowers; },
    characterAscension() {
      if (this.$store.state.ascensionPackages.length > 0) {
        return this.$store.state.ascensionPackages[0].value;
      }
      return '';
    },
    characterBackground() { return this.$store.state.background; },
  },
};
</script>

<style scoped lang="scss">
  .dod-container {
    
    @media (min-width: 768px) {
      width: 680px;
    }

  }
</style>
