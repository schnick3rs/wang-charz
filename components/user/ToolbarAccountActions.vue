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
      v-if="false"
      bottom
    >
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          color="success"
          v-on="on"
        >
          <v-icon>person</v-icon>
        </v-btn>
      </template>
      <span>Logged in as {{ loggedInUser.username }}</span>
    </v-tooltip>

    <v-btn
      v-else
      title="Logout"
      icon
      @click.stop="loginDialog = true"
    >
      <v-icon>person_add</v-icon>
    </v-btn>

    <v-btn v-if="false" icon color="error" :disabled="true" @click="logout">
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
  },
  methods: {
    logout() {
      this.$auth.logout();
    },
  },
};
</script>

<style>

</style>
