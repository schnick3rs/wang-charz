import express from 'express';
import mountRoutes from './routes';

const app = express();
app.use(express.json());
mountRoutes(app);

export default {
  path: '/api',
  handler: app,
};