require('dotenv').config();
import { promisify } from 'util';
import { ftp } from '../libs/ftp';
import { ResponseController } from './response.controller';

const putAsync = promisify(ftp.put.bind(ftp));

interface queryProps {
  username?: string;
  page?: number;
  limit?: number;
}

interface ftpImageUploadProps {
  image: any;
  destination?: string;
  name: string;
}

interface ftpFileUploadProps {
  file: any;
  destination?: string;
  name: string;
}

interface ftpImageRenameProps {
  oldDestination: string;
  newDestination: string;
}

export class FtpController {
  static async getAll() {
    return new Promise((resolve, reject) => {
      ftp.list('/', false, (err, result) => {
        if (err) reject(err);
        resolve({
          status: true,
          message: ResponseController.message.SUCCESS_GET_DATA,
          data: result
        });
      });
    });
  }

  static async ftpFileUpload({ file, destination, name }: ftpFileUploadProps) {
    try {
      const response: any = await new Promise(async (resolve, reject) => {
        const dest = destination ? destination + '/' : undefined;
        const finalName = dest ? dest + name : name;
        ftp.put(file, finalName, (err) => {
          if (err) reject(err);
          if (!err) {
            resolve({
              status: true,
              message: ResponseController.message.SUCCESS_CREATE_DATA,
              data: finalName
            });
          }
        });
      });
      return {
        status: true,
        message: ResponseController.message.SUCCESS_CREATE_DATA,
        data: response?.data
      };
    } catch (error) {
      console.error('Error uploading files:', error);
      throw error; // or handle the error as needed
    }
  }

  static async ftpFileDownload(destination: string) {
    const streamToBuffer = async (stream: any) =>
      await new Promise((resolve, reject) => {
        const chunks: any = [];
        stream.on('data', (chunk: any) => chunks.push(Buffer.from(chunk)));
        stream.on('end', () => resolve(Buffer.concat(chunks)));
        stream.on('error', reject);
      });

    try {
      const stream: any = await promisify(ftp.get).bind(ftp)(destination)!;
      const buffer = await streamToBuffer(stream);

      return {
        status: true,
        message: ResponseController.message.SUCCESS_CREATE_DATA,
        data: buffer
      };
    } catch (error) {
      console.error('Error downloading files:', error);
      throw error; // or handle the error as needed
    }
  }

  static async ftpFileDelete({ destination, filename }: { destination: string; filename: string }) {
    try {
      const response: any = await new Promise(async (resolve, reject) => {
        ftp.delete(destination + filename, (err) => {
          if (err) reject(err);
          if (!err) {
            resolve({
              status: true,
              message: ResponseController.message.SUCCESS_DELETE_DATA,
              data: destination + filename
            });
          }
        });
      });
      return {
        status: true,
        message: ResponseController.message.SUCCESS_CREATE_DATA,
        data: response?.data
      };
    } catch (error) {
      console.error('Error downloading files:', error);
      throw error; // or handle the error as needed
    }
  }

  static async ftpImageUpload({ image, destination, name }: ftpImageUploadProps) {
    return new Promise(async (resolve, reject) => {
      const dest = destination ? destination + '/' : undefined;
      const finalName = dest ? dest + name : name;
      ftp.put(image, finalName, (err) => {
        if (err) reject(err);
        if (!err) {
          resolve({
            status: true,
            message: ResponseController.message.SUCCESS_CREATE_DATA,
            data: finalName
          });
        }
      });
    });
  }

  static async createRemoteDirectoryRecursive(dir: string) {
    const directories = dir.split('/').filter(Boolean);
    let currentPath = '';

    for (const directory of directories) {
      currentPath = currentPath ? `${currentPath}/${directory}` : directory;
      await this.createRemoteDirectory(currentPath);
    }
  }

  static createRemoteDirectory(dir: string) {
    return new Promise<void>((resolve, reject) => {
      if (dir) {
        ftp.mkdir(dir, true, (err) => {
          if (err) {
            console.error(`Error creating remote directory ${dir}:`, err);
            reject(err);
          } else {
            console.log(`Remote directory ${dir} created successfully`);
            resolve();
          }
        });
      } else {
        resolve();
      }
    });
  }

  static async ftpBulkImageUpload(files: ftpImageUploadProps[], destination: string) {
    const isDevelopment = process.env.NODE_ENV === 'development' ? '/development' : '';
    const dest = destination ? isDevelopment + destination + '/' : isDevelopment + '/';
    await this.createRemoteDirectoryRecursive(dest!);

    const uploadPromises = files.map((file) => {
      const finalName = dest + file.name;
      return putAsync(file.image, finalName)
        .then(() => ({
          src: finalName,
          name: file.name
        }))
        .catch((err) => {
          console.error(`Error uploading ${file.name}: ${err}`);
          throw err; // or handle the error as needed
        });
    });

    try {
      const BASE_URL = 'https://api.komikkira.com/img';
      const response = await Promise.all(uploadPromises);
      const data = response.map((item) => {
        return {
          src: BASE_URL + dest + item.name,
          name: item.name
        };
      });
      return {
        status: true,
        message: ResponseController.message.SUCCESS_CREATE_DATA,
        data: data
      };
    } catch (error) {
      console.error('Error uploading files:', error);
      throw error; // or handle the error as needed
    }
  }
  static async ftpImageRename({ oldDestination, newDestination }: ftpImageRenameProps) {
    return new Promise(async (resolve, reject) => {
      ftp.rename(oldDestination, newDestination, (err) => {
        if (err) reject(err);
        if (!err) {
          resolve({
            status: true,
            message: ResponseController.message.SUCCESS_UPDATE_DATA,
            data: newDestination
          });
        }
      });
    });
  }
  static async ftpImageDelete(destination: string) {
    return new Promise(async (resolve, reject) => {
      ftp.delete(destination, (err) => {
        if (err) reject(err);
        if (!err) {
          resolve({
            status: true,
            message: ResponseController.message.SUCCESS_DELETE_DATA,
            data: destination
          });
        }
      });
    });
  }
  static async ftpFolderDelete(destination: string) {
    return new Promise(async (resolve, reject) => {
      ftp.rmdir(destination, true, (err) => {
        if (err) reject(err);
        if (!err) {
          resolve({
            status: true,
            message: ResponseController.message.SUCCESS_DELETE_DATA,
            data: destination
          });
        }
      });
    });
  }
}
