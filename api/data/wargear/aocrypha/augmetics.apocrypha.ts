import {gear} from "../utils";
import {SKILLS} from "../../../shared/constants";
import {Wargear} from "../../../shared/schemas/wargear.schema";

export const aaoaAugmetics: Wargear[] = [
    // Augmetics
    {
        ...gear('aaoa',189,'Autosanguine', '6V', 'Adeptus Mechanicus, Cult Mechanicus'),
        type: 'Augmetics', subtype: 'Augmetic Implants',
        snippet: 'Greatly enhance healing capacity and ignore wounded penalty.',
        description:
            '<p>Whenever you  regain  one or  more  Wounds, you regain one additional Wound. You also ignore the penalty for being Wounded. </p>',
    },
    {
        ...gear('aaoa',189,'Baleful Eye', '8L', 'Adeptus Mechanicus, Imperium'),
        type: 'Augmetics', subtype: 'Augmetic Implants',
        snippet: 'Give a Hot-Shot laser eye',
        description:
            '<p>A character with a Baleful Eye is considered to have a Hot-Shot  Laspistol  within  the  eye.  The  weapon  runs from an internal power source, and never runs out of ammunition, but this also means that ammo may not be spent on the weapon’s attacks. As might be imagined, it is very intimidating when used as a part of negotiations with primitive societies.</p>',
    },
    {
        ...gear('aaoa',190,'Blade-Tines', '5R', 'Chaos, Dark Mechanicus, Drukhari'),
        type: 'Augmetics', subtype: 'Augmetic Implants',
        snippet: 'Hand mounted scalpel like blade. Good for medic or killer.',
        description:
            '<p>Blade-tines  grant  the  recipient  +1d  on  all  Medicae tests, and they can be used as a Mono Knife in melee. </p>',
        modifications: [
            { targetGroup: 'skills', targetValue: SKILLS.MEDICAE, modifier: 1, rank: 0},
        ],
    },
    {
        ...gear('aaoa',190,'Calculus Logi Implant', '6V', 'Imperium, Adeptus Mechanicus'),
        type: 'Augmetics', subtype: 'Augmetic Implants',
        snippet: 'Internal cogitator implants which aid in data retention and processing',
        description:
            '<p>The recipient has a +2d bonus on all Investigation and Scholar tests.</p>',
        modifications: [
            { targetGroup: 'skills', targetValue: SKILLS.SCHOLAR, modifier: 2, rank: 0},
            { targetGroup: 'skills', targetValue: SKILLS.INVESTIGATION, modifier: 2, rank: 0},
        ],
    },
    {
        ...gear('aaoa',190,'Chem Injector', '5R', 'Adeptus Mechanicus, Imperium, Adeptus Ministorum'),
        type: 'Augmetics', subtype: 'Augmetic Implants',
        snippet: 'This implant allows a dose of a drug or stimulant to be auto-injected  into  the  recipient’s  body.',
        description:
            '<p>Once  loaded with  a  dose  of  a  drug, the character can administer that dose at will as a simple action.</p>'+
            '<p>Some Chem Injector can be remotely controlled by another character via vox link.</p>'+
            '<p>A character can  have multiple Chem Injector, they do not need to contain the same drug.</p>',
    },
    {
        ...gear('aaoa',190,'Data-Tether', '3U', 'Adeptus Mechanicus, Skitarii'),
        type: 'Augmetics', subtype: 'Augmetic Implants',
        snippet: 'Silently communicate your thoughts and status to similar equipped within 1km.',
        description:
            '<p>Characters with a data-tether may communicate silently to similarly-equipped characters within 1km, transmitting their thoughts and status through the implant to one another. A data-tether may be tuned to receive normal vox transmissions from non-Skitarii allies, though this is less efficient.</p>',
    },
    {
        ...gear('aaoa',190,'Enhanced Data-Tether', '5R', 'Adeptus Mechanicus, Skitarii'),
        type: 'Augmetics', subtype: 'Augmetic Implants',
        snippet: 'Commanding officier version of a Data-Tether with a range of 100km.',
        description:
            '<p>Enhanced data-tether with a range of 100k. In addition the recipient and anyone in the group with a NORMAL data-tether may re-roll failures on Resolve tests.</p>',
    },
    {
        ...gear('aaoa',190,'Interface Port', '7R', 'Adeptus Mechanicus'),
        type: 'Augmetics', subtype: 'Augmetic Implants',
        snippet: 'Direct neural interface for cogitator, data storage devices or advanced machinery.',
        description:
            '<p>This allows the user faster and smoother access to the valuable information within, and grants a +1d bonus  to  Scholar,  Investigate,  and  Tech  tests  while connected to a relevant mechanism or data-spool.</p>',
        modifications: [
            { targetGroup: 'skills', targetValue: SKILLS.INVESTIGATION, modifier: 1, rank: 0, condition: 'while connected to a relevant mechanism or data-spool.' },
            { targetGroup: 'skills', targetValue: SKILLS.SCHOLAR, modifier: 1, rank: 0, condition: 'while connected to a relevant mechanism or data-spool.' },
            { targetGroup: 'skills', targetValue: SKILLS.TECH, modifier: 1, rank: 0, condition: 'while connected to a relevant mechanism or data-spool.' }
        ],
    },
    {
        ...gear('aaoa',191,'Luminen capacitor', '7V', 'Cult Mechanicus'),
        type: 'Augmetics', subtype: 'Augmetic Implants',
        //snippet: 'Extensive rules, see AAOA pg. 191.',
        description:
            '<p>A luminen capacitor contains a number of charges equal to the recipient’s Toughness. With a successful Toughness test, and a minute of meditative focus, the character may spend charges to recharge or power machinery. The DN of this test is equal to 2 plus the number of charges spent, and the number of charges required varies based on the system being charged.</p>' +
            '<ul>' +
            '<li>1 charge: simple power cell, illuminator</li>' +
            '<li>2 charges: weapon charge pack, data-slate, starship bridge terminal</li>' +
            '<li>3 charges: shuttle electronics, servo skull</li>' +
            '<li>4 charges: heavy weapon charge pack, servitor, hololithic projector</li>' +
            '<li>5 charges: cogitator core, reactor machine spirit, xenos technology</li>' +
            '</ul>' +
            '<p>If a character would suffer Shock from using an implant or cybernetic, then they may spend charges to reduce this, suffering one fewer Shock for each charge spent.</p>' +
            '<p>The luminen capacitor regains its full charges during a Regroup. The character may also siphon power from powered devices and power sources, requiring a Toughness test (DN 3) and an action. Success means the character regains 1d3 charges, plus 1 for each Exalted Icon shifted. At the GM’s discretion, this may depower the device, and complications may cause damage to the device or the recipient.</p>',
    },
    {
        ...gear('aaoa',191,'Maglev Coils', '8V', 'Cult Mechanicus'),
        type: 'Augmetics', subtype: 'Augmetic Implants',
        snippet: 'Allow the user to fly.',
        description:
            '<p>When activated, the character gains the ability to fly, at a speed equal to their Willpower (rounded up), but they may not Run or Sprint while flying in this manner. Each turn the character remains aloft, they suffer 1 Shock.</p>'+
            '<p>The character may also use this implant to slow their descent while falling, suffering 1d3 Shock, plus 1 additional Shock for every 10 meters fallen, instead of the normal falling damage.</p>',
    },
    {
        ...gear('aaoa',191,'Memorance Implant','6R','Adeptus Mechanicus'),
        type: 'Augmetics', subtype: 'Augmetic Implants',
        snippet: 'Record everything you see. You gain +1 bonus die to Investigation or Scholar based on Information witnessed or recorded.',
        description:
            '<p>The recipient always has a perfect visual record of everything they see, which may be transferred to other data storage if they have a way to connect to those devices (such as an interface port). Further, they gain a +1d bonus on any Investigate or Scholar tests based on information they have already witnessed and recorded.</p>',
        modifications: [
            { targetGroup: 'skills', targetValue: SKILLS.INVESTIGATION, modifier: 1, rank: 0, condition: 'when based on information witnessed and recorder.' },
            { targetGroup: 'skills', targetValue: SKILLS.SCHOLAR, modifier: 1, rank: 0, condition: 'when based on information witnessed and recorder.' },
        ],
    },
    {
        ...gear('aaoa',192,'Neurostatic projector', '6R', 'Adeptus Mechanicus, Skitarii'),
        type: 'Augmetics', subtype: 'Augmetic Implants',
        snippet: 'All Creatures (excluding ADEPTUS MECHANICUS allies) within 10m suffer +Rank DN to Intellect and Resolve tests.',
        description:
            '<p>Creatures within 10 metres of the character add +Rank to the DN of all Intellect tests (including Awareness), and Resolve tests. Allies with the ADEPTUS MECHANICUS keyword receive null-codes which render them immune to this.</p>',
    },
    {
        ...gear('aaoa',192,'Omnispex', '6R', 'Adeptus Mechanicus, Skitarii'),
        type: 'Augmetics', subtype: 'Augmetic Implants',
        snippet: 'High end Auspex with target acquisition and data sharing capability.',
        description:
            '<p>An omnispex functions as an auspex, in addition if the recipient aims at an enemy, then they ignore any Defence bonuses from cover on their next ranged attack.</p>'+
            '<p>If the recipient is equipped with a data-tether, they may share this bonus with any allies equipped with data-tethers within 10m.</p>',
    },
    {
        ...gear('aaoa',192,'Scribe-Tines', '4U', 'Imperium, Adeptus Mechanicus, Adeptus Ministorum'),
        type: 'Augmetics', subtype: 'Augmetic Implants',
        snippet: 'Specialised and sensitive tools for page-turning, autoscribing, data-slate manipulation, and other activities for a sage.',
        description:
            '<p>Replace the hand and lower forearm, The user gains a +2d bonus on Investigation tests, as they are able to record and retrieve information quickly.</p>',
        modifications: [
            { targetGroup: 'skills', targetValue: SKILLS.INVESTIGATION, modifier: 2, rank: 0 },
        ],
    },
    {
        ...gear('aaoa',192,'Voidskin', '4U', 'Imperium, Adeptus Mechanicus, Imperial Navy'),
        type: 'Augmetics', subtype: 'Augmetic Implants',
        snippet: 'Help resist exposure to hard vacuum, extreme cold and radiation',
        description:
            '<p>Subdermal  skin  tissue and synthetic  chem-glands giving a +3d bonus on all tests to resist the effects of exposure to hard vacuum, extreme cold, and radiation.</p>',
    },
];
