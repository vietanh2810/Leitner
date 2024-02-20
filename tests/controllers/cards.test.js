import request from 'supertest';
import app from '../app'; 
import {
    getCardsController,
    createCardController,
    getQuizzController,
    submitAnswer
} from '../../controllers/cards';

// Mocks pour les fonctions de modèle
jest.mock('../models/Card.js', () => ({
    getCards: jest.fn(),
    getCardByTags: jest.fn(),
    createCard: jest.fn(),
    getCardById: jest.fn(),
    updateCardCategory: jest.fn(),
    getCardByCategory: jest.fn().mockReturnValue([]),
}));

jest.mock('../models/QuizTakenDay.js', () => ({
    checkIfDayIsAlreadyTaken: jest.fn().mockReturnValue(false),
    markDayAsTaken: jest.fn(),
}));

describe('Cards Controllers', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Réinitialiser les mocks après chaque test
    });

    it('getCardsController should return 200 and all cards if no tags are provided', async () => {
        const mockCards = [{ id: '1', question: 'What is pair programming?', answer: 'A practice to work in pair on the same computer.', tag: 'Teamwork', category: 'FIRST' }];
        require('../models/Card.js').getCards.mockResolvedValue(mockCards);
        
        const response = await request(app).get('/cards');
        
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockCards);
    });

    it('createCardController should return 201 and the created card', async () => {
        const mockNewCard = { question: 'New Question', answer: 'New Answer', tag: 'New Tag' };
        const mockCreatedCard = { id: '123', ...mockNewCard, category: 'FIRST' };
        require('../models/Card.js').createCard.mockResolvedValue(mockCreatedCard);

        const response = await request(app)
            .post('/cards')
            .send(mockNewCard);

        expect(response.status).toBe(201);
        expect(response.body).toEqual(mockCreatedCard);
    });

});
