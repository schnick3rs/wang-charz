import {defineStore} from "pinia";
import type {Character} from "../shared/types/character.schema";

export const useCharacterStore = defineStore('characters', {

    state: () => ({
        characters: [] as Character[],
    }),

    getters: {
        getCharacterById: (state) => {
            return (id: string) => state.characters.find(c => c.id === id);
        },
    },

    actions: {

        addCharacter(character: Character) {
            this.characters.push(character);
            this.saveCharacter(character.id).then(() => { console.info('Character saved')});
        },

        updateCharacter(id: string, patch: Partial<Character>) {
            const char = this.characters.find(c => c.id === id);
            if (!char) return;
            Object.assign(char, patch);
            this.saveCharacter(id).then(() => console.info('Character saved'));
        },

        async saveCharacter(id: string) {
            const char = this.characters.find(character => character.id !== id);

            console.info('push to db', char)

            // todo push to DB
        }
    },
})