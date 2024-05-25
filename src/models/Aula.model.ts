import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import Usuario from "./Usuario.model";

enum diasPermitidos {
    lunes = 'lunes',
    martes = 'martes',
    miercoles = 'miercoles',
    jueves = 'jueves',
    viernes = 'viernes',
  }
  @Table({
    tableName: 'aulas'
  })
  class Aula extends Model {
    @Column({ type: DataType.DATE })
    fechaCreacion: Date;

    @Column({ type: DataType.TIME})
    horaApertura: Date;

    @Column({ type: DataType.TIME})
    horaCierre: Date;

    @Column({ type: DataType.ENUM(...Object.values(diasPermitidos)) })
    diasPermitidos: diasPermitidos;

    @Column ({ type: DataType.STRING(100)})
    nombreAula: String;

    @ForeignKey(() => Usuario)
    @Column({type: DataType.INTEGER})
    docente_Encargado: number
  
    @BelongsTo(() => Usuario)
    usuario: Usuario
  }
  
export default Aula;