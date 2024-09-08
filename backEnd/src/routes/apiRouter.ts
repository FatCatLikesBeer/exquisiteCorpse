import { Router } from 'express';
import { touchRouter } from './touchRouter';

import userRouter from './usersRouter';

export const apiRouter = Router();

apiRouter.use('/touch', touchRouter);
apiRouter.use('/users', userRouter);

export default apiRouter;
