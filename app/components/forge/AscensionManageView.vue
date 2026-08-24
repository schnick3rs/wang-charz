<script setup lang="ts">
import {useCharacterStore} from "~~/stores/characters.ts";

const {
  entityId,
  ascensionPackageKey ,
} = defineProps<{
  entityId: string,
  ascensionPackageKey: string,
}>();

const { data: ascensionPackage } = await useAsyncData(
    `ascension-package-${ascensionPackageKey}`,
    (_nuxtApp, { signal }) => $fetch(`/api/ascension-packages/${ascensionPackageKey}`, { signal }),
)

const store = useCharacterStore()
const entity = computed(() => store.byId[entityId])

function removeAscension(ascensionPackageKey: string) {
  if (!entity.value) return
  console.info('Remove Ascension Package', ascensionPackageKey)

  const ascensions = entity.value.data.ascensions
  const index = ascensions.findIndex(a => a.key === ascensionPackageKey)

  if (index === -1) {
    console.warn('Ascension package not found:', ascensionPackageKey)
    return
  }

  ascensions.splice(index, 1)
  store.scheduleSave(entity.value.id)
}

const open = ref(false)
</script>

<template>
  <UCard v-if="ascensionPackage">

      <div class="flex flex-row justify-between mb-2">
        <div class="flex flex-col">
          <span class="text-2xl font-bold mb-2">
            {{ ascensionPackage.name }}
                      <UButton
                          variant="subtle"
                          color="error"
                          class="mt-2 cursor-pointer"
                          size="xs"
                          @click="removeAscension(ascensionPackage.key)"
                      >
            Remove Ascension Package
          </UButton>

          </span>
          <span>{{ ascensionPackage.hint }}</span>


        </div>
        <div>
          <NuxtImg :src="`/img/avatars/ascension/${ascensionPackage.key}.png`" class="w-30 h-30 object-cover rounded-lg" />
        </div>
      </div>

    <UCollapsible v-model:open="open" :unmount-on-hide="false">


      <template #content>

        <!-- header -->
        <div class="flex flex-row gap-4">
          <UFieldGroup>
            <UBadge color="info" variant="subtle">Tier</UBadge>
            <UBadge color="info">3 => 5</UBadge>
          </UFieldGroup>
          <UFieldGroup>
            <UBadge color="info" variant="subtle">Cost</UBadge>
            <UBadge color="info">20</UBadge>
            <UBadge color="info" variant="subtle">(New Tier x 10)</UBadge>
          </UFieldGroup>
        </div>


        <!-- features -->
        <template v-if="ascensionPackage.ascensionFeatures.length > 0">

          <div class="mt-4 mb-4">
            <h3 class="text-sm text-muted">Story Elements and Benefits</h3>
            <USeparator class="mb-2" />

            <div class="flex flex-col gap-2">
              <div v-for="feature in ascensionPackage.ascensionFeatures" :key="feature.name">
                <ForgeFeatureDetails :feature="feature"/>
              </div>
            </div>
          </div>
        </template>
      </template>
    </UCollapsible>

    <template #footer>
      <UButton
          :icon="open ? 'i-heroicons-chevron-double-up-solid' : 'i-heroicons-chevron-double-down-solid'"
          color="neutral"
          variant="ghost"
          block
          @click="open = !open"
      />
    </template>

  </UCard>
</template>

<style scoped>

</style>