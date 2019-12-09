<template>
  <div>
    <v-card v-show="loading">
      <v-card-text>
        <v-progress-circular indeterminate color="success" />
      </v-card-text>
    </v-card>

    <v-card v-if="!loading">
      <v-card-title>
        <span>User Account</span>
        <v-spacer />
        <v-btn icon @click="$emit('close')">
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <div v-if="!isLoggedIn">
          <v-text-field
            v-model="username"
            :rules="[rules.required]"
            label="Username"
            hint=""
          />

          <v-text-field
            v-model="password"
            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
            :type="showPassword ? 'text' : 'password'"
            :rules="[rules.required]"
            label="Password"
            persistent-hint
            @click:append="showPassword = !showPassword"
          />
        </div>
      </v-card-text>

      <v-card-actions>
        <v-btn v-if="!isLoggedIn" block color="success" @click="login">
          Login
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="js">
import { mapGetters } from 'vuex';

export default {
  name: 'LoginDialog',
  data() {
    return {
      username: '',
      password: '',
      showPassword: false,
      rules: {
        required: (value) => !!value || 'Required',
        min: (v) => v.length >= 8 || 'Min 8 Characters',
      },
      loading: false,
    };
  },
  computed: {
    ...mapGetters('user', ['isLoggedIn', 'getUuid']),
  },
  methods: {
    login() {
      this.loading = true;
      const user = {
        data: {
          username: this.username,
          password: this.password,
        },
      };
      this.$auth.loginWith('local', user)
        .then((response) => { })
        .catch((error) => { console.warn('An unexpected error'); })
        .finally(() => {
          this.loading = false;
          this.$emit('close');
        });
    },
  },
};
</script>

<style>

</style>
