import { produtos } from './produtos.js';

document.addEventListener('DOMContentLoaded', () => {
  const carrinhoContainer = document.getElementById('carrinho-itens');
  const subtotalSpan = document.getElementById('subtotal');
  const taxaEntregaSpan = document.getElementById('taxa');
  const totalSpan = document.querySelector('#resumo strong span');
  const btnFinalizar = document.getElementById('btn-finalizar');
  const inputNome = document.getElementById('input-nome');
  const inputEndereco = document.getElementById('input-endereco');

  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  let taxaEntrega = parseFloat(localStorage.getItem('taxaEntrega')) || 7.00;

  function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }

  function renderizarCarrinho() {
    carrinhoContainer.innerHTML = '';

    if (carrinho.length === 0) {
      carrinhoContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
      subtotalSpan.textContent = 'R$0,00';
      taxaEntregaSpan.textContent = `R$${taxaEntrega.toFixed(2)}`;
      totalSpan.textContent = `R$${taxaEntrega.toFixed(2)}`;
      return;
    }

    let subtotal = 0;

    carrinho.forEach((item, index) => {
      const quantidade = Number(item.quantidade) || 1;
      let nomeProduto = item.nome;
      let preco = item.preco;

      if (item.id) {
        const produto = produtos.find(p => p.id === item.id);
        if (produto) {
          nomeProduto = produto.nome;
          preco = produto.preco;
        }
      }

      const itemTotal = preco * quantidade;
      subtotal += itemTotal;

      const div = document.createElement('div');
      div.className = 'item-carrinho';
      div.innerHTML = `
        <p>
          <button class="btn-menos" data-index="${index}">–</button>
          <span class="quantidade">${quantidade}</span>
          <button class="btn-mais" data-index="${index}">+</button>
          x ${nomeProduto} - R$ ${itemTotal.toFixed(2)}
        </p>
      `;
      carrinhoContainer.appendChild(div);
    });

    const total = subtotal + taxaEntrega;

    subtotalSpan.textContent = `R$${subtotal.toFixed(2)}`;
    taxaEntregaSpan.textContent = `R$${taxaEntrega.toFixed(2)}`;
    totalSpan.textContent = `R$${total.toFixed(2)}`;
  }

  carrinhoContainer.addEventListener('click', (e) => {
    const index = Number(e.target.dataset.index);
    if (isNaN(index)) return;

    if (e.target.classList.contains('btn-mais')) {
      carrinho[index].quantidade = (Number(carrinho[index].quantidade) || 1) + 1;
    }

    if (e.target.classList.contains('btn-menos')) {
      carrinho[index].quantidade = (Number(carrinho[index].quantidade) || 1) - 1;
      if (carrinho[index].quantidade <= 0) {
        carrinho.splice(index, 1);
      }
    }

    salvarCarrinho();
    renderizarCarrinho();
  });

  function exibirMensagemPIN(pin) {
    let mensagem = document.getElementById('mensagem-pin');
    if (!mensagem) {
      mensagem = document.createElement('p');
      mensagem.id = 'mensagem-pin';
      mensagem.className = 'mensagem-pin';
      mensagem.style.color = 'green';
      mensagem.style.fontWeight = 'bold';
      mensagem.style.padding = '1rem 0';
      btnFinalizar.insertAdjacentElement('beforebegin', mensagem);
    }

    mensagem.textContent = `Pedido finalizado com sucesso! Seu PIN: ${pin}`;
  }

  btnFinalizar.addEventListener('click', () => {
    const nome = inputNome.value.trim();
    const endereco = inputEndereco.value.trim();

    if (!nome || !endereco || carrinho.length === 0) return;

    const id = Math.floor(1000 + Math.random() * 9000).toString();
    const pin = Math.floor(1000 + Math.random() * 9000).toString();

    const novoPedido = {
      id,
      cliente: nome,
      endereco,
      itens: carrinho,
      taxaEntrega,
      pin,
      status: 'pendente'
    };

    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    pedidos.push(novoPedido);
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
    localStorage.setItem('pedidoAtual', JSON.stringify({ id, pin }));

    localStorage.removeItem('carrinho');
    carrinho = [];
    salvarCarrinho();
    renderizarCarrinho();
    exibirMensagemPIN(pin);

    setTimeout(() => {
      window.location.href = 'acompanhamento.html?pin=' + pin;
    }, 3000);
  });

  renderizarCarrinho();
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