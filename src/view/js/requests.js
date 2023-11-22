const url_server = "http://localhost:3000";

function cadastrar() {

    const dados = {
        nome: document.querySelector('[name="nome-pessoa"]').value,
        cpf: document.querySelector('[name="cpf"]').value,
        data_nascimento: document.querySelector('[name="data-de-nascimento"]').value,
        telefone: document.querySelector('[name="telefone"]').value,
        endereco: document.querySelector('[name="endereco"]').value,
        altura: document.querySelector('[name="altura"]').value,
        peso: document.querySelector('[name="peso"]').value
    }

    // Faz requisição ao servidor usando o verbo POST, enviando os dados para o servidor
    fetch(`${url_server}/cadastro`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
        // Depois de feita a requisição, o front-end irá receber um retorno do servidor
        .then(response => response.json())
        // Se toda a requisição deu certo, será informado no log
        .then(dados => {
            console.log('Resposta do servidor:', dados);
            // Faça algo com a resposta do servidor, se necessário
        })
        // Caso tenha algum tipo de erro na requisição, é lançada a excessão
        .catch(error => {
            console.error('Erro ao enviar dados para o servidor:', error);
            // Trate os erros, se necessário
        });
}

function listarPessoas() {

    // recupera o elemento da tabela
    const tabela = document.querySelector('table');
    // verifica quantas linhas existem na tabela
    const contadorLinhas = tabela.rows.length;
    // apaga todas as linhas da tabela
    for (var i = contadorLinhas - 1; i > 0; i--) {
        tabela.deleteRow(i);
    }

    fetch(`${url_server}/pessoas`)
        .then(response => response.json())
        .then(pessoas => {
            pessoas.forEach(pessoa => {
                inserePessoaTabela(pessoa, tabela);
            });
        });
}

function inserePessoaTabela(pessoa, tabela) {
    const dataParse = new Date(pessoa.data_nascimento);

    const elementTr = document.createElement('tr');
    const tdNome = document.createElement('td');
    const tdCpf = document.createElement('td');
    const tdDataNascimento = document.createElement('td');
    const tdTelefone = document.createElement('td');
    const tdEndereco = document.createElement('td');
    const tdAltura = document.createElement('td');
    const tdPeso = document.createElement('td');

    tdNome.textContent = pessoa.nome;
    tdCpf.textContent = mascaraCPF(pessoa.cpf);

    if ((dataParse.getMonth() + 1 < 10) && (dataParse.getDate() < 10)) {
        tdDataNascimento.textContent = `0${dataParse.getDate()}/0${dataParse.getMonth() + 1}/${dataParse.getFullYear()}`;
    } else if ((dataParse.getMonth() + 1 < 10)) {
        tdDataNascimento.textContent = `${dataParse.getDate()}/0${dataParse.getMonth() + 1}/${dataParse.getFullYear()}`;
    } else if ((dataParse.getDate() < 10)) {
        tdDataNascimento.textContent = `0${dataParse.getDate()}/${dataParse.getMonth() + 1}/${dataParse.getFullYear()}`;
    } else {
        tdDataNascimento.textContent = `${dataParse.getDate()}/${dataParse.getMonth() + 1}/${dataParse.getFullYear()}`;
    }

    tdTelefone.textContent = mascaraTelefone(pessoa.telefone);
    tdEndereco.textContent = pessoa.endereco;
    tdAltura.textContent = pessoa.altura;
    tdPeso.textContent = pessoa.peso;

    elementTr.appendChild(tdNome);
    elementTr.appendChild(tdCpf);
    elementTr.appendChild(tdDataNascimento);
    elementTr.appendChild(tdTelefone);
    elementTr.appendChild(tdEndereco);
    elementTr.appendChild(tdAltura);
    elementTr.appendChild(tdPeso);

    tabela.appendChild(elementTr);
}

function mascaraCPF(cpf) {
    if (!cpf) return ""
    cpf = cpf.replace(/\D/g, "")                    //Remove tudo o que não é dígito
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")       //Coloca um ponto entre o terceiro e o quarto dígitos
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")       //Coloca um ponto entre o terceiro e o quarto dígitos
    //de novo (para o segundo bloco de números)
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2") //Coloca um hífen entre o terceiro e o quarto dígitos
    return cpf
}

function mascaraTelefone(telefone) {
    if (!telefone) return ""
    telefone = telefone.replace(/\D/g, '')
    telefone = telefone.replace(/(\d{2})(\d)/, "($1) $2")
    telefone = telefone.replace(/(\d)(\d{4})$/, "$1-$2")
    return telefone
}