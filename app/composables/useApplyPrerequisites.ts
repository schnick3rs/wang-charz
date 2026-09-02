import type { Prerequisite } from "#shared/types/archetype.ts"

/**
 * Composable factory. Call this inside a component `setup()` (or another
 * composable) to get an `applyPrerequisites` function bound to the current
 * i18n instance.
 *
 * Note: `applyPrerequisites` mutates `data` in place and returns a log of
 * the changes made.
 */
export function useApplyPrerequisites() {
    const { t } = useI18n()

    function applyPrerequisites(data: CharacterDataType, prerequisites: Prerequisite[]): string[] {
        const log: string[] = []

        function apply(prerequisite: Prerequisite) {
            const { group, value, threshold } = prerequisite

            switch (group) {
                case 'attributes':
                case 'skills':
                    if (data[group][value] < threshold) {
                        data[group][value] = threshold
                        log.push(`Increased ${t(`stats.${value}`)} to ${threshold}`)
                    }
                    break
                default:
                    console.warn('Unknown prerequisite group', group)
            }
        }

        prerequisites.forEach(apply)
        return log
    }

    return { applyPrerequisites }
}