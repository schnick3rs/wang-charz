<script setup lang="ts">
import type {AuthFormField, FormSubmitEvent} from '@nuxt/ui'
import {z} from "zod";

const supabase = useSupabaseClient()
const errorMsg = ref('')

const fields: AuthFormField[] = [{
  name: 'email',
  type: 'email',
  label: 'Email',
  placeholder: 'Enter your email',
  required: true
}, {
  name: 'password',
  label: 'Password',
  type: 'password',
  placeholder: 'Enter your password',
  required: true
}]

const providers = [{
  label: 'Google',
  icon: 'i-simple-icons-google',
  onClick: () => {
    signInWithGoogle()
  }
}]

const schema = z.object({
  email: z.email('Invalid email'),
  password: z.string('Password is required').min(8, 'Must be at least 8 characters')
})
type Schema = z.output<typeof schema>

async function signUp(payload: FormSubmitEvent<Schema>) {
  console.log('Submitted', payload)
  const { error } = await supabase.auth.signUp({
    email: payload.data.email,
    password: payload.data.password,
    options: {
      emailRedirectTo: 'https://primaris.doctors-of-doom/',
    },
  })
  if (error) errorMsg.value = error.message
  else await navigateTo('/login')
}

async function signInWithGoogle() {
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${location.origin}/confirm` },
  })
}
</script>

<template>
  <div class="flex justify-center">

    <UPageCard class="w-full max-w-md">
      <UAuthForm
          :schema="schema"
          :fields="fields"
          :providers="providers"
          title="Sign Up"
          description="Enter your credentials to access your account."
          icon="i-lucide-user"
          @submit="signUp"
      />
      <template #validation>
        <UAlert color="error" icon="i-lucide-info" title="Error signing in" :description="errorMsg" />
      </template>
    </UPageCard>

  </div>

</template>