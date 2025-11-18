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

// Necesario en Render/Vercel
app.set('trust proxy', 1);

// CORS: permite localhost y tu GitHub Pages
const allowedOrigins = [
  'http://localhost:5173',
  'https://adalolopez25.github.io',
  'https://adalolopez25.github.io/Re-Entry-Level',
  'https://adalolopez25.github.io/Re-Entry-Level/'
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

// Sesión segura (funciona en localhost y producción)
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'fallback-secret-muy-inseguro-cambiar-ya',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',   // true en Render
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 1000 * 60 * 60 * 24, //  // 24 horas
    },
  })
);

// Rutas
app.use('/api/users', userRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', time: new Date() });
});

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log('Base de datos conectada');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
      if (process.env.RENDER_EXTERNAL_URL) {
        console.log(`URL pública: ${process.env.RENDER_EXTERNAL_URL}`);
      }
    });
  })
  .catch((err) => {
    console.error('Error conectando a la base de datos:', err);
    process.exit(1);
  });