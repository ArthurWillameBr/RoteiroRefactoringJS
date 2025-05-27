const { readFileSync } = require('fs');
const Repositorio = require('./repository');
const ServicoCalculoFaturas = require("./servico")
const gerarFaturaStr = require("./apresentacao")

// function gerarFaturaHTML(fatura, pecas) {
//   let faturaHTML = `<h1>Fatura ${fatura.cliente}</h1>`;
//   faturaHTML += `<table>`;
//   faturaHTML += `<tr><th>Peca</th><th>Assentos</th><th>Valor</th></tr>`;
//   for (let apre of fatura.apresentacoes) {
//     faturaHTML += `<tr><td>${getPeca(pecas, apre).nome}</td><td>${apre.audiencia}</td><td>${formatarMoeda(calcularTotalApresentacao(pecas, apre))}</td></tr>`;
//   }
//   faturaHTML += `</table>`;
//   return faturaHTML;
// }

const faturas = JSON.parse(readFileSync('./faturas.json'));
const calc = new ServicoCalculoFaturas(new Repositorio())
const faturaStr = gerarFaturaStr(faturas, calc);
// const faturaHTML = gerarFaturaHTML(faturas, pecas);
console.log(faturaStr);
// console.log(faturaHTML);
