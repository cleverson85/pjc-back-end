import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import auth from '../../config/authConfig';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token não informado.' });
  }

  const [, token] = authHeader.split(' ');

  try {
    // eslint-disable-next-line no-unused-vars
    const decoded = await promisify(jwt.verify)(token, auth.secret);

    return next();
  } catch (e) {
    return res.status(401).json({ error: e.message });
  }
};
