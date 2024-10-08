import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now  // Registra a data de criação automaticamente
  }
});

// Exporta o modelo 'User', que cria a coleção 'users' no banco de dados 'myUserDatabase'
export default mongoose.model('User', UserSchema);
