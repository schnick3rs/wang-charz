const textToSlug = function(text) {
  return text.toLowerCase().replace(/\W/gm, '-');
};

const slugToKebab = function(slug) {
  return slug.replace(/-([a-z0-9])/g, function (g) { return g[1].toUpperCase(); });
};

const textSlugKebab = function(text) {
   const slug = textToSlug(text);
  return slugToKebab(slug);
};

const source = {
  core: { book: 'Core Rules', key: 'core', version: 'v1' },
  aaoa: { book: 'An Abundance of Apocrypha', key: 'aaoa', version: '', path: '/vault/an-abundance-of-apocrypha' },
  lotn: { book: 'Legacy of the Necrontyr', key: 'lotn', version: '', path: '/vault/legacy-of-the-necrontyr' },
  thaot: { book: 'The High Altar of Technology', key: 'thaot', version: '', path: '/vault/the-high-altar-of-technology' },
  ltgb: { book: 'Let The Galaxy Burn', key: 'ltgb', version: '', path: '/vault/let-the-galaxy-burn' },
  aptb: { book: 'ArdentPurple\'s Tyranid Bestiary', key: 'aptb', version: '', path: '/vault/ardentpurples-tyranid-bestiary' },
  jtb: { book: 'Javelin\'s Tyranid Bestiary', key: 'jtb', version: '', path: '/vault/javelins-tyranid-bestiary' },
  aotgt: { book: 'Agents of the Golden Throne', key: 'aotgt', version: '', path: '/vault/agents-of-the-golden-throne' },
  tea: { book: 'The Emperor\'s Angles', key: 'tea', version: '', path: '/vault/the-emperors-angels' },
  heva: { book: 'Hesperaxs\'s Vault', key: 'heva', version: '', path: '/vault/hesperaxs-vault' },
};

const simpleStub = function(sourceKey, sourcePage, species, group, name, bp, tier) {
  return {
    source: {
      ...source[sourceKey],
      page: sourcePage,
    },
    key: `${textSlugKebab(sourceKey+' '+name)}`,
    name: name,
    cost: bp,
    tier: tier,
    group: group,
    species: [ species ],
  };
};

const dodScumPsyker = [
  {
    name: "Scum Psyker",
    cost: 50,
    tier: 2,
    source: {
      book: 'Doctors of Doom Compendium',
      key: 'dodc',
      version: '',
      path: ''
    },
    species: ["Human","Ogryn","Ratling"],
    influence: 0,
    keywords: "Imperium,Scum,Psyker",
    abilities: [
      { name: 'Psyker', effect: 'A Scum Psyker begins play with one minor psychic ' +
        'power and the smite psychic power. They may purchase additional Minor Psychic ' +
        'Powers and Universal Psychic powers, subject to Tier restrictions.' }
    ],
    keywordOption: null,
    prerequisites: [
      { group: 'attributes', value: 'willpower', threshold: 4, },
      { group: 'skills', value: 'psychicMastery', threshold: 1, },
      { group: 'skills', value: 'cunning', threshold: 1, },
    ],
    group: "Scum",
    key: "dodcScumPsyker",
    description: null,
    hint: "Able to focus the warp through their mind, they are blessed or cursed with psychic powers."
  },
];

const aotgtRep = [
  simpleStub('aotgt', '', 'Human', 'Agents of the Imperium', 'Callidus Assassin', 70, 4),
  simpleStub('aotgt', '', 'Human', 'Agents of the Imperium', 'Culexus Assassin', 75, 4),
  simpleStub('aotgt', '', 'Human', 'Agents of the Imperium', 'Vindicare Assassin', 80, 4),
  simpleStub('aotgt', '', 'Adeptus Astartes', 'Agents of the Imperium', 'Grey Knight', 90, 4),
];

const aaoaRep = [
  simpleStub('aaoa', 22, 'Human', 'Adeptus Ministorum', 'Frateris Militia', 0, 1),
  simpleStub('aaoa', 22, 'Human', 'Adeptus Ministorum', 'Confessor', 40, 3),
  simpleStub('aaoa', 23, 'Human', 'Adepta Sororitas', 'Sister Dialogous', 0, 1),
  simpleStub('aaoa', 23, 'Human', 'Adepta Sororitas', 'Sister Famulous', 10, 1),
  simpleStub('aaoa', 24, 'Human', 'Adepta Sororitas', 'Sister Seraphim', 55, 3),
  simpleStub('aaoa', 24, 'Human', 'Adepta Sororitas', 'Sister Repentia', 40, 2),
  simpleStub('aaoa', 25, 'Human', 'Astra Militarum', 'Imperial Guard Medic', 0, 1),
  simpleStub('aaoa', 25, 'Human', 'Astra Militarum', 'Imperial Guard Officer', 15, 1),
  simpleStub('aaoa', 26, 'Adeptus Astartes', 'Adeptus Astartes', 'Assault Space Marine', 60, 3),
  simpleStub('aaoa', 26, 'Adeptus Astartes', 'Adeptus Astartes', 'Devastator Space Marine', 60, 3),
  simpleStub('aaoa', 27, 'Adeptus Astartes', 'Adeptus Astartes', 'Grey Knight', 70, 3),
  simpleStub('aaoa', 27, 'Primaris Astartes', 'Adeptus Astartes', 'Primaris Marine Hellblaster', 70, 4),
  simpleStub('aaoa', 28, 'Primaris Astartes', 'Adeptus Astartes', 'Primaris Marine Inceptor', 80, 4),
  simpleStub('aaoa', 28, 'Primaris Astartes', 'Adeptus Astartes', 'Primaris Marine Reiver', 50, 4),
  simpleStub('aaoa', 29, 'Primaris Astartes', 'Adeptus Astartes', 'Primaris Marine Aggressor', 80, 4),
  simpleStub('aaoa', 29, 'Adeptus Astartes', 'Adeptus Astartes', 'Librarian', 90, 4),
  simpleStub('aaoa', 30, 'Adeptus Astartes', 'Adeptus Astartes', 'Apothecary', 60, 3),
  simpleStub('aaoa', 30, 'Adeptus Astartes', 'Adeptus Astartes', 'Techmarine', 60, 3),
  simpleStub('aaoa', 31, 'Adeptus Astartes', 'Adeptus Astartes', 'Chaplain', 60, 4),
  simpleStub('aaoa', 32, 'Human', 'Agents of the Imperium', 'Astropath', 60, 2),
  simpleStub('aaoa', 33, 'Human', 'Agents of the Imperium', 'Sister of Silence', 40, 3),
  simpleStub('aaoa', 33, 'Human', 'Agents of the Imperium', 'Arbitrator', 30, 3),
  simpleStub('aaoa', 34, 'Human', 'Agents of the Imperium', 'Eversor Assassin', 150, 5),
  simpleStub('aaoa', 34, 'Human', 'Agents of the Imperium', 'Callidus Assassin', 150, 5),
  simpleStub('aaoa', 35, 'Pariah', 'Agents of the Imperium', 'Culexus Assassin', 150, 5),
  simpleStub('aaoa', 35, 'Human', 'Agents of the Imperium', 'Vindicare Assassin', 150, 5),
  simpleStub('aaoa', 37, 'Human', 'Adeptus Mechanicus', 'Corpuscarii Electro-Priest', 40, 2),
  simpleStub('aaoa', 37, 'Human', 'Adeptus Mechanicus', 'Fulgurite Electro-Priest', 40, 2),
  simpleStub('aaoa', 38, 'Human', 'Adeptus Mechanicus', 'Skitarius Vanguard', 50, 2),
  simpleStub('aaoa', 38, 'Human', 'Adeptus Mechanicus', 'Sicarian Infiltrator', 60, 3),
  simpleStub('aaoa', 39, 'Human', 'Adeptus Mechanicus', 'Sicarian Ruststalker', 50, 3),
  simpleStub('aaoa', 39, 'Human', 'Adeptus Mechanicus', 'Lexmechanic', 30, 2),
  simpleStub('aaoa', 40, 'Human', 'Adeptus Mechanicus', 'Transmechanic', 30, 2),
  simpleStub('aaoa', 40, 'Human', 'Adeptus Mechanicus', 'Magos', 80, 4),
  simpleStub('aaoa', 41, 'Human', 'Adeptus Mechanicus', 'Genetor', 80, 4),
  simpleStub('aaoa', 41, 'Human', 'Adeptus Mechanicus', 'Logis', 80, 4),
  simpleStub('aaoa', 42, 'Human', 'Renegades', 'Chaos Space Marine', 50, 3),
  simpleStub('aaoa', 42, 'Human', 'Renegades', 'Chaos Space Marine Raptor', 60, 3),
  simpleStub('aaoa', 43, 'Adeptus Astartes', 'Renegades', 'Chaos Space Marine Havoc', 60, 3),
  simpleStub('aaoa', 43, 'Adeptus Astartes', 'Renegades', 'Khorne Berzerker', 80, 3),
  simpleStub('aaoa', 44, 'Adeptus Astartes', 'Renegades', 'Nurgle Plague Marine', 70, 3),
  simpleStub('aaoa', 44, 'Adeptus Astartes', 'Renegades', 'Slaanesh Noise Marine', 60, 3),
  simpleStub('aaoa', 45, 'Adeptus Astartes', 'Renegades', 'Sorcerer', 90, 4),
  simpleStub('aaoa', 45, 'Adeptus Astartes', 'Renegades', 'Warpsmith', 60, 3),
  simpleStub('aaoa', 46, 'Adeptus Astartes', 'Renegades', 'Dark Apostle', 60, 4),
  simpleStub('aaoa', 46, 'Beastman', 'Renegades', 'Khorngor', 20, 1),
  simpleStub('aaoa', 47, 'Beastman', 'Renegades', 'Pestigor', 20, 1),
  simpleStub('aaoa', 47, 'Beastman', 'Renegades', 'Slaangor', 20, 1),
  simpleStub('aaoa', 48, 'Beastman', 'Renegades', 'Tzaangor', 20, 1),
  simpleStub('aaoa', 49, 'Eldar', 'Aeldari', 'Guardian', 0, 1),
  simpleStub('aaoa', 49, 'Eldar', 'Aeldari', 'Dire Avenger', 50, 3),
  simpleStub('aaoa', 50, 'Eldar', 'Aeldari', 'Dark Reaper', 70, 3),
  simpleStub('aaoa', 50, 'Eldar', 'Aeldari', 'Fire Dragon', 60, 3),
  simpleStub('aaoa', 51, 'Eldar', 'Aeldari', 'Howling Banshee', 60, 3),
  simpleStub('aaoa', 51, 'Eldar', 'Aeldari', 'Shining Spear', 90, 3),
  simpleStub('aaoa', 52, 'Eldar', 'Aeldari', 'Striking Scorpion', 60, 3),
  simpleStub('aaoa', 52, 'Eldar', 'Aeldari', 'Swooping Hawk', 60, 3),
  simpleStub('aaoa', 53, 'Eldar', 'Aeldari', 'Warp Spider', 80, 3),
  simpleStub('aaoa', 53, 'Eldar', 'Aeldari', 'Bonesinger', 50, 2),
  simpleStub('aaoa', 54, 'Eldar', 'Aeldari', 'Kabalite Warrior', 0, 1),
  simpleStub('aaoa', 54, 'Eldar', 'Aeldari', 'Wych', 15, 1),
  simpleStub('aaoa', 55, 'Eldar', 'Aeldari', 'Harlequin Player', 100, 4),
  simpleStub('aaoa', 55, 'Eldar', 'Aeldari', 'Harlequin Troupe Master', 150, 5),
  simpleStub('aaoa', 56, 'Eldar', 'Aeldari', 'Harlequin Shadowseer', 150, 5),
  simpleStub('aaoa', 56, 'Eldar', 'Aeldari', 'Harlequin Death Jester', 150, 5),
  simpleStub('aaoa', 57, 'Eldar', 'Aeldari', 'Harlequin Solitaire', 150, 5),
  simpleStub('aaoa', 58, 'Ork', 'Orks', 'Mekboy', 30, 2),
  simpleStub('aaoa', 58, 'Ork', 'Orks', 'Painboy', 30, 2),
  simpleStub('aaoa', 59, 'Ork', 'Orks', 'Burna Boy', 30, 2),
  simpleStub('aaoa', 59, 'Ork', 'Orks', 'Flash Git', 60, 3),
  simpleStub('aaoa', 60, 'Ork', 'Orks', 'Tankbusta', 30, 2),
  simpleStub('aaoa', 60, 'Ork', 'Orks', 'Runtherd', 30, 2),
  simpleStub('aaoa', 61, 'Ork', 'Orks', 'Weirdboy', 60, 3),
  simpleStub('aaoa', 63, 'Squat', 'Squats', 'War-Pledged Warrior', 0, 1),
  simpleStub('aaoa', 63, 'Squat', 'Squats', 'Guild Engineer', 60, 3),
  simpleStub('aaoa', 64, 'Squat', 'Squats', 'Hearthguard', 60, 3),
  simpleStub('aaoa', 64, 'Squat', 'Squats', 'Ancestor Lord', 100, 4),
];

const ltgbRep = [
  simpleStub('ltgb', '9', 'Human', 'Renegades', 'Apostate', 0, 1),
  simpleStub('ltgb', '10', 'Human', 'Renegades', 'Cultist', 0, 1),
  simpleStub('ltgb', '11', 'Human', 'Renegades', 'Renegade', 0, 1),
  simpleStub('ltgb', '11', 'Human', 'Renegades', 'Heretek', 60, 2),
  simpleStub('ltgb', '12', 'Human', 'Renegades', 'Rogue Psyker', 50, 2),
  simpleStub('ltgb', '12', 'Human', 'Renegades', 'Rogue Psyker', 50, 2),
  simpleStub('ltgb', '13', 'Human', 'Renegades', 'Pirate', 40, 2),
  simpleStub('ltgb', '13', 'Adeptus Astartes', 'Renegades', 'Legionnaire', 50, 3),
  simpleStub('ltgb', '14', 'Adeptus Astartes', 'Renegades', 'Havoc', 60, 3),
  simpleStub('ltgb', '15', 'Adeptus Astartes', 'Renegades', 'Raptor', 55, 3),
  simpleStub('ltgb', '15', 'Adeptus Astartes', 'Renegades', 'Warpsmith', 85, 3),
  simpleStub('ltgb', '16', 'Adeptus Astartes', 'Renegades', 'Sorcerer', 80, 3),
  simpleStub('ltgb', '17', 'Adeptus Astartes', 'Renegades', 'Noise Marine', 55, 3),
  simpleStub('ltgb', '17', 'Adeptus Astartes', 'Renegades', 'Plague Marine', 60, 3),
  simpleStub('ltgb', '18', 'Adeptus Astartes', 'Renegades', 'Khorne Berzerker', 60, 3),
  simpleStub('ltgb', '19', 'Adeptus Astartes', 'Renegades', 'Dark Apostle', 80, 4),
];

const teaRep = [
  simpleStub('tea', 22, 'Adeptus Astartes', 'Adeptus Astartes', 'Devastator Space Marine', 60, 3),
  simpleStub('tea', 23, 'Adeptus Astartes', 'Adeptus Astartes', 'Assault Space Marine', 55, 3),
  simpleStub('tea', 23, 'Adeptus Astartes', 'Adeptus Astartes', 'Tactical Marine', 50, 3),
  simpleStub('tea', 24, 'Adeptus Astartes', 'Adeptus Astartes', 'Techmarine', 85, 3),
  simpleStub('tea', 25, 'Adeptus Astartes', 'Adeptus Astartes', 'Apothecary', 70, 3),
  simpleStub('tea', 25, 'Adeptus Astartes', 'Adeptus Astartes', 'Librarian', 80, 3),
  simpleStub('tea', 26, 'Adeptus Astartes', 'Adeptus Astartes', 'Chaplain', 85, 4),
  simpleStub('tea', 27, 'Primaris Astartes', 'Adeptus Astartes', 'Primaris Intercessor', 60, 4),
  simpleStub('tea', 27, 'Primaris Astartes', 'Adeptus Astartes', 'Primaris Hellblaster', 75, 4),
  simpleStub('tea', 28, 'Primaris Astartes', 'Adeptus Astartes', 'Primaris Reiver', 60, 4),
  simpleStub('tea', 28, 'Primaris Astartes', 'Adeptus Astartes', 'Primaris Inceptor', 80, 4),
  simpleStub('tea', 29, 'Primaris Astartes', 'Adeptus Astartes', 'Primaris Aggressor', 80, 4),
  simpleStub('tea', 29, 'Primaris Astartes', 'Adeptus Astartes', 'Primaris Apothecary', 80, 4),
  simpleStub('tea', 30, 'Primaris Astartes', 'Adeptus Astartes', 'Primaris Librarian', 90, 4),
  simpleStub('tea', 31, 'Primaris Astartes', 'Adeptus Astartes', 'Primaris Chaplain', 95, 5),
];

const hevaRep = [
  simpleStub('heva', 9, 'Dark Eldar', 'Aeldari', 'Kabalite', 0, 1),
  simpleStub('heva', 10, 'Dark Eldar', 'Aeldari', 'Wych', 30, 2),
  simpleStub('heva', 11, 'Dark Eldar', 'Aeldari', 'Scourge', 60, 3),
  simpleStub('heva', 12, 'Dark Eldar', 'Aeldari', 'Incubus', 70, 4),
];

const archetypeRepository = [
  ...dodScumPsyker,
  ...aaoaRep,
  ...ltgbRep,
  ...aotgtRep,
  ...teaRep,
  ...hevaRep,
];

module.exports = archetypeRepository;

