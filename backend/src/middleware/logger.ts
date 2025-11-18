import { Request, Response, NextFunction } from "express";


export const logger = (req: Request, res: Response, next: NextFunction) => {
  const now = new Date().toISOString();
  console.log(` [${now}] ${req.method} ${req.originalUrl}`);
  console.log(" Body:", req.body);

  if (req.session?.user) {
    console.log(" Usuario logueado:", req.session.user);
  } else {
    console.log(" No hay usuario logueado");
  }

  next();
};
