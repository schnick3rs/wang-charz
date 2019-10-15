export const state = () => ({
  list: [],
  characters: {},
  // 123: { name: simsel, species. 123 }
  // species: { 123: { name: human, ... } }
});

export const getters = {
  characterIds: (state) => state.list,
  characterSets: (state) => state.list.map( charId => state.characters[charId] ),

  // Character setting
  characterSettingTierById: (state) => (id) => {
    return state.characters[id] ? state.characters[id].settingTier : 1;
  },

  // Character data
  characterNameById: (state) => (id) => {
    return state.characters[id] ? state.characters[id].name : 'unknown';
  },
  characterSpeciesLabelById: (state) => (id) => {
    return state.characters[id] ? state.characters[id].species.value : 'unknown';
  },
  characterArchetypeLabelById: (state) => (id) => {
    return state.characters[id] ? state.characters[id].archetype.value : 'unknown';
  },
  characterAttributesById: (state) => (id) => {
    return state.characters[id] ? state.characters[id].attributes : {};
  },
  characterAttributesEnhancedById: (state) => (id) => {
    if ( state.characters[id] === undefined ) {
      return {};
    }
    const enhanced = Object.assign({}, state.characters[id].attributes);
    const attributeEnhancements = state.characters[id].enhancements.filter(e => e.targetGroup === 'attributes');
    attributeEnhancements.forEach((m) => {
      console.info(`Enhance ${m.targetValue} by ${m.modifier} due to ${m.source}/${m.hint}.`);
      enhanced[m.targetValue] += m.modifier;
    });
    return enhanced;
  },
  characterSkillsById: (state) => (id) => {
    return state.characters[id] ? state.characters[id].skills : {};
  },
  characterTraitsById: (state) => (id) => {
    let character = state.characters[id];
    if ( character === undefined ) {
      return {};
    }

    let traits = {};
    traits['defence'] = character.attributes.initiative-1;
    traits['resilience'] = character.attributes.toughness+1;
    traits['soak'] = character.attributes.toughness;
    traits['wounds'] = character.attributes.toughness+character.settingTier;
    traits['shock'] = character.attributes.willpower+character.settingTier;
    traits['resolve'] = character.attributes.willpower-1;
    traits['conviction'] = character.attributes.willpower;
    traits['passiveAwareness'] = Math.round((character.attributes.intellect+character.skills.awareness)/2);

    traits['influence'] = character.attributes.fellowship-1;
    if ( character.species.value && character.species.value === 'Ork' ) {
      traits['influence'] = character.attributes.strength-1;
    }
    if ( character.archetype.value && character.archetype.value === 'Tech-Priest' ) {
      traits['influence'] = character.attributes.intellect-1;
    }

    traits['wealth'] = character.settingTier;
    traits['speed'] = 6;
    if ( character.species.value && character.species.value === 'Eldars' ) {
      traits['speed'] = 8;
    }
    if ( character.species.value && character.species.value.endsWith('Astartes') ) {
      traits['speed'] = 7;
    }

    traits['corruption'] = 0;
    return traits;
  },
  characterTraitsEnhancedById: (state, getters) => (id) => {
    let character = state.characters[id];
    if ( character === undefined ) {
      return {};
    }

    const enhanced = Object.assign({}, getters.characterTraitsById(id));
    const traitEnhancements = character.enhancements.filter(e => e.targetGroup === 'traits');
    traitEnhancements.forEach((m) => {
      console.info(`Enhance ${m.targetValue} by ${m.modifier} due to ${m.source}.`);
      enhanced[m.targetValue] += m.modifier;
    });
    return enhanced;
  },
};

export const mutations = {
  setCharacterName(state, payload){
    state.characters[payload.id].name = payload.name;
  },
  setCharacterSpecies(state, payload){
    state.characters[payload.id].species = payload.species;
  },
  setCharacterArchetype(state, payload){
    state.characters[payload.id].archetype = payload.archetype;
  },
  setCharacterSkill(state, payload){
    state.characters[payload.id].skills[payload.payload.key] = payload.payload.value;
  },
  setCharacterAttribute(state, payload){
    const char = state.characters[payload.id];
    const attribute = char.attributes[payload.payload.key];
    let theAttribute = state.characters[payload.id].attributes[payload.payload.key];
    theAttribute = payload.payload.value;
    state.characters[payload.id].attributes[payload.payload.key] = payload.payload.value;
  },
  setCharacterModifications(state, payload) {
    const character = state.characters[payload.id];
    const modifications = payload.content.modifications;
    const source = payload.content.source || undefined;

    // we remove all enhancements that share the cleanup value.
    if ( source !== undefined ) {
      character.enhancements = character.enhancements.filter(e => e.source !== source);
    }

    modifications.forEach((item) => {
      item.source = source;
      character.enhancements.push(item);
    });
  },
  setCharacterSpeciesModifications(state, payload) {
    const character = state.characters[payload.id];
    character.enhancements = character.enhancements.filter(e => e.source !== 'species');
    payload.content.modifications.forEach((item) => {
      item.source = 'species';
      character.enhancements.push(item);
    });
  },

  // character handling
  create(state, id){
    state.list.push(id);
    let newChar = {};
    Object.assign(newChar, getDefaultState());
    newChar.id = id;
    state.characters[id] = newChar;
  },
  add(state, character) {
    state.list.push(character.id);
  },
  remove(state, characterId) {
    state.list.splice(state.list.indexOf(characterId), 1);
    delete state.characters[characterId];
  }
};

const getDefaultState = () => ({
  id: -1,
  setting: undefined,
  settingSelected: true,
  settingTier: 3,
  settingHomebrewContent: [],
  name: 'Simsel Simselman',
  species: { value: undefined, cost: 0 },
  speciesAstartesChapter: undefined,
  archetype: { value: undefined, cost: 0 },
  attributes: {
    strength: 1,
    agility: 1,
    toughness: 1,
    intellect: 1,
    willpower: 1,
    fellowship: 1,
    initiative: 1,
  },
  skills: {
    athletics: 0,
    awareness: 0,
    ballisticSkill: 0,
    cunning: 0,
    deception: 0,
    insight: 0,
    intimidation: 0,
    investigation: 0,
    leadership: 0,
    medicae: 0,
    persuasion: 0,
    pilot: 0,
    psychicMastery: 0,
    scholar: 0,
    stealth: 0,
    survival: 0,
    tech: 0,
    weaponSkill: 0,
  },
  keywords: [],
  talents: [],
  psychicPowers: [],
  ascensionPackages: [],
  wargear: [],
  background: undefined,
  enhancements: [],
});
