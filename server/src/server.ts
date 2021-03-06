import express from 'express';
import dotenv from 'dotenv';
import connectDatabase from './config/db';
import authRoutes from '../routes/authRoutes';
import subsRoutes from '../routes/subsRoutes';
import cors from 'cors';

const app = express();

dotenv.config();

app.use(express.json());

app.use(cors());

app.use('/auth', authRoutes);
app.use('/subs', subsRoutes);

connectDatabase();

app.listen(process.env.PORT, () =>
  console.log(`Server is up and running on port ${process.env.PORT}`)
);
