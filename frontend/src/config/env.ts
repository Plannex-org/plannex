import { z } from "zod";

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_NODE_ENV: z.enum(["development", "production", "test"]),
  VITE_TOKEN_HIDEOUT: z.string().min(1),
  VITE_BEARER: z.string().min(1),
});

export const Env = envSchema.parse({
  VITE_API_URL: import.meta.env.VITE_API_URL,
  VITE_NODE_ENV: import.meta.env.VITE_NODE_ENV,
  VITE_TOKEN_HIDEOUT: import.meta.env.VITE_TOKEN_HIDEOUT,
  VITE_BEARER: import.meta.env.VITE_BEARER,
});
