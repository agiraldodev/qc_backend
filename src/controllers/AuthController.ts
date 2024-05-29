import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Usuario from "../models/Usuario.model";
import { body, validationResult } from 'express-validator';

// Llave secreta para firmar los tokens JWT
const JWT_SECRET = 'tu_secreta_llave';

export const register = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { correo, numDocumento, clave } = req.body;
  const existingUsuario = await Usuario.findOne({ where: { correo } });
  if (existingUsuario) {
    return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
  }
  const existingDocumento = await Usuario.findOne({ where: { numDocumento } });
  if (existingDocumento) {
    return res.status(400).json({ error: 'El número de documento ya está registrado' });
  }

  try {
    const hashedPassword = await bcrypt.hash(clave, 10);
    const nuevoUsuario = await Usuario.create({ ...req.body, clave: hashedPassword });
    res.json({ data: nuevoUsuario });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

export const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { correo, clave } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario) {
      return res.status(400).json({ error: 'Correo o contraseña incorrectos' });
    }

    const esValida = await bcrypt.compare(clave, usuario.clave);
    if (!esValida) {
      return res.status(400).json({ error: 'Correo o contraseña incorrectos' });
    }

    const token = jwt.sign({ id: usuario.id, correo: usuario.correo }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

// Validaciones para el registro y login
export const validateRegister = [
  body('correo').isEmail(),
  body('clave').isString().isLength({ min: 4 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateLogin = [
  body('correo').isEmail(),
  body('clave').isString().isLength({ min: 4 }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
