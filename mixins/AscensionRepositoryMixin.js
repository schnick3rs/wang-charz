export default {
  data() {
    return {
      ascensionRepository: [
        {
          key: 'stayTheCourse',
          name: 'Stay The Course',
          teaser: 'Overcome struggles, build alliances, acquire equipment.',
          cost: 10,
          minimumCampaignTier: 2,
          attributePrerequisites: [],
          skillPrerequisites: ['required +1'],
          prerequisites: (archetypePrerequisites) => {
            const prerequisites = [];

            const skillPrerequisites = archetypePrerequisites.filter( i => i.group === 'skills' );

            if ( skillPrerequisites ) {
              skillPrerequisites.forEach( skillPrerequisite => {
                prerequisites.push({
                  group: skillPrerequisite.group,
                  value: skillPrerequisite.value,
                  threshold: skillPrerequisite.threshold+1,
                });
              });
            }
            return prerequisites;
          },
          keywords: ['<Any>'],
          influencePerTier: 1,
          storyElementText: 'The character gains their choice of either 3 Corruption points or a Memorable Injury (see page 233) of their choice and the +1D Bonus to Intimidation that comes with it from the Table 4-4: Memorable Injury.',
          storyElementOptions: [
            {
              key: 'corruption',
              text: '3 Corruption Points',
              modifications: [
                {
                  targetGroup: 'traits',
                  targetValue: 'corruption',
                  modifier: 3
                },
              ],
            },
            {
              key: 'memorableInjury',
              text: 'Memorable Injury',
              modifications: [
                {
                  targetGroup: 'abilities',
                  targetValue: '',
                  effect: '+1 dice to Intimidation Tests.'
                },
              ],
            },
          ],
          storyElementChoice: '',
          wargearText: 'Select either two items of Rare Wargear or one item of Very Rare Wargear with a value equal or lesser than 3 + the new Tier. This may include cybernetics.',
          wargearChoice: undefined,
          wargearOptions: [
            {
              key: 'twoRareItems',
              text: 'two items of Rare Wargear',
              selectList: [
                {
                  key: 'firstItem',
                  text: 'Select on fitting item',
                  itemChoice: undefined,
                  query: (tier) => {
                    return (item) => {
                      const valueReq = item.value <= 3 + tier;
                      const rarityReq = ['Common', 'Uncommon', 'Rare'].includes(item.rarity);
                      //const keywordReq = ( item.keywords ) ? item.keywords.split(',').includes('Imperium') : false;
                      return (valueReq && rarityReq);
                    }
                  },
                },
                {
                  key: 'secondItem',
                  text: 'Select on fitting item',
                  itemChoice: undefined,
                  query: (tier) => {
                    return (item) => {
                      const valueReq = item.value <= 3 + tier;
                      const rarityReq = ['Common', 'Uncommon', 'Rare'].includes(item.rarity);
                      //const keywordReq = ( item.keywords ) ? item.keywords.split(',').includes('Imperium') : false;
                      return (valueReq && rarityReq);
                    }
                  },
                },
              ],
            },
            {
              key: 'oneVeryRareItem',
              text: 'one item of Very Rare Wargear',
              selectList: [
                {
                  key: 'firstItem',
                  text: 'Select on fitting item',
                  itemChoice: undefined,
                  query: (tier) => {
                    return (item) => {
                      const valueReq = item.value <= 3 + tier;
                      const rarityReq = ['Common', 'Uncommon', 'Rare', 'Very Rare'].includes(item.rarity);
                      //const keywordReq = ( item.keywords ) ? item.keywords.split(',').includes('Imperium') : false;
                      return (valueReq && rarityReq);
                    }
                  },
                },
              ],
            },
          ],
        },
        {
          key: 'psychicRevelations',
          name: 'Psychic Revelations',
          teaser: 'Tap into the warp, awaken powers, lure the Immaterium.',
          cost: 10,
          minimumCampaignTier: 2,
          attributePrerequisites: ['Willpower 3'],
          skillPrerequisites: [],
          prerequisites: (archetypePrerequisites) => {
            const prerequisites = [];

            const willpowerPrerequisite = archetypePrerequisites.filter( i => i.value === 'willpower' );
            if ( willpowerPrerequisite ) {
              prerequisites.push({
                group: willpowerPrerequisite.group,
                value: willpowerPrerequisite.value,
                threshold: Math.max(willpowerPrerequisite.threshold, 3),
              });
            } else {
              prerequisites.push({
                group: 'attributes',
                value: 'willpower',
                threshold: 3,
              });
            }

            return prerequisites;
          },
          keywords: ['Psyker'],
          influencePerTier: 1,
          storyElementText: 'The character gains the smite psychic power. They also may choose one Minor Psychic power per Tier ascended and may purchase powers from one Discipline of their choice. The character must purchase the Psychic Mastery Skill.',
          storyElementOptions: [
            {
              key: 'spells',
              text: '',
              type: 'spells',
              discount: [
                { name: 'smite', selected: 'Smite', filter: power => ( power.name === 'Smite' ) },
                { name: 'minor1', selected: undefined, filter: power => ( ['Minor'].includes(power.discipline) ) },
                { name: 'minor2', selected: undefined, filter: power => ( ['Minor'].includes(power.discipline) ) },
                { name: 'minor3', selected: undefined, filter: power => ( ['Minor'].includes(power.discipline) ) },
              ]
            }
          ],
          storyElementChoice: '',
          wargearText: 'None',
          wargearOptions: [],
          wargearChoice: undefined,
        },
      ],
    };
  },
};
