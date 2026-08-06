<script setup lang="ts">
const supabase = useSupabaseClient()
const email = ref('')
const password = ref('')
const errorMsg = ref('')

async function signIn() {
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })
  if (error) errorMsg.value = error.message
  else await navigateTo('/characters')
}

async function signInWithGoogle() {
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${location.origin}/confirm` },
  })
}
</script>

<template>
  <form @submit.prevent="signIn">
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button type="submit">Log in</button>
    <p v-if="errorMsg">{{ errorMsg }}</p>
  </form>
  <button @click="signInWithGoogle">Continue with Google</button>
</template>