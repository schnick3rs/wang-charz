<template lang="html">

  <v-card v-if="item">

    <v-card-title primary-title>
      <div>
        <div class="headline">{{ item.name }}</div>
        <span class="grey--text">{{ item.hint }}</span>
      </div>
    </v-card-title>

    <v-divider /> 

    <v-card-text class="mt-2">

      <p class="text-lg-justify">
        {{ item.description }}
      </p>

      <span class="mt-2 grey--text">Bonus</span>
      <v-divider class="mb-2"></v-divider>
      <p class="text-lg-justify">{{ item.bonus }}</p>

    </v-card-text>
    
    <v-divider /> 

    <v-card-actions v-if="chooseMode">      
      <v-btn left outlined color="red" v-on:click="$emit('cancel')" >Cancel</v-btn>
      <v-spacer />
      <v-btn right color="green" v-on:click="$emit('select', item)" >Select Background</v-btn>
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
