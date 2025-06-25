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
          <p>Status: <span class="status-pedido ${pedido.status}">${pedido.status}</span></p>
          <div class="itens-pedido">
            ${pedido.itens.map(i => `<p>${i.quantidade} x ${i.nome}</p>`).join('')}
          </div>
          <div class="acoes-pedido">
            ${pedido.status === 'pendente' ? `<button class="btn-aceitar" data-id="${pedido.id}">Aceitar</button>` : ''}
            ${pedido.status === 'preparo' ? `<button class="btn-pronto" data-id="${pedido.id}">Pronto</button>` : ''}
          </div>
        `;
  
        pedidosContainer.appendChild(div);
      });
    }
  
    pedidosContainer.addEventListener('click', (e) => {
      const btn = e.target;
      const id = Number(btn.dataset.id);
      if (!id) return;
  
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
  
    function receberNovoPedido() {
      const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
      if (carrinho.length > 0) {
        const novoPedido = {
          id: Date.now(),
          itens: carrinho,
          status: 'pendente'
        };
        pedidos.push(novoPedido);
        localStorage.setItem('pedidosRestaurante', JSON.stringify(pedidos));
        localStorage.removeItem('carrinho');
        renderizarPedidos();
      }
    }
  
    renderizarPedidos();
    receberNovoPedido();
  });  