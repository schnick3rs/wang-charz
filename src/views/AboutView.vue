<template lang="html">

  <section class="about">

    <v-container grid-list-md>

      <v-layout justify-center row wrap>

        <v-flex xs12 sm10 md8 lg8>

          <h1>About this page</h1>

          <p>
            This page is an <strong>inofficial</strong> online character generator for the Warhammer 40k Role Playing Game Wrath & Glory.
            The game is currently published by <a href="https://www.cubicle7games.com/?p=3870">Cubical 7</a>.
          </p>

          <p>I was heavily motivated and inspired by <a href="https://www.reddit.com/user/althalin/">reddit user althalin</a>
             and his <a href="http://apps.ajott.io/dh2chargen/">Dark Heresy 2 Character Generator</a>. You should
          definitely check it out!</p>

          <p>Also, I quite often use the Official D&D Character Generator over at <a href="https://www.dndbeyond.com/">D&D Beyond</a>
            and draw inspiration how to organise the layout.</p>

          <h2>Disclaimer</h2>

          <p>
            I'm not associated to Cubical 7 or Games Workshop. I'm an enthusiastic fan that wants to support the
            Warhammer 40k Roleplaying community.
          </p>

          <p>This page is not endorsed, sponsored, or affiliated with Games Workshop Ltd., Ulisses Spiele, Cubical 7, or the WARHAMMER 40,000 franchise.</p>

        </v-flex>

      </v-layout>

    </v-container>

  </section>

</template>

<script lang="js">
  export default  {
    name: 'about',
    props: [],
    mounted() {

    },
    data() {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}
</script>

<style scoped lang="css">
  .about {

  }
</style>
