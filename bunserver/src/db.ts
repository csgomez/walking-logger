import { Database } from 'bun:sqlite';
import { nodeEnv } from './config';

const dbFilename = `db.${nodeEnv}.sqlite`;
const db = new Database(dbFilename, { create: true, strict: true });

// setup the tables
db.run(`CREATE TABLE IF NOT EXISTS walking_stats (
  id INTEGER PRIMARY KEY,
  duration INTEGER NOT NULL,
  distance REAL NOT NULL,
  calories INTEGER,
  note TEXT,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`);

// type representing the structure of walking stats in the database
export type DBWalkingStats = {
  id: number;
  duration: number;
  distance: number;
  calories?: number;
  note: string;
  date: string;
  craeted_at: string;
  updated_at: string;
};

export default db;
