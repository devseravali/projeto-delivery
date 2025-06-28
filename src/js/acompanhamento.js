document.addEventListener('DOMContentLoaded', () => {
    const numeroPedidoEl = document.getElementById('numero-pedido');
    const pinPedidoEl = document.getElementById('pin-pedido');
    const tempoPedido = document.getElementById('tempo-pedido');
    const etapas = document.querySelectorAll('.barra-progresso .etapa');
    const mensagemFinal = document.querySelector('.mensagem-final');
  
    const pedidoAtual = JSON.parse(localStorage.getItem('pedidoAtual'));
    if (!pedidoAtual || !pedidoAtual.id || !pedidoAtual.pin) {
      window.location.href = 'index.html';
      return;
    }
  
    const numeroPedido = pedidoAtual.id.toString().padStart(4, '0');
    const pin = pedidoAtual.pin;
  
    if (numeroPedidoEl) numeroPedidoEl.textContent = numeroPedido;
    if (pinPedidoEl) pinPedidoEl.textContent = pin;
  
    let minutos = 5;
    let segundos = 0;
  
    function atualizarTempo() {
      const minStr = String(minutos).padStart(2, '0');
      const segStr = String(segundos).padStart(2, '0');
      if (tempoPedido) tempoPedido.textContent = `${minStr}:${segStr}`;
    }
  
    atualizarTempo();
  
    const timer = setInterval(() => {
      if (minutos === 0 && segundos === 0) {
        clearInterval(timer);
        return;
      }
  
      if (segundos === 0) {
        minutos--;
        segundos = 59;
      } else {
        segundos--;
      }
  
      atualizarTempo();
    }, 1000);
  
    function atualizarEtapasPorStatus(status) {
      etapas.forEach(etapa => etapa.classList.remove('ativo'));
  
      switch (status) {
        case 'pendente':
          etapas[0].classList.add('ativo');
          break;
        case 'preparo':
          etapas[0].classList.add('ativo');
          etapas[1].classList.add('ativo');
          break;
        case 'pronto':
          etapas[0].classList.add('ativo');
          etapas[1].classList.add('ativo');
          etapas[2].classList.add('ativo');
          break;
        case 'entregue':
          etapas[0].classList.add('ativo');
          etapas[1].classList.add('ativo');
          etapas[2].classList.add('ativo');
          etapas[3].classList.add('ativo');
          break;
        case 'concluido':
          etapas.forEach(etapa => etapa.classList.add('ativo'));
          if (mensagemFinal) mensagemFinal.classList.remove('none');
          clearInterval(timer);
          break;
      }
    }
  
    function verificarStatusPedido() {
      const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
      const pedido = pedidos.find(p => p.id == pedidoAtual.id && p.pin == pedidoAtual.pin);
      if (pedido) {
        atualizarEtapasPorStatus(pedido.status);
      }
    }
  
    verificarStatusPedido();
    const statusInterval = setInterval(verificarStatusPedido, 3000);
  });
  
  const botaoTema = document.getElementById('botao-tema');
  const temaSalvo = localStorage.getItem('tema') || 'claro';
  document.body.classList.add(temaSalvo);
  
  if (botaoTema) {
    botaoTema.addEventListener('click', () => {
      document.body.classList.toggle('escuro');
      document.body.classList.toggle('claro');
      const temaAtual = document.body.classList.contains('escuro') ? 'escuro' : 'claro';
      localStorage.setItem('tema', temaAtual);
    });
  }  