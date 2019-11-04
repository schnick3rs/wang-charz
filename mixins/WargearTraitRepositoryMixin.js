export default {

  data() {
    return {
      wargearTraitRepository: [
        {
          name: 'Agonizing',
          hint: '',
          description: 'This weapon wounds the mind as well as the body by inflicting maximum pain. ' +
          'For every Wound that this weapon inflicts, the victim also suffers 1 Shock. ' +
          'An exhausted character who suffers damage from an Agonizing weapon is rendered unconscious.'
        },
        {
          name: 'Arc',
          hint: '',
          description: 'Arc weapons are highly effective against vehicles.' +
          ' When attacking a vehicle, arc weapons gain a bonus to ED equal to their rating.'
        },
        {
          name: 'Assault',
          hint: '',
          description: 'Optimised for firing on the move, ' +
          'a hero armed with an Assault firearm can fire from the hip while charging into the fray. ' +
          'Assault weapons can be fired as part of a Run Action, ' +
          'but they increase the attack’s difficulty by 2.'
        },
        {
          name: 'Blast',
          hint: '',
          description: 'Most commonly possessed by weapons with explosive ordnance, ' +
          'Blast weapons can injure multiple targets with one attack, ' +
          'depending on the size (See Explosives and Area Effects on page 229).' +
          '◆ If an attack with a Blast weapon misses, it deviates. ◆ Weapons with the Fire keyword and the Blast trait do not deviate if they miss; instead, they simply strike the intended area, but characters within avoid being hit (either by ducking around cover or leaping out of the way). ◆ Weapons with the Fire keyword and the Blast trait ignore cover bonuses to defence. ◆ When used in melee combat, Pistol weapons with the Blast trait only affect targets the wielder is engaged with and no one else.'
        },
        {
          name: 'Blaze',
          hint: '',
          description: 'This weapon incorporates fire or burning chemicals. Any character, vehicle, or object hit by a Blaze weapon is set on fire (see Fire on page 275).'
        },
        {
          name: 'Brutal',
          hint: '',
          description: 'This weapon infl icts traumatic wounds that test the skill of the most seasoned Apothecaries. When rolling damage dice for a Brutal weapon, add +1 to the result of each Extra Damage Die.'
        },
        {
          name: 'Force',
          hint: '',
          description: 'Psykers use the etheric circuit patterns and psycho-reactive materials within this weapon to channel the power of the warp into devastating attacks. A Psyker wielding a Force weapon adds ½ their Willpower attribute to the weapon’s base Damage Rating in addition to Strength.'
        },
        {
          name: 'Heavy',
          hint: '',
          description: 'Some weapons are simply too large and cumbersome to be fi red with ease. Only the strongest can truly handle a heavy weapon. All Heavy weapons have a minimum Strength rating. Characters who meet the strength requirements incur no penalty to their attack; however, those who do not meet the minimum incur an increase of +2DN on the attack, and a roll of 1 on the Wrath Dice knocks the user prone in addition to any other complication. Characters wearing powered armour and beings with the Adeptus Astartes or Ork keywords are not knocked prone when fi ring unsecured Heavy weapons. Heavy weapons must be secured to a gunnery post, vehicle mount, tripod, or braced to fi re without risking the safety of the user. Setting a Heavy weapon up on a tripod or brace takes an action but reduces the penalty.'
        },
        {
          name: 'Melta',
          hint: '',
          description: 'Melta weapons use bursts of intense heat to char fl esh, melt armour, and reduce vehicles to slag. Melta weapons add +1 to each ED result at close range. Melta weapons add an additional +1 to each ED result against vehicles and fortifi cations at close range.'
        },
        {
          name: 'Parry',
          hint: '',
          description: 'This weapon is well balanced and sturdy. Weapons with this trait grant a +1 bonus to Defence against melee attacks.'
        },
        {
          name: 'Penetrating',
          hint: '',
          description: 'This weapon is capable of punching through armour with precision. When any dice are shifted from the attack to damage, weapons with this trait gain an AP Value equal to the rating.'
        },
        {
          name: 'Pistol',
          hint: '',
          description: 'Pistols are quickly drawn and relatively easy to wield in close quarters. A pistol can be fi red while engaged in close combat using the Weapon Skill in place of the Ballistic Skill.'
        },
        {
          name: 'Rad',
          hint: '',
          description: 'These weapons use highly dangerous radioactive materials in their ammunition. Weapons with this trait add a bonus to each ED result equal to the rating.'
        },
        {
          name: 'Rapid Fire',
          hint: '',
          description: 'This weapon deals death in a hail of las beams, bullets, and bolt shells. A Rapid Fire weapon adds a number of bonus dice to the attack roll equal to its rating at close range.'
        },
        {
          name: 'Sniper',
          hint: '',
          description: 'The weapon is optimised for high accuracy over long range. Sniper weapons increase the bonus from aiming to +2d and ignore the penalty for fi ring into melee when aimed. After using the Aim action, sniper weapons add a number of extra damage dice equal to the rating.'
        },
        {
          name: 'Spread',
          hint: '',
          description: 'Spread weapons disperse their ammunition over a wide area, wreaking havoc on closely packed combatants. When damage from a Spread weapon kills a troop in a mob, any excess damage is carried over and dealt to the nearest troop in the same mob.'
        },
        {
          name: 'Steadfast',
          hint: '',
          description: 'Based on time tested design patterns, Steadfast weapons are reliable and easy to maintain. Once per combat, ignore the fi rst complication caused by an attack made with a Steadfast weapon. Tech tests made to repair and maintain Steadfast weapons receive a +1d bonus.'
        },
        {
          name: 'Supercharge',
          hint: '',
          description: 'Plasma weapons fi re super-heated matter, but their delicate hydrogen cores are prone to devastating malfunctions. Many Plasma weapons have a supercharge setting. A Plasma weapon fi red in supercharge mode deals +2D extra damage, but deals 1d6 Mortal Wounds to the wielder on a Complication.'
        },
        {
          name: 'Toxic',
          hint: '',
          description: 'Some weapons incorporate a mechanism of delivering a poison, infectious agent, or other compound that gradually incapacitates or kills its target. A character who is wounded by a weapon with the Toxic trait becomes Poisoned (see page 231). The character must make a Toughness test (DN X) at the end of each round. If they succeed (or if they are treated with a Medicae test at DN X-2), the effect ends. If they fail, they suffer X wounds.'
        },
        {
          name: 'Unwieldy',
          hint: '',
          description: 'Some weapons are more diffi cult to use than others; they may be unbalanced, require greater room to swing, or are simply too large to wield effectively. Weapons with this trait suffer a DN penalty equal to the rating when attacking.'
        },
        {
          name: 'Waaagh!',
          hint: '',
          description: 'Weapons produced by Mekboyz defy human understanding, but a greenskin doesn’t need to understand how it works to wield it with brutal cunning. When wielded by an Ork, a weapon with the Waaagh! trait grants a +1d bonus to attack and +1ED if the wielder is Lightly Wounded or Heavily Wounded. This bonus persists until combat ends or the Ork is healed, whichever comes fi rst.'
        },
        {
          name: 'Warp Weapon',
          hint: '',
          description: 'Powered by psychic energy, bizarre alien technology, or utilizing the raw force of Chaos, these weapons can harm nearly any foe. A weapon with this quality has a damage rating equal to its listed damage rating or the target’s Resilience -4, whichever is higher.'
        },
      ],
    };
  },
};
