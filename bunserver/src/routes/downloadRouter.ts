import express from 'express';
import { SQLiteError } from 'bun:sqlite';
import db, { type DBWalkingStats } from '../db';
import { StatusCodes } from 'http-status-codes';
import { getWalkingStatsFileName } from '../utils';
import path from 'path';
import { tmpdir } from 'os';
import { unlink } from 'fs';

const downloadRouter = express.Router();

// writes file to `/tmp` directory
downloadRouter.get('/', async (_, res) => {
  const getAllStatsQuery = db.query(`SELECT * FROM walking_stats`);
  try {
    const stats = getAllStatsQuery.all() as DBWalkingStats[];

    console.log(stats);

    // Transform ISO8601 date strings to local date strings
    const formattedStats = stats.map((stat) => ({
      ...stat,
      date: new Date(stat.date).toLocaleDateString(),
    }));

    const serializedWalkingStats = JSON.stringify(formattedStats, null, 2);

    const filename = getWalkingStatsFileName();
    const filepath = path.join(tmpdir(), filename);

    await Bun.write(filepath, serializedWalkingStats);

    // https://github.com/eligrey/FileSaver.js/wiki/Saving-a-remote-file#using-http-header
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.setHeader('Content-Type', 'application/octet-stream; charset=utf-8');
    res.setHeader('X-Filename', filename);

    return res.status(StatusCodes.ACCEPTED).sendFile(filepath, () => {
      // delete the file after the user downloads it
      unlink(filepath, (err) => {
        if (err) throw err;
      });
    });
  } catch (error) {
    if (error instanceof SQLiteError) {
      console.error('BunSQLite error getting stats:', error.message);
    } else {
      console.error('Error getting stats:', error);
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'Server error generating stats file.',
    });
  }
});

export default downloadRouter;
