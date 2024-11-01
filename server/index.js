import express from 'express';
import fetch from 'node-fetch';
import querystring from 'node:querystring';
import https from 'node:https';

import { config } from './config/config.js';
import DataType from './enums/index.js';
import middlewares from './middlewares/index.js';

const { apiUrl, apiParams, apiHeaders } = config;
const { serverHeaders, redisClient, redisCache } = middlewares;

const app = express();
const port = process.env.PORT || 5002;

app.use(serverHeaders);

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

    console.log(response);

    const data = await response.json();

    await redisClient.set(req.originalUrl, JSON.stringify(data), { EX: 3600 });

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

    await redisClient.set(req.originalUrl, JSON.stringify(data), { EX: 3600 });

    res.status(200).set({ 'Response-Source': 'api' }).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Unexpected error occurred on the server.' });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
