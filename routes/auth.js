import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';  // Certifique-se que o modelo está correto

const router = express.Router();

// Rota de cadastro de novo usuário
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Verificar se o usuário já está cadastrado
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já cadastrado' });
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar novo usuário
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
  } catch (error) {
    console.error('Erro no cadastro:', error);  // Exibe o erro detalhado no servidor
    return res.status(500).json({ message: 'Erro no servidor ao tentar cadastrar usuário', error: error.message });
  }
});

// Rota de login de usuário
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
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

    // Gerar o token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.json({ token, message: 'Login bem-sucedido' });
  } catch (error) {
    console.error('Erro no login:', error);  // Exibe o erro detalhado no servidor
    return res.status(500).json({ message: 'Erro no servidor ao tentar fazer login', error: error.message });
  }
});

export default router;
