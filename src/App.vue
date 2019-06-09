<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-app >

    <v-navigation-drawer
      app
      :clipped="drawer.clipped"
      :fixed="drawer.fixed"
      :permanent="drawer.permanent"
      :mini-variant="drawer.mini"
      v-model="drawer.open"
      width="180"
    >

        <v-list class="pt-0">

            <v-list-tile v-for="route in routes" @click="navigateTo(route)">

              <v-list-tile-content>

                <v-list-tile-title>{{route.name}}</v-list-tile-title>

              </v-list-tile-content>

            </v-list-tile>

        </v-list>

    </v-navigation-drawer>

    <v-toolbar app
               :fixed="toolbar.fixed"
               :clipped-left="toolbar.clippedLeft"
    >
      <v-toolbar-side-icon @click.stop="toggleDrawer"></v-toolbar-side-icon>

      <v-toolbar-title class="headline text-uppercase">
        <span>W&G </span>
        Charz
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn
                flat
                href="https://github.com/schnick3rs/wang-charz"
        >
          <v-icon class="mr-2">code</v-icon>
          <span>GitHub</span>
        </v-btn>

        <v-btn
                flat
                href="https://github.com/vuetifyjs/vuetify/releases/latest"
                target="_blank"
        >
          <span class="mr-2">Quick Reference</span>
        </v-btn>
      </v-toolbar-items>

    </v-toolbar>

    <v-content>

      <v-toolbar dense class="hidden-xs-only">
        <v-toolbar-items>
          <v-btn flat small>Setting</v-btn>
          <v-btn flat small>1. Species</v-btn>
          <v-btn flat small>2. Archetype</v-btn>
          <v-btn flat small>3. Stats</v-btn>
          <v-btn flat small>4. Ascension</v-btn>
          <v-btn flat small>5. Wargear</v-btn>
          <v-btn flat small>6. Background</v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <router-view></router-view>
    </v-content>

    <v-footer :app="true">
      {{spendBuildPoints}} / {{totalBuildPoints}}
    </v-footer>

  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      navigation: [
          { title: 'Setting', icon: 'dashboard' },
          { title: 'Species', icon: 'dashboard' },
      ],
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
        //
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
    navigateTo(route) {
      this.$router.push(route);
    },
  },
  computed:{
    routes() { return this.$router.options.routes },
    totalBuildPoints() { return this.$store.getters.settingTier * 100; },
    spendBuildPoints() { return this.$store.getters.getSpendBuildingPoints; }
  }
}
</script>

<style scoped lang="css">

</style>