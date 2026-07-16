import {commonNames, cost, species, statMax} from "./utils";

export const aioe = [
    {
        ...species('aioe',10,'Aeldari','Aeldari','The Mysterious Aeldari',10,8),
        ...cost(10,10,0, 0),
        ...commonNames('Aethon, Anthrillien, Ashkalla, Aulirel, Auran, Avenelle, Baharroth, Caerys, Culyan, Elashbel, Elarique, Eldorath, Elessar, Erandel, Gilead, Gilvas, Hrythar, Hyrne, Idranel, Illic, Iyanna, Kaelith, Kelmon, Micha, Meliniel, Mirehn, Morwyn, Naudhu, Naguan, Quillindral, Requiel, Salaine, Sylandri, Taladin, Taldeer, Talyesin, Ullarion, Ulthos, Yriel'),
        ...statMax(7,7,12,12,12,10,6,10),
        replaces: 'core-aeldari',
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
                selected: ['Mundane'],
                options: [
                    {
                        key: 'mundane',
                        name: 'Mundane',
                        snippet: 'Your Psyker potential did not manifest.'
                    },
                    {
                        key: 'psyker',
                        name: 'Psyker',
                        unlocks: 'Psychosensitive Psyker',
                        snippet: 'You gain access to the Minor, Universal, Divination and Runes of Battle Disciplines. ',
                        modifications: [
                            { targetGroup: 'keywords', targetValue: 'Psyker' },
                            { targetGroup: 'psychicDisciplines', targetValue: 'Minor' },
                            { targetGroup: 'psychicDisciplines', targetValue: 'Universal' },
                            { targetGroup: 'psychicDisciplines', targetValue: 'Divination' },
                            { targetGroup: 'psychicDisciplines', targetValue: 'Runes of Battle' },
                            { targetGroup: 'psychicPowers', targetValue: 'Smite' },
                        ]
                    },
                ],
            },
        ],
    },
    {
        ...species('aioe',10,'Aeldari','Drukhari','The Sinister Drukhari',10,8),
        ...cost(10,10,0, 0),
        ...commonNames('Aestra, Araqir, Atreixes, Barakhar, Drekarth, Drisella, Iridivyst, Jalaxlar, Korai, Kruellagh, Maelik, Melandyr, Mydilian, Orinth, Salaine, Skechara, Tarsidhe, Vhane, Vorl, Xethis, Xynariis, Yesyr, Zharokh, Zuol'),
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
                name: 'Night Vision',
                snippet: 'You do not suffer vision penalties for low-light or darkness.',
            },
            {
                name: 'Soul Debt',
                snippet: 'Make a DN Tier+1 Corruption Test at the end of any session in which you did not inflict Wounds on an unwilling creature. You never make Corruption Tests for inflicting pain. Drukhari with the ASURYANI, HARLEQUIN, or YNNARI Keyword lose this ability.',
            },
        ],
    },
    {
        ...species('aioe',10,'Aeldari','Wraith Construct','The Constructed Souls',90,8),
        ...cost(90,90,0, 0),
        ...commonNames('Adamant, Bastion, Contender, Diligence, Endurance, Eternity, Gatekeeper, Gravitas, Hereafter, Immutable, Infinity, Intransigence, Mirthless, Monument, Penumbra, Pinnacle, Profundity, Rampart, Sentinel, Severity, Steadfast, Solace, Vengeance, Vigilance, Warden, Zenith'),
        ...statMax(7,7,12,12,12,10,6,10),
        prerequisites: [
            { group: 'attributes', value: 'strength', threshold: 5 },
            { group: 'attributes', value: 'toughness', threshold: 6 },
        ],
        speciesFeatures: [
            {
                name: 'Wraithbone Form',
                snippet: 'Wraith Constructs are immune to the Blinded, Bleeding, and Poisoned Conditions, and cannot Suffocate. They cannot wear armour, but always count as having an Armour Rating (AR) of 5',
            },
            {
                name: 'Wraithsight',
                snippet: 'Wraith Constructs can communicate telepathically with Spiritseers and other psychically attuned Aeldari, and perceive the presence of psychic powers and warp phenomena, as well as strong thoughts and feelings at the GM’s discretion. Unless a living Aeldari character is within line of sight, they suffer from the Hindered Condition.',
            },
        ],
    },
];
