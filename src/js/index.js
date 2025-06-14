const botaoTema = document.getElementById("botao-tema");

const temaSalvo = localStorage("tema");
if (temaSalvo) {
    document.body.classList.add(temaSalvo);
    botaoTema.textContent = temaSalvo === "escuro" ? "☀️" : "🌙";
}

botaoTema.addEventListener("click", () => {
    document.body.classList.toggle("escuro");
    document.body.classList.toggle("claro");

    const temaAtual = document.body.classList.contains("escuro") ? "escuro" : "claro";

    botaoTema.textContent = temaAtual === "escuro" ? "☀️" : "🌙";
    localStorage.setItem("tema", temaAtual);
});

function atualizarContadorCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    document.getElementById("contador-carrinho").textContent = carrinho.length;
}

atualizarContadorCarrinho();

