export default {
  data() {
    return {
      attributeRepository: [
        {
          key: 'strength',
          name: 'Strength',
          description: 'Raw physical power.',
          order: 1,
        },
        {
          key: 'toughness',
          name: 'Toughness',
          description: 'Endurance and ability to shrug off damage.',
          order: 3,
        },
        {
          key: 'agility',
          name: 'Agility',
          description: 'Dexterity and coordination.',
          order: 2,
        },
        {
          key: 'initiative',
          name: 'Initiative',
          description: 'Refl exes and reaction speed.',
          order: 7,
        },
        {
          key: 'willpower',
          name: 'Willpower',
          description: 'Determination and strength of will.',
          order: 5,
        },
        {
          key: 'intellect',
          name: 'Intellect',
          description: 'Ability to process and interpret information.',
          order: 4,
        },
        {
          key: 'fellowship',
          name: 'Fellowship',
          description: 'Force of personality.',
          order: 6,
        },
      ],
      maximumBySpeciesRepository: [
        {
          name: 'Human',
          attributeMaximums: [
            { name: 'Strength', value: 8 },
            { name: 'Agility', value: 8 },
            { name: 'Toughness', value: 8 },
            { name: 'Intellect', value: 8 },
            { name: 'Willpower', value: 8 },
            { name: 'Fellowship', value: 8 },
            { name: 'Initiative', value: 8 },
          ],
          traitMaximums: [
            { name: 'Speed', value: 8 },
          ],
        },
        {
          name: 'Ork',
          attributeMaximums: [
            { name: 'Strength', value: 12 },
            { name: 'Agility', value: 7 },
            { name: 'Toughness', value: 12 },
            { name: 'Intellect', value: 7 },
            { name: 'Willpower', value: 8 },
            { name: 'Fellowship', value: 7 },
            { name: 'Initiative', value: 7 },
          ],
          traitMaximums: [
            { name: 'Speed', value: 7 },
          ],
        },
        {
          name: 'Eldar',
          attributeMaximums: [
            { name: 'Strength', value: 7 },
            { name: 'Agility', value: 12 },
            { name: 'Toughness', value: 7 },
            { name: 'Intellect', value: 10 },
            { name: 'Willpower', value: 12 },
            { name: 'Fellowship', value: 8 },
            { name: 'Initiative', value: 12 },
          ],
          traitMaximums: [
            { name: 'Speed', value: 10 },
          ],
        },
        {
          name: 'Adeptus Astartes',
          attributeMaximums: [
            { name: 'Strength', value: 10 },
            { name: 'Agility', value: 9 },
            { name: 'Toughness', value: 10 },
            { name: 'Intellect', value: 10 },
            { name: 'Willpower', value: 10 },
            { name: 'Fellowship', value: 8 },
            { name: 'Initiative', value: 9 },
          ],
          traitMaximums: [
            { name: 'Speed', value: 9 },
          ],
        },
        {
          name: 'Primaris Astartes',
          attributeMaximums: [
            { name: 'Strength', value: 12 },
            { name: 'Agility', value: 9 },
            { name: 'Toughness', value: 12 },
            { name: 'Intellect', value: 10 },
            { name: 'Willpower', value: 10 },
            { name: 'Fellowship', value: 8 },
            { name: 'Initiative', value: 9 },
          ],
          traitMaximums: [
            { name: 'Speed', value: 9 },
          ],
        },
      ],
      // https://api.sheety.co/669365df-fa15-4003-ad7d-21d86e11b69a
      skillRepository: [
        {
          key: 'athletics',
          name: 'Athletics',
          attribute: 'Strength',
          description: 'A character’s overall physical prowess',
        },
        {
          key: 'awareness',
          name: 'Awareness',
          attribute: 'Intellect',
          description: 'Notice additional details, or perceive hidden or obscured objects.',
        },
        {
          key: 'ballisticSkill',
          name: 'Ballistic Skill',
          attribute: 'Agility',
          description: undefined,
        },
        {
          key: 'cunning',
          name: 'Cunning',
          attribute: 'Fellowship',
          description: undefined,
        },
        {
          key: 'deception',
          name: 'Deception',
          attribute: 'Fellowship',
          description: undefined,
        },
        {
          key: 'insight',
          name: 'Insight',
          attribute: 'Fellowship',
          description: undefined,
        },
        {
          key: 'intimidation',
          name: 'Intimidation',
          attribute: 'Willpower',
          description: undefined,
        },
        {
          key: 'investigation',
          name: 'Investigation',
          attribute: 'Intellect',
          description: undefined,
        },
        {
          key: 'leadership',
          name: 'Leadership',
          attribute: 'Willpower',
          description: undefined,
        },
        {
          key: 'medicae',
          name: 'Medicae',
          attribute: 'Intellect',
          description: undefined,
        },
        {
          key: 'persuasion',
          name: 'Persuasion',
          attribute: 'Fellowship',
          description: 'convince',
        },
        {
          key: 'pilot',
          name: 'Pilot',
          attribute: 'Agility',
          description: undefined,
        },
        {
          key: 'psychicMastery',
          name: 'Psychic Mastery',
          attribute: 'Willpower',
          description: undefined,
        },
        {
          key: 'scholar',
          name: 'Scholar',
          attribute: 'Intellect',
          description: undefined,
        },
        {
          key: 'stealth',
          name: 'Stealth',
          attribute: 'Agility',
          description: undefined,
        },
        {
          key: 'survival',
          name: 'Survival',
          attribute: 'Willpower',
          description: undefined,
        },
        {
          key: 'tech',
          name: 'Tech',
          attribute: 'Intellect',
          description: undefined,
        },
        {
          key: 'weaponSkill',
          name: 'Weapon Skill',
          attribute: 'Initiative',
          description: undefined,
        },
      ],
      // https://api.sheety.co/2d702477-7a22-4d71-9c25-6119ee216253
      traitRepository: [
        {
          key: 'defence',
          name: 'Defence',
          attribute: 'Initiative',
          description: undefined,
          type: 'Combat',
          compute: { static: -1, multi: 1, addTier: false },
        },
        {
          key: 'resilience',
          name: 'Resilience',
          attribute: 'Toughness',
          description: undefined,
          type: 'Combat',
          compute: { static: 1, multi: 1, addTier: false },
        },
        {
          key: 'determination',
          name: 'Determination',
          attribute: 'Toughness',
          description: undefined,
          type: 'Combat',
          compute: { static: 0, multi: 1, addTier: false },
        },
        {
          key: 'maxWounds',
          name: 'Max Wounds',
          attribute: 'Toughness',
          description: undefined,
          type: 'Combat',
          compute: { static: 0, multi: 1, addTier: true },
        },
        {
          key: 'maxShock',
          name: 'Max Shock',
          attribute: 'Willpower',
          description: undefined,
          type: 'Combat',
          compute: { static: 0, multi: 1, addTier: true },
        },
        {
          key: 'conviction',
          name: 'Conviction',
          attribute: 'Willpower',
          description: undefined,
          type: 'Mental',
          compute: { static: 0, multi: 1, addTier: false },
        },
        {
          key: 'resolve',
          name: 'Resolve',
          attribute: 'Willpower',
          description: undefined,
          type: 'Mental',
          compute: { static: -1, multi: 1, addTier: false },
        },
        {
          key: 'influence',
          name: 'Influence',
          attribute: 'Fellowship',
          description: undefined,
          type: 'Social',
          compute: { static: -1, multi: 1, addTier: false },
        },
        {
          key: 'wealth',
          name: 'Wealth',
          attribute: undefined,
          description: undefined,
          type: 'Social',
          compute: { static: 0, multi: 1, addTier: true },
        },
        {
          key: 'speed',
          name: 'Speed',
          attribute: undefined,
          description: undefined,
          type: 'Combat',
          compute: { static: 0, multi: 1, addTier: false },
        },
        {
          key: 'corruption',
          name: 'Corruption',
          attribute: undefined,
          description: undefined,
          type: 'Mental',
          compute: { static: 0, multi: 1, addTier: false },
        },
        {
          key: 'passiveAwareness',
          name: 'Passive Awareness',
          attribute: undefined,
          skill: 'Awareness',
          description: undefined,
          type: 'Mental',
          compute: { static: 0, multi: 0.5, addTier: false },
        },
      ],
    };
  },
  methods: {
    getAttributeByKey(key) {
      return this.attributeRepository.find((a) => a.key === key);
    },
    getTraitByKey(key) {
      return this.traitRepository.find((a) => a.key === key);
    },
    getSkillByKey(key) {
      return this.skillRepository.find((s) => s.key === key);
    },
    getAttributeMaximumForSpecies(speciesName, attributeName) {
      const species = this.maximumBySpeciesRepository.find((species) => species.name === speciesName);
      const maximum = species.attributeMaximums.find((attribute) => attribute.name === attributeName);
      return (maximum) ? maximum.value : undefined;
    },
    getTraitMaximumForSpecies(speciesName, traitName) {
      const species = this.maximumBySpeciesRepository.find((species) => species.name === speciesName);
      const maximum = species.traitMaximums.find((trait) => trait.name === traitName);
      return (maximum) ? maximum.value : undefined;
    },
    getCreationAttributeArrayByTier() {
      return [
        [2, 2, 3, 3, 3, 3, 3],
        [3, 3, 3, 3, 4, 4, 4],
        [3, 4, 4, 4, 4, 4, 5],
        [4, 4, 4, 4, 5, 5, 6],
        [4, 4, 5, 6, 6, 6, 7],
      ];
    },
    getCreationAttributeArrayByTierExamples() {
      return [
        {
          strength: 2, agility: 3, toughness: 3, intellect: 3, fellowship: 3, willpower: 2, initiative: 3,
        },
        {
          strength: 3, agility: 4, toughness: 4, intellect: 3, fellowship: 3, willpower: 4, initiative: 3,
        },
        {
          strength: 3, agility: 4, toughness: 4, intellect: 4, fellowship: 4, willpower: 5, initiative: 4,
        },
        {
          strength: 4, agility: 6, toughness: 5, intellect: 4, fellowship: 4, willpower: 4, initiative: 5,
        },
        {
          strength: 4, agility: 7, toughness: 6, intellect: 4, fellowship: 5, willpower: 6, initiative: 6,
        },
      ];
    },
    getCreationSkillArrayByTier() {
      return [
        [2, 3, 3, 3, 4],
        [2, 3, 3, 3, 3, 4, 4, 5],
        [2, 3, 3, 3, 4, 4, 4, 4, 5, 5],
        [2, 2, 2, 3, 4, 4, 4, 5, 5, 5, 6],
        [3, 4, 4, 4, 4, 4, 4, 4, 5, 6, 6, 7],
      ];
    },
    getCreationSkillArrayByTierExamples() {
      return [
        {
          athletics: 2, awareness: 3, ballisticSkill: 4, persuasion: 3,
        },
      ];
    },
  },
};
