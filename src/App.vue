<template>
  <v-app dark>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>W&G </span>
        Charz
      </v-toolbar-title>
      <v-btn><router-link to="/">Setting</router-link></v-btn>
      <v-btn><router-link to="/char/species">Species</router-link></v-btn>
      <v-btn><router-link to="/char/archetype">Archetype</router-link></v-btn>
      <v-btn><router-link to="/char/attributes">Attributes</router-link></v-btn>
      <v-btn><router-link to="/char/archetype">Skills</router-link></v-btn>
      <v-btn><router-link to="/char/archetype">Talents</router-link></v-btn>
      <v-btn><router-link to="/char/archetype">Background</router-link></v-btn>
      <v-btn><router-link to="/char/archetype">Ascension</router-link></v-btn>
      <v-btn><router-link to="/char/archetype">Powers</router-link></v-btn>
      <v-btn><router-link to="/char/archetype">Wargear</router-link></v-btn>
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
      //
    }
  }
}
</script>
