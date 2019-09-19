<template lang="html">

  <v-card v-if="item">

    <v-card-title primary-title>
      <div>
        <div class="headline">{{ item.name }}</div>
        <span class="grey--text">{{ item.hint }}</span>
      </div>
    </v-card-title>

    <v-card-text>

      <p class="text-lg-justify">
        {{ item.description }}
      </p>

      <span class="mt-2 grey--text">Bonus</span>
      <v-divider class="mb-2"></v-divider>
      <p class="text-lg-justify">{{ item.bonus }}</p>

    </v-card-text>

    <v-card-actions v-if="chooseMode">
      <v-btn block color="green" @click="$emit('select', item)" >Select Background</v-btn>
      <v-btn block color="red" @click="$emit('cancel')" >Cancel</v-btn>
    </v-card-actions>

  </v-card>

</template>

<script lang="js">
export default {
  name: 'background-preview',
  props: {
    item: {
      type: Object,
      required: true,
    },
    chooseMode: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
    };
  },
  methods: {
  },
  computed: {
  },
};
</script>

<style scoped lang="css">

</style>
