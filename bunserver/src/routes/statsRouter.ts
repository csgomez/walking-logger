import express from 'express';
import { statsSchema } from '../schemas/statsSchema';
import { ZodError } from 'zod';
import { StatusCodes } from 'http-status-codes';
import { validateStats } from '../middleware/validationMiddleware';
import db from '../db';

const statsRouter = express.Router();

// returns all the walking stats
statsRouter.get('/', async (req, res) => {
  const getAllStatsQuery = db.query(`SELECT * FROM walking_stats`);
  try {
    const results = getAllStatsQuery.all();
    console.log('Fetched all the stats...');
    console.log(results);

    return res.json(results);
  } catch (error) {
    console.error('Error getting all stats:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

statsRouter.post('/', validateStats, async (req, res) => {
  console.log('Handling a POST request in the statsRouter...');
  console.log(req.body);

  const body = req.body;

  const insertQuery = db.query(`INSERT INTO walking_stats (
      duration, distance, calories, note
    ) VALUES (
      $duration,
      $distance,
      $calories,
      $note
    )`);
  try {
    const result = insertQuery.run({
      duration: body.duration,
      distance: body.distance,
      calories: body.calories,
      note: body.note,
    });

    console.log('Successfully inserted data!!!');
    console.log(result);

    return res.status(StatusCodes.CREATED);
  } catch (error) {
    console.error('Error inserting values into database:', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error', message: 'Failed to insert new stats.' });
  }
});

export default statsRouter;
