<script setup lang="ts">
import {useCharacterStore} from "~~/stores/characters.ts";

definePageMeta({ layout: 'forge' })

const route = useRoute()
const id = computed(() => route.params.id as string)
const store = useCharacterStore()

const entity = computed(() => store.byId[id.value])

const { data: archetype } = await useAsyncData(
    'archetype',
    (_nuxtApp, { signal }) => $fetch(`/api/archetypes/${entity.value.data.archetypeKey}`, { signal }),
)

const { data: keywords } = await useAsyncData(
    'keywords',
    (_nuxtApp, { signal }) => $fetch(`/api/keywords`, { signal }),
)

const selectedOptionKey = ref<string>()
const selectedFeatureOption = ref<string>()

const attributes = computed(() => {
  return archetype.value?.prerequisites.filter(pre => pre.group === 'attributes').map(pre => `${pre.value} ${pre.threshold}`).join(', ');
})
const skills = computed(() => {
  return archetype.value?.prerequisites.filter(pre => pre.group === 'skills').map(pre => `${pre.value} ${pre.threshold}`).join(', ');
})
</script>

<template>

  <div v-if="archetype" class="mx-auto max-w-3xl">

    <div class="flex flex-row justify-between mb-2">
      <div class="flex flex-col">
        <span class="text-2xl font-bold mb-2">{{ archetype.name }}</span>
        <span>{{ archetype.hint }}</span>

      </div>
      <div>
        <NuxtImg :src="`/img/avatars/archetype/${archetype.key}.png`" class="w-30 h-30 object-contain rounded-lg" />
        <UButton variant="ghost" color="info" :to="`/forge/characters/${id}/builder/archetype/choose`">Change Archetype</UButton>
      </div>
    </div>

    <!-- header -->
    <div class="flex flex-row gap-4">
      <UFieldGroup>
        <UBadge color="info" variant="subtle">Tier</UBadge>
        <UBadge color="info">{{ archetype.tier }}</UBadge>
      </UFieldGroup>
      <UFieldGroup>
        <UBadge color="info" variant="subtle">Species</UBadge>
        <UBadge color="info">{{ archetype.species.map(i => i.name).join(' / ') }}</UBadge>
      </UFieldGroup>
      <UFieldGroup>
        <UBadge color="info" variant="subtle">XP Cost</UBadge>
        <UBadge color="info">{{ archetype.cost }}</UBadge>
      </UFieldGroup>
    </div>

    <USeparator class="mb-2"/>

    <div v-if="attributes" class="mb-2"><strong>Attributes: </strong><span>{{ attributes }}</span></div>
    <div v-if="skills" class="mb-4"><strong>Skills: </strong><span>{{ skills }}</span></div>

    <!-- Keywords -->
    <div v-if="archetype.keywords" class="mb-4">
      <strong class="mr-2">Keywords:</strong>
      <span v-for="k in archetype.keywords" :key="k" class="text-error-800 font-semibold uppercase">{{k}}, </span>
    </div>

    <div v-if="archetype.keywords && keywords">
      <div v-for="k in archetype.keywords" :key="k">
        <ForgeKeywordDetails :keyword-name="k"/>
      </div>
    </div>

    <!-- features -->
    <template v-if="archetype.archetypeFeatures.length > 0">

      <div class="mb-4">

        <div class="flex flex-col gap-2">
          <div v-for="feature in archetype.archetypeFeatures" :key="feature.name">
            <strong>{{ feature.name }}</strong>
            <div v-if="feature.description" v-html="feature.description" />
            <div v-else><p>{{ feature.snippet}}</p></div>

            <!-- an option to be selected is identified by <species-key>.<feature-key> fspg-kroot.kroot-mutations.x -->
            <div v-if="feature.options" class="border-l-4 border-l-red-600  mt-2 pl-4 mb-4">
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

          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>

</style>