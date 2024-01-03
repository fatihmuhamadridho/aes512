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

export class AlternatifController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const response = await prisma.alternatif.findMany({ include: { NilaiAkhir: true } });
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
    const id_karyawan = String(req.params.id_karyawan);
    try {
      const response = await prisma.alternatif.findUniqueOrThrow({ where: { id_karyawan } });
      res.status(200).json({
        status: true,
        message: ResponseController.message.SUCCESS_GET_DATA,
        data: response
      });
    } catch (error: any) {
      ResponseController.failed(res, error);
    }
  };

  static postAlternatif = async (req: Request, res: Response) => {
    const payload: Prisma.AlternatifCreateInput = req.body;
    try {
      const response = await prisma.alternatif.create({ data: payload });
      res.status(200).json({
        status: true,
        message: ResponseController.message.SUCCESS_CREATE_DATA,
        data: response
      });
    } catch (error: any) {
      ResponseController.failed(res, error);
    }
  };

  static putAlternatif = async (req: Request, res: Response) => {
    const id_karyawan = String(req.params.id_karyawan);
    const payload: Prisma.AlternatifCreateInput = req.body;
    try {
      const response = await prisma.alternatif.update({ data: payload, where: { id_karyawan } });
      res.status(200).json({
        status: true,
        message: ResponseController.message.SUCCESS_UPDATE_DATA,
        data: response
      });
    } catch (error: any) {
      ResponseController.failed(res, error);
    }
  };

  static deleteAlternatif = async (req: Request, res: Response) => {
    const id_karyawan = String(req.params.id_karyawan);
    try {
      const response = await prisma.alternatif.delete({ where: { id_karyawan } });
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
