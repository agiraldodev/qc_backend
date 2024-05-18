import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import Role from "./Role.model";
import Aula from "./Aula.model";
import { Router } from "express";
import { body, validationResult } from 'express-validator';
enum TipoDocumento {
  RC = 'rc',
  TI = 'ti',
  CC = 'cc'
}
@Table({
  tableName: 'usuarios'
})

class Usuario extends Model {
  @Column({ type: DataType.ENUM(...Object.values(TipoDocumento)) })
  tipoDocumento: TipoDocumento;

  @Column({ type: DataType.STRING(100) })
  numDocumento: string;

  @Column({ type: DataType.STRING(100) })
  primerNombre: string;

  @Column({ type: DataType.STRING(100) })
  segundoNombre: string;

  @Column({ type: DataType.STRING(100) })
  primerApellido: string;

  @Column({ type: DataType.STRING(100) })
  segundoApellido: string;

  @Column({ type: DataType.DATE() })
  fechaNacimiento: Date;

  @Column({ type: DataType.STRING(100) })
  telefono: string;

  @Column({ type: DataType.STRING(100) })
  correo: string;

  @Column({ type: DataType.STRING(100) })
  clave: string;

  @Column({ type: DataType.STRING(100) })
  direccion: string;

  @ForeignKey(() => Role)
  @Column({type: DataType.INTEGER})
  rolId: number

  @BelongsTo(() => Role)
  rol: Role

  @HasMany (() => Aula)
  aula: Aula[];
}

export const validateUsuario = [
  body('tipoDocumento').isIn(Object.values(TipoDocumento)),
  body('numDocumento').isString().notEmpty(),
  body('primerNombre').isString().notEmpty(),
  body('segundoNombre').isString().optional(),
  body('primerApellido').isString().notEmpty(),
  body('segundoApellido').isString().optional(),
  body('fechaNacimiento').isDate(),
  body('telefono').isString().notEmpty(),
  body('correo').isEmail(),
  body('clave').isString().notEmpty(),
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

export default Usuario;