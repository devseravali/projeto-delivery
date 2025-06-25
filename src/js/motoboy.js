document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('form-login');
    const inputNomeMotoboy = document.getElementById('input-nome-motoboy');
    const nomeMotoboyExibido = document.getElementById('nome-motoboy-exibido');
  
    const btnOnline = document.getElementById('btn-online');
    const btnOffline = document.getElementById('btn-offline');
    const statusAtual = document.getElementById('status-atual');
    const listaPedidos = document.querySelector('.lista-pedidos');
    const formPin = document.getElementById('form-pin');
    const inputPin = document.getElementById('input-id');
    const mensagemPin = document.getElementById('mensagem-pin');
  
    let nomeMotoboy = localStorage.getItem('nomeMotoboy') || '';
    let online = JSON.parse(localStorage.getItem('onlineMotoboy')) || false;
  
    let pedidos = JSON.parse(localStorage.getItem('pedidosRestaurante')) || [];
  
    function atualizarNomeMotoboy() {
      if (nomeMotoboy) {
        nomeMotoboyExibido.textContent = `Motoboy: ${nomeMotoboy}`;
        formLogin.style.display = 'none';
        document.getElementById('area-motoboy').style.display = 'block';
      } else {
        nomeMotoboyExibido.textContent = '';
        formLogin.style.display = 'block';
        document.getElementById('area-motoboy').style.display = 'none';
      }
    }
  
    function atualizarStatus() {
      statusAtual.textContent = `Status: ${online ? 'Online' : 'Offline'}`;
      if (online) {
        btnOnline.style.display = 'none';
        btnOffline.style.display = 'inline-block';
        renderizarPedidos();
        formPin.style.display = 'none';
        mensagemPin.textContent = '';
      } else {
        btnOnline.style.display = 'inline-block';
        btnOffline.style.display = 'none';
        listaPedidos.innerHTML = '';
        formPin.style.display = 'none';
        mensagemPin.textContent = '';
      }
    }
  
    function renderizarPedidos() {
      pedidos = JSON.parse(localStorage.getItem('pedidosRestaurante')) || [];
      listaPedidos.innerHTML = '';
  
      const prontos = pedidos.filter(p => p.status === 'pronto' || p.status === 'entregue');
  
      if (prontos.length === 0) {
        listaPedidos.innerHTML = '<li>Nenhum pedido pronto para entrega.</li>';
        formPin.style.display = 'none';
        return;
      }
  
      prontos.forEach(pedido => {
        const li = document.createElement('li');
        li.innerHTML = `
          <strong>Pedido #${pedido.id}</strong><br>
          Cliente: ${pedido.cliente}<br>
          Endereço: ${pedido.endereco}<br>
          Status: ${pedido.status}<br>
        `;
  
        if (pedido.status === 'pronto') {
          li.innerHTML += `<button class="btn-pin" data-id="${pedido.id}">Marcar Entregue (PIN)</button>`;
        } else if (pedido.status === 'entregue') {
          li.innerHTML += `<button class="btn-concluir" data-id="${pedido.id}">Concluir</button>`;
        }
  
        listaPedidos.appendChild(li);
      });
    }
  
    formLogin.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = inputNomeMotoboy.value.trim();
      if (nome) {
        nomeMotoboy = nome;
        localStorage.setItem('nomeMotoboy', nomeMotoboy);
        atualizarNomeMotoboy();
      }
    });
  
    btnOnline.addEventListener('click', () => {
      if (!nomeMotoboy) {
        alert('Por favor, faça login antes de ficar online.');
        return;
      }
      online = true;
      localStorage.setItem('onlineMotoboy', true);
      atualizarStatus();
    });
  
    btnOffline.addEventListener('click', () => {
      online = false;
      localStorage.removeItem('onlineMotoboy');
      nomeMotoboy = '';
      localStorage.removeItem('nomeMotoboy');
      atualizarNomeMotoboy();
      atualizarStatus();
    });
  
    listaPedidos.addEventListener('click', (e) => {
      const btn = e.target;
      const id = Number(btn.dataset.id);
      if (!id) return;
  
      const pedido = pedidos.find(p => p.id === id);
      if (!pedido) return;
  
      if (btn.classList.contains('btn-pin')) {
        formPin.dataset.id = id;
        formPin.style.display = 'block';
        mensagemPin.textContent = '';
      }
  
      if (btn.classList.contains('btn-concluir')) {
        pedido.status = 'concluido';
        localStorage.setItem('pedidosRestaurante', JSON.stringify(pedidos));
        renderizarPedidos();
        mensagemPin.textContent = 'Pedido concluído!';
        mensagemPin.style.color = 'green';
        formPin.style.display = 'none';
      }
    });
  
    formPin.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = Number(formPin.dataset.id);
      const pinDigitado = inputPin.value.trim();
  
      const pedido = pedidos.find(p => p.id === id);
      if (pedido && pedido.pin === pinDigitado) {
        pedido.status = 'entregue';
        localStorage.setItem('pedidosRestaurante', JSON.stringify(pedidos));
        mensagemPin.textContent = 'Entrega confirmada com sucesso!';
        mensagemPin.style.color = 'green';
        renderizarPedidos();
        formPin.style.display = 'none';
      } else {
        mensagemPin.textContent = 'PIN inválido. Verifique e tente novamente.';
        mensagemPin.style.color = 'red';
      }
  
      inputPin.value = '';
    });
  
    atualizarNomeMotoboy();
    atualizarStatus();
  });  