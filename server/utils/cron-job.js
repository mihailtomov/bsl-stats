import { CronJob } from 'cron';
import fetch from 'node-fetch';

// initialize cron job hitting bsl-stats home endpoint every 14 minutes
export const initializeCronJob = () =>
  new CronJob(
    '* */14 * * * *', // Every 14 minutes starting at :00 minute after the hour
    () => fetch('https://bsl-stats-server.onrender.com/'),
    null, // onComplete
    true, // start
    'Europe/Sofia'
  );
