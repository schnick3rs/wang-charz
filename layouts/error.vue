<template>
  <v-app dark>

    <v-container>
      <v-row justify="center">
        <v-col :cols="12" :md="8" class="text-center">
          <div v-if="error.statusCode === 404">
            <h1>I register a Code 404 violation!</h1>
            <p>
              This area is non existing, and thus to dangerous to explore.
              Please move along, citizen.
            </p>
          </div>
          <div v-else>
            <h1>Stop right here, heretic!</h1>
            <p>
              Something went wrong, and until I figure out who is responsible,
              you better check out a different page.
            </p>
          </div>
          <NuxtLink to="/">
            Home page
          </NuxtLink>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  head() {
    const title = this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An unexpected error occurred',
    };
  },
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
