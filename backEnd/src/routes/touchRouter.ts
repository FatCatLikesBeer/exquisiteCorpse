import { Router } from 'express';
import { touchController } from '../controllers/touchController';

export const touchRouter = Router();

touchRouter.get('/', touchController.getNoQuery)
touchRouter.get('/:id', touchController.getQuery)
touchRouter.post('/', touchController.post);
