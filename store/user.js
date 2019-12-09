// store/user.js
export const state = () => ({
  // the user uuid should be a relativly long (UUID) uuid that identifies a single user.
  // it is the access token and must be noted down.
  uuid: undefined,
});

export const getters = {
  getUuid(state) {
    return state.uuid;
  },
  isLoggedIn(state) {
    return state.uuid !== undefined && state.uuid.length > 0;
  },
};

export const mutations = {
  setUuid(state, uuid) {
    state.uuid = uuid;
  },
};

export const actions = {
  login(context, hash) {
    if (context.getters.isLoggedIn) {
      console.warn('Already logged in.');
      return;
    }
    context.commit('setHash', hash);
  },
  logout(context) {
    context.commit('setHash', undefined);
  },
};
