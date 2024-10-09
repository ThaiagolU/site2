import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    minlength: [3, 'O nome deve ter pelo menos 3 caracteres']
  },
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Email inválido']
  },
  password: {
    type: String,
    required: [true, 'Senha é obrigatória'],
    minlength: [6, 'A senha deve ter no mínimo 6 caracteres']
  },
  createdAt: {
    type: Date,
    default: Date.now  // Registra a data de criação automaticamente
  }
});

// Exportar o modelo 'User', que cria a coleção 'users' no banco de dados 'myUserDatabase'
export default mongoose.model('User', UserSchema);
