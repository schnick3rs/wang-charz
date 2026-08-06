<script setup lang="ts">
const user = useSupabaseUser()

watch(user, () => {
  if (user.value) {
    navigateTo('/forge/characters')
  }
}, { immediate: true })
</script>

<template>
  <div>Signing you in…</div>
</template>