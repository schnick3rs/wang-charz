<template>
  <div>

    <doom-tooltip
        v-show="showTooltip"
        :loading="tooltip.loading"
        :position="tooltip.position"
        :title="tooltipItem.title"
        :type="tooltipItem.type"
    >
      {{ tooltipItem.description }}
    </doom-tooltip>

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
        <ColorfulEntry
          :headline="post.fields.title"
          flavour="blog"
        >
          <v-row>
            <v-col :cols="12" :md="10">
              <p>{{ post.fields.description }}</p>
              <contentful-html-text :html="toHtml(post.fields.content)"></contentful-html-text>
            </v-col>
          </v-row>
        </ColorfulEntry>

        <v-row>
          <v-col
            :cols="12"
          >


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
import ColorfulEntry from '~/components/shared/ColorfulEntry';
import ContentfulHtmlText from '@/components/shared/ContentulHtmlText';
import DoomTooltip from '@/components/shared/DoomTooltip';

const fixedTime = new Date();

export default {
  name: 'BlogPostDetail',
  components: {
    DoomTooltip,
    ContentfulHtmlText,
    ColorfulEntry,
    DodDefaultBreadcrumbs,
  },
  mixins: [
    ArticleSchemaMixin,
    BreadcrumbSchemaMixin,
  ],
  /*async fetch() {
    const { data } = await this.$axios.get(`/api/posts/${this.$route.params.slug}`);
    this.post = data[0];
  },*/
  async asyncData({ params, app }) {
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
      tooltipItem: { title: '', description: '', type: '' },
    };
  },
  head() {
    const { title, description } = this.post.fields;
    const image = this.post.fields.imageTwitter
      ? `https:${this.post.fields.imageTwitter.fields.file.url}`
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
  mounted() {
    this.$root.$on('hoverHint', (payload) => {
      const { event, endpoint } = payload;
      const category = endpoint.split('/')[1].replace(/(^\w|-\w)/g, (g) => { return g.replace(/-/, "").toUpperCase(); });
      this.$axios.get(`/api${endpoint}`).then(({ data }) => {
        this.tooltipItem = {
          title: data.name,
          description: data.snippet,
          type: category,
          data,
        };
        this.tooltip.loading = false;
      });
      this.showTooltip = true;
      this.tooltip.position.x = `${event.pageX}px`;
      this.tooltip.position.y = `${event.pageY}px`;
    });
    this.$root.$on('hideHint', () => this.showTooltip = false );
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
  },
};
</script>

<style lang="scss" scoped>


</style>
