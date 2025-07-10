import configModule from 'config';
import { z } from 'zod';

const ConfigSchema = z.object({
  port: z.number(),
  auth: z.object({
    salt: z.number(),
    secret: z.string(),
    accessTokenExpire: z.string(),
    refreshTokenExpire: z.string(),
  }),
  mongodb: z.object({
    uri: z.string(),
    databaseName: z.string(),
    collections: z.object({
      users: z.string(),
      migrations: z.string(),
    }),
    migration: z.object({
      path: z.string(),
    }),
  }),
});
type AppConfig = z.infer<typeof ConfigSchema>;

const parsed = ConfigSchema.safeParse(configModule);

if (!parsed.success) {
  console.error('❌ Invalid config:');
  const err = parsed.error; // Type: ZodError<any> (chuẩn rồi)

  for (const issue of err.issues) {
    console.error(`${issue.path.join('.')}: ${issue.message}`);
  }

  process.exit(1);
}

export const appConfig: AppConfig = parsed.data;
