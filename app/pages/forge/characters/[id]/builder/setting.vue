<script setup lang="ts">
import {useCharacterStore} from "~~/stores/characters.ts";
import type {CheckboxGroupItem} from "@nuxt/ui/components/CheckboxGroup.vue";

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
        return data
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
      }
    }
)

</script>

<template>
  <div v-if="entity" class="mx-auto max-w-xl">

    <section>
      <h2>Character Basics</h2>

      <UFormField label="Name" class="w-full w-min-full">
        <UInput v-model="entity.data.name" placeholder="Enter your name" />
      </UFormField>
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