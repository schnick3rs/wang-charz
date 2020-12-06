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
        :md="12"
      >
        <ColorfulEntry :headline="item.title" flavour="vault">
          <v-row>
            <v-col :cols="12" :md="10">
              <h2 class="subtitle-2 grey--text">
                {{ item.subtitle }}
              </h2>

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
                      {{ item.version }}
                    </p>
                  </div>

                  <h3 class="title">
                    Abstract
                  </h3>
                  <p>
                    {{ item.abstract }}
                  </p>
                </v-col>

                <v-col :cols="12" :sm="3">
                  <span class="subtitle-2">Topics / Content:</span>
                  <ul>
                    <li v-for="parts in item.contentTags" :key="parts">
                      <nuxt-link
                        v-if="['Archetypes','Ascension Packages','Species'].includes(parts)"
                        :to="`/library/${textToKebab(parts)}?filter-source=${item.sourceKey}`"
                      >
                        {{ parts }}
                      </nuxt-link>
                      <nuxt-link
                        v-else-if="['Threats'].includes(parts)"
                        :to="`/bestiary?filter-source=${item.sourceKey}`"
                      >
                        {{ parts }}
                      </nuxt-link>
                      <span v-else>{{ parts }}</span>
                    </li>
                  </ul>
                </v-col>

                <v-col v-if="item.image && item.image.fields.file.url" :cols="12" :sm="3">
                  <v-img :src="item.image.fields.file.url" />
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
                <p v-if="item.keywordTags">
                  <span class="subtitle-2">Keywords / Tags:</span><br>
                  <v-chip
                    v-for="keyword in item.keywordTags"
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
                <v-btn color="primary" :href="item.documentUrl" target="_blank" @click="trackEvent(item.documentUrl)">
                  View the document
                  <v-icon right dark>
                    launch
                  </v-icon>
                </v-btn>
              </div>
            </v-col>
          </v-row>

        </ColorfulEntry>

      </v-col>
    </v-row>
  </div>
</template>

<script>
import DodDefaultBreadcrumbs from '~/components/DodDefaultBreadcrumbs';
import SchemaDigitalDocument from '~/assets/SchemaDigitalDocument.json';
import SluggerMixin from '~/mixins/SluggerMixin';
import ColorfulEntry from '~/components/shared/ColorfulEntry';

export default {
  components: {
    ColorfulEntry,
    DodDefaultBreadcrumbs,
  },
  mixins: [
    SluggerMixin,
  ],
  head() {
    const item = this.item;
    const itemSchema = {
      ...SchemaDigitalDocument,
      name: item.title,
      alternativeHeadline: item.subtitle,
      author: item.author,
      version: item.version,
      url: item.url,
      thumbnailUrl: item.image ? item.image.fields.file.url : null,
      description: item.abstract,
      keywords: item.keywordTags ? [...item.keywordTags, 'Wrath & Glory'].join(',') : 'Wrath & Glory',
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

    const title = `${item.title}`;
    const description = `${item.subtitle}. ${item.abstract}`;
    const image = item.image ? `${item.image.fields.file.url}` : 'https://www.doctors-of-doom.com/img/artwork_vault_bright.jpg';
    const keywords = item.keywordTags ? [
      ...item.keywordTags, 'Homebrew', 'Supplement', 'Wrath & Glory',] : ['Homebrew', 'Supplement', 'Wrath & Glory'] ;

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
          content: keywords.join(','),
        },
        // Twitter Card
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
        { hid: 'twitter:title', name: 'twitter:title', content: title },
        { hid: 'twitter:description', name: 'twitter:description', content: description },
        { hid: 'twitter:image', name: 'twitter:image', content: image },
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
      const item = data[0].fields;

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
        { text: this.item.title, disabled: true, nuxt: true, to: `/vault/${this.slug}` },
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

<style lang="scss" scoped>

</style>
