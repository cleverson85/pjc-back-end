import { Op } from 'sequelize';

import Artista from '../models/Artista';

class ArtistaController {
  async post(req, res) {
    try {
      const { artista, album } = req.body;
      const { nome } = await Artista.create({ nome: artista });

      return res.send({
        status: 200,
        message: `Artista ${nome} cadastrado com sucesso!`,
      });
    } catch (e) {
      return res.status(401).json({ message: e.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.body;

      const artista = await Artista.findByPk(id);

      if (!artista) {
        return res.send({ status: 401, message: 'Artista não cadastrado.' });
      }

      const {
        nome,
      } = await artista.update(req.body);

      return res.send({ status: 200, message: `Artista ${nome} editado com sucesso!` });
    } catch (e) {
      return res.send({ status: 401, message: e.message });
    }
  }

  async list(req, res) {
    try {
      const { nome, order } = req.query;
      let artistas = null;

      if (nome) {
        artistas = await Artista.findAll({
          where: { nome: { [Op.iLike]: `%${nome}%` } },
          order: ['nome', (order === 'A' || !order ? 'ASC' : 'DESC')],
        });
      } else {
        artistas = await Artista.findAll({
          order: ['nome'],
        });
      }

      return res.json(artistas);
    } catch (e) {
      return res.send({ status: 401, message: e.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const artista = await Artista.findByPk(id);

      if (!artista) {
        return res.send({ status: 401, message: 'Artista não encontrado.' });
      }

      await artista.destroy();
      return res.send({ status: 200, message: `Artista ${artista.nome} foi excluído com sucesso!` });
    } catch (e) {
      return res.status(401).json({ message: e.message });
    }
  }
}

export default new ArtistaController();
