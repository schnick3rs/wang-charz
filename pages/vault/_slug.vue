<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

<div>

  <v-row justify="center">
    <v-col :cols="11" class="elevation-4 mb-2 pa-0 ma-0">

    <v-breadcrumbs
      v-bind:items="breadcrumbItems"
    >
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item
          :nuxt="true"
          :to="item.to"
          :disabled="item.disabled"
          :exact="item.exact"
        >
          <img v-if="item.to == '/'" src="/favicon-16x16.png" />
          {{ item.text }}
        </v-breadcrumbs-item>
      </template>

      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>

    </v-breadcrumbs>

    </v-col>
  </v-row>

  <v-row justify="center">

    <v-col :cols="8" >

      <div class="mb-4">
        <h1 class="headline">{{ item.title }}</h1>
        <span class="grey--text">{{ item.subtitle }}</span>
      </div>

      <v-row wrap>

        <v-col :cols="12" :sm="6">

          <h2 class="title">Author</h2>
          <p>
            {{ item.author }}
          </p>

          <div>
            <h2 class="title">Version Info</h2>
            <p>
              {{ item.status }} {{ item.version }}
            </p>
          </div>

          <h2 class="title">Abstract</h2>
          <p>
            {{ item.abstract }}
          </p>

        </v-col>

        <v-col :cols="12" :sm="3" v-if="item.thumbnail">
          <v-img v-bind:src="item.thumbnail" />
        </v-col>

        <v-col :cols="12" :sm="3">
            <span class="subtitle-2">Topics / Content:</span>
          <ul>
            <li v-for="parts in item.topics" v-bind:key="parts">
              {{ parts }}
            </li>
          </ul>

        </v-col>

        <v-col :cols="12" :sm="3" v-if="item.links && item.links.length > 0">

          <span class="subtitle-2">Support or follow the author:</span>

          <ul class="mb-4" v-if="item.links && item.links.length > 0">
            <li v-for="link in item.links" :key="link.title">
              <a class="mr-2" :href="link.url" target="_blank">{{ link.name }}</a>
            </li>
          </ul>

        </v-col>

      </v-row>

      <div>
        <p v-if="item.keywords">
          <span class="subtitle-2">Keywords / Tags:</span><br/>
          <v-chip v-for="keyword in item.keywords" :key="keyword" class="mr-2">
            {{ keyword }}
          </v-chip>
        </p>
      </div>

      <div>
        <v-btn color="primary" :href="item.url" target="_blank" @click="trackEvent(item.url)">
          View the document
          <v-icon right dark>launch</v-icon>
        </v-btn>
      </div>

    </v-col>

  </v-row>
  </div>
</template>

<script>
  import SchemaDigitalDocument from '~/assets/SchemaDigitalDocument.json';

  export default {
  components: {},
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
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": this.breadcrumbItems.map( (item, index) => {
        return {
          "@type": "ListItem",
          "position": index+1,
          "name": ( index === 0 ? 'Doctors of Doom' : item.text),
          "item": `https://www.doctors-of-doom.com${item.to}`
        }
      })
    };

    return {
      titleTemplate: '%s | Vault',
      title: `${this.item.title} - ${this.item.keywords[0]} Homebrew`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${this.item.subtitle}. ${this.item.abstract}`,
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: [
            ...this.item.keywords,
            'Homebrew',
            'Supplement',
            'Wrath & Glory',
          ].join(',') ,
        },
      ],
      __dangerouslyDisableSanitizers: ['script'],
      script: [
        { innerHTML: JSON.stringify(itemSchema), type: 'application/ld+json' },
        { innerHTML: JSON.stringify(breadcrumbListSchema), type: 'application/ld+json' },
      ]
    };
  },
  validate({}) {
    return true;
  },
  async asyncData({ params, $axios, error }) {
    const slug = params.slug;
    const vaultItemResponse = await $axios.get(`/api/homebrews/${slug}`);
    const vaultItem = vaultItemResponse.data;

    if ( vaultItem === undefined || vaultItem.length <= 0 ) {
      error({ statusCode: 404, message: 'Post not found' });
    }

    return {
        item: vaultItem,
        slug: slug,
    };
  },
  data() {
    return {}
  },
  computed: {
    breadcrumbItems() {
      return [
        {
          text: '', nuxt: true, exact: true, to: '/'
        },
        {
          text: 'Vault', nuxt: true, exact: true, to: '/vault',
        },
        { text: this.item.title, disabled: true, nuxt: true, to: `/vault/${this.slug}` },
      ]
    },
  },
  methods: {
    trackEvent(url) {
      this.$ga.event('Outbound Link', 'click', url, 10);
    },
  },
};
</script>
