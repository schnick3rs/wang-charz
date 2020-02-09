const source = {
  core: { book: 'Core Rules', key: 'core', version: 'v1' },
  coreab: { book: 'Abhumans (Beta)', key: 'coreab', version: 'v0.5' },
  aaoa: { book: 'An Abundance of Apocrypha', key: 'aaoa', version: '', path: '/vault/an-abundance-of-apocrypha' },
  lotn: { book: 'Legacy of the Necrontyr', key: 'lotn', version: '', path: '/vault/legacy-of-the-necrontyr' },
  thaot: { book: 'The High Altar of Technology', key: 'thaot', version: '', path: '/vault/the-high-altar-of-technology' },
  ltgb: { book: 'Let The Galaxy Burn', key: 'ltgb', version: '', path: '/vault/let-the-galaxy-burn' },
  aptb: { book: 'ArdentPurple\'s Tyranid Bestiary', key: 'aptb', version: '', path: '/vault/ardentpurples-tyranid-bestiary' },
  jtb: { book: 'Javelin\'s Tyranid Bestiary', key: 'jtb', version: '', path: '/vault/javelins-tyranid-bestiary' },
  aotgt: { book: 'Agents of the Golden Throne', key: 'aotgt', version: '', path: '/vault/agents-of-the-golden-throne' },
  tea: { book: 'The Emperor\'s Angles', key: 'tea', version: '', path: '/vault/the-emperors-angels' },
  heva: { book: 'Hesperaxs\'s Vault', key: 'heva', version: '', path: '/vault/hesperaxs-vault' },
  goen: { book: 'God Engines', key: 'goen', version: '', path: '/vault/god-engines' },
  tog: { book: 'Tome of Glory', key: 'tog', version: '', path: '/vault/tome-of-glory' },
  pax: { book: 'Pax Imperialis', key: 'pax', version: '', path: '/vault/pax-imperialis' },
  sotah: { book: 'The Deathwatch - Slayer of the Alien Hordes', key: 'sotah', version: '', path: '/vault/the-deathwatch---slayers-of-the-alien-horde' },
  amb: { book: 'Astra Militarum Brew', key: 'amb', version: '', path: '/vault/astra-militarum-brew' },
};

const stringToKebab = function (text) {
  return text.toLowerCase().replace(/\W/gm, '-');
};

const simpleStub = function (id, sourceKey, sourcePage, cost, name, discipline, effect) {
  return {
    source: {
      ...source[sourceKey],
      page: sourcePage,
    },
    id,
    key: `${stringToKebab(`${sourceKey} ${name}`)}`,
    name,
    cost,
    discipline,
    effect,
    stub: true,
  };
};

const simpleCrunch = function (dn, activation, duration, range, multi, effect, potency = '') {
  return {
    crunch_difficulty_number: dn,
    crunch_activation: activation,
    crunch_duration: duration,
    crunch_range: range,
    crunch_multi_target: multi,
    crunch_effect: effect,
    crunch_potency: potency.split(';'),
  };
};

const paxNavigatorPowers = [
  {
    ...simpleStub(101, 'pax', 190, 8, 'A Cloud in the Warp', 'Navigator Powers', 'Mask yourself from observations through powers.'),
    ...simpleCrunch('6', 'Action', 'Sustained', 'Self', false, ''),
    keywords: ['Navigator','Psychic'],
    description:
      '<p>By understanding and perceiving the currents of the warp, the Navigator can hide his ' +
      'presence from those that would use the Immaterium to detect him. ' +
      'Whilst it does not in any way mask his presence in the real universe, ' +
      'it can ably hide him from detection by Psykers and confuse creatures whose essence and ' +
      'existence are linked to the warp, such as Daemons and other warp entities. ' +
      'As the Navigator grows in power, he will become harder to detect, ' +
      'as well as being able to mask others if they stand nearby.</p>' +
      '<p>If successful, the Navigator becomes shrouded in an immaterial cloak, ' +
      'forcing those that use any kind of psychic sight, detection or divination ' +
      'to increase a powers DN by +2 to see him with such powers. ' +
      'This power also has the same effect on the (passive) awareness of all Daemons and warp entities. ' +
      'This power will last as long as the Navigator maintains it, ' +
      'however whilst he does so, he cannot use any other powers (though he may take other actions normally).</p>',
  },
  {
    ...simpleStub(102, 'pax', 191, 10, 'Foreshadowing', 'Navigator Powers', 'Make a Narrative declaration for free within the next round.'),
    ...simpleCrunch('5', 'Action', '1 Round', 'Self', false, '', '[2] Increase the time of the declaration lasting by +1 Round.'),
    keywords: ['Navigator','Psychic'],
    description:
      '<p>By using his warp eye to filter small secrets from the near future, the Navigator can choose ' +
      'to make slight adjustments to his actions to avoid harm and manipulate the course of events. ' +
      'Only if the Navigator tries to dig too deep into the near future for secrets does this power ' +
      'become unpredictable and he may become victim of the warp’s lies.</p>' +
      '<p>If successful, the Navigator can make a Narrative Declaration as if he spent a point of Wrath. ' +
      'However, the Navigator (or his allies) only has the next Round to make use of the declaration, ' +
      'lest it vanishes as a lie of the warp.</p>',
  },
  {
    ...simpleStub(103, 'pax', 191, 10, 'Gaze into the Warp', 'Navigator Powers', 'Probe suspects for taint of the warp.'),
    ...simpleCrunch('Resolve', 'Action', 'Sustained', '30m', true, '', '[1] Increase range by +5m'),
    keywords: ['Navigator','Psychic'],
    description: '<p>This power allows a Navigator to see a creature’s or object’s reflection in the warp and learn things hidden from the real universe. This power is most useful in unmasking both psykers and daemons, but has other applications, such as reading residual psychic taint on objects and tracking powerful psychic entities. With a successful attempt, the Navigator can determine if a creature or object holds the taint of the warp. This will tell the Navigator if the person or object has the psychic presence or is tainted (roughly speaking if they have the Psyker, Chaos, Daemon or similar keywords). Psykers who have made dark pacts with the warp and daemons are more resistant to this power, however. Against these creatures, the DN of the power increases by +2.</p>',
  },
  {
    ...simpleStub(104, 'pax', 191, 8, 'Held in my Gaze', 'Navigator Powers', 'Prevent Movement and Ruin Powers of the subject.'),
    ...simpleCrunch('Resolve','Action','Sustained','5m', false, '', '[2] Increase range by +5m;[3] +1 Mortal Wounds'),
    keywords: ['Navigator','Psychic'],
    description:
      '<p>The unflinching eye of a Navigator locks a creature in place with a gaze that pierces ' +
      'flesh and bone to see the immaterial essence of all things. ' +
      'Most commonly employed against psykers, this ability can be used to render them effectively ' +
      'powerless and prevent them from calling upon their abilities. It is also undeniably ' +
      'effective against creatures with a strong connection to the warp, such as daemons, ' +
      'for which it can have spectacular and devastating consequences.</p>' +
      '<p>The Navigator chooses a target which he has line of sight to and within range. ' +
      'If he is successful, then the target is locked and cannot make a Move. ' +
      'A locked target must beat the Navigator in an opposed Willpower test each time it wishes ' +
      'to use a psychic power or invoke the Ruin abilities. ' +
      'Daemons affected by this power suffer 1 Mortal Wound.</p>',
  },
  {
    ...simpleStub(105, 'pax', 192, 10, 'Inertia', 'Navigator Powers', 'Increase the DN for an targeted Psyker to manifest powers.'),
    ...simpleCrunch('Resolve','Action','Sustained', '30m', false, '', '[1] Increase range by +5m;[3] Increase DN penalty by +1'),
    keywords: ['Navigator','Psychic'],
    description: '<p>The Navigator alters the tides of the Warp, making it difficult for enemy psykers to draw their power from the Immaterium. This power does not require line of sight, but can only be used against characters with the <Psyker> keyword. If they are affected, then the psyker suffers a +1 DN penalty when manifesting their powers.</p>',
  },
  {
    ...simpleStub(106, 'pax', 192, 0, 'The Lidless Stare', 'Navigator Powers', 'Deal a Mortal Wound and cause Terror.'),
    ...simpleCrunch('Resolve','Action','Sustained', '30m', true, '', '[3] Increase the DN penalty of Terror of a single target by +1;[3] One target suffers an additional Mortal Wound'),
    keywords: ['Navigator','Psychic'],
    description: '<p>If a Navigator opens his warp eye fully, anyone gazing into its depths will witness the power and mind breaking unreality of the warp. In an instant, they witness the chaos boiling beneath the skin of existence and for many, it is the last thing they ever see. The navigator chooses a number of targets within range. If the power is successful, the targets suffer a single Mortal Wound and counts as having failed a Terror test against the Navigator</p>',
  },
  {
    ...simpleStub(107, 'pax', 193, 6, 'Temporal Distortion', 'Navigator Powers', 'Allow yourself to make an additional Move.'),
    ...simpleCrunch('4','Action','Instant', 'Self', false, '', '[1] Increase the Speed of the additional Move by +1;[2] Reduce shock gained by -1;[3] Instead of a Move, the Navigator may make an additional Action'),
    keywords: ['Navigator','Psychic'],
    description: '<p>The Navigator can manipulate the tides of the Immaterium to affect time in the temporal universe. The Navigator may only use this power on himself, and if successful, he may make an additional Move. Regardless if this power is successfully manifested or not, the Navigator suffers 2 points of Shock.</p>',
  },
];


const aaoaWaaaghPowers = [
  {
    ...simpleStub(200, 'aaoa', 181, 20, '‘Eadbanger', 'WAAAGH!', 'Bring the closest enemy to zero wounds.'),
    ...simpleCrunch('8', 'Action', 'Instant', '35m', false, ''),
    keywords: ['Ork','Psychic'],
    description:
      '<p>A bolt of raw power erupts from the Weirdboy’s forehead and rockets across the battlefield, ' +
      'causing the head of the first unfortunate victim caught in its path to explode in a shower of brains and gore.</p>' +
      '<p>This power targets the closest enemy, who must pass a Toughness test (DN 3) or reduced to 0 Wounds immediately.</p>',
  },
  {
    ...simpleStub(201, 'aaoa', 181, 15, 'Da Jump', 'WAAAGH!', 'Short Teloport yourself and allied orks.'),
    ...simpleCrunch('7', 'Full Action', 'Instant', '25m', false, ''),
    keywords: ['Ork','Psychic'],
    description:
      '<p>The Weirdboy closes his eyes tight and, in a storm of flashing green light, teleports a mass of confused greenskins to another part of the battlefield. ' +
      'Select a number of allies with the Ork keyword equal to the psyker’s Willpower within range. ' +
      'Those allies vanish, and then reappear moments later anywhere within 500m. ' +
      'They must reappear more than 20m from an enemy, and they forfeit their move action in their following turns.</p>',
  },
  {
    ...simpleStub(202, 'aaoa', 181, 15, 'Da Krunch', 'WAAAGH!', 'Stomp enemies with mortal force and knock them prone.'),
    ...simpleCrunch('8', 'Action', 'Instant', '35m', false, ''),
    keywords: ['Ork','Psychic'],
    description:
      '<p>Green energies erupt form the Weirdboy’s eyes, ears, nose, and mouth, and coalesce into a roiling cloud above the enemy. ' +
      'That cloud then solidifies into the vast green foot of Gork (or Mork) himself, which commences to stamp down upon the foe. ' +
      'This power affects all enemies in a Medium blast within range. ' +
      'Affected enemies take 1d3 Mortal Wounds and are knocked prone.' +
      ' Foes who were already prone become staggered as well. ' +
      'Then, roll a d6: on a roll of a 6, repeat the power’s effects as the foot stamps down again.</p>',
  },
  {
    ...simpleStub(203, 'aaoa', 181, 8, 'Fists of Gork', 'WAAAGH!', 'Boost yourself or an allie with great Strength.'),
    ...simpleCrunch('6', 'Action', '1 Round', '25m', false, ''),
    keywords: ['Ork','Psychic'],
    description:
      '<p>The Weirdboy channels Waaagh energy into his own fists or those of another Ork, providing strength enough to punch through the armour of tanks. ' +
      'This power affects the psyker or one ally with the Ork keyword within range. ' +
      'Until the end of the psyker’s next turn, the affected character’s Strength is increased by +4 and they receive +2d on all melee attacks.</p>',
  },
  {
    ...simpleStub(204, 'aaoa', 182, 10, 'Roar of Mork', 'WAAAGH!', 'Enemies within range reduce their resolve by 2.'),
    ...simpleCrunch('8', 'Full Action', 'Sustained', '35m', false, ''),
    keywords: ['Ork','Telepathy','Psychic'],
    description:
      '<p>The Weirdboy opens his gob impossibly wide and gives vent to a bellowing roar that reverberates through his enemies’ minds. ' +
      'Coherent thought becomes nigh-impossible, and as the roar thunders on, panic begins to spread. ' +
      'While this power remains in effect, all enemies within range reduce their Resolve by 2.</p>',
  },
  {
    ...simpleStub(205, 'aaoa', 182, 10, 'Warpath', 'WAAAGH!', 'Allies within range increase strength and make more multi-actions or attacks.'),
    ...simpleCrunch('7', 'Action', 'Instant', '35m', false, ''),
    keywords: ['Ork','Psychic'],
    description:
      '<p>The Weirdboy disperses the Waaagh energy coursing through his frame into the Ork warriors around him, ' +
      'stoking their already bellicose nature into a roaring fever pitch. Select a number of allies with the Ork keyword within range. ' +
      'The affected allies add +2d to all melee attacks they attempt until the start of the psyker’s next turn, ' +
      'and they may ignore up to 2 points of DN increase for taking the Multi-Attack or Multi-Action options.</p>',
  },
];

const psychicPowersRepository = [
  ...paxNavigatorPowers,
  ...aaoaWaaaghPowers,
];

module.exports = psychicPowersRepository;
