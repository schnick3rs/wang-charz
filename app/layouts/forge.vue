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
  // ...unchanged, omitted for brevity...
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
    { label: '', icon: 'i-heroicons-identification',  to: `/forge/characters/${id.value}` },
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

// --- scroll active forge step into view on page change ---
const forgeToolbarEl = ref()

function scrollActiveStepIntoView() {
  nextTick(() => {
    const root = forgeToolbarEl.value?.$el as HTMLElement | undefined
    const activeStep = forgeSteps.value[currentStepIndex.value]
    if (!root || !activeStep?.to) return
    const activeEl = root.querySelector(`a[href="${activeStep.to}"]`) as HTMLElement | null
    activeEl?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  })
}

watch(currentStepIndex, scrollActiveStepIntoView, { immediate: true })

const hasOverspended = computed(() => {
  return calcCharacterCost(entity.value.data) >  (entity.value.data.settingTier * 100)
})

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
          <UUser :avatar="{ src: avatarUrl }" :name="displayName" :ui="{ name: 'hidden md:block'}" />
        </UDropdownMenu>

        <div v-else >
          <UButton to="/login" icon="i-lucide-user" variant="subtle" color="neutral">Sign in</UButton>
          <UButton to="/sign-up" icon="i-lucide-user" variant="solid" color="neutral">Sign Up</UButton>
        </div>

      </template>
    </UHeader>

    <UMain>

      <UContainer v-if="id">
        <UDashboardToolbar ref="forgeToolbarEl" class="lg:justify-center overflow-x-auto">
          <UNavigationMenu :items="forgeNavs" color="info" variant="link"></UNavigationMenu>
        </UDashboardToolbar>
      </UContainer>
      <UContainer class="mt-4" >


        <slot />
      </UContainer>
    </UMain>

    <UFooter
        class="sticky bottom-0 bg-info-50 text-info-800 dark:bg-info-950 dark:text-info-200"
        :ui="{
          root: 'mt-4',
          container: 'grid grid-cols-3 items-center p-2',
          left: 'mt-0 order-1 justify-start text-sm',
          center: 'mt-0 order-2 gap-2',
          right: 'mt-0 order-3 justify-end text-sm'
    }"
    >
      <template #left>
        <UModal
            :content="{
              align: 'start',
              side: 'top',
            }"
        >
          <UButton variant="ghost" :color="hasOverspended ? 'error' : 'info'" v-if="entity">{{ calcCharacterCost(entity.data) }} / {{ entity.data.settingTier * 100 }} XP</UButton>

          <template #content>
            <UCard v-if="entity" :ui="{ body: 'flex flex-col gap-4', root: 'shadow-lg' }">

              <template #header>
                <div class="flex justify-between gap-4 items-center">
                  <UUser :name="`Tier ${entity.data.settingTier}`" description="Setting"></UUser>
                  <UBadge :color="hasOverspended ? 'error' : 'info'" variant="subtle">{{ calcCharacterCost(entity.data)}} / {{ entity.data.settingTier * 100 }}</UBadge>
                </div>
              </template>

              <div class="flex justify-between gap-4 items-center">
                <UUser name="Species" :description="entity.data.species.label"></UUser>
                <UBadge color="info" variant="subtle">{{ calcSpeciesCost(entity.data)}}</UBadge>
              </div>

              <div class="flex justify-between gap-4 items-center">
                <UUser name="Archetype" :description="entity.data.archetype.label"></UUser>
                <UBadge color="info" variant="subtle">{{ calcArchetypeCost(entity.data)}}</UBadge>
              </div>

              <div class="flex justify-between gap-4 items-center">
                <UUser name="Ascension Packages" :description="entity.data.ascensions.map((a) => a.label).join(', ')"></UUser>
                <UBadge color="info" variant="subtle">{{ calcAscensionCost(entity.data)}}</UBadge>
              </div>

              <div class="flex justify-between gap-4 items-center">
                <UUser name="Attributes & Skills" description="Stats"></UUser>
                <UBadge color="info" variant="subtle">{{ calcStatCost(entity.data)}}</UBadge>
              </div>

              <div class="flex justify-between gap-4 items-center">
                <UUser name="Talents" :description="`${entity.data.talents.length} Talents`"></UUser>
                <UBadge color="info" variant="subtle">{{ calcArchetypeCost(entity.data)}}</UBadge>
              </div>

              <div class="flex justify-between gap-4 items-center">
                <UUser name="Psychic Powers" :description="`${entity.data.psychicPowers.length} Psychic Powers`"></UUser>
                <UBadge color="info" variant="subtle">{{ calcArchetypeCost(entity.data)}}</UBadge>
              </div>

              <div class="flex justify-between gap-4 items-center">
                <UUser name="Background" description="Wealth & Languages"></UUser>
                <UBadge color="info" variant="subtle">{{ calcOtherCost(entity.data)}}</UBadge>
              </div>

            </UCard>
          </template>
        </UModal>

      </template>

      <UButton
          size="sm"
          :to="prevStep?.to"
          :color="prevStep ? 'info' : 'neutral'"
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
          :color="nextStep ? 'info' : 'neutral'"
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