/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable-next-line no-await-in-loop */
import { Op } from 'sequelize';

import Artista from '../models/Artista';
import Album from '../models/Album';
import Imagem from '../models/Imagem';

import minioClient from '../util/minioUtil';

require('dotenv').config();

class ArtistaController {
  async post(req, res) {
    try {
      const { artista, album } = req.body;
      const albuns = album.split(',').map((e) => ({
        nome: e,
      }));

      const { id } = await Artista.create(
        {
          nome: artista,
          albuns,
        },
        {
          include: ['albuns'],
        },
      );

      return res
        .status(200)
        .json({ message: `Artista ${artista} cadastrado com sucesso!`, id });
    } catch (e) {
      return res.status(401).json({ message: e.message });
    }
  }

  async update(req, res) {
    try {
      const { id, artista, album } = req.body;

      const model = await Artista.findByPk(id);

      if (!model) {
        return res.send({ status: 401, message: 'Artista não cadastrado.' });
      }

      await Album.destroy({
        where: {
          artistaId: id,
        },
      }).then(
        () => {
          album.split(',').map(async (e) => {
            await Album.create(
              {
                artistaId: id,
                nome: e,
              },
            );
          });
        },
      ).catch(
        (e) => {
          console.log(e);
        },
      );

      model.nome = artista;
      await model.save();

      return res
        .status(200)
        .json({ message: `Artista ${artista.nome} editado com sucesso!` });
    } catch (e) {
      return res.status(401).json({ message: e.message });
    }
  }

  async get(req, res) {
    try {
      const { id } = req.params;

      const model = await Artista.findByPk(id, {
        include: [
          {
            model: Album,
            as: 'albuns',
            attributes: ['id', 'artistaId', 'nome'],
          },
          {
            model: Imagem,
            as: 'imagens',
            attributes: ['id', 'artistaId', 'nome', 'url'],
          },
        ],
      });

      return res.json(model);
    } catch (e) {
      return res.status(401).json({ message: e.message });
    }
  }

  async list(req, res) {
    try {
      const { nome } = req.query;

      const model = await Artista.findAll({
        where: (nome !== undefined ? { nome: { [Op.iLike]: `%${nome}%` } } : { id: { [Op.gt]: 0 } }),
        // order: [order === 'A' || !order ? 'ASC' : 'DESC'],
        order: ['nome'],
        include: [
          {
            model: Album,
            as: 'albuns',
            attributes: ['artistaId', 'nome'],
          },
          {
            model: Imagem,
            as: 'imagens',
            attributes: ['id', 'artistaId', 'nome', 'url'],
          },
        ],
      });

      for (const item of model) {
        const { imagens } = item;
        for (const img of imagens) {
          img.url = await minioClient.presignedUrl(img.nome);
        }
      }

      return res.json(model);
    } catch (e) {
      return res.status(401).json({ message: e.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(401).json({ message: 'Artista não encontrado.' });
      }

      await Artista.destroy({
        where: {
          id,
        },
      });

      const artistas = await Artista.findAll({
        order: ['nome'],
        include: [
          {
            model: Album,
            as: 'albuns',
            attributes: ['artistaId', 'nome'],
          },
          {
            model: Imagem,
            as: 'imagens',
            attributes: ['artistaId', 'nome', 'url'],
          },
        ],
      });

      return res
        .status(200)
        .json({
          message: 'Artista excluído com sucesso!',
          artistas,
        });
    } catch (e) {
      return res.status(401).json({ message: e.message });
    }
  }
}

export default new ArtistaController();
