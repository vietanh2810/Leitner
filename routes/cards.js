import { Router } from 'express';
const cardsRouter = Router();
import {
    getCardsController,
    createCardController,
    getQuizzController,
    submitAnswer
} from '../controllers/cards.js';


/* GET users listing. */
cardsRouter.get('/cards', function (req, res, next) {
    res.send('respond with a resource');
});

cardsRouter.get(
    "/",
    (req, res) => {
        getCardsController(req, res).catch((error) => {
            res.status(500).json({ error: "Internal Server Error: " + error.message });
        });
    }
);

cardsRouter.post(
    "/",
    (req, res) => {
        createCardController(req, res).catch((error) => {
            res.status(500).json({ error: "Internal Server Error: " + error.message});
        });
    }
);

cardsRouter.get(
    "/quizz",
    (req, res) => {
        getQuizzController(req, res).catch((error) => {
            res.status(500).json({ error: "Internal Server Error: " + error.message });
        });
    }
);

cardsRouter.patch(
    "/:id/answer",
    (req, res) => {
        submitAnswer(req, res).catch((error) => {
            res.status(500).json({ error: "Internal Server Error: " + error.message });
        });
    }
);

export default cardsRouter;
