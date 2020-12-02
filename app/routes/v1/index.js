import { Router } from 'express';
import userRoutes from './users';

const router = Router();

router.use('/user', userRoutes);

export default router;
