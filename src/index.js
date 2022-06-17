import 'express-async-errors';
import express from 'express';
import morgan from 'morgan';
import router from './routes.js';

const app = express();

app.use(express.json());

app.use(morgan('tiny'));

app.use(express.static('public'));

app.use(router);

app.listen(3001, () => console.log('Server is running!'));