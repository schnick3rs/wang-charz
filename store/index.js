const getDefaultState = () => ({
  id: -1,
  setting: undefined,
  settingSelected: true,
  settingTier: 3,
  settingHomebrewContent: [],
  characterName: 'Simsel Simselman',
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

export const state = () => ({
  id: -1,
  setting: undefined,
  settingSelected: true,
  settingTier: 3,
  settingHomebrewContent: [],
  characterName: 'Simsel Simselman',
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

export const getters = {
  setting(state) { return state.setting; },
  settingSelected(state) { return state.settingSelected; },
  settingTier(state) { return state.settingTier; },
  settingHomebrewContent(state) { return state.settingHomebrewContent; },
  name(state) { return state.characterName; },
  species(state) { return state.species.value; },
  speciesAstartesChapter(state) { return state.speciesAstartesChapter; },
  archetype(state) { return state.archetype.value; },
  background(state) { return state.background; },
  keywords(state) { return state.keywords; },
  finalKeywords(state) { return state.keywords.map(k => k.replacement ? k.replacement : k.name); },
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
    if ( getters.species && getters.species === 'Eldar' ) {
      traits['speed'] = 8;
    }
    if ( getters.species && getters.species.endsWith('Astartes') ) {
      traits['speed'] = 7;
    }

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
  wargear(state) {
    return state.wargear.map(w => w.name);
  },
  talents(state) {
    return state.talents.map(t => t.name);
  },
  psychicPowers(state) {
    return state.psychicPowers.map(p => p.name);
  },
  psychicPowersObjects(state) {
    return state.psychicPowers;
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
  talentCosts(state) {
    let spending = 0;
    state.talents.forEach((talent) => { spending += talent.cost; });
    return spending;
  },
  ascensionCosts(state) {
    let spending = 0;
    state.ascensionPackages.forEach((ascensionPackage) => {
      spending += ascensionPackage.cost;
    });
    return spending;
  },
  psychicPowerCosts(state) {
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
    spend += getters.talentCosts;
    spend += getters.ascensionCosts;
    spend += getters.psychicPowerCosts;

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
  setName(state, name) {
    state.characterName = name;
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
  setSpeciesAstartesChapter(state, payload) {
    state.speciesAstartesChapter = payload.name;
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
  /**
   * @param payload { source:String }
   */
  clearKeywordsBySource(state, payload) {
    if ( state.keywords.length > 0 ) {
      console.log(`found ${state.keywords.length} keywods, clearing with source ${payload.source}...`);
      state.keywords = state.keywords.filter( k => k.source !== payload.source );
      console.log(`${state.keywords.length} keywords remaining`);
    }
  },
  /**
   * @param payload { name:String, source:String, type:String, replacement:undefined/String }
   */
  addKeyword(state, payload) {
    console.log(`Adding keyword ${payload.name} of type ${payload.type}.`);
    state.keywords.push(payload);
  },
  /**
   * keyword { name:String, source:String, type:String, replacement:undefined/String }
   * @param payload { placeholder:String, replacement:String, source:String}
   */
  replaceKeyword(state, payload) {
    if ( state.keywords.length > 0) {
      let placeholderKeyword = state.keywords.find(k => {
        return (k.source === payload.source && k.name === payload.placeholder);
      });
      if ( placeholderKeyword ) {
        placeholderKeyword.replacement = payload.replacement;
        state.keywords = state.keywords
          .filter( k => !(k.source === payload.source && k.name === payload.placeholder) )
        state.keywords.push(placeholderKeyword);
      };
    }
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
      state.psychicPowers.push({ name: payload.name, cost: payload.cost, source: payload.source || undefined });
    }
  },
  removePower(state, payload) {
    const hasPower = state.psychicPowers.find(t => t.name === payload.name) !== undefined;
    if (hasPower) {
      state.psychicPowers = state.psychicPowers.filter(t => t.name !== payload.name);
    }
  },
  /**
   * @param payload { source:String }
   */
  clearPowersBySource(state, payload) {
    if ( state.psychicPowers.length > 0 ) {
      console.log(`found ${state.psychicPowers.length} psychic powers, clearing with source ${payload.source}...`);
      state.psychicPowers = state.psychicPowers.filter( k => k.source.indexOf(payload.source) < 0 );
      console.log(`${state.psychicPowers.length} psychic powers remaining`);
    }
  },
  addAscension(state, payload) {
    state.ascensionPackages.push({
      key: payload.key,
      value: payload.value,
      cost: payload.cost,
      storyElementChoice: undefined,
      sourceTier: payload.sourceTier,
      targetTier: payload.targetTier,
    });
  },
  removeAscension(state, payload) {
    // remove the package from the ascension stacks
    state.ascensionPackages = state.ascensionPackages.filter(a => (a.value !== payload.value));

    // remove all enhancements that are related to the package
    state.enhancements = state.enhancements.filter(e => !e.source.startsWith(`ascension.${payload.key}`));

    state.keywords = state.keywords.filter( k => k.source !== `ascension.${payload.key}`);

    // ToDo: remove all wargear that is related to the package
  },
  setAscensionPackageStoryElement(state, payload){
    console.info(payload);
    // find package by payload.ascensionPackageKey and payload.ascensionPackage
    const index = state.ascensionPackages.findIndex(a => (
      a.key === payload.ascensionPackageKey &&
      a.targetTier === payload.ascensionPackageTargetTier
    ));
    if (index >= 0) {
      state.ascensionPackages[index].storyElementChoice = payload.ascensionPackageStoryElementKey;
    }
  },
  setAscensionPackageWargearOption(state, payload){
    console.info(`Set Ascension WargearOption to ${payload.ascensionPackageWargearOptionKey}`);
    // find package by payload.ascensionPackageKey and payload.ascensionPackage
    const index = state.ascensionPackages.findIndex(a => (
      a.key === payload.ascensionPackageKey &&
      a.targetTier === payload.ascensionPackageTargetTier
    ));
    if (index >= 0) {
      state.ascensionPackages[index].wargearChoice = payload.ascensionPackageWargearOptionKey;
    }
  },
  setAscensionModifications(state, payload) {
    console.info(payload);
    // remove previous choice
    state.enhancements = state.enhancements.filter(e => e.source !== payload.source);
    state.enhancements.push(payload);
  },
  addWargear(state, payload) {

    const length = 8;
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    console.info(`Adding '${payload.name}' by '${payload.source}'`)
    state.wargear.push({ id: result, name: payload.name, source: payload.source });
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
