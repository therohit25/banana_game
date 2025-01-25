import { Application } from 'express';
import clickCountRoutes from './click-count.routes';
import userRoutes from './user.routes';

export default class Routes {
  constructor(app: Application) {
    app.use('/user', userRoutes);
    app.use('/click-count', clickCountRoutes);
  }
}
