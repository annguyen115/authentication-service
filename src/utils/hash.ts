import bcrypt from 'bcrypt';
import { appConfig } from '@config/config';

const SALT_ROUNDS: number = appConfig.auth.salt || 10;

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};
