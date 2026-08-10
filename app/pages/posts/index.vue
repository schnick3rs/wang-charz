<script setup lang="ts">
import type {BreadcrumbItem} from "@nuxt/ui";

const crumbs = ref<BreadcrumbItem[]>([
  {
    label: '',
    icon: 'i-lucide-home',
    to: '/'
  },
  {
    label: 'Articles',
    icon: 'i-game-icons-locked-chest',
    to: '/posts',
    exact: true
  },
])

type PostFields = {
  slug: string
  shortTitle: string
  description: string
  author: string
  publishedAt: string
  imageTwitter?: {
    fields: {
      file: {
        url: string
      }
    }
  }
}

const { data, pending } = await useAsyncData<PostFields[]>(
    'post',
    (_nuxtApp, { signal }) => $fetch('/api/posts', { signal }),
)

const posts = computed(() => (data.value ?? []).map((post) => ({
  title: post.shortTitle,
  description: post.description,
  date: post.publishedAt,
  authors: post.author ? [{ name: post.author }] : undefined,
  image: post.imageTwitter?.fields?.file?.url
      ? `https:${post.imageTwitter.fields.file.url}`
      : undefined,
  to: `/posts/${post.slug}`,
})))
</script>

<template>

  <DoomBreadcrumb :items="crumbs" />

  <h1 class="text-3xl sm:text-4xl text-pretty font-bold text-highlighted border-b-4 pb-2 mb-4 border-b-blue-600">Articles</h1>

  <div v-if="pending" class="grid gap-8 lg:gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
    <div v-for="n in 6" :key="n" class="space-y-3">
      <USkeleton class="aspect-[16/9] w-full rounded-lg" />
      <USkeleton class="h-5 w-2/3" />
      <USkeleton class="h-4 w-full" />
    </div>
  </div>

  <UBlogPosts v-else-if="posts.length" :posts="posts" />

  <p v-else class="text-muted">No articles yet.</p>

</template>