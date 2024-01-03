import { Request, Response } from 'express';
import { PaginationController } from './pagination.controller';
import { ResponseController } from './response.controller';
import { PrismaClient } from '@prisma/client';
import type { Prisma } from '@prisma/client';

const prisma = new PrismaClient();

interface queryProps {
  username?: string;
  page?: number;
  limit?: number;
}

interface loginProps {
  username: string;
  password: string;
}

interface changePasswordProps {
  username: string;
  password: string;
  new_password: string;
}

export class Aes512_AuthController {
  static privilege = async (req: Request, res: Response) => {
    const access_token = req.headers.authorization?.split(' ')[1];
    try {
      const response = await prisma.user.findFirstOrThrow({
        where: { access_token: access_token! }
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

  static login = async (req: Request, res: Response) => {
    const { username, password }: loginProps = req.body;
    const access_token = btoa(username);
    try {
      const response = await prisma.user.update({
        data: { access_token },
        where: { username, password }
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

  static changePassword = async (req: Request, res: Response) => {
    const access_token = req.headers.authorization?.split(' ')[1];
    const { username, password, new_password }: changePasswordProps = req.body;
    const newAccess_token = btoa(username);
    try {
      const response = await prisma.user.update({
        data: { password: new_password, access_token: newAccess_token },
        where: {
          username,
          password,
          access_token: access_token!,
          AND: { username: { not: 'admin' } }
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
}
