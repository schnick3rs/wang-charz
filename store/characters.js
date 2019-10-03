export const state = () => ({
  list: []
});

export const getters = {
};

export const mutations = {
  add(state, character) {
    state.list.push(character.id);
  },
  remove(state, character) {
    state.list.slice(state.list.indexOf(character.id), 1)
  }
};
