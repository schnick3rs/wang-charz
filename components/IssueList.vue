<template>
  <v-col>
    <v-alert
      v-for="item in items"
      :key="item"
      type="info"
      outlined
      text
      dense
      elevation="4"
    >
      <strong>Open ToDos: </strong>{{ item }}
    </v-alert>
  </v-col>
</template>

<script>
export default {
  name: 'IssueList',
  props: {
    items: {
      type: Array,
      default: [],
    },
  },
};
</script>
