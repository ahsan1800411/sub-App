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

export { registerUser };
