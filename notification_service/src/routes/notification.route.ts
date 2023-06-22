import { send_notification } from 'controllers/notification.controller';
import express from 'express';

const router = express.Router();

router.route('/').post(send_notification);

export default router;
