// url do meu servidor
const url = "http://localhost:3000";

function cadastrar() {
  console.log('chamei o post');

  // Recuperando dados do formulário e armazenando na variável dados
  const dados = {
    nome: document.querySelector('[name="nome-pessoa"]').value,
    cpf: document.querySelector('[name="cpf"]').value,
    dados_nascimento: document.querySelector('[name="data-de-nascimento"]').value,
    telefone: document.querySelector('[name="telefone"]').value,
    endereco: document.querySelector('[name="endereco"]').value,
    altura: document.querySelector('[name="altura"]').value,
    peso: document.querySelector('[name="peso"]').value
  }

  fetch('http://localhost:3000/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Origin': 'http://localhost:55001'
    },
    body: JSON.stringify(dados)
  })
    .then(response => response.json())
    .then(dados => {
      console.log('Resposta do servidor:', dados);
      // Faça algo com a resposta do servidor, se necessário
    })
    .catch(error => {
      console.error('Erro ao enviar dados para o servidor:', error);
      // Trate os erros, se necessário
    });
}

async function buscar() {
  try {
    const response = await fetch('http://localhost:3000/', {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
  
}