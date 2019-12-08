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
        :md="10"
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
            :md="6"
          >
            <v-card
              :to="`/posts/${post.id}-${post.slug}`"
              nuxt
              exact
              hover
            >
              <v-card-title>{{ post.shortTitle }}</v-card-title>
              <v-card-text>{{ post.abstract }}</v-card-text>
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
  asyncData() {
    const posts = [
      {
        id: 1,
        slug: 'our-migration-from-deathwatch-to-wrath-and-glory',
        shortTitle: 'From Deathwatch to Wrath & Glory',
        abstract:
          'Once you go Wrath & Glory, there is no turning back... '
          + 'We migrated out FFG Deathwatch campaign to Wrath and Glory. '
          + 'Here are the reasons why and how we did it.',
      },
    ];

    return {
      posts,
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
};
</script>

<style scoped lang="scss">

  .page-header {

    border-bottom: 2px solid black;

    &--doom-green {
      border-color: hsl(122, 39%, 49%);
    }
  }

</style>
