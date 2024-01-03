import { PrismaClient } from '@prisma/client';
import type { Prisma } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      fullname: 'admin',
      username: 'admin',
      password: 'admin',
      access_token: 'admin',
      first_login: false
    }
  });

  await prisma.nilai.createMany({
    data: [
      {
        jum_nilai: 0.5,
        ket_nilai: '1 bagi mendekati sedikit lebih penting dari'
      },
      {
        jum_nilai: 2,
        ket_nilai: 'Mendekati sedikit lebih penting dari'
      },
      {
        jum_nilai: 3,
        ket_nilai: 'Sedikit lebih penting dari'
      },
      {
        jum_nilai: 4,
        ket_nilai: 'Mendekati lebih penting dari'
      },
      {
        jum_nilai: 5,
        ket_nilai: 'Lebih penting dari'
      },
      {
        jum_nilai: 6,
        ket_nilai: 'Mendekati sangat penting dari'
      },
      {
        jum_nilai: 7,
        ket_nilai: 'Sangat penting dari'
      },
      {
        jum_nilai: 8,
        ket_nilai: 'Mendekati mutlak dari'
      },
      {
        jum_nilai: 9,
        ket_nilai: 'Mutlak sangat penting dari'
      }
    ]
  });

  await prisma.kriteria.createMany({
    data: [
      {
        kd_kriteria: 'KR001',
        nm_kriteria: 'Absensi',
        bobot_kriteria: 0
      },
      {
        kd_kriteria: 'KR002',
        nm_kriteria: 'Produktivitas',
        bobot_kriteria: 0
      },
      {
        kd_kriteria: 'KR003',
        nm_kriteria: 'Kerja Sama',
        bobot_kriteria: 0
      }
    ]
  });

  await prisma.alternatif.create({
    data: {
      id_karyawan: 'PG001',
      nama: 'Fatih Muhamad Ridho',
      gender: 'PRIA'
    }
  });

  await prisma.analisaKriteria.createMany({
    data: [
      {
        kd_kriteria: 'KR001',
        kd_kriteria_pembanding: 'KR002',
        nilai_id: 2
      },
      {
        kd_kriteria: 'KR001',
        kd_kriteria_pembanding: 'KR003',
        nilai_id: 3
      },
      {
        kd_kriteria: 'KR002',
        kd_kriteria_pembanding: 'KR003',
        nilai_id: 2
      }
    ]
  });

  await prisma.kriteria.update({
    data: { bobot_kriteria: 0.55 },
    where: { kd_kriteria: 'KR001' }
  });
  await prisma.kriteria.update({
    data: { bobot_kriteria: 0.77 },
    where: { kd_kriteria: 'KR002' }
  });
  await prisma.kriteria.update({
    data: { bobot_kriteria: 0.55 },
    where: { kd_kriteria: 'KR003' }
  });

  await prisma.nilaiAkhir.createMany({
    data: [
      {
        id_karyawan: 'PG001',
        kd_kriteria: 'KR001',
        jumlah_alt_kriteria: 2,
        skor_alt_kriteria: 1.1
      },
      {
        id_karyawan: 'PG001',
        kd_kriteria: 'KR002',
        jumlah_alt_kriteria: 2,
        skor_alt_kriteria: 1.54
      },
      {
        id_karyawan: 'PG001',
        kd_kriteria: 'KR003',
        jumlah_alt_kriteria: 2,
        skor_alt_kriteria: 1.1
      }
    ]
  });
}

main();
