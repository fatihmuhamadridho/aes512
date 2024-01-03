import { Router } from 'express';
import { Aes512_AuthController } from '../../../controllers/Aes512/auth.controller';

const router = Router();

router
  .get('/api/v1/aes512/auth/privilege', Aes512_AuthController.privilege)
  .post('/api/v1/aes512/auth/login', Aes512_AuthController.login)
  .post('/api/v1/aes512/auth/change-password', Aes512_AuthController.changePassword);

const aes512AuthRouter = router;
export default aes512AuthRouter;
