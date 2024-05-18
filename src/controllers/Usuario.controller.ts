import { Request, Response } from "express";
import Usuario from "../models/Usuario.model";
import { body, validationResult } from 'express-validator';
import { TipoDocumento } from "../models/Usuario.model";

// Método para traer todos los usuarios de la tabla Usuario
export const mostrarUsuarios = async (req: Request, res: Response) => {

    try {
      const listadoUsuarios = await Usuario.findAll(); // Traer todos los datos
      res.json({ data: listadoUsuarios })
    } catch (error) {
      console.log(error)
    }
  }
  
  // Método para insertar un nuevo usuario
  export const crearUsuario = async (req: Request, res: Response) => {

    // Validar los datos de entrada
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }

    // Verificar si ya existe un usuario con el mismo correo electrónico o número de documento
    const { correo, numDocumento } = req.body;
    const existingUsuario = await Usuario.findOne({ where: { correo } });
    if (existingUsuario) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
    }
    const existingDocumento = await Usuario.findOne({ where: { numDocumento } });
    if (existingDocumento) {
      return res.status(400).json({ error: 'El número de documento ya está registrado' });
    }
  
    try {
      const nuevoUsuario = await Usuario.create(req.body);
      res.json({ data: nuevoUsuario })
    } catch (error) {
      console.log(error);
    }
  }
  
// Método para mostrar el rol solo por su ID
export const obtenerUsuarioPorId = async (req: Request, res: Response) => {
    try {
      const { id } = req.params; // estudiantes/900
  
      const usuario = await Usuario.findByPk(id)
  
      if (!usuario) {
        return res.status(404).json({
          error: 'El usuario no ha sido encontrado'
        })
      }
  
      res.json({ data: usuario })
  
    } catch (error) {
      console.log(error)
    }
  }
  
  // Actualizar un usuario
  export const actualizarUsuario = async (req: Request, res: Response) => {
    const { id } = req.params
    const usuario = await Usuario.findByPk(id)
  
    if(!Usuario) {
        return res.status(404).json({
            error: 'Usuario no encontrado'
        })
    }
    
    // Actualizar el usuario
    await usuario.update(req.body)
    await usuario.save()
    res.json({data: usuario})
  }
  
  // Método para eliminar el usuario por su ID
  export const borrarUsuario = async (req: Request, res: Response) => {
    const { id } = req.params
    const usuario = await Usuario.findByPk(id)
  
    if (!Usuario) {
      return res.status(404).json({
        error: 'El usuario no ha sido encontrado'
      })
    }
  
    await usuario.destroy()
    res.json({ data: 'El usuario fue eliminado satisfactoriamente' })
  }

  export const validateUsuario = [
    body('tipoDocumento').isIn(Object.values(TipoDocumento)),
    body('numDocumento').isString().notEmpty(),
    body('primerNombre').isString().isLength({ min: 3 }),
    body('segundoNombre').isString().optional(),
    body('primerApellido').isString().isLength({ min: 3 }),
    body('segundoApellido').isString().optional(),
    body('fechaNacimiento').isDate(),
    body('telefono').isString().notEmpty(),
    body('correo').isEmail(),
    body('clave').isString().isLength({ min: 4 }),
    body('direccion').isString().notEmpty(),
    body('rolId').isInt().notEmpty(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];