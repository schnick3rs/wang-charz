import Vue from 'vue';
import Vuex from 'vuex';
import './plugins/vuetify';
import App from './App.vue';
import VueRouter from "vue-router";

import SpeciesSelection from "./components/SpeciesSelection";
import ArchetypeSelection from "./components/ArchetypeSelection";
import AttributeSelection from "./components/AttributeSelection";
import SettingSelection from "./components/SettingSelection";
import BackgroundSelection from "./components/BackgroundSelection";
import TalentSelection from "./components/TalentSelection";
import StatsSelection from "./components/StatsSelection";
import AscensionSelection from "./components/AscensionSelection";
import WargearSelection from "./components/WargearSelection";
import ArchetypeManage from "./components/ArchetypeManage";
import About from "./components/page/About";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Vuex);

const routes = [
  { path: '/', name: 'Home', component: SettingSelection, },
  { path: '/setting', name: 'Setting', component: SettingSelection, },
  { path: '/char/species', name: 'Species', component: SpeciesSelection },
  { path: '/char/archetype/select', name: 'Archetype', component: ArchetypeSelection },
  { path: '/char/archetype/manage', name: 'Manage Archetype', component: ArchetypeManage },
  { path: '/char/stats', name: 'Stats', component: StatsSelection },
  { path: '/char/talents', name: 'Talents', component: TalentSelection },
  { path: '/char/background', name: 'Background', component: BackgroundSelection },
  { path: '/char/wargear', name: 'Wargear', component: WargearSelection },
  { path: '/char/ascension', name: 'Ascension', component: AscensionSelection },
  { path: '/char/psychic-powers', name: 'Psychic Powers', component: AttributeSelection },
  { path: '/about', name: 'About', component: About, },
];

const router = new VueRouter({
  routes
});

const store = new Vuex.Store({
  state: {
    setting: undefined,
    settingTier: 3,
    species: { value: "Human", cost: 0 },
    archetype: { value: "Imperial Guardsman", cost: 0 },
    attributes: {
      strength: 2,
      agility: 2,
      toughness: 2,
      intellect: 2,
      willpower: 2,
      fellowship: 2,
      initiative: 2,
    },
    skills: {
      athletics: 0,
      awareness: 0,
      ballisticSkill: 0,
      cunning: 0,
      deception: 0,
      insight: 0,
      intimidation: 0,
      investigation: 0,
      leadership: 0,
      medicae: 0,
      persuasion: 0,
      pilot: 0,
      psychicMastery: 0,
      scholar: 0,
      stealth: 0,
      survival: 0,
      tech: 0,
      weaponSkill: 0,
    },
    ascensions: [],
    enhancements: [
      { targetGroup: 'attributes', targetValue: 'strength', modifier: 1, hint: 'Astartes Physiology' },
    ],
  },
  getters: {
    settingTier(state) { return state.settingTier },
    species(state) { return state.species.value; },
    archetype(state) { return state.archetype.value; },
    attributes(state) { return state.attributes; },
    attributesEnhanced(state) {
      let enhanced = Object.assign({}, state.attributes);
      let attributeEnhancements = state.enhancements.filter( e => { return e.targetGroup === 'attributes' } );
      attributeEnhancements.forEach( m => {
        console.info(`Enhance ${m.targetValue} my ${m.modifier} due to ${m.hint}.`);
        enhanced[m.targetValue] += m.modifier;
      });
      return enhanced;
    },
    skills(state) { return state.skills; },
    traits(state) {
      let traits = {};
      traits['defence'] = state.attributes.initiative-1;
      traits['resilience'] = state.attributes.toughness+1;
      traits['soak'] = state.attributes.toughness;
      traits['wounds'] = state.attributes.toughness+state.settingTier;
      traits['shock'] = state.attributes.willpower+state.settingTier;
      traits['resolve'] = state.attributes.willpower-1;
      traits['conviction'] = state.attributes.willpower;
      traits['passiveAwareness'] = Math.round((state.attributes.intellect+state.skills.awareness)/2);
      traits['influence'] = state.attributes.fellowship-1;
      traits['wealth'] = state.settingTier;
      traits['speed'] = 6;
      traits['corruption'] = 0;
      return traits;
    },
    remainingBuildPoints(state, getters) {
      let remaining = 0;
      remaining = state.settingTier*100;
      console.log(`Points spend: ${getters.getSpendBuildingPoints}.`);
      return (state.settingTier * 100) - getters.getSpendBuildingPoints;
    },
    getSpendBuildingPoints(state) {
      let spend = 0;

      console.debug(` Spend ${state.species.cost} for being ${state.species.value}`);
      spend += state.species.cost;

      console.debug(` Spend ${state.archetype.cost} for being ${state.archetype.value}`);
      spend += state.archetype.cost;

      const attributeTotalCost = [0, 0, 4, 10, 18, 33, 51, 72, 104, 140, 180, 235, 307];
      let attributesSpending = 0;
      Object.keys(state.attributes).forEach( (key) => {
        attributesSpending += attributeTotalCost[ state.attributes[key] ];
      });
      console.debug(` Spend ${attributesSpending} for for attributes.`);
      spend += attributesSpending;

      const skillTotalCost = [0, 1, 3, 6, 10, 20, 32, 46, 60];
      let skillSpending = 0;
      Object.keys(state.skills).forEach( (key) => {
        skillSpending += skillTotalCost[ state.skills[key] ];
      });
      console.debug(` Spend ${skillSpending} for for skills.`);
      spend += skillSpending;

      console.log(`Spend ${spend} in total.`);
      return spend;
    }
  },
  mutations: {
    setSettingTier(state, payload) {
      console.log(payload);
      state.settingTier = payload.amount;
    },
    setSpecies(state, payload) {
      console.log(payload);
      state.species = payload;
    },
    setArchetype(state, payload) {
      console.log(payload);
      state.archetype = payload;
    },
    setAttribute(state, payload) {
      console.log(payload);
      state.attributes[payload.key] = payload.value;
    },
    setSkill(state, payload) {
      console.log(payload);
      state.skills[payload.key] = payload.value;
    },
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
