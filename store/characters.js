export const state = () => ({
  list: [],
  characters: {},
  // version: 1,
});

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

  // Cost & Spending
  characterSpeciesCostsById: (state) => (id) => (state.characters[id] ? state.characters[id].species.cost : 0),
  characterArchetypeCostsById: (state) => (id) => (state.characters[id] ? state.characters[id].archetype.cost : 0),
  characterAttributeCostsById: (state) => (id) => {
    const character = state.characters[id];
    if (character === undefined) {
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
    if (character === undefined) {
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
    if (character === undefined) {
      return 0;
    }
    let spending = 0;
    character.talents.forEach((talent) => {
      spending += talent.cost;
      spending += talent.extraCost && parseInt(talent.extraCost) ? talent.extraCost : 0;
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
  characterRemainingBuildPointsById: (state, getters) => (id) => getters.characterTotalBuildPointsById(id) - getters.characterSpendBuildPointsById(id),

  // Character data
  characterNameById: (state) => (id) => (state.characters[id] ? state.characters[id].name : getDefaultState().name),
  characterAvatarUrlById: (state) => (id) => (state.characters[id] ? state.characters[id].avatarUrl : getDefaultState().avatarUrl),
  characterSpeciesKeyById: (state) => (id) => (state.characters[id] ? state.characters[id].species.key : getDefaultState().species.key),
  characterSpeciesLabelById: (state) => (id) => (state.characters[id] ? state.characters[id].species.label : getDefaultState().species.label),
  characterSpeciesAstartesChapterById: (state) => (id) => {
    const character = state.characters[id];
    if (character) {
      const chapter = character.speciesAstartesChapter;
      if ( chapter.includes(' ') ) { // its an ol chapter name, using CORE
        character.speciesAstartesChapter = `core ${chapter}`.toLowerCase().replace(/\W/gm, '-');
      }
      console.info(`chapter: ${chapter}`)
      return character.speciesAstartesChapter;
    }
    return getDefaultState().speciesAstartesChapter;
  },
  characterArchetypeKeyById: (state) => (id) => (state.characters[id] ? state.characters[id].archetype.key : getDefaultState().archetype.key),
  characterArchetypeLabelById: (state) => (id) => (state.characters[id] ? state.characters[id].archetype.value : 'unknown'),
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
    traits.soak = enhancedAttributes.toughness;
    traits.wounds = enhancedAttributes.toughness + character.settingTier;
    traits.shock = enhancedAttributes.willpower + character.settingTier;
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
    if (character.species.key && character.species.key === 'core-eldar') {
      traits.speed = 8;
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
  setCharacterSkill(state, payload) {
    state.characters[payload.id].skills[payload.payload.key] = payload.payload.value;
  },
  setCharacterAttribute(state, payload) {
    const char = state.characters[payload.id];
    const attribute = char.attributes[payload.payload.key];
    let theAttribute = state.characters[payload.id].attributes[payload.payload.key];
    theAttribute = payload.payload.value;
    state.characters[payload.id].attributes[payload.payload.key] = payload.payload.value;
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
    console.info(payload);

    console.info(`Enhance/Modify: Adding ${modifications.targetValue} by '${source}'`);

    modifications.forEach((item) => {
      item.source = source;
      character.enhancements.push(item);
    });
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
    const hasTalent = character.talents.find((t) => t.name === talent.name) !== undefined;
    if (!hasTalent) {
      character.talents.push({ id: talentUniqueId, ...talent });
    }
  },
  removeCharacterTalent(state, payload) {
    const character = state.characters[payload.id];
    const hasTalent = character.talents.find((t) => t.name === payload.name) !== undefined;
    if (hasTalent) {
      character.talents = character.talents.filter((t) => t.name !== payload.name);
    }
  },
  setCharacterTalentSelected(state, payload) {
    const character = state.characters[payload.id];
    console.info(`Update ${payload.name} set selected = ${payload.selected}`);
    const theTalent = character.talents.find((t) => t.name === payload.name);
    const theOtherTalents = character.talents.filter((t) => t.name !== payload.name);

    theTalent.selected = payload.selected;

    character.talents = [
      ...theOtherTalents,
      theTalent,
    ];
  },
  setCharacterTalentExtraCost(state, payload) {
    const character = state.characters[payload.id];
    console.info(`Update ${payload.name} set extraCost = ${payload.extraCost}`);
    const theTalent = character.talents.find((t) => t.name === payload.name);
    const theOtherTalents = character.talents.filter((t) => t.name !== payload.name);

    theTalent.extraCost = payload.extraCost;

    character.talents = [
      ...theOtherTalents,
      theTalent,
    ];
  },

  // Wargear
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
    console.info(`Set Ascension WargearOption to ${payload.ascensionPackageWargearOptionKey}`);
    // find package by payload.ascensionPackageKey and payload.ascensionPackage
    const index = character.ascensionPackages.findIndex((a) => (
      a.key === payload.ascensionPackageKey
      && a.targetTier === payload.ascensionPackageTargetTier
    ));
    if (index >= 0) {
      character.ascensionPackages[index].wargearChoice = payload.ascensionPackageWargearOptionKey;
    }
  },
  removeCharacterAscensionPackage(state, payload) {
    const character = state.characters[payload.id];
    // remove the package from the ascension stacks
    character.ascensionPackages = character.ascensionPackages.filter((a) => (a.value !== payload.value));

    // remove all enhancements that are related to the package
    character.enhancements = character.enhancements.filter((e) => e.source === undefined || !e.source.startsWith(`ascension.${payload.key}`));

    character.keywords = character.keywords.filter((k) => k.source !== `ascension.${payload.key}`);

    // ToDo: remove all wargear that is related to the package
  },

  // Background
  setCharacterBackground(state, payload) {
    const character = state.characters[payload.id];
    const background = payload.content;
    console.info(`Background: ${background.label} selected.`);
    character.background.key = background.key;
    character.background.label = background.label;
    character.background.optionSelectedKey = background.optionSelectedKey;
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
      case 1:
        console.debug(`v1 -> v2 : Species with keys instead of labels`);

        const v1Species = character.species;
        const keyPrefix =
          ['Ratling', 'Ogryn'].some(i => i === v1Species.value)
          ? 'coreab'
          : 'core';
        let v2Species = {
          key:
            v1Species.value
            ? `${keyPrefix}-${v1Species.value.toLowerCase().split(' ').join('-')}`
            : undefined,
          label: v1Species.value ? v1Species.value : '',
          cost: v1Species.cost,
          value: v1Species.value,
        };
        character.species = v2Species;

        console.debug(`v1 -> v2 : Archetypes with keys instead of labels`);
        const v1archetype = character.archetype;
        const archetypeKeyPrefix = 'core';
        let v2archetype = {
          key:
            v1archetype.value
              ? `${archetypeKeyPrefix}-${v1archetype.value.toLowerCase().split(' ').join('-')}`
              : undefined,
          label: v1archetype.value ? v1archetype.value : '',
          cost: v1archetype.cost,
          value: v1archetype.value,
          tier: v1archetype.tier
        };
        character.archetype = v2archetype;

        console.debug(`v1 -> v2 : Backgrounds with keys instead of labels`);
        let v2background = getDefaultState().background;
        v2background.key = character.background ? character.background.toLowerCase() : undefined;
        v2background.label = character.background;
        character.background = v2background;

        const objIndex = character.keywords.findIndex((obj => obj.name === 'Adptus Astartes Telepathica'));
        if ( objIndex > 0 ) {
          character.keywords[objIndex].name = 'Adeptus Astra Telepathica';
        }

        console.debug(`v1 -> v2 : Cleanup enhancements that do NOT have a sources`);
        character.enhancements = character.enhancements.filter( (e) => e.source !== undefined);
        character.enhancements = character.enhancements.filter( (e) => e.source !== '');

        character.version = 2;
        console.info(`Character migrated to v2.`);
    }

  },
};

export const actions = {
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
    const characterVersion = character.version;
    const builderVersion = rootState.builderVersion;

    if ( characterVersion < builderVersion ) {
      console.info(`Migrate character from ${characterVersion} to ${characterVersion+1}`);
      const config = {
        characterId: character.id,
        currentVersion: characterVersion,
        targetVersion: characterVersion+1,
      };
      commit('migrate', config);
    }
  },
};

const getDefaultState = () => ({
  id: -1,
  version: 2,
  setting: undefined,
  settingSelected: true,
  settingTier: 3,
  settingTitle: '',
  settingHomebrewContent: [], // e.g. pax
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
  languages: [
    { name: 'Low Gothic', cost: 0, source: '' },
  ],
  keywords: [],
  talents: [],
  psychicPowers: [],
  ascensionPackages: [],
  wargear: [],
  background: {
    key: undefined, // e.g. goal
    label: '', // e.g. Goal
    optionSelectedKey: undefined, // e.g.
  },
  enhancements: [],
});
