const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const { body, validationResult } = require('express-validator');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, '../front-End'))); // Ajuste aqui
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Configuração do banco de dados MySQL
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root', // Usando root conforme .env
    password: process.env.DB_PASSWORD || '4825',
    database: process.env.DB_DATABASE || 'Landing_page_profissional', // Usando Landing_page_profissional conforme .env
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../front-End', 'index.html')); // Ajuste aqui
});

// Rota para processar o formulário
app.post('/enviar-formulario', [
    body('nome').notEmpty().withMessage('Nome é obrigatório'),
    body('telefone').notEmpty().withMessage('Telefone é obrigatório'),
    body('email').notEmpty().withMessage('Email é obrigatório').isEmail().withMessage('Email inválido'),
    body('forma_empresarial').notEmpty().withMessage('Forma empresarial é obrigatória'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nome, telefone, email, forma_empresarial } = req.body;

    try {
        const connection = await pool.getConnection();
        const [results] = await connection.execute(
            'INSERT INTO contatos (nome, telefone, email, forma_empresarial) VALUES (?, ?, ?, ?)',
            [nome, telefone, email, forma_empresarial]
        );
        connection.release();
        res.json({ message: 'Formulário enviado com sucesso!', id: results.insertId });
    } catch (err) {
        console.error('Erro ao inserir dados:', err);
        res.status(500).json({ message: 'Erro ao enviar o formulário: ' + err.message });
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

