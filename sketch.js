var PLAY=1
var END=0
var gameState=1
var boy,mask,covid,sanitizer,road,gameover,restart
var score=0

function preload(){
roadImage=loadImage("Road.png")
boyImage=loadAnimation("Runner-1.png","Runner-2.png")
boyImages=loadAnimation("Runner-1.png")
maskImage=loadImage("mask.png")
covidImage=loadImage("covid.png")
sanitizerImage=loadImage("sanitizer.png")
restartImage=loadImage("restart.jpg")
gameoverImage=loadImage("gameeover.png")
}








function setup(){
    createCanvas(400,600)
road=createSprite(200,200 )
boy=createSprite(70,560,20,20)
boy.addAnimation("running",boyImage)
boy.addAnimation("standing",boyImage)
road.addImage(roadImage)
boy.scale=0.08
road.scale=0.5
road.velocityY=5
maskGroup=new Group()
covidGroup=new Group()
sanitizerGroup=new Group()
gameover=createSprite(200,300)
gameover.addImage(gameoverImage)
gameover.visible=false
gameover.scale=0.5
restart=createSprite(200,400)
restart.addImage(restartImage)
restart.visible=false
restart.scale=0.2
}

function draw(){
    background(0)
    if(gameState===PLAY){
        gameover.visible=false
        restart.visible=false
        boy.changeAnimation("running",boyImage)
    boy.x=mouseX
createMask()
createCovid()
createSanitizer()
if(road.y>400){
    road.y=height/2
}
if(maskGroup.isTouching(boy)){
    maskGroup.destroyEach()
    score=score+5
}
else if(sanitizerGroup.isTouching(boy)){
    sanitizerGroup.destroyEach()
    score=score+4

}
else if(covidGroup.isTouching(boy)){
    covidGroup.destroyEach()
    score=score-6
}
    }
    if(score>1){
    gameState=END
    gameover.visible=true
    restart.visible=true
   // textSize(20)
   // fill("lightblue")
   // text("PREES SPACE TO RESTART",200,550)
    boy.changeAnimation("standing",boyImages)
    maskGroup.destroyEach()
    covidGroup.destroyEach()
    sanitizerGroup.destroyEach()
    maskGroup.setVelocityYEach(0)
    covidGroup.setVelocityYEach(0)
    sanitizerGroup.setVelocityYEach(0)
    road.velocityY=0
    
   
    }

drawSprites()
fill("white")
textSize(20)
text("score- "+score,300,30)
    
}
function createMask(){
    if(frameCount%200==0){
    mask=createSprite(Math.round(random(50,350),40,10,10))
    mask.addImage(maskImage)
    mask.scale=0.08
    mask.velocityY=4
    mask.lifetime=150
    maskGroup.add(mask)
    }
}

function createCovid(){
    if(frameCount%350==0){
    covid=createSprite(Math.round(random(50,350),40,10,10))
    covid.addImage(covidImage)
    covid.scale=0.09
    covid.velocityY=4
    covid.lifetime=150
    covidGroup.add(covid)
    }
}

function createSanitizer(){
    if(frameCount%450==0){
    sanitizer=createSprite(Math.round(random(50,350),40,10,10))
    sanitizer.addImage(sanitizerImage)
    sanitizer.scale=0.2
    sanitizer.velocityY=4
    sanitizer.lifetime=150
    sanitizerGroup.add(sanitizer)
}
}