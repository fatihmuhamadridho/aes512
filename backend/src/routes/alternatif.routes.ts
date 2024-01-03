import { Router } from 'express';
import { AlternatifController } from '../controllers/alternatif.controller';

const router = Router();

router
  .get('/api/v1/alternatif', AlternatifController.getAll)
  .get('/api/v1/alternatif/:id_karyawan', AlternatifController.getOne)
  .post('/api/v1/alternatif', AlternatifController.postAlternatif)
  .put('/api/v1/alternatif/:id_karyawan', AlternatifController.putAlternatif)
  .delete('/api/v1/alternatif/:id_karyawan', AlternatifController.deleteAlternatif);

const alternatifRouter = router;
export default alternatifRouter;
