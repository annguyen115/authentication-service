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
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const users: User[] = [
  {
    username: 'user1',
    fullName: 'user1',
    email: 'user1@gmail.com',
    password: '123456',
    roles: [Role.USER],
    isActive: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    username: 'user2',
    fullName: 'user2',
    email: 'user2@gmail.com',
    password: '123456',
    roles: [Role.USER],
    isActive: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    username: 'admin',
    fullName: 'admin',
    email: 'admin@gmail.com',
    password: '123456',
    roles: [Role.USER, Role.ADMIN],
    isActive: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const USER_COLLECTION_NAME = appConfig.mongodb.collections.users;

export class seed_users1752114477092 implements MigrationInterface {
  public async up(db: Db): Promise<void> {
    const hashedUser = await Promise.all(
      users.map(async user => ({
        ...user,
        password: await hashPassword(user.password),
      })),
    );

    await db.collection(USER_COLLECTION_NAME).insertMany(hashedUser);
  }

  public async down(db: Db): Promise<void> {
    const usernames = users.map(u => u.username);
    await db.collection(USER_COLLECTION_NAME).deleteMany({ username: { $in: usernames } });
  }
}
