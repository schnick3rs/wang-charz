import {faction} from "./utils";

export const aioe = [
    {
        ...faction('aioe',10,'Aeldari','Asuryani'),
        advancedCreationKeywords: ['Asuryani', '[Craftworld]'],
    },
    {
        ...faction('aioe',10,'Aeldari','Corsairs'),
        advancedCreationKeywords: ['Asuryani', '[Coterie]'],
    },
    {
        ...faction('aioe',10,'Aeldari','Drukhari'),
        advancedCreationKeywords: ['Drukhari', 'Blades for Hire'],
    },
    {
        ...faction('aioe',10,'Aeldari','Harlequins'),
        advancedCreationKeywords: ['Harlequins', '[Mask]'],
    },
    {
        ...faction('aioe',10,'Aeldari','Ynnari'),
        advancedCreationKeywords: ['Ynnari'],
    },
];
