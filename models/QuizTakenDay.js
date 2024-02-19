import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const quizTakenDaysFilePath = join(__dirname, '..', 'data', 'quizTakenDays.json');

const checkIfDayIsAlreadyTaken = (day) => {
    const quizTakenDaysData = readFileSync(quizTakenDaysFilePath);
    const quizTakenDays = JSON.parse(quizTakenDaysData);
    return quizTakenDays.includes(day);
}

const markDayAsTaken = (day) => {
    const quizTakenDaysData = readFileSync(quizTakenDaysFilePath);
    const quizTakenDays = JSON.parse(quizTakenDaysData);
    quizTakenDays.push(day);
    writeFileSync(quizTakenDaysFilePath, JSON.stringify(quizTakenDays));
}

export {
    checkIfDayIsAlreadyTaken,
    markDayAsTaken
}