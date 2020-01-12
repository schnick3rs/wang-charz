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
              <h1>{{ post.fields.title }}</h1>
            </header>

            <article class="post-html-container">

              <p>{{ post.fields.description }}</p>

              <div v-html="toHtml(post.fields.content)" class="markdown-html"></div>

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
import ArticleSchemaMixin from '~/mixins/ArticleSchemaMixin';
import { BLOCKS } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const fixedTime = new Date();

export default {
  name: 'BlogPostDetail',
  components: {
    DodDefaultBreadcrumbs,
  },
  mixins: [
    ArticleSchemaMixin,
    BreadcrumbSchemaMixin,
  ],
  /**
   * @see https://regenrek.com/posts/create-a-frontmatter-markdown-powered-blog-with-nuxt-js-in-2019/
   *
   * @param params
   * @returns {Promise<*>}
   */
  async asyncData({ params, env, app }) {
    const slug = params.slug;

    try {
      // fetch all blog posts sorted by creation date
      const { data } = await app.$axios.get(`/api/posts/${slug}`);
      const post = data[0];

      return {
        post,
        slug,
      };
    } catch(err) {
      console.warn(err);
      return false
    }
  },
  data() {
    return {
      showTooltip: false,
      tooltip: {
        position: { x: 0, y: 0 },
        loading: false,
      },
      hintBoxItem: { title: '', description: '', type: '' },
    };
  },
  head() {
    const { title, description } = this.post.fields;
    const image = this.post.fields.imageTwitter
      ? this.post.fields.imageTwitter.fields.file.url
      : `https://www.doctors-of-doom.com/img/artwork_posts.jpg`;

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
        { innerHTML: JSON.stringify(this.articleJsonLdSchema(this.post, image)), type: 'application/ld+json' },
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
          text: this.post.fields.shortTitle, disabled: false, nuxt: true, exact: true, to: `/posts/${this.post.fields.slug}`,
        },
      ];
    },
  },
  methods: {
    toHtml(rich) {
      const options = {
        renderNode: {
          [BLOCKS.EMBEDDED_ASSET]: (node) => `<img src="https:${node.data.target.fields.file.url}"/>`,
        }
      };
      return documentToHtmlString(rich, options);
    },
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

<style lang="scss">

  .markdown-html {

    & ul,ol {
      margin-bottom: 16px !important;
    }

    & code {
      color: hsl(122, 39%, 49%)
    }

    & blockquote {

      background-color: lightyellow;
      padding: 8px 16px;
      font-size: 18px;
      font-weight: 300;
      border-bottom: 1px solid lightgray;
      border-top: 1px solid lightgray;
      margin-top: 8px;
      margin-bottom: 16px;

      & p {
        //padding: 12px 12px 12px 24px;
        font-size: 18px;
        font-weight: 300;
        margin: 0;
      }

    }

  }

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
    & img {
      width: 100%;
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
