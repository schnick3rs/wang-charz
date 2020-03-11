<template>
  <v-app>

    <v-navigation-drawer
      v-model="drawer.open"
      app
      :clipped="drawer.clipped"
      :fixed="drawer.fixed"
      :permanent="drawer.permanent"
      :mini-variant="drawer.mini"
      width="220"
    >
      <v-list two-line subheader dense>
        <v-list-item
          nuxt
          :to="`/forge/characters/${$route.params.id}/builder/setting`"
        >
          <v-list-item-content>
            <v-list-item-title>Tier {{ settingTier }} Campaign</v-list-item-title>
            <v-list-item-subtitle>Setting</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <span>{{ spendBuildingPoints }} / {{ totalBuildPoints }} BP</span>
          </v-list-item-action>
        </v-list-item>

        <div
          v-for="entry in helperBox"
          :key="entry.key"
        >
          <v-divider v-if="entry.divider" />

          <v-list-item
            v-else
            nuxt
            :to="entry.path"
          >
            <v-list-item-content>
              <v-list-item-title>{{ entry.text }}</v-list-item-title>
              <v-list-item-subtitle>{{ entry.hint }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <span v-if="entry.text">{{ entry.cost }} BP</span>
              <v-icon v-else>
                info
              </v-icon>
            </v-list-item-action>
          </v-list-item>
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
      <v-app-bar-nav-icon @click.stop="toggleDrawer" />

      <v-toolbar-title>
        <nuxt-link to="/" class="title brand-logo brand-logo__text">
          Doctors of Doom
        </nuxt-link>
      </v-toolbar-title>

      <v-spacer />

      <v-toolbar-items>
        <v-icon v-if="$nuxt.isOffline" color="warning">
          offline_bolt
        </v-icon>

        <v-btn icon href="https://discordapp.com/channels/256930339878993920/600107858486493193">
          <svg id="Layer_1" height="24" width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 245 240">
            <path style="fill:#FFFFFF;" d="M104.4 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1.1-6.1-4.5-11.1-10.2-11.1zM140.9 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1s-4.5-11.1-10.2-11.1z" />
            <path style="fill:#FFFFFF;" d="M189.5 20h-134C44.2 20 35 29.2 35 40.6v135.2c0 11.4 9.2 20.6 20.5 20.6h113.4l-5.3-18.5 12.8 11.9 12.1 11.2 21.5 19V40.6c0-11.4-9.2-20.6-20.5-20.6zm-38.6 130.6s-3.6-4.3-6.6-8.1c13.1-3.7 18.1-11.9 18.1-11.9-4.1 2.7-8 4.6-11.5 5.9-5 2.1-9.8 3.5-14.5 4.3-9.6 1.8-18.4 1.3-25.9-.1-5.7-1.1-10.6-2.7-14.7-4.3-2.3-.9-4.8-2-7.3-3.4-.3-.2-.6-.3-.9-.5-.2-.1-.3-.2-.4-.3-1.8-1-2.8-1.7-2.8-1.7s4.8 8 17.5 11.8c-3 3.8-6.7 8.3-6.7 8.3-22.1-.7-30.5-15.2-30.5-15.2 0-32.2 14.4-58.3 14.4-58.3 14.4-10.8 28.1-10.5 28.1-10.5l1 1.2c-18 5.2-26.3 13.1-26.3 13.1s2.2-1.2 5.9-2.9c10.7-4.7 19.2-6 22.7-6.3.6-.1 1.1-.2 1.7-.2 6.1-.8 13-1 20.2-.2 9.5 1.1 19.7 3.9 30.1 9.6 0 0-7.9-7.5-24.9-12.7l1.4-1.6s13.7-.3 28.1 10.5c0 0 14.4 26.1 14.4 58.3 0 0-8.5 14.5-30.6 15.2z" />
          </svg>
        </v-btn>

        <v-btn icon href="https://twitter.com/doctors_of_doom">
          <svg
            height="24"
            width="24"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
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
    </v-app-bar>

    <v-content>

      <v-toolbar dense style="overflow: auto">
        <v-toolbar-items>
          <v-btn small text nuxt :to="`/forge/my-characters`" icon>
            <v-icon>supervisor_account</v-icon>
          </v-btn>
          <v-btn small text nuxt :to="`/forge/characters/${$route.params.id}/builder/setting`">
            Setting
          </v-btn>
          <v-btn small text nuxt :to="routes.species" :disabled="!settingSelected">
            1. Species
          </v-btn>
          <v-btn small text nuxt :to="routes.archetype" :disabled="!settingSelected">
            2. Archetype
          </v-btn>
          <v-btn small text nuxt :to="routes.ascension" :disabled="!settingSelected">
            3. Ascension
          </v-btn>
          <v-btn small text nuxt :to="routes.stats" :disabled="!settingSelected">
            4. Stats
          </v-btn>
          <v-btn small text nuxt :to="routes.talents" :disabled="!settingSelected">
            5. Talents
          </v-btn>
          <v-btn small text nuxt :to="routes.wargear" :disabled="!settingSelected">
            6. Wargear
          </v-btn>
          <v-btn small text nuxt :to="routes.psychic" :disabled="!settingSelected">
            7. Psychic Powers
          </v-btn>
          <v-btn small text nuxt :to="routes.background" :disabled="!settingSelected">
            8. Background
          </v-btn>
          <v-btn
            small
            nuxt
            icon
            exact
            :to="`/forge/characters/${$route.params.id}`"
            :disabled="!settingSelected"
          >
            <v-icon>description</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-container>

        <v-btn
          v-if="false"
          small
          color="green lighten-2"
          style="position: fixed; top: 174px; right: 350px; margin-right: 50%;"
        >
          <v-icon>chevron_left</v-icon>
        </v-btn>

        <v-row v-if="isOutdated" align="center" justify="center">
          <v-col :cols="12" :sm="10">
            <h2>Update Available</h2>
            <p>
              This character was build with an older version and needs to be updated to ensure all
              fields are up to date. Just hit the <strong>update button</strong> to bring this
              character back in line. Or go to the overview page, and update all characters there.
            </p>
            <p>
              <v-alert type="warning" dense outlined>
                After thy update, please <strong>reselect potential ascension packages</strong>
                to ensure that influence is computed correctly.
              </v-alert>
            </p>
            <v-btn small color="success" @click="migrateCharacter">Update Character</v-btn>
            <v-btn small color="success" nuxt exact :to="`/forge/my-characters`">To the Character Overview</v-btn>
          </v-col>
        </v-row>

        <v-row justify="center" v-if="!isOutdated">
          <v-col
            :cols="12"
            :sm="10"
            :md="10"
            :lg="7"
          >
            <nuxt />
          </v-col>
        </v-row>

        <v-btn
          v-if="false"
          small
          color="green lighten-2"
          style="position: fixed; top: 174px; left: 350px; margin-left: 50%;"
        >
          <v-icon>chevron_right</v-icon>
        </v-btn>
      </v-container>

    </v-content>

    <v-footer
      app
      dark
      :color="(spendBuildingPoints > totalBuildPoints) ? 'error' : ''"
      class="caption"
    >
      <div>{{ spendBuildingPoints }} / {{ totalBuildPoints }} BP</div>
      <v-spacer />
      <div class="caption d-none d-sm-block">
        {{ finalKeywords.join(' • ') }}
      </div>
      <div class="d-block d-sm-none">
        <v-btn tile small nuxt :to="linkPrev" :disabled="linkCurrentIndex === 0">
          <v-icon left small>
            chevron_left
          </v-icon>prev
        </v-btn>
        <v-btn tile small nuxt :to="linkNext" :disabled="linkCurrentIndex === 8">
          next<v-icon right small>
            chevron_right
          </v-icon>
        </v-btn>
      </div>
      <v-spacer />
      <span>&copy; {{ new Date().getFullYear() }}</span><span class="d-none d-md-block"> Doctors of Doom</span>
    </v-footer>

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
  data() {
    return {
      drawer: {
        // sets the open status of the drawer
        open: true,
        // sets if the drawer is shown above (false) or below (true) the toolbar
        clipped: true,
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
    routes() {
      return {
        species: this.routeBuilder('species', this.characterSpeciesLabel ? 'manage' : 'choose'),
        archetype: this.routeBuilder('archetype', this.characterArchetype ? 'manage' : 'choose'),
        ascension: this.routeBuilder('ascension', 'manage'),
        stats: this.routeBuilder('stats'),
        talents: this.routeBuilder('talents'),
        psychic: this.routeBuilder('psychic-powers'),
        wargear: this.routeBuilder('wargear'),
        background: this.routeBuilder('background'),
      };
    },
    helperBox() {
      return [
        { divider: true },
        {
          id: 1, path: this.routes.species, hint: 'Species', text: this.characterSpeciesLabel, cost: this.characterSpeciesCost,
        },
        {
          id: 2, path: this.routes.archetype, hint: 'Archetype', text: this.characterArchetype, cost: this.characterArchetypeCost,
        },
        {
          id: 3, path: this.routes.ascension, hint: 'Ascension Packages', text: this.characterAscension, cost: this.characterAscensionCost,
        },
        {
          id: 4, path: this.routes.stats, hint: 'Stats', text: 'Attributes & Skills', cost: this.characterAttributeCost + this.characterSkillCost,
        },
        {
          id: 5, path: this.routes.talents, hint: `Talents (max ${this.maximumStartingTalents})`, text: `${this.characterTalents.length} Talents learned`, cost: this.characterTalentCost,
        },
        {
          id: 7, path: this.routes.psychic, hint: `Powers (max ${this.maximumPsychicPowers})`, text: `${this.characterPsychicPowers.length} Powers learned`, cost: this.characterPsychicPowerCost,
        },
        { divider: true },
        {
          id: 6, path: this.routes.wargear, hint: '', text: 'Wargear', cost: undefined,
        },
        {
          id: 8, path: this.routes.background, hint: 'Background', text: this.characterBackground, cost: undefined,
        },
      ];
    },

    linkCurrentIndex() {
      const currentRoute = this.helperBox
        .filter((i) => i.path !== undefined)
        .find((i) => i.path.name === this.$route.name);
      return currentRoute !== undefined ? currentRoute.id : 0;
    },

    linkPrev() {
      const index = this.linkCurrentIndex;
      const prevRoute = this.helperBox.find((i) => i.id === index - 1);
      return prevRoute !== undefined ? prevRoute.path : `/forge/characters/${this.$route.params.id}/builder/setting`;
    },
    linkNext() {
      const index = this.linkCurrentIndex;
      const nextRoute = this.helperBox.find((i) => i.id === index + 1);
      return nextRoute !== undefined ? nextRoute.path : '';
    },

    settingSelected() {
      return true;
    },

    settingTier() {
      return this.$store.getters['characters/characterSettingTierById'](this.$route.params.id);
    },
    campaignCustomXp() {
      return this.$store.getters['characters/characterCampaignCustomXpById'](this.$route.params.id);
    },
    totalBuildPoints() {
      return this.$store.getters['characters/characterTotalBuildPointsById'](this.$route.params.id);
    },
    spendBuildingPoints() {
      return this.$store.getters['characters/characterSpendBuildPointsById'](this.$route.params.id);
    },

    keywords() {
      return this.$store.getters['characters/characterKeywordsRawById'](this.$route.params.id);
    },
    finalKeywords() {
      return this.$store.getters['characters/characterKeywordsFinalById'](this.$route.params.id);
    },

    // see core page 156
    maximumBuildPointsForAttributes() {
      const bpLimits = [0, 100, 100, 150, 200, 300];
      return bpLimits[this.settingTier()];
    },
    maximumStartingTalents() { return Math.min(5, this.settingTier + 1); },
    maximumPsychicPowers() { return this.settingTier + 3; },

    isOutdated() {
      return this.characterVersion < this.builderVersion;
    },
    builderVersion(id) {
      return this.$store.getters['builderVersion'];
    },
    characterVersion(id) {
      return this.$store.getters['characters/characterVersionById'](this.$route.params.id);
    },
    characterSpeciesLabel() {
      return this.$store.getters['characters/characterSpeciesLabelById'](this.$route.params.id);
    },
    characterArchetype() {
      return this.$store.getters['characters/characterArchetypeLabelById'](this.$route.params.id);
    },
    characterTalents() {
      return this.$store.getters['characters/characterTalentsById'](this.$route.params.id);
    },
    characterPsychicPowers() {
      return this.$store.getters['characters/characterPsychicPowersById'](this.$route.params.id);
    },
    characterAscension() {
      const packages = this.$store.getters['characters/characterAscensionPackagesById'](this.$route.params.id);
      if (packages !== undefined && packages.length > 0) {
        return packages[0].value;
      }
      return '';
    },
    characterBackground() {
      return this.$store.getters['characters/characterBackgroundLabelById'](this.$route.params.id);
    },
    characterSpeciesCost() {
      return this.$store.getters['characters/characterSpeciesCostsById'](this.$route.params.id);
    },
    characterArchetypeCost() {
      return this.$store.getters['characters/characterArchetypeCostsById'](this.$route.params.id);
    },
    characterAscensionCost() {
      return this.$store.getters['characters/characterAscensionCostsById'](this.$route.params.id);
    },
    characterAttributeCost() {
      return this.$store.getters['characters/characterAttributeCostsById'](this.$route.params.id);
    },
    characterSkillCost() {
      return this.$store.getters['characters/characterSkillCostsById'](this.$route.params.id);
    },
    characterTalentCost() {
      return this.$store.getters['characters/characterTalentCostsById'](this.$route.params.id);
    },
    characterPsychicPowerCost() {
      return this.$store.getters['characters/characterPsychicPowerCostsById'](this.$route.params.id);
    },
  },
  asyncData({ params }) {
    return {
    };
  },
  head() {
    return {
      titleTemplate: '%s | Character Builder',
      title: 'Create your Character',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Build you Wrath & Glory Character and explore the Warhammer 40k Universe. '
            + 'Select Species and Archetype, learn some Talents, acquire Wargear and (if needed) '
            + 'tap into the warp powers.',
        },
        { hid: 'robots', name: 'robots', content: 'noindex,nofollow' },
      ],
      link: [
        { rel: 'canonical', href: `https://www.doctors-of-doom.com${this.$route.path}` },
      ],
    };
  },
  methods: {
    // changes the drawer to permanent
    makeDrawerPermanent() {
      this.drawer.permanent = true;
      // set the clipped state of the drawer and toolbar
      this.drawer.clipped = false;
      this.toolbar.clippedLeft = false;
    },
    // toggles the drawer variant (mini/full)
    toggleMiniDrawer() {
      this.drawer.mini = !this.drawer.mini;
    },
    // toggles the drawer type (permanent vs temporary) or shows/hides the drawer
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
    routeBuilder(parent, child) {
      if (child) {
        return { name: `forge-characters-id-builder-${parent}-${child}`, params: { id: this.$route.params.id } };
      }
      return { name: `forge-characters-id-builder-${parent}`, params: { id: this.$route.params.id } };
    },
    migrateCharacter() {
      this.$store.dispatch('characters/migrate', { characterId: this.$route.params.id });
    },
  },
};
</script>

<style scoped lang="scss">
  .dod-container {

    @media (min-width: 768px) {
      width: 680px;
    }

  }

  .fancy {
    /*position: absolute;*/
    /*width: 100%;*/
    /*height: 100%;*/
    /*transform: rotate(90deg);*/
    /*background-image: url('https://i.imgur.com/E9huxA0.png');*/
    background-image: url('https://i.imgur.com/NfGsk6O.png');
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }

  .brand-logo {

    &__text {
      color: hsl(0, 0%, 100%);
      text-decoration: none;
    }

  }

</style>
