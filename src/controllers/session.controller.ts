import { Request, Response } from 'express';
import { SessionService } from '../services/session.service';

async function createSession(req: Request, res: Response) {
  try {
    const { token } = await SessionService.createSession(req.body);
    res.status(200).json({ token, status: 1 });
  } catch (err) {
    res.status(401).json({ error: (err as Error).message });
  }
}

export const SessionController = {
  createSession,
} as const;