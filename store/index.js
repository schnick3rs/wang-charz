export const state = () => ({
  setting: undefined,
  settingSelected: true,
  settingTier: 3,
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
  attributesEnhanced() {
    let enhanced = Object.assign({}, this.attributes);
    let attributeEnhancements = this.enhancements.filter( e => { return e.targetGroup === 'attributes' } );
    attributeEnhancements.forEach( m => {
      console.info(`Enhance ${m.targetValue} my ${m.modifier} due to ${m.hint}.`);
      enhanced[m.targetValue] += m.modifier;
    });
    return enhanced;
  },
  traits() {
    let traits = {};
    traits['defence'] = this.attributes.initiative-1;
    traits['resilience'] = this.attributes.toughness+1;
    traits['soak'] = this.attributes.toughness;
    traits['wounds'] = this.attributes.toughness+this.settingTier;
    traits['shock'] = this.attributes.willpower+this.settingTier;
    traits['resolve'] = this.attributes.willpower-1;
    traits['conviction'] = this.attributes.willpower;
    traits['passiveAwareness'] = Math.round((this.attributes.intellect+this.skills.awareness)/2);
    traits['influence'] = this.attributes.fellowship-1;
    traits['wealth'] = this.settingTier;
    traits['speed'] = 6;
    traits['corruption'] = 0;
    return traits;
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
  keywords: [
    { name: 'Imperium', source: 'archetype' },
    { name: 'Adeptus Ministorum', source: 'archetype' },
    { name: 'Adepta Sorotitas', source: 'archetype' },
    { name: 'order of Our Martyred Lady', source: 'archetype' },
    { name: 'Inquisition', source: 'ascension' },
  ],
  talents: [],
  ascensions: [],
  enhancements: [
    { targetGroup: 'attributes', targetValue: 'strength', modifier: 1, hint: 'Astartes Physiology' },
  ],
})

export const getters = {
  setting(state) { return state.setting; },
  settingSelected(state) { return state.settingSelected; },
  settingTier(state) { return state.settingTier; },
  species(state) { return state.species.value; },
  archetype(state) { return state.archetype.value; },
  attributes(state) { return state.attributes; },
  attributesEnhanced(state) {
    let enhanced = Object.assign({}, state.attributes);
    let attributeEnhancements = state.enhancements.filter( e => { return e.targetGroup === 'attributes' } );
    attributeEnhancements.forEach( m => {
      console.info(`Enhance ${m.targetValue} my ${m.modifier} due to ${m.hint}.`);
      enhanced[m.targetValue] += m.modifier;
    });
    return enhanced;
  },
  skills(state) { return state.skills; },
  traits(state) {
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
    traits['wealth'] = state.settingTier;
    traits['speed'] = 6;
    traits['corruption'] = 0;
    return traits;
  },
  talents(state) {
    return state.talents.map(t => t.name);
  },
  remainingBuildPoints(state, getters) {
    let remaining = 0;
    remaining = state.settingTier*100;
    return (state.settingTier * 100) - getters.spendBuildingPoints;
  },
  spendBuildingPoints(state) {
    let spend = 0;

    spend += state.species ? state.species.cost : 0;
    spend += state.archetype ? state.archetype.cost : 0;

    const attributeTotalCost = [0, 0, 4, 10, 18, 33, 51, 72, 104, 140, 180, 235, 307];
    let attributesSpending = 0;
    Object.keys(state.attributes).forEach( (key) => {
      attributesSpending += attributeTotalCost[ state.attributes[key] ];
    });
    console.debug(` Spend ${attributesSpending} for for attributes.`);
    spend += attributesSpending;

    const skillTotalCost = [0, 1, 3, 6, 10, 20, 32, 46, 60];
    let skillSpending = 0;
    Object.keys(state.skills).forEach( (key) => {
      skillSpending += skillTotalCost[ state.skills[key] ];
    });
    console.debug(` Spend ${skillSpending} for for skills.`);
    spend += skillSpending;

    let talentSpending = 0;
    state.talents.forEach( t => {
      talentSpending += t.cost;
    });
    console.debug(` Spend ${talentSpending} for for talents.`);
    spend += talentSpending;

    return spend;
  }
}

export const mutations = {
  setSetting(state, payload) {
    state.setting = payload.setting;
    state.settingSelected = true;
  },
  setSettingTier(state, payload) {
    state.settingTier = payload.amount;
  },
  setSpecies(state, payload) {
    state.species = payload;
  },
  setArchetype(state, payload) {
    state.archetype = payload;
  },
  setAttribute(state, payload) {
    state.attributes[payload.key] = payload.value;
  },
  setSkill(state, payload) {
    state.skills[payload.key] = payload.value;
  },
  addTalent(state, payload) {
    let hasTalent = state.talents.find( t => t.name === payload.name ) !== undefined;
    if ( !hasTalent ) {
      state.talents.push( { name: payload.name, cost: payload.cost } );
    }
  },
  removeTalent(state, payload) {
    let hasTalent = state.talents.find( t => t.name === payload.name ) !== undefined;
    if ( hasTalent ) {
      state.talents = state.talents.filter( t => t.name !== payload.name );
    }
  },
}
