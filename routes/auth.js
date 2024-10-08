import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Cadastro de novo usuário
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  
  // Verifica se o usuário já existe
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Usuário já cadastrado' });
  }

  // Criptografar a senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Criar novo usuário
  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();

  res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
});

// Login de usuário
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Verificar se o usuário existe
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Usuário não encontrado' });
  }

  // Verificar a senha
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Senha incorreta' });
  }

  // Gerar token JWT
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token, message: 'Login bem-sucedido' });
});

export default router;
