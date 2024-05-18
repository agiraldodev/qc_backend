import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import Usuario from "./Usuario.model";
import Aula from "./Aula.model";
 
@Table({
    tableName: 'Asistencias'
})
class Asistencia extends Model {
    @Column({ type: DataType.DATE})
    fecha: Date;

    @Column({ type: DataType.TIME})
    horaIngreso: Date;

    @Column({ type: DataType.TIME})
    horaSalida: Date;
    
    @ForeignKey(() => Usuario)
    @Column({type: DataType.INTEGER})
    estudiante_id: number
  
    @BelongsTo(() => Usuario)
    usuario: Usuario

    @ForeignKey(() => Aula)
    @Column({type: DataType.INTEGER})
    Aula_id: number
  
    @BelongsTo(() => Aula)
    aula: Aula
}

export default Asistencia;