import {gear} from "./utils";
import {Wargear} from "../../shared/schemas/wargear.schema";

export const afas: Wargear[] = [
    {
        ...gear('afas',25,'Crux Terminatus','10V','Adeptus Astartes,Imperium'),
        snippet: 'Cast in stone and mounted on the bearer’s Power Armour, the Crux Terminatus is the ultimate symbol of valour in the Imperium.',
        modifications: [
            { targetGroup: 'traits', targetValue: 'influence', modifier: 1 },
            { targetGroup: 'traits', targetValue: 'resolve', modifier: 1 },
        ],
    },
];