import { Router } from 'express';
import { Aes512_UserController } from '../controllers/user.controller';

const router = Router();

router
  .get('/api/v1/user', Aes512_UserController.getAll)
  .get('/api/v1/user/:user_id', Aes512_UserController.getOne)
  .post('/api/v1/user', Aes512_UserController.postAes512_User)
  .put('/api/v1/user/:user_id', Aes512_UserController.putAes512_User)
  .delete('/api/v1/user/:user_id', Aes512_UserController.deleteAes512_User);

const userRouter = router;
export default userRouter;
