// src/controllers/userControllers.ts
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { AppDataSource } from "../db/data-source";
import { User } from "../models/User";

const userRepository = AppDataSource.getRepository(User);

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    const existing = await userRepository.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: "Correo ya registrado" });

    const hashed = await bcrypt.hash(password, 10);
    const user = userRepository.create({ name, email, password: hashed });
    await userRepository.save(user);

    res.json({ message: "Usuario creado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en registro" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Faltan credenciales" });

    const user = await userRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password']
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    req.session.user = { id: user.id, name: user.name, email: user.email };

    res.json({
      message: "Login exitoso",
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en login" });
  }
};

export const logoutUser = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Error al cerrar sesión" });
    res.clearCookie('connect.sid');
    res.json({ message: "Sesión cerrada" });
  });
};

export const getProfile = (req: Request, res: Response) => {
  if (!req.session.user) return res.status(401).json({ message: "No autorizado" });
  res.json(req.session.user);
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    if (!req.session.user) return res.status(401).json({ message: "No autorizado" });

    const { id } = req.session.user;
    const { name, email, currentPassword, newPassword } = req.body;

    const user = await userRepository.findOne({ where: { id } });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    if (newPassword) {
      if (!currentPassword) return res.status(400).json({ message: "Contraseña actual requerida" });
      const match = await bcrypt.compare(currentPassword, user.password);
      if (!match) return res.status(400).json({ message: "Contraseña actual incorrecta" });
      user.password = await bcrypt.hash(newPassword, 10);
    }

    user.name = name || user.name;
    user.email = email || user.email;

    await userRepository.save(user);
    req.session.user = { id: user.id, name: user.name, email: user.email };

    res.json({ message: "Perfil actualizado", user: req.session.user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar" });
  }
};