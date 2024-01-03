import { Router } from 'express';
import { NilaiController } from '../controllers/nilai.controller';

const router = Router();

router
  .get('/api/v1/nilai', NilaiController.getAll)
  .get('/api/v1/nilai/:nilai_id', NilaiController.getOne)
  .post('/api/v1/nilai', NilaiController.postNilai)
  .put('/api/v1/nilai/:nilai_id', NilaiController.putNilai)
  .delete('/api/v1/nilai/:nilai_id', NilaiController.deleteNilai);

const nilaiRouter = router;
export default nilaiRouter;
