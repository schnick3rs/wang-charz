export default {
  data() {
    return {
      threatRepository: [
        {
          source: {
            book: 'core',
            version: 'v1',
            page: '409',
          },
          key: 'astraMilitarumTrooper',
          name: 'Astra Militarum Trooper',
          faction: 'Imperial',
          classification: [
            'Troops',
            'Troops',
            'Troops',
            'Troops',
            'Troops',
          ],
          attributes: {
            strength: 3,
            agility: 3,
            toughness: 3,
            intellect: 3,
            willpower: 3,
            fellowship: 3,
            initiative: 3,
          },
          traits: {
            defence: 3,
            speed: 3,
            wounds: 3,
            shock: 3,
            soak: 3,
            resolve: 3,
            conviction: 3,
            passiveAwareness: 3,
            resilience: {
              total: 8,
              armourRating: 3,
              armourName: 'Flak Armour'
            },
          },
          skills: {
            ballisticSkill: 6,
            default: 5,
          },
          size: 'Average',
          sizeModifier: 0,
          keywords: [
            'Human',
            'Imperium',
          ],
          attacks: [
            {
              name: 'Lasgun',
              type: 'ranged-weapon',
              damage: { static: 7, ed: 1},
              range: 48,
              salvo: 2,
              ap: 0,
              traits: [ 'Steadfast', 'Rapid Fire (2)' ],
            },
            {
              name: '2 Frag Grenades',
              type: 'ranged-weapon',
              damage: { static: 10, ed: 1},
              range: 12,
              salvo: -1,
              ap: 0,
              traits: [ 'Blast (Medium)' ],
            },
            {
              name: 'Knife or Bayonet',
              type: 'melee-weapon',
              damage: { static: 5, ed: 1},
              ap: 0,
              traits: [],
            },
          ],
          specialAbilities: [
            {
              name: 'Human Waves',
              effect: 'Any time a mob of Imperial Guardsman fail a Resolve Test or are destroyed, the Game Master gains 1 Ruin.',
            },
            {
              name: '(Mob) Bring it Down!',
              type: 'Mob',
              effect: 'When the mob makes a combined attack, it gains +2ED to damage',
            },
          ],
        },
        {
          source: {
            book: 'core',
            version: 'v1',
            page: '409',
          },
          key: 'astraMilitarumVeteranTrooper',
          name: 'Astra Militarum Veteran Trooper',
          faction: 'Imperial',
          variantOf: 'astraMilitarumTrooper',
          classification: [
            'Adversary',
            'Adversary',
            'Elite',
            'Troops',
            'Troops',
          ],
          attributes: {
            strength: 3,
            agility: 3,
            toughness: 3,
            intellect: 3,
            willpower: 3,
            fellowship: 3,
            initiative: 3,
          },
          traits: {
            defence: 3,
            speed: 3,
            wounds: 3,
            shock: 3,
            soak: 3,
            resolve: 4,
            conviction: 3,
            passiveAwareness: 4,
            resilience: {
              total: 8,
              armourRating: 3,
              armourName: 'Flak Armour'
            },
          },
          skills: {
            ballisticSkill: 7,
            default: 6,
          },
          size: 'Average',
          sizeModifier: 0,
          keywords: [
            'Human',
            'Imperium',
          ],
          attacks: [
            {
              name: 'Lasgun',
              type: 'ranged-weapon',
              damage: { static: 7, ed: 1},
              range: 48,
              salvo: 2,
              ap: 0,
              traits: [ 'Steadfast', 'Rapid Fire (2)' ],
            },
            {
              name: '2 Frag Grenades',
              type: 'ranged-weapon',
              damage: { static: 10, ed: 1},
              range: 12,
              salvo: -1,
              ap: 0,
              traits: [ 'Blast (Medium)' ],
            },
            {
              name: 'Knife or Bayonet',
              type: 'melee-weapon',
              damage: { static: 5, ed: 1},
              ap: 0,
              traits: [],
            },
          ],
          specialAbilities: [
            {
              name: '(Ruin) Stand Fast!',
              type: 'Ruin',
              effect: 'A veteran trooper can spend one Ruin to make a Leadership Test as a free action.',
            },
            {
              name: 'First Rank Fire! Second Rank Fire!',
              effect: 'As an action, the veteran trooper may order a mob of Astra Militarum troops to focus their attention on fi ring their ranged weapons. Choose one mob within 6 metres of the veteran trooper. The selected mob may use a Salvo action on their next turn. This action does not cost a Reload.',
            },
          ],
        },
        {
          source: {
            book: 'The High Altar of Technology',
            key: 'altar',
            version: '',
            page: '',
          },
          key: 'altarKastelanRobot',
          name: 'Kastelan Robot',
          faction: 'Adeptus Mechanicus',
          classification: [
            'Adversary',
            'Adversary',
            'Adversary',
            'Elite',
            'Elite',
          ],
          description: 'An echoing remnant of the once-great Legio Cybernetica, the Kastelan is a true robot, capable of making combat decisions without the input of a human operator. Edging dangerously close to the Silica Animus the Mechanicum fears, every Kastelan Robot is programmed with special data-chips, sanctified and warded against what the Adeptus Mechanicus fears above all else: another uprising of Artificial Intelligence. To help prevent this, Kastelan robots are usually fielded alongside Cybernetica Datasmiths, tech-priests who dedicate themselves to monitoring and feeding combat data to these walking automatons.' +
          '<br/><br/>While the Kastelan Robot is technically classed as a vehicle and is treated as such for most purposes, it operates on its own will without a human intelligence, and therefore much in common with a normal enemy as well. For all purposes that involve the vehicle’s pilot, consider the profile below to represent both the Kastelan itself and its “pilot”.',
          attributes: {
            strength: 8,
            agility: 4,
            toughness: '--',
            intellect: 2,
            willpower: '--',
            fellowship: '--',
            initiative: 4,
          },
          traits: {
            defence: 4,
            speed: 8,
            wounds: 10,
            shock: '--',
            soak: 8,
            resolve: '--',
            conviction: '--',
            passiveAwareness: 3,
            resilience: {
              total: 17,
              armourRating: 17,
              armourName: 'Walker'
            },
          },
          skills: {
            ballisticSkill: 6,
            weaponSkill: 6,
            default: 5,
          },
          size: 'Large',
          sizeModifier: 1,
          keywords: [
            'Robot',
            'Imperium',
            'Adeptus Mechanicus',
            '<Forge World>',
          ],
          attacks: [
            {
              name: 'Kastelan Fists',
              type: 'melee-weapon',
              range: 1,
              damage: { static: 18, ed: 2},
              ap: -3,
              traits: [ 'Brutal' ],
            },
            {
              name: 'Incendine Combustor',
              type: 'ranged-weapon',
              range: 16,
              damage: { static: 12, ed: 2},
              salvo: 2,
              ap: -1,
              traits: [ 'Blast (Large)', 'Blaze', 'Heavy (6)', 'Spread' ],
            },
            {
              name: '3x Heavy Phosphor Blaster',
              type: 'ranged-weapon',
              range: 72,
              damage: { static: 14, ed: 2},
              salvo: 3,
              ap: -2,
              traits: [ 'Blaze', 'Heavy (6)', 'Phosphor' ],
              special: 'All three Phosphor Blasters may be fired individually each turn.'
            },
          ],
          specialAbilities: [
            {
              name: 'Repulsor Grid',
              effect: 'A Kastelan Robot has a Force Shield with AV *5. When attempting to soak wounds, if two or more 6s are rolled on the soak roll, the enemy that made the attack suffers a mortal wound.',
            },
            {
              name: 'Battle-Automata',
              effect: 'A Robot is not alive, and therefore ignores any effects that would affect the mind or physiology, such as poisons, radiation, disease, or mind-affecting psychic powers. A Robot does not have a toughness, willpower, fellowship resolve or conviction score and is considered to automatically pass those tests if it is required to make them, except where the GM determines otherwise.',
            },
            {
              name: 'Battle Protocols',
              effect: 'Kastelan Robots can have one of three battle protocols active at a time. ' +
              'A Kastelan Robot begins combat with Aegis Protocol active and cannot change to ' +
              'another except by the actions of a Cybernetica Datasmith. ' +
              '(1) Aegis Protocol: The Kastelan robot adds 2 to its resilience and increases the AV of its Repulsor Grid force shield to 7.' +
              '(2) Conqueror Protocol: The Kastelan cannot fire any ranged weapons it has equipped, but may ignore up to 2DN penalty for making a melee Multi-Attack.' +
              '(3) Protector Protocol: The Kastelan cannot use any melee weapons it has equipped and cannot move, but doubles the Salvo rating for all its ranged weapons.',
            },
          ],
        },
        /** Legacy of the Necrontyr */
        {
          source: {
            book: 'Legacy of the Necrontyr',
            key: 'necroncy',
            version: '',
            page: '',
          },
          key: 'necroncyWarrior',
          name: 'Necron Warrior',
          faction: 'Necrontyr',
          classification: [
            'Adversary',
            'Elite',
            'Elite',
            'Troops',
            'Troops',
          ],
          description: 'When the Necrontyr gave up their mortality, countless workers, shopkeepers, artisans, and farmers were among their number. After the entire race became soulless machines, these menial workers became the basest of the new Necron race: foot soldiers with only enough intelligence to follow orders. These “Warriors” are supremely unintelligent, following highly predictable processes with extremely basic programming, unless directed by an overseer. However, predicting their actions is entirely different from being able to stop them, and even the basic Warrior is a near-immortal combatant, with superhuman strength and weaponry that baffles the Adeptus Mechanicus.',
          attributes: {
            strength: 5,
            agility: 4,
            toughness: 5,
            intellect: 1,
            willpower: 4,
            fellowship: 1,
            initiative: 4,
          },
          traits: {
            defence: 3,
            speed: 5,
            wounds: 8,
            shock: 7,
            soak: 5,
            resolve: '-',
            conviction: '-',
            passiveAwareness: 4,
            resilience: {
              total: 10,
              armourRating: 4,
              armourName: 'Living Metal'
            },
          },
          skills: {
            ballisticSkill: 8,
            default: 7,
          },
          size: 'Average',
          sizeModifier: 0,
          keywords: [
            'Necron',
            '<Dynasty>',
          ],
          attacks: [
            {
              name: 'Gauss Flayer',
              type: 'ranged-weapon',
              range: 48,
              damage: { static: 10, ed: 1},
              ap: -1,
              salvo: 2,
              traits: [ 'Rappid Fire (2)' ],
            },
          ],
          specialAbilities: [
            {
              name: 'Reanimation Protocols',
              effect: 'When this threat is reduced to 0 wounds, except by Annihilation, roll a d6 ' +
              'at the beginning of each following round until combat ends or reanimation occurs. ' +
              'On a die result of 5 or 6, the threat returns to consciousness with 1d6*Tier wounds ' +
              'remaining. ' +
              'For mobs with this ability, instead roll a d6 for each member of the mob that has ' +
              'been lost, and for each result of 5 or 6, restore it to the mob. A mob that is ' +
              'reduced to 0 members does not roll for Reanimation Protocols.' +
              'As a full round action, a character may attack a Necron at 0 wounds, spending enough ' +
              'time to blast its remains apart or chop it to pieces, killing it permanently (or at ' +
              'least for the remainder of the combat). It may still be teleported away from the ' +
              'battlefield by its tomb.',
            },
            {
              name: ' Soulless Machine',
              effect: 'A Necron is immune to fear, pinning, and mind-affecting abilities and powers. A Necron never needs to pass Resolve tests in order to keep fighting. A Necron’s Corruption is permanently locked at 0. Necrons are immune to disease and toxins, and never have to eat, sleep, or breathe. For the purposes of weapons and abilities that affect machines, a Necron is considered a machine.',
            },
            {
              name: '(Mob) Undying Legions',
              effect: 'Whenever a mob of Necron Warriors successfully regains more than two members due to Reanimation Protocols, the GM gains 1 Ruin.',
            },
          ],
        },
        {
          source: {
            book: 'Legacy of the Necrontyr',
            key: 'necroncy',
            version: '',
            page: '',
          },
          key: 'necroncyImmortal',
          name: 'Necron Immortal',
          faction: 'Necrontyr',
          classification: [
            'Adversary',
            'Adversary',
            'Elite',
            'Elite',
            'Elite',
          ],
          description: 'Formerly professional soldiers in the Necrontyr military, these warriors retained a spark of their sentience, though they are still only capable of slightly more than a Warrior. Often assigned as leaders of groups of Warriors, Immortals carry much more powerful weapons and are covered in enhanced plating that gives them their name. Even amongst the deathless Necrons, the Immortals are particularly resilient.',
          attributes: {
            strength: 5,
            agility: 4,
            toughness: 6,
            intellect: 3,
            willpower: 4,
            fellowship: 2,
            initiative: 4,
          },
          traits: {
            defence: 3,
            speed: 5,
            wounds: 9,
            shock: 7,
            soak: 6,
            resolve: '-',
            conviction: '-',
            passiveAwareness: 4,
            resilience: {
              total: 12,
              armourRating: 5,
              armourName: 'Heavy Plating'
            },
          },
          skills: {
            ballisticSkill: 9,
            default: 7,
          },
          size: 'Average',
          sizeModifier: 0,
          keywords: [
            'Necron',
            '<Dynasty>',
          ],
          attacks: [
            {
              name: 'Gauss Blaster',
              type: 'ranged-weapon',
              range: 48,
              damage: { static: 12, ed: 1},
              ap: -2,
              salvo: 2,
              traits: [ 'Rapid Fire (2)' ],
            },
            {
              name: 'Tesla Carbine',
              type: 'ranged-weapon',
              range: 48,
              damage: { static: 12, ed: 1},
              ap: 0,
              salvo: 2,
              traits: [ 'Assault', 'Tesla' ],
            },
          ],
          specialAbilities: [
            {
              name: 'Reanimation Protocols',
              effect: 'When this threat is reduced to 0 wounds, except by Annihilation, roll a d6 ' +
              'at the beginning of each following round until combat ends or reanimation occurs. ' +
              'On a die result of 5 or 6, the threat returns to consciousness with 1d6*Tier wounds ' +
              'remaining. ' +
              'For mobs with this ability, instead roll a d6 for each member of the mob that has ' +
              'been lost, and for each result of 5 or 6, restore it to the mob. A mob that is ' +
              'reduced to 0 members does not roll for Reanimation Protocols.' +
              'As a full round action, a character may attack a Necron at 0 wounds, spending enough ' +
              'time to blast its remains apart or chop it to pieces, killing it permanently (or at ' +
              'least for the remainder of the combat). It may still be teleported away from the ' +
              'battlefield by its tomb.',
            },
            {
              name: ' Soulless Machine',
              effect: 'A Necron is immune to fear, pinning, and mind-affecting abilities and powers.' +
              ' A Necron never needs to pass Resolve tests in order to keep fighting. A Necron’s ' +
              'Corruption is permanently locked at 0. Necrons are immune to disease and toxins, and ' +
              'never have to eat, sleep, or breathe. For the purposes of weapons and abilities that ' +
              'affect machines, a Necron is considered a machine.',
            },
            {
              name: '(Ruin) Champion',
              effect: 'This threat may take Ruin Actions.',
            },
            {
              name: '(Ruin) Immortal',
              effect: 'An Immortal may spend a point of Ruin to negate any critical effects it would suffer from a critical hit.',
            },
          ],
        },
        {
          source: {
            book: 'Legacy of the Necrontyr',
            key: 'necroncy',
            version: '',
            page: '',
          },
          key: 'necroncy',
          name: 'Necron Deathmark',
          faction: 'Necrontyr',
          classification: [
            'Adversary',
            'Adversary',
            'Elite',
            'Elite',
            'Elite',
          ],
          description: 'Patience and vigilance are some of the most important qualities for a sniper, and the Deathmarks exemplify them. With no need for sleep, food, or drink, nothing can distract these assassins from their task, hiding in the spaces between dimensions as they watch for their prey to draw near enough for them to attack. So feared are the Deathmarks that ancient laws forbid their use against fellow Necrons, but against mortals there are no such restrictions, and with their unparalleled tracking abilities, they never lose their mark once they have it. ',
          attributes: {
            strength: 5,
            agility: 4,
            toughness: 5,
            intellect: 4,
            willpower: 4,
            fellowship: 2,
            initiative: 4,
          },
          traits: {
            defence: 3,
            speed: 5,
            wounds: 8,
            shock: 7,
            soak: 5,
            resolve: '-',
            conviction: '-',
            passiveAwareness: 5,
            resilience: {
              total: 11,
              armourRating: 5,
              armourName: 'Heavy Plating'
            },
          },
          skills: {
            ballisticSkill: 10,
            awareness: 10,
            default: 7,
          },
          size: 'Average',
          sizeModifier: 0,
          keywords: [
            'Necron',
            '<Dynasty>',
          ],
          attacks: [
            {
              name: 'Synaptic Disintegrator',
              type: 'ranged-weapon',
              range: 48,
              damage: { static: 10, ed: 1},
              ap: 0,
              salvo: 1,
              traits: [ 'Rapid Fire (1)', 'Sniper (2)' ],
            },
          ],
          specialAbilities: [
            {
              name: 'Reanimation Protocols',
              effect: 'When this threat is reduced to 0 wounds, except by Annihilation, roll a d6 ' +
              'at the beginning of each following round until combat ends or reanimation occurs. ' +
              'On a die result of 5 or 6, the threat returns to consciousness with 1d6*Tier wounds ' +
              'remaining. ' +
              'For mobs with this ability, instead roll a d6 for each member of the mob that has ' +
              'been lost, and for each result of 5 or 6, restore it to the mob. A mob that is ' +
              'reduced to 0 members does not roll for Reanimation Protocols.' +
              'As a full round action, a character may attack a Necron at 0 wounds, spending enough ' +
              'time to blast its remains apart or chop it to pieces, killing it permanently (or at ' +
              'least for the remainder of the combat). It may still be teleported away from the ' +
              'battlefield by its tomb.',
            },
            {
              name: ' Soulless Machine',
              effect: 'A Necron is immune to fear, pinning, and mind-affecting abilities and powers.' +
              ' A Necron never needs to pass Resolve tests in order to keep fighting. A Necron’s ' +
              'Corruption is permanently locked at 0. Necrons are immune to disease and toxins, and ' +
              'never have to eat, sleep, or breathe. For the purposes of weapons and abilities that ' +
              'affect machines, a Necron is considered a machine.',
            },
            {
              name: '(Ruin) Hunter’s Mark',
              effect: 'The GM may spend a point of Ruin in order to select a single non-Necron character. All Deathmarks in the current combat gain a +2d bonus to Ballistic Skill tests when targeting that character for the rest of the combat. They may also track the character without a test required.',
            },
            {
              name: '(Wrath) Assassin',
              effect: 'Whenever a Deathmark rolls a 6 on the Wrath die when attacking with its Synaptic Disintegrator, the target suffers a Mortal Wound in addition to any critical effects.',
            },
            {
              name: 'Ethereal Interception',
              effect: 'A Deathmark may hide within an extradimensional space, undetectable but unable to do more than watch outside. When anyone enters the area it has hidden within, it may emerge instantly, making a single attack with its Synaptic Disintegrator. This counts as an Ambush.\n',
            },
          ],
        },
        {
          source: {
            book: 'Legacy of the Necrontyr',
            key: 'necroncy',
            version: '',
            page: '',
          },
          key: 'necroncyFlayedOne',
          name: 'Necron Flayed One',
          faction: 'Necrontyr',
          classification: [
            'Adversary',
            'Adversary',
            'Elite',
            'Elite',
            'Troops',
          ],
          description: 'Infected by the ancient Flayer virus, the Flayed Ones seem to have an unsettling fascination with flesh, perhaps desiring to regain it, perhaps simply playing with it like a toy. Regardless, they have altered themselves for the purpose of obtaining more, with wicked talons designed to strip away everything from the bone, tearing asunder any mortal unfortunate enough to encounter one. They then wear these strips of flesh like clothing, draping them over their frame in a mess of bloody gore.',
          attributes: {
            strength: 5,
            agility: 4,
            toughness: 5,
            intellect: 2,
            willpower: 4,
            fellowship: 1,
            initiative: 5,
          },
          traits: {
            defence: 4,
            speed: 5,
            wounds: 8,
            shock: 7,
            soak: 5,
            resolve: '-',
            conviction: '-',
            passiveAwareness: 5,
            resilience: {
              total: 10,
              armourRating: 4,
              armourName: 'Living Metal'
            },
          },
          skills: {
            weaponSkill: 10,
            default: 7,
          },
          size: 'Average',
          sizeModifier: 0,
          keywords: [
            'Necron',
            '<Dynasty>',
          ],
          attacks: [
            {
              name: 'Flayer Claws',
              type: 'melee-weapon',
              range: 1,
              damage: { static: 10, ed: 1},
              ap: 0,
              traits: [ 'Brutal' ],
            },
          ],
          specialAbilities: [
            {
              name: 'Reanimation Protocols',
              effect: 'When this threat is reduced to 0 wounds, except by Annihilation, roll a d6 ' +
              'at the beginning of each following round until combat ends or reanimation occurs. ' +
              'On a die result of 5 or 6, the threat returns to consciousness with 1d6*Tier wounds ' +
              'remaining. ' +
              'For mobs with this ability, instead roll a d6 for each member of the mob that has ' +
              'been lost, and for each result of 5 or 6, restore it to the mob. A mob that is ' +
              'reduced to 0 members does not roll for Reanimation Protocols.' +
              'As a full round action, a character may attack a Necron at 0 wounds, spending enough ' +
              'time to blast its remains apart or chop it to pieces, killing it permanently (or at ' +
              'least for the remainder of the combat). It may still be teleported away from the ' +
              'battlefield by its tomb.',
            },
            {
              name: ' Soulless Machine',
              effect: 'A Necron is immune to fear, pinning, and mind-affecting abilities and powers.' +
              ' A Necron never needs to pass Resolve tests in order to keep fighting. A Necron’s ' +
              'Corruption is permanently locked at 0. Necrons are immune to disease and toxins, and ' +
              'never have to eat, sleep, or breathe. For the purposes of weapons and abilities that ' +
              'affect machines, a Necron is considered a machine.',
            },
            {
              name: '(Ruin) Flesh Hunger',
              effect: 'If a Flayed One kills its target, the GM may spend a Ruin. If so, the Flayed One begins mutilating the corpse and draping its flesh about itself. If it does this, all those present in the combat that share a keyword with the dead individual suffer a +2DN penalty to Resolve tests so long as the Flayed One is alive.\n',
            },
            {
              name: 'Flesh Render',
              effect: 'A Flayed One may reroll any failed damage dice on its melee attacks. It may ignore up to +2DN worth of penalties when making melee multi-attacks, and gains +2d to its melee attack rolls when attacking mobs.',
            },
            {
              name: 'Hunting Horrors',
              effect: 'Flayed Ones usually hide within a charnel pocket-dimension, emerging into reality when they detect somewhere where new flesh can be harvested. A Flayed One may claw its way into reality into any combat involving Necrons and non-Necrons at the beginning of any Round. This does not count as an ambush.',
            },
          ],
        },
        {
          source: {
            book: 'Legacy of the Necrontyr',
            key: 'necroncy',
            version: '',
            page: '',
          },
          key: 'necroncyNecronTriarchPraetorian',
          name: 'Necron Triarch Praetorian',
          faction: 'Necrontyr',
          classification: [
            'Adversary',
            'Adversary',
            'Adversary',
            'Elite',
            'Elite',
          ],
          description: 'Enforcers of ancient Necrontyr law, a Praetorian’s task is not to fight on the front lines, but to ensure that the codes of the Empire are being upheld in any given combat. They are beholden to none but the Silent King himself, but they may lend their blades should a situation that threatens the Necron Empire arise.',
          attributes: {
            strength: 7,
            agility: 5,
            toughness: 7,
            intellect: 6,
            willpower: 5,
            fellowship: 4,
            initiative: 5,
          },
          traits: {
            defence: 4,
            speed: 10,
            wounds: 12,
            shock: 10,
            soak: 6,
            resolve: '-',
            conviction: '-',
            passiveAwareness: 6,
            resilience: {
              total: 12,
              armourRating: 5,
              armourName: 'Praetorian Plate'
            },
          },
          skills: {
            weaponSkill: 11,
            ballisticSkill: 11,
            scholar: 11,
            default: 10,
          },
          size: 'Average',
          sizeModifier: 0,
          keywords: [
            'Necron',
            '<Dynasty>',
          ],
          attacks: [
            {
              name: 'Rod of Covenant',
              type: 'melee-weapon',
              range: 1,
              damage: { static: 12, ed: 1},
              ap: -3,
              traits: [],
            },
            {
              name: 'Rod of Covenant',
              type: 'ranged-weapon',
              range: 24,
              damage: { static: 12, ed: 1},
              ap: -3,
              salvo: 1,
              traits: [ 'Assault' ],
            },
            {
              name: 'Voidblade',
              type: 'melee-weapon',
              range: 1,
              damage: { static: 12, ed: 1},
              ap: -3,
              traits: [ ],
            },
            {
              name: 'Particle Caster',
              type: 'ranged-weapon',
              range: 24,
              damage: { static: 14, ed: 1},
              ap: 0,
              salvo: 1,
              traits: [ 'Pistol' ],
            },
          ],
          specialAbilities: [
            {
              name: 'Reanimation Protocols',
              effect: 'When this threat is reduced to 0 wounds, except by Annihilation, roll a d6 ' +
              'at the beginning of each following round until combat ends or reanimation occurs. ' +
              'On a die result of 5 or 6, the threat returns to consciousness with 1d6*Tier wounds ' +
              'remaining. ' +
              'For mobs with this ability, instead roll a d6 for each member of the mob that has ' +
              'been lost, and for each result of 5 or 6, restore it to the mob. A mob that is ' +
              'reduced to 0 members does not roll for Reanimation Protocols.' +
              'As a full round action, a character may attack a Necron at 0 wounds, spending enough ' +
              'time to blast its remains apart or chop it to pieces, killing it permanently (or at ' +
              'least for the remainder of the combat). It may still be teleported away from the ' +
              'battlefield by its tomb.',
            },
            {
              name: ' Soulless Machine',
              effect: 'A Necron is immune to fear, pinning, and mind-affecting abilities and powers.' +
              ' A Necron never needs to pass Resolve tests in order to keep fighting. A Necron’s ' +
              'Corruption is permanently locked at 0. Necrons are immune to disease and toxins, and ' +
              'never have to eat, sleep, or breathe. For the purposes of weapons and abilities that ' +
              'affect machines, a Necron is considered a machine.',
            },
            {
              name: '(Ruin) Champion',
              effect: 'This threat may take Ruin Actions.',
            },
            {
              name: '(Ruin) Solemn Judgement',
              effect: 'A Triarch Praetorian may judge whether an enemy’s conduct in the current combat is honorable or dishonorable once per combat, if the GM spends a point of Ruin. If the enemy is honorable, all Necrons in the combat (including the Praetorian) gain a +1d bonus to Weapon Skill tests against that enemy. If the enemy is dishonorable, they instead gain a +1d bonus to Ballistic Skill tests against that enemy.',
            },
          ],
        },
        {
          source: {
            book: 'Legacy of the Necrontyr',
            key: 'necroncy',
            version: '',
            page: '',
          },
          key: 'necroncyNecronDestroyer',
          name: 'Necron Destroyer',
          faction: 'Necrontyr',
          classification: [
            'Adversary',
            'Adversary',
            'Adversary',
            'Elite',
            'Elite',
          ],
          description: 'Corrupted by glitches, viruses, and decay after aeons of slumber, the Destroyers are nihilistic, even by the standards of the hateful Necrons. Seeking nothing less than the end of all things, the Destroyers would gladly annihilate the galaxy if it was within their power. In order to make themselves better weapons of war, the Destroyers mutilate themselves, removing their legs and replacing them with anti-gravity repulsors, amputating limbs and attaching massive weapons to the stumps. A Destroyer serves no lord other than one of his own kind, but they may assist an Overlord whose goals temporarily align with their own.',
          attributes: {
            strength: 5,
            agility: 5,
            toughness: 7,
            intellect: 4,
            willpower: 5,
            fellowship: 1,
            initiative: 5,
          },
          traits: {
            defence: 4,
            speed: 10,
            wounds: 12,
            shock: 7,
            soak: 7,
            resolve: '-',
            conviction: '-',
            passiveAwareness: 4,
            resilience: {
              total: 14,
              armourRating: 5,
              armourName: 'Heavy Plating'
            },
          },
          skills: {
            ballisticSkill: 11,
            default: 8,
          },
          size: 'Average',
          sizeModifier: 0,
          keywords: [
            'Necron',
            '<Dynasty>',
          ],
          attacks: [
            {
              name: 'Gauss Cannon',
              type: 'ranged-weapon',
              range: 48,
              damage: { static: 14, ed: 2},
              ap: -3,
              salvo: 3,
              traits: [ 'Heavy (3)' ],
            },
          ],
          specialAbilities: [
            {
              name: 'Reanimation Protocols',
              effect: 'When this threat is reduced to 0 wounds, except by Annihilation, roll a d6 ' +
              'at the beginning of each following round until combat ends or reanimation occurs. ' +
              'On a die result of 5 or 6, the threat returns to consciousness with 1d6*Tier wounds ' +
              'remaining. ' +
              'For mobs with this ability, instead roll a d6 for each member of the mob that has ' +
              'been lost, and for each result of 5 or 6, restore it to the mob. A mob that is ' +
              'reduced to 0 members does not roll for Reanimation Protocols.' +
              'As a full round action, a character may attack a Necron at 0 wounds, spending enough ' +
              'time to blast its remains apart or chop it to pieces, killing it permanently (or at ' +
              'least for the remainder of the combat). It may still be teleported away from the ' +
              'battlefield by its tomb.',
            },
            {
              name: ' Soulless Machine',
              effect: 'A Necron is immune to fear, pinning, and mind-affecting abilities and powers.' +
              ' A Necron never needs to pass Resolve tests in order to keep fighting. A Necron’s ' +
              'Corruption is permanently locked at 0. Necrons are immune to disease and toxins, and ' +
              'never have to eat, sleep, or breathe. For the purposes of weapons and abilities that ' +
              'affect machines, a Necron is considered a machine.',
            },
            {
              name: 'Hardwired Hatred',
              effect: 'When making attack rolls against anyone without the Necron keyword, a Destroyer may reroll unmodified die results of 1.',
            },
            {
              name: 'Repulsor Platform',
              effect: 'A Destroyer ignores penalties to movement due to difficult terrain, and may fly. It is always considered to be braced for the purposes of firing its weapons.\n',
            },
          ],
        },
        {
          source: {
            book: 'Legacy of the Necrontyr',
            key: 'necroncy',
            version: '',
            page: '',
          },
          key: 'necroncyHeavyNecronDestroyer',
          name: 'Necron Heavy Destroyer',
          faction: 'Necrontyr',
          classification: [
            'Adversary',
            'Adversary',
            'Adversary',
            'Elite',
            'Elite',
          ],
          description: 'Equipped with a much more powerful gauss weapon, these Destroyers are ideal for annihilating vehicles and other hardened targets. Corrupted by glitches, viruses, and decay after aeons of slumber, the Destroyers are nihilistic, even by the standards of the hateful Necrons. Seeking nothing less than the end of all things, the Destroyers would gladly annihilate the galaxy if it was within their power. In order to make themselves better weapons of war, the Destroyers mutilate themselves, removing their legs and replacing them with anti-gravity repulsors, amputating limbs and attaching massive weapons to the stumps. A Destroyer serves no lord other than one of his own kind, but they may assist an Overlord whose goals temporarily align with their own.',
          attributes: {
            strength: 5,
            agility: 5,
            toughness: 7,
            intellect: 4,
            willpower: 5,
            fellowship: 1,
            initiative: 5,
          },
          traits: {
            defence: 4,
            speed: 10,
            wounds: 12,
            shock: 7,
            soak: 7,
            resolve: '-',
            conviction: '-',
            passiveAwareness: 4,
            resilience: {
              total: 14,
              armourRating: 5,
              armourName: 'Heavy Plating'
            },
          },
          skills: {
            ballisticSkill: 11,
            default: 8,
          },
          size: 'Average',
          sizeModifier: 0,
          keywords: [
            'Necron',
            '<Dynasty>',
          ],
          attacks: [
            {
              name: 'Heavy Gauss Cannon',
              type: 'ranged-weapon',
              range: 72,
              damage: { static: 18, ed: 1},
              ap: -4,
              salvo: 1,
              traits: [ 'Heavy' ],
            },
          ],
          specialAbilities: [
            {
              name: 'Reanimation Protocols',
              effect: 'When this threat is reduced to 0 wounds, except by Annihilation, roll a d6 ' +
              'at the beginning of each following round until combat ends or reanimation occurs. ' +
              'On a die result of 5 or 6, the threat returns to consciousness with 1d6*Tier wounds ' +
              'remaining. ' +
              'For mobs with this ability, instead roll a d6 for each member of the mob that has ' +
              'been lost, and for each result of 5 or 6, restore it to the mob. A mob that is ' +
              'reduced to 0 members does not roll for Reanimation Protocols.' +
              'As a full round action, a character may attack a Necron at 0 wounds, spending enough ' +
              'time to blast its remains apart or chop it to pieces, killing it permanently (or at ' +
              'least for the remainder of the combat). It may still be teleported away from the ' +
              'battlefield by its tomb.',
            },
            {
              name: ' Soulless Machine',
              effect: 'A Necron is immune to fear, pinning, and mind-affecting abilities and powers.' +
              ' A Necron never needs to pass Resolve tests in order to keep fighting. A Necron’s ' +
              'Corruption is permanently locked at 0. Necrons are immune to disease and toxins, and ' +
              'never have to eat, sleep, or breathe. For the purposes of weapons and abilities that ' +
              'affect machines, a Necron is considered a machine.',
            },
            {
              name: 'Hardwired Hatred',
              effect: 'When making attack rolls against anyone without the Necron keyword, a Destroyer may reroll unmodified die results of 1.',
            },
            {
              name: 'Repulsor Platform',
              effect: 'A Destroyer ignores penalties to movement due to difficult terrain, and may fly. It is always considered to be braced for the purposes of firing its weapons.\n',
            },
          ],
        },
      ],
    };
  }
}
