import { createClient } from 'redis';

export const initializeRedisClient = async () => {
  const client = createClient({
    url: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
  });

  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect();

  return client;
};
