const botaoTema = document.getElementById('botao-tema');

const temaSalvo = localStorage.getItem('tema') || 'claro'; 
document.body.classList.add(temaSalvo);

botaoTema.addEventListener('click', () => {
    document.body.classList.toggle('escuro');
    document.body.classList.toggle('claro');

    const temaSalvo = document.body.classList.contains('escuro') ? 'escuro' :  'claro';

    localStorage.setItem('tema', temaAtual);
});

function atualizarContadorCarrinho(){
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    let total = 0;
    carrinho.forEach(item => {
        total += item.quantidade || 1;
    });

    document.getElementById('contador-carrinho').textContent = total;
}

atualizarContadorCarrinho(); 
