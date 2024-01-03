import { Router } from 'express';
import { Aes512_UserController } from '../../../controllers/Aes512/user.controller';

const router = Router();

router
  .get('/api/v1/aes512/user', Aes512_UserController.getAll)
  .get('/api/v1/aes512/user/:user_id', Aes512_UserController.getOne)
  .post('/api/v1/aes512/user', Aes512_UserController.postAes512_User)
  .put('/api/v1/aes512/user/:user_id', Aes512_UserController.putAes512_User)
  .delete('/api/v1/aes512/user/:user_id', Aes512_UserController.deleteAes512_User);

const aes512UserRouter = router;
export default aes512UserRouter;
