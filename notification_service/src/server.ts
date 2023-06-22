import express from 'express';
import { json } from 'body-parser';
import AppError from 'common/handleErrors/AppError';
import globalErrorHandler from 'common/handleErrors/globalErrorHandler';
import { SERVER } from 'config/config';
import route from 'routes/notification.route';
import morgan from 'morgan';
import cors from 'cors';

const PORT = SERVER.PORT;
const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(json());

app.use('/api/v1/notification', route);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
