<template>
  <div>

    <v-card v-show="loading">
      <v-card-text>
        <v-progress-circular indeterminate color="success"></v-progress-circular>
      </v-card-text>
    </v-card>

    <v-card v-if="!loading">

      <v-card-title>
        <span>User Account</span>
        <v-spacer></v-spacer>
        <v-btn v-on:click="$emit('close')" icon>
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>

        <div v-if="!isLoggedIn">
          <v-text-field
            v-model="username"
            v-bind:rules="[rules.required]"
            label="Username"
            hint=""
          ></v-text-field>

          <v-text-field
            v-model="password"
            v-bind:append-icon="showPassword ? 'visibility' : 'visibility_off'"
            v-bind:type="showPassword ? 'text' : 'password'"
            v-bind:rules="[rules.required, rules.min]"
            @click:append="showPassword = !showPassword"
            label="Password"
            hint="At least 8 characters"
            persistent-hint
          ></v-text-field>

        </div>

        <!-- Show the readonly uuid value -->
        <div v-if="isLoggedIn">
          <v-text-field
            v-bind:value="getUuid"
            v-on:click:append="copyToClipboard"
            label="Unique User Hash"
            append-icon="filter_none"
            hint="You unique hash to identify youself"
            persistent-hint
            readonly
          ></v-text-field>
        </div>

      </v-card-text>

      <v-card-actions>
        <v-btn v-if="!isLoggedIn" block color="success" v-on:click="login">Login</v-btn>
        <v-btn v-if="!isLoggedIn" block color="primary" v-on:click="register">Register</v-btn>
        <v-btn v-if="isLoggedIn" block color="error" v-on:click="$emit('close')">Logout</v-btn>
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
        required: value => !!value || 'Required',
        min: v => v.length >= 8 || 'Min 8 Characters'
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
        }
      };
      this.$auth.loginWith('local', user)
        .then( response => { } )
        .catch( error => { console.warn('An unexpected error'); } )
        .finally( () => {
          this.loading = false;
          this.$emit('close');
        });
    },
    register() {
      this.loading = true;
      const user = {
        username: this.username,
        password: this.password,
      };
      this.$axios.post('/api/users/register', user)
        .then( response => { } )
        .catch( error => { console.warn('An unexpected error'); } )
        .finally( () => { this.loading = false; } );
    },
    copyToClipboard(event) {
      console.info(event)
    },
  },
}
</script>

<style>

</style>
