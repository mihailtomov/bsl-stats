import { CronJob } from 'cron';
import fetch from 'node-fetch';

// initialize cron job hitting bsl-stats server home endpoint every 14 minutes
export const initializeCronJob = () =>
  new CronJob(
    '0 */14 * * * *', // At second :00, every 14 minutes starting at minute :00, of every hour
    () => fetch('https://bsl-stats-server.onrender.com/'),
    null, // onComplete
    true, // start
    'Europe/Sofia'
  );
