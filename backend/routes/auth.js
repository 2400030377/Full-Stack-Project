import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { readJson, writeJson, USERS_FILE } from '../db.js';
import { addLog } from './logs.js';

const router = express.Router();

function sanitizeUser(user) {
  const { password, ...rest } = user;
  return rest;
}

router.post('/auth/signup', async (req, res) => {
  const { email, password, fullName, role = 'citizen' } = req.body;

  if (!email || !password || !fullName) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }

  const users = await readJson(USERS_FILE, []);
  const duplicate = users.find((user) => user.email.toLowerCase() === email.toLowerCase());
  if (duplicate) {
    return res.status(409).json({ message: 'A user with this email already exists.' });
  }

  const newUser = {
    id: uuidv4(),
    email,
    password,
    fullName,
    role,
    createdAt: new Date().toISOString(),
    token: uuidv4(),
  };

  users.push(newUser);
  await writeJson(USERS_FILE, users);
  await addLog('user_signup', `${fullName} (${email})`);

  return res.status(201).json(sanitizeUser(newUser));
});

router.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const users = await readJson(USERS_FILE, []);
  const found = users.find((user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password);

  if (!found) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  await addLog('user_login', `${found.fullName} (${found.email})`);
  return res.json(sanitizeUser(found));
});

export default router;
