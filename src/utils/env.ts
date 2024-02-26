import { z } from "zod";

const envSchema = z.object({
  // LOCAL
  EXPO_PUBLIC_API_URL: z.string().url(),
  // FACEBOOK
  EXPO_PUBLIC_FACEBOOK_APP_ID: z.string(),
  EXPO_PUBLIC_FACEBOOK_CLIENT_TOKEN: z.string(),
  // GOOGLE
  EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID: z.string(),
});

export const env = envSchema.parse(process.env);
