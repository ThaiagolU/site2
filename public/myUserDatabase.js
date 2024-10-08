/* global use, db */

// MongoDB Playground para manipular uma coleção de usuários

// Selecionar o banco de dados
use('myUserDatabase');

// Inserir documentos de exemplo na coleção de usuários
db.getCollection('users').insertMany([
  { 'name': 'João', 'email': 'joao@email.com', 'password': 'hashed_password1', 'createdAt': new Date() },
  { 'name': 'Maria', 'email': 'maria@email.com', 'password': 'hashed_password2', 'createdAt': new Date() },
  { 'name': 'Pedro', 'email': 'pedro@email.com', 'password': 'hashed_password3', 'createdAt': new Date() }
]);

// Consultar quantos usuários existem na coleção
const userCount = db.getCollection('users').countDocuments();
console.log(`Existem ${userCount} usuários no banco de dados.`);

// Executar uma busca por usuários com email específico
const userEmail = db.getCollection('users').findOne({ email: 'joao@email.com' });
console.log('Usuário encontrado:', userEmail);

// Agregação para contar quantos usuários foram criados hoje
db.getCollection('users').aggregate([
  { $match: { createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) } } },
  { $group: { _id: null, count: { $sum: 1 } } }
]).toArray().then(result => console.log('Usuários criados hoje:', result));
