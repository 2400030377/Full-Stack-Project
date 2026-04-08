import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { readJson, writeJson, LEADERS_FILE } from '../db.js';
import { addLog } from './logs.js';
import { requireAdmin } from '../auth-utils.js';

const router = express.Router();

router.get('/leaders', async (req, res) => {
  const leaders = await readJson(LEADERS_FILE, []);
  return res.json(leaders);
});

router.post('/leaders', requireAdmin, async (req, res) => {
  const { name, position, term, description, image } = req.body;
  if (!name || !position) {
    return res.status(400).json({ message: 'Name and position are required.' });
  }

  const leaders = await readJson(LEADERS_FILE, []);
  const newLeader = {
    id: uuidv4(),
    name,
    position,
    term: term || '',
    description: description || '',
    image: image || '',
    createdAt: new Date().toISOString(),
  };

  leaders.push(newLeader);
  await writeJson(LEADERS_FILE, leaders);
  await addLog('leader_created', name);
  return res.status(201).json(newLeader);
});

router.put('/leaders/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const leaders = await readJson(LEADERS_FILE, []);
  const index = leaders.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Leader entry not found.' });
  }
  leaders[index] = { ...leaders[index], ...updates };
  await writeJson(LEADERS_FILE, leaders);
  await addLog('leader_updated', leaders[index].name);
  return res.json(leaders[index]);
});

router.delete('/leaders/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;
  const leaders = await readJson(LEADERS_FILE, []);
  const index = leaders.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Leader entry not found.' });
  }
  const [deleted] = leaders.splice(index, 1);
  await writeJson(LEADERS_FILE, leaders);
  await addLog('leader_deleted', deleted.name);
  return res.json({ message: 'Leader entry deleted.' });
});

export default router;
