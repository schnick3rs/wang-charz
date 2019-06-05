<template>
  <v-app dark>

    <v-navigation-drawer app clipped mini-variant>

        <v-list class="pt-0" dense>

          <router-link v-for="route in routes" :key="route.name" :to="route">
            <v-list-tile @click="">

              <v-list-tile-action>{{route.name}}</v-list-tile-action>

              <v-list-tile-content>

                <v-list-tile-title>{{route.name}}</v-list-tile-title>

              </v-list-tile-content>

            </v-list-tile>
          </router-link>

        </v-list>

    </v-navigation-drawer>

    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>W&G </span>
        Charz
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Quick Reference</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer :app="true">
      {{spendBuildPoints}} / {{totalBuildPoints}}
    </v-footer>

  </v-app>
</template>

<script>
  import SpeciesSelection from "./components/SpeciesSelection";

  export default {
  name: 'App',
  components: {
    SpeciesSelection
  },
  data () {
    return {
      navigation: [
          { title: 'Setting', icon: 'dashboard' },
          { title: 'Species', icon: 'dashboard' },
      ]
    }
  },
  computed:{
    routes() { return this.$router.options.routes },
    totalBuildPoints() { return this.$store.getters.settingTier * 100; },
    spendBuildPoints() { return this.$store.getters.getSpendBuildingPoints; }
  }
}
</script>
