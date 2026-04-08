import express from 'express';
import { readJson, writeJson, LOGS_FILE } from '../db.js';
import { requireAdmin } from '../auth-utils.js';

const router = express.Router();

export async function addLog(type, message) {
  const logs = await readJson(LOGS_FILE, []);
  logs.push({
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    type,
    message,
    timestamp: new Date().toISOString(),
  });
  await writeJson(LOGS_FILE, logs);
}

router.get('/logs', requireAdmin, async (req, res) => {
  const logs = await readJson(LOGS_FILE, []);
  res.json(logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
});

export default router;
