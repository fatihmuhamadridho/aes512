import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();

router
  .get('/api/v1/auth/privilege', AuthController.privilege)
  .post('/api/v1/auth/login', AuthController.login)
  .post('/api/v1/auth/change-password', AuthController.changePassword);

const authRouter = router;
export default authRouter;
