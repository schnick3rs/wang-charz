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
              <h1>{{ post.title }}</h1>
            </header>

            <article class="post-html-container">
              <p>{{ post.abstract }}</p>



            </article>

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
  name: 'TheJourneyOfTheGoldenGooseSessionZero',
  components: {
    DodDefaultBreadcrumbs,
  },
  mixins: [
    BreadcrumbSchemaMixin,
  ],
  data() {
    return {
      post: {
        id: 3,
        title: 'The Journey of the Golden Goose - Session 01',
        shortTitle: 'The Golden Goose #1',
        slug: 'the-journey-of-the-golden-goose-session-01',
        abstract:
          'Vulpes gathers more passangers ',
        author: {
          id: 1,
          name: 'Brother Lucius',
          avatar: '',
        },
        //image: '/img/chronic_goose_session-0.jpg',
        image: '/img/artwork_posts.jpg',
        tags: [
          'Setting',
          'Journey of the Golden Goose',
        ],
        publishedAt: '2019-12-10T08:00:00+08:00',
        modifiedAt: '2019-12-10T08:00:00+08:00',
      },
      showTooltip: false,
      tooltip: {
        position: { x: 0, y: 0 },
        loading: false,
      },
      hintBoxItem: { title: '', description: '', type: '' },
    };
  },
  head() {
    const { title } = this.post;
    const description = this.post.abstract;
    const image = `https://www.doctors-of-doom.com${this.post.image}`;
    const articleJsonLdSchema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPost',
      datePublished: this.post.publishedAt,
      dateModified: this.post.modifiedAt,
      headline: title,
      description,
      image,
      author: {
        '@type': 'Person',
        name: this.post.author.name,
      },
    };
    return {
      title,
      titleTemplate: '%s | Blog',
      meta: [
        { hid: 'description', name: 'description', content: description },
        { hid: 'og:title', name: 'og:title', content: title },
        { hid: 'og:description', name: 'og:description', content: description },
        { hid: 'og:image', name: 'og:image', content: image },
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'twitter:title', name: 'twitter:title', content: title },
        { hid: 'twitter:description', name: 'twitter:description', content: description },
        { hid: 'twitter:image', name: 'twitter:image', content: image },
      ],
      __dangerouslyDisableSanitizers: ['script'],
      script: [
        { innerHTML: JSON.stringify(this.breadcrumbJsonLdSchema(this.breadcrumbItems)), type: 'application/ld+json' },
        { innerHTML: JSON.stringify(articleJsonLdSchema), type: 'application/ld+json' },
      ],
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
        {
          text: this.post.shortTitle, disabled: false, nuxt: true, exact: true, to: `/posts/${this.post.id}-${this.post.slug}`,
        },
      ];
    },
  },
  methods: {
    setHintBoxItem($event, talentId) {
      this.tooltip.loading = true;
      this.$axios.get(`/api/talents/${talentId}`)
      .then(({ data }) => {
        this.hintBoxItem = {
          title: data.name,
          description: data.effect,
          type: 'Talent',
        };
        this.tooltip.loading = false;
      });
      this.showTooltip = true;
      this.tooltip.position.x = `${$event.pageX}px`;
      this.tooltip.position.y = `${$event.pageY}px`;
    },
  },
};
</script>

<style scoped lang="scss">

  .tooltip {

    font-weight: 600;
    text-decoration: none;
    color: hsl(122, 39%, 49%);

    &--talent {
    }
  }

  .tooltip-container {

    z-index: 1;
    position: absolute;
    min-width: 450px;
    max-width: 450px;
    min-height: 100px;
    &__header {

    }
    &__content {

    }
  }

  .post-wrapper {
  }

  .page-header {
    border-bottom: 2px solid black;
    &--doom-green {
      border-color: hsl(122, 39%, 49%);
    }
  }

  .post-html-container {
    border-left: 0.5px solid hsl(122, 39%, 79%);
    border-right: 0.5px solid hsl(122, 39%, 79%);
    border-bottom: 2px solid hsl(122, 39%, 49%);
    background: white;
    padding: 20px 10px;
    margin-bottom: 20px;
    //column-count: 2;
    & h2, h3 {
      //column-span: all;
    }
    & p {
    }
  }

  .sexy-line{
    display:block;
    border:none;
    color:white;
    height:1px;
    background:black;
    background: -webkit-gradient(radial, 50% 50%, 0, 50% 50%, 350, from(#000), to(#fff));
  }
</style>
