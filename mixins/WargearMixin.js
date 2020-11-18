export default {
  methods: {
    filterWargear(
      repository = [],
      filters = {},
      settingTier = 5,
      ascension = {targetTier:0}
    ) {
      const { valueFilter, rarityFilter, typeFilter, subtypeFilter, triptypeFilter, keywordFilter, traitFilter } = filters;
      return repository.filter( (gear) => {
        let valueReq = true;
        if ( valueFilter ) {
          let maxValue = 0;
          maxValue += valueFilter.fixedValue ? valueFilter.fixedValue : 0;
          maxValue += valueFilter.useSettingTier ? settingTier : 0;
          //maxValue += valueFilter.useCharacterTier ? this.settingTier : 0;
          maxValue += valueFilter.useAscensionTargetTier ? ascension.targetTier : 0;
          valueReq = gear.value <= maxValue;
        }
        const rarityReq = rarityFilter ? rarityFilter.includes(gear.rarity) : true;
        const typeReq = typeFilter ? typeFilter.includes(gear.type) : true;
        const subtypeReq = subtypeFilter ? (gear.subtype && gear.subtype !== null ? gear.subtype.includes(subtypeFilter) : false ) : true;
        const triptypeReq = triptypeFilter ? (gear.triptype && gear.triptype !== null ? gear.triptype.includes(triptypeFilter) : false ) : true;
        const keywordReq = keywordFilter ? (gear.keywords ? gear.keywords.includes(keywordFilter) : false) : true;
        const traitReq = traitFilter ? gear.meta[0]?.traits.some((t) => traitFilter.includes.trait) : true;
        return valueReq && rarityReq && typeReq && subtypeReq && triptypeReq && keywordReq && traitReq;
      });
    },
  },
};
