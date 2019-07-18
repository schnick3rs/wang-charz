// store/user.js
const uuidv4 = require('uuid/v4');

export const state = () => ({
  // the user hash should be a relativly long (UUID) hash that identifies a single user.
  // it is the access token and must be noted down.
  hash: undefined,
});

export const getters = {
  getHash( state ) {
    return state.hash;
  },
  isLoggedIn( state ) {
    return state.hash !== undefined;
  },
};

export const mutations = {
  generateNewHash( state, payload ) {
    const forceRenew = payload.force || false;
    if ( !state.hash || forceRenew ) {
      state.hash = uuidv4();
    }
  },
  setHash( state, payload ) {
    state.hash = payload.hash;
  },
};

export const actions = {

};
