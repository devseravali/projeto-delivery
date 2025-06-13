const botaoTema = document.getElementById("botao-tema");

botaoTema.addEventListener("click", () => {
    document.body.toggle("escuro");
    document.body.toggle("claro");
    botaoTema.textContent = document.body.classList.contains("escuro") ? "☀️" : "🌙";
});

function atualizarContadorCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    document.getElementById("contador-carrinho").textContent = carrinho.length;
}

atualizarContadorCarrinho();

