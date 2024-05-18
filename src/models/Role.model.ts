import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import Usuario from "./Usuario.model";

@Table({
  tableName: 'roles'
})
class Role extends Model {
  @Column({ type: DataType.STRING(100) })
  nombre: string;

  @HasMany (() => Usuario)
  usuarios: Usuario[];
}

export default Role;
