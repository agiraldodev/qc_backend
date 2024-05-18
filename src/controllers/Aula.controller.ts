import { Request, Response } from "express";
import Aula from "../models/Aula.model";

// Método para traer todas las Aulas de la tabla Aulas
export const mostrarAulas = async (req: Request, res: Response) => {

    try {
      const listadoAulas = await Aula.findAll(); // Traer todos los datos
      res.json({ data: listadoAulas })
    } catch (error) {
      console.log(error)
    }
  }
  
  // Método para insertar un nuevo usuario
  export const crearAula = async (req: Request, res: Response) => {
  
    try {
      const nuevaAula = await Aula.create(req.body);
      res.json({ data: nuevaAula })
    } catch (error) {
      console.log(error);
    }
  }
  
// Método para mostrar el Aula solo por su ID
export const obtenerAulaPorId = async (req: Request, res: Response) => {
    try {
      const { id } = req.params; // estudiantes/900
  
      const aula = await Aula.findByPk(id)
  
      if (!aula) {
        return res.status(404).json({
          error: 'El aula no ha sido encontrada'
        })
      }
  
      res.json({ data: aula })
  
    } catch (error) {
      console.log(error)
    }
  }
  
  // Actualizar un aula
  export const actualizarAula = async (req: Request, res: Response) => {
    const { id } = req.params
    const aula = await Aula.findByPk(id)
  
    if(!Aula) {
        return res.status(404).json({
            error: 'Aula no encontrada'
        })
    }
    
    // Actualizar el aula
    await aula.update(req.body)
    await aula.save()
    res.json({data: aula})
  }
  
  // Método para eliminar el aula por su ID
  export const borrarAula = async (req: Request, res: Response) => {
    const { id } = req.params
    const aula = await Aula.findByPk(id)
  
    if (!Aula) {
      return res.status(404).json({
        error: 'El aula no ha sido encontrada'
      })
    }
  
    await aula.destroy()
    res.json({ data: 'El aula fue eliminada satisfactoriamente' })
  }