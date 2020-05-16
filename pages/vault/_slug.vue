<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <!-- Breadcrumbs -->
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
        <header class="page-header page-header--doom-green">
          <h1 class="headline">{{ item.fields.title }}</h1>
          <h2 class="subtitle-2 grey--text">
            {{ item.fields.subtitle }}
          </h2>
        </header>

        <article class="post-html-container">

          <v-row>
            <v-col :cols="12" :sm="6">
              <h3 class="title">
                Author
              </h3>
              <p>
                {{ item.fields.author }}
              </p>

              <div>
                <h3 class="title">
                  Version Info
                </h3>
                <p>
                  {{ item.fields.status }} {{ item.fields.version }}
                </p>
              </div>

              <h3 class="title">
                Abstract
              </h3>
              <p>
                {{ item.fields.abstract }}
              </p>
            </v-col>

            <v-col :cols="12" :sm="3">
              <span class="subtitle-2">Topics / Content:</span>
              <ul>
                <li v-for="parts in item.fields.contentTags" :key="parts">
                  <nuxt-link
                    v-if="['Archetypes','Ascension Packages','Species'].includes(parts)"
                    :to="`/library/${textToKebab(parts)}?filter-source=${item.fields.key}`"
                  >
                    {{ parts }}
                  </nuxt-link>
                  <nuxt-link
                    v-else-if="['Threats'].includes(parts)"
                    :to="`/bestiary?filter-source=${item.fields.key}`"
                  >
                    {{ parts }}
                  </nuxt-link>
                  <span v-else>{{ parts }}</span>
                </li>
              </ul>
            </v-col>

            <v-col v-if="item.fields.image && item.fields.image.fields.file.url" :cols="12" :sm="3">
              <v-img :src="item.fields.image.fields.file.url" />
            </v-col>

            <v-col v-if="item.fields.links && item.fields.links.length > 0" :cols="12" :sm="3">
              <span class="subtitle-2">Support or follow the author:</span>

              <ul v-if="item.fields.links && item.fields.links.length > 0" class="mb-4">
                <li v-for="link in item.fields.links" :key="link.title">
                  <a class="mr-2" :href="link.url" target="_blank">{{ link.name }}</a>
                </li>
              </ul>
            </v-col>
          </v-row>

          <div>
            <p v-if="item.fields.keywordTags">
              <span class="subtitle-2">Keywords / Tags:</span><br>
              <v-chip
                v-for="keyword in item.fields.keywordTags"
                :key="keyword"
                class="mr-2 mb-1 mt-1"
                small
                label
              >
                {{ keyword }}
              </v-chip>
            </p>
          </div>

          <div>
            <v-btn color="primary" :href="item.fields.url" target="_blank" @click="trackEvent(item.fields.url)">
              View the document
              <v-icon right dark>
                launch
              </v-icon>
            </v-btn>
          </div>

        </article>

      </v-col>
    </v-row>
  </div>
</template>

<script>
import DodDefaultBreadcrumbs from '~/components/DodDefaultBreadcrumbs';
import SchemaDigitalDocument from '~/assets/SchemaDigitalDocument.json';
import SluggerMixin from '~/mixins/SluggerMixin';

export default {
  components: {
    DodDefaultBreadcrumbs,
  },
  mixins: [
    SluggerMixin,
  ],
  head() {
    const itemSchema = {
      ...SchemaDigitalDocument,
      name: this.item.fields.title,
      alternativeHeadline: this.item.fields.subtitle,
      author: this.item.fields.author,
      version: this.item.fields.version || this.item.fields.status,
      url: this.item.fields.url,
      thumbnailUrl: this.item.fields.image ? this.item.fields.image.fields.file.url : null,
      description: this.item.fields.abstract,
      keywords: [...this.item.fields.keywordTags, 'Wrath & Glory'].join(','),
    };

    const breadcrumbListSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: this.breadcrumbItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: (index === 0 ? 'Doctors of Doom' : item.text),
        item: `https://www.doctors-of-doom.com${item.to}`,
      })),
    };

    const title = `${this.item.fields.title}`;
    const description = `${this.item.fields.subtitle}. ${this.item.fields.abstract}`;
    const image = this.item.fields.image ? `https://www.doctors-of-doom.com${this.item.fields.image.fields.file.url}` : 'https://www.doctors-of-doom.com/img/artwork_vault_bright.jpg';

    return {
      titleTemplate: '%s | A Wrath & Glory Homebrew',
      title,
      meta: [
        { hid: 'description', name: 'description', content: description },
        { hid: 'og:title', name: 'og:title', content: title },
        { hid: 'og:description', name: 'og:description', content: description },
        { hid: 'og:image', name: 'og:image', content: image },
        {
          hid: 'keywords',
          name: 'keywords',
          content: [
            ...this.item.fields.keywordTags,
            'Homebrew',
            'Supplement',
            'Wrath & Glory',
          ].join(','),
        },
      ],
      __dangerouslyDisableSanitizers: ['script'],
      script: [
        { innerHTML: JSON.stringify(itemSchema), type: 'application/ld+json' },
        { innerHTML: JSON.stringify(breadcrumbListSchema), type: 'application/ld+json' },
      ],
    };
  },
  validate({}) {
    return true;
  },
  async asyncData({ params, $axios, error }) {
    const { slug } = params;

    try {
      // fetch all blog posts sorted by creation date
      const { data } = await $axios.get(`/api/homebrews/${slug}`);
      const item = data[0];

      return {
        item,
        slug,
      };
    } catch(err) {
      error({ statusCode: 404, message: 'Post not found' });
    }
  },
  data() {
    return {};
  },
  computed: {
    breadcrumbItems() {
      return [
        { text: '', nuxt: true, exact: true, to: '/' },
        { text: 'Vault', nuxt: true, exact: true, to: '/vault' },
        { text: this.item.fields.title, disabled: true, nuxt: true, to: `/vault/${this.slug}` },
      ];
    },
  },
  methods: {
    trackEvent(url) {
      this.$ga.event('Outbound Link', 'click', url, 10);
    },
  },
};
</script>

<style lang="scss">

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
    & li > p {
      margin-bottom: 0;
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
