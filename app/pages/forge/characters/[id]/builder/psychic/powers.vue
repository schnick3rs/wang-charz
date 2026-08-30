<script setup lang="ts">
import {useCharacterStore} from "~~/stores/characters.ts";
import {breakpointsTailwind, useBreakpoints} from '@vueuse/core'
import {stringToKebab} from "#server/data/utils.ts";

const breakpoints = useBreakpoints(breakpointsTailwind)
const isSmallScreen = breakpoints.smallerOrEqual('sm') // Returns a reactive boolean

definePageMeta({ layout: 'forge' })

const route = useRoute()
const id = computed(() => route.params.id as string)
const store = useCharacterStore()

const entity = computed(() => store.byId[id.value])

// Deep-watch the sheet data and let the store's existing debounce handle
// persistence — avoids writing an updateCharacter(id, { field }) call for
// every one of the sheet's many inputs.
watch(
    () => entity.value?.data,
    () => {
      if (entity.value) store.scheduleSave(id.value)
    },
    { deep: true }
)

// Flush any pending debounced save immediately when leaving the page,
// so a fast navigation-away doesn't lose the last edit.
onBeforeRouteLeave(async () => {
  if (entity.value) await store.saveNow(id.value)
})

const { data: psychicPowers } = await useAsyncData(
    'psychic-powers-sourced',
    (_nuxtApp, { signal }) => $fetch('/api/psychic-powers', {
      signal,
      query: { source: entity.value?.data.enabledBooks.join(',') || '' }
    }),
)


const characterKnownDisciplines = computed(() => {
  return ['Minor', 'Biomancy', 'Pyromancy', 'Telekinesis']
})

const { data: psychicDisciplines } = await useAsyncData(
    'psychic-disciplines-sourced',
    (_nuxtApp, { signal }) => $fetch('/api/psychic-disciplines', {
      signal,
      query: { source: entity.value?.data.enabledBooks.join(',') || '' }
    }),
    {
      transform: (data) => {
        const merged = new Map()

        for (const i of data) {
          const key = i.name as string
          if (merged.has(key)) {
            merged.set(key, { ...merged.get(key), ...i })
          } else {
            merged.set(key, { ...i })
          }
        }

        return Array.from(merged.values())
            .map((i) => ({
              ...i,
              disabled: !characterKnownDisciplines.value.includes(i.name as string),
            }))
            .sort((a, b) => {
              // 'Minor' always first
              if (a.name === 'Minor' && b.name !== 'Minor') return -1
              if (b.name === 'Minor' && a.name !== 'Minor') return 1

              // then non-disabled before disabled
              if (a.disabled !== b.disabled) return a.disabled ? 1 : -1

              // optional: alphabetical tiebreaker
              return a.name.localeCompare(b.name)
            })
      }
    }
)


const search = ref('')
const disciplineFilter = ref(['Minor'])


const filteredPsychicPowers = computed(() => {
  if (!psychicPowers.value) return []

  const q = search.value.trim().toLowerCase()

  return psychicPowers.value.filter(item => {
    const matchesDiscipline =
        disciplineFilter.value.length === 0 ||
        disciplineFilter.value.includes(item.discipline)

    const matchesSearch =
        !q || item.name.toLowerCase().includes(q)

    return matchesDiscipline && matchesSearch
  })
})

const characterPsychicPowersKeys = computed(() => {
  if (!entity.value) return []
  return entity.value.data.psychicPowers.map((t) => t.key)
})

function add(psychicPower: PsychicPower) {
  console.info('add Psychic Power', psychicPower.name)
  if (!entity.value) return
  const charPsychicPower = {
    key: psychicPower.key,
    name: psychicPower.name,
    cost: psychicPower.cost,
  }
  entity.value.data.psychicPowers.push(charPsychicPower)
}
function remove(psychicPower: { key: string }) {
  console.info('remove', psychicPower)
  if (!entity.value) return

  entity.value.data.psychicPowers = entity.value.data.psychicPowers.filter(
      p => p.key !== psychicPower.key
  )
}

</script>

<template>
  <div class="mx-auto max-w-4xl">

    <h1 class="font-bold text-2xl mb-2 flex flex-row justify-between">
      Manage Psychic Powers
      <UButton variant="subtle" color="info" icon="i-game-icons-card-exchange" :to="`/forge/characters/${entity.id}/builder/psychic/disciplines`" />
    </h1>

    <UCard v-if="entity" class=" mb-4">
      <div class="flex flex-row flex-wrap gap-2">
        <UBadge
            v-for="charPsychicPower in entity.data.psychicPowers"
            :key="charPsychicPower.key"
            variant="subtle"
            size="lg"
            trailing-icon="i-mdi-close"
            @click="remove(charPsychicPower)"
        >
          {{charPsychicPower.name}}
        </UBadge>
      </div>

    </UCard>

    <UInput
        v-model="search"
        icon="i-lucide-search"
        placeholder="Search by name"
        :ui="{ base: 'w-full' }"
        class="w-full"

    >
      <template v-if="search?.length" #trailing>
        <UButton
            color="neutral"
            variant="link"
            size="sm"
            icon="i-lucide-circle-x"
            aria-label="Clear input"
            @click="search = ''"
        />
      </template>
    </UInput>

    <div class="flex flex-wrap gap-1 mt-4">
      <UCheckboxGroup
          v-model="disciplineFilter"
          :items="psychicDisciplines"
          orientation="horizontal"
          label-key="name"
          value-key="name"
          variant="card"
          color="info"
          :ui="{ fieldset: 'flex-wrap', item: 'py-1' }"
      />
    </div>

    <UCard :ui="{ body: 'flex flex-col gap-2 p-0 sm:p-0 ' }" class="mt-4" >
      <div
          v-for="item in filteredPsychicPowers"
          :key="item.key"
          class="hover:bg-black/10 w-min-full px-2 py-1 flex flex-row justify-between items-center"
      >
        <UUser
            size="2xl"
            :avatar="{ src: `/img/avatars/psychic-disciplines/${stringToKebab(item.discipline)}.png`}"
            :name="item.name"
            :description="item.effect"
            :ui="{ description: 'text-sm' }"
        >
          <template #name>
            {{ item.name }}
            <UBadge v-if="item.source.key !== 'core'" variant="subtle" color="info" class="ml-1 uppercase" size="sm">{{ item.source.key }}</UBadge>
          </template>
        </UUser>


        <div>
          <UButton
              size="xs"
              :color="(characterPsychicPowersKeys.includes(item.key)) ? 'neutral' : 'primary'"
              :variant="(characterPsychicPowersKeys.includes(item.key)) ? 'subtle' : 'solid'"
              :disabled="(characterPsychicPowersKeys.includes(item.key))"
              class="mr-2"
              @click.prevent="add(item)"
          >
            Add
          </UButton>
        </div>

      </div>
    </UCard>


  </div>
</template>

<style scoped>

</style>