<template lang="html">
  <section class="about">
    <v-container grid-list-md>
      <v-row justify="center">
        <v-col :cols="12" sm="10" md="8" lg="8">
          <h1>About this page</h1>

          <p>
            This page is an <strong>inofficial</strong> fan page for the Warhammer 40k Role Playing Game Wrath & Glory.
            The game is currently published by <a href="https://www.cubicle7games.com/?p=3870">Cubical 7</a>.
          </p>


          <h2>The Character Generator</h2>

          <p>
            I was heavily motivated and inspired by <a href="https://www.reddit.com/user/althalin/">reddit user althalin</a>
            and his <a href="http://apps.ajott.io/dh2chargen/">Dark Heresy 2 Character Generator</a>. You should
            definitely check it out!
          </p>

          <p>
            Also, I quite often use the Official D&D Character Generator over at <a href="https://www.dndbeyond.com/">D&D Beyond</a>
            and draw inspiration how to organise the layout.
          </p>

          <p>
            The Forge uses icons from <a href="https://game-icons.net/">game-icons.net</a>, check them out!
          </p>


          <h2>Contact</h2>
          <p>
            You can reach out to via mail by <a href="mailto:docsofdoom+contact@gmail.com?subject=Contact">docsofdoom+contact(at)gmail.com</a>.
          </p>


          <h2>Private Policy Information</h2>
          <p>
            The Doctors-of-Doom website uses Google Analytics (and thus, the <em>_GA</em> cookie) with anonymized IP to improve user experience and check if anybody is visiting the page at all.
            You can use the <a href="https://tools.google.com/dlpage/gaoptout?hl=de">Google Analytics Opt-out Browser Add-on</a> from Google to "to prevent their [your] data from being used by Google Analytics".
          </p>


          <h2>Disclaimer</h2>
          <p>
            I'm not associated to Cubical 7 or Games Workshop. I'm an enthusiastic fan that wants to support the
            Warhammer 40k Roleplaying community.
          </p>

          <p>This page is not endorsed, sponsored, or affiliated with Games Workshop Ltd., Ulisses Spiele, Cubical 7, or the WARHAMMER 40,000 franchise.</p>

          <p />
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
};
</script>

<style scoped lang="css">
</style>
