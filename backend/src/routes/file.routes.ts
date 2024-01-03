import { Router } from 'express';
import multer from 'multer';
import { Aes512_FileController } from '../controllers/file.controller';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router
  .post('/api/v1/file/decrypt/:file_id', Aes512_FileController.decryptFile)
  .get('/api/v1/file/reset-decrypt/:file_id', Aes512_FileController.resetDecryptFile)
  .get('/api/v1/file', Aes512_FileController.getAll)
  .get('/api/v1/file/:file_id', Aes512_FileController.getOne)
  .post('/api/v1/file', upload.single('file'), Aes512_FileController.postAes512_File)
  .delete('/api/v1/file/:file_id', Aes512_FileController.deleteAes512_File);

const fileRouter = router;
export default fileRouter;
