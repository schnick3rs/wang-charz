const BUILDER_VERSION = 10;

export const state = () => ({
  list: [],
  characters: {},
  // version: 1,
})

export const getters = {
  characterIds: (state) => state.list,
  characterSets: (state) => state.list.map((charId) => state.characters[charId]),

  characterEffectiveTierById: (state) => (id) => {
    const character = state.characters[id];
    if (character === undefined) {
      return {};
    }
    const archetypeTier = character.archetype.tier || 0;
    let ascensionTier = 0;
    character.ascensionPackages.forEach((i) => {
      if (i.targetTier > ascensionTier) {
        ascensionTier = i.targetTier;
      }
    });
    return Math.max(archetypeTier, ascensionTier);
  },

  characterStateJsonById: (state) => (id) => {
    const character = state.characters[id];
    let cleanCharacter = JSON.parse(JSON.stringify(character));
    cleanCharacter.avatarUrl = undefined;
    return JSON.stringify(cleanCharacter);
  },

  characterVersionById: (state) => (id) => (state.characters[id] ? state.characters[id].version : undefined),

  // Character setting
  characterSettingTierById: (state) => (id) => (state.characters[id] ? state.characters[id].settingTier : 1),
  characterSettingTitleById: (state) => (id) => (state.characters[id] ? state.characters[id].settingTitle : getDefaultState().settingTitle),
  characterCampaignCustomXpById: (state) => (id) => (state.characters[id] && state.characters[id].customXp ? parseInt(state.characters[id].customXp) : 0),
  characterCampaignCustomRankById: (state) => (id) => (state.characters[id] && state.characters[id].customRank ? parseInt(state.characters[id].customRank) : 1),

  characterSettingHomebrewsById: (state) => (id) => (state.characters[id] && state.characters[id].settingHomebrewContent ? state.characters[id].settingHomebrewContent : []),

  characterSettingHouserulesById: (state) => (id) => (state.characters[id] && state.characters[id].settingHouserules ? state.characters[id].settingHouserules : getDefaultState().settingHouserules),

  // Cost & Spending
  characterSpeciesCostsById: (state) => (id) => (state.characters[id] ? state.characters[id].species.cost : 0),
  characterArchetypeCostsById: (state) => (id) => (state.characters[id] ? state.characters[id].archetype.cost : 0),
  characterAttributeCostsById: (state) => (id) => {
    const character = state.characters[id];
    if (character === undefined) {
      return 0;
    }
    const attributeTotalCost = {
      //   [0, 1, 2,  3,  4,  5,  6,  7,   8,   9,  10,  11,  12],
      v10: [0, 0, 4, 10, 18, 33, 51, 72, 104, 140, 180, 235, 307],
      v15: [0, 0, 4, 10, 20, 35, 55, 80, 110, 145, 185, 230, 280],
    };
    const costKey = character.settingHouserules && character.settingHouserules['skill-attribute-advancement-costs'] ? character.settingHouserules['skill-attribute-advancement-costs'] : 'v15';
    let attributesSpending = 0;
    Object.keys(character.attributes).forEach((key) => {
      attributesSpending += attributeTotalCost[costKey][character.attributes[key]];
    });
    return attributesSpending;
  },
  characterSkillCostsById: (state) => (id) => {
    const character = state.characters[id];
    if (character === undefined) {
      return 0;
    }
    const skillTotalCost = {
      //   [0, 1, 2,  3,  4,  5,  6,  7,  8],
      v10: [0, 1, 3,  6, 10, 20, 32, 46, 70],
      v15: [0, 2, 6, 12, 20, 30, 42, 56, 72],
    };
    const costKey = character.settingHouserules && character.settingHouserules['skill-attribute-advancement-costs'] ? character.settingHouserules['skill-attribute-advancement-costs'] : 'v15';
    let skillSpending = 0;
    Object.keys(character.skills).forEach((key) => {
      skillSpending += skillTotalCost[costKey][character.skills[key]];
    });
    return skillSpending;
  },
  characterTalentCostsById: (state) => (id) => {
    const character = state.characters[id];
    if (character === undefined) {
      return 0;
    }
    let spending = 0;
    character.talents.filter((talent) => talent).forEach((talent) => {
      spending += talent.cost;
      if (talent.extraCost && typeof talent.extraCost === 'object') {
        Object.keys(talent.extraCost).forEach((extraCostKey) => {
          spending += talent.extraCost[extraCostKey] ? talent.extraCost[extraCostKey] : 0;
        });
      } else {
        spending += talent.extraCost && parseInt(talent.extraCost) ? talent.extraCost : 0;
      }
    });
    return spending;
  },
  characterAscensionCostsById: (state) => (id) => {
    const character = state.characters[id];
    if (character === undefined) {
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
    if (character === undefined) {
      return 0;
    }
    let spending = 0;
    character.psychicPowers.forEach((psychicPower) => {
      spending += psychicPower.cost;
    });
    return spending;
  },
  characterLanguagesCostsById: (state) => (id) => {
    const character = state.characters[id];
    if (character === undefined || character.languages === undefined) {
      return 0;
    }
    let spending = 0;
    character.languages.forEach((language) => {
      spending += language.cost;
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
    spend += getters.characterLanguagesCostsById(id);

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
  characterNameById: (state) => (id) => (state.characters[id] ? state.characters[id].name : getDefaultState().name),
  characterAvatarUrlById: (state) => (id) => (state.characters[id] ? state.characters[id].avatarUrl : getDefaultState().avatarUrl),
  characterSpeciesKeyById: (state) => (id) => (state.characters[id] ? state.characters[id].species.key : getDefaultState().species.key),
  characterSpeciesLabelById: (state) => (id) => (state.characters[id] ? state.characters[id].species.label : getDefaultState().species.label),
  characterSpeciesAstartesChapterById: (state) => (id) => (state.characters[id] ? state.characters[id].speciesAstartesChapter : getDefaultState().speciesAstartesChapter),
  characterFactionKeyById: (state) => (id) => (state.characters[id] ? state.characters[id].faction.key : getDefaultState().faction.key),
  characterFactionLabelById: (state) => (id) => (state.characters[id] ? state.characters[id].faction.label : 'unknown'),

  characterArchetypeKeyById: (state) => (id) => (state.characters[id] ? state.characters[id].archetype.key : getDefaultState().faction.key),
  characterArchetypeLabelById: (state) => (id) => (state.characters[id] ? state.characters[id].archetype.value : 'unknown'),
  characterArchetypeTierById: (state) => (id) => (state.characters[id] ? state.characters[id].archetype.tier : undefined),
  characterArchetypeKeywordsById: (state) => (id) => (state.characters[id] ? state.characters[id].archetype.keywords : []),

  characterFluffNotesById: (state) => (id) => (state.characters[id]?.fluff?.notes ? state.characters[id].fluff.notes : getDefaultState().fluff.notes),

  characterAttributesById: (state) => (id) => (state.characters[id] ? state.characters[id].attributes : {}),
  characterAttributesEnhancedById: (state) => (id) => {
    if (state.characters[id] === undefined) {
      return {};
    }
    const enhanced = { ...state.characters[id].attributes };
    const attributeEnhancements = state.characters[id].enhancements.filter((e) => e.targetGroup === 'attributes');
    attributeEnhancements.forEach((m) => {
      console.info(`Enhance ${m.targetValue} by ${m.modifier} due to ${m.source}/${m.hint}.`);
      enhanced[m.targetValue] += m.modifier;
    });
    return enhanced;
  },
  characterSkillsById: (state) => (id) => (state.characters[id] ? state.characters[id].skills : {}),
  characterTraitsById: (state, getters) => (id) => {
    const character = state.characters[id];
    const enhancedAttributes = getters.characterAttributesEnhancedById(id);
    const skills = getters.characterSkillsById(id);
    const keywords = getters.characterKeywordsFinalById(id);
    if (character === undefined) {
      return {};
    }

    const traits = {};
    traits.defence = enhancedAttributes.initiative - 1;
    traits.resilience = enhancedAttributes.toughness + 1;
    traits.determination = enhancedAttributes.toughness;
    traits.maxWounds = enhancedAttributes.toughness + (2 * character.settingTier);
    traits.maxShock = enhancedAttributes.willpower + character.settingTier;
    traits.resolve = enhancedAttributes.willpower - 1;
    traits.conviction = enhancedAttributes.willpower;
    traits.passiveAwareness = Math.round((enhancedAttributes.intellect + skills.awareness) / 2);

    traits.influence = enhancedAttributes.fellowship - 1;
    if (character.species.key && character.species.key === 'core-ork') {
      traits.influence = enhancedAttributes.strength - 1;
    }

    // Data is Currency: Characters with the Adeptus Mechanicus keyword may use Intellect in place of Fellowship when calculating Influence.
    const hasMechanicusKeyword = keywords.find( k => k === 'Adeptus Mechanicus') !== undefined;
    const intellectGtFellowsip = enhancedAttributes.intellect > enhancedAttributes.fellowship;
    if ( hasMechanicusKeyword && intellectGtFellowsip ) {
      traits.influence = enhancedAttributes.intellect - 1;
    }

    traits.wealth = character.settingTier;
    traits.speed = 6;
    if (character.species.key && ['core-aeldari','aaoa-drukhari'].includes(character.species.key)) {
      traits.speed = 8;
    }
    if (character.species.key && ['aaoa-beastman'].includes(character.species.key)) {
      traits.speed = 7;
    }
    if (character.species.key && character.species.key.endsWith('-astartes')) {
      traits.speed = 7;
    }

    traits.corruption = 0;
    return traits;
  },
  characterTraitsEnhancedById: (state, getters) => (id) => {
    const character = state.characters[id];
    if (character === undefined) {
      return {};
    }

    const enhanced = { ...getters.characterTraitsById(id) };
    const traitEnhancements = character.enhancements.filter((e) => e.targetGroup === 'traits');
    traitEnhancements.forEach((m) => {
      console.info(`Enhance ${m.targetValue} by ${m.modifier} due to ${m.source}.`);
      enhanced[m.targetValue] += m.modifier;
    });
    return enhanced;
  },

  //
  characterEnhancementsById: (state) => (id) => (state.characters[id] ? state.characters[id].enhancements : []),

  // Talents
  characterTalentsById: (state) => (id) => (state.characters[id] ? state.characters[id].talents : []),

  // Wargear
  characterWargearById: (state) => (id) => (state.characters[id] ? state.characters[id].wargear : []),

  // Powers
  characterPsychicPowersById: (state) => (id) => (state.characters[id] ? state.characters[id].psychicPowers : []),

  // Ascensions
  characterAscensionPackagesById: (state) => (id) => (state.characters[id] ? state.characters[id].ascensionPackages : []),

  // Keywords
  characterKeywordsRawById: (state) => (id) => (state.characters[id] ? state.characters[id].keywords : []),
  characterKeywordsFinalById: (state) => (id) => {
    const keywords = state.characters[id] ? state.characters[id].keywords : [];
    return keywords.map((k) => (k.replacement ? k.replacement : k.name));
  },

  // Mutations
  characterMutationsById: (state) => (id) => (state.characters[id] ? state.characters[id].mutations : []),

  characterBackgroundById: (state) => (id) => (state.characters[id] ? state.characters[id].background : getDefaultState().background),
  characterBackgroundKeyById: (state) => (id) => (state.characters[id] ? state.characters[id].background.key : getDefaultState().background.key),
  characterBackgroundLabelById: (state) => (id) => (state.characters[id] ? state.characters[id].background.label : getDefaultState().background.label),

  characterLanguagesById: (state) => (id) => {
    const character = state.characters[id];
    if ( character === undefined ) {
      return [];
    }
    if ( character.languages === undefined ) {
      character.languages = getDefaultState().languages; // language migration
    }
    return character.languages;
  },

  characterResourceSpendById: (state, getters) => (id, resourceKey) => {
    const character = state.characters[id];
    if ( character === undefined ) {
      return 0;
    }
    if ( character[resourceKey] === undefined ) {
      character[resourceKey] = getDefaultState()[resourceKey]; // resource migration
    }
    return character[resourceKey].spend;
  },

  characterReloadsById: (state) => (id) => (state.characters[id] && state.characters[id].faith ? state.characters[id].reloads.points : getDefaultState().reloads.points),

  characterReloadsSpendById: (state) => (id) => {
    const character = state.characters[id];
    if ( character === undefined ) {
      return 0;
    }
    return character.reloads.spend;
  },

  characterFaithPointsById: (state) => (id) => (state.characters[id] && state.characters[id].faith ? state.characters[id].faith.points : getDefaultState().faith.points),
  characterFaithSpendById: (state) => (id) => {
    const character = state.characters[id];
    if ( character === undefined ) {
      return 0;
    }
    return character.faith.spend;
  },

  characterWoundsPointsById: (state, getters) => (id) => {
    const character = state.characters[id];
    if ( character === undefined ) {
      return 0;
    }
    return getters.characterTraitsById(id)['maxWounds'];
  },

  characterShockPointsById: (state, getters) => (id) => {
    const character = state.characters[id];
    if ( character === undefined ) {
      return 0;
    }
    return getters.characterTraitsById(id)['maxShock'];
  },

  characterWealthPointsById: (state, getters) => (id) => {
    const character = state.characters[id];
    if ( character === undefined ) {
      return 0;
    }
    return getters.characterTraitsById(id)['wealth'];
  },
  characterWealthSpendById: (state) => (id) => {
    const character = state.characters[id];
    if ( character === undefined ) {
      return 0;
    }
    if ( character.wealth === undefined ) {
      character.wealth = getDefaultState().wealth; // resource migration NOT REACTIVE
    }
    return character.wealth.spend;
  },

  characterCustomSkillsById: (state) => (id) => {
    const character = state.characters[id];
    if ( character === undefined ) {
      return [];
    }
    if ( character.customSkills === undefined ) {
      character.customSkills = getDefaultState().customSkills; // migration  NOT REACTIVE
    }
    return character.customSkills;
  },
};

export const mutations = {
  setCharacterName(state, payload) {
    state.characters[payload.id].name = payload.name;
  },
  setCharacterAvatar(state, payload) {
    state.characters[payload.id].avatarUrl = payload.url;
  },
  setSettingTier(state, payload) {
    state.characters[payload.id].settingTier = payload.tier;
  },
  setSettingTitle(state, payload) {
    state.characters[payload.id].settingTitle = payload.title;
  },
  enableSettingHomebrews(state, payload) {
    state.characters[payload.id].settingHomebrewContent.push(payload.content);
  },
  setSettingHomebrews(state, payload) {
    state.characters[payload.id].settingHomebrewContent = payload.content;
  },
  setSettingHouserules(state, payload) {
    let character = state.characters[payload.id];
    const { key, value } = payload.houserule;
    character.settingHouserules[key] = value;
  },
  setCustomXp(state, payload) {
    state.characters[payload.id].customXp = payload.xp;
  },
  setCustomRank(state, payload) {
    console.info(`Set Rank manually to ${payload.rank}.`);
    state.characters[payload.id].customRank = payload.rank;
  },
  setCharacterSpecies(state, payload) {
    state.characters[payload.id].species = payload.species;
  },
  setCharacterSpeciesAstartesChapter(state, payload) {
    console.info(`Set Species Astartes Chapter to ${payload.speciesAstartesChapter}.`);
    state.characters[payload.id].speciesAstartesChapter = payload.speciesAstartesChapter;
  },
  setCharacterArchetype(state, payload) {
    state.characters[payload.id].archetype = payload.archetype;
  },
  setCharacterArchetypeCost(state, payload) {
    const { id, cost } = payload;
    state.characters[id].archetype = {
      ...state.characters[id].archetype,
      cost,
    };
  },
  setCharacterFaction(state, payload) {
    state.characters[payload.id].faction = payload.faction;
  },
  resetCharacterStats(state, payload) {
    const character = state.characters[payload.id];
    Object.keys(character.attributes).forEach((key, index) => { character.attributes[key] = 1; });
    Object.keys(character.skills).forEach((key, index) => { character.skills[key] = 0; });
  },
  setCharacterSkill(state, payload) {
    state.characters[payload.id].skills[payload.payload.key] = payload.payload.value;
  },
  setCharacterAttribute(state, payload) {
    const char = state.characters[payload.id];
    const attribute = char.attributes[payload.payload.key];
    let theAttribute = state.characters[payload.id].attributes[payload.key];
    theAttribute = payload.payload.value;
    state.characters[payload.id].attributes[payload.payload.key] = payload.payload.value;
  },
  addCharacterCustomSkill(state, payload) {
    let { id, skill } = payload;
    const character = state.characters[id];

    let newSkill = {};
    newSkill[skill.key] = 0;
    character.skills = {
      ...character.skills,
      ...newSkill,
    };

    skill.custom = true;
    console.info(`Adding ${skill.name} Skill:`);
    console.info(skill);
    character.customSkills.push(skill);
  },
  removeCharacterCustomSkill(state, payload) {
    const { id, key } = payload;
    const character = state.characters[id];

    console.info(`Removing ${key} Skill.`);
    delete character.skills[key];
    character.customSkills = character.customSkills.filter((s)=>s.key !== key);
  },

  /**
   * @param state
   * @param payload {
   *   id
   *   content {
   *     modifications
   *     source
   *   }
   * }
   */
  setCharacterModifications(state, payload) {
    const character = state.characters[payload.id];
    const { modifications } = payload.content;
    const source = payload.content.source || undefined;

    console.info(`Enhance/Modify: Adding ${modifications.length} from '${source}'.`);

    // we remove all enhancements that share the cleanup value.
    if (source !== undefined) {
      character.enhancements = character.enhancements.filter((e) => e.source !== source);
    }

    modifications.forEach((item) => {
      item.source = source;
      console.info(`Enhance ${item.targetGroup}/${item.targetValue} by ${item.modifier} [${item.source}].`);
      character.enhancements.push(item);
    });
  },
  addCharacterModifications(state, payload) {
    const character = state.characters[payload.id];
    const { modifications } = payload.content;
    const source = payload.content.source || undefined;

    modifications.forEach((item) => {
      const uuid = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
      item.id = uuid;
      item.source = source;
      character.enhancements.push(item);
      console.info(`Enhance/Modify: Adding ${item.targetValue} by '${source}'`);
    });
  },
  removeCharacterModificationById(state, payload) {
    const character = state.characters[payload.id];
    character.enhancements = character.enhancements.filter((e) => e.id !== payload.modificationId);
  },
  clearCharacterEnhancementsBySource(state, payload) {
    const character = state.characters[payload.id];
    console.log(`Clearing ${character.enhancements.length} enhancements for source ${payload.source}...`);
    character.enhancements = character.enhancements.filter((e) => !e.source.includes(payload.source));
    console.log(`Done, ${character.enhancements.length} enhancements remain.`);
  },
  setCharacterSpeciesModifications(state, payload) {
    const character = state.characters[payload.id];

    character.enhancements = character.enhancements.filter((e) => e.source !== 'species');
    payload.content.modifications.forEach((item) => {
      item.source = 'species';
      character.enhancements.push(item);
    });
  },

  // Talents
  addCharacterTalent(state, payload) {
    const character = state.characters[payload.id];
    const { talent } = payload;
    const talentUniqueId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
    console.info(`Adding Talent [${talentUniqueId}] ${talent.name}.`);
    talent.id = talentUniqueId;
    character.talents.push(talent);
    //const hasTalent = character.talents.find((t) => t.id === talent.id) !== undefined;
    //if (!hasTalent) {
    //}
  },
  removeCharacterTalent(state, payload) {
    const character = state.characters[payload.id];
    character.talents = character.talents.filter((t) => t); // cleanup
    const hasTalent = character.talents.find((t) => t.id === payload.talentId) !== undefined;
    if (hasTalent) {
      character.talents = character.talents.filter((t) => t.id !== payload.talentId);
    }
  },

  /**
   * @param state
   * @param payload { id, source: `ascension.${key}`, cascade: true }
   */
  clearCharacterTalentsBySource(state, payload) {
    const character = state.characters[payload.id];
    const { source, cascade } = payload;
    if (character.talents.length > 0) {
      console.log(`Found ${character.talents.length} talents, clearing with source ${source}...`);
      character.talents = character.talents.filter((k) => k.source === undefined || !k.source.includes(source));
      console.log(`${character.talents.length} talents remaining`);
    }
  },
  setCharacterTalentSelected(state, payload) {
    const character = state.characters[payload.id];
    const { id, key, name, selected } = payload.talent;
    character.talents = character.talents.filter((t) => t); // cleanup

    console.info(`Update [${id}] ${name} with choice -> ${selected}`);
    const theTalent = character.talents.find((t) => t.id === id);
    const theOtherTalents = character.talents.filter((t) => t.id !== id);

    if (theTalent) {
      // the character has a talent with the given uniqueID, thus we set the talents selected value accordingly
      theTalent.selected = selected;
    }

    character.talents = [
      ...theOtherTalents,
      theTalent,
    ];
  },
  setCharacterTalentExtraCost(state, payload) {
    const character = state.characters[payload.charId];
    const { id, key, name, extraKey, extraCost } = payload;

    console.info(`Update ${key}/${name}/${extraKey} set extraCost to ${extraCost}`);
    const theTalent = character.talents.find((t) => t.id === id);
    const theOtherTalents = character.talents.filter((t) => t.id !== id);

    if (theTalent) {
      if (typeof theTalent.extraCost !== 'object') {
        theTalent.extraCost = {};
      }
      theTalent.extraCost[extraKey] = extraCost;
    }

    character.talents = [
      ...theOtherTalents,
      theTalent,
    ];
  },


  // Mutations
  addCharacterMutation(state, payload) {
    const { id, mutation } = payload;
    const character = state.characters[id];

    const uuid = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
    console.info(`Adding Mutation [${uuid}] ${mutation.name}.`);

    mutation.id = uuid;
    character.mutations.push(mutation);
  },
  removeCharacterMutation(state, payload) {
    const character = state.characters[payload.id];
    const hasMutation = character.mutations.find((t) => t.id === payload.uuid) !== undefined;
    if (hasMutation) {
      character.mutations = character.mutations.filter((t) => t.id !== payload.uuid);
    }
  },

  // Wargear { id, name, source, (variant) }
  addCharacterWargear(state, payload) {
    const character = state.characters[payload.id];
    const wargearUniqueId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
    console.info(`Adding '${payload.name}' by '${payload.source}' [${wargearUniqueId}]`);
    if ( payload.gear && payload.gear.modifiers ) {

    }
    character.wargear.push({ id: wargearUniqueId, name: payload.name, variant: payload.variant, source: payload.source });
  },
  removeCharacterWargear(state, payload) {
    const character = state.characters[payload.id];
    const { gearId } = payload;
    const hasWargear = character.wargear.find((t) => t.id === gearId) !== undefined;
    if (hasWargear) {
      character.wargear = character.wargear.filter((t) => t.id !== gearId);
    }
  },
  removeCharacterWargearBySource(state, payload) {
    const character = state.characters[payload.id];
    const { source } = payload;
    character.wargear = character.wargear.filter((item) => !item.source.includes(source));
  },

  // Psychic Powers
  addCharacterPsychicPower(state, payload) {
    const character = state.characters[payload.id];
    const hasPower = character.psychicPowers.find((t) => t.name === payload.name) !== undefined;
    if (!hasPower) {
      console.info(`Adding '${payload.name}' by '${payload.source}'`);
      character.psychicPowers.push({ name: payload.name, cost: payload.cost, source: payload.source || undefined });
    }
  },
  removeCharacterPsychicPower(state, payload) {
    const character = state.characters[payload.id];
    const foundPower = character.psychicPowers.find((t) => t.name === payload.name);
    if (foundPower) {
      console.info(`Removing '${payload.name}' by '${foundPower.source}'`);
      character.psychicPowers = character.psychicPowers.filter((t) => t.name !== payload.name);
    }
  },
  clearCharacterPsychicPowersBySource(state, payload) {
    const character = state.characters[payload.id];
    if (character.psychicPowers.length > 0) {
      console.log(`found ${character.psychicPowers.length} psychic powers, clearing with source ${payload.source}...`);
      character.psychicPowers = character.psychicPowers.filter((k) => k.source === undefined || !k.source.includes(payload.source));
      console.log(`${character.psychicPowers.length} psychic powers remaining`);
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
  setCharacterAscensionPackageStoryElement(state, payload) {
    const character = state.characters[payload.id];
    console.info(`Set Ascension Story Element to ${payload.ascensionPackageStoryElementKey}`);
    // find package by payload.ascensionPackageKey and payload.ascensionPackage
    const index = character.ascensionPackages.findIndex((a) => (
      a.key === payload.ascensionPackageKey
      && a.targetTier === payload.ascensionPackageTargetTier
    ));
    if (index >= 0) {
      character.ascensionPackages[index].storyElementChoice = payload.ascensionPackageStoryElementKey;
    }
  },
  setCharacterAscensionPackageWargearOption(state, payload) {
    const character = state.characters[payload.id];
    console.info(`Set Ascension WargearOption to ${payload.ascensionPackageFeatureOptionChoiceKey}`);
    // find package by payload.ascensionPackageKey and payload.ascensionPackage
    const index = character.ascensionPackages.findIndex((a) => (
      a.key === payload.ascensionPackageKey
      && a.targetTier === payload.ascensionPackageTargetTier
    ));
    if (index >= 0) {
      if ( character.ascensionPackages[index].featureChoices === undefined )
      character.ascensionPackages[index] = {
        ...character.ascensionPackages[index],
        featureChoices: {},
      };
      character.ascensionPackages[index].featureChoices[payload.ascensionPackageFeatureName] = payload.ascensionPackageFeatureOptionChoiceKey;
    }
  },
  clearCharacterAscensionPackage(state, payload) {
    const { id, value } = payload;
    const character = state.characters[id];
    character.ascensionPackages = character.ascensionPackages.filter((a) => (a.value !== value));
  },

  // Background { id, type, key }
  setCharacterBackground(state, payload) {
    const { id, type, key } = payload;
    const character = state.characters[id];
    console.info(`Background: ${type} > ${key} selected.`);
    character.background[type] = key;
  },
  setCharacterBackgroundPlusOne(state, payload) {
    const { id, type, key, plusOne } = payload;
    const character = state.characters[id];
    console.info(`Background Focus: ${type} > ${key} for ${plusOne} selected.`);
    character.background.plusOne = key;
  },

  // languages
  addCharacterLanguage(state, payload) {
    const character = state.characters[payload.id];
    const { name, cost, source } = payload;
    const language = { name, cost, source };
    character.languages.push(language);
  },
  removeCharacterLanguage(state, payload) {
    const character = state.characters[payload.id];
    const { name } = payload;
    character.languages = character.languages.filter( (language) => language.name.localeCompare(name, 'en') !== 0);
  },

  setCharacterFluffNotes(state, payload) {
    const { id, notes } = payload;
    const character = state.characters[id];
    if (character.fluff === undefined) character['fluff'] = { notes: '' };
    character.fluff.notes = notes;
  },

  // Keywords
  addCharacterKeyword(state, payload) {
    const character = state.characters[payload.id];
    const { keyword } = payload;
    console.log(`Adding keyword ${keyword.name} of type ${keyword.type}.`);
    character.keywords.push(keyword);
  },
  clearCharacterKeywordsBySource(state, payload) {
    const character = state.characters[payload.id];
    const { source, cascade } = payload;
    if (character.keywords.length > 0) {
      console.log(`found ${character.keywords.length} keywords, clearing with source ${source}...`);
      character.keywords = character.keywords.filter((k) => k.source !== source);
      if ( cascade ) {
        character.keywords = character.keywords.filter((k) => !k.source.startsWith(source));
      }
      console.log(`${character.keywords.length} keywords remaining`);

    }
  },
  /**
   * keyword { name:String, source:String, type:String, replacement:undefined/String }
   * @param payload { placeholder:String, replacement:String, source:String}
   */
  replaceCharacterKeywordPlaceholder(state, payload) {
    const character = state.characters[payload.id];
    if (character.keywords.length > 0) {
      const placeholderKeyword = character.keywords.find((k) => (k.source === payload.source && k.name === payload.placeholder));
      if (placeholderKeyword) {
        placeholderKeyword.replacement = payload.replacement;
        character.keywords = character.keywords.filter((k) => !(k.source === payload.source && k.name === payload.placeholder));
        character.keywords.push(placeholderKeyword);
      }
    }
  },

  setCharacterResourceSpend(state, payload) {
    const { id, spend, resourceKey } = payload;
    const character = state.characters[id];
    const resource = character[resourceKey];
    resource.spend = spend;
  },

  setCharacterFaithSpend(state, payload) {
    const { id, spend } = payload;
    const character = state.characters[id];
    const faith = character.faith;
    faith.spend = spend;
  },

  // character handling
  create(state, id) {
    state.list.push(id);
    const newChar = {};
    Object.assign(newChar, getDefaultState());
    newChar.id = id;
    const newObj = {};
    newObj[id] = newChar;
    state.characters = {
      ...state.characters,
      ...newObj,
    };
  },
  import(state, payload) {
    state.list.push(payload.id);
    const newChar = {};
    Object.assign(newChar, JSON.parse(payload.stateString));
    newChar.id = payload.id;
    const newObj = {};
    newObj[payload.id] = newChar;
    state.characters = {
      ...state.characters,
      ...newObj,
    };
  },
  add(state, character) {
    state.list.push(character.id);
  },
  remove(state, characterId) {
    state.list.splice(state.list.indexOf(characterId), 1);
    delete state.characters[characterId];
  },
  migrate(state, config) {
    const character = state.characters[config.characterId];

    switch (character.version) {
      case 9:
        console.debug(`v9 -> v10 : adding mutations.`);
        const mutations = {
          mutations: getDefaultState().mutations,
        };
        character.version = 10;
        state.characters[config.characterId] = {
          ...character,
          ...mutations,
        };
        console.info(`Character migrated to v10`);
        break;
      case 8:
        console.debug(`v8 -> v9 : adding options for fluff notes.`);
        const fluff = {
          fluff: getDefaultState().fluff,
        };
        character.version = 9;
        state.characters[config.characterId] = {
          ...character,
          ...fluff,
        };
        console.info(`Character migrated to v9`);
        break;
      case 7:
        console.debug(`v7 -> v8 : Adding houserules handling.`);
        const settingHouserules = {
          settingHouserules: getDefaultState().settingHouserules,
        };
        character.version = 8;
        state.characters[config.characterId] = {
          ...character,
          ...settingHouserules,
        };
        console.info(`Character migrated to v8.`);
        break;
    }

  },
};

export const actions = {

  clearCharacterAscensionPackage({ commit, state }, payload) {
    const { id, value, key } = payload;

    console.info(`Ascension [${value}] : Purge > START`);

    console.info(`Ascension [${value}] : Purge > Enhancements`);
    commit('clearCharacterEnhancementsBySource', { id, source: `ascension.${key}` });

    console.info(`Ascension [${value}] : Purge > Keywords`);
    commit('clearCharacterKeywordsBySource', { id, source: `ascension.${key}`, cascade: true });

    console.info(`Ascension [${value}] : Purge > talents`);
    commit('clearCharacterTalentsBySource', { id, source: `ascension.${key}`, cascade: true });

    console.info(`Ascension [${value}] : Purge > Psychic Powers`);
    commit('clearCharacterPsychicPowersBySource', { id, source: `ascension.${key}` });

    console.info(`Ascension [${value}] : Purge > Wargear`);
    commit('removeCharacterWargearBySource', { id, source: `ascension.${key}` });

    console.info(`Ascension [${value}] : Purge > Package`);
    commit('clearCharacterAscensionPackage', { id, value });

    console.info(`Ascension [${value}] : Purge > DONE`);
  },

  /**
   * migrate the character object to a newer version
   * @param context
   * @param payload
   * {
   *   characterId: Integer,
   * }
   */
  migrate( {commit, state, rootState}, payload) {

    const character = state.characters[payload.characterId];

    if (character === undefined) {
      console.warn(`Could not read character for id [${payload.characterId}].`);
      return;
    }

    const characterVersion = character.version;
    const builderVersion = BUILDER_VERSION;

    if ( characterVersion < builderVersion ) {
      console.info(`Migrate [${character.name}] from ${characterVersion} to ${characterVersion+1}`);
      const config = {
        characterId: character.id,
        currentVersion: characterVersion,
        targetVersion: characterVersion+1,
      };
      commit('migrate', config);
    } else {
      console.info(`[${character.name}] is up to date. ${characterVersion} / ${builderVersion}.`);
    }
  },
};

const getDefaultState = () => ({
  id: -1,
  version: 10, // 7+ is revised
  setting: undefined,
  settingSelected: true,
  settingTier: 3,
  settingTitle: '',
  settingHomebrewContent: [], // e.g. pax
  settingHouserules: {
    'rank-advancement-type': 'milestone',
    'skill-attribute-advancement-costs': 'v15',
  },
  customXp: 0,
  customRank: 1,
  name: 'Simsel Simselman',
  avatarUrl: undefined,
  species: {
    key: undefined,
    label: '',
    cost: 0,
  },
  speciesAstartesChapter: undefined,
  faction: {
    key: undefined,
    label: '',
  },
  archetype: {
    key: undefined,
    label: '',
    cost: 0,
  },
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
  customSkills: [],
  languages: [
    { name: 'Low Gothic', cost: 0, source: '' },
  ],
  keywords: [],
  talents: [],
  mutations: [],
  psychicPowers: [],
  ascensionPackages: [],
  wargear: [],
  background: {
    origin: undefined,
    accomplishment: undefined,
    goal: undefined,
    plusOne: undefined,
  },
  enhancements: [],
  /**
   * spendable resources are:
   * > Faith, granted by talents, long rest
   * > wrath, 2 plus talents and objectives, long rest
   * > shock, by trait and boni
   * > wounds, by trait and boni
   * > wealth, by trait and boni
   * > reloads, 3 + gear
   */
  objectives: [],
  objectiveArchived: false,
  faith: {
    points: 0, // computed from obtained talents
    spend: 0,
  },
  maxWounds: {
    spend: 0,
  },
  maxShock: {
    spend: 0,
  },
  assets: {
    points: 0, // aka trait
  },
  wealth: {
    points: 0, // aka trait
    spend: 0,
  },
  wrath: {
    points: 2, // or more, if objective is fullfiled or talents
    spend: 0,
  },
  reloads: {
    points: 3, // or more, buy gear
    spend: 0,
  },
  defiance: {
    passed: 0,
    failed: 0,
  },
  fluff: {
    notes: '',
  },
});
