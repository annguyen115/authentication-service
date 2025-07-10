import { Db } from 'mongodb';
import { MigrationInterface } from 'mongo-migrate-ts';
import { hashPassword } from '@utils/hash';
import { appConfig } from '@config/config';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

interface User {
  username: string;
  fullName: string;
  email: string;
  password: string;
  roles: string[];
}

const users: User[] = [
  {
    username: 'user1',
    fullName: 'user1',
    email: 'user1@gmail.com',
    password: '123456',
    roles: [Role.USER],
  },

  {
    username: 'user2',
    fullName: 'user2',
    email: 'user1@gmail.com',
    password: '123456',
    roles: [Role.USER],
  },
  {
    username: 'admin',
    fullName: 'admin',
    email: 'admin@gmail.com',
    password: '123456',
    roles: [Role.USER, Role.ADMIN],
  },
];

export class seed_users1752114477092 implements MigrationInterface {
  public async up(db: Db): Promise<void> {
    const hashedUser = users.map(async user => {
      const hashedPassword = await hashPassword(user.password);
      return { ...user, password: hashedPassword };
    });

    await db.collection(appConfig.mongodb.collections.users).insertMany(hashedUser);
  }

  public async down(db: Db): Promise<void> {
    await db.collection(appConfig.mongodb.collections.users).deleteMany({});
  }
}
