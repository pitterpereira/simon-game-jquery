/* ----------------------------------------------------------------------- */
/* VARIÁVEIS */
/* ----------------------------------------------------------------------- */

let coresDosBotoes = ["red", "blue", "green", "yellow"];

// Array que recebe as cores de cada etapa
let padraoDoJogo = [];
let padraoDoUsuario = [];

let level = 0;
let recorde = 0;

/* ----------------------------------------------------------------------- */
/* LÓGICA */
/* ----------------------------------------------------------------------- */

// Iniciar o jogo
$(document).keydown(function (event) {

    // Se teclar a letra "a", inicia o jogo
    if (event.key.toLowerCase() === "a" && level === 0) {

        //Mostra o nível do jogo no h1
        $("h1#level-title").text("Nível " + level);

        proximaSequencia();
    }
});

// Em cada clique do mouse...
$(".btn").click(function () {

    // Recebe a cor escolhida pelo clique do usuário e adiciona no array
    let corClicada = $(this).attr('id');
    padraoDoUsuario.push(corClicada);

    animarClique(this);
    tocarSom(corClicada);

    // A cada clique, checa 
    checarResposta(padraoDoUsuario.length - 1);
}); 

/* ----------------------------------------------------------------------- */
/* FUNÇÕES */
/* ----------------------------------------------------------------------- */

// Muda para o próximo nível do jogo
function proximaSequencia() {

    padraoDoUsuario = [];
    level++;

    $("#level-title").text("Level " + level);

    // Escolhe um número aleatório entre 0 e 3 e o coloca no padrão de acordo com a cor no vetor
    let numeroAleat1a3 = Math.floor(Math.random() * 4);
    let corAleatEscolhida = coresDosBotoes[numeroAleat1a3];
    padraoDoJogo.push(corAleatEscolhida);

    // Pisca o botão e toca um som de acordo com a cor que saiu
    $("div#" + corAleatEscolhida).fadeOut(100).fadeIn(100);
    tocarSom(corAleatEscolhida);
}

//Toca um som específico para cada cor
function tocarSom(corClicada) {
    audio = new Audio("/sounds/" + corClicada + ".mp3");
    audio.play();
}

// Animação do clique no botão
function animarClique(botao) {
    $(botao).addClass("pressed");

    setTimeout(function () {
        $(botao).removeClass("pressed");
    }, 100);
}

// Checa se a resposta do usuário está correta
function checarResposta(levelAtual) {

    // Se o padrão de cliques for igual ao padrão proposto salvo até o momento...
    if (padraoDoJogo[levelAtual] === padraoDoUsuario[levelAtual]) {
        if (padraoDoJogo.length === padraoDoUsuario.length) {
            setTimeout(function () {
                // Aguarda um segundo e propõe mais um item
                proximaSequencia();
            }, 1000);
        }
    } else { // Se errar o padrão...
        tocarSom("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Fim do jogo! Pressione 'A' para recomeçar");

        // Seta o recorde no nível do último level alcançado, se for maior que o último recorde
        if(level > recorde){
            recorde = level;
            $("h2 #recorde").text(recorde);
        }            

        comecarDeNovo();
    }
}

// Reseta o nível e o padrão do jogo
function comecarDeNovo() {
    level = 0;
    padraoDoJogo = [];
}