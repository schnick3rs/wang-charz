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

    <v-dialog
      v-model="registerDialog"
      width="500"
    >
      <register-dialog
        @close="registerDialog = false"
      />
    </v-dialog>

    <v-tooltip
      bottom
      v-if="$store.state.auth.loggedIn"
    >
      <template v-slot:activator="{ on }">
        <span v-on="on">
          <v-avatar size="16" v-if="$store.state.auth.user.picture">
            <img :src="$store.state.auth.user.picture" :alt="$store.state.auth.user.name">
          </v-avatar>
          <v-btn v-else icon color="success"><v-icon>person</v-icon></v-btn>
          {{$store.state.auth.user.name}}
        </span>
      </template>
      <div>
        <div>{{$store.state.auth.loggedIn}}</div>
        <div>{{$store.state.auth.loggedIn}}</div>
        <div><pre>{{$store.state.auth}}</pre></div>
      </div>
    </v-tooltip>

    <v-btn
      :disabled="$store.state.auth.loggedIn"
      title="Login"
      @click.stop="loginDialog = true"
    >
      Sign in
    </v-btn>

    <v-btn
      :disabled="$store.state.auth.loggedIn"
      title="Register"
      @click.stop="registerDialog = true"
    >
      Register
    </v-btn>

    <v-btn
      :disabled="!$store.state.auth.loggedIn"
      icon
      color="error"
      @click="logout()"
    >
      <v-icon>exit_to_app</v-icon>
    </v-btn>
  </div>
</template>

<script lang="js">
import LoginDialog from '~/components/user/LoginDialog.vue';
import RegisterDialog from '~/components/user/RegisterDialog.vue';

export default {
  name: 'ToolbarAccountActions',
  components: { LoginDialog, RegisterDialog },
  data() {
    return {
      loginDialog: false,
      registerDialog: false,
    };
  },
  computed: {
    isLoggedIn () {
      return this.$store.state.auth.loggedIn;
    },
    user () {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    logout() {
      console.info(`Logging out user ${this.$store.state.auth.user.username}...`);
      this.$auth.logout();
      console.info('Logout done!')
    },
  },
};
</script>

<style>

</style>
