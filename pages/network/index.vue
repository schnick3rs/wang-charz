<template>

  <div>

    <v-row justify="center">
      <v-col :cols="11" class="elevation-4 mb-2 pa-0 ma-0">

      <v-breadcrumbs light
        v-bind:items="breadcrumbItems"
      >
        <template v-slot:item="props">
          <v-breadcrumbs-item
            :nuxt="true"
            :to="props.item.to"
            :disabled="props.item.disabled"
            :exact="props.item.exact"
          >
            <img v-if="props.item.to == '/'" src="/favicon-16x16.png" />
            {{ props.item.text }}
          </v-breadcrumbs-item>
        </template>

        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>

      </v-breadcrumbs>

      </v-col>
    </v-row>

    <v-row justify="center" >

      <v-col
        v-for="item in assets"
        v-bind:key="item.name"
        v-bind:cols="5"
      >

        <v-card>
          <v-card-title>
            <h2 class="headline">{{ item.name }}</h2>
          </v-card-title>

          <v-card-text>
            <p>{{item.text}}</p>
          </v-card-text>

          <v-list>

            <v-divider></v-divider>

            <v-list-item-group>

              <v-list-item
                v-for="subitem in item.parts"
                v-bind:key="subitem.title"
                @click="trackEvent(subitem.url)"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ subitem.title }}</v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <v-icon>launch</v-icon>
                </v-list-item-action>

              </v-list-item>

            </v-list-item-group>

          </v-list>

          <v-card-actions>
          </v-card-actions>

        </v-card>

      </v-col>

    </v-row>

  </div>

</template>

<script>
export default {
  head() {
    return {
      title: 'Wrath & Glory Assets | Network',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Searching for fillable character sheets for Wrath and Glory? Then check out the ' +
            'network section for downloads and links to valuable stuff.',
        },
      ]
    };
  },
  data() {
    return {
      breadcrumbItems: [
        {
          text: '', nuxt: true, exact: true, to: '/',
        },
        {
          text: 'Network', nuxt: true, exact: true, to: '/network',
        },
      ],
      assets: [
        {
          name: 'Form-Fillable Character Sheets',
          type: 'pdf',
          author: 'Deathbird',
          text: 'Deathbird has put on some quality fillable PDF character sheets for Wrath & Glory.',
          parts: [
            { title: 'Basis (non-psyker) sheet', url: 'https://drive.google.com/open?id=1_dcMhtBBCek_1MHEzYtJBGYtpTZoksGR' },
            { title: 'Psyker (One additional page) sheet', url: 'https://drive.google.com/open?id=1mDtQyRW_bT4kgno5Bz7WX1HlLYXikBqh' },
            { title: 'Psyker (Two additional pages) sheet', url: 'https://drive.google.com/open?id=1rs3aZH0M_SBZzGBv5tDeWUF1m5wvGtTS' },
            { title: 'Psychic Powers Only sheet', url: 'https://drive.google.com/open?id=1LlHLeGdb2h3DRd_qWAaroD07pEZzPDmB' },
          ],
        }
      ],
    }
  },
  methods: {
    trackEvent(url) {
      this.$ga.event('Outbound Asset Link', 'click', url, 10);
      window.open(url);
    },
  },
}
</script>
