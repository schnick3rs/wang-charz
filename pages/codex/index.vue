<template>
  <div>
    <dod-default-breadcrumbs :items="breadcrumbItems" />

    <v-row
      justify="center"
      no-gutters
      dense
    >
      <v-col
        v-for="section in sortedSections"
        :key="section.key"
        :cols="12"
        :sm="6"
        :md="4"
        :lg="4"
        class="pa-3"
      >
        <v-card
          :to="section.link.route"
          :disabled="!section.isActive"
          class="card"
          exact
          nuxt
          hover
        >
          <div class="card__image-container">
            <div class="card__image" :style="{ backgroundImage: 'url('+section.imageSrc+')' }" loading />
          </div>

          <div class="card__content-container pa-4">
            <h2 class="headline" v-html="section.title" />

            <h3 class="card__content-subtitle pb-4 subtitle-2">
              {{ section.subtitle }}
            </h3>

            <p class="body-2" v-html="section.htmlText" />

            <div class="card__content-footer">
              <v-btn block color="success">
                Browse {{ section.title }}
              </v-btn>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col :cols="12">
        <v-card>
          <v-card-text>
            <h1 class="headline">
              Use the Codex to lookup rules for Wrath & Glory
            </h1>
            <p>
              Send Feedback to <a href="mailto:docsofdoom+codex@gmail.com?subject=Codex Feedback">docsofdoom+codex(at)gmail.com</a>.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import DodDefaultBreadcrumbs from '~/components/DodDefaultBreadcrumbs';

export default {
  components: { DodDefaultBreadcrumbs },
  head() {
    const title = 'Rules Reference Overview - Wrath & Glory Reference | Codex';
    const description = 'This Quick Reference for Wrath and Glory shows the various combat actions and options.';
    const image = 'https://www.doctors-of-doom.com/img/artwork_codex_book.jpg';

    return {
      title,
      meta: [
        { hid: 'description', name: 'description', content: description },
        { hid: 'og:title', name: 'og:title', content: title },
        { hid: 'og:description', name: 'og:description', content: description },
        { hid: 'og:image', name: 'og:image', content: image },
      ],
    };
  },
  data() {
    return {
      breadcrumbItems: [
        {
          text: '', disabled: false, nuxt: true, exact: true, to: '/',
        },
        {
          text: 'Codex', disabled: false, nuxt: true, exact: true, to: '/codex',
        },
      ],
      sections: [
        {
          key: 'combatActions',
          title: 'Combat Actions',
          subtitle: 'Quick Reference for actions in combat',
          imageSrc: '/img/artwork_vault_bright.jpg',
          htmlText: '',
          link: { text: 'Browse Wargear', route: '/codex/combat-actions' },
          isActive: true,
          classes: [],
        },
      ],
    };
  },
  computed: {
    sortedSections() {
      return this.sections.sort((a, b) => a.title.localeCompare(b.title));
    },
  },
  methods: {
  },
};
</script>

<style scoped lang="css">
</style>
                                                                                                                                                                                                                                                                                                                                                                                           
