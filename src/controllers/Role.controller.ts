import { Request, Response } from "express";
import Role from "../models/Role.model";

// Método para traer todos los roles de la tabla Roles
export const mostrarRoles = async (req: Request, res: Response) => {

  try {
    const listadoRoles = await Role.findAll(); // Traer todos los datos
    res.json({ data: listadoRoles })
  } catch (error) {
    console.log(error)
  }

}

// Método para insertar un nuevo role
export const crearRole = async (req: Request, res: Response) => {

  try {
    const nuevoRol = await Role.create(req.body);
    res.json({ data: nuevoRol })
  } catch (error) {
    console.log(error);
  }

}

// Método para mostrar el rol solo por su ID
export const obtenerRolPorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // estudiantes/900

    const role = await Role.findByPk(id)

    if (!role) {
      return res.status(404).json({
        error: 'El rol no ha sido encontrado'
      })
    }

    res.json({ data: role })

  } catch (error) {
    console.log(error)
  }
}

// Método para eliminar el rol por su ID
export const borrarRol = async (req: Request, res: Response) => {
  const { id } = req.params
  const role = await Role.findByPk(id)

  if (!role) {
    return res.status(404).json({
      error: 'El rol no ha sido encontrado'
    })
  }

  await role.destroy()
  res.json({ data: 'El rol fue eliminado satisfactoriamente' })
}