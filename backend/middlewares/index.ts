import { initializeRedisClient } from '../services/redis.ts';
import { CacheSeconds } from '../enums/index.ts';
import type { RequestHandler } from 'express';

const client = await initializeRedisClient();

const serverHeaders: RequestHandler = (req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Cache-Control': `max-age=${CacheSeconds.OneDay}`,
  });

  next();
};

const redisCache: RequestHandler = async (req, res, next) => {
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
