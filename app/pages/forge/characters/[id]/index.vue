<script setup lang="ts">
import {useCharacterStore} from "~~/stores/characters.ts";
import {attributeRepository, skillRepository, type Trait, traitRepository} from "#shared/utils/stats.ts";
import type {TableColumn} from "@nuxt/ui";
import {UButton, USlideover, UUser} from "#components";

const route = useRoute()
const id = computed(() => route.params.id as string)
const store = useCharacterStore()

const entity = computed(() => store.byId[id.value])
const saving = computed(() => store.saving[id.value])

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

const bodyStyle = computed(() =>
    `background: url('https://i.imgur.com/R023gsf.png') no-repeat center bottom / cover, ` +
    `url('/img/artwork/mark-graham-mordian-hive-city-40k-gallery.jpg') no-repeat center / cover; min-height: 100vh;`
)

useHead({
  bodyAttrs: {
    // style: bodyStyle
  }
})

const { data: species } = await useAsyncData(
    `species-${entity.value.data.species.key}`,
    (_nuxtApp, { signal }) => $fetch(`/api/species/${entity.value.data.species.key}`, { signal }),
)

const { data: archetype } = await useAsyncData(
    `archetype-${entity.value.data.archetype.key}`,
    (_nuxtApp, { signal }) => $fetch(`/api/archetypes/${entity.value.data.archetype.key}`, { signal }),
)

const { data: characterTalents } = await useAsyncData(
    `talents-${entity.value.data.talents.map((talent) => talent.key).join('-')}`,
    async (_nuxtApp, { signal }) => {
      return await Promise.all(entity.value.data.talents.map((talent) => $fetch(`/api/talents/${talent.key}`, {signal})));
    }
)

const { data: characterPsychicPowers } = await useAsyncData(
    `psychic-powers-${entity.value.data.psychicPowers.map((talent) => talent.key).join('-')}`,
    async (_nuxtApp, { signal }) => {
      return await Promise.all(entity.value.data.psychicPowers.map((talent) => $fetch(`/api/psychic-powers/${talent.key}`, {signal})));
    }
)

const { data: characterWargear } = await useAsyncData(
    `wargear-${entity.value.data.wargear.map((talent) => talent.key).join('-')}`,
    async (_nuxtApp, { signal }) => {
      return await Promise.all(entity.value.data.wargear.map((wargear) => $fetch(`/api/wargear/${wargear.key}`, {signal})));
    }
)

const psychicPowersColumns: TableColumn<PsychicPower>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row, getValue }) => {
      return h(UUser, {
        name: getValue() as string,
        description: row.original.discipline
      })
    }
  },
  {
    accessorKey: 'crunch_activation',
    header: 'Activation',
  },
  {
    accessorKey: 'crunch_range',
    header: 'Range',
  },
  {
    accessorKey: 'actions',
    header: '',
  },
]


function effectiveTrait(trait: Trait) {
  if (!entity.value) return '?'
  if (!species.value) return '?'

  if (trait.key === 'speed') return species.value.speed

  let baseValue = 0

  if (trait.attribute) {
    const associatedAttribute = attributeRepository.find((a) => a.name === trait.attribute)
    if (associatedAttribute) {
      baseValue = entity.value.data.attributes[associatedAttribute.key]
    }
  }

  if (trait.skill) {
    const associatedSkill = skillRepository.find((a) => a.name === trait.skill)
    if (associatedSkill) {
      baseValue = entity.value.data.skills[associatedSkill.key]
    }
  }

  const { static: statik, multi, tier, min } = trait.compute

  const computedValue = statik + ( baseValue * multi ) + (tier * entity.value.data.settingTier )

  return Math.ceil(Math.max(computedValue, min))
}


function skillDicePool(skill: { key: string }) {
  if (!entity.value) return '?'

  const skillValue = entity.value.data.skills[skill.key] || 0

  let characterAttributeValue = 0

  const associatedAttribute = attributeRepository.find((a) => a.name === skill.attribute)
  if (associatedAttribute) {
    characterAttributeValue = entity.value.data.attributes[associatedAttribute.key]
  }

  return skillValue + characterAttributeValue
}

const tabs = [
  {
    label: 'Weapons',
    slot: 'weapons'
  },
  {
    label: 'Wargear',
    slot: 'wargear'
  },
  {
    label: 'Abilities',
    slot: 'abilities'
  },
  {
    label: 'Powers',
    slot: 'powers'
  },
  {
    label: 'Description',
    slot: 'description'
  },
]

</script>

<template>

  <!-- avatar, name, basics, rank, tier, xp, keywords -->
  <div class="w-full flex flex-row gap-4 items-center flex-wrap :md:flex-nowrap">
    <NuxtImg v-if="entity.data.archetype?.key" :src="`/img/avatars/archetype/${entity.data.archetype.key}.png`" class="w-24 h-24 shrink-0 object-cover object-center rounded-lg" />
    <NuxtImg v-else-if="entity.data.species?.key" :src="`/img/avatars/species/${entity.data.species.key}.png`" class="w-24 h-24 shrink-0 object-cover object-center rounded-lg" />
    <NuxtImg v-else :src="`/img/avatar_placeholder.png`" class="w-24 h-24 shrink-0 object-cover object-center rounded-lg" />
    <div>
      <div class="text-highlighted font-semibol">{{ entity.data.name }}</div>
      <div class="mt-1 text-muted text-s">{{ (entity.data.species?.label || '?') + ' · ' + (entity.data.archetype?.label || '?') }}</div>

      <div class="mt-1 text-muted text-s">
        <span>Tier {{entity.data.settingTier}} · Rank  {{ entity.data.rank }} · {{ entity.data.earnedXp }} XP</span>

        <USlideover title="Manage XP and Rank">

          <UButton icon="i-heroicons-cog-6-tooth-16-solid" color="neutral" variant="ghost" size="sm" />

          <template #body>
            <p class="mb-4">
              Manage your earned XP
            </p>

            <USeparator class="my-4"></USeparator>

            <div class="flex flex-col gap-8">
              <UFormField
                  label="Earned XP"
                  help="Set your total earned XP within the campaign"
                  size="xl"
              >
                <UInput v-model="entity.data.earnedXp" type="number" class="w-full"></UInput>
              </UFormField>

              <UFormField
                  label="Rank"
                  hint="usually increases at 40 and 80 XP"
                  :help="(Math.floor(entity.data.earnedXp / 40) + 1) > entity.data.rank ? 'Check with your GM if you rank up' : ''"
                  size="xl"
              >
                <UInputNumber v-model="entity.data.rank" class="w-full" :min="1"></UInputNumber>
              </UFormField>
            </div>


            <USeparator class="my-4"></USeparator>

            <div class="text-center italic mt-4">Changes will be saved automatically..</div>
            <UProgress v-if="saving" size="xs"></UProgress>

          </template>
        </USlideover>
      </div>

      <UProgress :model-value="entity.data.earnedXp" :max="100" color="error" :ui="{ base: 'bg-error-100'}" size="xs"/>
    </div>
    <div class="grow"></div>
    <div class="flex gap-1">

      <UModal title="Regroup" description="Core, pg. 196">
        <UButton color="info" variant="subtle" size="sm">Short Regroup</UButton>

        <template #body>
          <p>A short period of downtime, aprox. one hour.</p>
          <ul>
            <li>Heal a single character, they regain wounds equal to your Medicae dice pool.</li>
          </ul>
        </template>
      </UModal>

      <UModal title="Respite" description="Core, pg. 196">
        <UButton color="info" variant="subtle" size="sm">Long Respite</UButton>

        <template #body>
          <p>A long period of downtime, aprox. six hour.</p>
          <ul>
            <li>You can perform 1-2 hours of light activities</li>
            <li>Stressfull activities of 1 or more hours interrupt the Regroup</li>
            <li>You can't benefit while dying</li>
            <li>Reduce Wounds to Zero</li>
            <li>Reduce Shock to Zero</li>
            <li>Reset Wrath to two</li>
            <li>Restore all your spend Faith Points</li>
          </ul>
        </template>
      </UModal>


      <UButton disabled>Print</UButton>
      <UButton :to="`/forge/characters/${entity.id}/builder/setting`">Edit</UButton>
    </div>
  </div>

  <div class="w-full mt-4 grid grid-cols-1 lg:grid-cols-[1fr_1fr_2fr] gap-4">

    <!-- Column 1: Attributes + Traits, stacked -->
    <div class="flex flex-col gap-4">

        <div class="rounded-lg overflow-hidden border border-gray-200 shadow-sm">

          <!-- Header -->
          <div class="bg-amber-700 px-4 py-2">
            <h2 class="text-white font-semibold text-lg">Attributes</h2>
          </div>

          <!-- Table -->
          <table class="w-full text-sm">
            <thead>
            <tr class="text-gray-500 uppercase text-xs tracking-wide">
              <th class="text-left font-medium px-2 py-2">Attribute</th>
              <th class="text-center font-medium px-2 py-2">Rating</th>
              <th class="text-center font-medium px-2 py-2">Enhanced</th>
              <th class="text-center font-medium px-2 py-2">Notes</th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="attribute in attributeRepository"
                :key="attribute.key"
                class="border-t border-gray-100"
            >
              <td class="px-1.5 py-1.5 ">{{ $t(`stats.${attribute.key}`, attribute.name) }}</td>
              <td class="px-1.5 py-1.5 text-center ">{{ entity.data.attributes[attribute.key] }}</td>
              <td class="px-1.5 py-1.5 text-center ">{{ entity.data.attributes[attribute.key] }}</td>
              <td class="px-1.5 py-1.5 text-center">
              <span
                  class="text-error"
              >
                {{ 'up' === 'up' ? '▲' : '▼' }}
              </span>
              </td>
            </tr>
            </tbody>
          </table>
      </div>

        <div class="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
          <!-- Header -->
          <div class="bg-amber-700 px-4 py-2">
            <h2 class="text-white font-semibold text-lg">Traits</h2>
          </div>

          <!-- Table -->
          <table class="w-full text-sm">
            <tbody>
            <tr
                v-for="trait in traitRepository"
                :key="trait.key"
                class="border-t border-gray-100"
            >
              <td class="px-1.5 py-1.5 text-gray-800">
                {{ $t(`stats.${trait.key}`, trait.name) }}
                <UButton
                    v-if="['corruption', 'influence', 'wealth'].includes(trait.key)"
                    icon="i-heroicons-cog-6-tooth"
                    color="neutral"
                    variant="ghost"
                    size="xs"
                    disabled
                />
              </td>
              <td class="px-1.5 py-1.5 text-right text-gray-400 truncate">
                <template v-if="['maxWounds', 'maxShock', 'wealth'].includes(trait.key)">
                  <span v-if="effectiveTrait(trait) > 10">{{effectiveTrait(trait)-5}} / </span>
                  <span v-else>{{ '☐'.repeat(effectiveTrait(trait)) }}</span>
                </template>
              </td>
              <td class="px-1.5 py-1.5 text-center text-gray-700">{{ effectiveTrait(trait) }}</td>
              <td class="px-1.5 py-1.5 text-center">
              <span
                  class="text-error"
              >
                {{ 'up' === 'up' ? '▲' : '▼' }}
              </span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

    </div>

    <!-- Right column: Skills -->
    <div class="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
        <!-- Header -->
        <div class="bg-amber-700 px-4 py-2">
          <h2 class="text-white font-semibold text-lg">Skills</h2>
        </div>

        <!-- Table -->
        <table class="w-full text-sm">
          <thead>
          <tr class="text-gray-500 uppercase text-xs tracking-wide">
            <th class="text-left font-medium px-2 py-2">Attribute</th>
            <th class="text-center font-medium px-2 py-2">Rating</th>
            <th class="text-center font-medium px-2 py-2">Att</th>
            <th class="text-center font-medium px-2 py-2">Total</th>
            <th class="text-center font-medium px-2 py-2">Notes</th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="skill in skillRepository"
              :key="skill.key"
              class="border-t border-gray-100"
          >
            <td class="px-1.5 py-1.5 text-gray-800">{{ $t(`stats.${skill.key}`, skill.name) }}</td>
            <td class="px-1.5 py-1.5 text-center text-gray-700">{{ entity.data.skills[skill.key] }}</td>
            <td class="px-1.5 py-1.5 text-center text-gray-700">{{ skill.attribute.substring(0,3) }}</td>
            <td class="px-1.5 py-1.5 text-center text-gray-700">{{ skillDicePool(skill) }}</td>
            <td class="px-1.5 py-1.5 text-center">
              <span class="text-error">{{ 'up' === 'up' ? '▲' : '▼' }}</span>
            </td>
          </tr>
          </tbody>
        </table>
    </div>

    <!-- Ability Tabs -->
    <section title="extras" class="border rounded-lg border-gray-200 shadow-sm">
      <UTabs
          :items="tabs"
          color="error"
          variant="link"
          :ui="{ content: 'p-2'}"
      >

        <template #weapons>
          WEAP
        </template>

        <template #wargear>
          <div v-for="item in characterWargear" :key="item.id">
            {{item.name}}
          </div>
        </template>

        <!-- All, Species, Archetype, Ascension, Talents, Other (e.g. keywords ) -->
        <template #abilities>

          <template v-if="species && species.speciesFeatures.length > 0">
            <h3 class="font-light text-sm text-error mt-4">Species<span class="text-muted font-light"> • {{ species.name }}</span></h3>
            <USeparator class="mb-2" />
            <div class="flex flex-col gap-2">
              <div v-for="feature in species.speciesFeatures" :key="feature.key" class="text-sm">
                <strong>{{ feature.name }}</strong>
                <!-- eslint-disable-next-line vue/no-v-html -->
                <div v-if="feature.description" v-html="feature.description"/>
                <div v-else><p>{{ feature.snippet}}</p></div>
              </div>
            </div>
          </template>

          <template v-if="archetype && archetype.archetypeFeatures.length > 0">
            <h3 class="font-light text-sm text-error mt-4">Archetype<span class="text-muted font-light"> • {{ archetype.name }}</span></h3>
            <USeparator class="mb-2" />
            <div class="flex flex-col gap-2">
              <div v-for="feature in archetype.archetypeFeatures" :key="feature.key" class="text-sm">
                <strong>{{ feature.name }}</strong>
                <!-- eslint-disable-next-line vue/no-v-html -->
                <div v-if="feature.description" v-html="feature.description"/>
                <div v-else><p>{{ feature.snippet}}</p></div>
              </div>
            </div>
          </template>

          <template v-if="characterTalents && characterTalents.length > 0">
            <h3 class="font-light text-sm text-error mt-4">Talents</h3>
            <USeparator class="mb-2" />
            <div class="flex flex-col gap-2">
              <div v-for="talent in characterTalents" :key="talent.key" class="text-sm">

                <div class="inline-block align-middle">
                  <strong>{{ talent.name }}</strong>
                  <span class="text-muted font-light text-xs"> • {{ talent.source.book }}, pg. {{ talent.source.page }}</span>
                </div>

                <!-- eslint-disable-next-line vue/no-v-html -->
                <div v-if="talent.description" v-html="talent.description" class="html-content"/>
                <div v-else><p>{{ talent.snippet }}</p></div>
              </div>
            </div>
          </template>

        </template>

        <template #powers>
            <UTable :columns="psychicPowersColumns" :data="characterPsychicPowers" class="overflow-x-auto">
              <template #actions-cell="{ row }">
                <USlideover
                    :title="row.original.name"
                    :description="row.original.discipline"
                >
                  <UButton
                      icon="i-lucide-ellipsis-vertical"
                      color="neutral"
                      variant="ghost"
                      aria-label="Actions"
                  />

                  <template #body>

                    <div><strong>Cast</strong> as a {{ row.original.crunch_activation}}</div>

                    <div><strong>DN:</strong> {{ row.original.crunch_difficulty_number }}</div>
                    <div><strong>Duration:</strong> {{ row.original.crunch_duration }}</div>
                    <div><strong>Range:</strong> {{ row.original.crunch_range }}</div>
                    <div><strong>Multi-Target:</strong> {{ row.original.crunch_multi_target ? 'yes' : 'no' }}</div>

                    <USeparator class="my-2" />

                    <div>{{ row.original.effect }}</div>

                    <div v-if="row.original.crunch_potency"><strong>Potency:</strong> {{ row.original.crunch_potency.join(', ') }}</div>

                    <USeparator class="my-2" />

                    <div>
                      <strong>Keywords: </strong>
                      <UBadge v-for="k in row.original.keywords" :key="k" variant="outline" color="error" class="uppercase mr-1" size="sm">{{k}}</UBadge>
                    </div>

                    <div>
                      <strong>Source:</strong> <span class="italic">{{ row.original.source.book }}, pg. {{ row.original.source.page }}</span>
                    </div>

                  </template>
                </USlideover>
              </template>
            </UTable>
        </template>

        <template #description>
          DESC
        </template>

      </UTabs>
    </section>

  </div>

</template>

<style>
.html-content {
  color: var(--ui-text-toned);
}

.html-content > *:first-child {
  margin-top: 0;
}

.html-content ul,
.html-content ol,
.html-content p {
  margin-bottom: 0.5em;
}

.html-content a {
  color: var(--ui-primary);
  text-decoration: underline;
  text-decoration-color: var(--ui-border-accented);
  text-underline-offset: 2px;
}

.html-content a:hover {
  text-decoration-color: var(--ui-primary);
}

.html-content ul,
.html-content ol {
  padding-left: 1.5em;
}

.html-content ul {
  list-style: disc;
}

.html-content ol {
  list-style: decimal;
}

.html-content img {
  display: block;
  max-width: 100%;
  margin: 1.5em auto;
  border-radius: var(--ui-radius);
}

.html-content hr {
  border: none;
  border-top: 1px solid var(--ui-border);
  margin: 2em 0;
}

.html-content code {
  color: hsl(122 39% 49%);
  background-color: var(--ui-bg-elevated);
  padding: 0.15em 0.4em;
  border-radius: calc(var(--ui-radius) * 0.75);
}

.html-content pre {
  background-color: var(--ui-bg-elevated);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
  padding: 1em;
  margin-bottom: 1.25em;
  overflow-x: auto;
}

.html-content pre code {
  color: var(--ui-text);
  background-color: transparent;
  padding: 0;
}

.html-content blockquote {
  border-left: 3px solid var(--ui-primary);
  background-color: var(--ui-bg-elevated);
  color: var(--ui-text-toned);
  padding: 0.75em 1.25em;
  margin: 1.25em 0;
  border-radius: 0 var(--ui-radius) var(--ui-radius) 0;
}

.html-content blockquote p {
  font-weight: 300;
  margin: 0;
}

.html-content table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.25em;
}

.html-content th,
.html-content td {
  border: 1px solid var(--ui-border);
  padding: 0.5em 0.75em;
  text-align: left;
}

.html-content th {
  background-color: var(--ui-bg-elevated);
  color: var(--ui-text-highlighted);
  font-weight: 600;
}
</style>