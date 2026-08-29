<script setup lang="ts">
import {useCharacterStore} from "~~/stores/characters.ts";
import {breakpointsTailwind, useBreakpoints} from '@vueuse/core'

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


const { data: psychicDisciplines } = await useAsyncData(
    'psychic-disciplines-sourced',
    (_nuxtApp, { signal }) => $fetch('/api/psychic-disciplines', {
      signal,
      query: { source: entity.value?.data.enabledBooks.join(',') || '' }
    }),
)


const search = ref('')

const filteredPsychicPowers = computed(() => {
  if (!psychicPowers.value) return []

  const q = search.value.trim().toLowerCase()

  if (!q) return psychicPowers.value

  return psychicPowers.value.filter(item =>
      item.name.toLowerCase().includes(q)
  )
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

    <h1 class="font-bold text-2xl mb-2">
      Manage Psychic Powers
      <UButton variant="ghost" color="info" icon="i-heroicons-question-mark-circle" :to="`/forge/characters/${entity.id}/builder/psychic/disciplines`" />
    </h1>

    <UCard v-if="entity" class=" mb-4">
      <div class="flex flex-row flex-wrap gap-2">
        <UBadge
            v-for="charPsychicPower in entity.data.psychicPowers"
            :key="charPsychicPower.key"
            variant="subtle"
            color="info"
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
      <UBadge
          v-for="discipline in psychicDisciplines"
          :key="discipline.key"
          size="lg"
          color="neutral"
          variant="subtle"
      >
        {{ discipline.name }}<span v-if="discipline.source.key !== 'core'" class="ml-1 italic">({{discipline.source.key}})</span>
      </UBadge>
    </div>

    <UCard :ui="{ body: 'flex flex-col gap-2 p-0 sm:p-0 ' }" class="mt-4" >
      <div
          v-for="item in filteredPsychicPowers"
          :key="item.key"
          class="hover:bg-black/10 w-min-full px-2 py-1 flex flex-row justify-between items-center"
      >
        <UUser
            size="2xl"
            :name="item.name"
            :description="item.hint"
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