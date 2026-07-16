import {SKILLS} from "../../db/static/_statUtils";
import {commonNames, cost, species, statMax} from "./utils";

export const core = [
    {
        ...species('core',29,'Mankind','Human','The humble human',0,6),
        ...cost(0,0,0,0),
        ...commonNames('Adrielle, Alaric, Barus, Castus, Celeste, Diana, Dar, Davian, Ephrael, Erith, Estebus, Felicia, Gaius, Gezrael, Halo, Harken, Haveloch, Hestia, Iris, Jestilla, Kamir, Katrina, Lukas, Lyta, Mikel, Mira, Nura, Ophelia, Poul, Quitus, Ravenna, Rossel, Ruby, Silvana, Skyv, Steele, Taur, Titus, Tyanna, Ursa, Undine, Verbal, Victor, Waynoka, Wilhemina, Xavier, Yvette, Zane, Zellith, Zek'),
    },
    {
        ...species('core', 29, 'Mankind', 'Adeptus Astartes', 'The Sword of Mankind', 160, 7),
        ...cost(160,160,0,0),
        ...commonNames('Androcles, Balthazar, Chryses, Diallo, Egnatius, Fafnir, Gerhart, Helbrecht, Ibrahim, Jamshaid, Kalim, Luthando, Maximus, Nicator, Octavian, Proteus, Qaseem, Raziq, Seigfried, Tarik, Ursinus, Viggo, Woyzeck, Xanthus, Youssou, Zosimus.'),
        ...statMax(10,10,9,9,10,10,8,9),
        prerequisites: [
            { group: 'attributes', value: 'agility', threshold: 4 },
            { group: 'attributes', value: 'initiative', threshold: 4 },
            { group: 'attributes', value: 'intellect', threshold: 3 },
            { group: 'attributes', value: 'strength', threshold: 4 },
            { group: 'attributes', value: 'toughness', threshold: 4 },
            { group: 'attributes', value: 'willpower', threshold: 3 },
            { group: 'skills', value: 'athletics', threshold: 3 },
            { group: 'skills', value: 'awareness', threshold: 3 },
            { group: 'skills', value: 'ballisticSkill', threshold: 3 },
            { group: 'skills', value: 'stealth', threshold: 3 },
            { group: 'skills', value: 'weaponSkill', threshold: 3 },
        ],
        speciesFeatures: [
            {
                name: 'Defender of Humanity',
                snippet: 'Add +Rank icons to any successful attack against a Mob.',
            },
            {
                name: 'Honour the Chapter',
                snippet: 'You are subject to the orders of your chapter master, and must honour both the beliefs and traditions of your chapter. You increase your Resolve by 1.',
                modifications: [
                    { targetGroup: 'traits', targetValue: 'resolve', modifier: 1 },
                ],
            },
            {
                name: 'Space Marine Implants',
                snippet: 'You are immune to the Bleeding Condition. You gain +1 bonus dice to any test related to one of the 19 implants (p.76) if the GM agrees it is appropriate.',
            },
        ],
    },
    {
        ...species('core',29,'Mankind','Primaris Astartes','The newborn breed',198,7),
        ...cost(198,198, 0),
        ...commonNames('Androcles, Balthazar, Chryses, Diallo, Egnatius, Fafnir, Gerhart, Helbrecht, Ibrahim, Jamshaid, Kalim, Luthando, Maximus, Nicator, Octavian, Proteus, Qaseem, Raziq, Seigfried, Tarik, Ursinus, Viggo, Woyzeck, Xanthus, Youssou, Zosimus.'),
        ...statMax(12,12,9,9,10,10,8,9),
        prerequisites: [
            { group: 'attributes', value: 'agility', threshold: 4 },
            { group: 'attributes', value: 'initiative', threshold: 4 },
            { group: 'attributes', value: 'intellect', threshold: 3 },
            { group: 'attributes', value: 'strength', threshold: 5 },
            { group: 'attributes', value: 'toughness', threshold: 5 },
            { group: 'attributes', value: 'willpower', threshold: 3 },
            { group: 'skills', value: 'athletics', threshold: 3 },
            { group: 'skills', value: 'awareness', threshold: 3 },
            { group: 'skills', value: 'ballisticSkill', threshold: 4 },
            { group: 'skills', value: 'stealth', threshold: 3 },
            { group: 'skills', value: 'weaponSkill', threshold: 3 },
        ],
        speciesFeatures: [
            {
                name: 'Defender of Humanity',
                snippet: 'Add +Rank icons to any successful attack against a Mob.',
            },
            {
                name: 'Honour the Chapter (Primaris)',
                snippet: 'You are subject to the orders of your chapter master, and must honour both the beliefs and traditions of your chapter. You ignore impurities in the Gene-Seed. You increase Resolve by 1 and Max Wounds by 3.',
                modifications: [
                    { targetGroup: 'traits', targetValue: 'resolve', modifier: 1 },
                    { targetGroup: 'traits', targetValue: 'maxWounds', modifier: 3 },
                ],
            },
            {
                name: 'Space Marine Implants',
                snippet: 'You are immune to the Bleeding Condition. You gain +1 bonus dice to any test related to one of the 21 implants (p.76) if the GM agrees it is appropriate.',
            },
        ],
    },
    {
        ...species('core',29,'Aeldari','Aeldari','The Mysterious Aeldari',10,8),
        ...cost(10,10,0, 0),
        ...commonNames('Aethon, Anthrillien, Ashkalla, Aulirel, Auran, Avenelle, Baharroth, Caerys, Culyan, Elashbel, Elarique, Eldorath, Elessar, Erandel, Gilead, Gilvas, Hrythar, Hyrne, Idranel, Illic, Iyanna, Kaelith, Kelmon, Micha, Meliniel, Mirehn, Morwyn, Naudhu, Naguan, Quillindral, Requiel, Salaine, Sylandri, Taladin, Taldeer, Talyesin, Ullarion, Ulthos, Yriel'),
        ...statMax(7,7,12,12,12,10,6,10),
        prerequisites: [
            { group: 'attributes', value: 'agility', threshold: 3 },
        ],
        speciesFeatures: [
            {
                name: 'Intense Emotion',
                snippet: '+1DN to all Resolve Tests. If you fail a Willpower based test in a scene involving emotion, the GM gains +1 Ruin.',
            },
            {
                name: 'Psychosensitive',
                snippet: 'You may choose to take the PSYKER Keyword.',
                description: '<p>You may choose to take the <strong>PSYKER</strong> Keyword.</p>',
                // TODO options to select beeing a psyker
                alerts: [
                    { type: 'warning', text: 'For the PSYKER variant choose the Aeldari (Psychosensitive) species variant.', },
                ],
            },
            {
                name: 'Asuryani Paths',
                snippet: 'You walked a path of the Asuryani.',
                selected: [''],
                options: [
                    {
                        name: 'Path of Awakening', snippet: 'You gain +Rank bonus dice to Awareness (Int) Tests.',
                        modifications: [
                            { targetGroup: 'skills', targetValue: SKILLS.AWARENESS, modifier: 0, rank: 1 },
                        ]
                    },
                    {
                        name: 'Path of The Artisan',
                        snippet: 'You gain +Double Rank bonus dice to Scholar (Int) Tests related to the AELDARI Keyword.',
                        modifications: [
                            { targetGroup: 'skills', targetValue: 'scholar', modifier: 0, rank: 2, condition: 'related to AELDARI' },
                        ]
                    },
                    {
                        name: 'Path of The Bonesinger',
                        snippet: 'You gain +Double Rank bonus dice to Tech (Int) Tests on targets with the AELDARI Keyword.',
                        modifications: [
                            { targetGroup: 'skills', targetValue: 'tech', modifier: 0, rank: 2, condition: 'targets with the AELDARI Keyword' },
                        ],
                    },
                    {
                        name: 'Path of The Dreamer',
                        snippet: 'You gain +Rank bonus dice to Corruption Tests',
                        modifications: [
                            { targetGroup: 'traits', targetValue: 'conviction', modifier: 0, rank: 1, condition: 'to corruption tests' },
                        ],
                    },
                    {
                        name: 'Path of The Mourner',
                        snippet: 'You gain +Rank Maximum Shock.',
                        modifications: [
                            { targetGroup: 'traits', targetValue: 'maxShock', modifier: 0, rank: 1 },
                        ],
                    },
                    {
                        name: 'Path of The Healer',
                        snippet: 'You gain +Double Rank bonus dice to Medicae (Int) Tests on targets with the AELDARI Keyword.',
                        modifications: [
                            { targetGroup: 'skills', targetValue: 'medicae', modifier: 0, rank: 2, condition: 'on AELDARI targets' },
                        ],
                    },
                    {
                        name: 'Path of Service',
                        snippet: 'You gain +Double Rank bonus dice to Insight (Fel) Tests on targets with the AELDARI Keyword.',
                        modifications: [
                            { targetGroup: 'skills', targetValue: 'insight', modifier: 0, rank: 2, condition: 'on AELDARI targets' },
                        ],
                    },
                    {
                        name: 'Path of The Mariner',
                        snippet: 'You gain +Double Rank bonus dice to Pilot (A) Tests using vehicles with the AELDARI Keyword.',
                        modifications: [
                            { targetGroup: 'skills', targetValue: 'pilot', modifier: 0, rank: 2, condition: 'when using AELDARI vehicles' },
                        ],
                    },
                ],
            },
        ],
    },
    {
        ...species('core',29,'Aeldari','Aeldari (Psychosensitive)','The Psychosensitive Aeldari',10,8),
        variant: 'core-aeldari',
        ...cost(10,10,0, 0),
        ...commonNames('Aethon, Anthrillien, Ashkalla, Aulirel, Auran, Avenelle, Baharroth, Caerys, Culyan, Elashbel, Elarique, Eldorath, Elessar, Erandel, Gilead, Gilvas, Hrythar, Hyrne, Idranel, Illic, Iyanna, Kaelith, Kelmon, Micha, Meliniel, Mirehn, Morwyn, Naudhu, Naguan, Quillindral, Requiel, Salaine, Sylandri, Taladin, Taldeer, Talyesin, Ullarion, Ulthos, Yriel'),
        ...statMax(7,7,12,12,12,10,6,10),
        prerequisites: [
            { group: 'attributes', value: 'agility', threshold: 3 },
        ],
        speciesFeatures: [
            {
                name: 'Intense Emotion',
                snippet: '+1DN to all Resolve Tests. If you fail a Willpower based test in a scene involving emotion, the GM gains +1 Ruin.',
            },
            {
                name: 'Psychosensitive',
                snippet: 'You have the PSYKER Keyword. You gain access to the Minor, Universal, Divination and Runes of Battle Disciplines. You also gain access to on additional Discipline.',
                description: '<p>You have the <strong>PSYKER</strong> Keyword. You gain access to the <em>Minor</em>, <em>Universal</em>, <em>Divination</em> and <em>Runes of Battle</em> Disciplines. You also gain access to on additional Discipline.</p>',
                modifications: [
                    { targetGroup: 'keywords', targetValue: 'Psyker' },
                ],
                selected: [''],
                options: [
                    // { key: 'core-minor', name: 'Minor', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Minor' }] },
                    // { key: 'core-universal', name: 'Universal', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Universal' }] },
                    { key: 'core-biomancy', name: 'Biomancy', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Biomancy' }] },
                    // { key: 'core-divination', name: 'Divination', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Divination' }] },
                    { key: 'core-pyromancy', name: 'Pyromancy', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Pyromancy' }] },
                    { key: 'core-telekinesis', name: 'Telekinesis', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Telekinesis' }] },
                    { key: 'core-telepathy', name: 'Telepathy', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Telepathy' }] },
                    { key: 'core-maleficarum', name: 'Maleficarum', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Maleficarum' }] },
                    // { key: 'core-runes-of-battle', name: 'Runes of Battle', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Runes of Battle' }] },
                    { key: 'aaoa-runes-of-shaping', name: 'Runes of Shaping', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Runes of Shaping' }] },
                ],
                psychicDisciplines: [
                    'Minor',
                    'Universal',
                    'Divination',
                    'Runes of Battle',
                ],
            },
            {
                name: 'Asuryani Paths',
                snippet: 'You walked a path of the Asuryani.',
                selected: [''],
                options: [
                    {
                        name: 'Path of Awakening', snippet: 'You gain +Rank bonus dice to Awareness (Int) Tests.',
                        modifications: [
                            { targetGroup: 'skills', targetValue: 'awareness', modifier: 0, rank: 1 },
                        ]
                    },
                    {
                        name: 'Path of The Artisan',
                        snippet: 'You gain +Double Rank bonus dice to Scholar (Int) Tests related to the AELDARI Keyword.',
                        modifications: [
                            { targetGroup: 'skills', targetValue: 'scholar', modifier: 0, rank: 2, condition: 'related to AELDARI' },
                        ]
                    },
                    {
                        name: 'Path of The Bonesinger',
                        snippet: 'You gain +Double Rank bonus dice to Tech (Int) Tests on targets with the AELDARI Keyword.',
                        modifications: [
                            { targetGroup: 'skills', targetValue: 'tech', modifier: 0, rank: 2, condition: 'targets with the AELDARI Keyword' },
                        ],
                    },
                    {
                        name: 'Path of The Dreamer',
                        snippet: 'You gain +Rank bonus dice to Corruption Tests',
                        modifications: [
                            { targetGroup: 'traits', targetValue: 'conviction', modifier: 0, rank: 1, condition: 'to corruption tests' },
                        ],
                    },
                    {
                        name: 'Path of The Mourner',
                        snippet: 'You gain +Rank Maximum Shock.',
                        modifications: [
                            { targetGroup: 'traits', targetValue: 'maxShock', modifier: 0, rank: 1 },
                        ],
                    },
                    {
                        name: 'Path of The Healer',
                        snippet: 'You gain +Double Rank bonus dice to Medicae (Int) Tests on targets with the AELDARI Keyword.',
                        modifications: [
                            { targetGroup: 'skills', targetValue: 'medicae', modifier: 0, rank: 2, condition: 'on AELDARI targets' },
                        ],
                    },
                    {
                        name: 'Path of Service',
                        snippet: 'You gain +Double Rank bonus dice to Insight (Fel) Tests on targets with the AELDARI Keyword.',
                        modifications: [
                            { targetGroup: 'skills', targetValue: 'insight', modifier: 0, rank: 2, condition: 'on AELDARI targets' },
                        ],
                    },
                    {
                        name: 'Path of The Mariner',
                        snippet: 'You gain +Double Rank bonus dice to Pilot (A) Tests using vehicles with the AELDARI Keyword.',
                        modifications: [
                            { targetGroup: 'skills', targetValue: 'pilot', modifier: 0, rank: 2, condition: 'when using AELDARI vehicles' },
                        ],
                    },
                ],
            },
        ],
    },
    {
        ...species('core',29,'Orks','Ork','The savage brute',20,6),
        ...cost(20,20,0, 0),
        ...commonNames('Arrlug, Balgrog, Blacktoof, Bluddflak, Bonesmasha, Dedak, Dragnatz, Eddbasha, Garahak, Gargash, Garmek, Genghiz, Gorbad, Grimskull, Hackitt, Hruk, Klawjaw, Kozdek, Lug, Morglum, Murgor, Nazhakka, Rakka, Rekkfist, Rotchop, Skarjaw, Skubmak, Urkthrall, Vorhgad, Zogax'),
        ...statMax(12,12,7,7,8,7,7,7),
        prerequisites: [
            { group: 'attributes', value: 'strength', threshold: 3 },
            { group: 'attributes', value: 'toughness', threshold: 3 },
        ],
        speciesFeatures: [
            {
                name: 'Orky',
                snippet: '+1 bonus dice to Intimidation Tests.',
            },
            {
                name: 'Bigger is Better',
                snippet: 'You calculate Influence using Strength instead of Fellowship.',
            },
        ],
    },
];
