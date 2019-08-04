export default {
  data() {
    return {
      backgroundRepository: [
        {
          name: 'Origin',
          hint: 'Shock or Wounds',
          description: 'A hero’s home may be their defi ning trait. A character who came from a Hive World is extremely comfortable around Imperial technology as well as recognising a person’s social standing based on their style of dress and mannerisms. A person who grew up on a voidcraft may be uncomfortable in open spaces, but has no qualms about crawling through narrow tunnels in utter blackness. A character who came from a Shrine World may have an intuitive grasp of the Ecclesiarchy’s more esoteric titles, while one from a Feral World is particularly adept at identifying poisonous plants. Characters are not necessarily born at their origin location, but it featured prominently in shaping them into the person that they have become. Often a character’s origin is part of their background phrase, but not all of it. „Cadian Veteran“ for example indicates immediately that the character is from the Cadian system and has experience as a soldier of the Astra Militarum. „Auditor from Terra“ suggests that the character is a ranking offi cial from the Adeptus Terra, who is currently on a fact-fi nding mission to check the records of one or more planets. Of course, for some protagonists, their home planet is a distant memory of no relevance for their current lives.',
          choice: [
            {
              key: 'shock',
              name: 'Shock',
              modifier: {
                targetGroup: 'traits',
                targetValue: 'shock',
                modifier: 3,
                hint: 'Origin as Background',
                source: 'background',
              }
            },
            {
              key: 'wound',
              name: 'Wound',
              modifier: {
                targetGroup: 'traits',
                targetValue: 'wound',
                modifier: 1,
                hint: 'Origin as Background',
                source: 'background',
              }
            },
          ],
        },
        {
          name: 'Keywords',
          hint: 'Information and favours from the respective faction.',
          description: '',
          choice: [],
          modifier: {
            effect: 'Characters who choose a keyword as their background have a particularly close connection to that organisation, and it offers them a network of valuable contacts. The hero has a reliable and trustworthy contact who acts as their liaison to the group represented by the keyword. The character can send and receive messages to the contact, even over great distances (the specifi cs of this vary depending on the keyword group’s resources). The contact can provide the hero with information, equipment, or a minor favour once per session. In addition, the character counts the initial Reaction of an NPC who is a member of the keyword’s organisation as one step higher than normal (see the Table 5-4: Reactions on page 253).',
            hint: 'Keywords as Background',
            source: 'background',
          },
        },
        {
          name: 'Accomplishment',
          hint: 'Influence or Wealth',
          description: '',
          choice: [
            {
              key: 'influence',
              name: 'Influence',
              modifier: {
                targetGroup: 'traits',
                targetValue: 'influence',
                modifier: 1,
                hint: 'Accomplishments as Background',
                source: 'background',
              }
            },
            {
              key: 'wealth',
              name: 'Wealth',
              modifier: {
                targetGroup: 'traits',
                targetValue: 'wealth',
                modifier: 2,
                hint: 'Accomplishment as Background',
                source: 'background',
              }
            },
          ],
        },
        {
          name: 'Goal',
          hint: 'Additional Glory on accomplishing Objectives.',
          modifier: {
            effect: 'Characters who choose a goal as their background gain +1 Glory in addition '
              + 'to gaining +1 Wrath any time that they accomplish an Objective.',
            hint: 'Goal as Background',
            source: 'background',
          },
        },
      ],
    }
  },
};
