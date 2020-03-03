<template lang="html">
    <nuxt-child />
</template>

<script lang="js">
export default {
  name: 'Ascension',
  layout: 'forge',
  props: [],
  head() {
    return {
      title: 'Select Ascension Package',
    };
  },

  data() {
    return {
    };
  },
  computed: {
    sources() {
      return [
        'core',
        'coreab',
        ...this.settingHomebrews
      ];
    },
    settingHomebrews() {
      return this.$store.getters['characters/characterSettingHomebrewsById'](this.characterId);
    },
    effectiveCharacterTier() {
      return this.$store.getters['characters/characterEffectiveTierById'](this.characterId);
    },

    settingTier() {
      return this.$store.getters['characters/characterSettingTierById'](this.characterId);
    },
  },
};
</script>

<style scoped lang="css">
</style>
