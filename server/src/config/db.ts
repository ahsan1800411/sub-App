import mongoose from 'mongoose';

const connectDatabase = async () => {
  await mongoose.connect(process.env.MONGO_URL as string);
  console.log('Database connected');
};

export default connectDatabase;
