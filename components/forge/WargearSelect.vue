<template lang="html">

  <div>

    <v-dialog
      v-model="dialog"
      width="600px"
      scrollable
    >
      <v-card>
        <v-card-text class="mt-4">
          <wargear-search
            v-bind:repository="repository"
            v-on:select="selectWargear"
          />
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-card>
      <v-card-text>
      <v-btn
        dense
        right
        small
        color="info"
        v-on:click.stop="dialog = true"
      >Select item</v-btn>
        <span class="ml-4">{{ item }}</span>
      </v-card-text>
    </v-card>

  </div>

</template>

<script lang="js">
import WargearSearch from '~/components/forge/WargearSearch.vue';

export default {
  name: 'wargear-select',
  components: { WargearSearch },
  props: {
    repository: Array,
    value: String,
    item: String,
    selection: {
      type: String,
      required: false,
      default: undefined,
    },
  },
  data() {
    return {
      dialog: false,
      selected: undefined,
    };
  },
  methods: {
    selectWargear(payload) {
      this.$emit('input', payload.name);
      this.dialog = false;
    }
  },
  computed: {
    // helper
    mergedKeywords() {
      return [...this.keywordRepository, ...this.keywordSubwordRepository];
    },
    // the options array containing potential replacements and their respective keyword
    options() {
      const placeholder = this.placeholder;

      let wordy = {};
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
