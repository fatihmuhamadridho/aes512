import { Request, Response, default as express } from 'express';

import nilaiRouter from './nilai.routes';
import kriteriaRouter from './kriteria.routes';
import alternatifRouter from './alternatif.routes';
import analisaKriteriaRouter from './analisaAlternatif.routes';
import nilaiAkhirRouter from './nilaiAkhir.routes';
import dashboardRouter from './dashboard.routes';
import authRouter from './auth.routes';
import userRouter from './user.routes';

const router = express();

router.use(nilaiRouter);
router.use(kriteriaRouter);
router.use(alternatifRouter);
router.use(analisaKriteriaRouter);
router.use(nilaiAkhirRouter);
router.use(dashboardRouter);
router.use(authRouter);
router.use(userRouter);

router.use('/', (req: Request, res: Response) => {
  res.status(500).json({
    code: res.statusCode,
    status: false,
    message: 'Your endpoint is incorrect, please recheck about your endpoint..',
    env: process.env.NODE_ENV
  });
});

export default router;
