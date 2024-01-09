import { PrismaClient } from '@prisma/client';
import type { Prisma } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      fullname: 'admin',
      username: 'admin',
      password: 'admin',
      access_token: 'admin'
    }
  });
}

main();
