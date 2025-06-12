import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { Session } from '../models/session.model';
import { CreateSessionDto } from '../dto/session.dto';

const JWT_SECRET = process.env.JWT_SECRET || 'SECRET_KEY'

async function createSession(dto: CreateSessionDto) {
  const { email, password } = dto;
  const user = await User.findOne({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    throw new Error('Invalid email or password');
  }

  const session = await Session.create({ userId: user.id });


  // This was the only way to make it use jwt AND be at least a little reasonable
  const token = jwt.sign(
    {
      sessionId: session.id,
    },
    JWT_SECRET,
    {
      expiresIn: '1h',
    }
  );

  return { token };
}

async function verifySession(token: string) {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { sessionId: string };
    const session = await Session.findOne({ where: { id: payload.sessionId } });

    if (!session) {
      throw new Error('Session not found');
    }
  } catch (err) {
    throw new Error('Invalid or expired session');
  }
}

export const SessionService = {
  createSession,
  verifySession,
} as const;