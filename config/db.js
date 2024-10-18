import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Configuração do Sequelize para conectar ao MySQL
const sequelize = new Sequelize(
  process.env.meu_projeto,       // Nome do banco de dados
  process.env.meu_projeto_user,       // Usuário do banco de dados
  process.env.GxjqB2VQL6QXCgJYZ3xuXCmKWQsNNQOD,   // Senha do banco de dados
  {
    host: process.env.localhost,  // Host do MySQL (remoto ou localhost)
    dialect: 'mysql',           // Especifica que estamos usando MySQL
    port: process.env.DB_PORT || 5432,  // Porta do MySQL (geralmente 3306)
    logging: false              // Desativa logs detalhados de SQL no console
  }
);

// Testar a conexão com o banco de dados
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o MySQL foi estabelecida com sucesso.');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao MySQL:', err.message);
  });

export default sequelize;
