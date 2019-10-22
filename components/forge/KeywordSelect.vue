<template lang="html">

  <div>

    <v-select
      :value="value"
      @input="$emit('input', $event)"
      v-bind:label="label"
      v-bind:items="options"
      v-bind:hint="hint"
      item-text="name"
      item-value="name"
      persistent-hint
      solo
      dense
    ></v-select>

    <p
      v-if="effects"
      class="ma-4"
    >
      {{effects}}
    </p>

  </div>

</template>

<script lang="js">
  import KeywordRepository from '~/mixins/KeywordRepositoryMixin';

  export default {
  name: 'keyword-select',
  mixins: [KeywordRepository],
  props: {
    value: String,
    // the placeholderString or wildcard like <Any> or <Chapter> that defines the options
    placeholder: {
      type: String,
      required: true,
    },
    selection: {
      type: String,
      required: false,
      default: undefined,
    },
    // A list of Keyword names to exclude, use for already selected keywords or other causes
    // not in use currently
    exclude: {
      type: Array,
      required: false,
      default: () => { return []; },
    }
  },
  data() {
    return {
      selected: undefined,
    };
  },
  methods: {
    updateKeyword() {
      //this.$emit('changeKeyword', { placeholder: this.placeholder, selected: this.selected });
    },
  },
  computed: {
    // helper
    mergedKeywords() {
      return [...this.keywordRepository, ...this.keywordSubwordRepository];
    },
    // the options array containing potential replacements and their respective keyword
    options() {
      const placeholder = this.placeholder;

      let wordy= {};
      if ( placeholder.toLowerCase() === '<any>' ) {
        const levelOneKeywords = this.keywordRepository
          .filter(k => k.name.indexOf('<')<0)
          .filter(k => k.name.toLowerCase() !== placeholder.toLowerCase());
        wordy = { name: placeholder, options: levelOneKeywords, selected: '', };
      } else {
        const subKeywords = this.keywordSubwordRepository.filter(k => k.placeholder === placeholder);
        wordy = { name: placeholder, options: subKeywords, selected: '', };
      }

      return wordy.options;
    },
    label() {
      return `${this.placeholder} Keyword`;
    },
    hint() {
      if (this.value) {

        const keyword = this.value;
        const parentKeyword = this.placeholder;

        let foundKeyword = this.mergedKeywords.find(k => k.name === keyword);
        if (foundKeyword !== undefined) {
          return foundKeyword.description;
        }

        foundKeyword = this.mergedKeywords.find(k => k.name === parentKeyword);
        if (foundKeyword !== undefined) {
          return foundKeyword.description;
        }

      }
      return '';
    },
    effects() {
      if (this.value) {
        let foundKeyword = this.keywordSubwordRepository.find(k => k.name === this.value);
        if (foundKeyword !== undefined) {
          return foundKeyword.effect;
        }
      }
      return undefined;
    },
  },
};
</script>

<style scoped lang="css">

</style>
