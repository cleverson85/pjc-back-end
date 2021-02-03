import jwt from 'jsonwebtoken';
import randtoken from 'rand-token';

import Usuario from '../models/Usuario';
import auth from '../../config/authConfig';

class SessionController {
  async store(req, res) {
    try {
      const { email, senha } = req.body;

      const user = await Usuario.findOne({
        where: { email },
      });

      if (!user) {
        return res.status(401).json({ message: 'Usuário ou senha inválidos.' });
      }

      if (!(await user.checkPassword(senha))) {
        return res.status(401).json({ message: 'Usuário ou senha inválidos.' });
      }

      const { id, nome } = user;
      const refreshToken = randtoken.uid(256);

      await user.update({ refreshToken });

      return res.json({
        user: { id, nome, email },
        autenticado: true,
        token: jwt.sign({ email }, auth.secret, {
          expiresIn: auth.expiresIn,
        }),
        refreshToken,
      });
    } catch (e) {
      return res.status(401).json({ error: e.message });
    }
  }
}

export default new SessionController();
