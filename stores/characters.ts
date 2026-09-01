import {defineStore} from "pinia";
import type {Database, Json, TablesInsert} from "~~/types/database.types.ts";
import {z} from "zod";
import type {CharacterDataType} from "#shared/types/character-data.schema.ts";

const SAVE_DELAY = 800 // ms — debounce straight to Supabase, no local tier in between

// Keyed per character id, so editing char A never resets char B's pending save.
const timers = new Map<string, ReturnType<typeof setTimeout>>()

// The store's unit of truth: one row, unwrapped only as far as separating
// metadata from payload — never flattened into just `data`, so id/timestamps
// aren't duplicated inside the jsonb blob.
export const CharacterEntitySchema  = z.object({
    id: z.uuid(),
    userId: z.uuid(),
    createdAt: z.date(),
    updatedAt: z.date(),
    isDeleted: z.boolean(),
    data: CharacterDataSchema,
})
export type CharacterEntityType = z.infer<typeof CharacterEntitySchema>

function fromRow(row: Database['public']['Tables']['characters']['Row']): CharacterEntityType {
    return {
        id: row.id,
        userId: row.user_id,
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
        isDeleted: row.is_deleted,
        data: row.data as unknown as CharacterDataType,
    }
}

function toRow(id: string, data: CharacterDataType): TablesInsert<'characters'> {
    return {
        id,
        data: data as unknown as Json,
        // created_at / user_id: leave to DB defaults on insert, omitted here
        // updated_at: let Postgres set it too if you add a trigger; otherwise set explicitly:
        updated_at: new Date().toISOString(),
    }
}

export const useCharacterStore = defineStore('characters', {

    state: () => ({
        byId: {} as Record<string, CharacterEntityType>,
        order: [] as string[],
        activeId: null as string | null,
        hydrated: false,
        saving: {} as Record<string, boolean>
    }),

    getters: {
        active: (state) => (state.activeId ? state.byId[state.activeId] : null),
        characterList: (state) => state.order.map((id) => state.byId[id]).filter(Boolean),
    },

    actions: {

        async hydrate() {
            const supabase = useSupabaseClient<Database>()
            const { data: rows, error } = await supabase
                .from('characters')
                .select('*')
                .eq('is_deleted', false)
                .order('updated_at', { ascending: false })

            if (error) {
                console.error('Failed to load characters:', error)
                return
            }

            for (const row of rows) {
                const entity = fromRow(row)
                this.byId[entity.id] = entity
                this.order.push(entity.id)
            }
            this.hydrated = true
        },

        createCharacter(initial: Partial<CharacterDataType> & { name: string }) {
            const id = crypto.randomUUID()
            const now = new Date()
            this.byId[id] = {
                id,
                userId: '', // filled in from the upsert response once saveNow resolves
                createdAt: now,
                updatedAt: now,
                isDeleted: false,
                data: initial as CharacterDataType,
            }
            this.order.unshift(id)
            this.scheduleSave(id)
            return id
        },

        updateCharacter(id: string, patch: Partial<CharacterDataType>) {
            const entity = this.byId[id]
            if (!entity) return
            entity.data = { ...entity.data, ...patch }
            this.scheduleSave(id)
        },

        async deleteCharacter(id: string) {
            clearTimeout(timers.get(id))
            timers.delete(id)
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete this.byId[id]
            this.order = this.order.filter((x) => x !== id)

            const supabase = useSupabaseClient<Database>()
            const { error } = await supabase.from('characters').delete().eq('id', id)
            if (error) console.error(`Delete failed for ${id}:`, error)
        },

        // ---------- persistence ----------

        scheduleSave(id: string) {
            clearTimeout(timers.get(id))
            timers.set(
                id,
                setTimeout(() => this.saveNow(id), SAVE_DELAY)
            )
        },

        async saveNow(id: string) {
            const entity = this.byId[id]
            if (!entity) return

            const parsed = CharacterDataSchema.safeParse(entity.data)
            if (!parsed.success) {
                console.error(`Character ${id} failed validation before save:`, parsed.error, entity.data)
                return
            }

            this.saving[id] = true
            const supabase = useSupabaseClient<Database>()
            const { data: row, error } = await supabase
                .from('characters')
                .upsert(toRow(id, parsed.data))
                .select()
                .single()
            this.saving[id] = false

            if (error) {
                console.error(`Save failed for ${id}:`, error)
                this.scheduleSave(id) // simplest retry: reschedule — good enough at hobby scale
                return
            }

            // Pull canonical metadata back from the DB (real created_at/updated_at/user_id)
            // rather than trusting client-side guesses. Mutate in place — never replace
            // the entity object itself, since swapping it out invalidates computeds that
            // point at `byId[id]` and, combined with a deep watch elsewhere, causes an
            // infinite save loop (watch refires -> scheduleSave -> saveNow -> replace -> ...).
            const saved = fromRow(row)
            const current = this.byId[id]
            if (current) {
                current.id = saved.id
                current.userId = saved.userId
                current.createdAt = saved.createdAt
                current.updatedAt = saved.updatedAt
                current.isDeleted = saved.isDeleted
            }
        },

    },
})