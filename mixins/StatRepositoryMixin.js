export default {
  data() {
    return {
      // https://api.sheety.co/ff93c641-c553-4379-85c0-ca2acd417333
      attributeRepository: [
        {
          "key": "strength",
          "name": "Strength",
          "description": "Raw physical power.",
          "order": 1
        },
        {
          "key": "agility",
          "name": "Agility",
          "description": "Dexterity and coordination.",
          "order": 2
        },
        {
          "key": "toughness",
          "name": "Toughness",
          "description": "Endurance and ability to shrug off damage.",
          "order": 3
        },
        {
          "key": "intellect",
          "name": "Intellect",
          "description": "Ability to process and interpret information.",
          "order": 4
        },
        {
          "key": "willpower",
          "name": "Willpower",
          "description": "Determination and strength of will.",
          "order": 5
        },
        {
          "key": "fellowship",
          "name": "Fellowship",
          "description": "Force of personality.",
          "order": 6
        },
        {
          "key": "initiative",
          "name": "Initiative",
          "description": "Refl exes and reaction speed.",
          "order": 7
        }
      ],
      maximumBySpeciesRepository: [
        {
          name: 'Human',
          attributeMaximums: [
            { name: 'Strength', value: 8, },
            { name: 'Agility', value: 8, },
            { name: 'Toughness', value: 8, },
            { name: 'Intellect', value: 8, },
            { name: 'Willpower', value: 8, },
            { name: 'Fellowship', value: 8, },
            { name: 'Initiative', value: 8, },
          ],
          traitMaximums: [
            { name: 'Speed', value: 8, },
          ],
        },
        {
          name: 'Ork',
          attributeMaximums: [
            { name: 'Strength', value: 12, },
            { name: 'Agility', value: 7, },
            { name: 'Toughness', value: 12, },
            { name: 'Intellect', value: 7, },
            { name: 'Willpower', value: 8, },
            { name: 'Fellowship', value: 7, },
            { name: 'Initiative', value: 7, },
          ],
          traitMaximums: [
            { name: 'Speed', value: 7, },
          ],
        },
        {
          name: 'Eldar',
          attributeMaximums: [
            { name: 'Strength', value: 7, },
            { name: 'Agility', value: 12, },
            { name: 'Toughness', value: 7, },
            { name: 'Intellect', value: 10, },
            { name: 'Willpower', value: 12, },
            { name: 'Fellowship', value: 8, },
            { name: 'Initiative', value: 12, },
          ],
          traitMaximums: [
            { name: 'Speed', value: 10, },
          ],
        },
        {
          name: 'Adeptus Astartes',
          attributeMaximums: [
            { name: 'Strength', value: 10, },
            { name: 'Agility', value: 9, },
            { name: 'Toughness', value: 10, },
            { name: 'Intellect', value: 10, },
            { name: 'Willpower', value: 10, },
            { name: 'Fellowship', value: 8, },
            { name: 'Initiative', value: 9, },
          ],
          traitMaximums: [
            { name: 'Speed', value: 9, },
          ],
        },
        {
          name: 'Primaris Astartes',
          attributeMaximums: [
            { name: 'Strength', value: 12, },
            { name: 'Agility', value: 9, },
            { name: 'Toughness', value: 12, },
            { name: 'Intellect', value: 10, },
            { name: 'Willpower', value: 10, },
            { name: 'Fellowship', value: 8, },
            { name: 'Initiative', value: 9, },
          ],
          traitMaximums: [
            { name: 'Speed', value: 9, },
          ],
        },
      ],
      // https://api.sheety.co/669365df-fa15-4003-ad7d-21d86e11b69a
      skillRepository: [
        {
          "key": "athletics",
          "name": "Athletics",
          "attribute": "Strength",
          "description": "A character’s overall physical prowess"
        },
        {
          "key": "awareness",
          "name": "Awareness",
          "attribute": "Intellect",
          "description": "Notice additional details, or perceive hidden or obscured objects."
        },
        {
          "key": "ballisticSkill",
          "name": "Ballistic Skill",
          "attribute": "Agility",
          "description": null
        },
        {
          "key": "cunning",
          "name": "Cunning",
          "attribute": "Fellowship",
          "description": null
        },
        {
          "key": "deception",
          "name": "Deception",
          "attribute": "Fellowship",
          "description": null
        },
        {
          "key": "insight",
          "name": "Insight",
          "attribute": "Fellowship",
          "description": null
        },
        {
          "key": "intimidation",
          "name": "Intimidation",
          "attribute": "Willpower",
          "description": null
        },
        {
          "key": "investigation",
          "name": "Investigation",
          "attribute": "Intellect",
          "description": null
        },
        {
          "key": "leadership",
          "name": "Leadership",
          "attribute": "Fellowship",
          "description": null
        },
        {
          "key": "medicae",
          "name": "Medicae",
          "attribute": "Intellect",
          "description": null
        },
        {
          "key": "persuasion",
          "name": "Persuasion",
          "attribute": "Fellowship",
          "description": "convince"
        },
        {
          "key": "pilot",
          "name": "Pilot",
          "attribute": "Agility",
          "description": null
        },
        {
          "key": "psychicMastery",
          "name": "Psychic Mastery",
          "attribute": "Willpower",
          "description": null
        },
        {
          "key": "scholar",
          "name": "Scholar",
          "attribute": "Intellect",
          "description": null
        },
        {
          "key": "stealth",
          "name": "Stealth",
          "attribute": "Agility",
          "description": null
        },
        {
          "key": "survival",
          "name": "Survival",
          "attribute": "Willpower",
          "description": null
        },
        {
          "key": "tech",
          "name": "Tech",
          "attribute": "Intellect",
          "description": null
        },
        {
          "key": "weaponSkill",
          "name": "Weapon Skill",
          "attribute": "Initiative",
          "description": null
        }
      ],
      // https://api.sheety.co/2d702477-7a22-4d71-9c25-6119ee216253
      traitRepository: [
        {
          "key": "defence",
          "name": "Defence",
          "attribute": "Initiative",
          "description": null,
          "type": "Combat"
        },
        {
          "key": "resilience",
          "name": "Resilience",
          "attribute": "Toughness",
          "description": null,
          "type": "Combat"
        },
        {
          "key": "soak",
          "name": "Soak",
          "attribute": "Toughness",
          "description": null,
          "type": "Combat"
        },
        {
          "key": "wounds",
          "name": "Wounds",
          "attribute": "Toughness",
          "description": null,
          "type": "Combat"
        },
        {
          "key": "shock",
          "name": "Shock",
          "attribute": "Willpower",
          "description": null,
          "type": "Combat"
        },
        {
          "key": "conviction",
          "name": "Conviction",
          "attribute": "Willpower",
          "description": null,
          "type": "Mental"
        },
        {
          "key": "resolve",
          "name": "Resolve",
          "attribute": "Willpower",
          "description": null,
          "type": "Mental"
        },
        {
          "key": "influence",
          "name": "Influence",
          "attribute": "Fellowship",
          "description": null,
          "type": "Social"
        },
        {
          "key": "wealth",
          "name": "Wealth",
          "attribute": "Fellowship",
          "description": null,
          "type": "Social"
        },
        {
          "key": "speed",
          "name": "Speed",
          "attribute": "Agility",
          "description": null,
          "type": "Combat"
        },
        {
          "key": "corruption",
          "name": "Corruption",
          "attribute": "Willpower",
          "description": null,
          "type": "Mental"
        },
        {
          "key": "passiveAwareness",
          "name": "Passive Awareness",
          "attribute": "Intellect",
          "description": null,
          "type": "Mental"
        }
      ]
    }
  },
  methods: {
    getAttributeByKey(key) {
      return this.attributeRepository.find(a => a.key === key);
    },
    getSkillByKey(key) {
      return this.skillRepository.find(s => s.key === key);
    },
    getAttributeMaximumForSpecies(speciesName, attributeName) {
      const species = this.maximumBySpeciesRepository.find( species => species.name === speciesName );
      const maximum = species.attributeMaximums.find( attribute => attribute.name === attributeName );
      return (maximum) ? maximum.value : undefined;
    },
    getTraitMaximumForSpecies(speciesName, traitName) {
      const species = this.maximumBySpeciesRepository.find( species => species.name === speciesName );
      const maximum = species.traitMaximums.find( trait => trait.name === traitName );
      return (maximum) ? maximum.value : undefined;
    },
  },
};
