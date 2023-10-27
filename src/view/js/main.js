function recuperaDados() {
    let nome = document.querySelector('[name="nome-pessoa"]').value;
    let cpf = document.querySelector('[name="cpf"]').value;
    let data_nascimento = document.querySelector('[name="data-de-nascimento"]').value;
    let telefone = document.querySelector('[name="telefone"]').value;
    let endereco = document.querySelector('[name="endereco"]').value;
    let altura = document.querySelector('[name="altura"]').value;
    let peso = document.querySelector('[name="peso"]').value;

    console.log(`Nome: ${nome}\nCPF: ${cpf}\nData Nascimento: ${data_nascimento}\nTelefone: ${telefone}\nEndereço: ${endereco}\nAltura: ${altura}\nPeso: ${peso}`);
}