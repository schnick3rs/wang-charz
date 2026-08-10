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

const heroImage = computed(() => {
  const url = data.value?.imageTwitter?.fields.file.url
  return url ? `https:${url}` : undefined
})

const formattedDate = computed(() => {
  if (!data.value?.publishedAt) return ''
  return new Date(data.value.publishedAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
})

const contentHtml = computed(() =>
    data.value ? documentToHtmlString(data.value.content) : ''
)
</script>

<template>
  <DoomBreadcrumb :items="crumbs" />

  <template v-if="pending">
    <USkeleton class="mb-6 aspect-video w-full rounded-lg" />
    <USkeleton class="h-10 w-2/3 mb-3" />
    <USkeleton class="h-4 w-1/3 mb-8" />
    <div class="space-y-3">
      <USkeleton class="h-4 w-full" />
      <USkeleton class="h-4 w-full" />
      <USkeleton class="h-4 w-5/6" />
    </div>
  </template>

  <article v-else-if="data" class="mx-auto max-w-3xl">
    <img
        v-if="heroImage"
        :src="heroImage"
        :alt="data.title"
        class="mb-6 aspect-video w-full rounded-lg object-cover"
    />

    <h1 class="text-3xl sm:text-4xl text-pretty font-bold text-highlighted border-b-4 pb-2 border-b-blue-600">
      {{ data.title }}
    </h1>

    <div class="mt-3 mb-8 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
      <span v-if="data.author" class="flex items-center gap-1.5">
        <UIcon name="i-lucide-user" class="size-4" />
        {{ data.author }}
      </span>
      <span v-if="formattedDate" class="flex items-center gap-1.5">
        <UIcon name="i-lucide-calendar" class="size-4" />
        {{ formattedDate }}
      </span>
    </div>

    <div v-html="contentHtml" class="article-content"></div>
  </article>
</template>

<style>
.article-content {
  font-size: 1rem;
  line-height: 1.75;
  color: var(--ui-text-toned);
}

.article-content > *:first-child {
  margin-top: 0;
}

.article-content p {
  margin-bottom: 1em;
}

.article-content h2,
.article-content h3,
.article-content h4 {
  color: var(--ui-text-highlighted);
  font-weight: 600;
  line-height: 1.3;
  margin-top: 1.75em;
  margin-bottom: 0.75em;
}

.article-content h2 {
  font-size: 1.5rem;
}

.article-content h3 {
  font-size: 1.25rem;
}

.article-content h4 {
  font-size: 1.1rem;
}

.article-content a {
  color: var(--ui-primary);
  text-decoration: underline;
  text-decoration-color: var(--ui-border-accented);
  text-underline-offset: 2px;
}

.article-content a:hover {
  text-decoration-color: var(--ui-primary);
}

.article-content ul,
.article-content ol {
  margin-bottom: 1.25em;
  padding-left: 1.5em;
}

.article-content ul {
  list-style: disc;
}

.article-content ol {
  list-style: decimal;
}

.article-content li {
  margin-bottom: 0.4em;
}

.article-content li > ul,
.article-content li > ol {
  margin-top: 0.4em;
  margin-bottom: 0;
}

.article-content img {
  display: block;
  max-width: 100%;
  margin: 1.5em auto;
  border-radius: var(--ui-radius);
}

.article-content hr {
  border: none;
  border-top: 1px solid var(--ui-border);
  margin: 2em 0;
}

.article-content code {
  color: hsl(122 39% 49%);
  background-color: var(--ui-bg-elevated);
  padding: 0.15em 0.4em;
  border-radius: calc(var(--ui-radius) * 0.75);
  font-size: 0.875em;
}

.article-content pre {
  background-color: var(--ui-bg-elevated);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
  padding: 1em;
  margin-bottom: 1.25em;
  overflow-x: auto;
}

.article-content pre code {
  color: var(--ui-text);
  background-color: transparent;
  padding: 0;
}

.article-content blockquote {
  border-left: 3px solid var(--ui-primary);
  background-color: var(--ui-bg-elevated);
  color: var(--ui-text-toned);
  padding: 0.75em 1.25em;
  margin: 1.25em 0;
  border-radius: 0 var(--ui-radius) var(--ui-radius) 0;
}

.article-content blockquote p {
  font-size: 1.05em;
  font-weight: 300;
  margin: 0;
}

.article-content table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.25em;
  font-size: 0.95em;
}

.article-content th,
.article-content td {
  border: 1px solid var(--ui-border);
  padding: 0.5em 0.75em;
  text-align: left;
}

.article-content th {
  background-color: var(--ui-bg-elevated);
  color: var(--ui-text-highlighted);
  font-weight: 600;
}
</style>