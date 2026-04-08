export const DEFAULT_ADMIN = {
  id: 'admin-1',
  email: 'admin@constitution.gov',
  password: 'admin@123',
  fullName: 'Platform Administrator',
  role: 'admin',
};

export const ADMIN_TOKEN = 'admin-token-constitution-2026';

export function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '').trim();
  if (token !== ADMIN_TOKEN) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
}

export function sanitizeUser(user) {
  const { password, ...rest } = user;
  return rest;
}
