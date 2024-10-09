import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';

dotenv.config();  // Carregar variáveis de ambiente

const app = express();
const PORT = process.env.PORT || 3000;

// Verificar se a MONGO_URI está definida corretamente
if (!process.env.MONGO_URI) {
  console.error('Erro: A variável MONGO_URI não está definida no arquivo .env');
  process.exit(1);  // Encerra o servidor se a variável não está definida
}

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

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
