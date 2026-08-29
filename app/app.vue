<template>
  <UApp :toaster="toaster" >
    <NuxtLoadingIndicator/>

    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>

  </UApp>

</template>

<script setup lang="ts">
const toaster: any = {position: 'bottom-right'}
</script>
