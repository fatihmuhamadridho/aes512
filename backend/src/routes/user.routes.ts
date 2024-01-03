import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const router = Router();

router
  .get('/api/v1/user', UserController.getAll)
  .get('/api/v1/user/:user_id', UserController.getOne)
  .post('/api/v1/user', UserController.postUser)
  .put('/api/v1/user/:user_id', UserController.putUser)
  .delete('/api/v1/user/:user_id', UserController.deleteUser);

const userRouter = router;
export default userRouter;
