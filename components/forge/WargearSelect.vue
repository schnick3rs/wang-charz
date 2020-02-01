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
            :repository="repository"
            @select="selectWargear"
          />
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-card>
      <v-card-text align="start">
        <v-btn
          dense

          small
          color="info"
          @click.stop="dialog = true"
        >
          Select item
        </v-btn>
        <span class="ml-4">{{ item }}</span>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="js">
import WargearSearch from '~/components/forge/WargearSearch.vue';

export default {
  name: 'WargearSelect',
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
      this.$emit('input', payload);
      this.dialog = false;
    },
  },
};
</script>

<style scoped lang="css">

</style>
