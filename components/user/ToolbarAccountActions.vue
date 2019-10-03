<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <div>
    <v-dialog
      v-model="loginDialog"
      width="500"
    >
      <login-dialog
        v-on:close="loginDialog = false"
      ></login-dialog>
    </v-dialog>

    <v-tooltip
      v-if="isAuthenticated"
      bottom
    >
      <template v-slot:activator="{ on }">
        <v-btn
          v-on="on"
          icon
          color="success"
        >
          <v-icon>person</v-icon>
        </v-btn>
      </template>
      <span>Logged in as {{loggedInUser.username}}</span>
    </v-tooltip>

    <v-btn
      title="Logout"
      v-else
      icon
      v-on:click.stop="loginDialog = true"
    >
      <v-icon>person_add</v-icon>
    </v-btn>

    <v-btn icon color="error" v-bind:disabled="!isAuthenticated" v-on:click="logout"><v-icon>exit_to_app</v-icon></v-btn>
  </div>
</template>

<script lang="js">
import { mapGetters } from 'vuex';
import LoginDialog from '~/components/user/LoginDialog.vue';
import RegisterDialog from '~/components/user/RegisterDialog.vue';

export default {
  name: 'ToolbarAccountActions',
  components: { LoginDialog, RegisterDialog },
  data() {
    return {
        loginDialog: false,
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  methods: {
    logout() {
      this.$auth.logout();
    }
  },
}
</script>

<style>

</style>
