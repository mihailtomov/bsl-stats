import { initializeRedisClient } from '../services/redis.js';
import { CacheSeconds } from '../enums/index.js';

const client = await initializeRedisClient();

const serverHeaders = (req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Cache-Control': `max-age=${CacheSeconds.OneDay}`,
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
