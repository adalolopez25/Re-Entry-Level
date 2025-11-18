// src/index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import { AppDataSource } from './db/data-source';
import userRoutes from './routes/userRoutes';
import { logger } from './middleware/logger';

dotenv.config();

const app = express();

// Trust proxy (Vercel, Render)
app.set('trust proxy', 1);

// CORS: permite frontend en local y producción
const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL || 'https://tu-app.vercel.app'
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.some(o => origin.startsWith(o))) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(logger);

// SESIÓN SEGURA
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'fallback-secret-change-in-prod',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24, // 24h
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    },
  })
);

// Rutas
app.use('/api/users', userRoutes);

// Health check
app.get('/health', (req, res) => res.json({ status: 'OK', time: new Date() }));

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log(process.env.DB_USER)
    console.log('Base de datos conectada');
    app.listen(PORT, () => {
      console.log(`Servidor en http://localhost:${PORT}`);
      if (process.env.RENDER_EXTERNAL_URL) {
        console.log(`URL pública: ${process.env.RENDER_EXTERNAL_URL}`);
      }
    });
  })
  .catch((err) => {
    console.error('Error de DB:', err);
    process.exit(1);
  });