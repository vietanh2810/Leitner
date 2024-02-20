import {
    getCards,
    getCardById,
    getCardByTags,
    createCard,
    updateCard,
    getCardByCategory,
    getCardByDate
} from "../models/Card.js";
import {
    checkIfDayIsAlreadyTaken,
    markDayAsTaken
} from "../models/QuizTakenDay.js";
import { v4 as uuidv4 } from 'uuid';

const START_DATE = new Date();

const getCardsController = async (req, res) => {
    try {
        const tags = req.query.tags;
        if (tags) {
            const cards = await getCardByTags(tags);
            return res.status(200).json(cards);
        } else {
            const cards = await getCards();
            return res.status(200).json(cards);
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const createCardController = async (req, res) => {
    try {
        let newCard = req.body;
        if (!newCard.question || !newCard.answer || newCard.question === "" || newCard.answer === "" || newCard.tag === "" || !newCard.tag) {
            return res.status(400).json({ error: "Missing propeties in sent card" });
        }
        const id = uuidv4();
        newCard = { ...newCard, category: "FIRST", id: id}; //format date: 
        const card = await createCard(newCard);
        return res.status(201).json(card);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const getQuizzController = async (req, res) => {
    try {
        const dateParam = req.query.date;
        let nbOfDaySinceStart;
        if (dateParam) {
            nbOfDaySinceStart = getDayInCycle(dateParam);
        } else {
            nbOfDaySinceStart = getDayInCycle();
        }
        if (checkIfDayIsAlreadyTaken(nbOfDaySinceStart)) {
            return res.status(400).json({ error: "Quiz already taken today" });
        } else {
            markDayAsTaken(nbOfDaySinceStart);
        }
        let quizz = [];
        // quizz = await generateQuiz(nbOfDaySinceStart, quizz);
        quizz = await generateQuizzByDate(dateParam, quizz);
        return res.status(200).json(quizz);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const submitAnswer = async (req, res) => {
    try {
        const { id } = req.params;
        const card = await getCardById(id);
        if (!card) {
            return res.status(404).json({ error: "Card not found" });
        }
        const { isValid } = req.body;
        if (isValid === undefined) {
            return res.status(400).json({ error: "IsValid parameter is required" });
        }
        await updateCardCategory(id, isValid);
        return res.status(204).json({ message: "Card updated" });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const updateCardCategory = async (id,idValid) => {
    // move card to next category is isValid is true
    const card = await getCardById(id);
    let cardToUpdate;
    if (idValid) {
        const nextCategory = getNextCategory(card.category);
        let nextDate = getNextDateForQuestion(nextCategory);
        cardToUpdate = { ...card, category: nextCategory, date: nextDate};
    } else {
        cardToUpdate = { ...card, category: "FIRST", date: null };
    }
    updateCard(cardToUpdate);
}

const getNextCategory = (category) => {
    if ( category === "FIRST") {
        return "SECOND";
    }
    if ( category === "SECOND") {
        return "THIRD";
    }
    if ( category === "THIRD") {
        return "FOURTH";
    }
    if ( category === "FOURTH") {
        return "FIFTH";
    }
    if ( category === "FIFTH") {
        return "SIXTH";
    }
    if ( category === "SIXTH") {
        return "SEVENTH";
    }
    if ( category === "SEVENTH") {
        return "DONE";
    }
}

const getDayInCycle = (date) => {
    let diff = 0;
    if (date) {
        const dateFormatted = new Date(date);
        diff = dateFormatted - START_DATE;
    } else {
        const now = new Date();
        diff = now - START_DATE;
    }
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}

const getNextDateForQuestion = (category) => {
    let today = new Date();
    switch (category) {
        case "SECOND":
            return toFormattedDateString(today.setDate(today.getDate() + 2));
        case "THIRD":
            return toFormattedDateString(today.setDate(today.getDate() + 4));
        case "FOURTH":
            return toFormattedDateString(today.setDate(today.getDate() + 8));
        case "FIFTH":
            return toFormattedDateString(today.setDate(today.getDate() + 16));
        case "SIXTH":
            return toFormattedDateString(today.setDate(today.getDate() + 32));
        case "SEVENTH":
            return toFormattedDateString(today.setDate(today.getDate() + 64));
        default:
            return null;
    }
}

// async function generateQuiz(nbOfDaySinceStart,quizz) { //legacy when applied calendar logic

//     const categoryConditions = [
//         { category: "FIRST", condition: true },
//         { category: "SECOND", condition: nbOfDaySinceStart % 2 === 0 },
//         { category: "THIRD", condition: nbOfDaySinceStart % 3 === 0 },
//         { category: "FOURTH", condition: nbOfDaySinceStart % 4 === 0 },
//         { category: "FIFTH", condition: nbOfDaySinceStart % 5 === 0 },
//         { category: "SIXTH", condition: nbOfDaySinceStart % 6 === 0 },
//         { category: "SEVENTH", condition: nbOfDaySinceStart % 7 === 0 }
//     ];

//     for (const { category, condition } of categoryConditions) {
//         if (condition) {
//             const categoryCards = await getCardByCategory(category);
//             quizz = quizz.concat(categoryCards);
//         }
//     }

//     return quizz;
// } 

async function generateQuizzByDate(dateString,quizz) {
    let firstCategoryQuestions = await getCardByCategory("FIRST");
    quizz = quizz.concat(firstCategoryQuestions);
    let cardByDate = await getCardByDate(dateString);
    quizz = quizz.concat(cardByDate);
    return quizz;
}

function toFormattedDateString(date) { // date here is a Date object
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is zero-indexed
    let day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export {
    getCardsController,
    createCardController,
    getQuizzController,
    submitAnswer
};
