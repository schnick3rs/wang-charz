export const state = () => ({
  list: [],
  characters: {},
  //version: 1,
});

export const getters = {
  characterIds: (state) => state.list,
  characterSets: (state) => state.list.map( charId => state.characters[charId] ),

  /*
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
  */

  // Character setting
  characterSettingTierById: (state) => (id) => {
    return state.characters[id] ? state.characters[id].settingTier : 1;
  },
  characterSettingTitleById: (state) => (id) => {
    return state.characters[id] ? state.characters[id].settingTitle : getDefaultState().settingTitle;
  },
  characterCampaignCustomXpById: (state) => (id) => {
    return state.characters[id] && state.characters[id].customXp ? parseInt(state.characters[id].customXp) : 0;
  },
  characterCampaignCustomRankById: (state) => (id) => {
    return state.characters[id] && state.characters[id].customRank ? parseInt(state.characters[id].customRank) : 1;
  },

  // Cost & Spending
  characterSpeciesCostsById: (state) => (id) => {
    return state.characters[id] ? state.characters[id].species.cost : 0;
  },
  characterArchetypeCostsById: (state) => (id) => {
    return state.characters[id] ? state.characters[id].archetype.cost : 0;
  },
  characterAttributeCostsById: (state) => (id) => {
    let character = state.characters[id];
    if ( character === undefined ) {
      return 0;
    }
    const attributeTotalCost = [0, 0, 4, 10, 18, 33, 51, 72, 104, 140, 180, 235, 307];
    let attributesSpending = 0;
    Object.keys(character.attributes).forEach((key) => {
      attributesSpending += attributeTotalCost[character.attributes[key]];
    });
    return attributesSpending;
  },
  characterSkillCostsById: (state) => (id) => {
    const character = state.characters[id];
    if ( character === undefined ) {
      return 0;
    }
    const skillTotalCost = [0, 1, 3, 6, 10, 20, 32, 46, 60];
    let skillSpending = 0;
    Object.keys(character.skills).forEach((key) => {
      skillSpending += skillTotalCost[character.skills[key]];
    });
    return skillSpending;
  },
  characterTalentCostsById: (state) => (id) => {
    const character = state.characters[id];
    if ( character === undefined ) {
      return 0;
    }
    let spending = 0;
    character.talents.forEach((talent) => { spending += talent.cost; });
    return spending;
  },
  characterAscensionCostsById: (state) => (id) => {
    const character = state.characters[id];
    if ( character === undefined ) {
      return 0;
    }
    let spending = 0;
    character.ascensionPackages.forEach((ascensionPackage) => {
      spending += ascensionPackage.cost;
    });
    return spending;
  },
  characterPsychicPowerCostsById: (state) => (id) => {
    const character = state.characters[id];
    if ( character === undefined ) {
      return 0;
    }
    let spending = 0;
    character.psychicPowers.forEach((psychicPower) => {
      spending += psychicPower.cost;
    });
    return spending;
  },
  // => total
  characterSpendBuildPointsById: (state, getters) => (id) => {
      let spend = 0;

      spend += getters.characterSpeciesCostsById(id);
      spend += getters.characterArchetypeCostsById(id);
      spend += getters.characterAttributeCostsById(id);
      spend += getters.characterSkillCostsById(id);
      spend += getters.characterTalentCostsById(id);
      spend += getters.characterAscensionCostsById(id);
      spend += getters.characterPsychicPowerCostsById(id);

      return spend;
  },
  characterTotalBuildPointsById: (state, getters) => (id) => {
      let total = 0;
      total += getters.characterSettingTierById(id) * 100;
      total += getters.characterCampaignCustomXpById(id);
      return total;
  },
  characterRemainingBuildPointsById: (state, getters) => (id) => {
    return getters.characterTotalBuildPointsById(id) - getters.characterSpendBuildPointsById(id);
  },

  // Character data
  characterNameById: (state) => (id) => {
    return state.characters[id] ? state.characters[id].name : getDefaultState().name;
  },
  characterSpeciesLabelById: (state) => (id) => {
    return state.characters[id] ? state.characters[id].species.value : getDefaultState().species.value;
  },
  characterSpeciesAstartesChapterById: (state) => (id) => {
    return state.characters[id] ? state.characters[id].speciesAstartesChapter : getDefaultState().speciesAstartesChapter;
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

  // Talents
  characterTalentsById: (state) => (id) => {
    return state.characters[id] ? state.characters[id].talents : [];
  },

  // Wargear
  characterWargearById: (state) => (id) => {
    return state.characters[id] ? state.characters[id].wargear : [];
  },

  // Powers
  characterPsychicPowersById: (state) => (id) => {
    return state.characters[id] ? state.characters[id].psychicPowers : [];
  },

  // Ascensions
  characterAscensionPackagesById: (state) => (id) => {
    return state.characters[id] ? state.characters[id].ascensionPackages : [];
  },

  // Keywords
  characterKeywordsRawById: (state) => (id) => {
    return state.characters[id] ? state.characters[id].keywords : [];
  },
  characterKeywordsFinalById: (state) => (id) => {
    const keywords = state.characters[id] ? state.characters[id].keywords : [];
    return keywords.map(k => k.replacement ? k.replacement : k.name);
  },

  characterBackgroundLabelById: (state) => (id) => {
    return state.characters[id] ? state.characters[id].background : getDefaultState().background;
  },
};

export const mutations = {
  setCharacterName(state, payload){
    state.characters[payload.id].name = payload.name;
  },
  setSettingTier(state, payload){
    state.characters[payload.id].settingTier = payload.tier;
  },
  setSettingTitle(state, payload){
    state.characters[payload.id].settingTitle = payload.title;
  },
  setCustomXp(state, payload){
    state.characters[payload.id].customXp = payload.xp;
  },
  setCustomRank(state, payload){
    console.info(`Set Rank manually to ${payload.rank}.`);
    state.characters[payload.id].customRank = payload.rank;
  },
  setCharacterSpecies(state, payload){
    state.characters[payload.id].species = payload.species;
  },
  setCharacterSpeciesAstartesChapter(state, payload){
    console.info(`Set Species Astartes Chapter to ${payload.speciesAstartesChapter}.`);
    state.characters[payload.id].speciesAstartesChapter = payload.speciesAstartesChapter;
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
    console.info(payload);

    console.info(`Enhance/Modify: Adding ${modifications.targetValue} by '${source}'`);

    // we remove all enhancements that share the cleanup value.
    if ( source !== undefined ) {
      character.enhancements = character.enhancements.filter(e => e.source !== source);
    }

    modifications.forEach((item) => {
      item.source = source;
      character.enhancements.push(item);
    });
  },
  clearCharacterEnhancementsBySource(state, payload) {
    const character = state.characters[payload.id];

    character.enhancements = character.enhancements.filter(e => e.source !== undefined && e.source.indexOf(payload.source) < 0 );
  },
  setCharacterSpeciesModifications(state, payload) {
    const character = state.characters[payload.id];

    character.enhancements = character.enhancements.filter(e => e.source !== 'species');
    payload.content.modifications.forEach((item) => {
      item.source = 'species';
      character.enhancements.push(item);
    });
  },

  // Talents
  addCharacterTalent(state, payload) {
    const character = state.characters[payload.id];
    const hasTalent = character.talents.find(t => t.name === payload.name) !== undefined;
    if (!hasTalent) {
      character.talents.push({ name: payload.name, cost: payload.cost });
    }
  },
  removeCharacterTalent(state, payload) {
    const character = state.characters[payload.id];
    const hasTalent = character.talents.find(t => t.name === payload.name) !== undefined;
    if (hasTalent) {
      character.talents = character.talents.filter(t => t.name !== payload.name);
    }
  },

  // Wargear
  addCharacterWargear(state, payload) {
    const character = state.characters[payload.id];
    const wargearUniqueId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
    console.info(`Adding '${payload.name}' by '${payload.source}' [${wargearUniqueId}]`);
    character.wargear.push({ id: wargearUniqueId, name: payload.name, source: payload.source });
  },
  removeCharacterWargear(state, payload) {
    const character = state.characters[payload.id];
    const gearId = payload.gearId;
    const hasWargear = character.wargear.find(t => t.id === gearId) !== undefined;
    if (hasWargear) {
      character.wargear = character.wargear.filter(t => t.id !== gearId);
    }
  },

  // Psychic Powers
  addCharacterPsychicPower(state, payload) {
    const character = state.characters[payload.id];
    const hasPower = character.psychicPowers.find(t => t.name === payload.name) !== undefined;
    if (!hasPower) {
      console.info(`Adding '${payload.name}' by '${payload.source}'`);
      character.psychicPowers.push({ name: payload.name, cost: payload.cost, source: payload.source || undefined });
    }
  },
  removeCharacterPsychicPower(state, payload) {
    const character = state.characters[payload.id];
    const hasPower = character.psychicPowers.find(t => t.name === payload.name) !== undefined;
    if (hasPower) {
      console.info(`Removing '${payload.name}' by '${payload.source}'`);
      character.psychicPowers = character.psychicPowers.filter(t => t.name !== payload.name);
    }
  },

  // Ascension & Ascension Packages
  addCharacterAscensionPackage(state, payload) {
    const character = state.characters[payload.id];
    character.ascensionPackages.push({
      key: payload.key,
      value: payload.value,
      cost: payload.cost,
      storyElementChoice: undefined,
      sourceTier: payload.sourceTier,
      targetTier: payload.targetTier,
    });
  },
  setCharacterAscensionPackageStoryElement(state, payload){
    const character = state.characters[payload.id];
    console.info(`Set Ascension Story Element to ${payload.ascensionPackageStoryElementKey}`);
    // find package by payload.ascensionPackageKey and payload.ascensionPackage
    const index = character.ascensionPackages.findIndex(a => (
      a.key === payload.ascensionPackageKey &&
      a.targetTier === payload.ascensionPackageTargetTier
    ));
    if (index >= 0) {
      character.ascensionPackages[index].storyElementChoice = payload.ascensionPackageStoryElementKey;
    }
  },
  setCharacterAscensionPackageWargearOption(state, payload){
    const character = state.characters[payload.id];
    console.info(`Set Ascension WargearOption to ${payload.ascensionPackageWargearOptionKey}`);
    // find package by payload.ascensionPackageKey and payload.ascensionPackage
    const index = character.ascensionPackages.findIndex(a => (
      a.key === payload.ascensionPackageKey &&
      a.targetTier === payload.ascensionPackageTargetTier
    ));
    if (index >= 0) {
      character.ascensionPackages[index].wargearChoice = payload.ascensionPackageWargearOptionKey;
    }
  },
  removeCharacterAscensionPackage(state, payload) {
    const character = state.characters[payload.id];
    // remove the package from the ascension stacks
    character.ascensionPackages = character.ascensionPackages.filter(a => (a.value !== payload.value));

    // remove all enhancements that are related to the package
    character.enhancements = character.enhancements.filter(e => e.source === undefined || !e.source.startsWith(`ascension.${payload.key}`));

    character.keywords = character.keywords.filter( k => k.source !== `ascension.${payload.key}`);

    // ToDo: remove all wargear that is related to the package
  },

  // Background
  setCharacterBackground(state, payload) {
    const character = state.characters[payload.id];
    console.info(`Background: ${payload.backgroundName} selected.`);
    character.background = payload.backgroundName;
  },

  // Keywords
  addCharacterKeyword(state, payload) {
    const character = state.characters[payload.id];
    const keyword = payload.keyword;
    console.log(`Adding keyword ${keyword.name} of type ${keyword.type}.`);
    character.keywords.push(keyword);
  },
  clearCharacterKeywordsBySource: function (state, payload) {
    const character = state.characters[payload.id];
    const source = payload.source;
    if (character.keywords.length > 0) {
      console.log(`found ${character.keywords.length} keywords, clearing with source ${source}...`);
      character.keywords = character.keywords.filter(k => k.source !== source);
      console.log(`${character.keywords.length} keywords remaining`);
    }
  },
  /**
   * keyword { name:String, source:String, type:String, replacement:undefined/String }
   * @param payload { placeholder:String, replacement:String, source:String}
   */
  replaceCharacterKeywordPlaceholder(state, payload) {
    const character = state.characters[payload.id];
    if ( character.keywords.length > 0) {
      let placeholderKeyword = character.keywords.find(k => {
        return (k.source === payload.source && k.name === payload.placeholder);
      });
      if ( placeholderKeyword ) {
        placeholderKeyword.replacement = payload.replacement;
        character.keywords = character.keywords.filter( k => !(k.source === payload.source && k.name === payload.placeholder) )
        character.keywords.push(placeholderKeyword);
      };
    }
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
  settingTitle: '',
  settingHomebrewContent: [],
  customXp: 0,
  customRank: 1,
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
