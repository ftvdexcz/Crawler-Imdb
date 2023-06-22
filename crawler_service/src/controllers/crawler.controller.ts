import { Channel } from 'amqplib';
import { Producer } from 'common/infra/rabbitProducer';
import imdb_schema from 'common/utils/imdb.schema';
import { generateRandomCode } from 'common/utils/util';
import { EXCHANGE, ROUTING_KEY } from 'config/config';
import { RequestHandler } from 'express';

const producer = new Producer();
let channel1: Channel | null;

export const start_crawl: RequestHandler = async (req, res, next) => {
  const countKey = Object.keys(req.body).reduce((acc, key) => {
    if (key !== 'count' && key !== 'sort') return acc + 1;
    return acc;
  }, 0);

  if (countKey === 0)
    return res.status(400).json({
      status: 'Thất bại',
      status_code: 400,
      message: 'Không được để trống',
    });

  const { error, value: result_schema } = imdb_schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      status: 'Thất bại',
      status_code: 400,
      message: error.message,
    });
  }

  const data = {
    crawl_id: generateRandomCode(),
    ...result_schema,
  };

  channel1 = await producer.createChannel();

  producer.sendMessage(
    channel1,
    data,
    EXCHANGE.DIRECT_EXCHANGE,
    ROUTING_KEY.CRAWLER
  );

  res.status(200).json({
    status: 'Thành công',
    status_code: 200,
    data,
  });
};

export const get_content_crawled = async () => {};
