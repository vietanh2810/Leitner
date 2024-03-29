import {
    getCards,
    getCardById,
    getCardByTags,
    createCard,
    updateCard,
    getCardByCategory,
} from "../fakeOdm/Card.js";
import {
    checkIfDayIsAlreadyTaken,
    markDayAsTaken
} from "../fakeOdm/QuizTakenDay.js";
import { v4 as uuidv4 } from 'uuid';

const categorySuccessors = {
    FIRST: "SECOND",
    SECOND: "THIRD",
    THIRD: "FOURTH",
    FOURTH: "FIFTH",
    FIFTH: "SIXTH",
    SIXTH: "SEVENTH",
    SEVENTH: "DONE"
  };

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
        // Extraire les données de la carte du corps de la requête
        const { question, answer, tag } = req.body;

        // Valider les données de la carte
        if (!question || !answer || !tag || question.trim() === "" || answer.trim() === "" || tag.trim() === "") {
            return res.status(400).json({ error: "Missing or invalid properties in sent card" });
        }

        // Générer un nouvel ID pour la carte
        const id = uuidv4();

        // Créer la nouvelle carte avec la catégorie "FIRST" et l'ID généré
        const newCard = { id, question, answer, tag, category: "FIRST" };

        // Créer la carte dans la base de données
        const card = await createCard(newCard);

        // Répondre avec la carte créée et un code 201 (Created)
        return res.status(201).json(card);
    } catch (error) {
        // Gérer les erreurs et renvoyer une réponse appropriée
        return res.status(500).json({ error: error.message });
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
        quizz = await generateQuiz(nbOfDaySinceStart, quizz);
        return res.status(200).json(quizz);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const submitAnswer = async (req, res) => {
    try {
        // Extraire id et isValid de la requête
        const { id } = req.params;
        const { isValid } = req.body;

        // Valider la présence des données nécessaires
        if (!id) {
            return res.status(400).json({ error: "ID parameter is required" });
        }
        if (isValid === undefined) {
            return res.status(400).json({ error: "isValid parameter is required" });
        }

        // Rechercher la carte correspondante
        const card = await getCardById(id);
        if (!card) {
            return res.status(404).json({ error: "Card not found" });
        }

        // Mettre à jour la catégorie de la carte
        await updateCardCategory(id, isValid);

        // Répondre avec un code 204 pour indiquer que la carte a été mise à jour avec succès
        return res.status(204).send();
    } catch (error) {
        // Gérer les erreurs et renvoyer une réponse appropriée
        return res.status(500).json({ error: error.message });
    }
}

const updateCardCategory = async (id,idValid) => {
    // move card to next category is isValid is true
    const card = await getCardById(id);
    let cardToUpdate;
    if (idValid) {
        const nextCategory = getNextCategory(card.category);
        cardToUpdate = { ...card, category: nextCategory };
    } else {
        cardToUpdate = { ...card, category: "FIRST" };
    }
    updateCard(cardToUpdate);
}

/**
 * 
 * @param category 
 * @returns next category
 */
const getNextCategory = (category) => {
    return categorySuccessors[category] || null;
}

/**
 * 
 * @param  date 
 * @returns La différence de jours en entier
 */
const getDayInCycle = (date) => {
    const startDate = new Date(START_DATE);
    // Utiliser l'opérateur de coalescence nulle pour fournir une valeur par défaut si date est null ou undefined
    const targetDate = date ? new Date(date) : new Date();
    // Calculer la différence entre les dates en millisecondes
    const diffInMilliseconds = targetDate.getTime() - startDate.getTime();
    // Convertir la différence en jours et retourner le résultat arrondi à l'entier le plus proche
    return Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
}

/**
 * 
 * @param nbOfDaySinceStart 
 * @param quizz 
 * @returns quizz
 */
async function generateQuiz(nbOfDaySinceStart,quizz) {
    const categories = ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH", "SIXTH", "SEVENTH"];
    // Parcours de toutes les catégories
    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        // Calcul de la condition basée sur la puissance de 2
        const condition = nbOfDaySinceStart % Math.pow(2, i) === 0;
        // Si la condition est vraie, ajoute les cartes de la catégorie au quiz
        if (condition) {
            const categoryCards = await getCardByCategory(category);
            quizz = quizz.concat(categoryCards);
        }
    }
    return quizz;
}

export {
    getCardsController,
    createCardController,
    getQuizzController,
    submitAnswer
};
