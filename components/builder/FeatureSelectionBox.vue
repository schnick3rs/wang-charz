<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>

    <v-card
      @click="expand = !expand"
      tile

      :dark="expand ? true : false"
      :color="expand ? 'primary' : ''"
    >
      <v-card-text>
        <!--<v-icon v-if="expandable">{{ expand ? 'expand_less' : 'expand_more' }}</v-icon>-->
        <div class="subtitle-1">{{ title }}</div>
        <div class="body-2">{{ subtitle }}</div>
      </v-card-text>
    </v-card>

    <v-card
      v-if="expandable && expand"
      outlined tile
    >
      <v-card-text>
        <slot></slot>
      </v-card-text>
    </v-card>

  </div>
</template>

<script>
  export default {
    name: "feature-selection-box",
    props: {
      title: '',
      subtitle: '',
      expandable: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        expand: false
      };
    },
  }
</script>

<style scoped>

</style>
