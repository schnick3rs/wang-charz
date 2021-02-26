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
      <v-container class="pa-0 fill-height" :class="{ 'pl-2 pr-2': this.$vuetify.breakpoint.mdAndUp }">
      <v-toolbar-items>
        <v-btn icon nuxt to="/">
          <v-icon>home</v-icon>
        </v-btn>
      </v-toolbar-items>

      <v-toolbar-title class="pl-4">
        Doctors of Doom
      </v-toolbar-title>

      <v-spacer />

      <v-toolbar-items>
        <v-btn icon nuxt to="/about">
          <v-icon>help</v-icon>
        </v-btn>
      </v-toolbar-items>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-toolbar dense style="overflow: auto">
        <v-container class="pa-0 fill-height" :class="{ 'pl-2 pr-2': this.$vuetify.breakpoint.mdAndUp }">
        <v-toolbar-items>
          <v-btn text small nuxt to="/library/wargear/weapons">
            Weapons
          </v-btn>
          <v-btn text small nuxt to="/library/wargear/armour">
            Armour
          </v-btn>
        </v-toolbar-items>
        </v-container>
      </v-toolbar>

      <v-container>
        <v-row justify="center" no-gutters>
          <v-col
            :cols="12"
            :xl="8"
          >
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <default-footer />
  </v-app>
</template>

<script>
import DefaultFooter from '~/components/DefaultFooter';

export default {
  components: { DefaultFooter },
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
