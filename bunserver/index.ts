import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import statsRouter from './src/routes/statsRouter';

const port = 3001;

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/stats', statsRouter);

app.listen(port, () => {
  console.log(`Walking server is now running on port ${port}`);
});
