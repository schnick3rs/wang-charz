<script setup lang="ts">
import type { BreadcrumbItem } from "@nuxt/ui"

import type { Document } from '@contentful/rich-text-types'
import {documentToHtmlString} from "@contentful/rich-text-html-renderer";

type Post = {
  slug: string
  title: string
  description: string
  author: string
  publishedAt: string
  content: Document
  imageTwitter?: {
    fields: {
      file: { url: string }
    }
  }
}

const route = useRoute()
const slug = computed(() => String(route.params.slug))

const { data, pending, error } = await useAsyncData<Post>(
    () => `post-${slug.value}`,
    () => $fetch(`/api/posts/${slug.value}`),
    { watch: [slug] }
)

if (error.value || !data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}

useSeoMeta({
  title: () => data.value?.title,
  description: () => data.value?.description,
  ogTitle: () => data.value?.title,
  ogDescription: () => data.value?.description,
  ogImage: () => data.value?.imageTwitter?.fields.file.url,
  twitterImage: () => data.value?.imageTwitter?.fields.file.url,
  twitterCard: 'summary_large_image',
})

const crumbs = computed<BreadcrumbItem[]>(() => [
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
  {
    label: data.value?.title ?? '',
    to: `/posts/${data.value?.slug}`,
    exact: true
  },
])


const contentHtml = computed(() =>
    data.value ? documentToHtmlString(data.value.content) : ''
)
</script>

<template>
  <DoomBreadcrumb :items="crumbs" />

  <template v-if="pending">
    <USkeleton class="h-10 w-2/3 mb-4" />
    <USkeleton class="h-64 w-full" />
  </template>

  <template v-else-if="data">
    <h1 class="text-3xl sm:text-4xl text-pretty font-bold text-highlighted border-b-4 pb-2 mb-4 border-b-blue-600">
      {{ data.title }}
    </h1>
    <div v-html="contentHtml" class="markdown-html-text"></div>
  </template>
</template>

<style scoped>
.markdown-html-text ul,
.markdown-html-text ol {
  margin-bottom: 16px !important;
}

.markdown-html-text code {
  color: hsl(122 39% 49%);
  background-color: transparent;
}

.markdown-html-text blockquote {
  background-color: lightyellow;
  padding: 8px 16px;
  font-size: 18px;
  font-weight: 300;
  border-bottom: 1px solid lightgray;
  border-top: 1px solid lightgray;
  margin-top: 8px;
  margin-bottom: 16px;
}

.markdown-html-text blockquote p {
  font-size: 18px;
  font-weight: 300;
  margin: 0;
}
</style>