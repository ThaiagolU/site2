import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';  // Modelo atualizado para usar Sequelize

const router = express.Router();

// Rota de cadastro de novo usuário
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Verificar se o usuário já está cadastrado
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já cadastrado' });
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar novo usuário
    const newUser = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: 'Usuário cadastrado com sucesso', userId: newUser.id });
  } catch (error) {
    console.error('Erro no cadastro:', error.message);
    res.status(500).json({ message: 'Erro no servidor ao tentar cadastrar usuário' });
  }
});

// Rota de login de usuário
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar se o usuário existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    // Verificar a senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Senha incorreta' });
    }

    // Gerar o token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, message: 'Login bem-sucedido' });
  } catch (error) {
    console.error('Erro no login:', error.message);
    res.status(500).json({ message: 'Erro no servidor ao tentar fazer login' });
  }
});

export default router;
