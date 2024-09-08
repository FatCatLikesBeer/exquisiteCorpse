import express from 'express';
import cors from 'cors';
const logger = require('morgan');

import apiRouter from './routes/apiRouter';

const app = express();
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = 8082;

app.use('/apiv0', apiRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
