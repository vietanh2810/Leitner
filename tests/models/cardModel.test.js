import {
    getCards,
    getCardById,
    createCard,
    updateCard,
    deleteCard,
    getCardByTags,
    getCardByCategory
} from '../../controllers/cards.js';
import { readFileSync, writeFileSync } from 'fs';

// Mock fs.readFileSync and fs.writeFileSync
jest.mock('fs', () => ({
    readFileSync: jest.fn(),
    writeFileSync: jest.fn()
}));

// Mock the file data
const mockCardsData = [
    { id: 1, title: 'Card 1', tag: 'tag1', category: 'category1' },
    { id: 2, title: 'Card 2', tag: 'tag2', category: 'category2' }
];

// Mock readFileSync implementation
readFileSync.mockReturnValue(JSON.stringify(mockCardsData));

describe('Card Controller', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mock calls after each test
    });

    it('getCards should return correct data from file', () => {
        const result = getCards();
        expect(result).toEqual(mockCardsData);
        expect(readFileSync).toHaveBeenCalledWith(expect.any(String));
    });

    it('getCardById should return correct card by id', () => {
        const result = getCardById(1);
        expect(result).toEqual(mockCardsData[0]);
    });

    it('createCard should write new card to file', () => {
        const newCard = { id: 3, title: 'Card 3', tag: 'tag3', category: 'category3' };
        createCard(newCard);
        expect(writeFileSync).toHaveBeenCalledWith(expect.any(String), JSON.stringify([...mockCardsData, newCard]));
    });

});
