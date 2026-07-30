import {gear, toolz} from "../utils";
import {Wargear} from "../../../shared/schemas/wargear.schema";

export const aaoaToolsEquipment: Wargear[] = [
    // Imperial
    {
        ...gear('aaoa',180,'Book of Judgment (abridged)','2U','Adeptus Arbites'),
        ...toolz(undefined, 'The Book of Judgement is the legal code of the Imperium, enforced by the Adeptus Arbites.'),
    },
    {
        ...gear('aaoa',181,'Magnacles','3U','Imperium,Adeptus Arbites,Inquisition'),
        ...toolz(undefined, 'Breaking free of magnacles’ magnetic lock requires a Strength test (DN 5).'),
    },
    // AAOA Astartes Gear
    {
        ...gear('aaoa',180,'Narthecium (AAOA)','5R','Adeptus Astartes'),
        ...toolz('Imperial Equipment','A Narthecium provides all the means to treat battlefield injuries and perform medical procedures in the field. It also adds +2 bonus dice to Medicae tests to treat the injuries of characters of the Adeptus Astartes or Primaris Astartes species. On non-Astartes characters, use of a Narthecium can cause problems, as the equipment within is not meant for frail mortal physiology: a complication will inflict 1 Mortal Wound on a non-Astartes patient.'),
        description:
            '<p>A Narthecium is a tool of a Space Marine Apothecary\'s trade, containing implements specially designed for treating the Astartes\' genetically engineered physiology and for performing first aid without having to remove the patient\'s Power Armour.</p>' +
            '<p>It also comprises various counterseptics, synthderm patches, transfusions and other compounds engineered for the Space Marines’ physiology, and several stasis tubes for storing any recovered gene-seed taken from a dead Space Marine\'s Progenoid Glands.</p>' +
            '<p>In battle, an Apothecary carries a number of specialised items of equipment, integrating a variety of tools into a customised backpack, with delivery systems in a device mounted on the Apothecary’s vambrace. The Apothecary may have crafted many of these tools himself according to his own needs.</p>' +
            '<p>A Narthecium provides all the means to treat battlefield injuries and perform medical procedures in the field. It also adds +2 bonus dice to Medicae tests to treat the injuries of characters of the Adeptus Astartes or Primaris Astartes species. On non-Astartes characters, use of a Narthecium can cause problems, as the equipment within is not meant for frail mortal physiology: a complication will inflict 1 Mortal Wound on a non-Astartes patient.</p>',
    },
    {
        ...gear('aaoa',181,'Reductor','5R','Adeptus Astartes'),
        ...toolz('Imperial Equipment','As an action, an Apothecary can use a Reductor to remove the gene-seed of a deceased Space Marine. This requires a Medicae test (DN 3). Though a grim task, it is a vital one, and an Apothecary who extracts a fallen brother’s gene-seed gains 1 Wrath immediately, as their duty drives them to press on.'),
    },
    {
        ...gear('aaoa',185,'Vindicare Spy Mask','11L','Templum Vindicare'),
        ...toolz('Imperial Equipment','he mask renders the wearer immune to penalties due to darkness and fog and allows the wearer to ignore any modifiers to the targets’ Defence from being in cover.'),
    },
    // Aeldari Tools
    {
        ...gear('aaoa',185,'Agaith','7V','Harlequin'),
        ...toolz('Aeldari Equipment','You cause Fear (DN 3+Rank)'),
    },
    {
        ...gear('aaoa',186,'Flip-Belt','7V','Harlequin'),
        ...toolz('Aeldari Equipment','Ignore difficult terrain and obstavles less then 2m tal or wide. You may stand up as a free action. You may use Agility (instead of Strength) fo jump distance. While not unconcious, you do not suffer falling damage.'),
        description:
            '<p>A Harlequin wearing a Flip-Belt ignores the effects of difficult terrain, can ignore any obstacles less than 2m tall or wide during their movement, and may stand up from prone as a free action at any time without penalty. In addition, a Harlequin wearing a flip-belt determines jump distance using their Agility instead of their Strength, and they do not suffer falling damage unless unconscious.</p>',
    },
    // AAOA Drukhari Gear
    {
        ...gear('aaoa',186,'Hekatarii Combat Drugs','6R','Drukhari'),
        ...toolz('Aeldari Equipment'),
        triptype: 'Hekatarii Combat Drugs',
        description:
            '<p>Though they dramatically reduce the lifespan of any Aeldari that uses them, performance-enhancing combat drugs are commonly used in the gladiatorial arenas of the Hekatarii, as well as by Wyches entering real battle. The user may administer a single dose as a free action, which will last for about an hour or until the character takes a Regroup (after which, withdrawal symptoms set in, and the character is reduced to 0 Shock until they take a Respite). A single dose of any of these combat drugs taken by anyone who is not Aeldari inflicts 1d6 Shock instead of their normal effect. Anyone using these combat drugs must also make a Corruption test. Taking a second dose of these combat drugs, whether a second dose of the same drug or a different drug, inflicts 1d6 Shock instead of having the desired effect. The drug dispenser contains 3 doses, of whichever of the drugs below the user wishes.</p>' +
            '<ul>' +
            '<li>Adrenalight accelerates the user’s attacks into a blistering tempo. While under the drug’s effect, whenever the character makes a successful attack, they may spend a point of Glory to make a second attack.</li>' +
            '<li>Grave Lotus massively heightens the tensile strength of the user’s muscles, allowing them to exert greater force. While under the drug’s effect, the character’s Strength is increased by +3.</li>' +
            '<li>Hypex augments the fast-twitch fibres in the user’s muscles, allowing them to move at far greater speeds. While under the drug’s effect, the character’s Speed is increased by +2.</li>' +
            '<li>Painbringer alters the user’s pain receptors, increasing their capacity for pain without dulling their experience of it. While under the drug’s effect, the character’s Resilience is increased by 2, and they recover 1d3 Shock at the start of each turn.</li>' +
            '<li>Serpentin amplifies the user’s killer instincts and sharpens their bloodlust. While under the drug’s effect, the character adds +3d to all melee attacks.</li>' +
            '<li>Splintermind help the user’s mind compartmentalise and disassociate from the parts which feel fear. While under the drug’s effect, the character’s Resolve is increased by +2.</li>' +
            '</ul>',
    },
    // Drugs
    {
        ...gear('aaoa',183,'Eversor Combat Drugs','11L','Templum Eversor'),
        ...toolz('Drugs and Consumables'),
        description:
            '<p>At the start of an Eversor’s turn, they may use a single dose of one of the following combat drugs as a Free Action.</p>' +
            '<ul>' +
            '<li><strong>Fury: </strong>The Eversor’s Speed is doubled for the duration of this turn.</li>' +
            '<li><strong>Destroyer: </strong>During this turn, if the Eversor scores a critical hit or kills an enemy, they may immediately move up to half their Speed and make one additional melee attack if they are within reach. If this or any subsequent attack this turn also scores a critical hit or reduces an enemy to 0 Wounds, roll a d6: on a 4 or more, the Eversor may make another half-Speed move and another attack.</li>' +
            '<li><strong>Terminus: </strong>If the Eversor starts Dying before the start of their next turn, they may continue to act normally for a number of rounds equal to their Toughness. If the Eversor is still Dying after this time, they die immediately, and explode.</li>' +
            '</ul>' +
            '<p>One combat drug dispenser has three doses each of Fury and Destroyer, and a single dose of Terminus</p>' +
            '<p><em>A single dose of any of these combat drugs taken by anyone other than an Eversor Assassin inflicts 1d6 mortal wounds instead of their normal effect.</em></p>'
    },
];
