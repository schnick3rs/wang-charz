<template>

  <v-app>

    <v-navigation-drawer
      app
      v-bind:clipped="drawer.clipped"
      v-bind:fixed="drawer.fixed"
      v-bind:permanent="drawer.permanent"
      v-bind:mini-variant="drawer.mini"
      v-model="drawer.open"
      width="220"
    >
      <v-list two-line subheader dense>

        <v-list-item
          nuxt
          v-bind:to="`/forge/characters/${$route.params.id}/builder/setting`"
        >
          <v-list-item-content >
            <v-list-item-title>Tier {{settingTier}} Campaign</v-list-item-title>
            <v-list-item-subtitle>Setting</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <span>{{spendBuildingPoints}} / {{totalBuildPoints}} BP</span>
          </v-list-item-action>

        </v-list-item>

        <div
          v-for="entry in helperBox"
          v-bind:key="entry.key"
        >
          <v-divider v-if="entry.divider"></v-divider>

          <v-list-item
            v-else
            nuxt
            v-bind:to="entry.path"
          >
            <v-list-item-content >
              <v-list-item-title>{{entry.text}}</v-list-item-title>
              <v-list-item-subtitle>{{entry.hint}}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <span v-if="entry.text">{{entry.cost}} BP</span>
              <v-icon v-else>info</v-icon>
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
      v-bind:fixed="toolbar.fixed"
      v-bind:clipped-left="toolbar.clippedLeft"
    >

      <v-app-bar-nav-icon v-on:click.stop="toggleDrawer"></v-app-bar-nav-icon>

      <v-toolbar-items>
        <v-btn icon nuxt to="/"><v-icon>home</v-icon></v-btn>
      </v-toolbar-items>

      <v-toolbar-title class="pl-4">Doctors of Doom</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>

      </v-toolbar-items>

    </v-app-bar>

    <v-content>

      <v-toolbar dense style="overflow: auto">
        <v-toolbar-items>
          <v-btn small text nuxt v-bind:to="`/forge/my-characters`" icon><v-icon>supervisor_account</v-icon></v-btn>
          <v-btn small text nuxt v-bind:to="`/forge/characters/${$route.params.id}/builder/setting`" >Setting</v-btn>
          <v-btn small text nuxt v-bind:to="`/forge/characters/${$route.params.id}/builder/species`" v-bind:disabled="!settingSelected">1. Species</v-btn>
          <v-btn small text nuxt v-bind:to="`/forge/characters/${$route.params.id}/builder/archetype`" v-bind:disabled="!settingSelected">2. Archetype</v-btn>
          <v-btn small text nuxt v-bind:to="`/forge/characters/${$route.params.id}/builder/ascension`" v-bind:disabled="!settingSelected">3. Ascension</v-btn>
          <v-btn small text nuxt v-bind:to="`/forge/characters/${$route.params.id}/builder/stats`" v-bind:disabled="!settingSelected">4. Stats</v-btn>
          <v-btn small text nuxt v-bind:to="`/forge/characters/${$route.params.id}/builder/talents`" v-bind:disabled="!settingSelected">5. Talents</v-btn>
          <v-btn small text nuxt v-bind:to="`/forge/characters/${$route.params.id}/builder/wargear`" v-bind:disabled="!settingSelected">6. Wargear</v-btn>
          <v-btn small text nuxt v-bind:to="`/forge/characters/${$route.params.id}/builder/psychic-powers`" v-bind:disabled="!settingSelected">7. Psychic Powers</v-btn>
          <v-btn small text nuxt v-bind:to="`/forge/characters/${$route.params.id}/builder/background`" v-bind:disabled="!settingSelected" >8. Background</v-btn>
          <v-btn
            small
            nuxt
            icon
            v-bind:to="`/forge/characters/${$route.params.id}/builder/print`"
            v-bind:disabled="!settingSelected"
            target="_blank"
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

        <v-row justify="center">

          <v-col
            v-bind:cols="12"
            v-bind:sm="10"
            v-bind:md="10"
            v-bind:lg="7"
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
      v-bind:color="(spendBuildingPoints > totalBuildPoints) ? 'error' : ''"
      class="caption"
    >
      <div>{{spendBuildingPoints}} / {{totalBuildPoints}} BP</div>
      <v-spacer ></v-spacer>
      <div class="caption d-none d-sm-block">{{finalKeywords.join(' • ')}}</div>
      <div class="d-block d-sm-none">
        <v-btn tile small nuxt v-bind:to="linkPrev" v-bind:disabled="linkCurrentIndex === 0"><v-icon left small>chevron_left</v-icon>prev</v-btn>
        <v-btn tile small nuxt v-bind:to="linkNext" v-bind:disabled="linkCurrentIndex === 8">next<v-icon right small>chevron_right</v-icon></v-btn>
      </div>
      <v-spacer></v-spacer>
      <span>&copy; {{ new Date().getFullYear() }}</span><span class="d-none d-md-block"> Doctors of Doom</span>
    </v-footer>

  </v-app>
</template>

<script>
import DefaultFooter from '~/components/DefaultFooter.vue';
import ToolbarAccountActions from '~/components/user/ToolbarAccountActions.vue';

export default {
  components: {
    DefaultFooter ,
    ToolbarAccountActions,
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
          content: 'Build you Wrath & Glory Character and explore the Warhammer 40k Universe. ' +
            'Select Species and Archetype, learn some Talents, acquire Wargear and (if needed) ' +
            'tap into the warp powers.',
        },
      ],
      link: [
        { rel: 'canonical', href: `https://www.doctors-of-doom.com${this.$route.path}` },
      ],
    };
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
  },
  computed: {
    helperBox() {
      return [
        { divider: true },
        { id: 1, path: `/forge/characters/${this.$route.params.id}/builder/species`, hint: 'Species', text: this.characterSpeciesLabel, cost: this.characterSpeciesCost },
        { id: 2, path: `/forge/characters/${this.$route.params.id}/builder/archetype`, hint: 'Archetype', text: this.characterArchetype, cost: this.characterArchetypeCost },
        { id: 3, path: `/forge/characters/${this.$route.params.id}/builder/ascension`, hint: 'Ascension Packages', text: this.characterAscension, cost: this.characterAscensionCost },
        { id: 4, path: `/forge/characters/${this.$route.params.id}/builder/stats`, hint: 'Stats', text: 'Attributes & Skills', cost: this.characterAttributeCost + this.characterSkillCost },
        { id: 5, path: `/forge/characters/${this.$route.params.id}/builder/talents`, hint: `Talents (max ${this.maximumStartingTalents})`, text: `${this.characterTalents.length} Talents learned`, cost: this.characterTalentCost },
        { id: 7, path: `/forge/characters/${this.$route.params.id}/builder/psychic-powers`, hint: `Powers (max ${this.maximumPsychicPowers})`, text: `${this.characterPsychicPowers.length} Powers learned`, cost: this.characterPsychicPowerCost },
        { divider: true },
        { id: 6, path: `/forge/characters/${this.$route.params.id}/builder/wargear`, hint: '', text: 'Wargear', cost: undefined },
        { id: 8, path: `/forge/characters/${this.$route.params.id}/builder/background`, hint: 'Background', text: this.characterBackground, cost: undefined },
      ];
    },

    linkCurrentIndex(){
      const currentRoute = this.helperBox.find( i => i.path === this.$route.path );
      return currentRoute !== undefined ? currentRoute.id : 0;
    },

    linkPrev(){
      const index = this.linkCurrentIndex;
      const prevRoute = this.helperBox.find( i => i.id === index-1 );
      return prevRoute !== undefined ? prevRoute.path : `/forge/characters/${this.$route.params.id}/builder/setting`;
    },
    linkNext(){
      const index = this.linkCurrentIndex;
      const nextRoute = this.helperBox.find( i => i.id === index+1 );
      return nextRoute !== undefined ? nextRoute.path : '';
    },

    settingSelected() {
      return true;
    },

    settingTier(){
      return this.$store.getters['characters/characterSettingTierById'](this.$route.params.id);
    },
    campaignCustomXp(){
      return this.$store.getters['characters/characterCampaignCustomXpById'](this.$route.params.id);
    },
    totalBuildPoints() {
      return this.$store.getters['characters/characterTotalBuildPointsById'](this.$route.params.id);
    },
    spendBuildingPoints(){
      return this.$store.getters['characters/characterSpendBuildPointsById'](this.$route.params.id);
    },

    keywords(){
      return this.$store.getters['characters/characterKeywordsRawById'](this.$route.params.id);
    },
    finalKeywords(){
      return this.$store.getters['characters/characterKeywordsFinalById'](this.$route.params.id);
    },

    // see core page 156
    maximumBuildPointsForAttributes() {
      const bpLimits = [0, 100, 100, 150, 200, 300];
      return bpLimits[this.settingTier()];
    },
    maximumStartingTalents() { return Math.min(5, this.settingTier + 1); },
    maximumPsychicPowers() { return this.settingTier + 3; },

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
</style>
