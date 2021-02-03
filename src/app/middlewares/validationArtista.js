import * as Yup from 'yup';
// import Artista from '../models/Artista';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      artista: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ message: 'Nome do artista deve ser informado.' });
    }

    return next();
  } catch (e) {
    return res.status(401).json({ message: e.message });
  }
};
