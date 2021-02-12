export default {
  data() {
    return {
      /**
       * @key unique kebabCase key
       * @name name, title, label
       * @hint a short scentence to describe the effect
       * @crunch the minmal set for rules
       * @fluff some flabour text or similar
       * @description a (html?) text describing the effect
       * @source source reference array { book: 'CORE', page: 3 }
       */
      wargearTraitRepository: [
        {
          key: 'core-agonising',
          name: 'Agonising',
          hint: '',
          fluff: 'Designed to inflict maximum pain, these weapons damage mind and morale as much as body.',
          crunch: 'Every Wound inflicted by an Agonising weapon also inflicts 1 Shock.',
          description:
            '<p>Designed to inflict maximum pain, these weapons damage mind and morale as much as body.</p>' +
            '<p>Every Wound inflicted by an Agonising weapon also inflicts 1 Shock.</p>',
        },
        {
          key: 'core-arc',
          name: 'Arc',
          hint: '',
          fluff: 'The deadly electrical discharge of Arc weapons scrambles vehicle technology.',
          crunch: 'Arc weapons gain +ED equal to their rating when you use them to attack a vehicle.',
          description:
            '<p>The deadly electrical discharge of Arc weapons scrambles vehicle technology.</p>' +
            '<p>Arc weapons gain +ED equal to their rating when you use them to attack a vehicle.</p>',
        },
        {
          key: 'core-assault',
          name: 'Assault',
          hint: 'Fire the weapon with increased DN while running.',
          fluff: 'Optimised for firing whilst rushing righteously towards the enemy.',
          crunch: 'You can fire an Assault weapon as part of a Sprint (p.180), but take a +2 DN penalty to the attack.',
          description: 'Optimised for firing whilst rushing righteously towards the enemy. You can fire an Assault weapon as part of a Sprint (p.180), but take a +2 DN penalty to the attack.',
        },
        {
          key: 'core-blast',
          name: 'Blast',
          hint: '',
          fluff: 'Explosive weapons can devastate multiple enemies with a single attack.',
          crunch: 'Target a point (DN 3) and deal damage to anyone in the blast radius. You can´t shift for damage.',
          description:
            '<p>Explosive weapons can devastate multiple enemies with a single attack.</p>' +
            '<p>Every Blast weapon has a (Size) which determines how many enemies it can hit, assuming they are close together. Choose any point in range, and make a DN 3 Ballistic Skill (A) Test; if you succeed, you deal Damage to all individuals within the Blast Radius. If you’re measuring distance accurately or using miniatures, multiply the Radius by 3 for the approximate circumference of the explosion in metres.</p>' +
            '<ul>' +
            '<li>Rating 2m, ~1 Target</li>' +
            '<li>Rating 6m, ~3 Targets</li>' +
            '<li>Rating 10m, ~5 Targets</li>' +
            '<li>Rating 20m, ~10 Targets</li>' +
            '<li>Rating 30m, ~15 Targets</li>' +
            '</ul>' +
            '<p><ou can not shift for damage/p>' +
            '<p>If a weapon with the Blast Trait misses, it Scatters (p.186).</p>',
        },
        {
          key: 'core-brutal',
          name: 'Brutal',
          hint: 'Add +1 to the die result of Extra Damage dice.',
          fluff: 'Brutal weapons inflict appalling, traumatic wounds.',
          crunch: 'When rolling damage dice, add +1 to the result of each Extra Damage Die.',
          description:
            '<p>When you roll Extra Damage Dice for a Brutal weapon:</p>' +
            '<ul>' +
            '<li>Results of 1 and 2 inflict 0 Damage.</li>' +
            '<li>Results of 3 and 4 inflict 1 Damage.</li>' +
            '<li>Results of 5 and 6 inflict 2 Damage.</li>' +
            '</ul>',
        },
        {
          key: 'core-force',
          name: 'Force',
          hint: 'PSYKERs may add half their Wil Rating to damage.',
          fluff: 'Psykers can channel the power of the Warp through the etheric circuit patterns and psycho-reactive materials of these weapons.',
          crunch: 'If you have the PSYKER Keyword, you may add half of your Wil Rating to a Force weapon’s Damage Value. If not, reduce damage by 2.',
          description:
            '<p>Psykers can channel the power of the Warp through the etheric circuit patterns and psycho-reactive materials of these weapons.</p>' +
            '<p>If you have the PSYKER Keyword, you may add half of your Wil Rating to a Force weapon’s Damage Value.</p>' +
            '<p>If you don’t have the PSYKER Keyword, a Force weapon’s damage is decreased by 2.</p>',
        },
        {
          key: 'core-flamer',
          name: 'Flamer',
          hint: 'Burn multiple Targets.',
          fluff: 'Flamers spew a stream of burning chemical liquid. The flowing torrent of flame can be guided by the wielder of a Flamer to set multiple foes ablaze.',
          crunch: 'Flame attacks ignore cover and Inflict (On Fire). You may not shift for damage but shift to move a stream of flames (see. Core Rules).',
          description:
            '<p>Flamers spew a stream of burning chemical liquid. The flowing torrent of flame can be guided by the wielder of a Flamer to set multiple foes ablaze.</p>' +
            '<p> Attacks made with a Flamer ignore cover. If you hit a target with a Flamer, blazing liquid fills the space between you and your target in a straight line. Anything in that line is also hit by the attack.</p>' +
            '<p>You can Shift when you make a ranged attack Test with a Flamer to arc the stream of burning chemicals a number of metres equal to your Ballistic Skill Rating. Anything in this arc is hit by the attack.</p>' +
            '<p>Whenever you hit multiple targets, roll damage once and apply that damage to all targets. Any target may attempt to reduce the damage using the rules for Dodging Area Effect Attacks on p.186.</p>' +
            '<p>A weapon with the Flamer Trait is considered to have the Inflict (On Fire) Trait.</p>',
        },
        {
          key: 'core-heavy',
          name: 'Heavy',
          hint: '',
          fluff: 'Large and cumbersome weapons are difficult to fire accurately.',
          crunch: 'You need (X) Str or you suffer +2 DN to attacks and are knocked prine on a Complication. Or, the Brace (p.189) Action.',
          description:
            '<p>Large and cumbersome weapons are difficult to fire accurately.</p>' +
            '<p>You must have a Strength equal to the Heavy weapon’s rating to fire it normally. All attacks with a Heavy weapon are made with a +2 DN penalty if you do not meet the minimum Strength, and a Complication knocks you Prone in addition to any other effects.</p>' +
            '<p>Taking the Brace (p.189) Action or securing a Heavy weapon to something like a tripod negates the Heavy Trait.</p>',
        },
        {
          key: 'core-inflict',
          name: 'Inflict',
          hint: '',
          fluff: 'These weapons are designed to harm the target in cruel and unusual ways.',
          crunch: 'Inflict (Condition) if the damage deals a Wound.',
          description:
            '<p>These weapons are designed to harm the target in cruel and unusual ways.</p>' +
            '<p>Every Inflict weapon has a Condition that it imposes on the target if it deals a Wound. For example, if a weapon with Inflict (On Fire) deals a Wound to a target, the target is On Fire.</p>' +
            '<p>If an Inflict weapon has a number, that number determines the number of any Test made to remove the Condition. For example, if a weapon with Inflict (Poisoned 4) Wounds a target, they are Poisoned, and the target would need to make a DN 4 Toughness Test to recover at the beginning of their next turn.</p>',
        },
        {
          key: 'core-kustom',
          name: 'Kustom',
          hint: '',
          fluff: '',
          crunch: 'Replace CUStOM with any other weapon trait, setting a Rating (X) to 1d3.',
          description:
            '<p>You can replace this weapon Trait with any other Weapon Trait of your choice when you acquire a weapon with this Trait. If the Trait you select has a Rating (X), roll 1d3 to determine the Rating</p>',
        },
        {
          key: 'core-melta',
          name: 'Melta',
          hint: '',
          fluff: 'The sub-atomic bursts that spew from these weapons melt flesh and reduce armour to slag.',
          crunch: 'Add +1 to ED dice results on short range. Even more if its a vehicle or fortification.',
          description:
            '<p>The sub-atomic bursts that spew from these weapons melt flesh and reduce armour to slag.</p>' +
            '<p>When you roll Extra Damage Dice for a Melta weapon fired at Short Range:' +
            '<ul>' +
            '<li>u Results of 1 and 2 inflict 0 Damage.</li>' +
            '<li>u Results of 3 and 4 inflict 1 Damage.</li>' +
            '<li>u Results of 5 and 6 inflict 2 Damage.</li>' +
            '</ul>' +
            '<p>When you roll Extra Damage Dice for a Melta weapon fired against a vehicle or fortification at close range:</p>' +
            '<ul>' +
            '<li>u Results of 1, 2 and 3 inflict 1 Damage.</li>' +
            '<li> u Results of 4, 5 and 6 inflict 2 Damage.</li>' +
            '</ul>',
        },
        {
          key: 'core-parry',
          name: 'Parry',
          hint: '',
          fluff: 'You can use these weapons to deflect blows.',
          crunch: 'You gain +1 Defence against melee attacks while wielding a Parry weapon.',
          description:
            '<p>You can use these weapons to deflect blows.</p>' +
            '<p>You gain +1 Defence against melee attacks while wielding a Parry weapon.</p>',
        },
        {
          key: 'core-pistol',
          name: 'Pistol',
          hint: '',
          fluff: 'Built light to be drawn quickly and used in close quarters.',
          crunch: 'Pistols can be fired while Engaged (see core pg. 184) with a +2 DN, using the Ballistic Skill.',
          description:
            '<p>Built light to be drawn quickly and used in close quarters.</p>' +
            '<p>Pistols can be fired while Engaged (p.184) with a +2 DN, using the Ballistic Skill.</p>',
        },
        {
          key: 'core-rad',
          name: 'Rad',
          hint: '',
          fluff: 'The dangerous radioactive materials fired by these weapons irrevocably damage flesh.',
          crunch: 'When you roll Extra Damage Dice for a Rad weapon, you add the Rating to the results of the dice.',
          description:
            '<p>The dangerous radioactive materials fired by these weapons irrevocably damage flesh.</p>' +
            '<p>When you roll Extra Damage Dice for a Rad weapon, you add the Rating to the results of the dice.</p>',
        },
        {
          key: 'core-rapid-fire',
          name: 'Rapid Fire',
          hint: '',
          fluff: 'These weapons are capable of quickly unleashing a hail of death at close range.',
          crunch: 'This Weapon deals +X ED at Short Range.',
          description:
            '<p>These weapons are capable of quickly unleashing a hail of death at close range.</p>' +
            '<p>If you hit with a Rapid Fire weapon at Short Range, you gain Extra Damage Dice equal to the weapon’s Rapid Fire rating</p>',
        },
        {
          key: 'core-reliable',
          name: 'Reliable',
          hint: '',
          fluff: 'A rugged and easily maintained weapon.',
          crunch: 'You can ignore the first Complication related to this weapon per scene. Tests made to repair or maintain Reliable weapons are made with +1 bonus die.',
          description:
            '<p>A rugged and easily maintained weapon.</p>' +
            '<p>You can ignore the first Complication related to this weapon per scene. Tests made to repair or maintain Reliable weapons are made with +1 bonus die.</p>',
        },
        {
          key: 'core-rending',
          name: 'Rending',
          hint: '',
          fluff: 'These powerful weapons punch through armour.',
          crunch: 'When you Shift an Exalted Icon as part of an attack with a Rending weapon, the weapon’s AP improves by the Rending rating for that attack.',
          description:
            '<p>These powerful weapons punch through armour.</p>' +
            '<p>When you Shift an Exalted Icon as part of an attack with a Rending weapon, the weapon’s AP improves by the Rending rating for that attack</p>',
        },
        {
          key: 'core-silent',
          name: 'Silent',
          hint: '',
          fluff: 'These stealthy weapons are designed to deal damage as quietly as possible.',
          crunch: 'When a weapon with this Trait is used as part of an attack, your Stealth Score is only reduced by 3.',
          description:
            '<p>These stealthy weapons are designed to deal damage as quietly as possible.</p>' +
            '<p>When a weapon with this Trait is used as part of an attack, your Stealth Score is only reduced by 2.</p>',
        },
        {
          key: 'core-sniper',
          name: 'Sniper',
          hint: '',
          fluff: 'Weapons optimised for high accuracy over long range.',
          crunch: 'When you Aim with a Sniper weapon you gain an additional + 1 bonus die to the attack, and gain +ED equal to the weapon’s Sniper rating.',
          description:
            '<p></p>',
        },
        {
          key: 'fspg-blessed',
          name: 'Blessed',
          hint: '',
          fluff: 'These weapon are particularly effective against the foul beings.',
          crunch: 'Blessed weapons gain +ED equal to their rating when you use them to attack a target with the PSYKER or DAEMON Keywords.',
          description:
            '<p>Anointed by the priests of the Ecclesiarchy, or hexagrammicly warded against the foul forces of the archenemy, these weapons are particularly effective against the foul beings spawned by the Immaterium, and those tainted by its power. Blessed weapons gain +ED equal to their rating when you use them to attack a target with the PSYKER or DAEMON Keywords.</p>',
        },
        // breakpoint
        {
          key: 'core-spread',
          name: 'Spread',
          hint: '',
          fluff: 'These wide-bore weapons wreak havoc on closely packed combatants.',
          crunch: 'When fired at Short Range, a Spread weapon can hit any number of targets as long as they are all within 3 metres of one another. When you fire a Spread Weapon at a Mob you gain +3 bonus dice.',
          description:
            '<p>These wide-bore weapons wreak havoc on closely packed combatants.</p>' +
            '<p>When fired at Short Range, a Spread weapon can hit any number of targets as long as they are all within 3 metres of one another. When you fire a Spread Weapon at a Mob you gain +3 bonus dice.</p>',
        },
        {
          key: 'core-supercharge',
          name: 'Supercharge',
          hint: '',
          crunch: 'When fired in supercharge mode, add +2 ED but suffer 1d6 Mortal Wounds on a Complication.',
          description:
            '<p>The super-heated matter plasma weapons fire can be overcharged with undeniably deadly results for the target and, occasionally, the wielder.</p>' +
            '<p>You can choose to fire a weapon with this Trait in Supercharge mode. If you roll a Complication, you take 1d6 Mortal Wounds. If you hit, the weapon deals an additional +3 ED.</p>',
        },
        {
          key: 'core-unwieldy',
          name: 'Unwieldy',
          hint: 'Attacks have a +X DN penalty.',
          crunch: 'Attacks have a +X DN penalty.',
          description:
            '<p>Whether unbalanced or too large, some weapons are harder to use.</p>' +
            '<p>Attacks made with Unwieldy weapons have their DN increased by an amount equal to their Unwieldy rating.</p>',
        },
        {
          key: 'core-waaagh',
          name: 'Waaagh!',
          hint: '',
          fluff: 'Ork weapons defy understanding; they break the laws of mechanics and physics, but a Greenskin’s beliefs make them all the more deadly.',
          crunch:
            'If you are an Ork, you gain +1 bonus die to attacks with a WAAAGH! weapon. If you are also Wounded (p.193), you deal an extra +1 ED.',
          description:
            '<p>Ork weapons defy understanding; they break the laws of mechanics and physics, but a Greenskin’s beliefs make them all the more deadly.</p>' +
            '<p>If you are an Ork, you gain +1 bonus die to attacks with a WAAAGH! weapon. If you are also Wounded (p.193), you deal an extra +1 ED.</p>',
        },
        {
          key: 'core-warp-weapon',
          name: 'Warp Weapon',
          hint: '',
          fluff: 'Powered by psychic energy, xenos technology, or the raw force of Chaos, few can face these ungodly weapons and emerge unharmed.',
          crunch: 'A Warp Weapon has a Damage value equal to the target’s Resilience –4, unless the weapon’s listed Damage is higher.',
          description:
            '<p>Powered by psychic energy, xenos technology, or the raw force of Chaos, few can face these ungodly weapons and emerge unharmed.</p>' +
            '<p>A Warp Weapon has a Damage value equal to the target’s Resilience –4, unless the weapon’s listed Damage is higher.</p>',
        },
        // Armour Traits
        {
          key: 'core-bulk',
          name: 'Bulk',
          hint: '',
          crunch: 'Reduces the Speed Trait by X',
          description:
            '<p>Heavy and restrictive armour possesses the Bulk trait.</p>' +
            '<p>Bulk reduces the Speed of the wearer by a number of metres equal to its rating.</p>',
        },
        {
          key: 'core-cumbersome',
          name: 'Cumbersome',
          hint: '',
          crunch: 'You cannot Run or Sprint.',
          description:
            '<p>Large suits of armour can severely restrict movement.</p>' +
            '<p>You cannot Run or Sprint in Cumbersome armour</p>',
        },
        {
          key: 'core-ere-we-go',
          name: '\'Ere We Go!',
          hint: '',
          crunch: 'An Ork wearing armour with this Trait ignores the Bulk and Cumbersome Traits when Wounded.',
          description:
            '<p>The latent psychic power of an Ork empowers their armour, allowing them to fight harder when harmed.</p>' +
            '<p>An Ork wearing armour with this Trait ignores the Bulk and Cumbersome Traits when Wounded.</p>',
        },
        {
          key: 'core-force-field',
          name: 'Force Field',
          hint: '',
          crunch: 'Armour with this Trait allows you to roll Determination against Mortal Wounds.',
          description:
            '<p>Wonders of archeotech, personal Power Fields envelope their user in a protective barrier of energy.</p>' +
            '<p>Armour with this Trait allows you to roll Determination against Mortal Wounds.</p>',
        },
        {
          name: 'Powered',
          hint: '',
          crunch: 'You gain +X Strength and you are not knocked prone using a Heavy Weapon.',
          description:
            '<p>This armour is designed to augment the wearer’s might through the marvels of mechanisation.</p>' +
            '<p>Whilst wearing armour with this Trait you gain a Strength bonus equal to the rating. Additionally, you are not knocked Prone when firing an unsecured Heavy weapon.</p>',
        },
        {
          key: 'core-shield',
          name: 'Shield',
          hint: '',
          crunch: 'Add the Armour Rating to your Defence and Resilience, provided the GM agrees you can manoeuvre the shield to block the attack.',
          description:
            '<p>Wielded like a defensive weapon, shields are carried instead of worn, and used to deflect incoming attacks.</p>' +
            '<p>Armour with this Trait adds its AR to your Defence and Resilience, provided the GM agrees you can manoeuvre the shield to block the attack.</p>',
        },
        // AAOA - Traits
        {
          source: 'aaoa',
          key: 'aaoa-nemesis',
          name: 'Nemesis',
          hint: '',
          crunch: 'Deamons may not soak wound or mortal wounds inflicted by this weapon.',
          description:
            '<p>Nemesis weapons are created to be bane to daemons. The daemonic cannot bear the touch of their rune-etched, silvered steel. Daemons may not Soak wounds or mortal wounds inflicted by Nemesis weapons.</p>',
        },
        {
          source: 'aaoa',
          key: 'aaoa-tesla',
          name: 'Tesla',
          hint: '',
          crunch: 'May shift exalted icons from an attack to an additional enemy (per shift) within 3m with the weapons default damage and AP.',
          description:
            '<p>The weapon discharges in arcs of crackling lightning, which leap from foe to foe. When you shift Exalted Icons from a successful attack, you may shift Exalted Icons to hit enemies within 3m of an existing target as well as the main target, using the weapon’s normal damage and AP. Each Exalted Icon shifted may only be used to hit additional enemies or to gain +ED, not both.</p>',
        },
      ],
    };
  },
};
