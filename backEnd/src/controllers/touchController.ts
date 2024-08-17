import { Request, Response, NextFunction } from 'express';
import { ResponseJSON } from '../types';

export const touchController: any = {};

touchController.getQuery = async (req: Request, res: Response, next: NextFunction) => {
  const query: String = req.params.id;
  const response: ResponseJSON = {
    success: true,
    message: `You said '${query}'!`,
  };
  res.json(response);
}

touchController.getNoQuery = async (req: Request, res: Response, next: NextFunction) => {
  const response: ResponseJSON = {
    success: true,
    message: "You touched the API!",
  }
  res.json(response);
}

touchController.post = async (req: Request, res: Response, next: NextFunction) => {
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
}
