// url do meu servidor
const url = "http://localhost:3000";
const itensSelecionados = [];

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
        if (response.status == 201) {
          const divDirInputs = document.querySelector('[class="dir-inputs"]');
          const paragrafoMensagem = document.createElement('p');
          paragrafoMensagem.setAttribute('class', 'msg-sucesso');
          paragrafoMensagem.textContent = "Pessoa cadastrada com sucesso!";

          divDirInputs.appendChild(paragrafoMensagem);

          setTimeout(() => {
            zerarCampos();
            divDirInputs.removeChild(paragrafoMensagem);
          }, '3000');

          return response.json();
        } else {
          console.log('Algo deu errado');
          return response.json();
        }
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

  destruirTabela();

  criarCabecalhoTabela();

  fetch(url + '/pessoas')
    .then(response => response.json())
    .then(data => {
      console.log('Lista recebida do servidor:', data);
      // Faça algo com a lista recebida, como renderizá-la na interface do usuário

      const tabela = document.getElementById('tabela-pessoas'); // Suponha que você tenha um elemento HTML com o id 'lista' onde deseja exibir os dados

      data.forEach(item => {
        const dataParse = new Date(item.data_nascimento);

        const trElement = document.createElement('tr');
        const tdId = document.createElement('td');
        const tdNome = document.createElement('td');
        const tdCPF = document.createElement('td');
        const tdDataNascimento = document.createElement('td');
        const tdTelefone = document.createElement('td');
        const tdEndereco = document.createElement('td');
        const tdAltura = document.createElement('td');
        const tdPeso = document.createElement('td');

        const tdAcao = document.createElement('td');
        const imgApagar = document.createElement('img');
        const imgEditar = document.createElement('img');

        tdId.textContent = item.id;
        tdId.hidden = true;
        trElement.appendChild(tdId);

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

        imgEditar.src = "../assets/images/editar-icon.png"
        imgEditar.addEventListener('click', () => selecionarItem(item.id, item.nome));
        tdAcao.appendChild(imgEditar);

        imgApagar.src = "../assets/images/lixeira-icon.png";
        imgApagar.addEventListener('click', () => apagarPessoa(item.id, item.nome));
        tdAcao.appendChild(imgApagar);

        trElement.appendChild(tdAcao);

        tabela.appendChild(trElement);
      });

    })
    .catch(error => {
      console.error('Erro ao buscar a lista do servidor:', error);
      // Trate os erros, se necessário
    });
}

function editarPessoa(id, nome) {
  window.alert('Nada implementado ainda');

  /* const index = itensSelecionados.indexOf(id);

  if (index !== -1) {
    window.alert(`selecionado item ${id}`)
    //itensSelecionados.splice(index, 1); // Remover item da lista de selecionados
  } else {
    itensSelecionados.push(id); // Adicionar item à lista de selecionados
  } */
}

function apagarPessoa(id, nome) {
  const reposta = window.confirm(`Tem certeza que deseja apagar ${id, nome}?`);

  if (reposta == true) {
    console.log(`Deletando ID: ${id}`);
    if (id !== -1) {
      fetch(`${url}/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (response.ok) {
            listar();
            alert('Item excluído com sucesso.');
          } else {
            alert('Erro ao excluir o item.');
          }
        })
        .catch(error => {
          console.error('Ocorreu um erro:', error);
        });
    }
  }
}

function selecionarItem(id, nome) {

  const index = itensSelecionados.indexOf(id);

  if (index !== -1) {
    window.alert(`selecionado item ${id} + ${nome}`);
    console.log(id);
    //itensSelecionados.splice(index, 1); // Remover item da lista de selecionados
  } else {
    itensSelecionados.push(id); // Adicionar item à lista de selecionados
  }
}

function zerarCampos() {
  document.querySelector('[name="nome-pessoa"]').value = '';
  document.querySelector('[name="cpf"]').value = '';
  document.querySelector('[name="data-de-nascimento"]').value = '';
  document.querySelector('[name="telefone"]').value = '';
  document.querySelector('[name="endereco"]').value = '';
  document.querySelector('[name="altura"]').value = '';
  document.querySelector('[name="peso"]').value = '';
}