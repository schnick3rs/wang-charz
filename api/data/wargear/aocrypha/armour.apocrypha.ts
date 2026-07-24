import {armour, gear} from "../utils";
import {Wargear} from "../../../shared/schemas/wargear.schema";

export const aaoaArmour: Wargear[] = [
    // Basic
    ...[
        {
            ...gear('aaoa',166,'Arbites Carapace','6V','Heavy, Imperium, Adeptus Arbites'),
            ...armour('Basic Armour',4),
            description:
                '<p>The armour includes built-in vox-bead and a respirator.</p>',
        },
        {
            ...gear('aaoa',166,'Riot Shield','4U','Light,Imperium'),
            ...armour('Basic Armour',1,'Shield'),
        },
        {
            ...gear('aaoa',166,'Supression Shield','6R','Heavy,Shock,Imperium,Adeptus Arbites'),
            ...armour('Basic Armour',2,'Bulk (1), Shield, Discharge'),
            description:
                '<p><strong>Discharge: </strong>An enemy who fails a melee attack against someone wielding a suppression shield immediately suffers 1 Shock. Anyone suffering a complication on a melee attack against someone wielding a suppression shield suffers 1d3 Shock.</p>',
        },
        {
            ...gear('aaoa',166,'Vindicare Stealth Suit','10L','Light,Imperium,Officio Assassinorum,Templum Vindicare'),
            ...armour('Basic Armour',2, 'Cameleoline'),
            description:
                '<p><strong>Cameleoline:</strong> The photoreactive mimic - fibres in the suit blur’s the wearer’s outline, granting a +2d bonus to Stealth tests and a +2 bonus to Defence when in shadow or in cover.</p>',
        },
        {
            ...gear('aaoa',189,'Vratine armour', '7V', 'Powered, Imperium, Silent Sisterhood'),
            ...armour('Astartes Armour', 5, 'Powered (2)'),
        },
        {
            ...gear('aaoa',167,'Sicarian Battle-Armour', '6V', 'Heavy, Imperium, Adeptus Mechanicus, Skitarii'),
            ...armour('Basic Armour', 4),
            description:
                '<p>Sicarian Battle-Armour has an Armour Rating of 4, plus an invulnerable Armour Rating of *1, which do not stack.</p>'
        },
    ],
    // Astartes
    {
        ...gear('aaoa',174,'Gravis Mark X', '9V', 'Powered, Imperium, Adeptus Astartes, Primaris'),
        ...armour('Astartes Armour', 5, 'Powered (4), Bulk (1)'),
        description:
            '<p><strong>Reinforced:</strong> The wearer adds +2 to their Toughness while wearing this armour.</p>'
    },
    // Force Shields
    {
        ...gear('aaoa',174,'Voltagheist Field Generator', '6R', 'Force Field, Cult Mechanicus'),
        ...armour('Basic Armour', 3),
        description:
            '<p><strong>Discharge: </strong>When you charge while wearing a Voltagheist Field generator, roll a d6 for each enemy within 2m of you when you finish the charge. For each 6 rolled, that enemy suffers a Mortal Wound. Any enemy who rolls a 1 on their Wrath die when making a melee attack against you also suffers one Mortal Wound.</p>' +
            '<p><strong>Luminen Charge: </strong>A Voltagheist field generator will not function unless you have a Luminen Capacitor implant with one or more charges. If the Capacitor has more charges than its normal amount, then add +1 to the Armour Rating of the field for every additional charge you have, to a maximum Armour Rating of 6.</p>'
    },
    // Chaos
    // Aeldari
    ...[
        {
            ...gear('aaoa',176,'Aspect Armour', '5V', 'Aeldari, Asuryani, Aspect Warrior'),
            ...armour('Aeldari Armour', 4),
        },
        {
            ...gear('aaoa',176,'Heavy Aspect Armour', '5V', 'Heavy, Aeldari, Asuryani, Aspect Warrior'),
            ...armour('Aeldari Armour', 5, 'Bulk (1)'),
        },
        {
            ...gear('aaoa',167,'Exarch Armour', '5V', 'Aeldari, Asuryani, Aspect Warrior'),
            ...armour('Aeldari Armour', 6),
        },
        {
            ...gear('aaoa',176,'Forceshield', '8L', 'Force Field, Aeldari'),
            ...armour('Aeldari Armour', 3, 'Force Shield, Shield'),
        },
        {
            ...gear('aaoa',176,'Holo-Suit', '7V', 'Hologram, Light, Harlequin'),
            ...armour('Aeldari Armour', 1, 'Force Shield, Domino Field'),
            snippet: 'Gain defence bonus depending on previous movement: +1 (stationary), +2 (moved), +3 (ran), +4 (sprinted).',
            description:
                '<p><strong>Domino Field: </strong>A Holo-Suit increases the wearer’s Defence based on how much they have moved. It grants +1 Defence if the wearer was stationary last turn. This increases to +2 if the wearer moved, +3 if the wearer Ran, or +4 if the wearer Sprinted.</p>',
        },
    ],
    // Drukhari
    ...[
        {
            ...gear('aaoa',177,'Clone Field', '8L', 'Hologram, Drukhari'),
            ...armour('Drukhari Armour', 0, 'Deceptive Defence'),
            description:
                '<p>A Clone Field cannot be worn with Force Field armour, as energy fields disrupt the holographic decoys.</p>' +
                '<p><strong>Deceptive Defence:</strong> Whenever you are attacked while wearing a Clone Field, roll a d6. On an Icon, the attack is considered to have missed. This has no effect against Blasts or area effect attacks.</p>'
        },
        {
            ...gear('aaoa',177,'Ghostplate', '6V', 'Light, Drukhari'),
            ...armour('Drukhari Armour', 4, 'Force Shield, Field Projectors'),
            description:
                '<p><strong>Field Projectors:</strong> Ghostplate has an Armour Rating of 4, plus an invulnerable Armour Rating of *1, which do not stack.</p>'
        },
        {
            ...gear('aaoa',177,'Incubus Warsuit', '6V', 'Heavy, Drukhari'),
            ...armour('Drukhari Armour', 5, 'Tormentor'),
            description:
                '<p><strong>Tormentor:</strong> Enemies within 6 metres of this armour’s wearer suffer 1 Shock at the start of their turn.</p>'
        },
        {
            ...gear('aaoa',177,'Kabalite Warsuit','4R','Light,Drukhari'),
            ...armour('Drukhari Armour', 3),
            snippet: 'Contains a vox and a rebreather, or Dark Eldar equivalents of these items.',
        },
        {
            ...gear('aaoa',177,'Shadowfield', '8L', 'Force Field, Drukhari'),
            ...armour('Drukhari Armour', 8, 'Force Shield, Near-Perfect Defence, Overload'),
            description:
                '<p><strong>Near-Perfect Defence:</strong> The wearer of a functioning Shadowfield may roll Determination without spending Shock, and rolls 9d6 when they roll Determination.</p>' +
                '<p><strong>Overload:</strong>If the wearer of a Shadowfield takes any damage, the field overloads and will provide no benefit until after the next Regroup.</p>'
        },
        {
            ...gear('aaoa',167,'Wychsuit','3U','Light,Drukhari'),
            ...armour('Drukhari Armour', 1),
        },
    ],
    // Ork
    // Squat
    // tau
    {
        ...gear('aaoa', 221, 'T´au Body Armour', '5U', 'Light,T´au Empire, Fire Caste'),
        ...armour('T´au Empire Armour', 4),
        snippet: 'Build in: Mag Boots, Preysense Goggles, Respirator, Vox-Bead, and Void Suit.'
    },
];