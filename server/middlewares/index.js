import { createClient } from 'redis';

const client = createClient({
  url: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
});

client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();

const serverHeaders = (req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    // 'Cache-Control': 'max-age=604800',
  });

  next();
};

const redisCache = async (req, res, next) => {
  const cacheKey = req.originalUrl;

  try {
    const cachedData = await client.get(cacheKey);
    if (cachedData) {
      res
        .status(200)
        .set({ 'Response-Source': 'cache' })
        .json(JSON.parse(cachedData));
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Unexpected error.' });
  }
};

export default {
  serverHeaders,
  redisClient: client,
  redisCache,
};
