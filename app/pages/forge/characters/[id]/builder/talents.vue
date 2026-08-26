<script setup lang="ts">
import {useCharacterStore} from "~~/stores/characters.ts";

definePageMeta({ layout: 'forge' })

const route = useRoute()
const id = computed(() => route.params.id as string)
const store = useCharacterStore()

const entity = computed(() => store.byId[id.value])

const { data: talents } = await useAsyncData(
    'talents-sourced',
    (_nuxtApp, { signal }) => $fetch('/api/talents', {
      signal,
      query: { source: entity.value?.data.enabledBooks.join(',') || '' }
    }),
)

const search = ref('')
const filteredTalents = computed(() => {
  if (!talents.value) return []
  const q = search.value.trim().toLowerCase()
  if (!q) return talents.value
  return talents.value.filter(item => item.name.toLowerCase().includes(q))
})

const showTalentModal = ref(false)
const previewTalent = ref<Talent|null>(null)

function updateAndShowTalentPreview(talent: Talent) {
  console.info('Species Selected, open preview', talent)
  previewTalent.value = talent
  showTalentModal.value = true
}
</script>

<template>
  <div class="mx-auto max-w-3xl">

    <h1 class="font-bold text-2xl mb-2">Select Talents</h1>

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


    <UModal
        v-if="previewTalent"
        v-model:open="showTalentModal"
        title="Confirm Talent"
        :overlay="false"
        :ui="{ content: 'max-w-2xl', footer: 'justify-between' }"
    >
      <template #body>

        <!-- header -->
        <div class="flex flex-row justify-between mb-2">
          <div class="flex flex-col">
            <span class="text-2xl font-bold mb-2">
              {{ previewTalent.name }}
            </span>
            <span class="italic text-sm font-medium">{{ previewTalent.source.book }}, pg. {{ previewTalent.source.page}}</span>
          </div>
        </div>

        <div>
          <div v-if="previewTalent.description" v-html="previewTalent.description" />
          <div v-else><p>{{ previewTalent.snippet}}</p></div>
        </div>
      </template>
      <template #footer>
        <UButton color="error" variant="subtle" @click="showTalentModal = false">Cancel</UButton>
        <UButton color="primary" >Add</UButton>
      </template>
    </UModal>

    <UCard :ui="{ body: 'flex flex-col gap-2 p-0 sm:p-0 ' }" class="mt-4" >
      <div
          v-for="item in filteredTalents"
          :key="item.key"
          class="hover:bg-black/10 w-min-full px-2 py-1 flex flex-row justify-between items-center"
          @click="updateAndShowTalentPreview(item)"
      >
        <UUser
            size="2xl"
            :name="item.name"
            :description="item.requirements"
            :ui="{ description: 'text-sm' }"
        >
          <template #name>
            {{ item.name }}
            <UBadge v-if="item.source.key !== 'core'" variant="subtle" color="info" class="ml-1 uppercase" size="sm">{{ item.source.key }}</UBadge>
          </template>
        </UUser>

        <UFieldGroup>
          <UBadge>{{ item.cost }}</UBadge>
          <UBadge variant="subtle">XP</UBadge>
        </UFieldGroup>
      </div>
    </UCard>

  </div>
</template>

<style scoped>

</style>