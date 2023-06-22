import amqp, { Channel } from 'amqplib';
import { PREFETCH, RABBITMQ } from '../../config/config';

export class Consumer {
  private static connection: amqp.Connection | null = null;

  /**
   * chỉ mở 1 connection và tạo nhiều channel cho kết nối
   * @returns Promise<amqp.Channel>
   */
  public async createChannel() {
    if (!Consumer.connection) {
      Consumer.connection = await amqp.connect(RABBITMQ.HOST);
    }

    return await Consumer.connection.createChannel();
  }

  public async consumeMessage(
    channel: Channel,
    queue: string,
    exchange: string,
    routing_key: string,
    callback: Function
  ) {
    try {
      if (channel) {
        const q = await channel.assertQueue(queue, {
          durable: true,
        });

        console.log('Channel connect');

        await channel.assertExchange(exchange, 'direct');

        await channel.bindQueue(q.queue, exchange, routing_key);

        // await channel.prefetch(+PREFETCH);

        console.log(' [*] Waiting for messages in %s. To exit press CTRL+C');

        channel.consume(
          q.queue,
          async (message) => {
            if (message) {
              const secs = message.content.toString().split('.').length - 1;

              console.log(' [x] Received %s', message.content.toString());

              const messageObj = JSON.parse(message.content.toString());

              await callback(messageObj);

              setTimeout(() => {
                console.log(' [x] Done');
                channel.ack(message);
              }, secs * 1000);
            }
          },
          {
            noAck: false,
          }
        );
      }
    } catch (err) {
      console.log(err);
    }
  }
}
