import { Db } from 'mongodb';
import { MigrationInterface } from 'mongo-migrate-ts';
import bcrypt from 'bcrypt';

interface User {
  username: string;
  email: string;
  password: string;
  isActive?: boolean;
  roles: string[];
  lastLogin?: Date;
  refreshToken?: string;
}

const hashedPassword = (password: string) => bcrypt.hash(password, 10);

export class seed_users1752114477092 implements MigrationInterface {
  public async up(db: Db): Promise<void> {}

  public async down(db: Db): Promise<void> {}
}
