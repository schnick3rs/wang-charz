<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <!-- Breadcrumbs -->
    <dod-default-breadcrumbs :items="breadcrumbItems" />

    <v-row justify="center">
      <v-col :cols="8">
        <div class="mb-4">
          <h1 class="headline">
            {{ item.title }}
          </h1>
          <h2 class="subtitle-2 grey--text">
            {{ item.subtitle }}
          </h2>
        </div>

        <v-row>
          <v-col :cols="12" :sm="6">
            <h3 class="title">
              Author
            </h3>
            <p>
              {{ item.author }}
            </p>

            <div>
              <h3 class="title">
                Version Info
              </h3>
              <p>
                {{ item.status }} {{ item.version }}
              </p>
            </div>

            <h3 class="title">
              Abstract
            </h3>
            <p>
              {{ item.abstract }}
            </p>
          </v-col>

          <v-col v-if="item.thumbnail" :cols="12" :sm="3">
            <v-img :src="item.thumbnail" />
          </v-col>

          <v-col :cols="12" :sm="3">
            <span class="subtitle-2">Topics / Content:</span>
            <ul>
              <li v-for="parts in item.topics" :key="parts">
                <nuxt-link
                  v-if="['Archetypes','Ascension Packages','Species'].includes(parts)"
                  :to="`/library/${textToKebab(parts)}?filter-source=${item.key}`"
                >
                  {{ parts }}
                </nuxt-link>
                <nuxt-link
                  v-else-if="['Threats'].includes(parts)"
                  :to="`/bestiary?filter-source=${item.key}`"
                >
                  {{ parts }}
                </nuxt-link>
                <span v-else>{{ parts }}</span>
              </li>
            </ul>
          </v-col>

          <v-col v-if="item.links && item.links.length > 0" :cols="12" :sm="3">
            <span class="subtitle-2">Support or follow the author:</span>

            <ul v-if="item.links && item.links.length > 0" class="mb-4">
              <li v-for="link in item.links" :key="link.title">
                <a class="mr-2" :href="link.url" target="_blank">{{ link.name }}</a>
              </li>
            </ul>
          </v-col>
        </v-row>

        <div>
          <p v-if="item.keywords">
            <span class="subtitle-2">Keywords / Tags:</span><br>
            <v-chip
              v-for="keyword in item.keywords"
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
          <v-btn color="primary" :href="item.url" target="_blank" @click="trackEvent(item.url)">
            View the document
            <v-icon right dark>
              launch
            </v-icon>
          </v-btn>
        </div>
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
      name: this.item.title,
      alternativeHeadline: this.item.subtitle,
      author: this.item.author,
      version: this.item.version || this.item.status,
      url: this.item.url,
      thumbnailUrl: this.item.thumbnail ? `https://www.doctors-of-doom.com${this.item.thumbnail}` : null,
      description: this.item.abstract,
      keywords: [...this.item.keywords, 'Wrath & Glory'].join(','),
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

    const title = `${this.item.title}`;
    const description = `${this.item.subtitle}. ${this.item.abstract}`;
    const image = this.item.thumbnail ? `https://www.doctors-of-doom.com${this.item.thumbnail}` : 'https://www.doctors-of-doom.com/img/artwork_vault_bright.jpg';

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
            ...this.item.keywords,
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
  data() {
    return {};
  },
  computed: {
    breadcrumbItems() {
      return [
        {
          text: '', nuxt: true, exact: true, to: '/',
        },
        {
          text: 'Vault', nuxt: true, exact: true, to: '/vault',
        },
        {
          text: this.item.title, disabled: true, nuxt: true, to: `/vault/${this.slug}`,
        },
      ];
    },
  },
  async asyncData({ params, $axios, error }) {
    const { slug } = params;
    const vaultItemResponse = await $axios.get(`/api/homebrews/${slug}`);
    const vaultItem = vaultItemResponse.data;

    if (vaultItem === undefined || vaultItem.length <= 0) {
      error({ statusCode: 404, message: 'Post not found' });
    }

    return {
      item: vaultItem,
      slug,
    };
  },
  methods: {
    trackEvent(url) {
      this.$ga.event('Outbound Link', 'click', url, 10);
    },
  },
};
</script>
