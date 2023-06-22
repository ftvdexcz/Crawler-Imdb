import AppError from 'common/handleErrors/AppError';
import { Producer } from 'common/infra/rabbitProducer';
import { EXCHANGE, ROUTING_KEY } from 'config/config';
import { RequestHandler } from 'express';

const producer = new Producer();

export const send_notification: RequestHandler = async (req, res, next) => {
  try {
    console.log(req.body);

    // Send notification to message broker
    const channel = await producer.createChannel();
    await producer.sendMessage(
      channel,
      { message: req.body.message, data: req.body.data },
      EXCHANGE.DIRECT_EXCHANGE,
      ROUTING_KEY.NOTIFICATION
    );

    return res.status(200).json({
      status: 'Thành công',
      status_code: 200,
    });
  } catch (err) {
    next(new AppError('Thất bại', 400));
  }
};
