import mongoose from 'mongoose';

// Definir o esquema de Usuário
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome é obrigatório'],  // Nome é obrigatório
    minlength: [3, 'O nome deve ter pelo menos 3 caracteres']  // Nome com mínimo de 3 caracteres
  },
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],  // Email é obrigatório
    unique: true,  // Email deve ser único no banco de dados
    match: [/\S+@\S+\.\S+/, 'Email inválido']  // Validação de formato de email
  },
  password: {
    type: String,
    required: [true, 'Senha é obrigatória'],  // Senha é obrigatória
    minlength: [6, 'A senha deve ter no mínimo 6 caracteres']  // Senha com no mínimo 6 caracteres
  },
  createdAt: {
    type: Date,
    default: Date.now  // A data de criação é registrada automaticamente
  }
});

// Exportar o modelo de Usuário (a coleção no MongoDB será chamada de 'users')
export default mongoose.model('User', UserSchema);
