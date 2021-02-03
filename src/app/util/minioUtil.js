import minioClient from '../../config/minio';

require('dotenv').config();

const putObject = (artista, file) => {
  const fileName = `${artista}_${file.originalname}`;
  return minioClient.putObject(process.env.MINIO_BUCKET, fileName, Buffer.from(file.buffer, 'binary'), { 'Content-Type': file.mimetype });
};

const listObjects = (artista) => minioClient.listObjects(process.env.MINIO_BUCKET, artista, true);

const presignedUrl = (artista) => minioClient.presignedUrl('GET', process.env.MINIO_BUCKET, artista, 24 * 60 * 60);

const removeObject = (file) => minioClient.removeObject(process.env.MINIO_BUCKET, file);

export default {
  putObject, listObjects, presignedUrl, removeObject,
};
