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

export class BaseController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const response = {};
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
    const base_id = Number(req.params.base_id);
    try {
      const response = {};
      res.status(200).json({
        status: true,
        message: ResponseController.message.SUCCESS_GET_DATA,
        data: response
      });
    } catch (error: any) {
      ResponseController.failed(res, error);
    }
  };

  static postBase = async (req: Request, res: Response) => {
    const payload: any = req.body;
    try {
      const response = {};
      res.status(200).json({
        status: true,
        message: ResponseController.message.SUCCESS_CREATE_DATA,
        data: response
      });
    } catch (error: any) {
      ResponseController.failed(res, error);
    }
  };

  static putBase = async (req: Request, res: Response) => {
    const base_id = Number(req.params.base_id);
    const payload: any = req.body;
    try {
      const response = {};
      res.status(200).json({
        status: true,
        message: ResponseController.message.SUCCESS_UPDATE_DATA,
        data: response
      });
    } catch (error: any) {
      ResponseController.failed(res, error);
    }
  };

  static deleteBase = async (req: Request, res: Response) => {
    const base_id = Number(req.params.base_id);
    try {
      const response = {};
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
