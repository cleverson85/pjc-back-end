import * as Yup from 'yup';
// import Artista from '../models/Artista';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      artista: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.send({ status: 401, message: 'Nome do artista deve ser informado.' });
    }

    return next();
  } catch (e) {
    return res.send({ status: 401, message: e.message });
  }
};
