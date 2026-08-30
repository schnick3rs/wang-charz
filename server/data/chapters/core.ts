import {chapterz} from "#server/data/chapters/utils.ts";

export const core = [
    {
        ...chapterz('core',95,'Blood Angels','Sanguinius','Imperium','First Founding (IX Legion)'),
        snippet: 'Masters of Melee, compelled to drink the enemies blood.',
        features: [
            {
                name: 'Savage Echoes',
                effect:
                    'You may reroll Double Rank dice on any melee attack Test.',
            },
            {
                name: 'The Red Thirst',
                origin: 'Gene-seed',
                effect:
                    'Whenever you are in melee combat and see blood, you must make a DN 3 Willpower Test. If you fail, you are Frenzied.',
            }
        ],
    },
    {
        ...chapterz('core',95,'Dark Angels','Lion El`Jonson','Imperium','First Founding (I Legion)'),
        snippet: 'Unerring marksmen bound by a secret shame they will kill to protect.',
        features: [
            {
                name: 'Grim Resolve',
                effect: 'You may reroll Double Rank dice when you Aim and make a ranged attack.',
            },
            {
                name: 'The Unforgiven',
                origin: 'Tradition',
                effect: 'You suffer a +2 DN penalty to any social Tests made against anyone outside of your Chapter',
            },
        ],
    },
    {
        ...chapterz('core',95,'Imperial Fists','Regal Dorn','Imperium','First Founding (VII Legion)'),
        snippet: 'Unbreakable siege-breakers, built on a foundation of flawed gene-seed.',
        features: [
            {
                name: 'Siege Masters',
                effect: 'You may reroll Double Rank dice whenever you attack a building, fortification, or enemy in cover. You may also add +Rank dice whenever you make a Test related to architectural engineering',
            },
            {
                name: 'Geen-seed Flawed',
                origin: 'Geen-seed',
                effect: 'You are missing implant 12: Sus-an Membrane, and implant 17: Bletcher’s Gland. See below for more information on Space Marine implants.',
            },
        ],
    },
    {
        ...chapterz('core',96,'Iron Hands','Ferrus Manus','Imperium','First Founding (X Legion)'),
        snippet: 'Contemptuous of weak flesh, they replace it piece by piece with unyielding machine.',
        features: [
            {
                name: 'The Flesh is Weak',
                effect: 'Choose one Augmetic Enhancement (p.242). You do not suffer the penalties of being Wounded (p.193). You gain +1 bonus die to Willpower Tests for every augmetic you have.',
            },
            {
                name: 'Ruthless Logic',
                origin: 'Tradition',
                effect: 'You suffer a +2 DN penalty to Fellowship-based Tests made against a target that does not have the IRON HANDS or ADEPTUS MECHANICUS Keywords.',
            },
        ],
    },
    {
        ...chapterz('core',96,'Raven Guard','Corvus Corax','Imperium','First Founding (XIX Legion)'),
        snippet: 'Silent shadow-hunters whose gaunt visage unsettles friend and foe alike.',
        features: [
            {
                name: 'Master of Shadows',
                effect: 'You may reroll Rank dice when you make a Stealth (A) Test. Running, using a Jump Pack, or similar circumstances do not affect your Stealth (A) Tests.',
            },
            {
                name: 'Dark Heritage',
                origin: 'Geen-seed',
                effect: 'ou are missing implant 16: Mucranoid, and implant 17: Bletcher’s Gland. You suffer a + 1 DN penalty to any Fellowship based Test made against any target that could be frightened of your appearance. See below for more information on Space Marine implants',
            },
        ],
    },
    {
        ...chapterz('core',96,'Salamander','Vulkan','Imperium','First Founding (XVIII Legion)'),
        snippet: 'Fire-forged protectors who burn brightest defending their brothers.',
        features: [
            {
                name: 'Promethian Cult',
                effect: 'You may reroll Rank dice when you make an attack roll with a weapon with the FIRE or MELTA Keywords. You may reroll Double Rank dice when you roll Determination against a damage from a source with the FIRE or MELTA Keyword.',
            },
            {
                name: 'Infernal Inheretance',
                origin: 'Geen-seed',
                effect: 'Whenever an ally within 30 metres of you is killed, the GM gains +1 Ruin. You suffer a + 2 DN penalty to any Fellowship-based Test made against any target that could be frightened of your appearance',
            },
        ],
    },
    {
        ...chapterz('core',96,'Space Wolves','Lemon Russ','Imperium','First Founding (VI Legion)'),
        snippet: 'Feral hunter-brothers who fight in pairs and never know retreat.',
        features: [
            {
                name: 'Hunters Unleashed',
                effect: 'You have the Acute Sense Talent (p.129) and the Dual Wield Talent (p.133).',
                modifications: [
                    { targetGroup: 'talents', targetValue: 'core-acute-sense', meta: { name: 'Acute Sense' } },
                    { targetGroup: 'talents', targetValue: 'core-dual-wield', meta: { name: 'Dual Wield' } },
                ],
            },
            {
                name: 'Savage Within',
                origin: 'Geen-seed',
                effect: 'You cannot Fall Back (p.189).',
            },
        ],
    },
    {
        ...chapterz('core',96,'Ultramarines','Roboute Guilliman','Imperium','First Founding (XIII Legion)'),
        snippet: 'Disciplined tacticians who lead by the book, and by unwavering example.',
        features: [
            {
                name: 'Tactical Versatility',
                effect: 'You may Shift for Glory twice as part of a Test.',
            },
            {
                name: 'Pride Of Ultramar',
                origin: 'Tradition',
                effect: 'You start each session with 1 Wrath Point instead of 2.',
            },
        ],
    },
    {
        ...chapterz('core',97,'White Scars','Jaghatai Khan','Imperium','First Founding (V Legion)'),
        snippet: 'Lightning-fast riders whose scarred faces mark a life spent at speed.',
        features: [
            {
                name: 'Lightning Assault',
                effect: 'You may reroll Double Rank dice whenever you make a Pilot (A) Test. You triple your Speed when you Charge (p.189).',
            },
            {
                name: 'Ritual Scarring',
                origin: 'Tradition',
                effect: 'You suffer a +1 DN penalty to any Fellowshipbased Test made against any target that could be frightened of your appearance.',
            },
        ],
    },
];