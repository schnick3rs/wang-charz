import {armour, gear, meleez, rangez} from "./utils";
import {Wargear} from "../../shared/schemas/wargear.schema";

export const tnh: Wargear[] = [
    {
        ...gear('tnh',9,'Executioner Greatblade', '10L', 'Anathema Psykana,Power Field,2-Handed'),
        ...meleez('Power Weapon',7,5,-3,'-', 'Brutal'),
    },
    {
        ...gear('tnh',9,'Psyk-Out Grenade', '10L', 'Anathema Psykana'),
        ...rangez('Sister of Silence Range Weapon','*','*','*','*', '-', 'Blast(3),Thrown(STRx4),Special'),
        description: '<p><strong>Special:</strong> They do no damage but any target with the PSYKER Keyword must immediately make a Perils of the Warp roll if struck</p>',
    },
    {
        ...gear('tnh',9,'Witchseeker Flamer', '8V', 'Anathema Psykana,Fire,Imperium'),
        ...rangez('Sister of Silence Range Weapon',10,1,-1,8, 1, 'Assault,Blessed,Flamer'),
    },
    {
        ...gear('tnh',9,'Vratine Power Armour', '8L', 'Anathema Psykana,Power Field'),
        ...armour('Power Armour',5,'Powered(3)'),
    },
];
