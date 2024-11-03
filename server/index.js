import express from 'express';
import fetch from 'node-fetch';
import querystring from 'node:querystring';
import https from 'node:https';

import { config } from './config/config.js';
import { initializeCronJob } from './services/cron-job.js';
import { DataType, CacheSeconds } from './enums/index.js';
import middlewares from './middlewares/index.js';

const { apiUrl, apiParams, apiHeaders } = config;
const { serverHeaders, redisClient, redisCache } = middlewares;

const app = express();
const port = process.env.PORT || 5002;

app.use(serverHeaders);

// home endpoint that is hit by a cron job to prevent web service from sleeping on render.com
app.get('/', (req, res) => {
  console.log(
    'Successful self-ping. Self-pinging the home endpoint every 14th minute to prevent service from sleeping.'
  );
  res
    .status(200)
    .send('<h2>Successful hit of the home endpoint. Welcome!</h2>');
});

app.get('/tournaments', redisCache, async (req, res) => {
  try {
    const response = await fetch(
      `${apiUrl}${DataType.Tournament}?${querystring.stringify(
        apiParams.tournament
      )}`,
      {
        ...apiHeaders,
        agent: new https.Agent({
          rejectUnauthorized: false,
        }),
      }
    );

    // proper response handling in case service gets rate limited
    if (response.status === 429) {
      const responseText = await response.text();
      res.send(responseText);
    }

    const data = await response.json();

    await redisClient.set(req.originalUrl, JSON.stringify(data), {
      EX: CacheSeconds.OneDay,
    });

    res.status(200).set({ 'Response-Source': 'api' }).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Unexpected error occurred on the server.' });
  }
});

app.get('/matchlist/:pageid', redisCache, async (req, res) => {
  try {
    const response = await fetch(
      `${apiUrl}${DataType.Match}?${querystring.stringify({
        ...apiParams.match,
        conditions: `[[pageid::${req.params.pageid}]]`,
      })}`,
      {
        ...apiHeaders,
        agent: new https.Agent({
          rejectUnauthorized: false,
        }),
      }
    );

    const data = await response.json();

    await redisClient.set(req.originalUrl, JSON.stringify(data), {
      EX: CacheSeconds.OneDay,
    });

    res.status(200).set({ 'Response-Source': 'api' }).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Unexpected error occurred on the server.' });
  }
});

initializeCronJob();

app.listen(port, () => console.log(`Listening on port ${port}!`));
