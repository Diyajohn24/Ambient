import { Pool } from "pg";

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  connectionTimeoutMillis: 5000,  // ← fail after 5s instead of hanging
  idleTimeoutMillis: 30000,
});