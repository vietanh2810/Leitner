import express, { json, urlencoded } from "express";
import { createServer } from "http";
import logger from 'morgan';
import cardsRouter from './routes/cards.js';
import cors from 'cors';
const PORT = process.env.PORT || '3002';

const app = express();
const server = createServer(app);
app.use(cors()); // Add CORS middleware to allow requests from any origin

app.use(json());
app.use(urlencoded({ extended: false }));

app.use(logger('dev'));
app.use("/cards", cardsRouter);

server.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});

export default app;