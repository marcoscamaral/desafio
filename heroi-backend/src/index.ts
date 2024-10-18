
import express, { Application } from 'express';
import dotenv from 'dotenv';
import routes from './routes';

import connectDB from './config/database';

// Configuração do dotenv
dotenv.config();

// Conectar ao MongoDB
connectDB();

const app: Application = express(); // Tipando como Application
const PORT = process.env.PORT || 5001;

// Middleware para interpretar JSON
app.use(express.json());

// Registrar as rotas dos cavaleiros
app.use('/knights', routes);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});