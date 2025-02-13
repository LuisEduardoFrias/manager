import jwt from 'jsonwebtoken'

import { SECRET_JWT_KEY } from "./config_consts.js";

export default function middlewares(req, res, next) {
  let token = req.headers['authorization'] || req.cookies.access_token;

  if (token) {
    const parts = token.split(' ');
    if (parts.length === 2) {
      token = parts[1];
    }
    token = token.trim();
  }

  Reflect.set(req, 'session', { user: null });

  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  try {
    const data = jwt.verify(token, SECRET_JWT_KEY);
    Reflect.set(req, 'session', { user: data.user });

  } catch (error) {
    console.error("Error al verificar el token:", error);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token expirado" });
    } else {
      return res.status(401).json({ message: "Token inválido" });
    }
  }

  if (!req.session.user) {
    return res.status(401).json({ message: "Usuario no autorizado" });
  }

  next();
}
