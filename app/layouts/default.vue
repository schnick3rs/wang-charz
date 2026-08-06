<script setup lang="ts">
const user = useSupabaseUser()
const supabase = useSupabaseClient()

const showMenu = ref(false)

const displayName = computed(() =>
    user.value?.user_metadata?.full_name
    || user.value?.user_metadata?.name
    || user.value?.email
    || ''
)

const avatarUrl = computed(() =>
    user.value?.user_metadata?.avatar_url
    || user.value?.user_metadata?.picture
    || null
)

const initials = computed(() =>
    displayName.value.slice(0, 2).toUpperCase()
)

async function logout() {
  showMenu.value = false
  await supabase.auth.signOut()
  await navigateTo('/')
}
</script>

<template>
  <div>

    <header class="site-header">
      <NuxtLink to="/" class="logo">Doctors of Doom</NuxtLink>

      <nav>
        <template v-if="user">
          <div class="user-menu" @click="showMenu = !showMenu">
            <img v-if="avatarUrl" :src="avatarUrl" :alt="displayName" class="avatar" />
            <div v-else class="avatar avatar-fallback">{{ initials }}</div>
            <span class="name">{{ displayName }}</span>

            <div v-if="showMenu" class="dropdown">
              <NuxtLink to="/forge" @click="showMenu = false">The Forge</NuxtLink>
              <button @click="logout">Log out</button>
            </div>
          </div>
        </template>

        <template v-else>
          <NuxtLink to="/login">Log in</NuxtLink>
        </template>
      </nav>
    </header>
    <slot />
  </div>
</template>

<style scoped>
.site-header { display: flex; justify-content: space-between; align-items: center; padding: 1rem; }
.user-menu { position: relative; display: flex; align-items: center; gap: 0.5rem; cursor: pointer; }
.avatar { width: 32px; height: 32px; border-radius: 50%; object-fit: cover; }
.avatar-fallback { background: #444; color: white; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; }
.dropdown { position: absolute; top: 100%; right: 0; background: white; border: 1px solid #ddd; padding: 0.5rem; display: flex; flex-direction: column; min-width: 150px; }
</style>