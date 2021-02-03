import jwt from 'jsonwebtoken';
import auth from '../../config/authConfig';

import Usuario from '../models/Usuario';

class TokenController {
  async store(req, res) {
    try {
      const { email, refreshToken } = req.body;

      const user = await Usuario.findOne({
        where: { email, refreshToken },
      });

      if (user) {
        const token = jwt.sign({ email }, auth.secret, {
          expiresIn: auth.expiresIn,
        });

        return res.status(200).json({ token });
      }

      return res.status(401);
    } catch (e) {
      return res.status(401).json({ error: e.message });
    }
  }
}

export default new TokenController();
