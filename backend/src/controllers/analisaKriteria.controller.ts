import { Request, Response } from 'express';
import { PaginationController } from './pagination.controller';
import { ResponseController } from './response.controller';
import { PrismaClient } from '@prisma/client';
import type { Prisma } from '@prisma/client';
import { AHP } from '../libs/ahp';

const prisma = new PrismaClient();

interface queryProps {
  username?: string;
  page?: number;
  limit?: number;
}

export class AnalisaKriteriaController {
  static createPairwiseMatrix(data: any[]): number[][] {
    const criteriaSet = new Set<string>();
    for (const entry of data) {
      criteriaSet.add(entry.kd_kriteria);
      criteriaSet.add(entry.kd_kriteria_pembanding);
    }

    const criteriaList = Array.from(criteriaSet);
    const matrixSize = criteriaList.length;
    const pairwiseMatrix: number[][] = Array.from(Array(matrixSize), () =>
      Array(matrixSize).fill(1)
    );

    for (const entry of data) {
      const i = criteriaList.indexOf(entry.kd_kriteria);
      const j = criteriaList.indexOf(entry.kd_kriteria_pembanding);

      const value = entry.Nilai.jum_nilai;
      pairwiseMatrix[i][j] = value;
      pairwiseMatrix[j][i] = 1 / value;
    }

    return pairwiseMatrix;
  }

  static getAll = async (req: Request, res: Response) => {
    try {
      const response = await prisma.analisaKriteria.findMany({
        include: { Kriteria: true, Nilai: true }
      });
      const matriks = this.createPairwiseMatrix(response);
      const ahp = new AHP(matriks);
      const consistency = ahp.calculateAHP();
      res.status(200).json({
        status: true,
        message: ResponseController.message.SUCCESS_GET_DATA,
        data: {
          analisa: response,
          consistency: response.length > 0 ? consistency : null
        }
      });
    } catch (error: any) {
      ResponseController.failed(res, error);
    }
  };

  static postAnalisaKriteria = async (req: Request, res: Response) => {
    const { data, kriteria }: { data: Prisma.AnalisaKriteriaCreateManyInput; kriteria: any[] } =
      req.body;
    try {
      const response = await prisma.analisaKriteria.createMany({ data: data });
      await Promise.all(
        kriteria.map(async (item: any) => {
          await prisma.kriteria.update({ data: item, where: { kd_kriteria: item.kd_kriteria } });
        })
      );
      res.status(200).json({
        status: true,
        message: ResponseController.message.SUCCESS_CREATE_DATA,
        data: response
      });
    } catch (error: any) {
      ResponseController.failed(res, error);
    }
  };

  static checkConsistency = async (req: Request, res: Response) => {
    const payload: any = req.body;
    try {
      const ahp = new AHP(payload.data);
      const consistency = ahp.calculateAHP();
      res.status(200).json({
        status: true,
        message: ResponseController.message.SUCCESS_CREATE_DATA,
        data: consistency
      });
    } catch (error: any) {
      ResponseController.failed(res, error);
    }
  };

  static reset = async (req: Request, res: Response) => {
    try {
      const kriteria = await prisma.kriteria.findMany();
      await Promise.all(
        kriteria.map(async (item) => {
          await prisma.kriteria.update({
            data: { bobot_kriteria: 0 },
            where: { kd_kriteria: item.kd_kriteria }
          });
        })
      );
      await prisma.analisaKriteria.deleteMany();
      res.status(200).json({
        status: true,
        message: ResponseController.message.SUCCESS_CREATE_DATA
      });
    } catch (error: any) {
      ResponseController.failed(res, error);
    }
  };
}
