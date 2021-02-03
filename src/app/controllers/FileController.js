/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import Imagem from '../models/Imagem';
import minioClient from '../../config/minio';
import minioUtil from '../util/minioUtil';

require('dotenv').config();

class FileController {
  async store(req, res) {
    try {
      const { files } = req;
      const { id, artista } = req.body;
      const bucket = process.env.MINIO_BUCKET;

      const exists = await minioClient.bucketExists(bucket);

      if (!exists) {
        await minioClient.makeBucket(bucket, 'us-east-1').then(() => { console.log('Bucket criado!!!!'); });
      }

      for (const file of files) {
        await minioUtil.putObject(artista, file);
        await await Imagem.create(
          {
            artistaId: id,
            nome: `${Math.floor(Math.random() * 100000)}${file.originalname}`,
          },
        );
      }

      return res.status(200).json('Arquivo criado!');
    } catch (e) {
      return res.status(401).send({ message: 'Ocorreu um erro.', error: e.stack });
    }
  }

  async delete(req, res) {
    try {
      for (const file of req.body) {
        await minioUtil.removeObject(file.nome);
        await Imagem.destroy({ where: { id: file.id } });
      }

      return res.status(200).json('Arquivos excluídos!');
    } catch (e) {
      return res.status(401).send({ message: 'Ocorreu um erro.', error: e.stack });
    }
  }
}

export default new FileController();
