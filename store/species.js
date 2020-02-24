
export const state = () => ({
  list: [],
  species: {},
});

export const getters = {
  speciesKeys: (state) => state.list,
  speciesSets: (state) => state.list.map((speciesKey) => state.species[speciesKey]),
  //speciesSets: (state) => state.list.map((speciesKey) => state.species[speciesKey]),
  getSpecies: (state) => (key) => state.species[key] ? state.species[key] : undefined,
};

export const mutations = {
  create(state, payload) {
    const { key } = payload;
    state.list.push(key);
    const newSpecies = {};
    Object.assign(newSpecies, getDefaultState());
    newSpecies.key = key;
    const newObj = {};
    newObj[key] = newSpecies;
    state.species = {
      ...state.species,
      ...newObj,
    };
  },
  update(state, payload) {
    const { key, species } = payload;
    state.species[key] = species;
  },
  delete(state, payload) {
    const { key } = payload;
    state.list.splice(state.list.indexOf(key), 1);
    delete state.species[key];
  },
};

const getDefaultState = () => ({
  key: '',
  name: '',
  hint: 'A custom species',
  group: 'Mankind',
  cost: 0,
  baseTier: 1,
  speed: 6,
  source: {
    book: 'Custom',
    key: 'custom',
  },
  speciesFeatures: [],
  attributeMaximums: [],
  traitMaximums: [],
  variant: undefined,
});
