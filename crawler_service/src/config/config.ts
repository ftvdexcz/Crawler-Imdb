import { log } from 'console';
import * as dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/.env' });

log(process.env.PORT, process.env.RABBIT);

export const SERVER = {
  PORT: process.env.PORT || 8000,
};

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
