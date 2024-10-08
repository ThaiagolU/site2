import express from 'express';
import dotenv from 'dotenv';
import { MongoClient, ServerApiVersion } from 'mongodb';

dotenv.config();  // Carregar variáveis de ambiente do arquivo .env

const app = express();
const PORT = process.env.PORT || 3000;

const uri = process.env.MONGO_URI;  // Usar a MONGO_URI do arquivo .env

// Criar cliente MongoDB com a configuração da API estável
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Função para conectar e rodar ping
async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. Você se conectou com sucesso ao MongoDB!");
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error.message);
    process.exit(1);  // Encerra o servidor se a conexão falhar
  } finally {
    await client.close();  // Garante que o cliente será fechado após o uso
  }
}

run().catch(console.dir);

// Middleware para tratar requisições com JSON
app.use(express.json());

// Servir arquivos estáticos (HTML, CSS, etc.)
app.use(express.static('public'));

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
