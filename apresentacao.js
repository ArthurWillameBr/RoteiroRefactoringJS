const formatarMoeda = require("./util")

module.exports = function gerarFaturaStr(fatura, calc) {
    let faturaStr = `Fatura ${fatura.cliente}\n`;
    
    for (let apre of fatura.apresentacoes) {
      const valorApresentacao = calc.calcularTotalApresentacao(apre);
      faturaStr += `  ${calc.repo.getPeca(apre).nome}: ${formatarMoeda(valorApresentacao)} (${apre.audiencia} assentos)\n`;
    }
    
    faturaStr += `Valor total: ${formatarMoeda(calc.calcularTotalFatura(fatura.apresentacoes))}\n`;
    faturaStr += `Créditos acumulados: ${calc.calcularTotalCreditos(fatura.apresentacoes)} \n`;
    return faturaStr;
  }