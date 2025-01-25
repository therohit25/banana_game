import { Router } from 'express';
import { ClickCountController } from '../controllers/click-count.controller';
import { authMiddleware } from '../middlewares/auth';

class ClickCountRoutes {
  router = Router();
  controller = new ClickCountController();

  constructor() {
    this.router.get('/', authMiddleware, this.controller.getCountByUser);
    this.router.get('/players', this.controller.getPlayersWithCount);
    this.router.patch('/', this.controller.updateCountByUser);
  }
}

export default new ClickCountRoutes().router;
