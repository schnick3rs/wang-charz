<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-app>
    <v-navigation-drawer
      v-model="drawer.open"
      :clipped="drawer.clipped"
      :fixed="drawer.fixed"
      :permanent="drawer.permanent"
      :mini-variant="drawer.mini"
      app
      right
      disable-resize-watcher
    >
      <v-list>
        <v-list-item>

          <v-btn icon href="https://discordapp.com/channels/256930339878993920/600107858486493193">
            <v-icon>mdi-discord</v-icon>
          </v-btn>
          <v-btn icon href="https://twitter.com/doctors_of_doom">
            <v-icon color="#1DA1F2">mdi-twitter</v-icon>
          </v-btn>
        </v-list-item>
        <div
          v-for="item in navigation"
          :key="item.to"
        >
          <v-list-group
            v-if="item.children"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
              </v-list-item-content>
            </template>
              <v-list-item
                class="ml-4"
                v-for="child in item.children"
                :key="child.to"
                :to="child.to"
                nuxt
              >
                <v-list-item-title>{{ child.title }}</v-list-item-title>
              </v-list-item>

          </v-list-group>
          <v-list-item
            v-else
            :to="item.to"
            nuxt
          >
            <v-list-item-content>
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ item.subtitle }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider />
        </div>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      dark
      dense
      style="background-color: #212121;"
      :fixed="toolbar.fixed"
      :clipped-left="toolbar.clippedLeft"
    >
      <v-container class="pa-0 fill-height" :class="{ 'pl-2 pr-2': this.$vuetify.breakpoint.mdAndUp }">
        <v-toolbar-title>
          <nuxt-link to="/" class="title brand-logo brand-logo__text">
            Doctors of Doom
          </nuxt-link>
        </v-toolbar-title>

        <v-spacer />

        <v-toolbar-items>
          <v-btn class="d-none d-md-inline-flex" icon href="https://discordapp.com/channels/256930339878993920/600107858486493193">
            <v-icon>mdi-discord</v-icon>
          </v-btn>
          <v-btn class="d-none d-md-inline-flex" icon href="https://twitter.com/doctors_of_doom">
            <v-icon color="#1DA1F2">mdi-twitter</v-icon>
          </v-btn>
          <v-btn icon @click="toggleDarkTheme">
            <v-icon>mdi-brightness-6</v-icon>
          </v-btn>
        </v-toolbar-items>

        <v-app-bar-nav-icon @click.stop="toggleDrawer" class="d-md-none" />
      </v-container>
    </v-app-bar>

    <v-main>

      <v-toolbar dense class="d-none d-md-block">
        <v-container  class="pa-0 fill-height" :class="{ 'pl-2 pr-2': this.$vuetify.breakpoint.mdAndUp }">
        <v-toolbar-items>
          <v-btn
            v-for="item in navigation"
            :key="item.to"
            smallt
            text
            nuxt
            :to="item.to"
          >
            {{ item.title }}
          </v-btn>
        </v-toolbar-items>
        </v-container>
      </v-toolbar>

      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <default-footer />
  </v-app>
</template>

<script>
import DefaultFooter from '~/components/DefaultFooter.vue';
import ToolbarAccountActions from '~/components/user/ToolbarAccountActions.vue';

export default {
  components: {
    DefaultFooter,
    ToolbarAccountActions,
  },
  head() {
    return {
      link: [
        { rel: 'canonical', href: `https://www.doctors-of-doom.com${this.$route.path}` },
      ],
    };
  },
  data() {
    return {
      darkTheme: false,
      navigation: [
        { to: '/vault', title: 'Vault', subtitle: 'Browse Homebrews', icon: '' },
        { to: '/forge/my-characters', title: 'Forge', subtitle: 'Create Characters', icon: '' },
        { to: '/bestiary', title: 'Bestiary', subtitle: 'Find Threats', icon: '' },
        { to: '/network', title: 'Network', subtitle: 'Find Assets', icon: '' },
        { to: '/posts', title: 'Articles', subtitle: 'Hobby Articles', icon: '' },
        { to: '/ether', title: 'Ether', subtitle: 'Browse Let´s Plays', icon: '' },
        { to: '/library', title: 'Library', subtitle: 'Browse Rules', icon: '',
          children: [
            { to: '/library/species', title: 'Species', subtitle: 'Browse ', icon: '', },
            { to: '/library/archetypes', title: 'Archetypes', subtitle: 'Browse ', icon: '', },
            { to: '/library/ascension-packages', title: 'Species', subtitle: 'Browse ', icon: '', },
            { to: '/library/talents', title: 'Talents', subtitle: 'Browse ', icon: '', },
            { to: '/library/wargear', title: 'Wargear', subtitle: 'Browse ', icon: '', },
            { to: '/library/psychic-powers', title: 'Psychic Powers', subtitle: 'Browse ', icon: '', },
          ],
        },
        { to: '/codex', title: 'Codex', subtitle: 'Lookup Rules-snippet', icon: '' },
      ],
      drawer: {
        // sets the open status of the drawer
        open: false,
        // sets if the drawer is shown above (false) or below (true) the toolbar
        clipped: false,
        // sets if the drawer is CSS positioned as 'fixed'
        fixed: false,
        // sets if the drawer remains visible all the time (true) or not (false)
        permanent: false,
        // sets the drawer to the mini variant, showing only icons, of itself (true)
        // or showing the full drawer (false)
        mini: false,
      },
      toolbar: {
        fixed: true,
        // sets if the toolbar contents is leaving space for drawer (false) or not (true)
        clippedLeft: true,
      },
      footer: {
        // sets the CSS position of the footer
        fixed: true,
        // sets if the footer is full width (true) or gives space to the drawer (false)
        clippedLeft: true,
      },
    };
  },
  computed: {
    theme() {
      return this.$store.getters['theme'];
    },
  },
  watch: {
    theme: {
      handler(newTheme, oldTheme) {
        console.info(`handle ${newTheme}`);
        this.$vuetify.theme.dark = newTheme !== 'light';
      },
      immediate: true, // make this watch function is called when component created
    }
  },
  methods: {
    toggleDarkTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      let theme = this.$vuetify.theme.dark ? 'dark' : 'light';
      this.$store.commit('setTheme', theme);
      this.$ga.event('Settings', 'Change Theme', theme, 1);
    },
    toggleDrawer() {
      if (this.drawer.permanent) {
        this.drawer.permanent = !this.drawer.permanent;
        // set the clipped state of the drawer and toolbar
        this.drawer.clipped = true;
        this.toolbar.clippedLeft = true;
      } else {
        // normal drawer
        this.drawer.open = !this.drawer.open;
      }
    },
  },
};
</script>

<style scoped lang="scss">

  .brand-logo {

    &__text {
      color: hsl(0, 0%, 100%);
      text-decoration: none;
    }

  }

</style>
