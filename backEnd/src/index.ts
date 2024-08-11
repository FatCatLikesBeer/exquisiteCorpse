import express, { Request, Response } from 'express';
import { ResponseJSON } from './types';
import cors from 'cors';
const logger = require('morgan');

const app = express();
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = 8082;

app.get('/apiv0', (req: Request, res: Response) => {
  const response: ResponseJSON = {
    success: true,
    message: "You touched the API!",
  }
  res.json(response);
});

app.get('/apiv0/:id', (req: Request, res: Response) => {
  const query: String = req.params.id;
  const response: ResponseJSON = {
    success: true,
    message: `You said '${query}'!`,
  };
  res.json(response);
});

app.post('/apiv0/', (req: Request, res: Response) => {
  console.log(req.body);
  const title = req.body.title;
  const body = req.body.body;
  const response = {
    success: true,
    message: "I got what you sent",
    data: {
      title,
      body
    }
  }
  res.json(response);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
