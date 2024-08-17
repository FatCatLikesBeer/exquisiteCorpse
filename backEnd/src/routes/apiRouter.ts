import { Router } from 'express';
import { touchRouter } from './touchRouter';

export const apiRouter = Router();

apiRouter.use('/touch', touchRouter);

export default apiRouter;
