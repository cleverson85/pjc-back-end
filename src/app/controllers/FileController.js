import Minio from 'minio';

class FileController {
  async store(req, res) {
    try {
      const minioClient = new Minio.Client({
        endPoint: 'play.min.io',
        port: 9000,
        useSSL: true,
        accessKey: 'Q3AM3UQ867SPQQA43P2F',
        secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG',
      });

      const { data, id } = req.body;

      minioClient.makeBucket('album-artista-pjc', 'us-east-1', (err) => {
        if (err) {
          return console.log(err.message);
        }

        console.log('Bucket criado com sucesso.');
      });

      minioClient.putObject('album-artista-pjc', req.file.originalname, Buffer.from(req.file.buffer, 'binary'), { 'Content-Type': req.file.mime }, (err, etag) => {
        if (err) {
          return console.log(err);
        }

        // const filePath = `${bucket}/${path}${req.file.hash}${file.ext}`;
        // let hostPart = `${minioClient.protocol}//${minioClient.host}:${minioClient.port}`;

        // // const http = useSSL ? 'https' : 'http';
        // hostPart = `http://${host}`;

        // req.file.url = `${hostPart}/${filePath}`;

        // console.log('File uploaded successfully.');

        // return file.url;
      });

      return res.json('Arquivo criado!');
    } catch (e) {
      return res.status().send({ status: 401, message: 'Ocorreu um erro, entre em contato com a central.' });
    }
  }
}

export default new FileController();
