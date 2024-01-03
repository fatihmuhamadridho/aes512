import { Router } from 'express';
import { DashboardController } from '../controllers/dashboard.controller';

const router = Router();

router.get('/api/v1/dashboard', DashboardController.getAll);

const dashboardRouter = router;
export default dashboardRouter;
