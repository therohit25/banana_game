import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth';

class UserRoutes {
  router = Router();
  controller = new UserController();

  constructor() {
    this.router.post('/', this.controller.create);
    this.router.post('/login', this.controller.login);
    this.router.get('/', authMiddleware, this.controller.getUserInfo);
    this.router.get('/:userId', authMiddleware, this.controller.getUserInfoByUserId);
    this.router.patch(
      '/:userId',
      authMiddleware,
      this.controller.updateUserInfo
    );
    this.router.delete('/:userId', authMiddleware, this.controller.deleteUser);
  }
}

export default new UserRoutes().router;
