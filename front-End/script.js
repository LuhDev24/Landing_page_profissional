import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qhyncrjcgqiuyjvahqia.supabase.co';
const supabaseKey = window.SUPABASE_KEY; // Obtém a chave do index.html
const supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', () => {
  console.log('Documento carregado e pronto.');

  // Validação do formulário
  const form = document.getElementById('meuFormulario');
  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita o envio padrão do formulário

    try {
      const { data, error } = await supabase
        .from('contato') // Usando 'contato' (singular)
        .insert([{
          nome: document.getElementById('nome').value,
          telefone: document.getElementById('telefone').value,
          email: document.getElementById('email').value,
          forma_empresarial: document.getElementById('forma_empresarial').value,
        }]);

      if (error) {
        console.error('Erro ao enviar dados:', error);
        alert('Erro ao enviar dados do formulário.');
        return;
      }

      console.log('Dados enviados com sucesso:', data);
      alert('Formulário enviado com sucesso!');
    } catch (error) {
      console.error('Erro inesperado:', error);
      alert('Ocorreu um erro inesperado.');
    }
  });

  // Máscara de telefone
  const telefoneInput = document.getElementById('telefone');
  if (telefoneInput) {
    // Adicione aqui o código da máscara de telefone
  }

  // Scroll suave
  const linksInternos = document.querySelectorAll('a[href^="#"]');
  linksInternos.forEach(link => {
    // Adicione aqui o código do scroll suave
  });

  // Função de validação do formulário
  function validarFormulario() {
    // Adicione aqui a função de validação do formulário
  }

  // Função para formatar o número de telefone
  function formatarTelefone(telefone) {
    // Adicione aqui a função para formatar o número de telefone
  }

  // Código do Supabase
  async function exibirDadosDaTabela() {
    const { data, error } = await supabase.from('contato').select('*'); // Usando 'contato' (singular)

    if (error) {
      console.error('Erro ao buscar dados:', error);
      alert('Erro ao buscar dados da tabela.');
      return;
    }

    const tabela = document.getElementById('contato');
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
