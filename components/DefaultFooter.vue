<template>
  <v-footer :app="true" class="pa-2" dark>
    <v-spacer></v-spacer>
    <v-btn v-if="false" nuxt to="/private-policy">Private Policy</v-btn>
    <v-btn nuxt to="/about">About</v-btn>
    <div>&copy; {{ new Date().getFullYear() }} Doctors of Doom</div>
  </v-footer>
</template>

<script>
export default {
  name: 'DefaultFooter',
};
</script>
