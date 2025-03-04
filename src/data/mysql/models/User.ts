import { Table, Column, Model, DataType, Default, Scopes } from 'sequelize-typescript';

// 🔄 Define un Scope para excluir ciertos campos
@Scopes(() => ({
  eliminarPassword: {
    attributes: { exclude: ['password', 'token', 'confirmado', 'createdAt', 'updatedAt'] }
  }
}))

// 🏷️ Define la tabla y configura el modelo
@Table({
  tableName: 'usuarios',
  timestamps: true,  // Para createdAt y updatedAt automáticamente
})
class User extends Model {
  
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true  // Para evitar correos duplicados
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true  // Puede ser null si aún no se genera el token
  })
  declare token?: string;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN
  })
  declare confirmado: boolean;
}

export default User;
