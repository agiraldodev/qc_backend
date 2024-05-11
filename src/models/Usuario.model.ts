import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: 'usuarios'
})

class Usuario extends Model {
  @Column({ type: DataType.STRING(100) })
  primerNombre: string;

  @Column( { type: DataType.STRING(100) })
  numDocumento: string;

}

export default Usuario;