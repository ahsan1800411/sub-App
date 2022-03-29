import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';

export const CheckAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.header('authorization');

  if (!token) {
    return res.status(403).json({
      errors: [
        {
          msg: 'unauthorized',
        },
      ],
    });
  }

  token = token.split(' ')[1];

  try {
    const user = JWT.verify(token, process.env.JWT_SECRET_KEY as string) as {
      id: string;
    };

    req.user = user.id;

    next();
  } catch (error) {
    return res.status(403).json({
      errors: [
        {
          msg: 'unauthorized',
        },
      ],
    });
  }
};
