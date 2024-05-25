import { Request, Response } from "express";
import Asistencia from "../models/Asistencia.model";

// Método para traer todas las Asistencias de la tabla Asistencia
export const mostrarAsistencias = async (req: Request, res: Response) => {

    try {
      const listadoAsistencias = await Asistencia.findAll(); // Traer todos los datos
      res.json({ data: listadoAsistencias })
    } catch (error) {
      console.log(error)
    }
  }
  
  // Método para insertar una nueva asistencia
  export const crearAsistencia = async (req: Request, res: Response) => {
  
    try {
      const nuevaAsistencia = await Asistencia.create(req.body);
      res.json({ data: nuevaAsistencia })
    } catch (error) {
      console.log(error);
    }
  }
  
// Método para mostrar la asistencia solo por su ID
export const obtenerAsistenciaPorId = async (req: Request, res: Response) => {
    try {
      const { id } = req.params; // estudiantes/900
  
      const asistencia = await Asistencia.findByPk(id)
  
      if (!asistencia) {
        return res.status(404).json({
          error: 'El asistencia no ha sido encontrada'
        })
      }
  
      res.json({ data: asistencia })
  
    } catch (error) {
      console.log(error)
    }
  }
  
  // Actualizar un asistencia
  export const actualizarAsistencia = async (req: Request, res: Response) => {
    const { id } = req.params
    const asistencia = await Asistencia.findByPk(id)
  
    if(!Asistencia) {
        return res.status(404).json({
            error: 'Asistencia no encontrada'
        })
    }
    
    // Actualizar el Asistencia
    await asistencia.update(req.body)
    await asistencia.save()
    res.json({data: asistencia})
  }
  
  // Método para eliminar el Asistencia por su ID
  export const borrarAsistencia = async (req: Request, res: Response) => {
    const { id } = req.params
    const asistencia = await Asistencia.findByPk(id)
  
    if (!Asistencia) {
      return res.status(404).json({
        error: 'La Asistencia no ha sido encontrada'
      })
    }
  
    await asistencia.destroy()
    res.json({ data: 'La Asistencia fue eliminada satisfactoriamente' })
  }