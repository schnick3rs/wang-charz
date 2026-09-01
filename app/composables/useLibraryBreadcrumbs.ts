import type { BreadcrumbItem } from '@nuxt/ui'
import { library, type LibraryItem } from '#shared/navigation/library'

export function useLibraryBreadcrumbs() {
    const route = useRoute()
    const key = route.path.split('/').filter(Boolean).at(-1) as LibraryItem['key']

    const libItem = library.find((item) => item.key === key) as LibraryItem

    const crumbs = ref<BreadcrumbItem[]>([
        { label: '', icon: 'i-lucide-home', to: '/' },
        { label: 'Library', icon: 'i-game-icons-bookshelf', to: '/library' },
        { label: libItem.title, icon: libItem.icon, to: libItem.link.route },
    ])

    return { libItem, crumbs }
}