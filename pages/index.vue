<template lang="html">

  <v-row
    justify="center"
    no-gutters
    dense
  >
        <v-col
          v-for="section in sections.filter(i=>i.isActive)"
          v-bind:key="section.key"
          v-bind:cols="12"
          v-bind:sm="12"
          v-bind:md="6"
          v-bind:lg="6"
          v-bind:xl="6"
          class="pa-3"
        >

          <v-card class="card" exact nuxt v-bind:to="section.link.route" hover>

            <div class="card__image-container">
              <div class="card__image" v-bind:style="{ backgroundImage: 'url('+section.imageSrc+')' }" loading></div>
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
          htmlText: 'Searching for a specific homebrew? ' +
            'The <strong>Vault</strong> contains an expanding collection of ' +
            '<strong>homebrews from fans</strong> of the Wrath & Glory Roleplaying Game. ' +
            'Extend your known settings like the Inquisition or explore new ones, for ' +
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
            'Glory Character for your session.' +
            '<br/><br/><strong>Latest Update: Organize multiple characters!</strong>' +
            '<br/><br/>Still considered <strong>BETA Status</strong>, thus characters <em>might</em> get lost during updates.',
          link: { text: 'To the Forge', route: '/forge/my-characters' },
          isActive: true,
          classes: [ ],
        },
        {
          key: 'bestiary',
          title: 'Threat <strong>Bestiary</strong>',
          subtitle: 'A repository of player threats',
          imageSrc: '/img/artwork_bestiary_death.png',
          imageCredit: 'Artwork from Pixabay',
          htmlText: 'In search of a <strong>challenge</strong> for your players? Maybe you find something in the threat bestiary.' +
            'Those also contain some enemies from the various fan homebrews you can find in the Vault. ' +
            '<br><br><strong>New Experimental Section</strong>, changes expected.',
          link: { text: 'To the Bestiary', route: '/bestiary' },
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
        {
          key: 'codex',
          title: 'Rules <strong>Codex</strong>',
          subtitle: 'Combat Rules References',
          imageSrc: '/img/artwork_codex_book.jpg',
          imageCredit: 'Artwork from Pixabay',
          htmlText: 'A quick reference for some of the combat rules.',
          link: { text: 'To the Codey', route: '/codex' },
          isActive: true,
          classes: [ ],
        },,
        {
          key: 'library',
          title: 'Reference <strong>Library</strong>',
          subtitle: 'Species, Archetypes and more',
          imageSrc: '/img/artwork_library.jpg',
          imageCredit: 'Artwork from Pixabay',
          htmlText: 'Browse through Species, Archetypes, Wargear and more...',
          link: { text: 'To the Library', route: '/library' },
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
    height: 400px;
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
      height: 400px;
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

  // md medium
  @media only screen and (min-width: 600px) {
    .card {
      height: 340px;

      &__image-container {
        width: 25%;
        min-width: 25%;
      }

      &__image {
        height: 340px;
      }
    }
  }

  // lg large
  @media only screen and (min-width: 960px) {
    .card {
      height: 300px;

      &__image-container {
        width: 25%;
        min-width: 25%;
      }

      &__image {
        height: 300px;
      }
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
