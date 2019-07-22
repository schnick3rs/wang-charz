<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-app>
    <v-toolbar
      app
      dense
      dark
      :fixed="toolbar.fixed"
      :clipped-left="toolbar.clippedLeft"
    >
      <v-toolbar-items>
        <v-btn flat small nuxt to="/">Doctors of Doom</v-btn>
      </v-toolbar-items>

      <v-spacer></v-spacer>

      <v-toolbar-items>

        <v-dialog
          v-model="loginDialog"
          lazy
          width="500"
        >
          <login-dialog
            v-on:close="loginDialog = false"
          ></login-dialog>
        </v-dialog>

        <v-btn v-on:click.stop="loginDialog = true">Login</v-btn>

        <v-tooltip
          v-if="isLoggedIn"
          bottom
        >
          <template v-slot:activator="{ on }">
            <v-btn
              v-on="on"
              flat
              small
              icon
              color="success"
            >
              <v-icon>person</v-icon>
            </v-btn>
          </template>
          <span>{{getUuid}}</span>
        </v-tooltip>

        <v-btn
          v-else
          flat
          small
          icon
          v-on:click="register"
        >
          <v-icon>person_add</v-icon>
        </v-btn>

        <v-btn flat small icon color="error" v-bind:disabled="!isLoggedIn" v-on:click="logout"><v-icon>exit_to_app</v-icon></v-btn>

      </v-toolbar-items>

    </v-toolbar>

    <v-content>

      <v-container grid-list-md>
        <nuxt />
      </v-container>

    </v-content>

    <default-footer />

  </v-app>
</template>

<script>
  import DefaultFooter from '~/components/DefaultFooter.vue';
  import LoginDialog from '~/components/user/LoginDialog.vue';
  import { mapActions, mapGetters } from 'vuex';

  export default {
  components: { DefaultFooter, LoginDialog },
  head() {
    return {
      link: [
        { rel: 'canonical', href: `https://www.doctors-of-doom.com${this.$route.path}` },
      ],
    };
  },
  data() {
    return {
      loginDialog: false,
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
  computed: {
    ...mapGetters('user', ['isLoggedIn', 'getUuid']),
  },
  methods: {
    ...mapActions('user', ['logout', 'register'])
  },
};
</script>
