import { Router } from 'express';
import { KriteriaController } from '../controllers/kriteria.controller';

const router = Router();

router
  .get('/api/v1/kriteria', KriteriaController.getAll)
  .get('/api/v1/kriteria/:kd_kriteria', KriteriaController.getOne)
  .post('/api/v1/kriteria', KriteriaController.postKriteria)
  .put('/api/v1/kriteria/:kd_kriteria', KriteriaController.putKriteria)
  .delete('/api/v1/kriteria/:kd_kriteria', KriteriaController.deleteKriteria);

const kriteriaRouter = router;
export default kriteriaRouter;
