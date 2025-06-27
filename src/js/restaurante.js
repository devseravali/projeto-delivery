import { produtos } from './produtos.js';

document.addEventListener('DOMContentLoaded', () => {
  const pedidosContainer = document.getElementById('pedidos-container');
  const TAXA_ENTREGA = 7.00; // taxa fixa

  function obterPedidos() {
    return JSON.parse(localStorage.getItem('pedidos')) || [];
  }

  function salvarPedidos(pedidos) {
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
  }

  function calcularTotalPedido(itens) {
    let total = 0;
    itens.forEach(item => {
      const produto = produtos.find(p => p.id === item.id);
      if (produto) {
        total += produto.preco * item.quantidade;
      }
    });
    return total;
  }

  function renderizarPedidos() {
    const pedidos = obterPedidos();
    pedidosContainer.innerHTML = '';

    if (pedidos.length === 0) {
      pedidosContainer.innerHTML = '<p>Nenhum pedido no momento.</p>';
      return;
    }

    pedidos.forEach(pedido => {
      const {
        id = '----',
        cliente = 'Desconhecido',
        endereco = 'Não informado',
        status = 'pendente',
        itens = []
      } = pedido;

      const itensHTML = itens.map(item => {
        const produto = produtos.find(p => p.id === item.id);
        const nomeProduto = produto ? produto.nome : 'Produto desconhecido';
        return `<p>${item.quantidade} x ${nomeProduto}</p>`;
      }).join('');

      const totalPedido = calcularTotalPedido(itens);
      const total = totalPedido + TAXA_ENTREGA;

      const div = document.createElement('div');
      div.className = 'pedido-card';

      div.innerHTML = `
        <p><strong>Pedido #${id}</strong></p>
        <p>Cliente: ${cliente}</p>
        <p>Endereço: ${endereco}</p>
        <p>Status: <span class="status-pedido ${status}">${status}</span></p>
        <div class="itens-pedido">
          ${itensHTML}
        </div>
        <p><strong>Total: R$ ${total.toFixed(2)}</strong></p>
        <div class="acoes-pedido">
          ${status === 'pendente' ? `<button class="btn-aceitar" data-id="${id}">Aceitar (Em preparo)</button>` : ''}
          ${status === 'preparo' ? `<button class="btn-pronto" data-id="${id}">Pedido Pronto</button>` : ''}
          ${status === 'pronto' ? `<em>Aguardando entrega pelo motoboy</em>` : ''}
          ${status === 'entregue' ? `<em>Pedido entregue</em>` : ''}
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

    const pedidos = obterPedidos();
    const pedido = pedidos.find(p => p.id === id);
    if (!pedido) return;

    if (btn.classList.contains('btn-aceitar')) {
      pedido.status = 'preparo';
    } else if (btn.classList.contains('btn-pronto')) {
      pedido.status = 'pronto';
    }

    salvarPedidos(pedidos);
    renderizarPedidos();
  });

  renderizarPedidos();
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