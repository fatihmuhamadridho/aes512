import { Request, Response, default as express } from 'express';

import authRouter from './auth.routes';
import userRouter from './user.routes';
import fileRouter from './file.routes';
import dashboardRouter from './dashboard.routes';

const router = express();

router.use(authRouter);
router.use(userRouter);
router.use(fileRouter);
router.use(dashboardRouter);

router.use('/', (req: Request, res: Response) => {
  res.status(500).json({
    code: res.statusCode,
    status: false,
    message: 'Your endpoint is incorrect, please recheck about your endpoint..',
    env: process.env.NODE_ENV
  });
});

export default router;
