import configModule from 'config';
import { z } from 'zod';

const ConfigSchema = z.object({
  port: z.number(),
  mongodb: z.object({
    uri: z.string(),
    databaseName: z.string(),
    migration: z.object({
      path: z.string(),
      collectionName: z.string(),
    }),
  }),
});

const parsed = ConfigSchema.safeParse(configModule); // hoặc .safeParse()

if (!parsed.success) {
  console.error('❌ Invalid config.yaml:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const appConfig = parsed.data;
