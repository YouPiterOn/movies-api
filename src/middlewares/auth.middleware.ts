import { Request, Response, NextFunction } from 'express';
import { SessionService } from '../services/session.service';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }

  const token = authHeader.split(' ')[1];

  try {
    await SessionService.verifySession(token);
    next();
  } catch (err) {
    res.status(401).json({ error: (err as Error).message });
  }
}
