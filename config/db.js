import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();  // Carrega variáveis de ambiente do arquivo .env

// Configuração do Sequelize para conectar ao MySQL
const sequelize = new Sequelize(
  process.env.DB_NAME,       // Nome do banco de dados
  process.env.DB_USER,       // Usuário do MySQL
  process.env.DB_PASSWORD,   // Senha do MySQL
  {
    host: process.env.DB_HOST,  // Host do MySQL (localhost ou remoto)
    dialect: 'mysql',           // Tipo de banco de dados
    port: process.env.DB_PORT || 3306,  // Porta padrão do MySQL (ou defina uma porta personalizada)
    logging: false              // Desativa logs detalhados do SQL
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
