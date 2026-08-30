<script setup lang="ts">
import type {AuthFormField, FormSubmitEvent} from '@nuxt/ui'
import {z} from "zod";

const supabase = useSupabaseClient()
const email = ref('')
const password = ref('')
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
}, {
  name: 'remember',
  label: 'Remember me',
  type: 'checkbox'
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

async function signIn(payload: FormSubmitEvent<Schema>) {
  console.log('Submitted', payload)
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
  <div class="flex justify-center">

    <UPageCard class="w-full max-w-md">
      <UAuthForm
          :schema="schema"
          title="Login"
          description="Enter your credentials to access your account."
          icon="i-lucide-user"
          :fields="fields"
          :providers="providers"
          @submit="signIn"
      />
    </UPageCard>

  </div>

</template>