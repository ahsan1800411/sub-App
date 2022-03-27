import express from 'express';
const router = express.Router();
import { registerUser } from '../controllers/authControllers';

router.route('/signup').post(registerUser);

export default router;
