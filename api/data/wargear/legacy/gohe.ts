import {armour, gear, rangez} from "../utils";
import {Wargear} from "../../../shared/schemas/wargear.schema";

export const gohe: Wargear[] = [
    {
        ...gear('gohe',4,'Pulse Rifle (Heathen Pattern)','5V','Tau,Pulse,Plasma'),
        ...rangez('Pulse Weapons',12,1,1,36,2,'Rapid Fire(1)'),
    },
    {
        ...gear('gohe',7,'Jokaero Defense Orbs','L9','Xenos,Jokaero'),
        ...armour('Jokaro Armour',4, 'Power Field'),
    },
    {
        ...gear('gohe',7,'Jokaero Scattershot','L9','Xenos,Jokaero,Digi'),
        ...rangez('Jokaero Weapons',8,3,1,2, 2,'Assault,Spread,Digital'),
        description:
            '<p><strong>Digital:</strong> Add +3 dice to stealth or deception tests when concealing this weapon.</p>',
    },
];