var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0;
var ground;
var PLAY=1;
var END=0;
var gamestate=PLAY;

function preload(){
    monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkey_collided=loadAnimation("sprite_1.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(500,500);

  monkey=createSprite(50,450,20,20);
  monkey.addAnimation("movingground",monkey_running);
  monkey.addAnimation("collided",monkey_collided);
  monkey.scale=0.1;
  monkey.setCollider("circle",0,0,250);
  
  ground=createSprite(250,455,500,10);
  ground.visible=false;
  ground.x=ground.width/2;
  
  obstacleGroup= new Group();
  foodGroup=new Group();
  
}


function draw() {
  background(180);
  text("Score :"+ score,400,50);
  
  if(gamestate==PLAY){
    
  if(keyDown("space")&&monkey.y>=390){
    monkey.velocityY=-10;
  }
    
   if(foodGroup.isTouching(monkey)){
      foodGroup.destroyEach();
      score=score+1;
  }
  ground.velocityX=-5;
  
  if(obstacleGroup.isTouching(monkey)){
      gamestate=END;
  }
  monkey.velocityY=monkey.velocityY+0.5;
  monkey.collide(ground);
  if(ground.x<0){
     ground.x=ground.width/2;
  }
  spawnObstacles();
  spawnFruits();
  }
  else if(gamestate==END){
    ground.velocityX=0;
    monkey.velocityX=0;
    monkey.velocityY=0;
    monkey.changeAnimation("collided",monkey_collided);
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setVelocityXEach(0);
    foodGroup.setLifetimeEach(-1);
 }
  drawSprites();
}

function spawnObstacles(){
  if(World.frameCount%300==0){
    var stone=createSprite(500,435,20,20);
    stone.addImage(obstacleImage);
    stone.velocityX=-5;
    stone.lifetime=100;
    stone.scale=0.1;
    obstacleGroup.add(stone);
  }

}
 
function spawnFruits(){
if(World.frameCount%100==0){
   var fruit=createSprite(500,325,20,20);
   fruit.addImage(bananaImage);
   fruit.velocityX=-5;
   fruit.lifetime=100;
   fruit.scale=0.1;
   foodGroup.add(fruit);
}

}