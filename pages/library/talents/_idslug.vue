<template>
  <div>
    <!-- Breadcrumbs -->
    <dod-default-breadcrumbs :items="breadcrumbItems" />

    <!-- Species Details -->
    <v-row justify="center" no-gutters>
      <v-col :cols="12" :sm="10">
        <div class="pa-2 pt-4 pb-4">
          <h3 class="title-1">
            {{ item.name }}
          </h3>
          <h4 class="subtitle-2 grey--text" />

          <hr class="mb-0">

          <p class="mt-2">
            {{ item.description }}
          </p>

          <span class="mt-2 grey--text">Prerequisites</span>
          <p><v-divider /></p>
          <ul>
            <li v-for="pereq in prerequisitesToText(item)" :key="pereq">
              {{ pereq }}
            </li>
          </ul>

          <div v-if="item.tags && item.tags.length > 0">
            <span>Tags:</span>
            <v-chip
              v-for="tag in item.tags"
              :key="tag"
              label
              small
              class="mr-1"
            >
              {{ tag }}
            </v-chip>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import DodDefaultBreadcrumbs from '~/components/DodDefaultBreadcrumbs';
import BreadcrumbSchemaMixin from '~/mixins/BreadcrumbSchemaMixin';

export default {
  name: 'Wargear',
  components: {
    DodDefaultBreadcrumbs,
  },
  mixins: [
    BreadcrumbSchemaMixin,
  ],
  head() {
    const title = `${this.item.name} - Talent`;
    const description = ''; /* this.item.source.key.indexOf('core') >= 0
      ? `The ${this.item.name} from ${this.item.group} is an official Species described in the ${this.item.source.book}.`
      : `The ${this.item.name} from ${this.item.group} is a homebrew Species provided by ${this.item.source.book}.`; */
    const image = this.item.thumbnail
      ? `https://www.doctors-of-doom.com${this.item.thumbnail}`
      : undefined;

    return {
      titleTemplate: '%s | Wrath & Glory Library',
      title,
      meta: [
        { hid: 'description', name: 'description', content: description },
        { hid: 'og:title', name: 'og:title', content: title },
        { hid: 'og:description', name: 'og:description', content: description },
      ],
      __dangerouslyDisableSanitizers: ['script'],
      script: [
        { innerHTML: JSON.stringify(this.breadcrumbJsonLdSchema(this.breadcrumbItems)), type: 'application/ld+json' },
      ],
    };
  },
  async asyncData({ params, $axios, error }) {
    const regex = /(?<id>\d+)-(?<slug>[\w-]*)/;

    const { idslug } = params;

    let regExpExecArray = regex.exec(idslug);
    if (regExpExecArray === null) {
      error({ statusCode: 404, message: 'Wargear not found' });
      return;
    }
    const { id, slug } = regExpExecArray.groups;

    const response = await $axios.get(`/api/talents/${id}`);
    const item = response.data;

    if (item === undefined || item.length <= 0) {
      error({ statusCode: 404, message: 'Wargear not found' });
      return;
    }

    return {
      item,
      slug,
      breadcrumbItems: [
        {
          text: '', nuxt: true, exact: true, to: '/',
        },
        {
          text: 'Library', nuxt: true, exact: true, to: '/library',
        },
        {
          text: 'Talents', nuxt: true, exact: true, to: '/library/talents',
        },
        {
          text: item.name, disabled: true, nuxt: true, to: `/library/talents/${id}-${slug}`,
        },
      ],
    };
  },
  methods: {
    prerequisitesToText(item) {
      const texts = [];

      if (item.prerequisites.length <= 0) {
        return ['None'];
      }

      item.prerequisites.forEach((p) => {
        let text = '';

        switch (p.type) {
          case 'keyword':
          case 'talent':
            if (p.condition === 'mustNot') {
              text = `<strong>must not</strong> possess the ${p.key.join(' or ')} ${p.type}`;
            } else {
              text = `${p.key.join(' or ')}`;
            }
            break;

          case 'attribute':
          case 'skill':
          case 'character':
            text = `${p.key} ${p.value}`;
            break;

          default:
            text = `${p.key}`;
        }
        texts.push(text);
      });

      return texts;
    },
    toTypeString(item) {
      const types = [item.type];
      if (item.subtype) {
        types.push(item.subtype);
      }
      return types.join(' • ');
    },
  },
};
</script>

<style scoped>

</style>
