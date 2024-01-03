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

export class NilaiController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const response = await prisma.nilai.findMany();
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
    const nilai_id = Number(req.params.nilai_id);
    try {
      const response = await prisma.nilai.findUniqueOrThrow({ where: { nilai_id } });
      res.status(200).json({
        status: true,
        message: ResponseController.message.SUCCESS_GET_DATA,
        data: response
      });
    } catch (error: any) {
      ResponseController.failed(res, error);
    }
  };

  static postNilai = async (req: Request, res: Response) => {
    const payload: Prisma.NilaiCreateInput = req.body;
    try {
      const response = await prisma.nilai.create({ data: payload });
      res.status(200).json({
        status: true,
        message: ResponseController.message.SUCCESS_CREATE_DATA,
        data: response
      });
    } catch (error: any) {
      ResponseController.failed(res, error);
    }
  };

  static putNilai = async (req: Request, res: Response) => {
    const nilai_id = Number(req.params.nilai_id);
    const payload: Prisma.NilaiCreateInput = req.body;
    try {
      const response = await prisma.nilai.update({ data: payload, where: { nilai_id } });
      res.status(200).json({
        status: true,
        message: ResponseController.message.SUCCESS_UPDATE_DATA,
        data: response
      });
    } catch (error: any) {
      ResponseController.failed(res, error);
    }
  };

  static deleteNilai = async (req: Request, res: Response) => {
    const nilai_id = Number(req.params.nilai_id);
    try {
      const response = await prisma.nilai.delete({ where: { nilai_id } });
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
