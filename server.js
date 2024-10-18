import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/db.js';  // Importa a conexão com o banco de dados MySQL
import authRoutes from './routes/auth.js';

dotenv.config();  // Carrega variáveis de ambiente do arquivo .env

const app = express();
const PORT = process.env.PORT || 3000;  // Use a porta fornecida pelo Render ou uma padrão

// Middleware para lidar com JSON
app.use(express.json());

// Testar a conexão com o banco de dados e sincronizar os modelos
sequelize.sync()  // Sincroniza os modelos com o banco de dados MySQL
  .then(() => {
    console.log('Banco de dados sincronizado com sucesso.');
    
    // Iniciar o servidor, ouvindo na porta fornecida pelo Render (ou 3000 localmente)
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao sincronizar o banco de dados:', err.message);
  });

// Rotas de autenticação
app.use('/api/auth', authRoutes);
