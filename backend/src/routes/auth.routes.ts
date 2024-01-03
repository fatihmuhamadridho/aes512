import { Router } from 'express';
import { Aes512_AuthController } from '../controllers/auth.controller';

const router = Router();

router
  .get('/api/v1/auth/privilege', Aes512_AuthController.privilege)
  .post('/api/v1/auth/login', Aes512_AuthController.login)
  .post('/api/v1/auth/change-password', Aes512_AuthController.changePassword);

const authRouter = router;
export default authRouter;
