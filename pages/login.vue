<template lang="html">
  <section class="about">
    <v-container grid-list-md>
      <v-row justify="center">
        <v-col :cols="12" sm="10" md="8" lg="8">
          <h1>You have logged in</h1>
          <p>{{ isLoggedIn }}</p>
          <p>{{ user }}</p>
        </v-col>
      </v-row>
    </v-container>

  </section>
</template>

<script lang="js">
export default {
  head() {
    return {
      title: 'About the Doctors of Doom',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'A fan page for the Warhammer 40k universe, especially the Wrath & Glory Role Playing game.',
        },
      ],
    };
  },
  computed: {
    isLoggedIn() {
      return this.$auth.loggedIn;
    },
    user() {
      return this.$auth.user;
    },
  }
};
</script>

<style scoped lang="css">
</style>
