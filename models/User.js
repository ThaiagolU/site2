import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

// Definir o modelo de Usuário usando Sequelize
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true  // Validação de email
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'users',  // Nome da tabela no MySQL
  timestamps: false  // Desativar timestamps automáticos do Sequelize
});

export default User;
