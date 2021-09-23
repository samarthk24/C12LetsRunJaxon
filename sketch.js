var player, good, bad, path, invbound1, invbound2, score, gameState;

function preload() {
  coin = loadImage("coin.png");
  bomb = loadImage("bomb.png");
  running = loadAnimation("Runner-1.png", "Runner-2.png");
  pathGround = loadImage("path.png");
}

function setup() {
createCanvas(400, 600);

path = createSprite(200, 300, 400, 600);
path.addImage("background", pathGround);
path.velocityY = 10;

player = createSprite(200, 500, 30, 30);
player.addAnimation("running", running);
player.scale = 0.05;

good = createSprite(random(75, 275), -5, 10, 10);
good.addImage("coin", coin);
good.scale = 0.25;

bad = createSprite(random(125, 300), -5, 10, 10);
bad.addImage("bomb", bomb);
bad.scale = 0.075;

invbound1 = createSprite(40, 300, 20, 600);
invbound1.visible = false;

invbound2 = createSprite(360, 300, 20, 600);
invbound2.visible = false;

score = 0;
gameState = "start";

}

function draw() {
background("black");

if(gameState=="start"){
  textSize(25);
  fill("white");
  text("Welcome, press space to start!", 25, 250);

  if(keyDown("space")){
    gameState = "play";
    good.velocityY = 10;
    bad.velocityY = 10;
  }
}

if(gameState == "play"){
  if(keyDown("left")){
    player.x -= 5;
  }

  if(keyDown("right")){
    player.x += 5;
  }

  if(good.y>610){
    good.x = random(75,275);
    good.y = -5;
  }

  if(good.isTouching(player)){
    score++;
    good.x = random(75, 275);
    good.y = -5;
  }

  if(bad.y>610){
    bad.x = random(125, 300);
    bad.y = -5;
  }

  if(bad.isTouching(player)){
    gameState = "end";
    good.velocityY = 0;
    bad.velocityY = 0;
  }

  if(path.y>400){
    path.y = path.width/2;
  }

  player.collide(invbound1);
  player.collide(invbound2);

  textSize(11);
  fill("lightGreen");
  text("Score: " + score, 2, 10);
  drawSprites();
}

if(gameState=="end"){
  textSize(25);
  fill("white");
  text("GAME OVER!", 125, 250);
}


}