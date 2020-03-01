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
          key: 'weaponTraitAgonizing',
          name: 'Agonizing',
          hint: '',
          fluff: 'This weapon wounds the mind as well as the body by inflicting maximum pain.',
          crunch: 'Each wound also causes 1 lose of Shock. Exhausted targets, that suffer agonizing damage are rendered unconscious.',
          description:
            'This weapon wounds the mind as well as the body by inflicting maximum pain. '
            + 'For every Wound that this weapon inflicts, the victim also suffers 1 Shock. '
            + 'An exhausted character who suffers damage from an Agonizing weapon is rendered unconscious.',
        },
        {
          name: 'Arc',
          hint: '',
          fluff: 'Arc weapons are highly effective against vehicles.',
          crunch: 'Gain +X ED against vehicles.',
          description:
            'Arc weapons are highly effective against vehicles. '
            + 'When attacking a vehicle, arc weapons gain a bonus to ED equal to their rating.',
        },
        {
          key: 'traitAssault',
          name: 'Assault',
          hint: 'Fire the weapon with increased DN while running.',
          fluff: 'Optimised for firing on the move, a hero armed with an Assault firearm can fire from the hip while charging into the fray.',
          crunch: 'Assault weapons can be fired as part of a Run Action, with additional +2 DN for the attack.',
          description: 'Optimised for firing on the move, '
          + 'a hero armed with an Assault firearm can fire from the hip while charging into the fray. '
          + 'Assault weapons can be fired as part of a Run Action, '
          + 'but they increase the attack’s difficulty by 2.',
        },
        {
          name: 'Blast',
          hint: '',
          crunch: 'Can affect multiple targets (see Core Rules, pg. 229). '
            + '◆ Missed attacks deviate. '
            + '◆ When used in Melee (e.g. Pistols), the blast may only affect engaged targets. '
            + '◆ Fire-Blasts ignore cover bonus to defence. '
            + '◆ Fire-Blasts do not deviate, bt hit the location. Characters still avoid being hit.',
          description:
            'Most commonly possessed by weapons with explosive ordnance, '
            + 'Blast weapons can injure multiple targets with one attack, '
            + 'depending on the size (See Explosives and Area Effects on page 229).'
            + '◆ If an attack with a Blast weapon misses, it deviates. '
            + '◆ Weapons with the Fire keyword and the Blast trait do not deviate if they miss; '
            + 'instead, they simply strike the intended area, but characters within avoid being hit (either by ducking around cover or leaping out of the way). '
            + '◆ Weapons with the Fire keyword and the Blast trait ignore cover bonuses to defence. '
            + '◆ When used in melee combat, Pistol weapons with the Blast trait only affect targets the wielder is engaged with and no one else.',
        },
        {
          name: 'Blaze',
          hint: '',
          crunch: 'Any target hit is set on Fire (see CORE, pg. 275).',
          description: 'This weapon incorporates fire or burning chemicals. Any character, vehicle, or object hit by a Blaze weapon is set on fire (see Fire on page 275).',
        },
        {
          name: 'Brutal',
          hint: 'Add +1 to the result of extra damage dice.',
          fluff: 'This weapon inflicts traumatic wounds that test the skill of the most seasoned Apothecaries.',
          crunch: 'When rolling damage dice, add +1 to the result of each Extra Damage Die.',
          description: 'This weapon inflicts traumatic wounds that test the skill of the most seasoned Apothecaries. When rolling damage dice for a Brutal weapon, add +1 to the result of each Extra Damage Die.',
        },
        {
          name: 'Force',
          hint: '',
          crunch: 'Psykers add ½ their Willpower to the damage.',
          description: 'Psykers use the etheric circuit patterns and psycho-reactive materials within this weapon to channel the power of the warp into devastating attacks. '
          + 'A Psyker wielding a Force weapon adds ½ their Willpower attribute to the weapon’s base Damage Rating in addition to Strength.',
        },
        {
          name: 'Heavy',
          hint: '',
          crunch:
            'Without Strength Rating of X the wielder suffers +2 DN on attacks and is (additionally) knocked prone on a Complication. '
            + 'Wearing Armour with the Powered Trait or having the Adeptus Astartes or Ork Keyword prevents the Knock Down. '
            + 'Bracing the weapon remove the DN penalty.',
          fluff: 'Some weapons are simply too large and cumbersome to be fired with ease. Only the strongest can truly handle a heavy weapon.',
          description:
            'Some weapons are simply too large and cumbersome to be fired with ease. Only the strongest can truly handle a heavy weapon. '
            + 'All Heavy weapons have a minimum Strength rating. '
            + 'Characters who meet the strength requirements incur no penalty to their attack; '
            + 'however, those who do not meet the minimum incur an increase of +2DN on the attack, '
            + 'and a roll of 1 on the Wrath Dice knocks the user prone in addition to any other complication. '
            + 'Characters wearing powered armour and beings with the Adeptus Astartes or Ork keywords are not knocked prone when firing unsecured Heavy weapons. '
            + 'Heavy weapons must be secured to a gunnery post, vehicle mount, tripod, or braced to fire without risking the safety of the user. '
            + 'Setting a Heavy weapon up on a tripod or brace takes an action but reduces the penalty.',
        },
        {
          name: 'Melta',
          hint: '',
          crunch: 'Add +1 (+2 vs vehicles and fortifications) to ED results at close range.',
          description:
            'Melta weapons use bursts of intense heat to char flesh, melt armour, and reduce vehicles to slag. '
            + 'Melta weapons add +1 to each ED result at close range. '
            + 'Melta weapons add an additional +1 to each ED result against vehicles and fortifications at close range.',
        },
        {
          name: 'Parry',
          hint: '',
          crunch: 'Grants +1 bonus to Defence against melee attacks.',
          description: 'This weapon is well balanced and sturdy. Weapons with this trait grant a +1 bonus to Defence against melee attacks.',
        },
        {
          name: 'Penetrating',
          hint: '',
          crunch: 'If any icons are shifted for damage, the AP value increases by X.',
          description:
            'This weapon is capable of punching through armour with precision. '
            + 'When any dice are shifted from the attack to damage, weapons with this trait gain an AP Value equal to the rating.',
        },
        {
          name: 'Pistol',
          hint: '',
          crunch: 'Can be fired while engaged in close combat using the Weapon Skill in place of the Ballistic Skill.',
          description: 'Pistols are quickly drawn and relatively easy to wield in close quarters. A pistol can be fired while engaged in close combat using the Weapon Skill in place of the Ballistic Skill.',
        },
        {
          name: 'Rad',
          hint: '',
          crunch: 'Add +X to ED results.',
          description:
            'These weapons use highly dangerous radioactive materials in their ammunition. '
            + 'Weapons with this trait add a bonus to each ED result equal to the rating.',
        },
        {
          name: 'Rapid Fire',
          hint: '',
          crunch: 'Add +X dice to range attacks at close range.',
          description:
            'This weapon deals death in a hail of las beams, bullets, and bolt shells. '
            + 'A Rapid Fire weapon adds a number of bonus dice to the attack roll equal to its rating at close range.',
        },
        {
          name: 'Sniper',
          hint: '',
          fluff: 'The weapon is optimised for high accuracy over long range.',
          crunch: 'Aimed range attacks gain an additional +2d and ignore the penalty for firing into melee. Aimed range attacks add +X ED.',
          description:
            'The weapon is optimised for high accuracy over long range. '
            + 'Sniper weapons increase the bonus from aiming to +2d and ignore the penalty for firing into melee when aimed. '
            + 'After using the Aim action, sniper weapons add a number of extra damage dice equal to the rating.',
        },
        {
          name: 'Spread',
          hint: '',
          fluff: 'Spread weapons disperse their ammunition over a wide area, wreaking havoc on closely packed combatants.',
          crunch: 'When killing a troop within a mob, any excess damage carries over to the nearest troop in the same mob.',
          description:
            'Spread weapons disperse their ammunition over a wide area, wreaking havoc on closely packed combatants. '
            + 'When damage from a Spread weapon kills a troop in a mob, any excess damage is carried over and dealt to the nearest troop in the same mob.',
        },
        {
          name: 'Steadfast',
          hint: '',
          crunch: 'Ignore the first attack complication in each combat. Add +1d to Tech tests to repair and maintain.',
          description:
            'Based on time tested design patterns, Steadfast weapons are reliable and easy to maintain. '
            + 'Once per combat, ignore the first complication caused by an attack made with a Steadfast weapon. '
            + 'Tech tests made to repair and maintain Steadfast weapons receive a +1d bonus.',
        },
        {
          name: 'Supercharge',
          hint: '',
          crunch: 'When fired in supercharge mode, add +2 ED but suffer 1d6 Mortal Wounds on a Complication.',
          description:
            'Plasma weapons fire super-heated matter, but their delicate hydrogen cores are prone to devastating malfunctions. '
            + 'Many Plasma weapons have a supercharge setting. '
            + 'A Plasma weapon fired in supercharge mode deals +2D extra damage, '
            + 'but deals 1d6 Mortal Wounds to the wielder on a Complication.',
        },
        {
          name: 'Toxic',
          hint: '',
          crunch:
            'Wounded targets become Poisoned. '
            + 'Victim must pass a Toughness Test (DN X) at the end of each round to end the effect. '
            + 'Suffer X Wounds of they fail.',
          description:
            'Some weapons incorporate a mechanism of delivering a poison, infectious agent, or other compound that gradually incapacitates or kills its target. '
            + 'A character who is wounded by a weapon with the Toxic trait becomes Poisoned (see page 231). '
            + 'The character must make a Toughness test (DN X) at the end of each round. '
            + 'If they succeed (or if they are treated with a Medicae test at DN X-2), the effect ends. If they fail, they suffer X wounds.',
        },
        {
          name: 'Unwieldy',
          hint: 'Attacks have a +X DN penalty.',
          description:
            'Some weapons are more difficult to use than others; they may be unbalanced, '
            + 'require greater room to swing, or are simply too large to wield effectively. '
            + 'Weapons with this trait suffer a DN penalty equal to the rating when attacking.',
        },
        {
          name: 'Waaagh!',
          hint: '',
          fluff: 'Weapons produced by Mekboyz defy human understanding, but a greenskin doesn’t need to understand how it works to wield it with brutal cunning.',
          crunch:
            'When wielded by an wounded Ork, this weapon grants +1 attack die and +1 ED. '
            + 'Lasts until combat ends or the wielder is healed.',
          description:
            'Weapons produced by Mekboyz defy human understanding, '
            + 'but a greenskin doesn’t need to understand how it works to wield it with brutal cunning.'
            + 'When wielded by an Ork, a weapon with the Waaagh! trait grants a +1d bonus to attack and +1ED if the wielder is Lightly Wounded or Heavily Wounded. '
            + 'This bonus persists until combat ends or the Ork is healed, whichever comes first.',
        },
        {
          name: 'Warp Weapon',
          hint: '',
          crunch: 'May use the target\'s Resilience-4 as damage rating.',
          description:
            'Powered by psychic energy, bizarre alien technology, or utilizing the raw force of Chaos, '
            + 'these weapons can harm nearly any foe. '
            + 'A weapon with this quality has a damage rating equal to its listed damage rating or the target’s Resilience -4, '
            + 'whichever is higher.',
        },
        {
          name: 'Bulk',
          hint: '',
          effect: 'Reduces the Speed Trait of the Wearer by X',
          description: 'Heavy and restrictive armour possesses the Bulk trait. Bulk reduces the Speed of the wearer by a number of metres equal to X.',
        },
        {
          name: 'Cumbersome',
          hint: '',
          effect: 'Wearer cannot run or spring.',
          description: 'Common to the largest suits of powered armour, the Cumbersome trait severely limits the wearer’s movement. Characters in Cumbersome armour cannot run or sprint.',
        },
        {
          name: '\'Ere We Go!',
          hint: '',
          effect: 'When wounded, an Ork wearer ignores this armours Bulk and Cumbersome armour traits.',
          description: 'Common to Ork armour, an Ork wearing armour with this trait ignores the armour’s Bulk and Cumbersome traits when Lightly Wounded or Heavily Wounded.',
        },
        {
          name: 'Force Shield',
          hint: '',
          effect: 'The wearer my soak Mortal Wounds and the armour rating is not reduced by AP.',
          description: 'Wonders of archeotech, personal force shields envelope their user in a protective barrier of energy.'
          + ' A Force Shield’s protection allows the wearer to soak mortal wounds. '
          + 'This armour rating is invulnerable and may not be reduced by AP.',
        },
        {
          name: 'Powered',
          hint: '',
          effect: 'Grants X Strength to the wearer and ignores the Heavy weapon trait.',
          description: 'Armour designed to augment the strength of the wearer possesses the Powered trait.'
          + ' Powered armour grants a bonus to the wearer’s Strength equal to X.'
          + ' A character wearing Powered armour ignores the Heavy weapon trait.',
        },
        {
          name: 'Shield',
          hint: '',
          effect: 'Adds it\'s rating to Resilience and Defence against attacks from the front and the side. (GM has the final say)',
          description: 'This type of armour is carried, not worn. '
          + 'Wielded like a defensive weapon, shields turn away blows and incoming fire. '
          + 'A shield adds its Armour Rating to both Resilience and Defence against attacks coming from the front and side of the bearer. '
          + 'The GM has final say on how far around the bearer a shield’s protection extends. '
          + 'Some types of shields are invulnerable (designated with an asterisk next to the armour rating) and thus may not be reduced by AP.',
        },
        {
          source: 'aaoa',
          key: 'aaoa-nemesis',
          name: 'Nemesis',
          hint: '',
          effect: 'Deamons may not soak wound or mortal wounds inflicted by this weapon.',
          description:
            'Nemesis weapons are created to be bane to daemons. ' +
            'The daemonic cannot bear the touch of their rune-etched, silvered steel. ' +
            'Daemons may not Soak wounds or mortal wounds inflicted by Nemesis weapons.',
        },
      ],
    };
  },
};
