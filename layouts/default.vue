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
      <v-list
      >
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
      <v-toolbar-title>
        <nuxt-link to="/" class="title brand-logo brand-logo__text">
          Doctors of Doom
        </nuxt-link>
      </v-toolbar-title>

      <v-spacer />

      <v-toolbar-items>

        <v-btn icon href="https://www.reddit.com/r/40krpg/">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
               viewBox="0 0 341.8 341.8" style="enable-background:new 0 0 341.8 341.8;" xml:space="preserve">
            <style type="text/css">
              .st0{fill:#FF4500;}
              .st1{fill:#FFFFFF;}
              .st2{display:none;}
              .st3{display:inline;fill:none;stroke:#D8D8D8;stroke-width:0.5;stroke-miterlimit:10;}
            </style>
                        <g id="Artwork">
              <g>
                <circle class="st0" cx="170.9" cy="170.9" r="85.5"/>
                <path class="st1" d="M227.9,170.9c0-6.9-5.6-12.5-12.5-12.5c-3.4,0-6.4,1.3-8.6,3.5c-8.5-6.1-20.3-10.1-33.3-10.6l5.7-26.7
                  l18.5,3.9c0.2,4.7,4.1,8.5,8.9,8.5c4.9,0,8.9-4,8.9-8.9c0-4.9-4-8.9-8.9-8.9c-3.5,0-6.5,2-7.9,5l-20.7-4.4c-0.6-0.1-1.2,0-1.7,0.3
                  c-0.5,0.3-0.8,0.8-1,1.4l-6.3,29.8c-13.3,0.4-25.2,4.3-33.8,10.6c-2.2-2.1-5.3-3.5-8.6-3.5c-6.9,0-12.5,5.6-12.5,12.5
                  c0,5.1,3,9.4,7.4,11.4c-0.2,1.2-0.3,2.5-0.3,3.8c0,19.2,22.3,34.7,49.9,34.7s49.9-15.5,49.9-34.7c0-1.3-0.1-2.5-0.3-3.7
                  C224.8,180.4,227.9,176,227.9,170.9z M142.4,179.8c0-4.9,4-8.9,8.9-8.9c4.9,0,8.9,4,8.9,8.9c0,4.9-4,8.9-8.9,8.9
                  C146.4,188.7,142.4,184.7,142.4,179.8z M192.1,203.3c-6.1,6.1-17.7,6.5-21.1,6.5c-3.4,0-15.1-0.5-21.1-6.5c-0.9-0.9-0.9-2.4,0-3.3
                  c0.9-0.9,2.4-0.9,3.3,0c3.8,3.8,12,5.2,17.9,5.2s14-1.4,17.9-5.2c0.9-0.9,2.4-0.9,3.3,0C193,201,193,202.4,192.1,203.3z
                   M190.5,188.7c-4.9,0-8.9-4-8.9-8.9c0-4.9,4-8.9,8.9-8.9c4.9,0,8.9,4,8.9,8.9C199.4,184.7,195.4,188.7,190.5,188.7z"/>
              </g>
            </g>
                        <g id="Spacing_Guide" class="st2">
              <rect class="st3" width="85.4" height="85.4"/>
                          <rect class="st3" width="341.8" height="85.4"/>
                          <rect y="256.3" class="st3" width="341.8" height="85.4"/>
                          <rect class="st3" width="85.4" height="341.8"/>
                          <rect x="256.4" class="st3" width="85.4" height="341.8"/>
            </g>
          </svg>
        </v-btn>

        <v-btn icon href="https://discordapp.com/channels/256930339878993920/600107858486493193">
          <svg id="Layer_1" height="18" width="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 245 240">
            <path style="fill:#FFFFFF;" d="M104.4 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1.1-6.1-4.5-11.1-10.2-11.1zM140.9 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1s-4.5-11.1-10.2-11.1z" />
            <path style="fill:#FFFFFF;" d="M189.5 20h-134C44.2 20 35 29.2 35 40.6v135.2c0 11.4 9.2 20.6 20.5 20.6h113.4l-5.3-18.5 12.8 11.9 12.1 11.2 21.5 19V40.6c0-11.4-9.2-20.6-20.5-20.6zm-38.6 130.6s-3.6-4.3-6.6-8.1c13.1-3.7 18.1-11.9 18.1-11.9-4.1 2.7-8 4.6-11.5 5.9-5 2.1-9.8 3.5-14.5 4.3-9.6 1.8-18.4 1.3-25.9-.1-5.7-1.1-10.6-2.7-14.7-4.3-2.3-.9-4.8-2-7.3-3.4-.3-.2-.6-.3-.9-.5-.2-.1-.3-.2-.4-.3-1.8-1-2.8-1.7-2.8-1.7s4.8 8 17.5 11.8c-3 3.8-6.7 8.3-6.7 8.3-22.1-.7-30.5-15.2-30.5-15.2 0-32.2 14.4-58.3 14.4-58.3 14.4-10.8 28.1-10.5 28.1-10.5l1 1.2c-18 5.2-26.3 13.1-26.3 13.1s2.2-1.2 5.9-2.9c10.7-4.7 19.2-6 22.7-6.3.6-.1 1.1-.2 1.7-.2 6.1-.8 13-1 20.2-.2 9.5 1.1 19.7 3.9 30.1 9.6 0 0-7.9-7.5-24.9-12.7l1.4-1.6s13.7-.3 28.1 10.5c0 0 14.4 26.1 14.4 58.3 0 0-8.5 14.5-30.6 15.2z" />
          </svg>
        </v-btn>

        <v-btn icon href="https://twitter.com/doctors_of_doom">
          <svg
            height="18"
            width="18"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 400 400"
            style="enable-background:new 0 0 400 400;"
            xml:space="preserve"
          >
            <g id="Dark_Blue">
              <circle style="fill:#1DA1F2;" cx="200" cy="200" r="200" />
            </g>
            <g id="Logo__x2014__FIXED">
              <path
                style="fill:#FFFFFF;"
                d="M163.4,305.5c88.7,0,137.2-73.5,137.2-137.2c0-2.1,0-4.2-0.1-6.2c9.4-6.8,17.6-15.3,24.1-25
                c-8.6,3.8-17.9,6.4-27.7,7.6c10-6,17.6-15.4,21.2-26.7c-9.3,5.5-19.6,9.5-30.6,11.7c-8.8-9.4-21.3-15.2-35.2-15.2
                c-26.6,0-48.2,21.6-48.2,48.2c0,3.8,0.4,7.5,1.3,11c-40.1-2-75.6-21.2-99.4-50.4c-4.1,7.1-6.5,15.4-6.5,24.2
                c0,16.7,8.5,31.5,21.5,40.1c-7.9-0.2-15.3-2.4-21.8-6c0,0.2,0,0.4,0,0.6c0,23.4,16.6,42.8,38.7,47.3c-4,1.1-8.3,1.7-12.7,1.7
                c-3.1,0-6.1-0.3-9.1-0.9c6.1,19.2,23.9,33.1,45,33.5c-16.5,12.9-37.3,20.6-59.9,20.6c-3.9,0-7.7-0.2-11.5-0.7
                C110.8,297.5,136.2,305.5,163.4,305.5"
              />
            </g>
          </svg>
        </v-btn>

      </v-toolbar-items>

      <v-app-bar-nav-icon @click.stop="toggleDrawer" class="d-md-none" />
    </v-app-bar>

    <v-content>

      <v-toolbar dense class="d-none d-md-block">
        <v-toolbar-items>
          <v-btn
            v-for="item in navigation"
            :key="item.to"
            small
            text
            nuxt
            :to="item.to"
          >
            {{ item.title }}
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-container>
        <v-row justify="center" no-gutters>
          <v-col
            :cols="12"
            :xl="8"
          >
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-content>

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
  methods: {
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
