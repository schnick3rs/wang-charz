<script setup lang="ts">
import {useCharacterStore} from "~~/stores/characters.ts";
import type {ComplexRequirement} from "#shared/types/talent.ts";
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
  previewTalent.value = talent
  showTalentModal.value = true
}

const characterTalentKeys: string[] = computed(() => {
  if (!entity.value) return []
  return entity.value.data.talents.map((t) => t.key)
})

function addTalent(talent: Talent) {
  if (!entity.value) return
  const characterTalent = {
    id: crypto.randomUUID().replaceAll('-', '').slice(0, 8),
    key: talent.key,
    name: talent.name,
    cost: talent.cost,
  }
  entity.value.data.talents.push(characterTalent)
  showTalentModal.value = false
}

function removeTalent(talent: { id: string }) {
  if (!entity.value) return

  entity.value.data.talents = entity.value.data.talents.filter(
      t => t.id !== talent.id
  )
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

    return text
  }

  if (talent.requirements.length > 0) {
    return talent.requirements.map(requirement => stringy(requirement))
  }

  return []
}

</script>

<template>
  <div class="mx-auto max-w-3xl">

    <h1 class="font-bold text-2xl mb-2">Select Talents</h1>

    <div v-if="entity" class="flex flex-col gap-2 mb-4">
      <UCard
          v-for="charTalent in entity.data.talents"
          :key="charTalent.id"
          :title="charTalent.name"
      >
        <UButton color="error" @click="removeTalent(charTalent)">removeTalent</UButton>
        <pre>{{charTalent}}</pre>
      </UCard>
    </div>

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
        :overlay="true"
        :fullscreen="isSmallScreen"
        :ui="{ content: 'max-w-2xl', footer: 'justify-between' }"
    >
      <template #header>

        <div class="flex flex-row justify-between mb-2 items-center w-full">
          <div class="flex flex-col">
            <span class="text-2xl font-bold mb-2">
              {{ previewTalent.name }}
            </span>
            <span class="italic text-sm font-medium">{{ previewTalent.source.book }}, pg. {{ previewTalent.source.page}}</span>
          </div>

          <UFieldGroup>
            <UBadge>{{ previewTalent.cost }}</UBadge>
            <UBadge variant="subtle">XP</UBadge>
          </UFieldGroup>
        </div>

      </template>

      <template #body>
        <div>
          <div v-if="previewTalent.description" class="ability-content" v-html="previewTalent.description" />
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
            <div v-html="requirementsString(item).join(', ')" />
          </template>
        </UUser>


        <div>
          <UButton
              size="xs"
              :color="(characterTalentKeys.includes(item.key) && !item.allowedMultipleTimes) ? 'neutral' : 'primary'"
              :variant="(characterTalentKeys.includes(item.key) && !item.allowedMultipleTimes) ? 'subtle' : 'solid'"
              :disabled="(characterTalentKeys.includes(item.key) && !item.allowedMultipleTimes)"
              class="mr-2"
              @click.prevent="addTalent(item)"
          >
            Add
          </UButton>
          <UFieldGroup>
            <UBadge>{{ item.cost }}</UBadge>
            <UBadge variant="subtle">XP</UBadge>
          </UFieldGroup>
        </div>

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

<style>
.ability-content {
  font-size: 1rem;
  line-height: 1.75;
  color: var(--ui-text-toned);
}

.ability-content > *:first-child {
  margin-top: 0;
}

.ability-content p {
  margin-bottom: 1em;
}

.ability-content h2,
.ability-content h3,
.ability-content h4 {
  color: var(--ui-text-highlighted);
  font-weight: 600;
  line-height: 1.3;
  margin-top: 1.75em;
  margin-bottom: 0.75em;
}

.ability-content h2 {
  font-size: 1.5rem;
}

.ability-content h3 {
  font-size: 1.25rem;
}

.ability-content h4 {
  font-size: 1.1rem;
}

.ability-content a {
  color: var(--ui-primary);
  text-decoration: underline;
  text-decoration-color: var(--ui-border-accented);
  text-underline-offset: 2px;
}

.ability-content a:hover {
  text-decoration-color: var(--ui-primary);
}

.ability-content ul,
.ability-content ol {
  margin-bottom: 1.25em;
  padding-left: 1.5em;
}

.ability-content ul {
  list-style: disc;
}

.ability-content ol {
  list-style: decimal;
}

.ability-content li {
  margin-bottom: 0.4em;
}

.ability-content li > ul,
.ability-content li > ol {
  margin-top: 0.4em;
  margin-bottom: 0;
}

.ability-content img {
  display: block;
  max-width: 100%;
  margin: 1.5em auto;
  border-radius: var(--ui-radius);
}

.ability-content hr {
  border: none;
  border-top: 1px solid var(--ui-border);
  margin: 2em 0;
}

.ability-content code {
  color: hsl(122 39% 49%);
  background-color: var(--ui-bg-elevated);
  padding: 0.15em 0.4em;
  border-radius: calc(var(--ui-radius) * 0.75);
  font-size: 0.875em;
}

.ability-content pre {
  background-color: var(--ui-bg-elevated);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
  padding: 1em;
  margin-bottom: 1.25em;
  overflow-x: auto;
}

.ability-content pre code {
  color: var(--ui-text);
  background-color: transparent;
  padding: 0;
}

.ability-content blockquote {
  border-left: 3px solid var(--ui-primary);
  background-color: var(--ui-bg-elevated);
  color: var(--ui-text-toned);
  padding: 0.75em 1.25em;
  margin: 1.25em 0;
  border-radius: 0 var(--ui-radius) var(--ui-radius) 0;
}

.ability-content blockquote p {
  font-size: 1.05em;
  font-weight: 300;
  margin: 0;
}

.ability-content table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.25em;
  font-size: 0.95em;
}

.ability-content th,
.ability-content td {
  border: 1px solid var(--ui-border);
  padding: 0.5em 0.75em;
  text-align: left;
}

.ability-content th {
  background-color: var(--ui-bg-elevated);
  color: var(--ui-text-highlighted);
  font-weight: 600;
}
</style>