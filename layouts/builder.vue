<template>
  <v-app>
    <v-toolbar
      app
      dense
      dark
      :fixed="toolbar.fixed"
      :clipped-left="toolbar.clippedLeft"
    >
      <v-toolbar-items>
        <v-btn flat small nuxt to="/">Doctors of Doom</v-btn>
      </v-toolbar-items>

      <v-toolbar-title >
        <span class="text-capitalize">Forge</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>

      </v-toolbar-items>
    </v-toolbar>

    <v-content>

      <v-toolbar dense style="overflow: auto">
        <v-toolbar-items>
          <v-btn flat small nuxt to="/builder/setting" >Setting</v-btn>
          <v-btn flat small nuxt to="/builder/char/species" :disabled="!settingSelected">1. Species</v-btn>
          <v-btn flat small nuxt to="/builder/char/archetype" :disabled="!settingSelected">2. Archetype</v-btn>
          <v-btn flat small nuxt to="/builder/char/stats" :disabled="!settingSelected">3. Stats</v-btn>
          <v-btn flat small nuxt to="/builder/char/talents" :disabled="!settingSelected">4. Talents</v-btn>
          <v-btn flat small nuxt to="/builder/char/ascension" :disabled="!settingSelected">5. Ascension</v-btn>
          <v-btn flat small nuxt to="/builder/char/wargear" :disabled="!settingSelected">6. Wargear</v-btn>
          <v-btn flat small nuxt to="/builder/char/psychic-powers" :disabled="!settingSelected">7. Psychic Powers</v-btn>
          <v-btn flat small nuxt to="/builder/char/background" :disabled="!settingSelected">8. Background</v-btn>
          <v-btn
            flat
            small
            nuxt
            icon
            to="/builder/char/export"
            :disabled="!settingSelected"
          >
            <v-icon>description</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-container grid-list-md>

        <v-layout justify-center>

          <v-flex v-if="true" md3>

            <v-card>

              <v-list two-line subheader>

                <v-list-tile
                  v-for="entry in helperBox"
                  :key="entry.key"
                  avatar
                  nuxt
                  :to="entry.path"
                >
                  <v-list-tile-content >
                    <v-list-tile-title>{{entry.text}}</v-list-tile-title>
                    <v-list-tile-sub-title>{{entry.hint}}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>

              </v-list>

            </v-card>

          </v-flex>

          <v-flex xs12 sm10 md9 lg8 xl7>
            <nuxt />
          </v-flex>

        </v-layout>

      </v-container>

    </v-content>

    <v-footer :app="true" class="pa-2" dark>
      <div>{{spendBuildPoints}} / {{totalBuildPoints}} BP</div>
      <v-spacer></v-spacer>
      <v-btn nuxt to="/about">About</v-btn>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>

  </v-app>
</template>

<script>
  import DefaultFooter from '~/components/DefaultFooter'

  export default {
  components: { DefaultFooter },
  head() {
    return {
      link: [
        { rel: 'canonical', href: `https://www.doctors-of-doom.com${this.$route.path}` }
      ]
    }
  },
  data() {
    return {
      drawer: {
        // sets the open status of the drawer
        open: false,
        // sets if the drawer is shown above (false) or below (true) the toolbar
        clipped: true,
        // sets if the drawer is CSS positioned as 'fixed'
        fixed: false,
        // sets if the drawer remains visible all the time (true) or not (false)
        permanent: false,
        // sets the drawer to the mini variant, showing only icons, of itself (true)
        // or showing the full drawer (false)
        mini: false
      },
      toolbar: {
        fixed: true,
        // sets if the toolbar contents is leaving space for drawer (false) or not (true)
        clippedLeft: true
      },
      footer: {
        // sets the CSS position of the footer
        fixed: true,
        // sets if the footer is full width (true) or gives space to the drawer (false)
        clippedLeft: true
      }
    }
  },
  computed: {
    helperBox() {
      return [
        { path: '/builder/setting', hint: 'Framework', text: `Campaign Tier: ${this.settingTier}` },
        { path: '/builder/char/species', hint: 'Species', text: this.characterSpecies },
        { path: '/builder/char/archetype', hint: 'Archetype', text: this.characterArchetype},
        { path: '/builder/char/ascension', hint: 'Ascension Packages', text: this.characterAscension},
        { path: '/builder/char/background', hint: 'Background', text: this.characterBackground},
      ];
    },

    settingSelected() { return this.$store.state.settingSelected; },
    settingTier() { return this.$store.state.settingTier; },
    totalBuildPoints() { return this.$store.state.settingTier * 100; },
    spendBuildPoints() { return this.$store.getters['spendBuildingPoints']; },

    characterSpecies() { return this.$store.state.species.value; },
    characterArchetype() { return this.$store.state.archetype.value; },
    characterAscension() { return "Stay the course"; },
    characterBackground() { return "Origin (+3 Shock)"; },
  }
}
</script>
