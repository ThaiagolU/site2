import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';

dotenv.config();  // Carregar variáveis de ambiente do arquivo .env

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB com sucesso'))
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err.message);
    process.exit(1);  // Encerra o servidor se a conexão falhar
  });

// Middleware para tratar requisições com JSON
app.use(express.json());

// Rotas de autenticação
app.use('/api/auth', authRoutes);

// Servir arquivos estáticos (HTML, CSS, etc.)
app.use(express.static('public'));

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
