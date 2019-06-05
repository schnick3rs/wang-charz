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
import SkillSelection from "./components/SkillSelection";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Vuex);

const routes = [
  { path: '/', name: 'Home', component: SettingSelection },
  { path: '/setting', name: 'Setting', component: SettingSelection },
  { path: '/char/species', name: 'Species', component: SpeciesSelection },
  { path: '/char/archetype', name: 'Archetype', component: ArchetypeSelection },
  { path: '/char/attributes', name: 'Attributes', component: AttributeSelection },
  { path: '/char/skills', name: 'Skills', component: SkillSelection },
  { path: '/char/talent', name: 'Talents', component: TalentSelection },
  { path: '/char/background', name: 'Background', component: BackgroundSelection },
  { path: '/char/skills', name: 'Ascension', component: AttributeSelection },
  { path: '/char/skills', name: 'Wargear', component: AttributeSelection },
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
      fellowship: 2,
      initiative: 2,
    },
  },
  getters: {
    settingTier(state) { return state.settingTier },
    species(state) { return state.species.value; },
    attributes(state) { return state.attributes; },
    remainingBuildPoints(state, getters) {
      let remaining = 0;
      remaining = state.settingTier*100
      console.log(`Setting tier: ${state.settingTier}.`);
      console.log(`Points spend: ${getters.getSpendBuildingPoints}.`);
      return (state.settingTier * 100) - getters.getSpendBuildingPoints;
    },
    getSpendBuildingPoints(state) {
      let spend = 0;
      console.log(`Spend ${state.species.cost} for being ${state.species.value}`);
      spend += state.species.cost;
      console.log(`Spend ${state.archetype.cost} for being ${state.archetype.value}`);
      spend += state.archetype.cost;
      const attributeCost = [0, 4, 10, 18, 33, 51, 72, 104, 140, 180, 235, 307];
      Object.keys(state.attributes).forEach( (key) => {
        let spending = attributeCost[ state.attributes[key]-1 ];
        console.log(`Spend ${spending} for ${key}`);
        spend += spending;
      });
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
      state.archetype = payload;
    },
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
