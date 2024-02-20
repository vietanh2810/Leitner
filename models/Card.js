import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const cardsFilePath = join(__dirname, '..', 'data', 'cards.json');


const readCardsFromFile = () => {
    const cardsData = readFileSync(cardsFilePath);
    return JSON.parse(cardsData);
};

const getCards = () => {
    return readCardsFromFile();
};

const getCardById = (id) => {
    const cards = readCardsFromFile();
    return cards.find((card) => card.id === id);
}

const getCardByTags = (tags) => {
    const cards = readCardsFromFile();
    return cards.filter((card) => tags.includes(card.tag));
}

const getCardByDate = (date) => {
    const cards = readCardsFromFile();
    return cards.filter((card) => card.hasOwnProperty('date') && card.date === date);
};

const getCardByCategory = (category) => {
    const cards = readCardsFromFile();
    return cards.filter((card) => card.category === category);
}

const createCard = (card) => {
    const cards = readCardsFromFile();
    cards.push(card);
    writeFileSync(cardsFilePath, JSON.stringify(cards));
}

const updateCard = (card) => {
    const cards = readCardsFromFile();
    const index = cards.findIndex((c) => c.id === card.id);
    cards[index] = card;
    writeFileSync(cardsFilePath, JSON.stringify(cards));
}

const deleteCard = (id) => {
    const cards = readCardsFromFile();
    const index = cards.findIndex((c) => c.id === id);
    cards.splice(index, 1);
    writeFileSync(cardsFilePath, JSON.stringify(cards));
}

export {
    getCards,
    getCardById,
    createCard,
    updateCard,
    deleteCard,
    getCardByTags,
    getCardByCategory,
    getCardByDate
};
