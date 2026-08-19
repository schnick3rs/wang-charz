<script setup lang="ts">
import WargearIcon from "~/components/WargearIcon.vue";

const props = defineProps<{
  wargearKey: string
}>()

const { data: wargear, pending } = await useAsyncData(
    `wargear-${props.wargearKey}`,
    (_nuxtApp, { signal }) => $fetch(`/api/wargear/${props.wargearKey}`, { signal }  ),
)

const subtitle = computed(() => {
  if (wargear.value) {
    const tags = [wargear.value.type];
    if (wargear.value.subtype) {
      tags.push(wargear.value.subtype);
    }
    return tags.filter((t) => t !== undefined).join(' • ');
  }
  return '';
})
const value = ref(null)
</script>

<template>
  <UCard>
    {{pending}}
    <div v-if="pending">
      AKAKAK
      <UProgress v-model="value"/>
    </div>
    <div v-else-if="wargear">
      <!-- header -->
      <div class="flex flex-row justify-between mb-2">
        <div class="flex flex-col">
          <span class="text-2xl font-bold mb-2">{{ wargear.name }}</span>
          <span class="italic text-sm font-medium">{{ wargear.source.book }}, pg. {{ wargear.source.page}}</span>
          <span class="text-muted">{{ subtitle }}</span>
        </div>
        <WargearIcon :type="wargear.type" :subtype="wargear.subtype" />
      </div>

      <!-- -->
      <template v-if="wargear.meta">

      </template>
    </div>
  </UCard>
</template>

<style scoped>

</style>