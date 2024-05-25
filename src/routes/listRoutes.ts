import { Router } from 'express';
import { addItem, removeItem, getItems } from '../controllers/listController';

const router = Router();

router.post('/add', addItem);
router.post('/remove', removeItem);
router.get('/items', getItems);

export default router;