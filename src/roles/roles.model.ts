import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from "@nestjs/swagger";

interface RoleCreationAttributes {
  value: string;
  description: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttributes> {

  @ApiProperty({ example: '1', description: 'Id, unique identifier'})
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'admin', description: 'Unique role'})
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string;

  @ApiProperty({ example: 'Administrator', description: 'Role description'})
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;
}
