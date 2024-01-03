require('dotenv').config();
import client from 'ftp';

const ftp = new client();

const ftpConnect = () => {
  ftp.connect({
    host: process.env.FTP_HOST,
    user: process.env.FTP_USER,
    password: process.env.FTP_PASSWORD,
    secure: false
  });
};

ftpConnect();

export { ftp };
