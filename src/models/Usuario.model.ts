import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";

enum tipoDocumento {
  RC = 'rc',
  TI = 'ti',
  CC = 'cc'
}

@Table({
  tableName: 'usuarios'
})

class Usuario extends Model {
  @Column( { type: DataType.ENUM(...Object.values(tipoDocumento)) })
  tipoDocumento: tipoDocumento;

  @Column( { type: DataType.STRING(100) })
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
}

export default Usuario;