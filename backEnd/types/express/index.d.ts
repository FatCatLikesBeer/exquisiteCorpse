// types/express/index.d.ts

import { ResponseJSON } from '../Responses';

declare global {
  namespace Express {
    export interface Request {
      setCookie: string;
      response: ResponseJSON;
      tokenPayload: {
        id: string;
        userAgent: string;
      };
      error: number | undefined;
    }
  }
}
