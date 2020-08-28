<template lang="html">

  <main>

    <v-layout>
      <v-container>

        <v-row>
          <div>{{$auth.loggedIn}}</div>
          <div>{{$store.state.auth.loggedIn}}</div>
          <div><pre>{{$store.state.auth}}</pre></div>
        </v-row>

        <v-row content="center" >

          <v-col :cols="12" :md="8">
            <div>
              <v-text-field outlined placeholder="email" type="email"></v-text-field>
              <v-text-field outlined placeholder="password" type="password"></v-text-field>
            </div>
            <span>--- or ---</span>
            <div v-for="s in strategies" :key="s.key" class="mb-2">
              <v-btn
                  block
                  :style="{background: s.color, color: 'white'}"
                  class="login-button"
                  @click="$auth.loginWith(s.key)"
              >
                Login with {{ s.name }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-layout>

  </main>

</template>

<script lang="js">

export default {
  layout: 'blank',
  head() {
    return {
      title: 'Login Page',
    };
  },
  computed: {
    strategies: () => [
      { key: 'auth0', name: 'Auth0', color: '#ec5425' },
      { key: 'google', name: 'Google', color: '#4284f4' },
      { key: 'facebook', name: 'Facebook', color: '#3c65c4' },
      { key: 'github', name: 'GitHub', color: '#202326' }
    ],
    isLoggedIn() {
      return this.$auth.loggedIn;
    },
    user() {
      return this.$auth.user;
    }
  },
};
</script>

<style scoped lang="css">
</style>
