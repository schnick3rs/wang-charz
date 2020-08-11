import axios from 'axios';

export const state = () => ({
  version: 1,
  builderVersion: 10,
});

export const getters = {
  version: (state) => state.version || 0,
  builderVersion: (state) => 10,
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
};

const baseApiUrl = 'http://localhost:3000';

export const actions = {
  populateState(context, payload) {
    const state = {
      ...context.state,
      ...payload.data,
    };
    context.commit('setState', payload.data);
    console.info(state);
  },
  saveCharacterToDb({ context, state }, payload){
    const { id, charState } = payload;
    const version = charState.version;
    axios.post(`${baseApiUrl}/api/characters/`, { id, version, state: charState})
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {});
  },

  /**
   * @param context
   * @param state
   * @param payload { id, patch, column: 'species' }
   */
  patchCharacterInDb({ context, state }, payload){
    const { id, patch, column } = payload;
    axios.patch(`${baseApiUrl}/api/characters/${id}/${column}/`, { patch, column })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {});
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
