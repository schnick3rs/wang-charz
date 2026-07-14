import { ActionContext } from 'vuex';

export interface UserState {
  // the user uuid should be a relativly long (UUID) uuid that identifies a single user.
  // it is the access token and must be noted down.
  uuid: string | undefined;
}

export const state = (): UserState => ({
  uuid: undefined,
});

export const getters = {
  getUuid(state: UserState) {
    return state.uuid;
  },
  isLoggedIn(state: UserState) {
    return state.uuid !== undefined && state.uuid.length > 0;
  },
};

export const mutations = {
  setUuid(state: UserState, uuid: string) {
    state.uuid = uuid;
  },
};

export const actions = {
  login(context: ActionContext<UserState, UserState>, hash: string) {
    if (context.getters.isLoggedIn) {
      console.warn('Already logged in.');
      return;
    }
    context.commit('setHash', hash);
  },
  logout(context: ActionContext<UserState, UserState>) {
    context.commit('setHash', undefined);
  },
};
