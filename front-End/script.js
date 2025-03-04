import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qhyncrjcgqiuyjvahqia.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', () => {
  console.log('Documento carregado e pronto.');

  // Validação do formulário
  const form = document.getElementById('meuFormulario');
  form.addEventListener('submit', async (event) => {
    // ... seu código de envio de formulário ...
  });

  // Máscara de telefone
  const telefoneInput = document.getElementById('telefone');
  if (telefoneInput) {
    // ... seu código de máscara de telefone ...
  }

  // Scroll suave
  const linksInternos = document.querySelectorAll('a[href^="#"]');
  linksInternos.forEach(link => {
    // ... seu código de scroll suave ...
  });

  // Função de validação do formulário
  function validarFormulario() {
    // ... sua função de validação ...
  }

  // Função para formatar o número de telefone
  function formatarTelefone(telefone) {
    // ... sua função de formatação de telefone ...
  }

  // Código do Supabase
  async function exibirDadosDaTabela() {
    const { data, error } = await supabase.from('contato').select('*'); // Usando 'contato' (singular)

    if (error) {
      console.error('Erro ao buscar dados:', error);
      alert('Erro ao buscar dados da tabela.');
      return;
    }

    const tabela = document.getElementById('contatos');
    if (data && data.length > 0) {
      data.forEach((linha) => {
        const novaLinha = tabela.insertRow();
        Object.values(linha).forEach((valor) => {
          const novaCelula = novaLinha.insertCell();
          novaCelula.textContent = valor;
        });
      });
    } else {
      alert('Não existem dados na tabela');
    }
  }

  exibirDadosDaTabela();
});
