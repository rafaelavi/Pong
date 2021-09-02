//Logica do erro
let chanceDeErrar = 95;
let posicao1 = [101, 93, 98, 94, 97, 103, 96, 100, 99, 102, 95]
let selecionaPosicao = 0;

//variável da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 25;
let raio = diametro / 2

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha= 6;

//variável raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//Variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

//sons do jogo
let trilha;
let raquetada;
let ponto;

function preload(){
  trilha = loadSound("trilha.mp3")
  raquetada = loadSound("raquetada.mp3")
  ponto = loadSound("ponto.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentabolinha();  
  verificacolisaoborda();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaquete, yRaquete)
  incluiPlacar();
  marcaPonto();
  
}

function mostraBolinha(){
    circle(xBolinha, yBolinha, diametro);
}

function movimentabolinha(){  xBolinha += velocidadeXBolinha;
                        yBolinha += velocidadeYBolinha;

}

function verificacolisaoborda(){
  if (xBolinha  + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x, y){
    rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10; 
  }
  if (keyIsDown(DOWN_ARROW)){ yRaquete += 10
    
  }
}

function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1; raquetada.play();
  }
}

function verificaColisaoRaquete(x , y){
  colidiu =
  collideRectCircle( x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1; raquetada.play();
  }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = (yBolinha -yRaqueteOponente -raqueteComprimento / 2 - 30);
  yRaqueteOponente += velocidadeYOponente 
}

function calculaChanceDeErrar(){
  var numeroEscolhido = Math.round(Math.random() * 9);
  if (numeroEscolhido != selecionaPosicao){
    selecionaPosicao = numeroEscolhido
  }
  chanceDeErrar = posicao[selecionaPosicao]
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(225);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20)
  fill(225)
  text(pontosOponente, 470, 26);
}

function marcaPonto(){
  if (xBolinha > 585){
    meusPontos += 1;
    ponto.play()
  }
  if (xBolinha < 15){
    meusPontos += 1;
    ponto.play();
  }
}
