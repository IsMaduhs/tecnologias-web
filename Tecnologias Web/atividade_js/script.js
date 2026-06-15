// Verifica se o token existe na sessão do navegador
if (!sessionStorage.getItem('token')) {
    alert('Acesso negado! Por favor, faça login primeiro.');
    window.location.href = 'login/login.html'; // Manda de volta pro login se tentar burlar
}
let listaProdutos = [];
let novoId = 1;

//lembrar de corrigir para o id grid-cards
const container = document.getElementById("grid-cards");
const btnAdd = document.getElementById("btn-add");

async function carregarDados() {

/*Se o arquivo cards.json tiver sido apagado ou e a internet
do usuário cair no meio da requisição, o navegador vai disparar
um erro crítico. O JavaScript simplesmente para de funcionar
inteiramente. COM o try, O erro é capturado de forma isolada,
o navegador percebe a falha, interrompe o que estava dentro do
try e executa o que você programou dentro do catch.*/

try {
    const resposta = await fetch('cards.json');
    listaProdutos = await resposta.json();
    listaProdutos.forEach(produto => criarCard(produto));
}
catch (error) {
    console.error("Erro ao carregar o arquivo JSON:",error)
}
}


/* recebe as informações de um produtoe cria um
elemento <article> com a classe card no HTML. */
function criarCard(dados) {
const novoCard = document.createElement("article");
novoCard.classList.add("card");

novoCard.setAttribute("data-id", novoId);
novoId++;

novoCard.innerHTML =
`<img src="${dados.imagem}" alt="${dados.titulo}">
<h2>${dados.titulo}</h2>
<p>${dados.descricao}</p>
<a href="https://www.funko.com.br" target="_blank">
<button>Visitar</button>
</a>`;

container.insertBefore(novoCard, btnAdd);
}

btnAdd.addEventListener('click', () => {
    if (listaProdutos.length === 0) return;
    
    // Escolhe dinamicamente o próximo item para repetir sem quebrar o layout
    const proximoIndex = (novoId - 1) % listaProdutos.length;
    criarCard(listaProdutos[proximoIndex]);
});

// Executa a carga inicial
carregarDados();
