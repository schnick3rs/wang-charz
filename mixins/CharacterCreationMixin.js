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
    };
  },
  methods: {

  },
};
