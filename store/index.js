import axios from 'axios';

export const state = () => ({
  version: 1,
  builderVersion: 11,
  theme: 'light',
});

export const getters = {
  version: (state) => state.version || 0,
  builderVersion: (state) => 11,
  theme: (state) => state.theme,
  /*
  isAuthenticated(state) {
    return state.auth.loggedIn
  },
  loggedInUser(state) {
    return state.auth.user
  },
  */
};

export const mutations = {
  resetState(state) {
    // Merge rather than replace so we don't lose observers
    // https://github.com/vuejs/vuex/issues/1118
    Object.assign(state, getDefaultState());
  },
  setState(state, newState) {
    Object.assign(state, newState);
  },
  setSetting(state, payload) {
    state.setting = payload.setting;
    state.settingSelected = true;
  },
  setTheme(state, theme) {
    state.theme = theme;
  }
};

const baseApiUrl = 'http://localhost:3000';

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    // commit('user/setUuid', 'ecd016aa-afac-44e8-8448-ddd09197dbb8');
    // commit('user/setUuid', undefined);
  },
  populateState(context, payload) {
    const state = {
      ...context.state,
      ...payload.data,
    };
    context.commit('setState', payload.data);
    console.info(state);
  },
  saveCurrentCharacterToDatabase({ context, state, getters }) {
    const body = {
      state,
      version: 'v1.0.0',
    };

    // if current state has no id => create a new character entry and return the ID
    let characterId = getters.id;
    if (characterId <= 0) {
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
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
      });
  },
};
