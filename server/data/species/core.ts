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
        ...species('core',29,'Aeldari','Aeldari','The mysterious Aeldari',10,8),
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
                key: 'psychosensitive',
                name: 'Psychosensitive',
                snippet: 'You can choose to have the PSYKER keyword.',
                options: [
                    {
                        key: 'mundane',
                        name: 'Mundane',
                        snippet: 'Your psychic potential has not awaken.'
                    },
                    {
                        key: 'sensitive',
                        name: 'Psychosensitive',
                        snippet: 'You have the PSYKER Keyword. You gain access to the Minor, Universal, Divination and Runes of Battle Disciplines. You also gain access to on additional Discipline.',
                        description: '<p>You have the <strong>PSYKER</strong> Keyword. You gain access to the <em>Minor</em>, <em>Universal</em>, <em>Divination</em> and <em>Runes of Battle</em> Disciplines. You also gain access to on additional Discipline.</p>',
                        modifications: [
                            { targetGroup: 'keywords', targetValue: 'Psyker' },
                            { targetGroup: 'psychicDisciplines', targetValue: 'Minor' },
                            { targetGroup: 'psychicDisciplines', targetValue: 'Universal' },
                            { targetGroup: 'psychicDisciplines', targetValue: 'Divination' },
                            { targetGroup: 'psychicDisciplines', targetValue: 'Runes of Battle' },
                        ],
                        // choice: { type: 'psychicDisciplines' }
                        options: [
                            {
                                key: 'core-biomancy',
                                name: 'Biomancy',
                                snippet: 'Manipulating a biological form',
                                modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Biomancy' }]
                            },
                            {
                                key: 'core-pyromancy',
                                name: 'Pyromancy',
                                snippet: 'Manipulating or producing fire',
                                modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Pyromancy' }]
                            },
                            {
                                key: 'core-telekinesis',
                                name: 'Telekinesis',
                                snippet: 'Exerting kinetic force through thought',
                                modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Telekinesis' }]
                            },
                            {
                                key: 'core-telepathy',
                                name: 'Telepathy',
                                snippet: 'Manipulating a mind',
                                modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Telepathy' }]
                            },
                            {
                                key: 'core-maleficarum',
                                name: 'Maleficarum',
                                snippet: 'Unleashing the unholy powers of Chaos',
                                modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Maleficarum' }]
                            },
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
                key: 'orky',
                name: 'Orky',
                snippet: '+1 bonus dice to Intimidation Tests.',
            },
            {
                key: 'bigger-is-better',
                name: 'Bigger is Better',
                snippet: 'You calculate Influence using Strength instead of Fellowship.',
            },
        ],
    },
];
