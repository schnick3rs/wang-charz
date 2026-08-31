import {background, faction} from "./utils";

export const sofr = [
    {
        ...faction('sofr',14,'Imperium','Space Wolves'),
        backgroundSection: [
            background('Cunning: You completed your aspirant trials using your wits and hard-won experience, outsmarting the beasts of Fenris and your rivals alike.', 'Determination', 'Origin'),
            background('Feral Strength: You were the last survivor of a brutal blood-duel against rival aspirants, proving that your fury was as great as your endurance.', 'Max Wounds', 'Origin'),
            background('Wolf-Bonded: You were marked early by the company of Fenrisian wolves, surviving alongside them and learning the ways of the pack before you ever set foot in the Fang.', 'Resolve', 'Origin'),
            background('Slayer of Beasts: You brought down a monstrous Fenrisian sea serpent, your tale retold around the hearth-fires of your pack.', 'Influence', 'Accomplishment'),
            background('Rite of Ice: You endured the long hunt across the deathly glaciers, returning with trophies and scars that will never fade.', 'Max Shock', 'Accomplishment'),
            background('Defiant: You defied a rival Jarl\'s command but triumphed anyway, earning both rebuke and glory for your unyielding will.', 'Influence', 'Accomplishment'),
            background('Forge a Saga: You seek a deed so legendary that your name will be sung in the sagas for millennia to come.', 'Influence', 'Goal'),
            background('Prove the Pack\'s Worth: You fight so that your pack-brothers are remembered as true sons of Russ.', 'Determination', 'Goal'),
            background('Shield of Fenris: You see yourself as the guardian of your Chapter\'s honour and the people of Fenris, standing fast against all who threaten them.', 'Conviction', 'Goal'),
        ],
        objectives: [
            'Proclaim your saga-in-progress to all who will listen, daring your foes or allies to match it.',
            'Step between danger and those who cannot fight for themselves, no matter the odds.',
            'Prove your courage by hurling yourself headlong at the greatest enemy nearby.',
            'Share food, drink, or a tale with an ally, strengthening the bonds of the pack.',
            'Hurl insults, howls, or challenges at the enemy, drawing their wrath onto you.',
            'Take something from the fallen foe to add to your saga, whether a tooth, weapon, or token.',
        ],
        advancedCreationKeywords: ['Imperium','Adeptus Arbites', 'Space Wolves'],
    },
];
