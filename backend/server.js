import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import contentRoutes from './routes/content.js';
import leadersRoutes from './routes/leaders.js';
import logsRoutes from './routes/logs.js';

const app = express();
app.use(cors());
app.use(express.json());

// Add request logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', contentRoutes);
app.use('/api', leadersRoutes);
app.use('/api', logsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found.' });
});

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});
