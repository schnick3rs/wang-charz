<template lang="html">

  <v-row
    justify="center"
    no-gutters
    dense
  >
        <v-col
          v-for="section in sections.filter(i=>i.isActive)"
          :key="section.key"
          :cols="12"
          :sm="6"
          :md="4"
          :lg="4"
          class="pa-3"
        >

          <v-card class="card" exact nuxt :to="section.link.route" hover>

            <div class="card__image-container">
              <div class="card__image" :style="{ backgroundImage: 'url('+section.imageSrc+')' }" loading></div>
            </div>

            <div class="card__content-container pa-4">

              <h2 class="headline" v-html="section.title"></h2>

              <h3 class="card__content-subtitle pb-4 subtitle-2">{{ section.subtitle }}</h3>

              <p class="body-2" v-html="section.htmlText"></p>

              <div class="card__content-footer">
                <v-btn block color="success">{{ section.link.text }}</v-btn>
              </div>

            </div>

          </v-card>

        </v-col>

  </v-row>

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
          title: 'Homebrew <strong>Vault</strong>',
          subtitle: 'A collection of Wrath & Glory homebrews',
          imageSrc: '/img/artwork_vault_bright.jpg',
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
          title: 'Character <strong>Forge</strong>',
          subtitle: 'A Character Builder for Wrath & Glory',
          //imageSrc: '/img/artwork_mechanicus_aertist-alexboca_mozjpeg.jpg',
          //imageCredit: 'Artwork by AlexBoca (DevianArt)',
          imageSrc: '/img/artwork_abstract.jpg',
          imageCredit: 'Artwork by prettysleepy1 (Pixabay)',
          htmlText: 'Define the setting and tier of your campaign and start building a Wrath & ' +
            'Glory Character for your session.<br/><br/><strong>BETA Status, characters might get ' +
            'lost during updates</strong>',
          link: { text: 'To the Forge', route: '/forge/my-characters' },
          isActive: true,
          classes: [ ],
        },
        {
          key: 'network',
          title: 'Community <strong>Network</strong>',
          subtitle: 'Assets & Links',
          imageSrc: '/img/artwork_network_cut.jpg',
          imageCredit: 'Artwork from Pixabay',
          htmlText: 'Check out some (one) of the assets provided by the community. E.g. some <strong>fillable character sheets</strong>.',
          link: { text: 'To the Network', route: '/network' },
          isActive: true,
          classes: [ ],
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">

  .card {

    //max-width: 640px;
    height: 340px;
    display: flex;

    &__image-container {
      width: 20%;
      min-width: 20%;
      object-fit: contain;
      align-self: flex-start;
    }

    &__image {
      background-position: center center;
      background-size: cover;
      height: 340px;
    }

    &__content-container {
      flex: 1 1 auto;
    }

    &__content-subtitle {

    }

    &__content-footer {
      position: absolute;
      bottom: 10px;
      right: 10px;
    }
  }

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
