document.addEventListener('DOMContentLoaded', () => {
  const formLogin = document.getElementById('form-login');
  const inputNomeMotoboy = document.getElementById('input-nome-motoboy');
  const inputSenhaMotoboy = document.getElementById('input-senha-motoboy');
  const nomeMotoboyExibido = document.getElementById('nome-motoboy-exibido');

  const btnToggleStatus = document.getElementById('btn-toggle-status');
  const statusAtual = document.getElementById('status-atual');

  const listaPedidos = document.querySelector('.lista-pedidos');
  const detalhesClienteContainer = document.getElementById('detalhes-cliente');
  const nomeClienteSpan = document.getElementById('nome-cliente');
  const enderecoClienteSpan = document.getElementById('endereco-cliente');

  const formPin = document.getElementById('form-pin');
  const inputPin = document.getElementById('input-pin');
  const mensagemPin = document.getElementById('mensagem-pin');

  const areaMotoboy = document.getElementById('area-motoboy');

  let motoboyOnline = false;
  let motoboyNome = '';
  let pedidosMotoboy = [];

  areaMotoboy.style.display = 'none';
  detalhesClienteContainer.style.display = 'none';

  formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = inputNomeMotoboy.value.trim();
    const senha = inputSenhaMotoboy.value.trim();
    if (nome && senha) {
      motoboyNome = nome;
      nomeMotoboyExibido.textContent = `Bem-vindo, ${nome}`;
      areaMotoboy.style.display = 'block';
      formLogin.style.display = 'none';
      setStatusOffline();
    }
  });

  btnToggleStatus.addEventListener('click', () => {
    if (motoboyOnline) {
      setStatusOffline();
    } else {
      setStatusOnline();
    }
  });

  function setStatusOnline() {
    motoboyOnline = true;
    statusAtual.textContent = 'Status: Online';
    btnToggleStatus.textContent = 'Offline';
    carregarPedidosMotoboy();
  }

  function setStatusOffline() {
    motoboyOnline = false;
    statusAtual.textContent = 'Status: Offline';
    btnToggleStatus.textContent = 'Online';
    listaPedidos.innerHTML = '';
    detalhesClienteContainer.style.display = 'none';
  }

  function carregarPedidosMotoboy() {
    const todosPedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    pedidosMotoboy = todosPedidos.filter(p => p.status === 'pronto' && p.motoboy === motoboyNome);

    if (pedidosMotoboy.length === 0) {
      const pedidosDisponiveis = todosPedidos.filter(p => p.status === 'pronto' && !p.motoboy);
      pedidosMotoboy = pedidosDisponiveis.slice(0, 2);
      pedidosMotoboy.forEach(p => p.motoboy = motoboyNome);

      const pedidosAtualizados = todosPedidos.map(p => {
        const atribuido = pedidosMotoboy.find(pm => pm.id === p.id);
        return atribuido ? atribuido : p;
      });

      localStorage.setItem('pedidos', JSON.stringify(pedidosAtualizados));
    } else if (pedidosMotoboy.length > 2) {
      pedidosMotoboy = pedidosMotoboy.slice(0, 2);
    }

    renderizarListaPedidos();
  }

  function renderizarListaPedidos() {
    listaPedidos.innerHTML = '';
    detalhesClienteContainer.style.display = 'none';

    if (pedidosMotoboy.length === 0) {
      listaPedidos.innerHTML = '<li>Nenhum pedido disponível.</li>';
      return;
    }

    pedidosMotoboy.forEach((pedido, index) => {
      const li = document.createElement('li');
      li.textContent = `Pedido #${pedido.id}`;
      li.style.cursor = 'pointer';
      li.dataset.index = index;

      li.addEventListener('click', () => {
        Array.from(listaPedidos.children).forEach(child => child.classList.remove('selecionado'));
        li.classList.add('selecionado');

        const nomeCliente = pedido.cliente || pedido.nomeCliente || '';
        const enderecoCliente = pedido.endereco || pedido.enderecoCliente || '';

        nomeClienteSpan.textContent = nomeCliente;
        enderecoClienteSpan.textContent = enderecoCliente;
        detalhesClienteContainer.style.display = 'block';
      });

      listaPedidos.appendChild(li);
    });
  }

  formPin.addEventListener('submit', (e) => {
    e.preventDefault();
    const pinDigitado = inputPin.value.trim();
    if (!pinDigitado) return;

    const todosPedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    const pedido = todosPedidos.find(p =>
      p.pin === pinDigitado && p.status === 'pronto' && p.motoboy === motoboyNome
    );

    if (!pedido) {
      exibirMensagem('PIN inválido ou pedido não disponível para entrega.', false);
      return;
    }

    pedido.status = 'entregue';
    localStorage.setItem('pedidos', JSON.stringify(todosPedidos));
    exibirMensagem(`Pedido #${pedido.id} entregue com sucesso!`, true);
    carregarPedidosMotoboy();
    inputPin.value = '';
    detalhesClienteContainer.style.display = 'none';
  });

  function exibirMensagem(msg, sucesso = true) {
    mensagemPin.textContent = msg;
    mensagemPin.style.color = sucesso ? 'green' : 'red';
    mensagemPin.style.display = 'block';
    setTimeout(() => {
      mensagemPin.textContent = '';
      mensagemPin.style.display = 'none';
    }, 4000);
  }

  const botaoTema = document.getElementById('botao-tema');
  const temaSalvo = localStorage.getItem('tema') || 'claro';
  document.body.classList.add(temaSalvo);

  botaoTema.addEventListener('click', () => {
    document.body.classList.toggle('escuro');
    document.body.classList.toggle('claro');
    const temaAtual = document.body.classList.contains('escuro') ? 'escuro' : 'claro';
    localStorage.setItem('tema', temaAtual);
  });
});

