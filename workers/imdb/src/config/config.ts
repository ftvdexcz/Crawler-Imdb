import * as dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/.env' });

console.log(`${JSON.stringify(process.env)}`);

export const RABBITMQ = {
  HOST: process.env.RABBIT || 'amqp://host.docker.internal',
};

export const QUEUE = {
  CRAWLER: 'crawl-queue',
  NOTIFICATION: 'notification-queue',
};
export const EXCHANGE = {
  DIRECT_EXCHANGE: 'direct-exchange',
};

export const ROUTING_KEY = {
  CRAWLER: 'crawl-key',
  NOTIFICATION: 'notification-key',
};

export const NOTIFICATION_SERVICE = {
  URL:
    process.env.NOTIFICATION_SERVICE_URL ||
    'http://127.0.0.1:9000/api/v1/notification',
};

export const PREFETCH = process.env.PREFETCH || 1;
