import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/index.js';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { config } from './config/index.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
if (config.env !== 'test') app.use(morgan('dev'));

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/v1', routes);

app.use(notFound);
app.use(errorHandler);

export default app;
