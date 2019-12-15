<template>
  <div>
    <div
      v-show="showTooltip"
      class="tooltip-container"
      :style="{ left: tooltip.position.x, top: tooltip.position.y }"
    >
      <v-card v-if="tooltip.loading" dark color="success" class="text-center">
        <v-progress-circular indeterminate />
      </v-card>
      <v-card v-else raised dark color="success">
        <v-card-title class="tooltip-container__header">
          {{ hintBoxItem.title }}
        </v-card-title>
        <v-card-text>
          {{ hintBoxItem.description }}
        </v-card-text>
      </v-card>
    </div>

    <dod-default-breadcrumbs :items="breadcrumbItems" />

    <v-row
      justify="center"
      no-gutters
      dense
      class="mt-4"
    >
      <v-col
        :cols="12"
        :md="12"
      >
        <v-row>
          <v-col
            :cols="12"
          >
            <header class="page-header page-header--doom-green">
              <h1>{{ page.title }}</h1>
            </header>
          </v-col>

          <v-col
            v-for="post in posts"
            :key="post.id"
            :cols="12"
            :sm="6"
            :md="4"
          >
            <v-card
              :to="`/posts/${post.attributes.id}-${post.attributes.slug}`"
              nuxt
              exact
              hover
              height="400px"
            >
              <v-img
                v-if="post.attributes.image"
                :src="post.attributes.image"
                min-height="180px"
                max-height="180px"
                class="align-end justify-end"
              >
                <div class="image-caption pa-2 pt-1 pb-1 caption">
                   <span
                     class="image-caption__time-since white--text"
                   >
                    {{ post.attributes.publishedAt | timeSince }} by
                  </span>
                  <span class="image-caption__by-author success--text ml-1">
                    {{ post.attributes.author }}
                  </span>
                </div>
              </v-img>
              <v-card-title>{{ post.attributes.shortTitle }}</v-card-title>
              <v-card-text>{{ post.attributes.description }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import DodDefaultBreadcrumbs from '~/components/DodDefaultBreadcrumbs';
import BreadcrumbSchemaMixin from '~/mixins/BreadcrumbSchemaMixin';
const fixedTime = new Date();

export default {
  name: 'OurMigrationFromDeathwatchToWrathAndGlory',
  components: {
    DodDefaultBreadcrumbs,
  },
  mixins: [
    BreadcrumbSchemaMixin,
  ],
  data() {
    return {
      page: {
        title: 'Posts',
        description: 'some text',
      },
      showTooltip: false,
      tooltip: {
        position: { x: 0, y: 0 },
        loading: false,
      },
      hintBoxItem: { title: '', description: '', type: '' },
    };
  },
  computed: {
    breadcrumbItems() {
      return [
        {
          text: '', disabled: false, nuxt: true, exact: true, to: '/',
        },
        {
          text: 'Posts', disabled: false, nuxt: true, exact: true, to: '/posts',
        },
      ];
    },
  },
  async asyncData() {
    const resolve = require.context("~/posts/", true, /\.md$/);
    const imports = resolve.keys()
    .map((key) => {
      const [, name] = key.match(/\/(.+)\.md$/);
      return resolve(key);
    }).sort((a, b) => new Date(b.attributes.publishedAt) - new Date(a.attributes.publishedAt) )
    .filter( p => !p.attributes.status || p.attributes.status === 'Draft');
    const posts = [
      ...imports,
      /*
      {
        id: 1,
        slug: 'our-migration-from-deathwatch-to-wrath-and-glory',
        shortTitle: 'From Deathwatch to Wrath & Glory',
        abstract:
          'Once you go Wrath & Glory, there is no turning back... '
          + 'We migrated out FFG Deathwatch campaign to Wrath and Glory. '
          + 'Here are the reasons why and how we did it.',
      },
      {
        id: 2,
        slug: 'the-journey-of-the-golden-goose-session-zero',
        shortTitle: 'The Golden Goose #0',
        abstract:
          'Let\'s take a look at our first session from our log running tier 3 campaign',
      },
      */
    ];

    return {
      posts,
      fixedTime: new Date(),
    };
  },
  head() {
    const { title } = this.page;
    const { description } = this.page;
    // const image = `https://www.doctors-of-doom.com${this.post.image}`;

    return {
      title,
      titleTemplate: '%s | Posts',
      meta: [
        { hid: 'description', name: 'description', content: description },

        { hid: 'og:title', name: 'og:title', content: title },
        { hid: 'og:description', name: 'og:description', content: description },
        // { hid: 'og:image', name: 'og:image', content: image },

        // { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'twitter:title', name: 'twitter:title', content: title },
        { hid: 'twitter:description', name: 'twitter:description', content: description },
        // { hid: 'twitter:image', name: 'twitter:image', content: image },
      ],
      __dangerouslyDisableSanitizers: ['script'],
      script: [
        { innerHTML: JSON.stringify(this.breadcrumbJsonLdSchema(this.breadcrumbItems)), type: 'application/ld+json' },
      ],
    };
  },
  filters: {
    timeSince(value) {
      const date = new Date(value);
      const seconds = Math.floor((fixedTime - date) / 1000);

      let interval = Math.floor(seconds / 31536000);

      interval = Math.floor(seconds / 86400);

      if (interval > 7) {
        let options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString("en-US", options);
      }

      if (interval > 1) {
        return interval + " days ago";
      }
      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
        return interval + " hours ago";
      }
      interval = Math.floor(seconds / 60);
      if (interval > 1) {
        return interval + " minutes ago";
      }
      return Math.floor(seconds) + " seconds ago";
    },
  }
};
</script>

<style scoped lang="scss">

  .page-header {

    border-bottom: 2px solid black;

    &--doom-green {
      border-color: hsl(122, 39%, 49%);
    }
  }

  .image-caption {
    background-color: hsla(300, 6%, 3%, 0.8);
    justify-content: flex-end;
    display: flex;

    &__time-since {

    }

    &__by-author {

    }
  }

</style>
