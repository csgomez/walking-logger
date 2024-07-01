import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import statsRouter from './src/routes/statsRouter';

const PORT = 3001;

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/stats', statsRouter);

app.listen(PORT, () => {
  console.log(`Walking server is now running on port ${PORT}`);
});
