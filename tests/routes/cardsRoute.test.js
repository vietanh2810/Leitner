// Import des fonctions du contrôleur et le Router
import {
    getCardsController,
    createCardController,
    getQuizzController,
    submitAnswer
} from '../../controllers/cards.js';

// Import le Router pour le tester
import { Router } from 'express';

// Import Jest pour les assertions
import request from 'supertest';

// Import de l'application 
import app from '../../app.js';

// Créez une instance de Router
const cardsRouter = Router();

cardsRouter.get("/", (req, res) => {
    getCardsController(req, res);
});

cardsRouter.post("/", (req, res) => {
    createCardController(req, res);
});

cardsRouter.get("/quizz", (req, res) => {
    getQuizzController(req, res);
});

cardsRouter.patch("/:id/answer", (req, res) => {
    submitAnswer(req, res);
});

describe('Cards Router', () => {
    it('GET / should respond with status code 200', async () => {
        const response = await request(app).get('/cards');
        expect(response.status).toBe(200);
    });

    it('POST / should respond with status code 200', async () => {
        const response = await request(app).post('/cards');
        expect(response.status).toBe(200);
    });

    it('GET /quizz should respond with status code 200', async () => {
        const response = await request(app).get('/cards/quizz');
        expect(response.status).toBe(200);
    });

    it('PATCH /:id/answer should respond with status code 200', async () => {
        const response = await request(app).patch('/cards/123/answer');
        expect(response.status).toBe(200);
    });
});
