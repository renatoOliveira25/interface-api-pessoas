function criarCabecalhoTabela() {

    const divTabela = document.querySelector('[class="div-tabela"]');
    const table = document.createElement('table');
    const trElement = document.createElement('tr');
    const thId = document.createElement('th');
    const thNome = document.createElement('th');
    const thCPF = document.createElement('th');
    const thDataNascimento = document.createElement('th');
    const thTelefone = document.createElement('th');
    const thEndereco = document.createElement('th');
    const thAltura = document.createElement('th');
    const thPeso = document.createElement('th');
    const thAcao = document.createElement('th');

    thId.textContent = 'Id';
    thId.hidden = true;
    trElement.appendChild(thId);
    thNome.textContent = 'Nome';
    trElement.appendChild(thNome);
    thCPF.textContent = 'CPF';
    trElement.appendChild(thCPF);
    thDataNascimento.textContent = 'Data de Nascimento';
    trElement.appendChild(thDataNascimento);
    thTelefone.textContent = 'Telefone';
    trElement.appendChild(thTelefone);
    thEndereco.textContent = 'Endereco';
    trElement.appendChild(thEndereco);
    thAltura.textContent = 'Altura (cm)';
    trElement.appendChild(thAltura);
    thPeso.textContent = 'Peso (kg)';
    trElement.appendChild(thPeso);
    thAcao.textContent = 'Ação';
    trElement.appendChild(thAcao);

    table.appendChild(trElement);
    table.setAttribute('id', 'tabela-pessoas');

    divTabela.appendChild(table);
}

function destruirTabela() {
    const tabela = document.getElementById('tabela-pessoas');

    if (tabela) {
        tabela.parentNode.removeChild(tabela); // Remove a tabela do DOM
      } else {
        console.log('A tabela não existe.');
      }
}