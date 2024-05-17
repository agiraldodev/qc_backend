import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: 'roles'
})
class Role extends Model {
  @Column({ type: DataType.STRING(100) })
  nombre: string;
}

export default Role;
