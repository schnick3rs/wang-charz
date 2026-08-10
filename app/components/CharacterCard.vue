<script setup lang="ts">
export type CharacterCardData = {
  id: string
  name: string
  avatarUrl: string
  speciesLabel: string
  archetypeLabel: string
  rank: number
  spendBp: number
  totalBp: number
  settingTier: number
  settingTitle: string
  version: number
  isLegacyVersion: boolean
}

const props = defineProps<{
  character: CharacterCardData
  builderVersion: number
}>()

defineEmits<{
  export: []
  delete: []
  migrate: []
}>()

const outdated = computed(() => props.character.version < props.builderVersion)
</script>

<template>
  <UCard :ui="{ body: 'p-0', footer: 'flex flex-wrap gap-1' }">
    <div class="flex">
      <div
        class="size-[120px] shrink-0 bg-cover bg-center"
        :style="{ backgroundImage: `url(${character.avatarUrl})` }"
      />

      <div class="flex-1 min-w-0 p-4 space-y-1">
        <h3 class="font-semibold text-lg truncate">{{ character.name }}</h3>

        <UButton
          v-if="character.isLegacyVersion"
          color="warning"
          size="sm"
          icon="i-lucide-cloud-download"
          @click="$emit('export')"
        >
          Export Legacy
        </UButton>
        <UButton
          v-else-if="outdated"
          color="warning"
          size="xs"
          icon="i-lucide-cloud-upload"
          @click="$emit('migrate')"
        >
          Migrate (v{{ character.version }})
        </UButton>

        <p class="text-sm text-muted">
          {{ character.speciesLabel }} • {{ character.archetypeLabel }}
        </p>
        <p class="text-sm text-muted">
          Rank {{ character.rank }} • {{ character.spendBp }} / {{ character.totalBp }} XP
        </p>
      </div>
    </div>

    <USeparator />

    <p class="p-2 text-sm">
      <strong>Tier {{ character.settingTier }}:</strong> <em>{{ character.settingTitle }}</em>
    </p>

    <template #footer>
      <UButton
        :to="`/forge/characters/${character.id}/builder/setting`"
        variant="ghost"
        size="xs"
        icon="i-lucide-pencil"
        :disabled="outdated"
      >
        Edit
      </UButton>
      <UButton
        :to="`/forge/characters/${character.id}`"
        variant="ghost"
        size="xs"
        icon="i-lucide-file-text"
        :disabled="outdated"
      >
        View
      </UButton>
      <UButton
        variant="ghost"
        size="xs"
        icon="i-lucide-cloud-download"
        @click="$emit('export')"
      >
        Export
      </UButton>
      <UButton
        color="error"
        variant="ghost"
        size="sm"
        icon="i-lucide-trash-2"
        @click="$emit('delete')"
      >
        Delete
      </UButton>
    </template>
  </UCard>
</template>
