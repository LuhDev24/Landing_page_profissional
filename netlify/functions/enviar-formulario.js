const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const app = express();
const router = express.Router();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração do banco de dados PostgreSQL (Supabase)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Rota para processar o formulário
router.post('/', [
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

  let client;

  try {
    client = await pool.connect();

    const result = await client.query(
      'INSERT INTO contatos (nome, telefone, email, forma_empresarial) VALUES ($1, $2, $3, $4) RETURNING id',
      [nome, telefone, email, forma_empresarial]
    );

    res.json({ message: 'Formulário enviado com sucesso!', id: result.rows[0].id });
  } catch (err) {
    console.error('Erro ao inserir dados:', err);
    res.status(500).json({ message: 'Erro ao enviar o formulário: ' + err.message });
  } finally {
    if (client) {
      client.release();
    }
  }
});

app.use('/enviar-formulario', router);

module.exports.handler = serverless(app);
