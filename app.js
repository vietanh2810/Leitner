import express, { json, urlencoded } from "express";
import { createServer } from "http";
// const logger = require('morgan');
import logger from 'morgan';
// import { indexRouter } from './routes/index.js';
// import { indexRouter } from './routes/index';
// var usersRouter = require('./routes/users').default; // Commented out because we don't implement users logic
import cardsRouter from './routes/cards.js';



const PORT = process.env.PORT || '3002';

const app = express();
const server = createServer(app);
// app.use(cors());

app.use(json());
app.use(urlencoded({ extended: false }));
// app.use(cookieParser());

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use(logger('dev'));
app.use("/cards", cardsRouter);

server.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});

export default app;