import { Request, Response, default as express } from 'express';

// IMPORT ROUTER IMAGE
import imgRouter from './img.routes';

// IMPORT VERSION 1
import userRouter from './v1/user.routes';
import resetRouter from './v1/reset.routes';
import dummyRouter from './v1/dummy.routes';
import roleRouter from './v1/role.routes';
import syncRouter from './v1/sync.routes';

import packageQuizRouter from './v1/RajaUjian/packageQuiz.routes';
import quizRouter from './v1/RajaUjian/quiz.routes';
import userProgressRouter from './v1/RajaUjian/userProgress.routes';
import authRouter from './v1/auth.routes';

import ftpRouter from './v1/ftp.routes';

import sertifAlgoQuiz from './v1/SertifAlgo/quiz.routes';
import sertifAlgoGallery from './v1/SertifAlgo/gallery.routes';
import routerPuppeteer from './v1/SertifAlgo/puppeteer.routes';

import backupRouter from './v1/backup.routes';

import eleceedChapterRouter from './v1/EleceedID/eleceedChapter.routes';

// SPK AHP
import spkAhpKarywanRouter from './v1/SpkAhp/karyawan.routes';
import spkAhpUserRouter from './v1/SpkAhp/user.routes';
import spkAhpKriteriaRouter from './v1/SpkAhp/kriteria.routes';
import spkAhpSubkriteriaRouter from './v1/SpkAhp/subkriteria.routes';
import spkAhpCategoryKriteriaRouter from './v1/SpkAhp/categoryKriteria.routes';
// import spkAhpAlternatifRouter from './v1/SpkAhp/alternatif.routes';
import spkAhpBobotAlternatifRouter from './v1/SpkAhp/bobotAlternatif.routes';
import spkAhpAuthRouter from './v1/SpkAhp/auth.routes';

// AES 512
import aes512AuthRouter from './v1/Aes512/auth.routes';
import aes512UserRouter from './v1/Aes512/user.routes';
import aes512FileRouter from './v1/Aes512/file.routes';
import aes512DashboardRouter from './v1/Aes512/dashboard.routes';

// IMPORT VERSION 2
import packageQuizRouter2 from './v2/RajaUjian2/packageQuiz.routes';
import quizRouter2 from './v2/RajaUjian2/quiz.routes';
import tryoutSessionRouter2 from './v2/RajaUjian2/tryoutSession.routes';
import userAnswerRouter2 from './v2/RajaUjian2/userAnswer.routes';

// SPK AHP 2
import spkAhp2AuthRouter from './v2/SpkAhp2/auth.routes';
import spkAhp2UserRouter from './v2/SpkAhp2/user.routes';
import spkAhp2KriteriaRouter from './v2/SpkAhp2/kriteria.routes';
import spkAhp2AttributeRouter from './v2/SpkAhp2/attribute.routes';
import spkAhp2AlternatifRouter from './v2/SpkAhp2/alternatif.routes';
import spkAhp2AnalisaKriteriaRouter from './v2/SpkAhp2/analisaKriteria.routes';
import spkAhp2AnalisaAlternatifRouter from './v2/SpkAhp2/analisaAlternatif.routes';

const router = express();

// // ROUTER IMAGE
// router.use(imgRouter);

// // ROUTER VERSION 1
// router.use(userRouter);
// router.use(resetRouter);
// router.use(dummyRouter);
// router.use(roleRouter);
// router.use(syncRouter);
// router.use(authRouter);

// router.use(packageQuizRouter);
// router.use(quizRouter);
// router.use(userProgressRouter);

// router.use(ftpRouter);

// router.use(sertifAlgoQuiz);
// router.use(sertifAlgoGallery);
// router.use(routerPuppeteer);

// router.use(backupRouter);

// router.use(eleceedChapterRouter);

// // SPK AHP ROUTER VERSION 1
// router.use(spkAhpKarywanRouter);
// router.use(spkAhpUserRouter);
// router.use(spkAhpKriteriaRouter);
// router.use(spkAhpSubkriteriaRouter);
// router.use(spkAhpCategoryKriteriaRouter);
// // router.use(spkAhpAlternatifRouter);
// router.use(spkAhpBobotAlternatifRouter);
// router.use(spkAhpAuthRouter);

// AES 512 ROUTER VERSION 1
router.use(aes512AuthRouter);
router.use(aes512UserRouter);
router.use(aes512FileRouter);
router.use(aes512DashboardRouter);

// ROUTER VERSION 2
// router.use(packageQuizRouter2);
// router.use(quizRouter2);
// router.use(tryoutSessionRouter2);
// router.use(userAnswerRouter2);

// SPK AHP
router.use(spkAhp2AuthRouter);
router.use(spkAhp2UserRouter);
router.use(spkAhp2KriteriaRouter);
router.use(spkAhp2AttributeRouter);
router.use(spkAhp2AlternatifRouter);
router.use(spkAhp2AnalisaKriteriaRouter);
router.use(spkAhp2AnalisaAlternatifRouter);

router.use('/', (req: Request, res: Response) => {
  res.status(500).json({
    code: res.statusCode,
    status: false,
    message: 'Your endpoint is incorrect, please recheck about your endpoint..',
    env: process.env.NODE_ENV
  });
});

export default router;
