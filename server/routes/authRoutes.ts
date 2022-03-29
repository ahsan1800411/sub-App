import express from 'express';
const router = express.Router();
import { loginUser, me, registerUser } from '../controllers/authControllers';
import { CheckAuth } from '../middlewares/CheckAuth';

router.route('/signup').post(registerUser);
router.route('/login').post(loginUser);
router.route('/me').get(CheckAuth, me);

export default router;
