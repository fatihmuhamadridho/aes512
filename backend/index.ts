import { default as express } from 'express';
import { default as bodyParser } from 'body-parser';
import { default as cors } from 'cors';
import router from './src/routes/routes';

const app = express();
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};
const PORT = process.env.PORT || 4003;

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: 1000000000 }));
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is successfully running on port http://localhost:${PORT}`);
});
