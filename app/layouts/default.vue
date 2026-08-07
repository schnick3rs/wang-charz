<script setup lang="ts">
import type {DropdownMenuItem, NavigationMenuItem} from '@nuxt/ui'

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

async function logout() {
  showMenu.value = false
  await supabase.auth.signOut()
  await navigateTo('/')
}

const navItems = ref<NavigationMenuItem[]>([
  {
    label: 'Create',
    icon: 'i-game-icons-gear-hammer',
    to: '/forge',
    children: [
      {
        label: 'Characters',
        description: 'Create your charater',
      }
    ]
  },
  {
    label: 'Vault',
    icon: 'i-game-icons-gear-hammer',
    to: '/vault',
    children: [
      {
        label: 'Broadcasting Eather',
        description: 'Find worthy Let Plays',
        icons: 'i-mdi-broadcast',
      }
    ]
  },
  {
    label: 'Library',
    icon: 'i-game-icons-bookshelf',
    to: '/library',
    children: [
      {
        label: 'Archetypes',
        description: 'Weapons items and such',
      },
      {
        label: 'Ascension Packages',
        description: 'Weapons items and such',
        icon: 'i-game-icons-upgrade'
      },
      {
        label: 'Factions',
        description: 'Weapons items and such',
        icon: 'i-game-icons-tattered-banner'
      },
      {
        label: 'Psychic Powers',
        description: 'Weapons items and such',
        icon: 'i-game-icons-spell-book'
      },
      {
        label: 'Species',
        description: 'Weapons items and such',
      },
      {
        label: 'Talents',
        description: 'Weapons items and such',
        icon: 'i-game-icons-skills',
        to: '/library/talents',
      },
      {
        label: 'Wargear',
        description: 'Weapons items and such',
        icon: 'i-game-icons-battle-gear',
        to: '/library/wargear',
      },
    ]
  },
])

const items = ref<DropdownMenuItem[]>([
  {
    label: 'Profile',
    icon: 'i-lucide-user',
    to: '/profile',
  },
  {
    label: 'Log out',
    icon: 'i-mdi-logout',
    onSelect: () => logout()
  },
])
</script>

<template>

  <UApp>

    <UHeader>
      <template #title>
        Doctors of Doom
      </template>

      <UNavigationMenu :items="navItems" />

      <template #right>
        <UButton
            to="https://discordapp.com/channels/256930339878993920/600107858486493193"
            icon="mdi-discord"
            color="neutral"
            variant="ghost"
            targer="_blank"
            aria-label="Discord"
        />

        <UButton
            to="https://twitter.com/doctors_of_doom"
            icon="mdi-twitter"
            color="neutral"
            variant="ghost"
            targer="_blank"
            aria-label="Twitter"
        />

        <UButton
            to="https://github.com/schnick3rs/wang-charz"
            icon="mdi-github"
            color="neutral"
            variant="ghost"
            targer="_blank"
            aria-label="GitHub"
        />

        <UColorModeButton />

        <UDropdownMenu :items="items"     :content="{     align: 'start',     side: 'bottom',     sideOffset: 8}" :ui="{ content: 'w-48' }" v-if="user">
          <UUser :avatar="{ src: avatarUrl }" :name="displayName" />
        </UDropdownMenu>

        <UButton v-else to="/login" icon="i-lucide-user" variant="subtle" color="neutral">Sign in</UButton>

      </template>
    </UHeader>

    <UMain>
      <slot />
    </UMain>

    <UFooter>
      ackack
    </UFooter>
  </UApp>

</template>

