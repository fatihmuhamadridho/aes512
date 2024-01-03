import { Router } from 'express';
import { Aes512_DashboardController } from '../../../controllers/Aes512/dashboard.controller';

const router = Router();

router.get('/api/v1/aes512/dashboard', Aes512_DashboardController.getAll);

const aes512DashboardRouter = router;
export default aes512DashboardRouter;
