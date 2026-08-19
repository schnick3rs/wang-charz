import {gear, rangez} from "./utils";
import {Wargear} from "../../shared/schemas/wargear.schema";

export const cos: Wargear[] = [
    {
        ...gear('cos',138,'Heavy Squig Launcher','6U','Ork, Squig'),
        ...rangez('Ork Range Weapon','*','*','*',36,'-','Heavy(4)'),
        description: '<p>A larger version of the primitive weapon that propels murderous Orkoids known as Squigs wherever an Ork sees\n' +
            'fit. Whenever you fire a Heavy Squig Launcha, you can fire a Bile, Bitey, or Boom Squig.</p>'
    },
    {
        ...gear('cos',138,'Bile Squig','2U','Ork, Squig'),
        ...rangez('Ork Range Weapon',10,3,0,'*','-','Blast(8),Inflict(Poisoned 2)'),
        snippet: 'For running Squig as a combatant, see Churf of Steel, pg. 138.',
    },
    {
        ...gear('cos',138,'Bitey Squig','2U','Ork, Squig'),
        ...rangez('Ork Range Weapon',12,2,3,'*','-','Brutal'),
        snippet: 'For running Squig as a combatant, see Churf of Steel, pg. 138.',
    },
    {
        ...gear('cos',138,'Boom Squig','8U','Ork, Squig'),
        ...rangez('Ork Range Weapon',14,4,1,'*','-','Blast(4)'),
        snippet: 'For running Squig as a combatant, see Churf of Steel, pg. 138.',
    },
];