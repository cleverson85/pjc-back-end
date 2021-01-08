import jwt from 'jsonwebtoken';

import Usuario from '../models/Usuario';
import auth from '../../config/authConfig';

class SessionController {
  async store(req, res) {
    try {
      const { email, senha } = req.body;

      const userExists = await Usuario.findOne({
        where: { email },
      });

      if (!userExists) {
        return res.send({ status: 401, message: 'Usuário ou senha inválidos.' });
      }

      if (!(await userExists.checkPassword(senha))) {
        return res.send({ status: 401, message: 'Usuário ou senha inválidos.' });
      }

      const { id, name } = userExists;

      return res.json({
        user: { id, name, email },
        autenticado: true,
        token: jwt.sign({ id }, auth.secret, {
          expiresIn: auth.expiresIn,
        }),
      });
    } catch (e) {
      return res.status(401).json({ error: e.message });
    }
  }
}

export default new SessionController();
