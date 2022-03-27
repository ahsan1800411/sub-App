import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Please provide an email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    min: 5,
  },
});

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.createJWT = function () {
  return JWT.sign({ id: this._id }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: 360000,
  });
};

export default mongoose.model('User', userSchema);
