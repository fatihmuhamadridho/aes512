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

export class KriteriaController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const response = await prisma.kriteria.findMany({
        include: { AnalisaKriteria: true },
        orderBy: { AnalisaKriteria: { _count: 'desc' } }
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
    const kd_kriteria = String(req.params.kd_kriteria);
    try {
      const response = await prisma.kriteria.findUniqueOrThrow({ where: { kd_kriteria } });
      res.status(200).json({
        status: true,
        message: ResponseController.message.SUCCESS_GET_DATA,
        data: response
      });
    } catch (error: any) {
      ResponseController.failed(res, error);
    }
  };

  static postKriteria = async (req: Request, res: Response) => {
    const payload: Prisma.KriteriaCreateInput = req.body;
    try {
      const response = await prisma.kriteria.create({ data: payload });
      res.status(200).json({
        status: true,
        message: ResponseController.message.SUCCESS_CREATE_DATA,
        data: response
      });
    } catch (error: any) {
      ResponseController.failed(res, error);
    }
  };

  static putKriteria = async (req: Request, res: Response) => {
    const kd_kriteria = String(req.params.kd_kriteria);
    const payload: Prisma.KriteriaCreateInput = req.body;
    try {
      const response = await prisma.kriteria.update({ data: payload, where: { kd_kriteria } });
      res.status(200).json({
        status: true,
        message: ResponseController.message.SUCCESS_UPDATE_DATA,
        data: response
      });
    } catch (error: any) {
      ResponseController.failed(res, error);
    }
  };

  static deleteKriteria = async (req: Request, res: Response) => {
    const kd_kriteria = String(req.params.kd_kriteria);
    try {
      const response = await prisma.kriteria.delete({ where: { kd_kriteria } });
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
