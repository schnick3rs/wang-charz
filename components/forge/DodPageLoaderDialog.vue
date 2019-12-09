<template>
  <v-dialog
    v-model="show"
    transition="false"
    persistent
    width="300"
    :no-click-animation="true"
  >
    <v-card
      dark
      min-height="300"
    >
      <v-card-text>
        <v-progress-circular indeterminate color="success" size="128" width="12" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DodPageLoaderDialog',
  props: {
    show: true,
  },
};
</script>

<style scoped>

</style>
