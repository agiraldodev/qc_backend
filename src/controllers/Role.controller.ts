import { Request, Response } from "express";
import Role from "../models/Role.model";

export const mostrarRoles = async (req: Request, res: Response) => {
  const listadoRoles = await Role.findAll()
  res.json(listadoRoles);
}

export const crearRole = async (req: Request, res: Response) => {
  
  const nuevoRole = new Role(req.body)
  await nuevoRole.save()
}