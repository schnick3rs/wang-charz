<script setup lang="ts">
import {useCharacterStore} from "~~/stores/characters.ts";

definePageMeta({ layout: 'forge' })

const route = useRoute()
const id = computed(() => route.params.id as string)
const store = useCharacterStore()

const entity = computed(() => store.byId[id.value])

const { data: species } = await useAsyncData(
    'species/manage',
    (_nuxtApp, { signal }) => $fetch(`/api/species/${entity.value.data.species.key}`, { signal }),
)

const { data: chapters } = await useAsyncData(
    'chapters',
    (_nuxtApp, { signal }) => $fetch(`/api/species/chapters`, { signal }),
)

const selectedOptionKey = ref<string>()
const selectedFeatureOption = ref<string>()

</script>

<template>

  <div v-if="species" class="mx-auto max-w-3xl">

    <div class="flex flex-row justify-between mb-2">
      <div class="flex flex-col">
        <span class="text-2xl font-bold mb-2">{{ species.name }}</span>
        <span>{{ species.hint }}</span>

      </div>
      <div>
        <NuxtImg :src="`/img/avatars/species/${species.key}.png`" class="w-30 h-30 object-cover rounded-lg" />
        <UButton variant="ghost" color="info" :to="`/forge/characters/${id}/builder/species/choose`">Change Species</UButton>
      </div>
    </div>

    <!-- features -->
    <template v-if="species.speciesFeatures.length > 0">

      <div class="mb-4">
        <h3 class="font-light text-sm">Species Abilities</h3>
        <USeparator class="mb-2" />

        <div class="flex flex-col gap-2">
          <div v-for="feature in species.speciesFeatures" :key="feature.name">
            <strong>{{ feature.name }}</strong>
            <div v-if="feature.description" v-html="feature.description" />
            <div v-else><p>{{ feature.snippet}}</p></div>

            <!-- an option to be selected is identified by <species-key>.<feature-key> fspg-kroot.kroot-mutations.x -->
            <div v-if="feature.options" class=" border-l border-l-4 border-l-red-600  mt-2 pl-4 mb-4">
              <USelect
                v-model="selectedOptionKey"
                :items="feature.options"
                value-key="key"
                label-key="name"
                description-key="snippet"
                class="w-full mb-2"
                placeholder="Select Mutation..."
                @change="selectedFeatureOption = ''"
                @update:model-value="(data) => console.info(`update-model ${feature.key}`, data)"
            />
              <div v-if="selectedOptionKey" class="mb-2">
                <p>{{ feature.options.find(i => i.key === selectedOptionKey)?.snippet }}</p>
              </div>
              <div v-if="selectedOptionKey && feature.options.find(i => i.key === selectedOptionKey)" class="mt-2">
                <USelect
                    v-model="selectedFeatureOption"
                    :items="feature.options.find(i => i.key === selectedOptionKey)?.options"
                    value-key="key"
                    label-key="name"
                    description-key="snippet"
                    class="w-full mb-2"
                    placeholder="Select Mutation..."
                    @select="console.info('select')"
                    @update:model-value="(data) => console.info('update-model', data)"
                />
                <div v-if="selectedFeatureOption" class="mb-2">
                  <p>
                    {{ feature.options.find(i => i.key === selectedOptionKey)?.options.find(i => i.key === selectedFeatureOption)?.snippet }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Special Astartes Chapter Genseed -->
            <div v-if="chapters && entity && entity.data && feature.name === 'Honour the Chapter'" class="border-l-4 border-l-red-600 mt-2 pl-4">
              <USelect
                  v-model="entity.data.speciesAstartesChapterKey"
                  :items="chapters"
                  value-key="key"
                  label-key="name"
                  description-key="snippet"
                  class="w-full mb-2"
                  placeholder="Select your Chapter..."
                  @change="selectedFeatureOption = ''"
                  @update:model-value="(data) => console.info(`update-model ${feature.key}`, data)"
              />
              <div v-if="entity.data.speciesAstartesChapterKey">
                <div
                    v-for="feature in chapters.find(c => c.key === entity.data.speciesAstartesChapterKey)?.features"
                    :key="feature.name"
                    class="mb-2"
                >
                  <strong>{{ feature.name }}<span v-if="feature.origin" class="ml-1">({{feature.origin}})</span>: </strong>{{ feature.effect }}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>

</style>