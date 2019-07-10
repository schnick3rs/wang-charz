const getDefaultState = () => ({
  setting: undefined,
  settingSelected: true,
  settingTier: 3,
  settingHomebrewContent: [],
  species: { value: undefined, cost: 0 },
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

export const state = getDefaultState();

export const getters = {
  setting(state) { return state.setting; },
  settingSelected(state) { return state.settingSelected; },
  settingTier(state) { return state.settingTier; },
  settingHomebrewContent(state) { return state.settingHomebrewContent; },
  species(state) { return state.species.value; },
  archetype(state) { return state.archetype.value; },
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
  attributes(state) { return state.attributes; },
  attributesEnhanced(state) {
    const enhanced = Object.assign({}, state.attributes);
    const attributeEnhancements = state.enhancements.filter(e => e.targetGroup === 'attributes');
    attributeEnhancements.forEach((m) => {
      console.info(`Enhance ${m.targetValue} by ${m.modifier} due to ${m.source}/${m.hint}.`);
      enhanced[m.targetValue] += m.modifier;
    });
    return enhanced;
  },
  skills(state) { return state.skills; },
  traits(state, getters) {
    let traits = {};
    traits['defence'] = state.attributes.initiative-1;
    traits['resilience'] = state.attributes.toughness+1;
    traits['soak'] = state.attributes.toughness;
    traits['wounds'] = state.attributes.toughness+state.settingTier;
    traits['shock'] = state.attributes.willpower+state.settingTier;
    traits['resolve'] = state.attributes.willpower-1;
    traits['conviction'] = state.attributes.willpower;
    traits['passiveAwareness'] = Math.round((state.attributes.intellect+state.skills.awareness)/2);

    traits['influence'] = state.attributes.fellowship-1;
    if ( getters.species && getters.species === 'Ork' ) {
      traits['influence'] = state.attributes.strength-1;
    }
    if ( getters.archetype && getters.archetype === 'Tech-Priest' ) {
      traits['influence'] = state.attributes.intellect-1;
    }

    traits['wealth'] = state.settingTier;
    traits['speed'] = 6;
    traits['corruption'] = 0;
    return traits;
  },
  traitsEnhanced(state, getters) {
    const enhanced = Object.assign({}, getters.traits);
    const traitEnhancements = state.enhancements.filter(e => e.targetGroup === 'traits');
    traitEnhancements.forEach((m) => {
      console.info(`Enhance ${m.targetValue} by ${m.modifier} due to ${m.source}.`);
      enhanced[m.targetValue] += m.modifier;
    });
    return enhanced;
  },
  talents(state) {
    return state.talents.map(t => t.name);
  },
  remainingBuildPoints(state, getters) {
    let remaining = 0;
    remaining = state.settingTier * 100;
    return (state.settingTier * 100) - getters.spendBuildingPoints;
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
  talentCost(state) {
    let spending = 0;
    state.talents.forEach((talent) => { spending += talent.cost; });
    return spending;
  },
  ascensionCost(state) {
    let spending = 0;
    state.ascensionPackages.forEach((ascensionPackage) => {
      spending += ascensionPackage.cost;
    });
    return spending;
  },
  psychicPowerCost(state) {
    let spending = 0;
    state.psychicPowers.forEach((psychicPower) => {
      spending += psychicPower.cost;
    });
    return spending;
  },
  spendBuildingPoints(state, getters) {
    let spend = 0;

    spend += state.species ? state.species.cost : 0;
    spend += state.archetype ? state.archetype.cost : 0;
    spend += getters.attributeCosts;
    spend += getters.skillCosts;
    spend += getters.talentCost;
    spend += getters.ascensionCost;
    spend += getters.psychicPowerCost;

    return spend;
  },
};

export const mutations = {
  resetState (state) {
    // Merge rather than replace so we don't lose observers
    // https://github.com/vuejs/vuex/issues/1118
    Object.assign(state, getDefaultState())
  },
  setSetting(state, payload) {
    state.setting = payload.setting;
    state.settingSelected = true;
  },
  setSettingTier(state, payload) {
    state.settingTier = payload.amount;
  },
  addHomebrewContent(state, payload){
    state.settingHomebrewContent.push(payload.key);
  },
  removeHomebrewContent(state, payload){
    state.settingHomebrewContent = state.settingHomebrewContent.filter(c => c !== payload.key);
  },
  setSpecies(state, payload) {
    state.species = payload;
  },
  setSpeciesModifications(state, payload) {
    state.enhancements = state.enhancements.filter(e => e.source !== 'species');

    payload.modifications.forEach((item) => {
      item.source = 'species';
      state.enhancements.push(item);
    });
  },
  setArchetype(state, payload) {
    state.archetype = payload;
  },
  setArchetypeModifications(state, payload) {
    state.enhancements = state.enhancements.filter(e => e.source !== 'archetype');

    payload.modifications.forEach((item) => {
      item.source = 'archetype';
      state.enhancements.push(item);
    });
  },
  setAttribute(state, payload) {
    state.attributes[payload.key] = payload.value;
  },
  setSkill(state, payload) {
    state.skills[payload.key] = payload.value;
  },
  addTalent(state, payload) {
    const hasTalent = state.talents.find(t => t.name === payload.name) !== undefined;
    if (!hasTalent) {
      state.talents.push({ name: payload.name, cost: payload.cost });
    }
  },
  removeTalent(state, payload) {
    const hasTalent = state.talents.find(t => t.name === payload.name) !== undefined;
    if (hasTalent) {
      state.talents = state.talents.filter(t => t.name !== payload.name);
    }
  },
  addPower(state, payload) {
    const hasPower = state.psychicPowers.find(t => t.name === payload.name) !== undefined;
    if (!hasPower) {
      state.psychicPowers.push({ name: payload.name, cost: payload.cost });
    }
  },
  removePower(state, payload) {
    const hasPower = state.psychicPowers.find(t => t.name === payload.name) !== undefined;
    if (hasPower) {
      state.psychicPowers = state.psychicPowers.filter(t => t.name !== payload.name);
    }
  },
  addAscension(state, payload) {
    state.ascensionPackages.push({
      value: payload.value,
      cost: payload.cost,
      sourceTier: payload.sourceTier,
      targetTier: payload.targetTier,
    });
  },
  removeAscension(state, payload) {
    // remove the package from the ascension stacks
    state.ascensionPackages = state.ascensionPackages.filter(a => (a.value !== payload.value));

    // remove all enhancements that are related to the package
    state.enhancements = state.enhancements.filter(e => e.source !== `ascension/${payload.value}`);

    // ToDo: remove all wargear that is related to the package
  },
  addWargear(state, payload) {

    const length = 8;
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    state.wargear.push({ id: result, name: payload.name });
  },
  removeWargear(state, payload) {
    const hasWargear = state.wargear.find(t => t.id === payload.id) !== undefined;
    if (hasWargear) {
      state.wargear = state.wargear.filter(t => t.id !== payload.id);
    }
  },
  setBackground(state, payload) {
    state.background = payload.name;
  },
  setBackgroundModifications(state, payload) {
    state.enhancements = state.enhancements.filter(e => e.source !== 'background');

    payload.modifications.forEach((item) => {
      state.enhancements.push(item);
    });
  },
  clearEnhancementsBySource(state, payload) {
    state.enhancements = state.enhancements.filter(e => e.source !== payload.source);
  }
};
