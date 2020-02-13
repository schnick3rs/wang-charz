export default {
  data() {
    return {
      backgroundRepository: [
        {
          key: 'origin',
          name: 'Origin',
          hint: 'Additional Shock or Wound',
          description: 'A hero’s home may be their defining trait. A character who came from a Hive World is extremely comfortable around Imperial technology as well as recognising a person’s social standing based on their style of dress and mannerisms. A person who grew up on a voidcraft may be uncomfortable in open spaces, but has no qualms about crawling through narrow tunnels in utter blackness. A character who came from a Shrine World may have an intuitive grasp of the Ecclesiarchy’s more esoteric titles, while one from a Feral World is particularly adept at identifying poisonous plants. Characters are not necessarily born at their origin location, but it featured prominently in shaping them into the person that they have become. Often a character’s origin is part of their background phrase, but not all of it. „Cadian Veteran“ for example indicates immediately that the character is from the Cadian system and has experience as a soldier of the Astra Militarum. „Auditor from Terra“ suggests that the character is a ranking offi cial from the Adeptus Terra, who is currently on a fact-fi nding mission to check the records of one or more planets. Of course, for some protagonists, their home planet is a distant memory of no relevance for their current lives.',
          bonus: 'Characters who choose an origin as their background may choose to gain either +3 Shock or +1 Wound.',
          choice: [
            {
              key: 'shock',
              name: 'Shock',
              modifier: {
                targetGroup: 'traits',
                targetValue: 'shock',
                modifier: 3,
                hint: 'Origin as Background',
                source: 'background.origin',
              },
            },
            {
              key: 'wound',
              name: 'Wound',
              modifier: {
                targetGroup: 'traits',
                targetValue: 'wounds',
                modifier: 1,
                hint: 'Origin as Background',
                source: 'background.origin',
              },
            },
          ],
        },
        {
          key: 'keyword',
          name: 'Keyword',
          hint: 'Information and favours from an ally.',
          description: 'Many archetypes include a keyword that indicates a grouping within their archetype. For Space Marines, this can be a chapter, while Inquisitors can indicate their Ordo. In cases where an archetype offers that option, choosing a keyword can be a vital point in defi ning the character. Different groups each have distinctive traditions, which can include their educational background as well as their personal preferences. A Space Marine of the Carcharodons chapter has a very different outlook than one from the Black Templars chapter. Similarly, an Eldar Ranger from Iyanden Craftworld is likely to have a different tactical approach than one from Ulthwé Craftworld.',
          bonus: 'Characters who choose a keyword as their background have a particularly close connection to that organisation, and it offers them a network of valuable contacts. The hero has a reliable and trustworthy contact who acts as their liaison to the group represented by the keyword. The character can send and receive messages to the contact, even over great distances (the specifi cs of this vary depending on the keyword group’s resources). The contact can provide the hero with information, equipment, or a minor favour once per session. In addition, the character counts the initial Reaction of an NPC who is a member of the keyword’s organisation as one step higher than normal (see the Table 5-4: Reactions on page 253).',
          modifier: {
            effect: 'Characters who choose a keyword as their background have a particularly close '
            + 'connection to that organisation, and it offers them a network of valuable contacts. '
            + 'The hero has a reliable and trustworthy contact who acts as their liaison to the group '
            + 'represented by the keyword. The character can send and receive messages to the contact, '
            + 'even over great distances (the specifi cs of this vary depending on the keyword group’s '
            + 'resources). The contact can provide the hero with information, equipment, or a minor '
            + 'favour once per session. In addition, the character counts the initial Reaction of an '
            + 'NPC who is a member of the keyword’s organisation as one step higher than normal (see '
            + 'the Table 5-4: Reactions on page 253).',
            hint: 'Keywords as Background',
            source: 'background.keyword',
          },
        },
        {
          key: 'accomplishment',
          name: 'Accomplishment',
          hint: 'Increase Influence or Wealth',
          description: 'Characters with a few missions under their belt may have completed noteworthy tasks prior to the start of the first adventure. This is particularly relevant for protagonists starting out at Tier 2 or higher. In many cases, a character might even be recognised as the person who performed some noteworthy deed—for good or for ill. A particularly ignominious incident can be a major hook for a character, such as „Coward of the Battle for Red Peak“ or „Martinet Lieutenant of 3rd Company,“ immediately establishing the character’s interactions with many NPCs.',
          bonus: 'Characters who choose an accomplishment as their background may choose to gain either +1 Influence or +2 Wealth.',
          choice: [
            {
              key: 'influence',
              name: 'Influence',
              modifier: {
                targetGroup: 'traits',
                targetValue: 'influence',
                modifier: 1,
                hint: 'Accomplishments as Background',
                source: 'background.accomplishment',
              },
            },
            {
              key: 'wealth',
              name: 'Wealth',
              modifier: {
                targetGroup: 'traits',
                targetValue: 'wealth',
                modifier: 2,
                hint: 'Accomplishment as Background',
                source: 'background.accomplishment',
              },
            },
          ],
        },
        {
          key: 'goal',
          name: 'Goal',
          hint: 'Additional Glory on accomplishing Objectives.',
          description: 'Virtually every hero is driven to accomplish some task. They might be contributing toward a larger goal that can only be accomplished over the course of many lifetimes, but their efforts remain vital. Alternatively, it could be a deeply personal concern to which they have committed every drop of blood and sweat for years. A „Pilgrim to Blessed Terra“ may have just begun a journey to cross the galaxy, in the hopes of one day—decades from now—gazing upon the walls of the Imperial Palace. A „Boy with a Kunning Plan“ may expect to someday command a Waaagh! that can eclipse whole systems.',
          bonus: 'Characters who choose a goal as their background gain +1 Glory in addition to gaining +1 Wrath any time that they accomplish an Objective.',
          modifier: {
            effect: 'Gain +1 Glory in addition to gaining +1 Wrath any time that the Character accomplish an Objective.',
            hint: 'Goal as Background',
            source: 'background.goal',
          },
        },
      ],
    };
  },
};
