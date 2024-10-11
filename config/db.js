import { Sequelize } from 'sequelize';  // Importa o Sequelize
import dotenv from 'dotenv';

dotenv.config();  // Carrega as variáveis de ambiente do arquivo .env

// Configuração do Sequelize para conectar ao MySQL
const sequelize = new Sequelize(
  process.env.DB_NAME,       // Nome do banco de dados
  process.env.DB_USER,       // Usuário do MySQL
  process.env.DB_PASSWORD,   // Senha do MySQL
  {
    host: process.env.DB_HOST,  // Host do MySQL (normalmente localhost)
    dialect: 'mysql',           // Tipo de banco de dados
    logging: false              // Desativa logs detalhados do SQL no console
  }
);

// Função para testar a conexão com o banco de dados
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o MySQL foi estabelecida com sucesso.');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao MySQL:', err.message);
  });

export default sequelize;
