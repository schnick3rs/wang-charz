<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <div class="page">

    <v-container>

      <v-layout>

        <v-flex xs6>
          <span>Name:</span>
          <span>Tier:</span>
          <span>Rank:</span>
        </v-flex>
        <v-flex xs3></v-flex>
        <v-flex xs3></v-flex>
        <v-flex xs6>
          <h2>Attributes</h2>
        </v-flex>
        <v-flex xs6>
          <h2>Combat Traits</h2>
        </v-flex>
        <v-flex xs6>
          <h2>Mental Traits</h2>
        </v-flex>
        <v-flex xs6>
          <h2>Social Traits</h2>
        </v-flex>
        <v-flex xs6>
          <h2>Skills</h2>
        </v-flex>
        <v-flex xs12>
          <h2>Weapons</h2>
        </v-flex>

      </v-layout>

    </v-container>

  </div>

</template>

<script lang="js">
export default {
  name: 'Print',
  layout: 'print',
  props: [],
  async asyncData({ params }) {
    return {}
  },
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style scoped lang="css">

  .page {

  }

</style>
