export default {
  data() {
    return {
      unalignedSpeciesOptions : [
        {
          key: 'core-unaligned-human',
          name: 'Unaligned Human',
          species: 'core-human',
          keywords: ['[Any]', '[Any]'],
        },
        {
          key: 'core-unaligned-adeptus-astartes',
          name: 'Unaligned Adeptus Astartes',
          species: 'core-adeptius-astartes',
          keywords: ['Imperium', 'Adeptus Astartes', '[Chapter]'],
        },
        {
          key: 'core-unaligned-heretic-astartes',
          name: 'Unaligned Heretic Astartes',
          species: 'core-adeptus-astartes',
          keywords: ['Chaos', 'Adeptus Astartes', '[Chapter]'],
        },
        {
          key: 'core-unaligned-primaris-astartes',
          name: 'Unaligned Primaris Astartes',
          species: 'core-primaris-astartes',
          keywords: ['Imperium', 'Adeptus Astartes', '[Chapter]', 'Primaris'],
        },
        {
          key: 'core-unaligned-aeldari-corsair',
          name: 'Unaligned Aeldari Corsair',
          species: 'core-aeldari',
          keywords: ['Aeldari', 'Annhrathe', '[Coterie]'],
        },
        {
          key: 'core-unaligned-craftworld-aeldari',
          name: 'Unaligned Craftworld Aeldari',
          species: 'core-aeldari',
          keywords: ['Aeldari', 'Asuryani', '[Craftworld]'],
        },
        {
          key: 'unaligned-ork',
          name: 'Unaligned Ork',
          species: 'core-ork',
          keywords: ['Ork', '[Clan]'],
        },
      ],
      advancedWargearOptions: [
        {
          tier: 1,
          total: 15,
          max: 7,
          rarity: { rare: 0, veryRare: 0, unique: 0 },
          wargearString: 'Spend 15 points (max 7 per item) for Common and Uncommon Items.',
        },
        {
          tier: 2,
          total: 20,
          max: 9,
          rarity: { rare: 2, veryRare: 0, unique: 0 },
          wargearString: 'Spend 20 points (max 9 per item) for Common and Uncommon Items. You can by up to two Rare items.',
        },
        {
          tier: 3,
          total: 25,
          max: 10,
          rarity: { rare: 2, veryRare: 1, unique: 0 },
          wargearString: 'Spend 25 points (max 10 per item) for Common and Uncommon Items. You can by up to one Very Rare item.',
        },
        {
          tier: 4,
          total: 30,
          max: undefined,
          rarity: { rare: 2, veryRare: 2, unique: 0 },
          wargearString: 'Spend 25 points for Common and Uncommon Items. You can by up to two Very Rare items.',
        },
        //{ tier: 5, total: 35, max: undefined, maxRarity: 'Unique', maxRarityItems: 1 },
      ],
    };
  },
  methods: {
    getAdvancedWargearOptionByTier(tier) {
      return this.advancedWargearOptions.find((option) => option.tier === tier);
    }
  },
};
