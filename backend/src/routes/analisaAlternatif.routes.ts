import { Router } from 'express';
import { KriteriaController } from '../controllers/kriteria.controller';
import { AnalisaKriteriaController } from '../controllers/analisaKriteria.controller';

const router = Router();

router
  .post('/api/v1/analisa_kriteria/check_consistency', AnalisaKriteriaController.checkConsistency)
  .delete('/api/v1/analisa_kriteria/reset', AnalisaKriteriaController.reset)
  .get('/api/v1/analisa_kriteria', AnalisaKriteriaController.getAll)
  .post('/api/v1/analisa_kriteria', AnalisaKriteriaController.postAnalisaKriteria);

const analisaKriteriaRouter = router;
export default analisaKriteriaRouter;
