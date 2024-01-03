import { Router } from 'express';
import { Aes512_DashboardController } from '../controllers/dashboard.controller';

const router = Router();

router.get('/api/v1/dashboard', Aes512_DashboardController.getAll);

const dashboardRouter = router;
export default dashboardRouter;
