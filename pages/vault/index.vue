<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <dod-default-breadcrumbs :items="breadcrumbItems" />

    <v-row justify="center">

      <v-col :cols="12">
        <v-card>
          <v-card-text>
            <v-row justify="center">
              <v-col :cols="12" :sm="6">
                <v-text-field
                  v-model="searchQuery"
                  filled
                  dense
                  clearable
                  append-icon="search"
                  label="Search"
                />
              </v-col>

              <v-col :cols="12" :sm="6">
                <v-select
                  v-model="contentFilter"
                  filled
                  dense
                  clearable
                  multiple
                  chips
                  deletable-chips
                  single-line
                  label="Filter by Content"
                  :items="contentOptions"
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
            sort-by="supplements"
            sort-desc
            item-key="urlSlug"
            show-expand
            hide-default-footer
            @item-expanded="trackExpand"
          >
            <template v-slot:header.supplements="{ header }">
              {{ header.text }}
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon small v-on="on">help</v-icon>
                </template>
                <span>Indicate the version, the homebrew was originaly designed for.</span>
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
                v-if="item.supplements.startsWith('Core v2')"
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

            <template v-slot:item.keywordTags="{ item }">
              <v-chip v-for="keyword in item.keywordTags" :key="keyword" small class="mr-2 mb-1 mt-1">
                {{ keyword }}
              </v-chip>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-btn small icon nuxt :to="`/vault/${item.urlSlug}`">
                <v-icon>chevron_right</v-icon>
              </v-btn>
            </template>

            <!-- expand view -->
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <v-row>
                  <v-col :cols="12">
                    <h3 class="headline">
                      {{ item.title }}
                    </h3>
                    <span class="grey--text">{{ item.subtitle }}</span>
                  </v-col>

                  <v-col :cols="12" :md="8">
                    <p><strong>Author:</strong> {{ item.author }}</p>
                    <p>{{ item.abstract }}</p>
                    <p v-if="item.keywordTags">
                      <span>Keywords: </span>
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
                  </v-col>

                  <v-col v-if="item.image && item.image.fields.file.url && false" :cols="12" :md="3">
                    <v-img :src="item.image.fields.file.url" />
                  </v-col>

                  <v-col :cols="12" :md="4">
                    <strong>Topics:</strong>
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
                </v-row>

                <v-card-actions>
                  <v-btn color="primary" :href="item.documentUrl" target="_blank" @click="trackEvent(item.documentUrl)">
                    View the document <v-icon right dark>
                      launch
                    </v-icon>
                  </v-btn>
                  <v-btn color="green" nuxt :to="'/vault/'+item.urlSlug">
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
              Search the Vault for precious, fan-made homebrews
            </h1>
            <p>
              In desperate need of an option to extend your Wrath & Glory Campaign?
              Searching for <em>that</em> particular homebrew to improve your setting?
              The <strong>Vault</strong> has you covered.
              This is a <strong>curated list of homebrews</strong> from fans, found in the internet.
              I credit the author and link to their community pages, as good as I could,
              if I find them either in the document found or on their respective page.
              If want to add, remove or change your homebrew content or if you want to propose changes regarding links,
              you can mail me to <a href="mailto:docsofdoom+vault@gmail.com?subject=Vault Request">docsofdoom+vault(at)gmail.com</a>.
            </p>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col :cols="12">
        <v-expansion-panels
          accordion
        >
          <v-expansion-panel
            v-for="item in faqItems"
            :key="item.q"
          >
            <v-expansion-panel-header>{{ item.q }}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <p
                class="body-2"
                v-html="item.a"
              />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
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
    const itemSchemaArray = this.vaultItems
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

    const faqPageSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: this.faqItems.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      })),
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

    const title = 'Collection of Wrath & Glory Homebrews | Vault';
    const description = 'The Doctors of Doom Vault contains a curated collection of supplements,'
      + ' homebrews and houserules for Wrath & Glory, the latest Warhammer 40k Roleplaying game. '
      + 'Those are written by dedicated fans.';
    const image = 'https://www.doctors-of-doom.com/img/artwork_vault_bright.jpg';

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
        { innerHTML: JSON.stringify(itemSchemaArray), type: 'application/ld+json' },
        { innerHTML: JSON.stringify(faqPageSchema), type: 'application/ld+json' },
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
        {
          text: 'Title', align: 'start', value: 'title', class: '',
        },
        {
          text: 'Version', align: 'start', value: 'version', class: '',
        },
        {
          text: 'Build for', align: 'start', value: 'supplements', class: '',
        },
        {
          text: 'Hint', align: 'start', value: 'hint', class: '',
        },
        {
          text: 'Author', align: 'start', value: 'author', class: '',
        },
        {
          text: '', sortable: false, align: 'end', value: 'actions', class: '',
        },
      ],
      expanded: [],
      faqItems: [
        {
          q: 'Which homebrew supports my migration from Fantasy Flight Games to Wrath and Glory?',
          a: 'Multiple fan supplements exist to extend the Wrath & Glory Core Rules. '
          + 'When you are coming from <strong>Dark Heresy</strong>, '
          + 'the <a href="https://www.doctors-of-doom.com/vault/agents-of-the-golden-throne">Agents of the Golden Throne</a> supplement '
          + 'provides your with archetypes wargear and more.</p>',
        },
        {
          q: 'Can I play a Deathwatch Campaign with Wrath and Glory?',
          a: 'Yes, there are <strong>multiple homebrews</strong> to support this campaign style. '
          + 'Most notably are the <a href="https://www.doctors-of-doom.com/vault/the-deathwatch---slayers-of-the-alien-horde">Slayers of the Alien Horde</a> '
          + 'and <a href="https://www.doctors-of-doom.com/vault/the-emperors-angels">The Emperor’s Angels</a>.',
        },
      ],
    };
  },
  computed: {
    breadcrumbItems() {
      return [
        { text: '', nuxt: true, exact: true, to: '/' },
        { text: 'Vault', nuxt: true, exact: true, to: '/vault' },
      ];
    },
    settingOptions() {
      return null;
      // return this.homebrewRepository.map(h => h.setting).filter(i => i !== '');
    },
    contentOptions() {
      let contentOptions = [];
      this.vaultItems.forEach((item) => {
        if (item.contentTags) contentOptions.push(...item.contentTags);
        if (item.keywordTags) contentOptions.push(...item.keywordTags);
      });
      return [...new Set(contentOptions)].sort();
    },
    searchResults() {
      let filteredResults = this.vaultItems;

      if (this.searchQuery) {
        // filteredResults = filteredResults.filter(h => (h.title.toLowerCase().indexOf(this.searchQuery.toLowerCase()) >= 0))
      }

      if (this.contentFilter.length > 0) {
        filteredResults = filteredResults
          .filter((item) => {
            let contentOptions = [];
            if (item.contentTags) contentOptions.push(...item.contentTags);
            if (item.keywordTags) contentOptions.push(...item.keywordTags);
            return [...new Set(contentOptions)].some((c) => this.contentFilter.includes(c))
          });
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
    const { data } = await app.$axios.get('/api/homebrews/');
    return {
      vaultItems: data.map((item) => item.fields),
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
          url: `https://www.doctors-of-doom/vault/${item.urlSlug}`,
        })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      } else {
        console.info('no share api found');
      }
    },
    trackExpand(event) {
      if (event.value === true) {
        this.$ga.event('Vault Row', 'expand', event.item.title, 1);
      }
    },
    trackEvent(url) {
      this.$ga.event('Outbound Link', 'click', url, 10);
    },
  },
};
</script>

<style scoped lang="css">
  tr:hover {
    cursor: pointer;
  }
</style>
