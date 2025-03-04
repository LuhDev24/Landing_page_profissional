document.addEventListener('DOMContentLoaded', () => {
    console.log('Documento carregado e pronto.');

    // Validação do formulário
    const form = document.getElementById('meuFormulario');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (!validarFormulario()) {
            return; // Impede o envio se a validação falhar
        }

        // Envio de dados para o servidor Node.js (Fetch API)
        const nome = document.getElementById('nome').value;
        const telefone = document.getElementById('telefone').value;
        const email = document.getElementById('email').value;
        const formaEmpresarial = document.getElementById('forma_empresarial').value;

        const data = {
            nome: nome,
            telefone: telefone,
            email: email,
            forma_empresarial: formaEmpresarial
        };

        console.log(data); // Adicionado para depuração

        try {
            const response = await fetch('/.netlify/functions/enviar-formulario', { // URL corrigida
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            console.log(response); // Adicionado para depuração

            if (response.ok) {
                alert('Formulário enviado com sucesso!');
                form.reset();
            } else {
                const errorData = await response.json(); // Parse a resposta JSON
                console.log(errorData); // Adicionado para depuração
                console.error('Erro ao enviar o formulário:', errorData);
                if (errorData && errorData.errors) {
                    // Exibe os erros de validação
                    const errorMessages = errorData.errors.map(error => error.msg).join('\n');
                    alert('Erro ao enviar o formulário:\n' + errorMessages);
                } else if (errorData && errorData.message) {
                    // Exibe a mensagem de erro do servidor
                    alert('Erro ao enviar o formulário:\n' + errorData.message);
                } else {
                    alert('Erro desconhecido ao enviar o formulário.');
                }
            }
        } catch (error) {
            console.error('Erro:', error);
            if (error instanceof TypeError && error.message === 'Failed to fetch') {
                alert('Erro: Falha na conexão com o servidor.');
            } else {
                alert('Erro ao enviar o formulário: ' + error.message);
            }
        }
    });

    // Máscara de telefone
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', () => {
            telefoneInput.value = formatarTelefone(telefoneInput.value);
        });
    }

    // Scroll suave
    const linksInternos = document.querySelectorAll('a[href^="#"]');
    linksInternos.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const href = this.getAttribute('href');
            const targetElement = document.querySelector(href);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Função de validação do formulário
    function validarFormulario() {
        const nome = document.getElementById('nome').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const email = document.getElementById('email').value.trim();

        if (nome === '') {
            alert('Por favor, preencha o campo Nome.');
            return false;
        }

        if (telefone === '') {
            alert('Por favor, preencha o campo Telefone.');
            return false;
        }

        if (email === '') {
            alert('Por favor, preencha o campo E-mail.');
            return false;
        }

        // Validação do e-mail
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Por favor, insira um e-mail válido.');
            return false;
        }

        // Validação do telefone no lado do cliente
        const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
        if (!telefoneRegex.test(telefone)) {
            alert('Por favor, insira um telefone válido (ex: (99) 99999-9999).');
            return false;
        }

        return true;
    }

    // Função para formatar o número de telefone
    function formatarTelefone(telefone) {
        try {
            // Remove todos os caracteres não numéricos
            telefone = telefone.replace(/\D/g, '');

            // Aplica a máscara (ex: (99) 99999-9999)
            if (telefone.length > 10) {
                telefone = telefone.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
            } else if (telefone.length > 6) {
                telefone = telefone.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
            } else if (telefone.length > 2) {
                telefone = telefone.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
            }

            return telefone;
        } catch (error) {
            console.error('Erro ao formatar o telefone:', error);
            return telefone; // Retorna o telefone sem formatação em caso de erro
        }
    }
});
