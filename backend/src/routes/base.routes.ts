import { Router } from 'express';

const router = Router();

router
  .get('/api/v1/base', () => {})
  .get('/api/v1/base/:base_id', () => {})
  .post('/api/v1/base', () => {})
  .put('/api/v1/base/:base_id', () => {})
  .delete('/api/v1/base/:base_id', () => {});

const base2Router = router;
export default base2Router;
