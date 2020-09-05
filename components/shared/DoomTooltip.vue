<template>
  <div
      class="doom-tooltip"
      :style="{ left: position.x, top: position.y }"
  >
    <v-card v-if="loading" dark color="success" class="text-center">
      <v-progress-circular indeterminate />
    </v-card>
    <v-card v-else raised dark color="success" elevation="6">
      <v-card-title class="doom-tooltip__header">
        {{ title }}
      </v-card-title>
      <v-card-subtitle>{{ type }}</v-card-subtitle>
      <v-card-text class="doom-tooltip__content">
        <slot></slot>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang=js>
export default {
  name: 'DoomTooltip',
  props: {
    position: {
      type: Object,
      required: true,
    },
    title: String,
    type: String,
    loading: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss">

.doom-tooltip {

  z-index: 1;
  position: absolute;
  min-width: 450px;
  max-width: 450px;
  min-height: 100px;

  &__container {
  }

  &__header {

  }
  &__content {
    padding-top: 10px;
  }
}

</style>
