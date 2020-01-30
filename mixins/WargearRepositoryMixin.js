export default {
  data() {
    return {
      archetypeWargearRepository: [
        // Imperium
        {
          name: 'Ministorum Priest',
          options: [
            { name: 'Laspistol' },
            { name: 'Rosarius' },
            { name: 'Knife' },
            { name: 'Clothing', variant: 'Ministorum robes' },
            { name: 'Missionary Kit' },
          ],
        },
        {
          name: 'Crusader',
          options: [
            { name: 'Power Sword' },
            { name: 'Storm Shield' },
            { name: 'Carapace Armour' },
            { name: 'Clothing', variant: 'Ministorum robes' },
          ],
        },
        {
          name: 'Death Cult Assassin',
          options: [
            { name: 'Bodyglove' },
            { name: 'Death Cult Powerblade' },
            { name: 'Death Cult Powerblade' },
            { name: 'Knife' },
            { name: 'Laspistol' },
            { name: 'Doses of stimm', amount: 3 },
          ],
        },
        {
          name: 'Sister of Battle',
          options: [
            { name: 'Sororitas Powered Armour' },
            { name: 'Chaplet Ecclesiasticus' },
            {
              name: 'Either a boltgun OR a chainsword and bolt pistol.',
              selected: 'Boltgun',
              options: [
                { name: 'Boltgun' },
                { name: 'Chain Sword and Bolt Pistol' },
              ],
            },
            { name: 'Clothing', variant: 'Sororitas vestments' },
            { name: 'Writing Kit' },
            { name: 'Copy of the Rule of the Sororitas' },
          ],
        },
        {
          name: 'Sister Hospitaller',
          options: [
            { name: 'Sororitas Powered Armour' },
            { name: 'Chirurgeon\'s Tools' },
            { name: 'Laspistol' },
            { name: 'Clothing', variant: 'Sororitas vestments' },
            { name: 'Copy of the Rule of the Sororitas' },
          ],
        },
        {
          name: 'Commissar',
          options: [
            { name: 'Flak Coat' },
            { name: 'Bolt pistol' },
            { name: 'Chain Sword' },
            { name: 'Guard issue mess kit' },
            { name: 'Blanket' },
            { name: 'Grooming kit' },
            { name: 'Uplifting Primer' },
            { name: 'Ration Packs', amount: 3 },
          ],
        },
        {
          name: 'Imperial Guardsman',
          options: [
            { name: 'Flak Armour' },
            { name: 'Lasgun' },
            { name: 'Knife' },
            { name: 'Guard issue mess kit' },
            { name: 'Blanket' },
            { name: 'Grooming kit' },
            { name: 'Uplifting Primer' },
            { name: 'Ration Packs', amount: 3 },
          ],
        },
        {
          name: 'Tempestus Scion',
          options: [
            { name: 'Carapace Armour' },
            { name: 'Hot-Shot Lasgun' },
            { name: 'Grav-chute' },
            { name: 'Knife' },
            { name: 'Guard issue mess kit' },
            { name: 'Blanket' },
            { name: 'Grooming kit' },
            { name: 'Uplifting Primer' },
            { name: 'Ration Packs', amount: 3 },
          ],
        },
        {
          name: 'Inquisitorial Acolyte',
          options: [
            { name: 'Flak Armour' },
            {
              name: 'Range weapon of value 5 or less of up to Uncommon rarity (must have the Imperium keyword',
              selected: undefined,
              options: [
                {
                  query: (item) => {
                    const valueReq = item.value <= 5;
                    const rarityReq = ['Uncommon'].includes(item.rarity);
                    const keywordReq = (item.keywords) ? item.keywords.split(',').includes('Imperium') : false;
                    const typeReq = item.type === 'Ranged Weapon';
                    return (valueReq && rarityReq && keywordReq && typeReq);
                  },
                },
              ],
            },
            { name: 'Knife' },
          ],
        },
        {
          name: 'Inquisitorial Adept',
          options: [
            { name: 'Flak Armour' },
            { name: 'Laspistol' },
            { name: 'Knife' },
            { name: 'Auto quill' },
            { name: 'Data-slate' },
            { name: 'Ancient Records', amount: 3 },
          ],
        },
        {
          name: 'Inquisitor',
          options: [
            {
              name: 'Choice of Flak Coat, Ignatus Power Armour or Light Power Armour',
              selected: undefined,
              options: [
                { name: 'Flak Coat' },
                { name: 'Ignatus Power Armour' },
                { name: 'Light Power Armour' },
              ],
            },
            {
              name: 'Ranged weapon up to availability 7 and rarity Very Rare.',
              selected: undefined,
              options: [
                {
                  query: (item) => (
                    item.value <= 7
                    && ['Uncommon', 'Common', 'Rare', 'Very Rare'].includes(item.rarity)
                    && item.type.includes('Ranged Weapon')
                  ),
                },
              ],
            },
            {
              name: 'Melee weapon up to availability 7 and rarity Very Rare.',
              selected: undefined,
              options: [
                {
                  query: (item) => (
                    item.value <= 7
                    && ['Uncommon', 'Common', 'Rare', 'Very Rare'].includes(item.rarity)
                    && item.type.includes('Melee Weapon')
                  ),
                },
              ],
            },
            { name: 'Symbol of authority' },
          ],
        },
        {
          name: 'Rogue Trader',
          options: [
            {
              name: 'Choice of Flak Coat, carapace armour or Light Power Armour',
              selected: undefined,
              options: [
                { name: 'Flak Coat' },
                { name: 'Carapace Armour' },
                { name: 'Light Power Armour' },
              ],
            },
            {
              name: 'Ranged weapon up to value Tier+4 and rarity Rare.',
              selected: undefined,
              options: [
                {
                  query: (item) => (
                    item.value <= (this.settingTier + 4)
                    && ['Uncommon', 'Common', 'Rare'].includes(item.rarity)
                    && item.type.includes('Ranged Weapon')
                  ),
                },
              ],
            },
            {
              name: 'Melee weapon up to value Tier+4 and rarity Rare.',
              selected: undefined,
              options: [
                {
                  query: (item) => (
                    item.value <= this.settingTier + 4
                    && ['Uncommon', 'Common', 'Rare'].includes(item.rarity)
                    && item.type.includes('Melee Weapon')
                  ),
                },
              ],
            },
            { name: 'Imperial Frigate' },
          ],
        },
        {
          name: 'Sanctioned Psyker',
          options: [
            { name: 'Laspistol' },
            { name: 'Force rod' },
            { name: 'Psykana Mercy Blade' },
            { name: 'Guard issue mess kit' },
            { name: 'Blanket' },
            { name: 'Grooming kit' },
            { name: 'Ration Packs', amount: 2 },
          ],
        },
        {
          name: 'Rogue Psyker',
          options: [
            { name: 'Laspistol' },
            { name: 'Psychic Focus' },
            { name: 'Tattered blanket' },
            { name: 'Guard issue mess kit' },
          ],
        },
        {
          name: 'Space Marine Scout',
          options: [
            { name: 'Scout Armour' },
            {
              name: 'Either a boltgun OR a bolt pistol.',
              selected: 'Boltgun',
              options: [
                { name: 'Boltgun' },
                { name: 'Bolt Pistol' },
              ],
            },
            { name: 'Astartes Combat Knife' },
            { name: 'Frag Grenades', amount: 3 },
            { name: 'Krak Grenades', amount: 3 },
          ],
        },
        {
          name: 'Tactical Space Marine',
          options: [
            { name: 'Aquila Mk VII' },
            { name: 'Boltgun' },
            { name: 'Bolt Pistol' },
            { name: 'Astartes Combat Knife' },
            { name: 'Frag Grenades', amount: 3 },
            { name: 'Krak Grenades', amount: 3 },
          ],
        },
        {
          name: 'Primaris Intercessor',
          options: [
            { name: 'Mark X Tacticus Power Armour' },
            {
              name: 'Either a bolt rifle OR a heavy bolt pistol.',
              selected: 'Bolt Rifle',
              options: [
                { name: 'Bolt Rifle' },
                { name: 'Heavy Bolt pistol' },
              ],
            },
            { name: 'Astartes Combat Knife' },
            { name: 'Frag Grenades', amount: 3 },
            { name: 'Krak Grenades', amount: 3 },
          ],
        },
        {
          name: 'Tech-Priest',
          options: [
            { name: 'Light Power Armour' },
            { name: 'Ommnissian Axe' },
            { name: 'Laspistol' },
            { name: 'Mechandrites (Servo-Arm)' },
            {
              name: 'One augmentic of your choice.',
              selected: undefined,
              options: [
                { query: (item) => (item.subtype === 'Augmentic') },
              ],
            },
            {
              name: 'One augmentic of your choice.',
              selected: undefined,
              options: [
                { query: (item) => (item.subtype === 'Augmentic') },
              ],
            },
          ],
        },
        {
          name: 'Skitarius',
          options: [
            { name: 'Skatarii Auto-Cuirass' },
            { name: 'Galvanic Rifle' },
          ],
        },
        {
          name: 'Ganger',
          options: [
            {
              name: 'Choice of Laspistol, Autopistol, Hand Cannon or Stub Gun.',
              selected: 'Laspistol',
              options: [
                { name: 'Laspistol' },
                { name: 'Autpistol' },
                { name: 'Hand Cannon' },
                { name: 'Stub Gun' },
              ],
            },
            {
              name: 'Choice of Knife or Sword.',
              selected: 'Knife',
              options: [
                { name: 'Knife' },
                { name: 'Sword' },
              ],
            },
            { name: 'Bedroll' },
            { name: 'Canteen' },
            { name: 'Clothing', variant: 'Gang Colours' },
          ],
        },
        {
          name: 'Scavvy',
          options: [
            {
              name: 'Choice of Laspistol or Autopistol.',
              selected: 'Laspistol',
              options: [
                { name: 'Laspistol' },
                { name: 'Autpistol' },
              ],
            },
            { name: 'Knife' },
            { name: 'Bedroll' },
            { name: 'Canteen' },
            { name: 'Clothing', variant: 'Tattered' },
          ],
        },
        {
          name: 'Desperado',
          options: [
            {
              name: 'Choce of boltgun OR a chainsword and bolt pistol.',
              selected: 'Boltgun',
              options: [
                { name: 'Boltgun' },
                { name: 'Chain Sword and Bolt Pistol' },
              ],
            },
            { name: 'Flak Coat' },
            { name: 'Prysense Googles' },
            { name: 'Various Maps' },
            { name: 'Combi Tool' },
          ],
        },
        // Renegade
        {
          name: 'Cultist',
          options: [
            {
              name: 'Choce of lasgun OR autogun.',
              selected: 'Lasgun',
              options: [
                { name: 'Lasgun' },
                { name: 'Autogun' },
              ],
            },
            { name: 'Knife' },
            { name: 'Symbol of Authority', variant: 'Unholy icon' },
            { name: 'Guard issue mess kit' },
            { name: 'blanket', variant: 'tattered' },
          ],
        },
        {
          name: 'Heretek',
          options: [
            { name: 'Laspistol' },
            { name: 'Mechandrites (Servo-Arm)' },
            {
              name: 'One augmentic of your choice.',
              selected: undefined,
              options: [
                { query: (item) => (item.type === 'Cybernetic') },
              ],
            },
            {
              name: 'One augmentic of your choice.',
              selected: undefined,
              options: [
                { query: (item) => (item.type === 'Cybernetic') },
              ],
            },
          ],
        },
        {
          name: 'Chaos Space Marine',
          options: [
            { name: 'Aquila Mk VII' },
            { name: 'Boltgun' },
            { name: 'Bolt Pistol' },
            { name: 'Astartes Combat Knife' },
            { name: 'Frag Grenades', amount: 3 },
            { name: 'Krak Grenades', amount: 3 },
          ],
        },
        // Aeldari
        {
          name: 'Corsair',
          options: [
            { name: 'Corsair Armour' },
            { name: 'Shuriken Pistol' },
            { name: 'Lasblaster' },
            { name: 'Spirit Stone' },
            { name: 'Plasma Grenades', amount: 3 },
            { name: 'Void Suite' },
          ],
        },
        {
          name: 'Ranger',
          options: [
            { name: 'Chameleoline Cloak' },
            { name: 'Eldar Mesh Armour' },
            { name: 'Ranger Long Rifle' },
            { name: 'Shuriken Pistol' },
            { name: 'Spirit Stone' },
            { name: 'Knife' },
            { name: 'Bedroll' },
            { name: 'Blanket' },
          ],
        },
        {
          name: 'Warlock',
          options: [
            { name: 'Rune Armour' },
            { name: 'Shuriken Pistol' },
            { name: 'Witchblade' },
            { name: 'A set of Wraithbone Runes' },
            { name: 'Spirit Stone' },
          ],
        },
        // Ork
        {
          name: 'Boy',
          options: [
            { name: 'Shoota' },
            { name: 'Slugga' },
            { name: 'Choppa' },
          ],
        },
        {
          name: 'Kommando',
          options: [
            { name: 'Shoota' },
            { name: 'Slugga' },
            { name: 'Choppa' },
            { name: 'Stikkbombs' },
          ],
        },
        {
          name: 'Nob',
          options: [
            { name: '\'Eavy Armour' },
            { name: 'Kustom Slugga' },
            { name: 'Kustom Choppa' },
          ],
        },
      ],
    };
  },
};
