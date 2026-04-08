import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { readJson, writeJson, CONTENT_FILE } from '../db.js';
import { addLog } from './logs.js';
import { requireAdmin } from '../auth-utils.js';

const router = express.Router();

router.get('/content', async (req, res) => {
  const items = await readJson(CONTENT_FILE, []);
  return res.json(items);
});

router.get('/content/:id', async (req, res) => {
  const { id } = req.params;
  const items = await readJson(CONTENT_FILE, []);
  const item = items.find((entry) => entry.id === id);
  if (!item) {
    return res.status(404).json({ message: 'Content item not found.' });
  }
  return res.json(item);
});

router.post('/content', requireAdmin, async (req, res) => {
  const { title, summary, category, body, author } = req.body;
  if (!title || !summary) {
    return res.status(400).json({ message: 'Title and summary are required.' });
  }

  const items = await readJson(CONTENT_FILE, []);
  const newItem = {
    id: uuidv4(),
    title,
    summary,
    category: category || 'General',
    body: body || '',
    author: author || 'Admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'published',
  };

  items.push(newItem);
  await writeJson(CONTENT_FILE, items);
  await addLog('content_created', newItem.title);
  return res.status(201).json(newItem);
});

router.put('/content/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const items = await readJson(CONTENT_FILE, []);
  const index = items.findIndex((entry) => entry.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Content item not found.' });
  }
  items[index] = { ...items[index], ...updates, updatedAt: new Date().toISOString() };
  await writeJson(CONTENT_FILE, items);
  await addLog('content_updated', items[index].title);
  return res.json(items[index]);
});

router.delete('/content/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;
  const items = await readJson(CONTENT_FILE, []);
  const index = items.findIndex((entry) => entry.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Content item not found.' });
  }
  const [deleted] = items.splice(index, 1);
  await writeJson(CONTENT_FILE, items);
  await addLog('content_deleted', deleted.title);
  return res.json({ message: 'Content item deleted.' });
});

export default router;
