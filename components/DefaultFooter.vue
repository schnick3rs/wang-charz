<template>
  <v-footer
    dark
    class="caption"
    style="background-color: #424242;"
  >
    <span>&copy; {{ new Date().getFullYear() }}&nbsp;Doctors of Doom</span>
    <v-spacer />
    <span><a href="/about">About & Private Policy</a></span>
  </v-footer>
</template>

<script>
export default {
  name: 'DefaultFooter',
};
</script>
