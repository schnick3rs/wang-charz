<template lang="html">

  <section class="ascension-selection">

    <v-container grid-list-md>

      <v-layout justify-center row wrap>


      </v-layout>

    </v-container>

  </section>

</template>

<script lang="js">
  import AscensionRepositoryMixin from '../mixins/AscensionRepositoryMixin';
  import KeywordRepositoryMixin from '../mixins/KeywordRepositoryMixin';

  export default {
  name: 'ascension-selection',
  props: [],
  mixins: [
    AscensionRepositoryMixin,
    KeywordRepositoryMixin,
  ],
  data() {
    return {};
  },
  methods: {
    keywordOptions(wildcard) {
      if (wildcard === '<Any>') {
        // return all but the any keyword
        return this.keywordRepository.filter(k => k.name !== '<Any>');
      }
      return this.keywordRepository.filter(k => k.name === wildcard);
    },
    subKeywordOptions(placeholder) {
      return this.keywordSubwordRepository.filter(k => k.placeholder === placeholder);
    },
  },
  computed: {

  },
};
</script>

<style scoped lang="css">
  .ascension-selection {

  }
</style>
