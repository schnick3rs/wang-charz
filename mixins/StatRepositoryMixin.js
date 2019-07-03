export default {
  data() {
    return {
      // https://api.sheety.co/ff93c641-c553-4379-85c0-ca2acd417333
      attributeRepository: [
        {
          "key": "strength",
          "name": "Strength",
          "description": null,
          "order": 1
        },
        {
          "key": "agility",
          "name": "Agility",
          "description": null,
          "order": 2
        },
        {
          "key": "toughness",
          "name": "Toughness",
          "description": null,
          "order": 3
        },
        {
          "key": "intellect",
          "name": "Intellect",
          "description": null,
          "order": 4
        },
        {
          "key": "fellowship",
          "name": "Fellowship",
          "description": null,
          "order": 5
        },
        {
          "key": "willpower",
          "name": "Willpower",
          "description": null,
          "order": 6
        },
        {
          "key": "initiative",
          "name": "Initiative",
          "description": null,
          "order": 7
        }
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
  }
};
