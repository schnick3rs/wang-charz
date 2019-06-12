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

            <v-list-tile
                    v-for="route in routes"
                    @click="navigateTo(route)"
                    :to="{ name: route.name }"
                    :disabled="route.name !== 'Setting' && route.meta.type === 'builder' && !settingSelected"
            >

              <v-list-tile-content>

                <v-list-tile-title>{{route.name}}</v-list-tile-title>

              </v-list-tile-content>

            </v-list-tile>

        </v-list>

    </v-navigation-drawer>

    <v-toolbar app dense dark
               :fixed="toolbar.fixed"
               :clipped-left="toolbar.clippedLeft"
    >
      <v-toolbar-side-icon @click.stop="toggleDrawer"></v-toolbar-side-icon>

      <v-toolbar-title class="headline hover" @click="navigateTo({name:'Home'})">
        <span>Doctors of Doom</span>
      </v-toolbar-title>

      <v-toolbar-title v-if="$router.currentRoute.name !== 'Home'">
        <span class="text-capitalize">{{ $router.currentRoute.meta.type }}</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>

      </v-toolbar-items>

    </v-toolbar>

    <v-content>

      <v-toolbar dense v-if="isBuilderPage" style="overflow: auto">
        <v-toolbar-items>
          <v-btn flat small :to="{ name: 'Setting' }" >Setting</v-btn>
          <v-btn flat small :to="{ name: 'Species' }"     :disabled="!settingSelected">1. Species</v-btn>
          <v-btn flat small :to="{ name: 'Archetype' }"   :disabled="!settingSelected">2. Archetype</v-btn>
          <v-btn flat small :to="{ name: 'Stats' }"       :disabled="!settingSelected">3. Stats</v-btn>
          <v-btn flat small :to="{ name: 'Talents' }"     :disabled="!settingSelected">4. Talents</v-btn>
          <v-btn flat small :to="{ name: 'Ascension' }"   :disabled="!settingSelected">5. Ascension</v-btn>
          <v-btn flat small :to="{ name: 'Wargear' }"     :disabled="!settingSelected">6. Wargear</v-btn>
          <v-btn flat small :to="{ name: 'Background' }"  :disabled="!settingSelected">7. Background</v-btn>
          <v-btn v-if="false" flat small icon :to="{ name: 'About' }" :disabled="!settingSelected"><v-icon>picture_as_pdf</v-icon></v-btn>
          <v-btn flat small icon :to="{ name: 'About' }" :disabled="!settingSelected"><v-icon>description</v-icon></v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <router-view></router-view>
    </v-content>

    <v-footer :app="true" class="pa-2" dark>
      <div>{{spendBuildPoints}} / {{totalBuildPoints}} BP</div>
      <v-spacer></v-spacer>
      <v-btn :to="{name: 'About'}">About</v-btn>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>

  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  beforeMount() {
    if ( !this.settingSelected && this.$route.meta.type === 'builder' ) {
      console.warn("No setting selected, redirecting to setting view.")
      this.$router.push({ name: "Setting" });
    }
  },
  data () {
    return {
      navigation: [
          { title: 'Setting', icon: 'dashboard' },
          { title: 'Species', icon: 'dashboard' },
      ],
      drawer: {
        // sets the open status of the drawer
        open: false,
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
    isBuilderPage() {
      return this.$route.meta.type === 'builder';
    },
    settingSelected() { return this.$store.getters.settingSelected; },
    routes() { return this.$router.options.routes },
    totalBuildPoints() { return this.$store.getters.settingTier * 100; },
    spendBuildPoints() { return this.$store.getters.getSpendBuildingPoints; }
  }
}
</script>

<style scoped lang="css">
    .hover:hover {
      cursor: pointer;
    }
</style>