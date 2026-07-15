export interface Species {
  key: string;
  name: string;
  hint: string;
  group: string;
  cost: number;
  costs: { total: number; stats: number; species: number; other: number };
  baseTier: number;
  speed: number;
  source: { book: string; key: string };
  speciesFeatures: unknown[];
  attributeMaximums: unknown[];
  traitMaximums: unknown[];
  prerequisites: unknown[];
  variant: unknown;
}

export interface SpeciesState {
  list: string[];
  species: Record<string, Species>;
}

export const state = (): SpeciesState => ({
  list: [],
  species: {},
});

export const getters = {
  speciesKeys: (state: SpeciesState) => state.list,
  speciesSets: (state: SpeciesState) => state.list.map((speciesKey) => state.species[speciesKey]),
  getSpecies: (state: SpeciesState) => (key: string) => state.species[key] ? state.species[key] : undefined,
};

export const mutations = {
  create(state: SpeciesState, payload: { key: string }) {
    const { key } = payload;
    state.list.push(key);
    const newSpecies: Species = { ...getDefaultState(), key };
    state.species = {
      ...state.species,
      [key]: newSpecies,
    };
  },
  update(state: SpeciesState, payload: { key: string; species: Species }) {
    const { key, species } = payload;
    species.cost = parseInt(species.cost as unknown as string);
    species.speed = parseInt(species.speed as unknown as string);
    species.baseTier = parseInt(species.baseTier as unknown as string);
    state.species[key] = species;
  },
  delete(state: SpeciesState, payload: { key: string }) {
    const { key } = payload;
    state.list.splice(state.list.indexOf(key), 1);
    delete state.species[key];
  },
};

const getDefaultState = (): Species => ({
  key: '',
  name: '',
  hint: 'A custom species',
  group: 'Mankind',
  cost: 0,
  costs: { total: 0, stats: 0, species: 0, other: 0 },
  baseTier: 1,
  speed: 6,
  source: {
    book: 'Custom',
    key: 'custom',
  },
  speciesFeatures: [],
  attributeMaximums: [],
  traitMaximums: [],
  prerequisites: [],
  variant: undefined,
});
