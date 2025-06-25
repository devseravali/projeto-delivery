import { produtos } from './produtos.js';

document.addEventListener('DOMContentLoaded', () => {
  const carrinhoContainer = document.getElementById('carrinho-itens');
  const subtotalSpan = document.getElementById('subtotal');
  const taxaEntregaSpan = document.getElementById('taxa');
  const totalSpan = document.getElementById('total');
  const contadorCarrinho = document.getElementById('contador-carrinho');

  const btnFinalizar = document.getElementById('btn-finalizar');
  const btnCalcularTaxa = document.getElementById('btn-calcular-taxa');
  const mensagemDiv = document.getElementById('mensagem');

  const nomeInput = document.getElementById('nome');
  const enderecoInput = document.getElementById('endereco');
  const bairroInput = document.getElementById('bairro');

  const taxaPorBairro = {
    "centro": 6.00,
    "jardim paulista": 7.00,
    "vila augusta": 9.00,
    "parque cecap": 8.00,
    "continental 1": 4.00
  };

  let taxaEntrega = 0;

  function atualizarContador() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const totalItens = carrinho.reduce((total, item) => total + (Number(item.quantidade) || 0), 0);
    contadorCarrinho.textContent = totalItens;
  }

  function renderizarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinhoContainer.innerHTML = '';

    if (carrinho.length === 0) {
      carrinhoContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
      subtotalSpan.textContent = 'R$ 0,00';
      taxaEntregaSpan.textContent = 'R$ 0,00';
      totalSpan.textContent = 'R$ 0,00';
      return;
    }

    let subtotal = 0;

    carrinho.forEach(item => {
      const produto = produtos.find(p => p.id === item.id);
      if (!produto) return;

      const quantidade = Number(item.quantidade) || 1;
      const precoUnitario = Number(produto.preco) || 0;
      const precoTotalItem = precoUnitario * quantidade;
      subtotal += precoTotalItem;

      const div = document.createElement('div');
      div.classList.add('produto-carrinho');
      div.innerHTML = `
        <h3>${produto.nome}</h3>
        <p>Preço unitário: R$ ${precoUnitario.toFixed(2)}</p>
        <p>Quantidade: 
          <button class="diminuir" data-id="${produto.id}">-</button>
          ${quantidade}
          <button class="aumentar" data-id="${produto.id}">+</button>
        </p>
        <p>Subtotal item: R$ ${precoTotalItem.toFixed(2)}</p>
        <button class="remover" data-id="${produto.id}">Remover</button>
      `;
      carrinhoContainer.appendChild(div);
    });

    subtotalSpan.textContent = `R$ ${subtotal.toFixed(2)}`;
    taxaEntregaSpan.textContent = `R$ ${taxaEntrega.toFixed(2)}`;
    totalSpan.textContent = `R$ ${(subtotal + taxaEntrega).toFixed(2)}`;
  }

  carrinhoContainer.addEventListener('click', (e) => {
    const btn = e.target;
    const idAttr = btn.dataset.id;
    if (!idAttr) return;

    const id = Number(idAttr);
    if (isNaN(id)) return;

    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const item = carrinho.find(i => i.id === id);
    if (!item) return;

    if (btn.classList.contains('aumentar')) {
      item.quantidade = (Number(item.quantidade) || 1) + 1;
    } else if (btn.classList.contains('diminuir')) {
      item.quantidade = Math.max(1, (Number(item.quantidade) || 1) - 1);
    } else if (btn.classList.contains('remover')) {
      const index = carrinho.indexOf(item);
      if (index > -1) carrinho.splice(index, 1);
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarContador();
    renderizarCarrinho();
  });

  btnCalcularTaxa.addEventListener('click', () => {
    const bairro = bairroInput.value.trim().toLowerCase();

    if (taxaPorBairro.hasOwnProperty(bairro)) {
      taxaEntrega = taxaPorBairro[bairro];
      exibirMensagem(`Taxa de entrega: R$ ${taxaEntrega.toFixed(2)}`, '#d4edda', '#155724');
    } else {
      taxaEntrega = 0;
      exibirMensagem('Bairro não encontrado. Taxa não aplicada.', '#f8d7da', '#721c24');
    }

    renderizarCarrinho();
  });

  function exibirMensagem(texto, corFundo = '#ffeeba', corTexto = '#856404') {
    mensagemDiv.textContent = texto;
    mensagemDiv.style.backgroundColor = corFundo;
    mensagemDiv.style.color = corTexto;
    mensagemDiv.classList.add('mostrar');
    setTimeout(() => {
      mensagemDiv.classList.remove('mostrar');
    }, 3000);
  }

  btnFinalizar.addEventListener('click', () => {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    if (carrinho.length === 0) {
      exibirMensagem('Seu carrinho está vazio.', '#f8d7da', '#721c24');
      return;
    }

    const nome = nomeInput.value.trim();
    const endereco = enderecoInput.value.trim();
    if (!nome || !endereco) {
      exibirMensagem('Preencha nome e endereço corretamente.', '#f8d7da', '#721c24');
      return;
    }

    let pedidos = JSON.parse(localStorage.getItem('pedidosRestaurante')) || [];

    const novoPedido = {
      id: Date.now(),
      pin: Math.floor(1000 + Math.random() * 9000).toString(),
      cliente: nome,
      endereco: endereco,
      itens: carrinho,
      taxaEntrega,
      status: 'pendente',
      data: new Date().toISOString()
    };

    pedidos.push(novoPedido);
    localStorage.setItem('pedidosRestaurante', JSON.stringify(pedidos));
    localStorage.removeItem('carrinho');
    taxaEntrega = 0;

    atualizarContador();
    renderizarCarrinho();
    exibirMensagem(`Pedido enviado! Número: ${novoPedido.id}, PIN: ${novoPedido.pin}`, '#d4edda', '#155724');
  });

  atualizarContador();
  renderizarCarrinho();
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