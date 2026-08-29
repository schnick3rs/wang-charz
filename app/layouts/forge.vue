<script setup lang="ts">
import type {DropdownMenuItem, NavigationMenuItem} from '@nuxt/ui'
import {useCharacterStore} from "~~/stores/characters.ts";

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

const id = computed(() => route.params.id as string)
const store = useCharacterStore()
const entity = computed(() => store.byId[id.value])
const entityData = computed(() => entity.value?.data || { species: {key: undefined}, archetype: {key: undefined} })

const forgeNavs = computed(() => {
  if (!id.value) return []

  return [
    [
      { label: '', icon: 'i-heroicons-question-mark-circle',  to: `help` },
      { label: 'Setting', to: `/forge/characters/${id.value}/builder/setting` },
      { label: '1. Species', to: `/forge/characters/${id.value}/builder/species/${entityData.value?.species?.key ? 'manage' : 'choose'}` },
      { label: '2. Archetype', to: `/forge/characters/${id.value}/builder/archetype/${entityData.value?.archetype?.key ? 'manage' : 'choose'}` },
      { label: '3. Ascension', to: `/forge/characters/${id.value}/builder/ascension/manage` },
      { label: '4. Stats', to: `/forge/characters/${id.value}/builder/stats` },
      { label: '5. Talents', to: `/forge/characters/${id.value}/builder/talents` },
      { label: '6. Wargear', to: `/forge/characters/${id.value}/builder/wargear` },
      { label: '7. Powers', to: `/forge/characters/${id.value}/builder/psychic/powers` },
      { label: '8. Background', to: `/forge/characters/${id.value}/builder/background` },
      { label: '', to: `/forge/characters/${id.value}/builder/setting` },
    ] as NavigationMenuItem[]
  ];
})
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

        <ULocaleSelect
            :model-value="locale"
            :locales="locales"
            @update:model-value="setLocale"
            :ui="{ base: 'hidden lg:block'}"
        />

        <UDropdownMenu
            v-if="user"
            :items="items"
            :content="{ align: 'start', side: 'bottom', sideOffset: 8}"
            :ui="{ content: 'w-48' }"
        >
          <UUser :avatar="{ src: avatarUrl }" :name="displayName" />
        </UDropdownMenu>

        <UButton v-else to="/login" icon="i-lucide-user" variant="subtle" color="neutral">Sign in</UButton>

      </template>
    </UHeader>

    <UMain>
      <UContainer v-if="id">
        <UDashboardToolbar class="lg:justify-center">
          <UNavigationMenu :items="forgeNavs" color="info" variant="link"></UNavigationMenu>
        </UDashboardToolbar>
      </UContainer>
      <UContainer class="mt-4" >
        <slot />
      </UContainer>
    </UMain>

    <UFooter>
      ackack
    </UFooter>
  </UApp>

</template>

