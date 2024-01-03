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

export class Aes512_UserController {
  static getAll = async (req: Request, res: Response) => {
    const access_token = req.headers.authorization?.split(' ')[1];
    try {
      const response = await prisma.user.findMany({
        where: { access_token: { not: access_token }, AND: { username: { not: 'admin' } } }
      });
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
    const user_id = Number(req.params.user_id);
    try {
      const response = await prisma.user.findUniqueOrThrow({ where: { user_id } });
      res.status(200).json({
        status: true,
        message: ResponseController.message.SUCCESS_GET_DATA,
        data: response
      });
    } catch (error: any) {
      ResponseController.failed(res, error);
    }
  };

  static postAes512_User = async (req: Request, res: Response) => {
    const payload: Prisma.UserCreateInput = req.body;
    const access_token = btoa(payload.username);
    try {
      const response = await prisma.user.create({
        data: { ...payload, access_token }
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

  static putAes512_User = async (req: Request, res: Response) => {
    const user_id = Number(req.params.user_id);
    const payload: Prisma.UserCreateInput = req.body;
    const access_token = btoa(payload.username);
    try {
      const response = await prisma.user.update({
        data: { ...payload, access_token },
        where: { user_id, AND: { username: { not: 'admin' } } }
      });
      res.status(200).json({
        status: true,
        message: ResponseController.message.SUCCESS_UPDATE_DATA,
        data: response
      });
    } catch (error: any) {
      ResponseController.failed(res, error);
    }
  };

  static deleteAes512_User = async (req: Request, res: Response) => {
    const user_id = Number(req.params.user_id);
    try {
      const response = await prisma.user.delete({
        where: { user_id, AND: { username: { not: 'admin' } } }
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
