import {background, faction} from "./utils";

export const aaoa = [
    {
        name: 'Adeptus Arbites',
        ...faction('aaoa',25,'Imperium','Adeptus Arbites'),
        backgroundSection: [
            // Origin
            background('PROGENA: Your parents were stalwart servants of the Throne, and after their deaths, you were raised by the Schola Progenium, who identified your talents and groomed you to join the Adeptus Arbites.','Influence','Origin'),
            background('REPENTANT: You once lived a life of criminality and desperation before you found the Emperor’s light and saw the error of your ways. You sought out an Arbites Precinct-Fortress and turned yourself over to their judgements, and after your sentence was served, your contrition was rewarded with an opportunity for redemption.','Conviction','Origin'),
            background('ASCENDED: You served the local Enforcers of your homeworld honourably and dutifully, until you found yourself caught between your loyalty to your home and your loyalty to the Emperor. You chose the Imperium, and the Arbites recruited you in the aftermath.','Resolve','Origin'),
            // Accomplishment
            background('REBELLION QUASHED: When a rebellion arose on your last posting, you were instrumental in crushing it and bringing the Emperor’s Justice to the rebels.','Conviction','Accomplishment'),
            background('SUBVERSIVE ELIMINATED: A noted subversive who had eluded Justice upon a dozen or more worlds found himself within your jurisdiction, and you were the one who carried out the Judgement.','Determination','Accomplishment'),
            background('FRONTIER MARSHAL: You were posted to a world on the fringes of the Imperium, with little established Imperial presence. Your efforts helped bring order to such a lawless place.','Max Wounds','Accomplishment'),
            // Goal
            background('FUGITIVE: One criminal in particular has continued to elude your efforts, and you will stop at nothing to see them Judged.','Determination','Goal'),
            background('ORDER TO THE LAWLESS: You desire the next great challenge that awaits an Arbitrator – to pacify the criminality and anarchy of places which have fallen from the Emperor’s Light.','Resolve','Goal'),
            background('COLD CASE: An unsolved crime has haunted your precinct, or possibly your career specifically, for longer than anyone is comfortable with. You will solve that case and bring the perpetrator to justice.','Max Shock','Goal'),
        ],
        objectives: [
            'Seek to apply the dictates of the Lex Imperialis to a situation.',
            'Compare your current environment to another world on which you have served.',
            'Interrogate a suspect using threats of violence and punishment while an ally offers leniency in exchange for compliance (or vice versa).',
            'Berate a criminal or other citizen who you have judged as insufficiently law-abiding.' +
            'Open a door, or otherwise enter a room, using forceful methods.',
            'Subdue an enemy non-lethally so that they might face proper judgement later.',
        ],
        advancedCreationKeywords: ['Imperium'],
    },
    {
        name: 'Officio Assassinorum',
        ...faction('aaoa',28,'Imperium','Officio Assassinorum'),
        backgroundSection: [
            // Origin
            background('PROGENA: Your parents were stalwart servants of the Throne, and after their deaths, you were raised by the Schola Progenium. There, you demonstrated an aptitude for killing that set you apart.','Resolve','Origin'),
            background('CULTIST: You were once a member of one of the countless death cults devoted to the God-Emperor’s glory. Your existence was, and still is, devoted to slaying the Emperor’s foes','Determination','Origin'),
            background('ABANDONED: Whatever your life before, at one point it ended, and you were left to fend for yourself. Learning to survive in such inhospitable condition has honed your instincts and hardened you for the duties you now perform.','Max Wounds','Origin'),
            // Accomplishment
            background('TARGET ELIMINATED: After extensive time and effort infiltrating their stronghold, you slew a mighty Champion of Chaos','Conviction','Accomplishment'),
            background('TARGET ELIMINATED: After tracking the enemy force across a dozen worlds, you assassinated a powerful Xenos warlord.','Resolve','Accomplishment'),
            background('TARGET ELIMINATED: After infiltrating the depths of a world in rebellion, you made an example of the witch or demagogue at the heart of a rebellion.','Max Shock','Accomplishment'),
            // Goal
            background('TARGET ACQUIRED: You have little ambition beyond the annihilation of your next target in the Emperor’s name.','Conviction','Goal'),
            background('TARGET ACQUIRED: A target escaped you once. You cannot permit this failure to stain your service to the Emperor.','Determination','Goal'),
            background('TARGET ACQUIRED: Of all the targets you have slain, one particular foe haunts your thoughts and fills your heart with rage. You crave each opportunity to slay targets that resemble that particular hated foe.','Resolve','Goal'),
        ],
        objectives: [
            'Conclude a combat without any surviving witnesses other than your allies.',
            'Extol the superiority of your Temple’s methods of dealing death.',
            'Explain the how your assigned mission allows – or prohibits – a particular course of action.',
            'Quote a motto or philosophy of your Temple.',
            'Refuse to use overt methods to gain access to a location',
            'Maintain secrecy over your entire operation, refusing to reveal your identity or target to any but your immediate allies'
        ],
        advancedCreationKeywords: ['Imperium'],
    },
    {
        name: 'Drukhari',
        ...faction('aaoa',29,'Aeldari','Drukhari'),
        backgroundSection: [
            // Origin
            background('TRUEBORN: You were born naturally, to one of the powerful families of the Dark City whose resources allowed them to raise a child in the traditional manner. You are a scion of the powerful, raised from childhood to dominate and terrorise.','Influence','Origin'),
            background('HALFBORN: You were born from an artificial gestation tube, quickly and efficiently, like the majority of Drukhari. To thrive in the slums and lower tiers of the Dark City, you had to be ruthless and ambitious.','Determination','Origin'),
            background('WROUGHT: You know not from whence you came, only that you awoke upon a Haemonculus’ table fully-formed and thirsting for the agony of others. Your mysterious, possibly unnatural origin may disquiet some, but you are what you have made of yourself.','Max Shock','Origin'),
            // Accomplishment
            background('RAIDER: You were part of a victorious real-space raid, and the souls you dragged back, and the recorded hologhosts of your kills have earned you prestige, glory, and status.','Wealth','Accomplishment'),
            background('TRIUMPH: You set foot within the arena, and you emerged victorious. The hard-fought victory came with many scars, the ache of which still reminds you of the fury of the battle.','Max Wounds','Accomplishment'),
            background('USURPER: You attained your current status through guile and skill, undermining and then eliminating a former superior and assuming their position. You know that others seek to recreate your ascension and take what you have won, but you will not make it easy for them…','Determination','Accomplishment'),
            // Goal
            background('DOMINION: You seek to rise to the highest levels of Drukhari society, by any means necessary. Nothing short of final death or ultimate dominion will see your ambition sated.','Resolve','Goal'),
            background('TERROR: Out there, in realspace, there is a place which awaits your malicious attentions, which has not learned to dread your kind. You will find them, and you will feast upon their anguish.','Determination','Goal'),
            background('SATIETY: The thirst that gnaws away at your soul, at once part of you and external to you, is a perpetual weight upon your existence. You will slake that thirst, or escape it.','Conviction','Goal'),
        ],
        objectives: [
            'Revel in the pain or distress of another creature',
            'Be scornful or dismissive of the taboos of other Aeldari, or another species',
            'Coerce or threaten another creature into doing what you want',
            'Apply your cruelty and cunning to trick or ambush a foe',
            'Explain a number of the different ways you could hurt or kill someone',
            'Gain in status or influence through murder or intimidation',
        ],
        advancedCreationKeywords: ['Aeldari','Drukhari'], // [Cabal], [Cult], [Coven]
    },
    {
        name: 'The Squat Remnant',
        ...faction('aaoa',29,'Squats','The Squat Remnant'),
        backgroundSection: [
            // Origin
            background('ADRIFT: You were aboard one of the vessels fleeing the Cataclysm, floating through the void as a remnant of a once-proud civilisation.','Resolves','Origin'),
            background('FAR AFIELD: You fought as a mercenary or plied your trade far from your home and found yourself suddenly cut off from home and support.','Max Wounds','Origin'),
            background('AMONGST THE ENEMY: You’ve had to fight for every moment of life since the Cataclysm, surrounded by foes bolstered the disaster.','Determination','Origin'),
            // Accomplishment
            background('REUNION: You were reunited with some who you thought lost, perhaps old comrades, perhaps family, perhaps merely other wandering refugees','Influence','Accomplishment'),
            background('GRUDGE SETTLED: You worked to defeat a notorious enemy of your kind and bring some measure of recompense to the lost. It was a long, hard effort, but you’ve now got one less grudge to avenge.','Max Wounds','Accomplishment'),
            background('RECLAMATION: A piece of technology, an heirloom, or some other item of great value, thought lost, has been returned to your people through your efforts.','Wealth','Accomplishment'),
            // Goal
            background('SURVIVAL: In the face of extinction, to endure for even another day is a victory. Securing as many days as possible is your priority.','Determination','Goal'),
            background('RESURGENCE: Your people are hardy, and you once prospered and thrived amidst the least hospitable conditions. No disaster is so great that it cannot be recovered from.','Resolve','Goal'),
            background('VENGEANCE: The dark forces that created this disaster will pay for every Squat life they ended, and they will pay in blood.','Max Shock','Goal'),
        ],
        objectives: [
            'Grumble about human technology, comparing it to the craftsmanship of your own people',
            'Compare current events to the accomplishments of an honoured ancestor or relative',
            'Swear an oath to avenge a misdeed done to you',
            'Describe a glorious victory or major achievement as if it were something casual or expected',
            'Dedicate an action to ancestors and kin lost during the Cataclysm',
            'Seek to obtain extra necessary supplies, such as ammunition, when preparing for a mission.',
        ],
        advancedCreationKeywords: ['Squat'],
    },
    {
        name: 'T´au',
        ...faction('aaoa',29,'T’au','T’au'),
        backgroundSection: [
            // Origin
            background('FIRST-SPHERE SEPT: You hail from one of the original Septs settled by the T’au, or possibly from the T’au homeworld itself.','Influence', 'Origin'),
            background('SECOND-SPHERE SEPT: Your ancestors braved the unknown to colonise a Sept during the second-sphere expansion phase','Resolve','Origin'),
            background('THIRD-SPHERE SEPT: Your forebears faced extreme resistance to settle a Sept during the third-sphere expansion phase.','Determination','Origin'),
            // Accomplishment
            background('DISCOVERY: You aided in finding, securing, or creating something valuable to the ongoing expansion of the T’au Empire.','Wealth','Accomplishment'),
            background('PROTECTION: You helped to protect some territory, resource, or other vital asset from being lost to outsiders.','Resolve','Accomplishment'),
            background('SACRIFICE: You willingly gave of yourself in the name of the Greater Good, suffering some form of loss or injury for the betterment of the T’au Empire.','Conviction','Accomplishment'),
            // Goal
            background('ADVANCEMENT: You know that you will be able to further the tau’va if you can gain power and status within the Empire.','Influence','Goal'),
            background('DUTY: You will do whatever the Ethereals will to ensure the T’au Empire grows and prospers and all are brought within the protection of the Greater Good.','Max Shock','Goal'),
            background('SUPREMACY: The galaxy is full of misguided species who need to be shown the error of their ways, and you will do your part to show them.','Resolve','Goal'),
        ],
        objectives: [
            'When you seek to apply the wisdom of the Ethereals to a situation.',
            'Extol the virtues of the Greater Good to someone who does not belong to the T’au Empire',
            'Reminisce about the wonders and glories of your home Sept and other worlds within the T’au Empire',
            'Describe a previous triumph or achievement of the T’au Empire',
            'Reflect on your bond with your team-mates (especially if you Ta’lissera bonded)',
            'Ponder the differences or similarities between the Castes, or between the T’au and another species',
        ],
        advancedCreationKeywords: ['Squat'],
    },
];