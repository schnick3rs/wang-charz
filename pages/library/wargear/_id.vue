<template>

  <div>

    <!-- Breadcrumbs -->
    <dod-default-breadcrumbs v-bind:items="breadcrumbItems" />

    <!-- Species Details -->
    <v-row justify="center" no-gutters>

      <v-col v-bind:cols="12" v-bind:sm="10">

        <div class="pa-2 pt-4 pb-4">

          <h3 class="title-1">{{ item.name }}</h3>
          <h4 class="subtitle-2 grey--text">{{ toTypeString(item) }}</h4>

          <hr class="mb-0">

          <div class="grey--text">
            <span class="subtitle-2"><strong>Rarity:</strong> {{ item.rarity }}</span>
            <span><strong>Value:</strong> {{ item.value }}</span>
          </div>

          <p class="mt-2">{{ item.description }}</p>

          <dod-simple-weapon-stats
            v-if="item.meta !== undefined && item.meta.length > 0 && ['ranged-weapon','melee-weapon'].includes(item.meta[0].type)"
            v-bind:name="item.name"
            v-bind:stats="item.meta[0]"
            show-traits
            class="mb-2"
          ></dod-simple-weapon-stats>

          <dod-simple-armour-stats
            v-if="item.meta !== undefined && item.meta.length > 0 && ['armour'].includes(item.meta[0].type)"
            v-bind:name="item.name"
            v-bind:stats="item.meta[0]"
            show-traits
            class="mb-2"
          ></dod-simple-armour-stats>

          <div>
            <span>Keywords:</span>
            <v-chip
              v-for="keyword in item.keywords"
              v-bind:key="keyword"
              label
              small
              class="mr-1"
            >{{keyword}}</v-chip>
          </div>

        </div>

      </v-col>

    </v-row>

  </div>

</template>

<script>
import DodDefaultBreadcrumbs from '~/components/DodDefaultBreadcrumbs';
import DodSimpleWeaponStats from '~/components/DodSimpleWeaponStats';
import DodSimpleArmourStats from '~/components/DodSimpleArmourStats';
import BreadcrumbSchemaMixin from '~/mixins/BreadcrumbSchemaMixin';


export default {
  name: "wargear",
  components: {
    DodDefaultBreadcrumbs,
    DodSimpleWeaponStats,
    DodSimpleArmourStats,
  },
  mixins: [
    BreadcrumbSchemaMixin
  ],
  head() {
    const title = `${this.item.name} - Wargear`;
    const description = ''; /* this.item.source.key.indexOf('core') >= 0
      ? `The ${this.item.name} from ${this.item.group} is an official Species described in the ${this.item.source.book}.`
      : `The ${this.item.name} from ${this.item.group} is a homebrew Species provided by ${this.item.source.book}.`;*/
    const image = this.item.thumbnail
      ? `https://www.doctors-of-doom.com${this.item.thumbnail}`
      : `https://www.doctors-of-doom.com/img/wargear/${this.item.type.toLowerCase()}_avatar.png`;

    return {
      titleTemplate: '%s | Wrath & Glory Library',
      title: title,
      meta: [
        { hid: 'description', name: 'description', content: description },
        { hid: 'og:title', name: 'og:title', content: title },
        { hid: 'og:description', name: 'og:description', content: description },
      ],
      __dangerouslyDisableSanitizers: ['script'],
      script: [
        { innerHTML: JSON.stringify(this.breadcrumbJsonLdSchema(this.breadcrumbItems)), type: 'application/ld+json' },
      ]
    };
  },
  async asyncData({ params, $axios, error }) {
    const id = params.id;

    const response = await $axios.get(`/api/wargear/${id}`);
    const item = response.data;

    if ( item === undefined || item.length <= 0 ) {
      error({ statusCode: 404, message: 'Wargear not found' });
    }

    return {
      item: item,
      slug: '',
      breadcrumbItems: [
        { text: '', nuxt: true, exact: true, to: '/', },
        { text: 'Library', nuxt: true, exact: true, to: '/library', },
        { text: 'Wargear', nuxt: true, exact: true, to: '/library/wargear', },
        { text: item.name, disabled: true, nuxt: true, to: `/library/wargear/${id}`, },
      ],
    };
  },
  methods: {
    toTypeString(item) {
      let types = [ item.type ];
      if ( item.subtype ) {
        types.push(item.subtype)
      }
      return types.join(' • ');
    },
  },
}
</script>

<style scoped>

</style>
