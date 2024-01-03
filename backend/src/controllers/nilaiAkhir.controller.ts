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

export class NilaiAkhirController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const response = await prisma.alternatif.findMany({
        where: { NilaiAkhir: { some: { skor_alt_kriteria: { not: 0 } } } },
        include: { NilaiAkhir: { orderBy: { Kriteria: { AnalisaKriteria: { _count: 'desc' } } } } }
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
    const nilai_akhir_id = Number(req.params.nilai_akhir_id);
    try {
      const response = await prisma.nilaiAkhir.findUniqueOrThrow({ where: { nilai_akhir_id } });
      res.status(200).json({
        status: true,
        message: ResponseController.message.SUCCESS_GET_DATA,
        data: response
      });
    } catch (error: any) {
      ResponseController.failed(res, error);
    }
  };

  static postNilaiAkhir = async (req: Request, res: Response) => {
    const payload: any = req.body;
    console.log({ payload });
    try {
      await prisma.$queryRawUnsafe('TRUNCATE TABLE NilaiAkhir;');
      await Promise.all(
        payload?.data?.map(async (row: any) => {
          await Promise.all(
            row.NilaiAkhir.map(async (item: any) => {
              await prisma.alternatif.update({
                data: {
                  NilaiAkhir: {
                    upsert: {
                      where: { nilai_akhir_id: item?.nilai_akhir_id || 0 },
                      create: {
                        kd_kriteria: item.kd_kriteria,
                        skor_alt_kriteria: item.skor_alt_kriteria,
                        jumlah_alt_kriteria: item.jumlah_alt_kriteria
                      },
                      update: {
                        kd_kriteria: item.kd_kriteria,
                        skor_alt_kriteria: item.skor_alt_kriteria,
                        jumlah_alt_kriteria: item.jumlah_alt_kriteria
                      }
                    }
                  }
                },
                where: { id_karyawan: row.id_karyawan }
              });
            })
          );
        })
      );
      res.status(200).json({
        status: true,
        message: ResponseController.message.SUCCESS_CREATE_DATA
        // data: response
      });
    } catch (error: any) {
      ResponseController.failed(res, error);
    }
  };

  static putNilaiAkhir = async (req: Request, res: Response) => {
    const nilai_akhir_id = Number(req.params.nilai_akhir_id);
    const payload: Prisma.NilaiAkhirCreateInput = req.body;
    try {
      const response = await prisma.nilaiAkhir.update({ data: payload, where: { nilai_akhir_id } });
      res.status(200).json({
        status: true,
        message: ResponseController.message.SUCCESS_UPDATE_DATA,
        data: response
      });
    } catch (error: any) {
      ResponseController.failed(res, error);
    }
  };

  static deleteNilaiAkhir = async (req: Request, res: Response) => {
    const nilai_akhir_id = Number(req.params.nilai_akhir_id);
    try {
      const response = await prisma.nilaiAkhir.delete({ where: { nilai_akhir_id } });
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
