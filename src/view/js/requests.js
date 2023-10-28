// url do meu servidor
const url = "http://localhost:3000";

function cadastrar() {
  console.log('Enviando dados ao servidor...');

  // Recuperando dados do formulário e armazenando na variável dados
  const dados = {
    nome: document.querySelector('[name="nome-pessoa"]').value,
    cpf: document.querySelector('[name="cpf"]').value,
    data_nascimento: document.querySelector('[name="data-de-nascimento"]').value,
    telefone: document.querySelector('[name="telefone"]').value,
    endereco: document.querySelector('[name="endereco"]').value,
    altura: document.querySelector('[name="altura"]').value,
    peso: document.querySelector('[name="peso"]').value
  }

  fetch(url + '/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Origin': 'http://localhost:55001'
    },
    body: JSON.stringify(dados)
  })
    .then(response => {
      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        return response.json();
      } else {
        throw new Error('A resposta não é do tipo JSON');
      }
    })
    .then(dados => {
      console.log('Resposta do servidor:', dados);
      // Faça algo com a resposta do servidor, se necessário
    })
    .catch(error => {
      console.error('Erro ao enviar dados para o servidor:', error);
      // Trate os erros, se necessário
    });
}

function listar() {

  fetch(url + '/pessoas')
  .then(response => response.json())
  .then(data => {
    console.log('Lista recebida do servidor:', data);
    // Faça algo com a lista recebida, como renderizá-la na interface do usuário
    
    const tabela = document.getElementById('tabela-pessoas'); // Suponha que você tenha um elemento HTML com o id 'lista' onde deseja exibir os dados

    data.forEach(item => {
      const dataParse = new Date(item.data_nascimento);

      const trElement = document.createElement('tr');
      const tdNome = document.createElement('td');
      const tdCPF = document.createElement('td');
      const tdDataNascimento = document.createElement('td');
      const tdTelefone = document.createElement('td');
      const tdEndereco = document.createElement('td');
      const tdAltura = document.createElement('td');
      const tdPeso = document.createElement('td');
      
      tdNome.textContent = item.nome;
      trElement.appendChild(tdNome);
      tdCPF.textContent = item.cpf;
      trElement.appendChild(tdCPF);
      tdDataNascimento.textContent = `${dataParse.getDate()}/${dataParse.getMonth()}/${dataParse.getFullYear()}`;
      trElement.appendChild(tdDataNascimento);
      tdTelefone.textContent = item.telefone;
      trElement.appendChild(tdTelefone);
      tdEndereco.textContent = item.endereco;
      trElement.appendChild(tdEndereco);
      tdAltura.textContent = item.altura;
      trElement.appendChild(tdAltura);
      tdPeso.textContent = item.peso;
      trElement.appendChild(tdPeso);
      
      tabela.appendChild(trElement);
    });

  })
  .catch(error => {
    console.error('Erro ao buscar a lista do servidor:', error);
    // Trate os erros, se necessário
  });
}