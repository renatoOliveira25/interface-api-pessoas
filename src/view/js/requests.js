const axios = require('axios');

const url = "http://localhost:3000";

const dados = {
    nome: document.querySelector('[name="nome-pessoa"]').value,
    cpf: document.querySelector('[name="cpf"]').value,
    data_nascimento: document.querySelector('[name="data-de-nascimento"]').value,
    telefone: document.querySelector('[name="telefone"]').value,
    endereco: document.querySelector('[name="endereco"]').value,
    altura: document.querySelector('[name="altura"]').value,
    peso: document.querySelector('[name="peso"]').value
}

console.log(dados);

document.querySelector('form').addEventListener('submit', function (event) {
  event.preventDefault(); // Impede o envio do formulário tradicional

console.log('chamei o post');

axios.post(url + '/user', dados)
  .then(function (response) {
    console.log(`Reposta do servidor: ${response.data}`);
  })
  .catch(function (error) {
    console.log(`Erro ao enviar dados para o servidor: ${error}`);
  });
});
console.log('na teoria, terminou o post');