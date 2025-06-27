import { produtos } from './produtos.js';

const gridProdutos = document.getElementById('grid-produtos');
const filtroTipo = document.getElementById('filtro-tipo');
const filtroPreco = document.getElementById('filtro-preco');
const valorPreco = document.getElementById('valor-preco');
const contadorCarrinho = document.getElementById('contador-carrinho');
const botaoTema = document.getElementById('botao-tema');

function formatarPreco(preco) {
  return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function criarListaAdicionais(nomeGrupo, adicionais) {
  if (!adicionais || adicionais.length === 0) return '';

  let html = `<div class="adicionais-grupo"><strong>${nomeGrupo}:</strong><ul>`;
  adicionais.forEach((item) => {
    html += `
      <li>
        <img src="${item.imagem}" alt="${item.nome}" class="adicional-img" />
        ${item.nome} - ${formatarPreco(item.preco)}
        <button data-nome="${item.nome}" data-preco="${item.preco}" class="btn-adicional">Adicionar</button>
      </li>`;
  });
  html += '</ul></div>';
  return html;
}

function mostrarProdutos() {
  const tipoSelecionado = filtroTipo.value;
  const precoMaximo = Number(filtroPreco.value);
  gridProdutos.innerHTML = '';

  const produtosFiltrados = produtos.filter(produto => {
    const tipoOk = !tipoSelecionado || tipoSelecionado === 'todos' || produto.tipo === tipoSelecionado;
    const precoOk = produto.preco <= precoMaximo;
    return tipoOk && precoOk;
  });

  produtosFiltrados.forEach(produto => {
    const card = document.createElement('div');
    card.className = 'produto';

    card.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}" class="produto-imagem" />
      <h3>${produto.nome}</h3>
      <p class="preco">${formatarPreco(produto.preco)}</p>
      <p>${produto.descricao || ''}</p>
      <button data-id="${produto.id}" class="btn-produto">Adicionar Produto</button>
      <button class="btn-toggle-adicionais">Mostrar Adicionais</button>
      <div class="adicionais-container" style="display:none;">
        ${criarListaAdicionais('Adicionais Promocionais', produto.adicionalPromocional)}
        ${criarListaAdicionais('Bebidas', produto.adicionalBebidas)}
        ${criarListaAdicionais('Talheres', produto.adicionalTalheres)}
      </div>
    `;

    gridProdutos.appendChild(card);
  });
}

function atualizarContador() {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const total = carrinho.reduce((soma, item) => soma + (item.quantidade || 1), 0);
  contadorCarrinho.textContent = total;
}

function adicionarAoCarrinho(id = null, nome = null, preco = null) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  const produtoExistente = carrinho.find(item => 
    (id !== null && item.id === id) || 
    (nome !== null && item.nome === nome)
  );

  if (produtoExistente) {
    produtoExistente.quantidade = (produtoExistente.quantidade || 1) + 1;
  } else {
    carrinho.push({
      id: id || null,
      nome: nome || null,
      preco: preco || null,
      quantidade: 1,
    });
  }

  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  atualizarContador();
}

botaoTema.addEventListener('click', () => {
  document.body.classList.toggle('escuro');
  document.body.classList.toggle('claro');
  const temaAtual = document.body.classList.contains('escuro') ? 'escuro' : 'claro';
  localStorage.setItem('tema', temaAtual);
});

filtroTipo.addEventListener('change', mostrarProdutos);
filtroPreco.addEventListener('input', () => {
  valorPreco.textContent = `R$${filtroPreco.value},00`;
  mostrarProdutos();
});

gridProdutos.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    if (e.target.classList.contains('btn-produto')) {
      const id = Number(e.target.dataset.id);
      adicionarAoCarrinho(id);
    }

    else if (e.target.classList.contains('btn-adicional')) {
      const nome = e.target.dataset.nome;
      const preco = Number(e.target.dataset.preco);
      adicionarAoCarrinho(null, nome, preco);
    }

    else if (e.target.classList.contains('btn-toggle-adicionais')) {
      const container = e.target.nextElementSibling;
      const visivel = container.style.display === 'block';
      container.style.display = visivel ? 'none' : 'block';
      e.target.textContent = visivel ? 'Mostrar Adicionais' : 'Ocultar Adicionais';
    }
  }
});

mostrarProdutos();
atualizarContador();