import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
    tableName: 'eventos'
  })
  class Evento extends Model {
    @Column({ type: DataType.STRING(100) })
    tipoEvento: string;

    @Column({ type: DataType.DATE})
    fecha: Date;
  }

export default Evento;