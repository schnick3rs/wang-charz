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
  <UContainer>

    <UForm @submit="signIn">

      <UFormField label="Email" type="email" required >
        <UInput v-model="email" label="EMail" type="email" />
      </UFormField>

      <UFormField label="Password" type="password" required >
        <UInput v-model="password" label="Password" type="password" />
      </UFormField>

      <UButton type="submit" color="neutral">Sign in</UButton>
    </UForm>

    <USeparator />

    <UButton @click="signInWithGoogle" variant="outline" color="neutral" icon="i-mdi-google">Continue with Google</UButton>

    <UAlert v-if="errorMsg">{{ errorMsg }}</UAlert>

  </UContainer>

</template>