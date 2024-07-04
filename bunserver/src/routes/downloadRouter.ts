import express from 'express';
import { SQLiteError } from 'bun:sqlite';
import db from '../db';
import { StatusCodes } from 'http-status-codes';

const DownloadRouter = express.Router();

DownloadRouter.get('/', async (req, res) => {
  const getAllStatsQuery = db.query(`SELECT * FROM walking_stats`);
  try {
    const stats = getAllStatsQuery.all();
  } catch (error) {
    if (error instanceof SQLiteError) {
      console.error('BunSQLite error getting stats:', error.message);
    } else {
      console.error('Error getting stats:', error);
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'Internal server error',
    });
  }
});
