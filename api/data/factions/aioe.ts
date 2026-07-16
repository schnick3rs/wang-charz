import {faction} from "./utils";

export const aioe = [
    {
        name: 'Asuryani',
        ...faction('aioe',10,'Aeldari','Asuryani'),
        advancedCreationKeywords: ['Asuryani', '[Craftworld]'],
    },
    {
        name: 'Corsairs',
        ...faction('aioe',10,'Aeldari','Corsairs'),
        advancedCreationKeywords: ['Asuryani', '[Coterie]'],
    },
    {
        name: 'Drukhari',
        ...faction('aioe',10,'Aeldari','Drukhari'),
        advancedCreationKeywords: ['Drukhari', 'Blades for Hire'],
    },
    {
        name: 'Harlequins',
        ...faction('aioe',10,'Aeldari','Harlequins'),
        advancedCreationKeywords: ['Harlequins', '[Mask]'],
    },
    {
        name: 'Ynnari',
        ...faction('aioe',10,'Aeldari','Ynnari'),
        advancedCreationKeywords: ['Ynnari'],
    },
];
