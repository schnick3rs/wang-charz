<template>

  <v-footer
   dark
   class="caption"
  >
    <span>&copy; {{ new Date().getFullYear() }} Doctors of Doom</span>
    <v-spacer></v-spacer>
    <span><a href="/about">About & Private Policy</a></span>
  </v-footer>

</template>

<script>
export default {
  name: 'DefaultFooter',
};
</script>
