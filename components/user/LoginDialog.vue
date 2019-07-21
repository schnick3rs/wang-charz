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
            v-bind:value="newHash"
            v-on:click:append="copyToClipboard"
            label="Unique User Id"
            hint="Login, using your unique user hash."
            persistent-hint
            readonly
          ></v-text-field>
        </div>

        <!-- Show the readonly hash value -->
        <div v-if="isLoggedIn">
          <v-text-field
            v-bind:value="getHash"
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
        <v-btn v-if="!isLoggedIn" block color="success" v-on:click="login(newHash)">Login</v-btn>
        <v-btn v-if="isLoggedIn" block color="error" v-on:click="$emit('close')">Logout</v-btn>
      </v-card-actions>

      <v-card-actions>
        <p class="text-xs-center">No unique hash yet? <a v-on:click="register">Register</a> and generate one to persist characters.</p>
      </v-card-actions>

    </v-card>

  </div>
</template>

<script lang="js">
  import { mapActions, mapGetters } from 'vuex';

  export default {
  name: 'LoginDialog',
  data() {
    return {
      newHash: '',
      loading: false,
    };
  },
  computed: {
    ...mapGetters('user', ['isLoggedIn', 'getHash']),
  },
  methods: {
    ...mapActions('user', ['logout', 'login']),
    register() {
      this.loading = true;
      this.$axios.post('/api/account')
        .then( response => { this.newHash = response.data.hash; } )
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
