<template lang="html">
  <v-row
    justify="center"
    no-gutters
    dense
  >
    <v-col
      v-for="section in sections"
      :key="section.key"
      :cols="12"
      :sm="12"
      :md="6"
      :lg="4"
      :xl="4"
      class="pa-3"
    >
      <v-card
        :to="section.link.route"
        :disabled="!section.isActive"
        class="card"
        exact
        nuxt
        hover
      >
        <div class="card__image-container">
          <div class="card__image" :style="{ backgroundImage: 'url('+section.imageSrc+')' }" loading />
        </div>

        <div class="card__content-container pa-4">
          <h2 class="headline" v-html="section.title" />

          <h3 class="card__content-subtitle pb-4 subtitle-2">
            {{ section.subtitle }}
          </h3>

          <p class="body-2 d-none d-sm-block" v-html="section.htmlText" />

          <div class="card__content-footer d-none d-sm-block">
            <v-btn block color="success">
              {{ section.link.text }}
            </v-btn>
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
    const title = 'Doctors of Doom | A Wrath & Glory fan page';
    const description = 'Within the Warhammer 40k Universe, the Doctors of Doom are serving the Wrath & Glory roleplaying game community. '
      + 'Here you find homebrews and a character creator & manager.';
    const image = 'https://www.doctors-of-doom.com/img/background_abstract_green.jpg';

    return {
      title,
      meta: [
        { hid: 'description', name: 'description', content: description },
        // Open Graph
        { hid: 'og:title', name: 'og:title', content: title },
        { hid: 'og:description', name: 'og:description', content: description },
        { hid: 'og:image', name: 'og:image', content: image },
        // Twitter Card
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'twitter:title', name: 'twitter:title', content: title },
        { hid: 'twitter:description', name: 'twitter:description', content: description },
        { hid: 'twitter:image', name: 'twitter:image', content: image },
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
          imageSrc: '/img/artwork_vault_tile.jpg',
          imageCredit: 'unknown, found at warhammer40k.fandom.com',
          htmlText:
            'The <strong>Vault</strong> contains an expanding collection of '
            + '<strong>homebrews from fans</strong> of the Wrath & Glory Roleplaying Game.',
          link: { text: 'To the Vault', route: '/vault' },
          isActive: true,
          classes: [],
        },
        {
          key: 'forge',
          title: 'Character <strong>Forge</strong>',
          subtitle: 'A Character Builder for Wrath & Glory',
          // imageSrc: '/img/artwork_mechanicus_aertist-alexboca_mozjpeg.jpg',
          // imageCredit: 'Artwork by AlexBoca (DevianArt)',
          imageSrc: '/img/artwork_forge_tile.jpg',
          imageCredit: 'Artwork by prettysleepy1 (Pixabay)',
          htmlText:
            'Define the setting and tier of your campaign and <strong>start building a Wrath & '
            + 'Glory Character</strong> for your session.',
          link: { text: 'To the Forge', route: '/forge/my-characters' },
          isActive: true,
          classes: [],
        },
        {
          key: 'bestiary',
          title: 'Threat <strong>Bestiary</strong>',
          subtitle: 'A repository of player threats',
          imageSrc: '/img/artwork_bestiary_death.png',
          imageCredit: 'Artwork from Pixabay',
          htmlText:
            'In search of new <strong>threats</strong> for your players? '
            + 'Check out the <strong>Wrath & Glory bestiary</strong>.'
            + 'Those also contain enemies from the fan homebrews you can find in the <strong>Vault</strong>.',
          link: { text: 'To the Bestiary', route: '/bestiary' },
          isActive: true,
          classes: [],
        },
        {
          key: 'network',
          title: 'Community <strong>Network</strong>',
          subtitle: 'Assets & Links',
          imageSrc: '/img/artwork_network_tile.jpg',
          imageCredit: 'Artwork from Pixabay',
          htmlText: 'Check out some (one) of the assets provided by the community. E.g. some <strong>fillable character sheets</strong>.',
          link: { text: 'To the Network', route: '/network' },
          isActive: true,
          classes: [],
        },
        {
          key: 'posts',
          title: 'Roleplaying <strong>Articles</strong>',
          subtitle: 'Writings about the Hobby',
          imageSrc: '/img/artwork_posts_tile.jpg',
          imageCredit: 'Artwork from Pixabay',
          htmlText: '',
          link: { text: 'To the Posts', route: '/posts' },
          isActive: true,
          classes: [],
        },
        {
          key: 'eather',
          title: 'Broadcasting <strong>Ether</strong>',
          subtitle: 'A browsable list of Lets Plays',
          imageSrc: '/img/artwork_ether.jpg',
          imageCredit: 'Artwork from Pixabay',
          htmlText: 'Find <strong>One-Shots</strong>, <strong>Lern to plays</strong> and <strong>Let´s Plays</strong>.<br><br><strong>Beta</strong>, naming might change.',
          link: { text: 'To the Ether', route: '/ether' },
          isActive: true,
          classes: [],
        },
        {
          key: 'library',
          title: 'Reference <strong>Library</strong>',
          subtitle: 'Browse Options for Characters',
          imageSrc: '/img/artwork_library_tile.jpg',
          imageCredit: 'Artwork from Pixabay',
          htmlText: 'Browse through Species, Archetypes, Wargear and more...',
          link: { text: 'To the Library', route: '/library' },
          isActive: true,
          classes: [],
        },
        {
          key: 'codex',
          title: 'Rules <strong>Codex</strong>',
          subtitle: 'Quick Rules References',
          imageSrc: '/img/artwork_codex_tile.jpg',
          imageCredit: 'Artwork from Pixabay',
          htmlText: 'Need to know how bleeding work? Check the Rules reference.',
          link: { text: 'To the Codex', route: '/codex' },
          isActive: true,
          classes: [],
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">

  // xs < 600
  .card {

    //max-width: 640px;
    height: 140px;
    display: flex;

    &__image-container {
      width: 30%;
      min-width: 30%;
      object-fit: contain;
      align-self: flex-start;
    }

    &__image {
      background-position: center center;
      background-size: cover;
      height: 140px;
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

  // sm small
  @media only screen and (min-width: 600px) {
    .card {
      height: 180px;

      &__image-container {
        width: 25%;
        min-width: 25%;
      }

      &__image {
        height: 180px;
      }
    }
  }

  // md medium
  @media only screen and (min-width: 960px) {
    .card {
      height: 240px;

      &__image-container {
        width: 25%;
        min-width: 25%;
      }

      &__image {
        height: 240px;
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
