import {stringToKebab} from "../utils";
import {getLegacySource} from "../legacy-sources";

export const ACTIVATION = {
    FREE_ACTION: 'Free Action',
    ACTION: 'Action',
    COMBAT_ACTION: 'Combat Action',
    SIMPLE_ACTION: 'Simple Action',
    FULL_ACTION: 'Full Action',
    REACTION: 'Reaction',
    MOVEMENT: 'Movement',
};

export const DURATION = {
    INSTANT: 'Instant',
    SUSTAINED: 'Sustained',
    ONE_ROUND: '1 Round',
    ONE_COMBAT: '1 Combat',
    ONE_SCENE: '1 Scene',
};

export function powerz(
    bookKey: string,
    sourcePage: number,
    name: string,
    discipline: string,
    cost: number | string,
    effect: string = '',
    stub: boolean = false
) {
    return {
        source: {
            ...getLegacySource(bookKey),
            page: sourcePage,
        },
        key: `${stringToKebab(`${bookKey} ${name}`)}`,
        name,
        cost,
        discipline,
        effect,
        stub,
    };
};

export const simpleStub = function (id, bookKey, sourcePage, cost, name, discipline, effect) {
    return {
        source: {
            ...getLegacySource(bookKey),
            page: sourcePage,
        },
        id,
        key: `${stringToKebab(`${bookKey} ${name}`)}`,
        name,
        cost,
        discipline,
        effect,
        stub: true,
    };
};

export  function simpleCrunch(
    dn: number | string,
    activation: string,
    duration: string,
    range: string,
    multi: boolean,
    effect: string = '',
    potency: string = ''
) {
    return {
        crunch_difficulty_number: dn,
        crunch_activation: activation,
        crunch_duration: duration,
        crunch_range: range,
        crunch_multi_target: multi,
        crunch_effect: effect,
        crunch_potency: potency.split(';'),
    };
};