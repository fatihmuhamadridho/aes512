import { Router } from 'express';
import { NilaiAkhirController } from '../controllers/nilaiAkhir.controller';

const router = Router();

router
  .get('/api/v1/nilai_akhir', NilaiAkhirController.getAll)
  .get('/api/v1/nilai_akhir/:nilai_akhir_id', NilaiAkhirController.getOne)
  .post('/api/v1/nilai_akhir', NilaiAkhirController.postNilaiAkhir)
  .put('/api/v1/nilai_akhir/:nilai_akhir_id', NilaiAkhirController.putNilaiAkhir)
  .delete('/api/v1/nilai_akhir/:nilai_akhir_id', NilaiAkhirController.deleteNilaiAkhir);

const nilaiAkhirRouter = router;
export default nilaiAkhirRouter;
