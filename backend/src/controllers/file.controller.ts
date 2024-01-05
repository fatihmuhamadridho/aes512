import { Request, Response } from 'express';
import { PaginationController } from './pagination.controller';
import { ResponseController } from './response.controller';
import { PrismaClient } from '@prisma/client';
import type { Prisma } from '@prisma/client';
import { FtpController } from './ftp.controller';
import { randomUUID } from 'crypto';
import { AesCtr } from '../libs/aes512/aes-ctr';
import { ftp } from '../libs/ftp';
import { performance } from 'perf_hooks';

const prisma = new PrismaClient();

interface queryProps {
  username?: string;
  page?: number;
  limit?: number;
}

export class Aes512_FileController {
  static BASE_FILE_URL = 'https://www.cdn.komikkira.cloud';
  static file_encrypted_url = '/aes512/encrypted';
  static file_decrypted_url = '/aes512/decrypted';

  static getAll = async (req: Request, res: Response) => {
    const access_token = req.headers.authorization?.split(' ')[1];
    try {
      const user = await prisma.user.findFirstOrThrow({ where: { access_token: access_token! } });
      const response = await prisma.file.findMany({ where: { userUser_id: user.user_id } });
      res.status(200).json({
        status: true,
        message: ResponseController.message.SUCCESS_GET_DATA,
        data: response
      });
    } catch (error: any) {
      ResponseController.failed(res, error);
    }
  };

  static getOne = async (req: Request, res: Response) => {
    const file_id = Number(req.params.file_id);
    try {
      const response = await prisma.file.findUniqueOrThrow({ where: { file_id } });
      res.status(200).json({
        status: true,
        message: ResponseController.message.SUCCESS_GET_DATA,
        data: response
      });
    } catch (error: any) {
      ResponseController.failed(res, error);
    }
  };

  static postAes512_File = async (req: Request, res: Response) => {
    const startPerformance = performance.now();
    const access_token = req.headers.authorization?.split(' ')[1];
    const payload: Prisma.FileUncheckedCreateInput = req.body;
    const file: any = req.file;
    try {
      const user = await prisma.user.findFirstOrThrow({ where: { access_token: access_token! } });
      await FtpController.createRemoteDirectoryRecursive(this.file_encrypted_url);

      const plaintext = Buffer.from(file.buffer).toString('base64');
      const encrypted = AesCtr.encrypt(plaintext, payload.password!, 512);

      const uuid = randomUUID().toString().substring(0, 10);
      await FtpController.ftpFileUpload({
        file: Buffer.from(encrypted),
        name: uuid + '.enc',
        destination: this.file_encrypted_url
      });

      const endPerformance = performance.now();
      const timestampDuration = endPerformance - startPerformance;
      const response = await prisma.file.create({
        data: {
          ...payload,
          file_name_source: file.originalname,
          file_name_encrypted: uuid + '.enc',
          file_size: file.size,
          file_encrypted_url: this.BASE_FILE_URL + this.file_encrypted_url,
          durasi_proses_enkripsi: timestampDuration,
          userUser_id: user.user_id
        }
      });
      res.status(200).json({
        status: true,
        message: ResponseController.message.SUCCESS_CREATE_DATA,
        data: response
      });
    } catch (error: any) {
      ResponseController.failed(res, error);
    }
  };

  static deleteAes512_File = async (req: Request, res: Response) => {
    const access_token = req.headers.authorization?.split(' ')[1];
    const file_id = Number(req.params.file_id);
    try {
      const user = await prisma.user.findFirstOrThrow({ where: { access_token: access_token! } });
      const response = await prisma.file.delete({ where: { file_id, userUser_id: user.user_id } });
      await FtpController.ftpFileDelete({
        destination: this.file_encrypted_url + '/',
        filename: response.file_name_encrypted
      });
      if (response.status === 'DECRYPTED') {
        await FtpController.ftpFileDelete({
          destination: this.file_decrypted_url + '/',
          filename: response.file_name_source
        });
      }
      res.status(200).json({
        status: true,
        message: ResponseController.message.SUCCESS_DELETE_DATA,
        data: response
      });
    } catch (error: any) {
      ResponseController.failed(res, error);
    }
  };

  static decryptFile = async (req: Request, res: Response) => {
    const startPerformance = performance.now();
    const access_token = req.headers.authorization?.split(' ')[1];
    const file_id = Number(req.params.file_id);
    const { password }: Prisma.FileCreateInput = req.body;
    try {
      const user = await prisma.user.findFirstOrThrow({ where: { access_token: access_token! } });
      await FtpController.createRemoteDirectoryRecursive(this.file_decrypted_url);
      const response = await prisma.file.findUniqueOrThrow({
        where: { file_id, password, userUser_id: user.user_id }
      });

      const getFileEncrypted: any = await new Promise((resolve, reject) => {
        ftp.get(
          this.file_encrypted_url + '/' + response.file_name_encrypted,
          async (err, stream) => {
            if (err) reject(err);

            const chunks: any = [];
            stream.on('data', (chunk) => {
              chunks.push(chunk);
            });

            if (!err) {
              stream.on('end', () => {
                const fileBuffer = Buffer.concat(chunks);
                resolve(fileBuffer);
              });
            }
          }
        );
      });

      const plaintext: any = Buffer.from(getFileEncrypted);
      const decrypted = AesCtr.decrypt(plaintext, password!, 512);

      await FtpController.ftpFileUpload({
        file: Buffer.from(decrypted, 'base64'),
        name: response.file_name_source,
        destination: this.file_decrypted_url
      });

      const endPerformance = performance.now();
      const timestampDuration = endPerformance - startPerformance;
      const finalResponse = await prisma.file.update({
        data: {
          file_decrypted_url: this.BASE_FILE_URL + this.file_decrypted_url,
          status: 'DECRYPTED',
          durasi_proses_dekripsi: timestampDuration
        },
        where: { file_id, password, userUser_id: user.user_id }
      });

      res.status(200).json({
        status: true,
        message: ResponseController.message.SUCCESS_DELETE_DATA,
        data: finalResponse
      });
    } catch (error: any) {
      ResponseController.failed(res, error);
    }
  };

  static resetDecryptFile = async (req: Request, res: Response) => {
    const access_token = req.headers.authorization?.split(' ')[1];
    const file_id = Number(req.params.file_id);
    try {
      const user = await prisma.user.findFirstOrThrow({ where: { access_token: access_token! } });
      const response = await prisma.file.update({
        data: { durasi_proses_dekripsi: null, status: 'ENCRYPTED' },
        where: { file_id, userUser_id: user.user_id }
      });

      await FtpController.ftpFileDelete({
        destination: this.file_decrypted_url + '/',
        filename: response.file_name_source
      });

      res.status(200).json({
        status: true,
        message: ResponseController.message.SUCCESS_DELETE_DATA,
        data: response
      });
    } catch (error: any) {
      ResponseController.failed(res, error);
    }
  };
}
