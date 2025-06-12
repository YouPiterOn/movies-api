import bcrypt from 'bcryptjs';
import { CreateUserDto } from '../dto/user.dto';
import { User } from '../models/user.model';

async function createUser(dto: CreateUserDto) {
  const { email, name, password, confirmPassword } = dto;

  if (password !== confirmPassword) {
    throw new Error('Passwords do not match');
  }

  const existing = await User.findOne({ where: { email } });
  if (existing) {
    throw new Error('Email already in use');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, name, passwordHash });
  return user;
}

export const UserService = {
  createUser,
} as const;