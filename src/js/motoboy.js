document.addEventListener('DOMContentLoaded', () => {
    const btnOnline = document.getElementById('btn-online');
    const btnOffline = document.getElementById('btn-offline');
    const statusAtual = document.getElementById('status-atual');
    const listaPedidos = document.querySelector('.lista-pedidos');
    const formPin = document.getElementById('form-pin');
    const inputPin = document.getElementById('input-id');
    const mensagemPin = document.getElementById('mensagem-pin');

    let online = false;

    let pedidos = [ 
        {id: 201, pin:'4321'},
        {id: 202, pin:'8765'},
        {id: 203, pin:'1098'}
    ];

    function atualizarStatus() {
        statusAtual.textContent = `Status: ${online ? 'Online' : 'Offline'}`;
    }

    function renderizarPedidos() {
        listaPedidos.innerHTML = '';

        if (pedidos.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'Nenhum pedido encontrado';
            listaPedidos.appendChild(li);
            return;
        }

        pedidos.forEach(pedido => {
            const li = document.createElement('li');
            li.textContent = `Pedido #${pedido.id}`;  
            listaPedidos.appendChild(li);
        });
    }

    btnOnline.addEventListener('click', () => {
        online = true;
        atualizarStatus();
    });

    btnOffline.addEventListener('click', () => {
        online = false;
        atualizarStatus();
    });

    formPin.addEventListener('submit', (e) => {
        e.preventDefault();

        const pinDigitado = inputPin.value.trim();

        const index = pedidos.findIndex(p => p.pin === pinDigitado);

        if (index !== -1) {
            pedidos.splice(index, 1);
            renderizarPedidos();

            mensagemPin.textContent = 'Entrega confirmada com sucesso!';
            mensagemPin.style.color = 'green';
        } else {
            mensagemPin.textContent = 'PIN inválido. Verifique e tente novamente.';
            mensagemPin.style.color = 'red';
        }

        mensagemPin.classList.add('mostrar');
        inputPin.value = '';
    });

    atualizarStatus();
    renderizarPedidos();
});