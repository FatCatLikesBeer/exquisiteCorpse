import { Router } from 'express';

import usersController from '../controllers/usersController'

const usersRouter = Router();

usersRouter.get('/', usersController.get);

export default usersRouter;
