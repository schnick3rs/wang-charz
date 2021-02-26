<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <dod-default-breadcrumbs :items="breadcrumbItems" />

    <v-row justify="center">

      <v-col :cols="12">
        <v-alert type="info">
          This is beta test to, so data might change.
        </v-alert>
      </v-col>

      <v-col :cols="12">
        <v-card>
          <v-card-text>
            <v-row justify="center">
              <v-col :cols="12" :sm="12">
                <v-text-field
                  v-model="searchQuery"
                  filled
                  dense
                  clearable
                  append-icon="search"
                  label="Search"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col :cols="12">
        <v-card>
          <v-data-table
            :headers="headers"
            :items="searchResults"
            :expanded.sync="expanded"
            :search="searchQuery"
            :items-per-page="-1"
            sort-by="entryLinkCreatedAt"
            sort-desc
            item-key="slug"
            show-expand
            hide-default-footer
            @item-expanded="trackExpand"
          >
            <template v-slot:header.publishedBy="{ header }">
              {{ header.text }}
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon small v-on="on">help</v-icon>
                </template>
                <span>The channel owner, publisher or distributor.</span>
              </v-tooltip>
            </template>

            <template v-slot:item.title="{ item }">
              <v-row no-gutters>
                <v-col :cols="12">
                  {{ item.title }}
                </v-col>
                <v-col v-if="false" :cols="12" class="caption grey--text">
                  {{ item.hint }}
                </v-col>
              </v-row>
            </template>

            <template v-slot:item.language="{ item }">
              <img height="19" width="35" :src="`/img/icon/language_${item.language.toLowerCase()}.svg`"></img>
            </template>

            <template v-slot:item.version="{ item }">
              <v-chip
                v-if="item.version === 'Draft' || item.version.startsWith('v0')"
                tags x-small label
              >
                <span>{{ item.version }}</span>
              </v-chip>
              <v-chip
                v-else
                color="green"
                text-color="white"
                tags x-small label
              >
                <span>{{ item.version }}</span>
              </v-chip>
            </template>

            <template v-slot:item.supplements="{ item }">
              <v-chip
                v-if="item.supplements === 'Core v1.5'"
                color="green"
                text-color="white"
                tags x-small label
              >
                <span>{{ item.supplements }}</span>
              </v-chip>
              <v-chip
                v-else
                tags x-small label
              >
                <span>{{ item.supplements }}</span>
              </v-chip>
            </template>

            <template v-slot:item.tags="{ item }">
              <v-chip v-for="keyword in item.tags" :key="keyword" small class="mr-2 mb-1 mt-1" label>
                {{ keyword }}
              </v-chip>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-btn small icon nuxt :to="`/ether/${item.slug}`">
                <v-icon>chevron_right</v-icon>
              </v-btn>
            </template>

            <!-- expand view -->
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <v-row>
                  <v-col :cols="12">
                    <h3 class="headline">
                      {{ item.campaignName }}
                    </h3>
                    <span class="grey--text">by {{ item.publishedBy }}</span>
                  </v-col>

                  <v-col :cols="12" :md="12">
                    <p>{{ item.abstract }}</p>
                    <p v-if="item.tags">
                      <span>Keywords: </span>
                      <v-chip
                        v-for="keyword in item.tags"
                        :key="keyword"
                        class="mr-2 mb-1 mt-1"
                        small
                        label
                      >
                        {{ keyword }}
                      </v-chip>
                    </p>
                  </v-col>

                </v-row>

                <v-row>
                  <v-col v-if="item.entryLink" :cols="12" :md="3">
                    <v-img :src="itemImage(item.entryLink)" />
                  </v-col>
                </v-row>

                <v-card-actions>
                  <v-btn color="primary" :href="item.entryLink" target="_blank" @click="trackEvent(item.entryLink)">
                    Watch the first Episode on Youtube <v-icon right dark>
                      launch
                    </v-icon>
                  </v-btn>
                  <v-btn color="success" nuxt :to="'/ether/'+item.slug" v-if="false">
                    Show Details
                  </v-btn>
                </v-card-actions>
              </td>
            </template>
          </v-data-table>
        </v-card>
      </v-col>

      <v-col :cols="12">
        <v-card>
          <v-card-text>
            <h1 class="headline">
              Search the Ether for Lets Play Videos
            </h1>
            <p>
              Help me fill the gabs <a href="mailto:docsofdoom+ether@gmail.com?subject=Ether Request">docsofdoom+ether(at)gmail.com</a>.
            </p>
          </v-card-text>
        </v-card>
      </v-col>

    </v-row>
  </div>
</template>

<script>
import SluggerMixin from '~/mixins/SluggerMixin';
import SchemaDigitalDocument from '~/assets/SchemaDigitalDocument.json';
import DodDefaultBreadcrumbs from '../../components/DodDefaultBreadcrumbs';

export default {
  name: 'Vault',
  components: { DodDefaultBreadcrumbs },
  mixins: [SluggerMixin],
  head() {
    const itemSchemaArray = this.actualPlayItems
      .map((item) => {
      return {
        ...SchemaDigitalDocument,
        name: item.title,
        alternativeHeadline: item.subtitle,
        author: item.author,
        version: item.version,
        url: item.documentUrl,
        thumbnailUrl: item.image ? `https://www.doctors-of-doom.com${item.image.fields.file.url}` : null,
        description: item.abstract,
        keywords: item.keywordTags ? [...item.keywordTags, 'Wrath & Glory'].join(',') : 'Wrath & Glory',
      }
    });

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

    const title = 'Watch People Play Wrath & Glory | Ether';
    const description = 'The Doctors of Doom Ether lists and links to a collection of (Youtube) ' +
      'Lets Plays for Wrath & Glory, the latest Warhammer 40k Roleplaying game.';
    const image = 'https://www.doctors-of-doom.com/img/artwork_ether.jpg';

    return {
      title,
      meta: [
        { hid: 'description', name: 'description', content: description },
        { hid: 'og:title', name: 'og:title', content: title },
        { hid: 'og:description', name: 'og:description', content: description },
        { hid: 'og:image', name: 'og:image', content: image },
        // Twitter Card
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'twitter:title', name: 'twitter:title', content: title },
        { hid: 'twitter:description', name: 'twitter:description', content: description },
        { hid: 'twitter:image', name: 'twitter:image', content: image },
      ],
      __dangerouslyDisableSanitizers: ['script'],
      script: [
        //{ innerHTML: JSON.stringify(itemSchemaArray), type: 'application/ld+json' },
        { innerHTML: JSON.stringify(breadcrumbListSchema), type: 'application/ld+json' },
      ],
    };
  },
  data() {
    return {
      searchQuery: '',
      settingFilter: [],
      contentFilter: [],
      pagination: {
        sortBy: 'supplements',
        rowsPerPage: -1,
      },
      headers: [
        { text: 'Title', align: 'start', value: 'campaignName', class: '' },
        { text: 'Language', align: 'center', value: 'language', class: '' },
        { text: 'Tier', align: 'center', value: 'campaignTier', class: '' },
        { text: 'Core Version', align: 'center', value: 'coreRulesVersion', class: '' },
        { text: 'Type', align: 'start', value: 'type', class: '' },
        // { text: '# Players', align: 'start', value: 'numberOfPlayers', class: '' },
        { text: 'Tags', align: 'start', value: 'tags', class: '' },
        { text: 'Published By', align: 'start', value: 'publishedBy', class: '' },
        { text: 'Started at', align: 'start', value: 'entryLinkCreatedAt', class: '' },
        // { text: '', sortable: false, align: 'end', value: 'actions', class: '' },
      ],
      expanded: [],
    };
  },
  computed: {
    breadcrumbItems() {
      return [
        { text: '', nuxt: true, exact: true, to: '/' },
        { text: 'Ether', nuxt: true, exact: true, to: '/ether' },
      ];
    },
    searchResults() {
      let filteredResults = this.actualPlayItems;

      if (this.searchQuery) {
        // filteredResults = filteredResults.filter(h => (h.title.toLowerCase().indexOf(this.searchQuery.toLowerCase()) >= 0))
      }

      if (this.contentFilter.length > 0) {
        filteredResults = filteredResults.filter((h) => [...h.contentTags, ...h.keywordTags]
          .some((c) => this.contentFilter.includes(c)));
      }

      return filteredResults;
    },
    pages() {
      if (this.pagination.rowsPerPage == null
        || this.pagination.totalItems == null
      ) return 0;

      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage);
    },
  },
  async asyncData({ app }) {
    const { data } = await app.$axios.get('/api/actual-plays/');
    return {
      actualPlayItems: data.map((item) => item.fields),
    };
  },
  methods: {
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    },
    share(item) {
      if (navigator.share) {
        navigator.share({
          title: 'Vault',
          text: `Check out ${item.title}`,
          url: `https://www.doctors-of-doom/ether/${item.slug}`,
        })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      } else {
        console.info('no share api found');
      }
    },
    trackExpand(event) {
      if (event.value === true) {
        this.$ga.event('Lets Play Row', 'expand', event.item.campaignName, 1);
      }
    },
    trackEvent(url) {
      this.$ga.event('Outbound Link', 'click', url, 10);
    },
    itemImage(url) {
      const match = url.match(/.*v=(.+)/);
      const youtubeId = match[1];
      return `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`;
    },
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
  },
};
</script>

<style scoped lang="css">
  tr:hover {
    cursor: pointer;
  }
</style>
