const form = document.getElementById('plannerForm');
const results = document.getElementById('results');

const currency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
});

function calcularViabilidade() {
  const nome = document.getElementById('name').value.trim() || 'Você';
  const idade = Number(document.getElementById('age').value) || 0;
  const renda = Number(document.getElementById('income').value) || 0;
  const gastosFixos = Number(document.getElementById('fixedCosts').value) || 0;
  const gastosVariaveis = Number(document.getElementById('variableCosts').value) || 0;
  const economiaAtual = Number(document.getElementById('currentSavings').value) || 0;
  const sonho = document.getElementById('dream').value.trim() || 'um sonho';
  const valorSonho = Number(document.getElementById('dreamValue').value) || 0;
  const tempoSonho = Number(document.getElementById('dreamMonths').value) || 1;
  const idadeAposentadoria = Number(document.getElementById('retirementAge').value) || 65;

  const dinheiroDisponivel = Math.max(renda - gastosFixos - gastosVariaveis, 0);
  const valorParaGuardar = Math.max((valorSonho - economiaAtual) / tempoSonho, 0);
  const tempoReal = valorSonho > 0 && economiaAtual < valorSonho
    ? Math.ceil((valorSonho - economiaAtual) / Math.max(dinheiroDisponivel * 0.4, 1))
    : 0;

  const ensino = idade <= 12
    ? 'Você está no momento perfeito para aprender a cuidar do dinheiro, porque os hábitos que você cria hoje podem transformar o seu futuro.'
    : 'Você está em uma fase importante: aprender a planejar desde cedo ajuda a conquistar metas sem se preocupar com imprevistos.';

  const estudo = `${nome}, com ${idade} anos, sua renda mensal é ${currency.format(renda)}. Depois de pagar ${currency.format(gastosFixos + gastosVariaveis)}, sobra ${currency.format(dinheiroDisponivel)} para organizar sua vida financeira. Seu sonho de ${sonho.toLowerCase()} vale ${currency.format(valorSonho)} e você já tem ${currency.format(economiaAtual)}. Para alcançar essa meta com calma, o ideal é guardar pelo menos ${currency.format(valorParaGuardar)} por mês. Isso ajuda a fazer o sonho crescer de forma planejada e sem pressa.`;

  const aposentadoriaTexto = `${nome}, a aposentadoria é como uma mochila de segurança para o futuro. Quanto mais cedo você começar a guardar, mais forte ela fica. Se você continuar com um plano simples e constante, no futuro terá mais liberdade para escolher como viver. A meta é alcançar ${idadeAposentadoria} anos com uma reserva que ajude a manter a qualidade de vida.`;

  const progresso = Math.min(((idadeAposentadoria - idade) / Math.max(idadeAposentadoria, 1)) * 100, 100);

  return {
    dinheiroDisponivel,
    valorParaGuardar,
    tempoReal,
    estudo,
    aposentadoriaTexto,
    progresso,
    ensino,
    nome,
    valorSonho,
    idade
  };
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const dados = calcularViabilidade();

  document.getElementById('availableMoney').textContent = currency.format(dados.dinheiroDisponivel);
  document.getElementById('monthlySave').textContent = currency.format(dados.valorParaGuardar);
  document.getElementById('dreamTime').textContent = dados.tempoReal > 0 ? `${dados.tempoReal} meses` : 'Meta planejada';
  document.getElementById('studyTitle').textContent = `${dados.nome}, seu plano está pronto!`;
  document.getElementById('studyText').textContent = `${dados.ensino} ${dados.estudo}`;
  document.getElementById('retirementText').textContent = dados.aposentadoriaTexto;
  document.getElementById('retirementProgress').style.width = `${Math.max(dados.progresso, 12)}%`;

  results.classList.remove('hidden');
  results.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
                