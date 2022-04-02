import express from 'express';
import { getStripePrices } from '../controllers/subsControllers';
const router = express.Router();

import { CheckAuth } from '../middlewares/CheckAuth';

router.route('/prices').get(CheckAuth, getStripePrices);

export default router;
