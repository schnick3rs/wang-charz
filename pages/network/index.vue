<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <dod-default-breadcrumbs :items="breadcrumbItems" />

    <v-row justify="center">
      <v-col
        v-for="item in assets"
        :key="item.name"
        :cols="12"
        :sm="4"
      >
        <v-card>
          <v-card-title>
            <h2 class="headline">
              {{ item.name }}
            </h2>
          </v-card-title>

          <v-card-text>
            <p>{{ item.text }}</p>
          </v-card-text>

          <v-list>
            <v-divider />

            <v-list-item-group>
              <v-list-item
                v-for="subitem in item.parts"
                :key="subitem.title"
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

          <v-card-actions />
        </v-card>
      </v-col>

      <v-col :cols="12">
        <v-card>
          <v-card-text>
            <h1 class="headline">
              Character Sheets for Wrath and Glory
            </h1>
            <p>
              Your currently will find fan-made character sheets. We will add and link to other
              resources like community pages, reference sheets and roleplaying hooks in the future.
              If you want to add your page assets or other stuff, reach out to via
              <a href="mailto:docsofdoom+network@gmail.com?subject=Network Request">docsofdoom+network(at)gmail.com</a>.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import DodDefaultBreadcrumbs from '../../components/DodDefaultBreadcrumbs';
export default {
  components: { DodDefaultBreadcrumbs },
  head() {
    const title = 'Wrath & Glory Assets | Network';
    const description = 'Searching for fillable character sheets for Wrath and Glory? ' +
        'Then check out the network section for downloads and links to valuable stuff.';
    const image = '/img/artwork_network_tile.jpg';
    return {
      meta: [
        { hid: 'description', name: 'description', content: description },
        // Open Graph
        { hid: 'og:title', name: 'og:title', content: title },
        { hid: 'og:description', name: 'og:description', content: description },
        { hid: 'og:image', name: 'og:image', content: image },
        // Twitter Card
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'twitter:title', name: 'twitter:title', content: title },
        { hid: 'twitter:description', name: 'twitter:description', content: description },
        { hid: 'twitter:image', name: 'twitter:image', content: image },
      ],
    };
  },
  data() {
    return {
      breadcrumbItems: [
        { text: '', nuxt: true, exact: true, to: '/' },
        { text: 'Network', nuxt: true, exact: true, to: '/network' },
      ],
      assets: [
        {
          name: 'Vehicle Sheet',
          type: 'PDF on Google Drive',
          author: 'Darth Venrir',
          text: 'Need a place to organize your warbands tank, frigatte or other vehicles or war? Darth Venrir put together this pdf for your usage.',
          parts: [
            { title: 'Wrath & Glory - Vehicle Sheet' , url: 'https://drive.google.com/file/d/1RRVVjBI4_HRCZl5MU4XhURTKPwS4Avod/view' },
          ],
        },
        {
          name: 'Player Reference',
          type: 'PDF on Google Drive',
          author: 'GerdBerguukion',
          text: 'Reddit user GerdBerguukion has created this 18 page rules reference that helps learning and playing the game.',
          parts: [
            { title: 'Rules Reference v1.1' , url: 'https://drive.google.com/file/d/1JSmfPlCE_tSvIORnhwMD9claPnF2pr4f/view' },
          ],
        },
        {
          name: 'Helper & Summary',
          type: 'PDF on Google Drive',
          author: 'Bill Gant',
          text: 'Bill Gant has put some real effort into these extensive Summaries. Quite some colorful pages help you with all the combat and advancement (should you survive).',
          parts: [
            { title: 'Combat Summary' , url: 'https://drive.google.com/file/d/1KftBEI0SJ1BpKvVy3hqdSQlQ5OyXiLWN/view' },
            { title: 'Combat Modifier Summary' , url: 'https://drive.google.com/file/d/1155NcLyI_B3HYlNdW2ES0cXDJOJqlORG/view' },
            { title: 'Advancement Summary' , url: 'https://drive.google.com/file/d/18NzfdwWFbHw6zyqtgPmJOkizBWlF8Nox/view' },
          ],
        },
        {
          name: 'Combat Cheat Sheet',
          type: 'Google Docs',
          author: 'u/Z_Scribe',
          text: 'Reddit user Z_Scribe created this three pages of reference sheet for combat, healing, dying, corruption and conditions.',
          parts: [
            { title: 'Combat Cheat Sheet' , url: 'https://docs.google.com/document/d/12VV1_0Zkcww3c7y_xYn2MBBO-xd7S4euskJWAnYcYh8/edit?usp=sharing' },
          ],
        },
        {
          name: 'Condensed Rules reference',
          type: 'MS Word on Google Drive',
          author: 'mikev37',
          text: 'mikev37 produced a condensed rules reference that helps the DM (and players) in their Wrath & Glory Campaigns.',
          parts: [
            { title: 'Condensed Rules', url: 'https://docs.google.com/document/d/0B9hL1gAseGFMeGFrWkZQa1d1T1AwaFhTSl9MbURFMldxcFQ0/view' },
          ],
        },
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
        },
      ],
    };
  },
  methods: {
    trackEvent(url) {
      this.$ga.event('Outbound Asset Link', 'click', url, 10);
      window.open(url);
    },
  },
};
</script>
