export default {
  data() {
    const core = [
      {
        key: 'sanctionedPsyker',
        psychicPowers: {
          discount: [
            { name: 'smite', selected: 'Smite', filter: (power) => (power.name === 'Smite') },
            { name: 'minor', selected: undefined, filter: (power) => (['Minor'].includes(power.discipline)) },
          ],
          access: [
            'Minor',
            'Biomancy',
            'Divination',
            'Pyromancy',
            'Telekinesis',
            'Telepathy',
            'Universal',
          ],
        },
      },
      {
        key: 'roguePsyker',
        psychicPowers: {
          discount: [
            { name: 'smite', selected: 'Smite', filter: (power) => (power.name === 'Smite') },
            {
              name: 'minor',
              selected: undefined,
              filter: (power) => (['Minor'].includes(power.discipline)),
            },
          ],
          access: [
            'Minor',
            'Biomancy',
            'Divination',
            'Pyromancy',
            'Telekinesis',
            'Telepathy',
            'Maleficarum',
            'Universal',
          ],
        },
      },
      {
        key: 'warlock',
        psychicPowers: {
          discount: [
            { name: 'psyniscience', selected: 'Psyniscience', filter: (power) => (power.name === 'Psyniscience') },
            { name: 'smite', selected: 'Smite', filter: (power) => (power.name === 'Smite') },
          ],
          access: [
            'Minor',
            'Biomancy',
            'Divination',
            'Pyromancy',
            'Telekinesis',
            'Telepathy',
            'Universal',
            'Runes of Battle',
          ],
        },
      },
    ];

    return {
      archetypePsychicPowersRepository: [
        ...core,
      ],
    };
  },
  methods: {
    getPsychicPowerOptionsByArchetypeKey(key) {
      return this.archetypePsychicPowersRepository.find((item) => item.key === key);
    },
  },
};
