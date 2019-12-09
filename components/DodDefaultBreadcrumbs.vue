<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-row justify="center">
    <v-col :cols="12" class="elevation-4 mb-2 pa-0 ma-0">
      <v-breadcrumbs
        :items="items"
        class="pa-2"
      >
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item
            :nuxt="true"
            :to="item.to"
            :disabled="item.disabled"
            :exact="item.exact"
          >
            <img v-if="item.to == '/'" src="/favicon-16x16.png">
            {{ item.text }}
          </v-breadcrumbs-item>
        </template>

        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'DodDefaultBreadcrumbs',
  props: {
    items: Array,
  },
};
</script>
