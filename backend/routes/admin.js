import express from 'express';
import { readJson, writeJson, USERS_FILE, CONTENT_FILE, LEADERS_FILE, LOGS_FILE } from '../db.js';
import { addLog } from './logs.js';
import { DEFAULT_ADMIN, ADMIN_TOKEN, requireAdmin, sanitizeUser } from '../auth-utils.js';

const router = express.Router();

router.post('/admin/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  if (email.toLowerCase() !== DEFAULT_ADMIN.email || password !== DEFAULT_ADMIN.password) {
    return res.status(401).json({ message: 'Invalid admin credentials.' });
  }

  await addLog('admin_login', `${DEFAULT_ADMIN.fullName} (${DEFAULT_ADMIN.email})`);
  const { password: _pw, ...adminWithoutPassword } = DEFAULT_ADMIN;
  return res.json({ ...adminWithoutPassword, token: ADMIN_TOKEN });
});

router.get('/admin/users', requireAdmin, async (req, res) => {
  const users = await readJson(USERS_FILE, []);
  return res.json(users.map(sanitizeUser));
});

router.patch('/admin/users/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const users = await readJson(USERS_FILE, []);
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found.' });
  }
  users[userIndex] = { ...users[userIndex], ...updates };
  await writeJson(USERS_FILE, users);
  await addLog('user_updated', `${users[userIndex].fullName} (${users[userIndex].email})`);
  return res.json(sanitizeUser(users[userIndex]));
});

router.delete('/admin/users/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;
  const users = await readJson(USERS_FILE, []);
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found.' });
  }
  const [deletedUser] = users.splice(userIndex, 1);
  await writeJson(USERS_FILE, users);
  await addLog('user_deleted', `${deletedUser.fullName} (${deletedUser.email})`);
  return res.json({ message: 'User deleted.' });
});

router.get('/admin/analytics', requireAdmin, async (req, res) => {
  const users = await readJson(USERS_FILE, []);
  const content = await readJson(CONTENT_FILE, []);
  const leaders = await readJson(LEADERS_FILE, []);
  const logs = await readJson(LOGS_FILE, []);

  const roles = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});

  return res.json({
    totals: {
      users: users.length,
      contentItems: content.length,
      leaders: leaders.length,
      logs: logs.length,
    },
    roles,
    recentActivity: logs.slice(-10).reverse(),
  });
});

export { ADMIN_TOKEN };
export default router;
