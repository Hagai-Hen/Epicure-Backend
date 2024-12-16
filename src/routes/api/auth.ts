import express from 'express';
import { logIn, logOut, signUp } from '../../controllers/auth';

const router = express.Router();

router.post('/login', logIn);
router.post('/logout', logOut);
router.post("/signup", signUp);

export default router;