document.addEventListener('DOMContentLoaded', () => {
    const numeroPedidoEl = document.getElementById('numero-pedido');
    const pinPedidoEl = document.getElementById('pin-pedido');
    const tempoPedido = document.getElementById('tempo-pedido');
    const etapas = document.querySelectorAll('.barra-progresso .etapa');
    const mensagemFinal = document.querySelector('.mensagem-final');

    const numeroPedido = Math.floor(1000 + Math.random() * 90000);
    const pin = Math.floor(1000 + Math.random() * 9000);

    numeroPedidoEl.textContent = ` ${numeroPedido}`;
    pinPedidoEl.textContent = ` ${pin}`;

    let minutos = 5;
    let segundos = 0;

    function atualizarTempo() {
        const minStr = String(minutos).padStart(2, '0');
        const segStr = String(segundos).padStart(2, '0');
        tempoPedido.textContent = ` ${minStr}:${segStr}`;
    }

    atualizarTempo();

    const timer = setInterval(() => {
        if (minutos === 0 && segundos === 0) {
            clearInterval(timer);
            clearInterval(etapaInterval);
            finalizarPedido();
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

    let etapaAtual = 1;
    const etapaInterval = setInterval(() => {
        if (etapaAtual < etapas.length) {
            etapas[etapaAtual].classList.add('ativo');
            etapaAtual++;
        } else {
            clearInterval(etapaInterval);
        }
    }, 90000);

    function finalizarPedido() {
        etapas.forEach(etapa => etapa.classList.add('ativo'));
        mensagemFinal.classList.remove('none');
    }
});