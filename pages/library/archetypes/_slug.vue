<template>

  <v-row justify="center">

    <v-col v-bind:cols="12" v-bind:sm="10">

      <archetype-preview v-bind:item="item"></archetype-preview>

    </v-col>

  </v-row>

</template>

<script>
import ArchetypePreview from '~/components/forge/ArchetypePreviewV2';
export default {
  name: "_slug",
  components: { ArchetypePreview },
  async asyncData({ params, $axios, error }) {
    const slug = params.slug;

    const response = await $axios.get(`/api/archetypes/${slug}`);
    const item = response.data;

    if ( item === undefined || item.length <= 0 ) {
      error({ statusCode: 404, message: 'Archetype not found' });
    }

    return {
      item: item,
      slug: slug,
    };
  },
}
</script>

<style scoped>

</style>
