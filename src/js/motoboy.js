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
    let online = JSON.parse(localStorage.getItem('online')) || false;

    let pedidos = [ 
        {id: 201, pin:'4321', cliente: 'Ana Silva', endereco: 'Rua das Flores, 123'},
        {id: 202, pin:'8765', cliente: 'João Souza', endereco: 'Av. Brasil, 456'},
        {id: 203, pin:'1098', cliente: 'Maria Oliveira', endereco: 'Praça Central, 789'}
    ];    

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
            listaPedidos.style.display = 'block';  
            formPin.style.display = 'block';       
        } else {
            btnOnline.style.display = 'inline-block';
            btnOffline.style.display = 'none';
            listaPedidos.style.display = 'none';   
            formPin.style.display = 'none';        
            mensagemPin.textContent = '';          
        }
    }

    function renderizarPedidos() {
        listaPedidos.innerHTML = '';

        if (pedidos.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'Nenhum pedido encontrado';
            listaPedidos.appendChild(li);
            return;
        }

        const pedidosExibir = pedidos.slice(0, 2);

        pedidosExibir.forEach(pedido => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>Pedido #${pedido.id}</strong><br>
                Cliente: ${pedido.cliente}<br>
                Endereço: ${pedido.endereco}
            `;  
            listaPedidos.appendChild(li);
        });

        if (pedidos.length > 2) {
            const li = document.createElement('li');
            li.style.fontStyle = 'italic';
            li.textContent = `+ ${pedidos.length - 2} pedido(s) aguardando...`;
            listaPedidos.appendChild(li);
        }
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
        localStorage.setItem('online', true);
        atualizarStatus();
        renderizarPedidos();
    });

    btnOffline.addEventListener('click', () => {
        online = false;
        localStorage.removeItem('online');
        nomeMotoboy = '';
        localStorage.removeItem('nomeMotoboy');
        atualizarNomeMotoboy();
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

    atualizarNomeMotoboy();
    atualizarStatus();
    renderizarPedidos();
});