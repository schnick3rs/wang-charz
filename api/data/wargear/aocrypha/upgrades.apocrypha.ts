import {gear} from "../utils";
import {Wargear} from "../../../shared/schemas/wargear.schema";

export const aaoaWeaponUpgrades: Wargear[] = [
    // Upgrades
    // Reloads & Ammunition
    ...[
        {
            ...gear('aaoa',163,'Shrieker Bio-Explosive Discs','9L','Harlequin'),
            type: 'Ammo',
            subtype: 'Special Shuriken Ammo',
            snippet: 'The Weapon gains the Careful and Inflict (Poison 7) traits. It also gains Bio-Explosive (explodes on death) and is only a single round (no salvo, its gone).',
            description:
                '<p><strong>Effect: </strong>The weapon gains the Careful and Inflict (Poisoned 7) trait.</p>' +
                '<p><strong>Bio-Explosive: </strong>A character who is Poisoned by Shrieker ammo is also Staggered and suffers 1d3 Mortal Wounds at the start of each of their turns. If they are slain by this damage, they explode with a Medium blast, inflicting 10+6ED damage to anyone in that blast. Any of the victim’s allies within 15 metres must attempt a Terror test (DN 7).</p>' +
                '<p><strong>Single Shot: </strong>A reload of Shrieker ammo consists of a single round. Using this ammunition expends that round, and grants none of the normal benefits a Salvo action.</p>',
        },
        {
            ...gear('aaoa',162,'Exitus Hellfire Rounds','10L','Templum Vindicare'),
            type: 'Ammo',
            subtype: 'Special Exitus Ammo',
            snippet: '2ED, +3ED against organic targets . In addition, the weapon gains the Careful and Inflict (Poisoned 5) trait. Poisoned. Single Shot. (see rules)',
            description:
                '<p>2ED, +3ED against organic targets . In addition, the weapon gains the Careful and Inflict (Poisoned 5) trait.</p>' +
                '<p><strong>Poisoned:</strong> A creature Poisoned by an Exitus round suffers 1d3 Mortal Wounds at the start of each of their turns.</p>' +
                '<p><strong>Single Shot:</strong> A reload of Exitus special ammunition consists of a single round. Using this ammunition expends that round , and grants none of the normal benefits a Salvo action.</p>',
        },
        {
            ...gear('aaoa',162,'Exitus Shield-breaker Rounds','10L','Templum Vindicare'),
            type: 'Ammo',
            subtype: 'Special Exitus Ammo',
            snippet: 'The weapon gains the Careful and Warp Weapon traits. (see rules)',
            description:
                '<p>The weapon gains the Careful and Warp Weapon traits. Single Shot.</p>' +
                '<p><strong>Single Shot:</strong>A reload of Exitus special ammunition consists of a single round. You sing this ammunition expends that round, and grants none of the normal benefits a Salvo action.</p>',
        },
        {
            ...gear('aaoa',162,'Exitus Turbo-Penetrator Rounds','10L','Templum Vindicare'),
            type: 'Ammo',
            subtype: 'Special Exitus Ammo',
            snippet: 'The weapon gains the Careful, Brutal , and Rending [4] traits. (see rules)',
            description:
                '<p>The weapon gains the Careful, Brutal , and Rending [4] traits. Single Shot.</p>' +
                '<p><strong>Single Shot:</strong> A reload of Exitus special ammunition consist s of a single round. Using this ammunition expends that round, and grants none of the no rmal benefits a Salvo action</p>',
        },
    ],
    // Drukhari Poisons
];