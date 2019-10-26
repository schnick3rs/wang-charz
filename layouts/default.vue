<template>

  <v-app>

    <v-app-bar
      app
      dark
      dense
      style="background-color: #212121;"
      :fixed="toolbar.fixed"
      :clipped-left="toolbar.clippedLeft"
    >

      <v-toolbar-items>
        <v-btn icon nuxt to="/"><v-icon>home</v-icon></v-btn>
      </v-toolbar-items>

      <v-toolbar-title class="pl-4">Doctors of Doom</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
      </v-toolbar-items>

    </v-app-bar>

    <v-content>

      <v-container>
        <nuxt />
      </v-container>

    </v-content>

    <default-footer />

  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import DefaultFooter from '~/components/DefaultFooter.vue';
import ToolbarAccountActions from '~/components/user/ToolbarAccountActions.vue';

export default {
  components: {
    DefaultFooter,
    ToolbarAccountActions,
  },
  head() {
    return {
      link: [
        { rel: 'canonical', href: `https://www.doctors-of-doom.com${this.$route.path}` },
      ],
    };
  },
  data() {
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
};
</script>
