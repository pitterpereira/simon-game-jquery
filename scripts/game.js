/* ----------------------------------------------------------------------- */
/* VARIÁVEIS */
/* ----------------------------------------------------------------------- */

var coresDosBotoes = ["red", "blue", "green", "yellow"];

// Array que recebe as cores de cada etapa
var padraoDoJogo = [];
var padraoDoUsuario = [];

var level = 0;

/* ----------------------------------------------------------------------- */
/* LÓGICA */
/* ----------------------------------------------------------------------- */

$(document).keydown(function (event) {

    // Se teclar a letra "a", inicia o jogo
    if (event.key.toLowerCase() === "a" && level === 0) {

        //Mostra o nível do jogo no h1
        $("h1#level-title").text("Nível " + level);

        proximaSequencia();
    }
});

$(".btn").click(function () {

    // Recebe a cor escolhida pelo clique do usuário e adiciona no array
    var corClicada = $(this).attr('id');
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
    var numeroAleat1a3 = Math.floor(Math.random() * 4);
    var corAleatEscolhida = coresDosBotoes[numeroAleat1a3];
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

function animarClique(botao) {
    $(botao).addClass("pressed");

    setTimeout(function () {
        $(botao).removeClass("pressed");
    }, 100);
}

function checarResposta(levelAtual) {
    
    if (padraoDoJogo[levelAtual] === padraoDoUsuario[levelAtual]) {
        if (padraoDoJogo.length === padraoDoUsuario.length) {
            setTimeout(function () {
                proximaSequencia();
            }, 1000);
        }
    } else {
        tocarSom("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Fim do jogo! Pressione 'A' para recomeçar");

        comecarDeNovo();
    }
}

function comecarDeNovo() {
    level = 0;
    padraoDoJogo = [];
}