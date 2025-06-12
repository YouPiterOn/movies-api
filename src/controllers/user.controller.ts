import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { createUserSchema } from '../dto/user.dto';
import { SessionService } from '../services/session.service';

async function createUser(req: Request, res: Response) {
  const result = createUserSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      error: 'Validation failed',
      details: result.error.format(),
    });

    return;
  }

  try {
    await UserService.createUser(result.data);

    const token = await SessionService.createSession({ email: result.data.email, password: result.data.password})

    res.status(201).json({ token, status: 1 });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
}

export const UserController = {
  createUser,
} as const;