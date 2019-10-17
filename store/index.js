import axios from 'axios';

export const state = () => ({
  id: -1,
  setting: undefined,
});

export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },
  loggedInUser(state) {
    return state.auth.user
  },
  id(state) { return state.id; },
  effectiveCharacterTier(state) {
    const archetypeTier = state.archetype.tier || 0;
    let ascensionTier = 0;
    state.ascensionPackages.forEach((i) => {
      if (i.targetTier > ascensionTier) {
        ascensionTier = i.targetTier;
      }
    });
    return Math.max(archetypeTier, ascensionTier);
  },
  attributeCosts(state) {
    const attributeTotalCost = [0, 0, 4, 10, 18, 33, 51, 72, 104, 140, 180, 235, 307];
    let attributesSpending = 0;
    Object.keys(state.attributes).forEach((key) => {
      attributesSpending += attributeTotalCost[state.attributes[key]];
    });
    return attributesSpending;
  },
  skillCosts(state) {
    const skillTotalCost = [0, 1, 3, 6, 10, 20, 32, 46, 60];
    let skillSpending = 0;
    Object.keys(state.skills).forEach((key) => {
      skillSpending += skillTotalCost[state.skills[key]];
    });
    return skillSpending;
  },
  talentCosts(state) {
    let spending = 0;
    state.talents.forEach((talent) => { spending += talent.cost; });
    return spending;
  },
  ascensionCosts(state) {
    let spending = 0;
    state.ascensionPackages.forEach((ascensionPackage) => {
      spending += ascensionPackage.cost;
    });
    return spending;
  },
  psychicPowerCosts(state) {
    let spending = 0;
    state.psychicPowers.forEach((psychicPower) => {
      spending += psychicPower.cost;
    });
    return spending;
  },
};

export const mutations = {
  resetState (state) {
    // Merge rather than replace so we don't lose observers
    // https://github.com/vuejs/vuex/issues/1118
    Object.assign(state, getDefaultState());
  },
  setState (state, newState) {
    Object.assign(state, newState);
  },
  setSetting(state, payload) {
    state.setting = payload.setting;
    state.settingSelected = true;
  },
  addPower(state, payload) {
    const hasPower = state.psychicPowers.find(t => t.name === payload.name) !== undefined;
    if (!hasPower) {
      state.psychicPowers.push({ name: payload.name, cost: payload.cost, source: payload.source || undefined });
    }
  },
  /**
   * @param payload { source:String }
   */
  clearPowersBySource(state, payload) {
    if ( state.psychicPowers.length > 0 ) {
      console.log(`found ${state.psychicPowers.length} psychic powers, clearing with source ${payload.source}...`);
      state.psychicPowers = state.psychicPowers.filter( k => k.source.indexOf(payload.source) < 0 );
      console.log(`${state.psychicPowers.length} psychic powers remaining`);
    }
  },
  setBackground(state, payload) {
    state.background = payload.name;
  },
  setBackgroundModifications(state, payload) {
    console.info(payload);
    state.enhancements = state.enhancements.filter((e) => e.source !== payload.source);

    payload.modifications.forEach((item) => {
      state.enhancements.push(item);
    });
    console.info(state.enhancements);
  },
  clearEnhancementsBySource(state, payload) {

    state.enhancements = state.enhancements.filter((e) => e.source.indexOf(payload.source) < 0 );
  }
};

const baseApiUrl = 'http://localhost:3000';

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    //commit('user/setUuid', 'ecd016aa-afac-44e8-8448-ddd09197dbb8');
    //commit('user/setUuid', undefined);
  },
  populateState(context, payload) {
    const state = {
      ...context.state,
      ...payload.data,
      };
    context.commit('setState', payload.data);
    console.info(state)
  },
  saveCurrentCharacterToDatabase({ context, state, getters }) {

    const body = {
      state: state,
      version: 'v1.0.0'
    };

    // if current state has no id => create a new character entry and return the ID
    let characterId = getters['id'];
    if ( characterId <= 0 ) {
      axios.post(`${baseApiUrl}/api/characters`, body)
      .then((response) => {
        console.log(response);
        characterId = response.data.id;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
    }
    axios.put(`${baseApiUrl}/api/characters/${characterId}`, body)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {});
  },
  /**
   * Character is loaded by a given uuid identifiying the character
   * @param context
   * @param payload
   */
  loadCharacterFromDatabase(context, characterId) {
    console.log(characterId);
    axios.get(`${baseApiUrl}/api/characters/${characterId}`)
    .then( (response) => {
      console.log(response);
    })
    .catch( (error) => {
      console.log(error);
    })
    .finally( () => {
    });
  },
};
