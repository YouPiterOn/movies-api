import { Router } from 'express';
import { UserController } from '../../controllers/user.controller';
import { SessionController } from '../../controllers/session.controller';

const router = Router();

router.post('/users', UserController.createUser);
router.post('/sessions', SessionController.createSession);

export { router as v1Router }