<script setup lang="ts">
import {useCharacterStore} from "~~/stores/characters.ts";
import type {ComplexRequirement} from "#shared/types/talent.ts";

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
const page = ref(1)
const itemsPerPage = 25

const filteredTalents = computed(() => {
  if (!talents.value) return []

  const q = search.value.trim().toLowerCase()

  if (!q) return talents.value

  return talents.value.filter(item =>
      item.name.toLowerCase().includes(q)
  )
})

const paginatedTalents = computed(() => {
  const start = (page.value - 1) * itemsPerPage
  const end = start + itemsPerPage

  return filteredTalents.value.slice(start, end)
})

watch(search, () => {
  page.value = 1
})

const showTalentModal = ref(false)
const previewTalent = ref<Talent|null>(null)

function updateAndShowTalentPreview(talent: Talent) {
  console.info('Species Selected, open preview', talent)
  previewTalent.value = talent
  showTalentModal.value = true
}

function addTalent(talent: Talent) {
}

const { t } = useI18n()
function requirementsString(talent: Talent) {

  function stringy(requirement: ComplexRequirement) {
    let text = ''
    switch (requirement.type) {
      case 'keyword':
        if (requirement.condition === 'mustNot') {
          text = `<strong>must not</strong> possess the ${requirement.key.join(' or ')} ${requirement.type}`;
        } else {
          text = `${requirement.key.map((k) => k.toLocaleUpperCase() ).join(' or ')}`;
        }
        break;

      case 'talent':
        if (requirement.condition === 'mustNot') {
          text = `<strong>must not</strong> possess the ${requirement.key.join(' or ')} ${requirement.type}`;
        } else {
          text = `${requirement.key.join(' or ')}`;
        }
        break;

      case 'attribute':
      case 'skill':
        text = `${t(`stats.${requirement.key}`)} Rating ${requirement.value}+`;
        break;

      case 'character':
        text = `${requirement.key} ${requirement.value}+`;
        break;

      case 'species':
        if (requirement.condition === 'mustNot') {
          text = `<strong>must not</strong> ${requirement.value} Species`;
        } else {
          text = `${requirement.value} Species`
        }
        break;

      default:
        text = `${requirement.key}`;
    }
    console.info('Stringify requirement', requirement, text)
    return text
  }

  if (talent.requirements.length > 0) {
    const requirements =  talent.requirements.map(requirement => stringy(requirement))
    return requirements
  }

  return []
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
        <UButton color="primary" @click="addTalent(previewTalent)">Add</UButton>
      </template>
    </UModal>

    <UCard :ui="{ body: 'flex flex-col gap-2 p-0 sm:p-0 ' }" class="mt-4" >
      <div
          v-for="item in paginatedTalents"
          :key="item.key"
          class="hover:bg-black/10 w-min-full px-2 py-1 flex flex-row justify-between items-center"
          @click="updateAndShowTalentPreview(item)"
      >
        <UUser
            size="2xl"
            :name="item.name"
            :ui="{ description: 'text-sm' }"
        >
          <template #name>
            {{ item.name }}
            <UBadge v-if="item.source.key !== 'core'" variant="subtle" color="info" class="ml-1 uppercase" size="sm">{{ item.source.key }}</UBadge>
          </template>
          <template #description>
            <div v-html="requirementsString(item).join(', ')"></div>
          </template>
        </UUser>

        <UFieldGroup>
          <UBadge>{{ item.cost }}</UBadge>
          <UBadge variant="subtle">XP</UBadge>
        </UFieldGroup>
      </div>
    </UCard>

    <div class="flex justify-center border-t border-default pt-4 px-4">
      <UPagination
          v-model:page="page"
          show-edges
          :items-per-page="itemsPerPage"
          :total="filteredTalents.length"
          :sibling-count="5"
      />
    </div>

  </div>
</template>

<style scoped>

</style>