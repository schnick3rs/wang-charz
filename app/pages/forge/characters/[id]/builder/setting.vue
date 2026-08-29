<script setup lang="ts">
import {useCharacterStore} from "~~/stores/characters.ts";
import type {RadioGroupItem} from "@nuxt/ui/components/RadioGroup.vue";

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

const tierOptions = ref<RadioGroupItem[]>([
  { label: 'One among billions', value: 1, icon: 'i-pinhead-roman-numeral-i' },
  { label: 'Stalwart Defenders', value: 2, icon: 'i-pinhead-roman-numeral-ii' },
  { label: 'Elite Guardians', value: 3, icon: 'i-pinhead-roman-numeral-iii' },
  { label: 'Heroic Operatives', value: 4, icon: 'i-pinhead-roman-numeral-iv' },
  { label: 'Agents of Fate', value: 5, icon: 'i-pinhead-roman-numeral-v' },
])

const { data: books } = await useAsyncData(
    'books',
    (_nuxtApp, { signal }) => $fetch('/api/books', { signal }), {
      transform: (data) => {
        return data
            .filter((book: Book) => book.isOfficial)
            .filter((book: Book) => book.builder?.visible ?? false)
            .map((book: Book) => ({
              key: book.key,
              label: book.title,
              description: book.description,
              link: book.link,
              badge: book.builder?.badge,
              disabled: book.builder?.disabled,
            }))
      }
    }
)

const { data: homebrews } = await useAsyncData(
    'homebrews',
    (_nuxtApp, { signal }) => $fetch('/api/books', { signal }), {
      transform: (data) => {
        return [
          {
            key: 'custom',
            label: 'Your Custom Local Content',
            description: 'You homebrew species',
          },
            ...data
              .filter((book: Book) => !book.isOfficial)
              .filter((book: Book) => book.builder?.visible ?? false)
              .map((book: Book) => ({
                key: book.key,
                label: book.title,
                description: book.description,
                link: book.link,
                badge: book.builder?.badge,
                disabled: book.builder?.disabled,
              }))
        ]
      }
    }
)

</script>

<template>
  <div v-if="entity" class="mx-auto md:max-w-2xl flex flex-col gap-4">

    <section>
      <UFormField label="Name" class="w-full w-min-full" :ui="{ label: 'text-lg font-semibold' }">
        <UInput v-model="entity.data.name" placeholder="Enter your name" />
      </UFormField>
    </section>

    <section class="mt-2">
      <h2 class="text-2xl font-bold ">Campaign Framework</h2>
      <p>Define the Tier of the Campaign, defining your starting XP and available Archetypes</p>

      <div class="mt-2">
        <URadioGroup
            indicator="hidden"
            size="xl"
            v-model="entity.data.settingTier"
            :items="tierOptions"
            orientation="horizontal"
            legend="Tier"
            variant="card"
            :ui="{ legend: 'text-lg font-semibold', label: 'hidden md:block' }"
            class="overflow-x-auto"
        >
        </URadioGroup>
      </div>
    </section>

    <section class="mt-2">
      <h2 class="text-2xl font-bold ">Table Rules</h2>
      <p>Decide house rules, optional rules and hacks.</p>

      <div class="mt-2">
      </div>
    </section>

    <section class="mt-2">
      <h2 class="text-2xl font-bold ">Official Publications</h2>
      <p>Enable specific content from official publications. (Some are auto-enabled)</p>

      <div class="mt-2">
        <UCheckboxGroup v-model="entity.data.enabledBooks" :items="books" value-key="key" :ui="{ fieldset: 'gap-4'}">
          <template #label="{ item }">
            {{ item.label }} <UBadge v-if="item.badge" variant="subtle" size="md" color="warning">{{item.badge}}</UBadge>
          </template>
          <template #description="{ item }">
            {{ item.description }}<a v-if="item.link" :href="item.link" target="_blank" class="ml-1 underline hover:text-primary">(affiliate link)</a>
          </template>
        </UCheckboxGroup>
      </div>
    </section>

    <section class="mt-2">
      <h2 class="text-2xl font-bold ">Enable Homebrews</h2>
      <p>Enable content from various homebrews.</p>

      <div class="mt-2">
        <UCheckboxGroup v-model="entity.data.enabledHomebrews" :items="homebrews" value-key="key" :ui="{ fieldset: 'gap-4'}">
          <template #label="{ item }">
            {{ item.label }} <UBadge v-if="item.badge" variant="subtle" size="md" color="warning">{{item.badge}}</UBadge>
          </template>
          <template #description="{ item }">
            {{ item.description }}<a v-if="item.link" :href="item.link" target="_blank" class="ml-1 underline hover:text-primary">(affiliate link)</a>
          </template>
        </UCheckboxGroup>
      </div>
    </section>

  </div>
</template>

<style scoped>

</style>