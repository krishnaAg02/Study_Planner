import Redis from "ioredis";

// simple helper that reads REDIS_URL from env; this project doesn't
// currently rely on Redis, but the file exists as a placeholder for
// future caching or queueing operations.

// if REDIS_URL is not provided we create a client with an empty
// connection string; the application only uses Redis when the env var
// is set, so this avoids the compiler complaining about undefined.
export const redis = new Redis(process.env.REDIS_URL ?? "");
