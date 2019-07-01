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

        <v-list-tile
          nuxt
          to="/builder/setting"
        >
          <v-list-tile-content >
            <v-list-tile-title>Tier {{settingTier}} Campaign</v-list-tile-title>
            <v-list-tile-sub-title>Framework</v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <span>{{spendBuildPoints}} / {{totalBuildPoints}} BP</span>
          </v-list-tile-action>

        </v-list-tile>

        <div
          v-for="entry in helperBox"
          :key="entry.key"
        >
          <v-divider v-if="entry.divider"></v-divider>

          <v-list-tile
            v-else
            avatar
            nuxt
            :to="entry.path"
          >
            <v-list-tile-content >
              <v-list-tile-title>{{entry.text}}</v-list-tile-title>
              <v-list-tile-sub-title>{{entry.hint}}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <span v-if="entry.text">{{entry.cost}} BP</span>
              <v-icon v-else>info</v-icon>
            </v-list-tile-action>

          </v-list-tile>

        </div>

      </v-list>

    </v-navigation-drawer>

    <v-toolbar
      app
      dense
      dark
      :fixed="toolbar.fixed"
      :clipped-left="toolbar.clippedLeft"
    >
      <v-toolbar-side-icon @click.stop="toggleDrawer"></v-toolbar-side-icon>

      <v-toolbar-items>
        <v-btn flat small nuxt to="/">Doctors of Doom</v-btn>
      </v-toolbar-items>

      <v-toolbar-title >
        <span class="text-capitalize">Forge</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>

      </v-toolbar-items>
    </v-toolbar>

    <v-content>

      <v-toolbar dense style="overflow: auto">
        <v-toolbar-items>
          <v-btn flat small nuxt to="/builder/setting" >Setting</v-btn>
          <v-btn flat small nuxt to="/builder/char/species" :disabled="!settingSelected">1. Species</v-btn>
          <v-btn flat small nuxt to="/builder/char/archetype" :disabled="!settingSelected">2. Archetype</v-btn>
          <v-btn flat small nuxt to="/builder/char/stats" :disabled="!settingSelected">3. Stats</v-btn>
          <v-btn flat small nuxt to="/builder/char/talents" :disabled="!settingSelected">4. Talents</v-btn>
          <v-btn flat small nuxt to="/builder/char/ascension" :disabled="!settingSelected">5. Ascension</v-btn>
          <v-btn flat small nuxt to="/builder/char/wargear" :disabled="!settingSelected">6. Wargear</v-btn>
          <v-btn flat small nuxt to="/builder/char/psychic-powers" :disabled="!settingSelected">7. Psychic Powers</v-btn>
          <v-btn flat small nuxt to="/builder/char/background" :disabled="!settingSelected">8. Background</v-btn>
          <v-btn
            flat
            small
            nuxt
            icon
            to="/builder/char/print"
            :disabled="!settingSelected"
          >
            <v-icon>description</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-container grid-list-md>

        <v-layout justify-center>

          <v-flex xs12 sm10 md9 lg8 xl7>
            <nuxt />
          </v-flex>

        </v-layout>

      </v-container>

    </v-content>

    <v-footer :app="true" class="pa-2" dark>
      <div>{{spendBuildPoints}} / {{totalBuildPoints}} BP</div>
      <v-spacer></v-spacer>
      <v-btn nuxt to="/about">About</v-btn>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>

  </v-app>
</template>

<script>
  import DefaultFooter from '~/components/DefaultFooter'

  export default {
  components: { DefaultFooter },
  head() {
    return {
      link: [
        { rel: 'canonical', href: `https://www.doctors-of-doom.com${this.$route.path}` }
      ]
    }
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
        mini: false
      },
      toolbar: {
        fixed: true,
        // sets if the toolbar contents is leaving space for drawer (false) or not (true)
        clippedLeft: true
      },
      footer: {
        // sets the CSS position of the footer
        fixed: true,
        // sets if the footer is full width (true) or gives space to the drawer (false)
        clippedLeft: true
      }
    }
  },
  methods: {
    // changes the drawer to permanent
    makeDrawerPermanent () {
      this.drawer.permanent = true
      // set the clipped state of the drawer and toolbar
      this.drawer.clipped = false
      this.toolbar.clippedLeft = false
    },
    // toggles the drawer variant (mini/full)
    toggleMiniDrawer () {
      this.drawer.mini = !this.drawer.mini
    },
    // toggles the drawer type (permanent vs temporary) or shows/hides the drawer
    toggleDrawer () {
      if (this.drawer.permanent) {
        this.drawer.permanent = !this.drawer.permanent
        // set the clipped state of the drawer and toolbar
        this.drawer.clipped = true
        this.toolbar.clippedLeft = true
      } else {
        // normal drawer
        this.drawer.open = !this.drawer.open
      }
    },
  },
  computed: {
    helperBox() {
      return [
        //{ path: '/builder/setting', hint: 'Framework', text: `Tier ${this.settingTier} Campaign`, cost: this.settingTier*100 },
        { divider: true },
        { path: '/builder/char/species', hint: 'Species', text: this.characterSpecies, cost: this.$store.state.species.cost },
        { path: '/builder/char/archetype', hint: 'Archetype', text: this.characterArchetype, cost: this.$store.state.archetype.cost },
        { path: '/builder/char/stats', hint: 'Stats', text: 'Attributes & Skills', cost: this.attributeCosts+this.skillCosts },
        { path: '/builder/char/talents', hint: `Talents (max ${this.maximumStartingTalents})`, text: `${this.characterTalents.length} Talents learned`, cost: this.talentCosts },
        { path: '/builder/char/ascension', hint: 'Ascension Packages', text: this.characterAscension, cost: this.ascensionCosts },
        { path: '/builder/char/psychic-powers', hint: `Powers (max ${this.maximumPsychicPowers})`, text: `${this.characterPsychicPowers.length} Powers learned`, cost: this.psychicPowerCosts },
        { divider: true },
        { path: '/builder/char/wargear', hint: '', text: 'Wargear', cost: undefined },
        { path: '/builder/char/background', hint: 'Background', text: this.characterBackground, cost: undefined },
      ];
    },

    settingSelected() { return this.$store.state.settingSelected; },
    settingTier() { return this.$store.state.settingTier; },
    totalBuildPoints() { return this.$store.state.settingTier * 100; },
    spendBuildPoints() { return this.$store.getters['spendBuildingPoints']; },

    maximumStartingTalents() { return Math.min(5,this.settingTier+1); },
    maximumPsychicPowers() { return this.settingTier+3; },

    attributeCosts() { return this.$store.getters['attributeCosts']; },
    skillCosts() { return this.$store.getters['skillCosts']; },
    talentCosts() { return this.$store.getters['talentCost']; },
    psychicPowerCosts() { return this.$store.getters['psychicPowerCost']; },
    ascensionCosts() { return this.$store.getters['ascensionCost']; },

    characterSpecies() { return this.$store.state.species.value; },
    characterArchetype() { return this.$store.state.archetype.value; },
    characterTalents() { return this.$store.state.talents; },
    characterPsychicPowers() { return this.$store.state.psychicPowers; },
    characterAscension() {
      if ( this.$store.state.ascensionPackages.length > 0 ) {
        return this.$store.state.ascensionPackages[0].value;
      }
      return '';
    },
    characterBackground() { return this.$store.state.background; },
  }
}
</script>
