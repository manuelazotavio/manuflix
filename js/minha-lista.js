let listaStreamings = JSON.parse(localStorage.getItem("listaStreamings")) || [];

// logica para cadastrar um streaming

const modalAdicionarStreaming = document.querySelector(
  ".modal-cadastro-streaming"
);

const overlay = document.querySelector(".overlay");

const adicionarStreaming = document.querySelector("#adicionar-streaming"); //botao para adicionar um novo streaming

adicionarStreaming.addEventListener("click", function () {
  console.log("oi");
  modalAdicionarStreaming.style.display = "block"; //abre o modal de cadastrar q possui um form
  overlay.style.display = "block";
});

const cadastrarForm = document.querySelector("#criar-streaming-form"); //pega o form dentro do modal

cadastrarForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("to aqui");

  const tipoStreaming = document.querySelector(
    'input[name="tipo-cadastro"]:checked' //vai pegar o radio que está marcado
  ).value;

  const nomeStreaming = document.querySelector("#nome-streaming-cadastro").value;

  const descricaoStreaming = document.querySelector(
    "#descricao-streaming-cadastro"
  ).value;

  const imagemStreaming = document.querySelector("#imagem-streaming-cadastro").value;

  const novoStreaming = { //dados coletados do form
    tipo: tipoStreaming,
    nome: nomeStreaming,
    descricao: descricaoStreaming,
    imagem: imagemStreaming,
  };


  console.log(novoStreaming);

  listaStreamings.push(novoStreaming);

  localStorage.setItem("listaStreamings", JSON.stringify(listaStreamings));

  modalAdicionarStreaming.style.display = "none";
  overlay.style.display = "none";

    location.reload();
});

const cancelarStreamingCadastro = document.querySelector(
  "#cancelarStreamingCadastro" //sai do modal de criacao do streaming
);

cancelarStreamingCadastro.addEventListener("click", function () {
  modalAdicionarStreaming.style.display = "none";
  overlay.style.display = "none";
});


const filmeCards = document.getElementsByClassName("filme-cards")[0]; //pega div dos filmes
const serieCards = document.getElementsByClassName("series-cards")[0]; //pega div das series

listaStreamings.forEach((streaming) => {
  const card = document.createElement("div");
  card.classList.add("card-streaming");
  card.id = `streaming-${listaStreamings.indexOf(streaming)}`;
  card.innerHTML = `
              <img src="${streaming.imagem}" alt="${streaming.nome}" />
              <h3 style="color: white">${streaming.nome}</h3>
              <p>${streaming.descricao}</p>
              <div class="acoes">
                <button class="excluir-streaming" id="excluir-streaming-${listaStreamings.indexOf(
                  streaming
                )}">Excluir</button>
                <button class="editar-streaming" id="editar-streaming-${listaStreamings.indexOf(
                  streaming
                )}">Editar</button>
              </div>
            `;

  if (streaming.tipo === "filme") {
    filmeCards.appendChild(card); //se for um filme ja coloca na div correspondente
  } else if (streaming.tipo === "serie") {
    serieCards.appendChild(card);
  }
});

document.addEventListener("click", (e) => {
  if (e.target.matches("[id^='excluir-streaming-']")) {

    const index = e.target.id.split("-").pop();

    listaStreamings.splice(index, 1); //pega o id, e corta so 1 item da lista

    localStorage.setItem("listaStreamings", JSON.stringify(listaStreamings));

    location.reload();
  }

  if (e.target.matches("[id^='editar-streaming-']")) {
    const index = e.target.id.split("-").pop();

    indexEditado = index;

    const streaming = listaStreamings[index]; //acha no array o index q é pra editar

    document.querySelector("#nomeStreaming").value = streaming.nome;
    document.querySelector("#descricaoStreaming").value = streaming.descricao;
    document.querySelector("#imagemStreaming").value = streaming.imagem;
    document.querySelector(`input[name="tipo"][value="${streaming.tipo}"]`).checked = true; //coloca todos os campos q achou na posicao do array

    modalEdicaoStreaming.style.display = "block";
    overlay.style.display = "block";
  }
});

const modalEdicaoStreaming = document.querySelector(".modal-edicao-streaming");


const editarForm = document.querySelector("#editar-streaming-form"); //pega o form dentro do modal

editarForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const tipoStreaming = document.querySelector(
    'input[name="tipo"]:checked'
  ).value;

  const nomeStreaming = document.querySelector("#nomeStreaming").value;

  const descricaoStreaming = document.querySelector(
    "#descricaoStreaming"
  ).value;

  const imagemStreaming = document.querySelector("#imagemStreaming").value;

  const novoStreaming = {
    tipo: tipoStreaming,
    nome: nomeStreaming,
    descricao: descricaoStreaming,
    imagem: imagemStreaming,
  };

  listaStreamings[indexEditado] = novoStreaming;
  localStorage.setItem("listaStreamings", JSON.stringify(listaStreamings));

  modalEdicaoStreaming.style.display = "none";
  overlay.style.display = "none";

  location.reload();
   })



function atualizarParagrafo() {
  const paragrafo = document.getElementById("paragrafo-lista");
  if (listaStreamings.length === 0) {
    paragrafo.innerText =
      "Sua lista está vazia. Adicione filmes e séries para começar!";
  } else {
    paragrafo.innerText =
      "Aqui estão os filmes e séries que você adicionou à sua lista.";
  }
}

function atualizarFilmes() {
  const filmes = listaStreamings.filter(
    (streaming) => streaming.tipo === "filme"
  );

  if (filmes.length === 0) {
    filmeCards.innerHTML =
      "<p style='color: white;'>Nenhum filme cadastrado!</p>";
  }
}

function atualizarSeries() {
  const series = listaStreamings.filter(
    (streaming) => streaming.tipo === "serie"
  );

  if (series.length === 0) {
    serieCards.innerHTML =
      "<p style='color: white;'>Nenhuma série cadastrada!</p>";
  }
}
atualizarParagrafo();
atualizarFilmes();
atualizarSeries();


