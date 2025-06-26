document.addEventListener('DOMContentLoaded', () => {
    const pedidosContainer = document.getElementById('pedidos-container');
  
       let pedidos = JSON.parse(localStorage.getItem('pedidosRestaurante')) || [];
  
    function renderizarPedidos() {
      pedidosContainer.innerHTML = '';
  
      if (pedidos.length === 0) {
        pedidosContainer.innerHTML = '<p>Nenhum pedido no momento.</p>';
        return;
      }
  
      pedidos.forEach(pedido => {
        const div = document.createElement('div');
        div.className = 'pedido-card';
  
        div.innerHTML = `
          <p><strong>Pedido #${pedido.id}</strong></p>
          <p>Cliente: ${pedido.cliente || 'Desconhecido'}</p>
          <p>Endereço: ${pedido.endereco || 'Não informado'}</p>
          <p>PIN: ${pedido.pin || 'Não informado'}</p>
          <p>Status: <span class="status-pedido ${pedido.status}">${pedido.status}</span></p>
          <div class="itens-pedido">
            ${pedido.itens.map(i => `<p>${i.quantidade} x ${i.nome}</p>`).join('')}
          </div>
          <div class="acoes-pedido">
            ${pedido.status === 'pendente' ? `<button class="btn-aceitar" data-id="${pedido.id}">Aceitar (Em preparo)</button>` : ''}
            ${pedido.status === 'preparo' ? `<button class="btn-pronto" data-id="${pedido.id}">Pedido Pronto</button>` : ''}
            ${pedido.status === 'pronto' ? `<em>Aguardando entrega pelo motoboy</em>` : ''}
          </div>
        `;
  
        pedidosContainer.appendChild(div);
      });
    }
  
    pedidosContainer.addEventListener('click', (e) => {
      const btn = e.target;
      if (!btn.dataset.id) return;
  
      const id = Number(btn.dataset.id);
      if (isNaN(id)) return;
  
      const pedido = pedidos.find(p => p.id === id);
      if (!pedido) return;
  
      if (btn.classList.contains('btn-aceitar')) {
        pedido.status = 'preparo';
      } else if (btn.classList.contains('btn-pronto')) {
        pedido.status = 'pronto';
      }
  
      localStorage.setItem('pedidosRestaurante', JSON.stringify(pedidos));
      renderizarPedidos();
    });
  
    renderizarPedidos();
  });  

const botaoTema = document.getElementById('botao-tema');
const temaSalvo = localStorage.getItem('tema') || 'claro';
document.body.classList.add(temaSalvo);

botaoTema.addEventListener('click', () => {
  document.body.classList.toggle('escuro');
  document.body.classList.toggle('claro');
  const temaAtual = document.body.classList.contains('escuro') ? 'escuro' : 'claro';
  localStorage.setItem('tema', temaAtual);
});