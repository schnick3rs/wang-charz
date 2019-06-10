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

          <h2>Technology</h2>

          <p>
            This website is build with <a href="https://vuejs.org/">Vue.js</a> using the <a href="https://vuetifyjs.com/">vuetify</a> martial design.
            The code is available on my <a href="https://github.com/schnick3rs/wang-charz">github repository</a>.
            The app itself is currently hosted via <a href="https://www.heroku.com/">heroku</a>, a web cloud service that
            I use to distribute sandbox projects or similar.
            I also use <a href="https://sheety.co">Sheety</a> during development. It allows to read google sheets using
            a REST call that returns the sheets content as JSON. I will switch to a database soon, but this allows me to
            quickly use some data without having the hazzle of setting up a database and respective connections.
          </p>

          <h2>Disclaimer</h2>

          <p>
            I'm not associated to Cubical 7 or Games Workshop. I'm an enthusiastic fan that wants to support the
            Warhammer 40k Roleplaying community.
          </p>

          <p>https://www.games-workshop.com</p>

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
