// src/routes/userRoutes.ts
import { Router } from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
  updateProfile,
} from '../controllers/userControllers';
import { isAuthenticated } from '../middleware/auth';

const router = Router();

// Rutas públicas
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

// Rutas protegidas
router.get('/profile', isAuthenticated, getProfile);
router.put('/profile', isAuthenticated, updateProfile);

export default router;