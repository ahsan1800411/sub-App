import express from 'express';
import dotenv from 'dotenv';
import connectDatabase from './config/db';
import authRoutes from '../routes/authRoutes';

const app = express();

dotenv.config();

app.use(express.json());

app.use('/auth', authRoutes);

connectDatabase();

app.listen(process.env.PORT, () =>
  console.log(`Server is up and running on port ${process.env.PORT}`)
);