const { readFileSync } = require('fs');

function gerarFaturaStr (fatura, pecas) {
    let totalFatura = 0;
    
    let faturaStr = `Fatura ${fatura.cliente}\n`;

    function formatarMoeda(valor) {
      return new Intl.NumberFormat("pt-BR",
        { style: "currency", currency: "BRL",
          minimumFractionDigits: 2 }).format(valor/100);
    }

    function calcularCredito(apre) {
      let creditos = 0;
      creditos += Math.max(apre.audiencia - 30, 0);
      if (getPeca(apre).tipo === "comedia") 
         creditos += Math.floor(apre.audiencia / 5);
        return creditos;
    }                            

    function getPeca(apresentacao) {
      return pecas[apresentacao.id]
    }                        
  
    function calcularTotalApresentacao(apre) {
      let total = 0;
      const peca = getPeca(apre)
      switch (peca.tipo) {
      case "tragedia":
        total = 40000;
        if (apre.audiencia > 30) {
          total += 1000 * (apre.audiencia - 30);
        }
        break;
      case "comedia":
        total = 30000;
        if (apre.audiencia > 20) {
           total += 10000 + 500 * (apre.audiencia - 20);
        }
        total += 300 * apre.audiencia;
        break;
      default:
          throw new Error(`Peça desconhecia: ${peca.tipo}`);
      }
      return total
    }

    for (let apre of fatura.apresentacoes) {
      const peca = getPeca(apre);
      let total = calcularTotalApresentacao(apre)

      // créditos para próximas contratações
      let creditos = calcularCredito(apre)
      faturaStr += `Créditos acumulados: ${creditos} \n`;
      
      // mais uma linha da fatura
      faturaStr += `  ${peca.nome}: ${formatarMoeda(total)} (${apre.audiencia} assentos)\n`;
      totalFatura += total;
    }

    faturaStr += `Valor total: ${formatarMoeda(totalFatura)}\n`;
    return faturaStr;
  }

const faturas = JSON.parse(readFileSync('./faturas.json'));
const pecas = JSON.parse(readFileSync('./pecas.json'));
const faturaStr = gerarFaturaStr(faturas, pecas);
console.log(faturaStr);
