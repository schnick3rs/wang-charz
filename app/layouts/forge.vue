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

type ForgeStep = NavigationMenuItem & { matchKey?: string }

const forgeSteps = computed<ForgeStep[]>(() => {
  if (!id.value) return []

  const base = `/forge/characters/${id.value}/builder`

  return [
    { label: 'Setting', to: `${base}/setting`, matchKey: 'setting' },
    { label: '1. Species', to: `${base}/species/${entityData.value?.species?.key ? 'manage' : 'choose'}`, matchKey: 'species' },
    { label: '2. Archetype', to: `${base}/archetype/${entityData.value?.archetype?.key ? 'manage' : 'choose'}`, matchKey: 'archetype' },
    { label: '3. Ascension', to: `${base}/ascension/manage`, matchKey: 'ascension' },
    { label: '4. Stats', to: `${base}/stats`, matchKey: 'stats' },
    { label: '5. Talents', to: `${base}/talents`, matchKey: 'talents' },
    { label: '6. Wargear', to: `${base}/wargear`, matchKey: 'wargear' },
    { label: '7. Powers', to: `${base}/psychic/powers`, matchKey: 'psychic' },
    { label: '8. Background', to: `${base}/background`, matchKey: 'background' },
  ]
})

const forgeNavs = computed(() => [forgeSteps.value] as NavigationMenuItem[][])

const currentStepIndex = computed(() =>
    forgeSteps.value.findIndex(step => step.matchKey && route.path.includes(`/builder/${step.matchKey}`))
)

const prevStep = computed(() => {
  const i = currentStepIndex.value
  return i > 0 ? forgeSteps.value[i - 1] : null
})

const nextStep = computed(() => {
  const i = currentStepIndex.value
  return i !== -1 && i < forgeSteps.value.length - 1 ? forgeSteps.value[i + 1] : null
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

    <UFooter
        class="sticky bottom-0 bg-info-200 "
        :ui="{
          root: 'mt-4',
          container: 'grid grid-cols-3 items-center p-2',
          left: 'mt-0 order-1 justify-start text-sm',
          center: 'mt-0 order-2 gap-2',
          right: 'mt-0 order-3 justify-end text-sm'
    }"
    >
      <template #left>
        15 / {{ entity.data.settingTier * 100 }} XP
      </template>

      <UButton
          size="sm"
          :to="prevStep?.to"
          :color="prevStep ? 'primary' : 'neutral'"
          :variant="prevStep ? 'solid' : 'subtle'"
          :disabled="!prevStep"
          icon="i-heroicons-chevron-left-16-solid"
      >
        {{ 'prev' }}
      </UButton>
      <UButton
          size="sm"
          :to="nextStep?.to"
          :disabled="!nextStep"
          :color="nextStep ? 'primary' : 'neutral'"
          :variant="nextStep ? 'solid' : 'subtle'"
          trailing-icon="i-heroicons-chevron-right-16-solid"
      >
        {{ 'next' }}
      </UButton>

      <template #right>
        © {{ new Date().getFullYear() }}
      </template>

    </UFooter>
  </UApp>

</template>

