<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>

    <v-dialog
      v-model="loginDialog"
      width="500"
    >
      <login-dialog
        @close="loginDialog = false"
      />
    </v-dialog>



    <v-tooltip
      bottom
    >
      <template v-slot:activator="{ on }">
        <span v-if="isLoggedIn" v-on="on">
          <v-avatar size="64" v-if="user.picture"><img :src="user.picture" :alt="user.name"></v-avatar>
          <v-btn v-else icon color="success"><v-icon>person</v-icon></v-btn>
          {{user.name}}
        </span>
      </template>
      <span>{{user}}</span>
    </v-tooltip>

    <v-btn
      :disabled="isLoggedIn"
      title="Login"
      @click.stop="loginDialog = true"
    >
      Sign in
    </v-btn>

    <v-btn
      :disabled="isLoggedIn"
      title="Login"
      @click.stop="loginDialog = true"
    >
      Register
    </v-btn>

    <v-btn
      :disabled="!isLoggedIn"
      icon
      color="error"
      @click.stop="logout"
    >
      <v-icon>exit_to_app</v-icon>
    </v-btn>
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
    // ...mapGetters(['isAuthenticated', 'loggedInUser']),
    isLoggedIn() {
      return this.$auth.loggedIn;
    },
    user() {
      return this.$auth.user;
    },
  },
  methods: {
    async logout() {
      console.info(`Logging out user ${this.$auth.user.name}...`);
      await this.$auth.logout();
      console.info('Logout done!')
    },
  },
};
</script>

<style>

</style>
