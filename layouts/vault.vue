<template>
  <v-app>
    <v-toolbar
      app
      dense
      dark
      :fixed="toolbar.fixed"
      :clipped-left="toolbar.clippedLeft"
    >
      <v-toolbar-items>
        <v-btn text small nuxt to="/">Doctors of Doom</v-btn>
      </v-toolbar-items>

      <v-toolbar-title >
        <span class="text-capitalize">Vault</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>

      </v-toolbar-items>
    </v-toolbar>

    <v-content>

      <v-container grid-list-md>
        <nuxt />
      </v-container>

    </v-content>

    <v-footer :app="true" class="pa-2" dark>
      <v-spacer></v-spacer>
      <v-btn v-if="false" nuxt to="/private-policy">Private Policy</v-btn>
      <v-btn nuxt to="/about">About</v-btn>
      <div>&copy; {{ new Date().getFullYear() }} Doctors of Doom</div>
    </v-footer>

  </v-app>
</template>

<script>
export default {
  head() {
    return {
      link: [
        { rel: 'canonical', href: `https://www.doctors-of-doom.com${this.$route.path}` },
      ],
    };
  },
  data() {
    return {
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
