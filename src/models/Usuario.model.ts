import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import Role from "./Role.model";
import Aula from "./Aula.model";


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

export default Usuario;