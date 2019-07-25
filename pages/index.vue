<template lang="html">

  <v-layout justify-center row wrap>

        <v-flex
          v-for="section in sections.filter(i=>i.isActive)"
          v-bind:key="section.key"
          xs12
          sm10
          md8
          lg6
        >

          <v-card height="100%" class="flexcard">

            <v-img :src="section.imageSrc" height="250" :class="section.classes"/>

            <v-card-text>
              <v-spacer /><span>© {{ section.imageCredit }}</span>
            </v-card-text>

            <v-card-title>
              <h2 class="headline">{{ section.title }}</h2>
            </v-card-title>

            <v-card-text>
              <p v-html="section.htmlText"></p>
            </v-card-text>

            <v-card-text class="grow">
            </v-card-text>

            <v-card-actions>
              <v-btn block nuxt :to="section.link.route" color="green">{{ section.link.text }}</v-btn>
            </v-card-actions>

          </v-card>

        </v-flex>

  </v-layout>

</template>

<script lang="js">
export default {
  components: {},
  head() {
    return {
      titleTemplate: '%s',
      title: 'Doctors of Doom | A Wrath & Glory fan page',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Within the Warhammer 40k Universe, the Doctors of Doom are serving the community for Wrath & Glory '
            + 'roleplaying game. Here you can find homebrews and (in the future) other W&G related stuff.',
        },
      ],
    };
  },
  data() {
    return {
      sections: [
        {
          key: 'vault',
          title: 'Vault - A collection of Wrath & Glory homebrews',
          imageSrc: '/img/artwork_forge_mozjpeg.jpg',
          imageCredit: 'unknown, found at warhammer40k.fandom.com',
          htmlText: 'An expanding collection of <strong>homebrews from fans</strong> of the Wrath ' +
            '& Glory RPG. Extend your known settings like the Inquisition or explore new ones, for ' +
            'example, the life of a Titan crew. Enter the <strong>Vault</strong> to find out more...',
          link: { text: 'To the Vault', route: '/vault' },
          isActive: true,
          classes: []
        },
        {
          key: 'forge',
          title: 'Forge - A Character Builder for Wrath & Glory',
          //imageSrc: '/img/artwork_mechanicus_aertist-alexboca_mozjpeg.jpg',
          //imageCredit: 'Artwork by AlexBoca (DevianArt)',
          imageSrc: '/img/artwork_abstract.jpg',
          imageCredit: 'Artwork by prettysleepy1 (Pixabay)',
          htmlText: 'Define the setting and tier of your campaign and start building a Wrath & ' +
            'Glory Character for your session.</p><p><strong>BETA Status, characters might get ' +
            'lost during updates</strong>',
          link: { text: 'To the Forge', route: '/builder/my-characters' },
          isActive: true,
          classes: [ ],
        },
      ],
    };
  },
};
</script>

<style scoped lang="css">
  .flexcard {
    display: flex;
    flex-direction: column;
  }
  .hover-card {
    cursor: pointer;
  }
  .hover-card:hover {
    -webkit-box-shadow: 0px 7px 8px -4px rgba(0,0,0,0.2), 0px 12px 17px 2px rgba(0,0,0,0.14), 0px 5px 22px 4px rgba(0,0,0,0.12) !important;
    box-shadow: 0px 7px 8px -4px rgba(0,0,0,0.2), 0px 12px 17px 2px rgba(0,0,0,0.14), 0px 5px 22px 4px rgba(0,0,0,0.12) !important;
  }
  .greyscale {
    -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
    filter: grayscale(100%);
  }
</style>
