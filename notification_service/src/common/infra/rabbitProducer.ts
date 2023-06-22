import amqp, { Channel } from 'amqplib';
import { RABBITMQ } from '../../config/config';

export class Producer {
  private static connection: amqp.Connection | null = null;

  public async createChannel() {
    if (!Producer.connection)
      Producer.connection = await amqp.connect(RABBITMQ.HOST);

    return await Producer.connection.createChannel();
  }

  public async sendMessage(
    channel: Channel,
    messageObj: object,
    exchange: string,
    routing_key: string
  ) {
    try {
      if (channel) {
        await channel.assertExchange(exchange, 'direct');
        const message = JSON.stringify(messageObj);

        channel.publish(exchange, routing_key, Buffer.from(message));

        console.log(` [x] Send ${message}`);
      }
    } catch (err) {
      console.log(err);
    }
  }
}
