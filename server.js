import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/db.js';  // Conexão com MySQL
import authRoutes from './routes/auth.js';

dotenv.config();  // Carregar variáveis de ambiente

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para lidar com JSON
app.use(express.json());

// Testar a conexão com o banco de dados antes de iniciar o servidor
sequelize.sync()
  .then(() => {
    console.log('Banco de dados sincronizado com sucesso.');

    // Iniciar o servidor
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao sincronizar o banco de dados:', err.message);
  });

// Rotas de autenticação
app.use('/api/auth', authRoutes);
