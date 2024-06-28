import { Database } from 'bun:sqlite';

type Env = 'testing' | 'development' | 'production';

const nodeEnv = import.meta.env.NODE_ENV || '';

const isNodeEnvValid = (envValue: string) =>
  ['development', 'production', 'testing'].includes(nodeEnv);

// if NODE_ENV isn't set to a proper value, exit the app
if (!nodeEnv || !isNodeEnvValid(nodeEnv)) {
  console.error(`Invalid NODE_ENV: ${nodeEnv}`);
  process.exit(1);
}

const dbFilename = `db.${nodeEnv}.sqlite`;
const db = new Database(dbFilename, { create: true });

// setup the tables
db.run(`CREATE TABLE IF NOT EXISTS walking_stats (
  id INTEGER PRIMARY KEY,
  duration INTEGER NOT NULL,
  distance REAL NOT NULL,
  calories INTEGER,
  note TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`);

export default db;
