import { Consumer } from 'common/infra/rabbitConsumer';
import NotificationMsg from 'common/notificationMsg';
import { EXCHANGE, QUEUE, ROUTING_KEY, SERVER } from 'config/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';
import { Server } from 'socket.io';
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from 'common/Isocket';

const app = express();

app.use(cors());
app.use(morgan('dev'));

const server = http.createServer(app);

/**
 * Check docs: https://socket.io/docs/v4/typescript/
 */
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Xử lý sự kiện kết nối của một máy khách
io.on('connection', (socket) => {
  console.log('A client has connected');

  // Xử lý sự kiện đóng kết nối của một máy khách
  socket.on('disconnect', () => {
    console.log('A client has disconnected');
  });
});

const notification_push_callback = async (message: NotificationMsg) => {
  console.log(message);

  // phát sự kiện tới client, gửi id đã được xử lý xong cho client
  io.emit('notiEmit', message.crawl_id);
};

const main = async () => {
  const consumer = new Consumer();
  const channel = await consumer.createChannel();

  consumer.consumeMessage(
    channel,
    QUEUE.NOTIFICATION,
    EXCHANGE.DIRECT_EXCHANGE,
    ROUTING_KEY.NOTIFICATION,
    notification_push_callback
  );
};

main();

// Khởi động server và lắng nghe kết nối từ các máy khách
server.listen(SERVER.PORT, () => {
  console.log(`Server is running on port ${SERVER.PORT}`);
});
