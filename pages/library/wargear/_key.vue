<template>
  <div>
    <!-- Breadcrumbs -->
    <dod-default-breadcrumbs :items="breadcrumbItems" />

    <!-- wargear Details -->
    <v-row justify="center" no-gutters>
      <v-col :cols="12">
        <ColorfulEntry :headline="item.name" flavour="wargear">
          <v-row>
            <v-col :cols="12">
              <h4 class="subtitle-2 grey--text">
                {{ toTypeString(item) }}
              </h4>

              <hr class="mb-0">

              <div class="grey--text">
                <span class="subtitle-2"><strong>Rarity:</strong> {{ item.rarity }}</span>
                <span><strong>Value:</strong> {{ item.value }}</span>
              </div>

              <div v-if="item.description" class="mt-2" v-html="item.description"></div>
              <p v-else-if="item.snippet" class="mt-2">{{ item.snippet }}</p>

              <div
                v-if="item.meta !== undefined && item.meta.length > 0"
                v-for="meta in item.meta"
              >
                <dod-simple-weapon-stats
                  v-if="['ranged-weapon','melee-weapon'].includes(meta.type)"
                  :name="item.name"
                  :stats="meta"
                  show-traits
                  class="mb-2"
                />
                <dod-simple-armour-stats
                  v-else-if="['armour'].includes(meta.type)"
                  :name="item.name"
                  :stats="meta"
                  show-traits
                  class="mb-2"
                />
              </div>

              <div>
                <span>Keywords:</span>
                <v-chip
                  v-for="keyword in item.keywords"
                  :key="keyword"
                  label
                  small
                  class="mr-1"
                >
                  {{ keyword }}
                </v-chip>
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-btn
                  v-if="!['core','fspg','red1','cos'].includes(item.source.key)"
                  :href="`/api/wargear/${item.key}?format=foundry`"
                  download
                  small
                  color="info"
              >foundry (.json)</v-btn>
            </v-col>
          </v-row>

        </ColorfulEntry>
      </v-col>
    </v-row>

    <v-row justify="center" no-gutters>
      <v-col :cols="12" :sm="10">

      </v-col>
    </v-row>
  </div>
</template>

<script>
import DodDefaultBreadcrumbs from '~/components/DodDefaultBreadcrumbs';
import DodSimpleWeaponStats from '~/components/DodSimpleWeaponStats';
import DodSimpleArmourStats from '~/components/DodSimpleArmourStats';
import ColorfulEntry from '~/components/shared/ColorfulEntry';
import BreadcrumbSchemaMixin from '~/mixins/BreadcrumbSchemaMixin';

export default {
  name: 'Wargear',
  components: {
    DodDefaultBreadcrumbs,
    DodSimpleWeaponStats,
    DodSimpleArmourStats,
    ColorfulEntry,
  },
  mixins: [
    BreadcrumbSchemaMixin,
  ],
  head() {
    const title = `${this.item.name} - Wargear`;
    const description = ''; /* this.item.source.key.indexOf('core') >= 0
      ? `The ${this.item.name} from ${this.item.group} is an official Species described in the ${this.item.source.book}.`
      : `The ${this.item.name} from ${this.item.group} is a homebrew Species provided by ${this.item.source.book}.`; */
    const image = this.item.thumbnail
      ? `https://www.doctors-of-doom.com${this.item.thumbnail}`
      : `https://www.doctors-of-doom.com/img/wargear/${this.item.type.toLowerCase()}_avatar.png`;

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
    const { key } = params;

    const response = await $axios.get(`/api/wargear/${key}`);
    const item = response.data;

    if (item === undefined || item.length <= 0) {
      error({ statusCode: 404, message: 'Wargear not found' });
    }

    return {
      item,
      key,
      breadcrumbItems: [
        {
          text: '', nuxt: true, exact: true, to: '/',
        },
        {
          text: 'Library', nuxt: true, exact: true, to: '/library',
        },
        {
          text: 'Wargear', nuxt: true, exact: true, to: '/library/wargear',
        },
        {
          text: item.name, disabled: true, nuxt: true, to: `/library/wargear/${key}`,
        },
      ],
    };
  },
  methods: {
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
