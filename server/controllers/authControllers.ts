import { Request, Response } from 'express';
import User from '../models/user';
import { body, validationResult } from 'express-validator';

const registerUser =
  (body('email').isEmail(),
  body('password').isLength({ min: 5 }),
  async (req: Request, res: Response) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      const errors = validationErrors.array().map((error) => {
        return {
          msg: error.msg,
        };
      });
      return res.status(400).json({ errors, data: null });
    }

    const { email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json(400).json({
        errors: [{ msg: 'User already exists' }],
        data: null,
      });
    }

    const newUser = await User.create({ email, password });
    const token = newUser.createJWT();
    return res.json({
      errors: [],
      data: {
        id: newUser._id,
        email: newUser._email,
        token,
      },
    });
  });

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({
      errors: [{ msg: 'User not Found' }],
      data: null,
    });
  }

  const isMatchedPassword = await user.comparePassword(password);
  if (!isMatchedPassword) {
    return res.json({
      errors: [{ msg: 'Invalid Credentials' }],
      data: null,
    });
  }

  const token = user.createJWT();

  return res.json({
    errors: [],
    data: {
      id: user._id,
      email: user._email,
      token,
    },
  });
};

export { registerUser, loginUser };
