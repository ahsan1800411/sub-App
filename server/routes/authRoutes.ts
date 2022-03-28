import express from 'express';
const router = express.Router();
import { loginUser, registerUser } from '../controllers/authControllers';

router.route('/signup').post(registerUser);
router.route('/login').post(loginUser);

export default router;
