// Criar o canvas Estudar mais sobre ele

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Adicionando a imagem de fundo
let backgroundReady = false;
const backgroundImage = new Image();
backgroundImage.onload = function () {
  backgroundReady = true;
};
backgroundImage.src = "img/background.png";

// Imagem do Personagem
let heroReady = false;
const heroImg = new Image();
heroImg.onload = function () {
  heroReady = true;
};
heroImg.src = "img/hero.png";

// Imagem do monstro
let monsterReady = false;
const monsterImg = new Image();
monsterImg.onload = function () {
  monsterReady = true;
};
monsterImg.src = "img/monster.png";

// Objetos do jogo
const hero = {
  speed: 256, //movimento em pixel por segundos
};
const monster = {};
let monsterPegos = 0;

// Controle do teclado Dom

const keysDown = {};

window.addEventListener("keydown", function (e) {
  keysDown[e.key] = true;
});

window.addEventListener("keyup", function (e) {
  delete keysDown[e.key];
});

// Resetar o monstro

const rest = function () {
  hero.x = canvas.width / 2;
  hero.y = canvas.height / 2;

  // Posicionamento do monstro random

  monster.x = 32 + Math.random() * (canvas.width - 64);
  monster.y = 32 + Math.random() * (canvas.height - 64);
};

// Atualizar os objetos do jogo

const update = function (modifier) {
  if ("ArrowUp" in keysDown) {
    // seta para cima
    hero.y -= hero.speed * modifier;
  }
  if ("ArrowDown" in keysDown) {
    // seta para baixo
    hero.y += hero.speed * modifier;
  }
  if ("ArrowLeft" in keysDown) {
    // seta para esquerda
    hero.x -= hero.speed * modifier;
  }
  if ("ArrowRight" in keysDown) {
    // seta para direita
    hero.x += hero.speed * modifier;
  }

  // Se os personagens se encostaram!
  if (
    hero.x <= monster.x + 32 &&
    monster.x <= hero.x + 32 &&
    hero.y <= monster.y + 32 &&
    monster.y <= hero.y + 32
  ) {
    ++monsterPegos;
    rest();
  }
};

// Renderizar Tudo

const render = function () {
  if (backgroundReady) {
    ctx.drawImage(backgroundImage, 0, 0);
  }
  if (heroReady) {
    ctx.drawImage(heroImg, hero.x, hero.y);
  }
  if (monsterReady) {
    ctx.drawImage(monsterImg, monster.x, monster.y);
  }
  // Pontuacao do game
  ctx.fillStyle = "rgb(250, 250, 250)";
  ctx.font = "24px Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Monstros pegos:" + monsterPegos, 32, 32);
};

// Controle do jogo loop

const main = function () {
  const now = Date.now();
  const delta = now - then;

  update(delta / 1000);
  render();
  then = now;

  // Executa o mais rapido possivel
  requestAnimationFrame(main);
};
const w = window;
const requestAnimationFrame =
  w.requestAnimationFrame ||
  w.webkitRequestAnimationFrame ||
  w.msRequestAnimationFrame ||
  w.mozRequestAnimationFrame;
// Que comece o jogo!
let then = Date.now();
rest();
main();
