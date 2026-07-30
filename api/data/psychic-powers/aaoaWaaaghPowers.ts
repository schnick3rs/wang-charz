import {ACTIVATION, DURATION, simpleStub, simpleCrunch} from "./utils";

export const aaoaWaaaghPowers = [
    {
        ...simpleStub(200, 'aaoa', 233, 20, '‘Eadbanger', 'WAAAGH!', 'Bring the closest enemy to zero wounds.'),
        ...simpleCrunch('7', ACTIVATION.ACTION, DURATION.INSTANT, '18m', false, ''),
        keywords: ['Ork','Psychic'],
        description:
            '<p>A bolt of raw power erupts from your head and rockets across the battlefield, causing the head of the first unfortunate victim caught in its path to explode in a shower of brains and gore. This power targets the closest enemy, who must pass a Toughness test (DN 3) immediately suffer enough wounds to exceed their Max Wounds by 1.</p>',
    },
    {
        ...simpleStub(201, 'aaoa', 233, 15, 'Da Jump', 'WAAAGH!', 'Short Teloport yourself and allied orks.'),
        ...simpleCrunch('6', ACTIVATION.FULL_ACTION, DURATION.INSTANT, '12m', false, ''),
        keywords: ['Ork','Psychic'],
        description:
            '<p>You close your eyes tight and, in a storm of flashing green light, you teleport a mass of confused greenskins to another part of the battlefield. Select a number of allies with the ORK keyword equal to your Willpower within range. Those allies vanish, and then reappear moments later anywhere within 100m. They must reappear more than 9m from an enemy, and they forfeit their move in their following turn.</p>',
    },
    {
        ...simpleStub(202, 'aaoa', 233, 15, 'Da Krunch', 'WAAAGH!', 'Stomp enemies with mortal force and knock them prone.'),
        ...simpleCrunch('7', ACTIVATION.ACTION, DURATION.INSTANT, '18m', false, ''),
        keywords: ['Ork','Psychic'],
        description:
            '<p>Green energies erupt from your eyes, ears, nose, and mouth, and coalesce into a roiling cloud above the enemy. That cloud then solidifies into the vast green foot of Gork (or Mork) himself, which commences to stamp down upon the foe. This power affects all enemies in a Medium blast within range. Affected enemies take 1d3 Mortal Wounds and are knocked prone. Foes who were already prone become staggered as well. Then, roll a d6: on an Exalted Icon, repeat the power’s effects (repositioning the blast as desired) as the foot stamps down again.</p>',
    },
    {
        ...simpleStub(203, 'aaoa', 233, 8, 'Fists of Gork', 'WAAAGH!', 'Boost yourself or an allie with great Strength.'),
        ...simpleCrunch('5', ACTIVATION.ACTION, DURATION.ONE_ROUND, '12m', false, ''),
        keywords: ['Ork','Psychic'],
        description:
            '<p>You channel Waaagh energy into your own fists or those of another Ork, providing strength enough to punch through the armour of tanks. This power affects you or one ally with the ORK keyword within range. Until the end of your next turn, the affected character’s Strength is increased by +4 and they receive +2 bonus dice on all melee attacks.</p>',
    },
    {
        ...simpleStub(204, 'aaoa', 234, 10, 'Roar of Mork', 'WAAAGH!', 'Enemies within range reduce their resolve by 2.'),
        ...simpleCrunch('7', ACTIVATION.FULL_ACTION, DURATION.SUSTAINED, '18m', false, ''),
        keywords: ['Ork','Telepathy','Psychic'],
        description:
            '<p>You open your gob impossibly wide and give vent to a bellowing roar that reverberates through your enemies’ minds. Coherent thought becomes nigh-impossible, and as the roar thunders on, panic begins to spread. While this power remains in effect, all enemies within range add +2 DN to all Resolve tests.</p>',
    },
    {
        ...simpleStub(205, 'aaoa', 234, 15, 'Warpath', 'WAAAGH!', 'Allies within range increase strength and make more multi-actions or attacks.'),
        ...simpleCrunch('6', ACTIVATION.ACTION, DURATION.INSTANT, '18m', false, ''),
        keywords: ['Ork','Psychic'],
        description:
            '<p>You disperse the Waaagh energy coursing through your frame into the Ork warriors around you, stoking their already bellicose nature into a roaring fever pitch. Select a number of allies with the ORK keyword equal to your Willpower within range. The affected allies add +2 bonus dice to all melee attacks they attempt until the start of your next turn, and they may ignore up to 2 points of DN increase for taking the Multi-Attack or Multi-Action options.</p>',
    },
];
