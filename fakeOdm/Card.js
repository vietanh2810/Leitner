import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const cardsFilePath = join(__dirname, '..', 'data', 'cards.json');

/**
 * Read cards on file
 * @returns cardsData
 */
const readCardsFromFile = () => {
    const cardsData = readFileSync(cardsFilePath);
    return JSON.parse(cardsData);
};

/**
 * All cards
 * @returns readCardsFromFile()
 */
const getCards = () => {
    return readCardsFromFile();
};

/**
 * get one card by id
 * @param  id 
 * @returns cards
 */
const getCardById = (id) => {
    const cards = readCardsFromFile();
    return cards.find((card) => card.id === id);
}

/**
 * get cards by tag
 * @param  tags 
 * @returns cards
 */
const getCardByTags = (tags) => {
    const cards = readCardsFromFile();
    return cards.filter((card) => tags.includes(card.tag));
}

/**
 * get cards by category
 * @param  category 
 * @returns cards
 */
const getCardByCategory = (category) => {
    const cards = readCardsFromFile();
    return cards.filter((card) => card.category === category);
}

/**
 * create card
 * @param  card 
 */
const createCard = (card) => {
    const cards = readCardsFromFile();
    cards.push(card);
    writeFileSync(cardsFilePath, JSON.stringify(cards));
}

/**
 * Update Card
 * @param  card 
 */
const updateCard = (card) => {
    const cards = readCardsFromFile();
    const index = cards.findIndex((c) => c.id === card.id);
    cards[index] = card;
    writeFileSync(cardsFilePath, JSON.stringify(cards));
}

/**
 * deleted card by id
 * @param  id 
 */
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
    getCardByCategory
};
