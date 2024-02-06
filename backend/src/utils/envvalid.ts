import { cleanEnv, str } from "envalid";

// validasting and accessing environment variables
export const env = cleanEnv(process.env, {
  PORT: str(),
});
