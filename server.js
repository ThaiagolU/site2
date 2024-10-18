import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/db.js';  // Conexão com o banco de dados MySQL
import authRoutes from './routes/auth.js';

dotenv.config();  // Carrega variáveis de ambiente

const app = express();
const PORT = process.env.PORT || 3000;  // Porta fornecida por serviços como Render ou padrão (3000)

// Middleware para lidar com JSON
app.use(express.json());

// Testar a conexão com o banco de dados e sincronizar os modelos
sequelize.sync()  // Sincronizar modelos com o banco de dados MySQL
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
