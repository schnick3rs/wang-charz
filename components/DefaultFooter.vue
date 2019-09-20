<template>

  <v-footer
   app   
   dark
   class="font-weight-medium"
  >
    <v-spacer></v-spacer>
    <span>&copy; {{ new Date().getFullYear() }} Doctors of Doom</span>
  </v-footer>

</template>

<script>
export default {
  name: 'DefaultFooter',
};
</script>
