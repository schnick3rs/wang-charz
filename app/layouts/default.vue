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

const route = useRoute()

const navItems = ref<NavigationMenuItem[]>([
  {
    label: 'Forge',
    icon: 'i-game-icons-gear-hammer',
    children: [
      {
        label: 'Characters',
        description: 'Create your charater',
        to: '/forge/my-characters',
      },
      {
        label: 'Species',
        description: 'Create your charater',
        icon: 'i-game-icons-dna2',
        to: '/forge/species',
      },
      {
        label: 'Campaigns',
        description: 'Create your charater',
        icon: 'i-game-icons-planet-conquest',
        to: '/forge/campaigns',
      },
    ]
  },
  {
    label: 'Vault',
    icon: 'i-game-icons-locked-chest',
    to: '/vault',
  },
  {
    label: 'Library',
    icon: 'i-game-icons-bookshelf',
    to: '/library',
    active: route.path.startsWith('/library'),
    children: [
      {
        label: 'Archetypes',
        description: 'Weapons items and such',
        icon: 'i-game-icons-duality-mask',
        to: '/library/archetypes',
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
        icon: 'i-game-icons-dna1',
        to: '/library/species',
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
  {
    label: 'Threat Beastiary',
    description: 'Repository of player threats for the GM',
    icon: 'i-game-icons-daemon-skull',
    to: '/bestiary',
  },
  {
    label: 'Aid',
    icon: 'i-game-icons-bookshelf',
    children: [
      {
        label: 'Community Network',
      },
      {
        label: 'Roleplaying Articles',
      },
      {
        label: 'Rules Codex',
      },
      {
        label: 'Broadcasting Eather',
        description: 'Find worthy Let Plays',
        icons: 'i-mdi-broadcast',
      },
    ]
  },
  {
    label: 'Contact',
    children: [
      {
        label: 'Discord',
        icon: 'i-mdi-discord',
        to:"https://discordapp.com/channels/256930339878993920/600107858486493193",
        target: '_blank',
      },
      {
        label: 'Twitter',
        icon: 'i-mdi-twitter',
        to: 'https://twitter.com/doctors_of_doom',
        target: '_blank',
      },
      {
        label: 'GitHub',
        icon: 'i-mdi-github',
        to: 'https://github.com/schnick3rs/wang-charz',
        target: '_blank',

      },
    ]
  }
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

const { locale, locales, setLocale } = useI18n()
</script>

<template>

  <UApp>

    <UHeader>
      <template #title>
        Doctors of Doom
      </template>

      <UNavigationMenu :items="navItems"  />


      <template #right>

        <UColorModeButton />

        <UDropdownMenu :items="items"     :content="{     align: 'start',     side: 'bottom',     sideOffset: 8}" :ui="{ content: 'w-48' }" v-if="user">
          <UUser :avatar="{ src: avatarUrl }" :name="displayName" :ui="{ name: 'hidden md:block'}" />
        </UDropdownMenu>

        <UButton v-else to="/login" icon="i-lucide-user" variant="subtle" color="neutral">Sign in</UButton>

      </template>
    </UHeader>

    <UMain>
      <UContainer class="mt-4" >
        <slot />
      </UContainer>
    </UMain>

    <UFooter>
      ackack
    </UFooter>
  </UApp>

</template>

