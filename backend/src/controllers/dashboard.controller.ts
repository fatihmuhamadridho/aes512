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

export class Aes512_DashboardController {
  static getAll = async (req: Request, res: Response) => {
    const access_token = req.headers.authorization?.split(' ')[1];
    try {
      const userAccess = await prisma.user.findFirstOrThrow({
        where: { access_token: access_token! }
      });
      const user = await prisma.user.count({
        where: userAccess.username !== 'admin' ? { username: { not: 'admin' } } : undefined
      });
      const encrypted_file = await prisma.file.count({
        where: { status: 'ENCRYPTED', userUser_id: userAccess?.user_id }
      });
      const decrypted_file = await prisma.file.count({
        where: { status: 'DECRYPTED', userUser_id: userAccess?.user_id }
      });
      res.status(200).json({
        status: true,
        message: ResponseController.message.SUCCESS_GET_DATA,
        data: {
          user,
          encrypted_file,
          decrypted_file
        }
      });
    } catch (error: any) {
      ResponseController.failed(res, error);
    }
  };
}
