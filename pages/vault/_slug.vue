<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <div>
    <div class="elevation-4 mb-4 p-0">
      <ul class="v-breadcrumbs theme--light">
        <li class="v-breadcrumbs__item">
          <nuxt-link to="/" class="v-breadcrumbs__item"><img src="/favicon-16x16.png" /></nuxt-link>
        </li>
        <li class="v-breadcrumbs__divider">/</li>
        <li class="v-breadcrumbs__item">
          <nuxt-link to="/vault" class="v-breadcrumbs__item">Vault</nuxt-link>
        </li>
        <li class="v-breadcrumbs__divider">/</li>
        <li class="v-breadcrumbs__item">
          <nuxt-link :to="$route.path" class="v-breadcrumbs__item--disabled v-breadcrumbs__item">{{ item.name }}</nuxt-link>
        </li>
      </ul>
    </div>

  <v-layout justify-center row wrap>

    <v-flex xs12 md8>

      <div class="mb-4">
        <h1 class="headline">{{ item.name }}</h1>
        <span class="grey--text">{{ item.subtitle }}</span>

      </div>

      <v-layout row wrap>

        <v-flex xs12 sm5>

          <h2 class="body-2">Abstract</h2>
          <p>
            {{ item.abstract }}
          </p>

        </v-flex>

        <v-flex xs12 sm4>

          <span class="body-2">Author:</span> {{ item.author }}

          <ul class="mb-4" v-if="item.links && item.links.length > 0">
            <li v-for="link in item.links" :key="link.name">
              <a class="mr-2" :href="link.url" target="_blank">{{ link.name }}</a>
            </li>
          </ul>

        </v-flex>

        <v-flex xs12 sm3>
            <span class="body-2">Topics / Content:</span>
          <ul>
            <li v-for="parts in item.topics">
              {{ parts }}
            </li>
          </ul>

        </v-flex>

      </v-layout>

      <div>
        <p v-if="item.keywords">
          <span class="body-2">Keywords / Tags:</span><br/>
          <v-chip v-for="keyword in item.keywords" :key="keyword">
            {{ keyword }}
          </v-chip>
        </p>
      </div>

      <div>
        <v-btn color="primary" :href="item.url" target="_blank">
          View the document
          <v-icon right dark>launch</v-icon>
        </v-btn>
      </div>

    </v-flex>

  </v-layout>
  </div>
</template>

<script>
  import Homebrews from '~/mixins/homebrews.json';

  export default {
  components: {},
  head: function () {
    return {
      title: `${this.item.name} by ${this.item.author} | Vault`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'The Doctors of Doom Vault contains a curated collection of homebrews and houserules for Wrath & Glory,' +
            ' the latest Warhammer 40k Roleplaying game. Those are written by dedicated fans.'
        }
      ]
    }
  },
  layout: 'vault',
  mixins: [ Homebrews ],
  validate ({ params }) {
    return true;
  },
  data() {
    let slugItem = Homebrews
      .find( h => h.name.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-') === this.$route.params.slug );
    return {
      slug: this.$route.params.slug,
      item: slugItem,
      breadcrumbItems: [
        { text: 'D',      disabled: false, nuxt: true, exact:true, to: '/', },
        { text: 'Vault',  disabled: false, nuxt: true, exact:true, to: '/vault' },
        { text: slugItem.name, disabled: true },
      ],
    }
  }
}
</script>
