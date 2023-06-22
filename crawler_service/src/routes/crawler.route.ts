import express from 'express';
import {
  start_crawl,
  get_content_crawled,
} from 'controllers/crawler.controller';

const router = express.Router();

router.route('/').post(start_crawl).delete(get_content_crawled);

export default router;
