<template>

  <v-layout justify-center row wrap>

    <v-flex
      v-for="item in assets"
      v-bind:key="item.name"
      xs12
      sm10
      md6
      lg6
    >

      <v-card
      >
        <v-card-title>
          <h3 class="headline">{{ item.name }}</h3>
        </v-card-title>

        <v-card-text>
          <p>{{item.text}}</p>
        </v-card-text>

        <v-list>

          <v-divider></v-divider>

          <v-list-tile
            v-for="subitem in item.parts"
            v-bind:key="subitem.title"
            @click="trackEvent(subitem.url)"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{ subitem.title }}</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-icon>launch</v-icon>
            </v-list-tile-action>

          </v-list-tile>

        </v-list>

        <v-card-actions>
        </v-card-actions>

      </v-card>

    </v-flex>

  </v-layout>

</template>

<script>
export default {

  layout: 'network',
  head() {
    return {
      title: 'W&G Assets for Players and Game-Masters | Network',
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
      assets: [
        {
          name: 'Form-Fillable Character Sheets',
          type: 'pdf',
          author: 'Deathbird',
          text: 'Deathbird has put on some quality fillable PDF character sheets for Wrath & Glory ',
          parts: [
            { title: 'Default', url: 'https://drive.google.com/open?id=1_dcMhtBBCek_1MHEzYtJBGYtpTZoksGR' },
            { title: 'One-Page, Psyker', url: 'https://drive.google.com/open?id=1mDtQyRW_bT4kgno5Bz7WX1HlLYXikBqh' },
            { title: 'Two-Page, Psyker', url: 'https://drive.google.com/open?id=1rs3aZH0M_SBZzGBv5tDeWUF1m5wvGtTS' },
            { title: 'Psychic Powers Only', url: 'https://drive.google.com/open?id=1LlHLeGdb2h3DRd_qWAaroD07pEZzPDmB' },
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
