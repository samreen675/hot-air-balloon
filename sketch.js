const Engine = Matter.Engine
const World = Matter.World
const Bodies = Matter.Bodies
const Constraint = Matter.Constraint 

var balloon,balloonImg,backgroundImg,database,balloonPosition;

function preload(){

 balloonImg = loadAnimation("img2.png","img3.png","img4.png")
  backgroundImg = loadImage("img1.png")

}

function setup() {
  createCanvas(1500,1000);

  database = firebase.database()
  console.log(database)

  balloon = createSprite(400, 200, 50, 50);
  balloon.addAnimation("balloon",balloonImg)

  var balloonPosition = database.ref("balloon/position")
  balloonPosition.on("value",readPosition,showError)
}

function draw() {
  background(backgroundImg);  

  stroke("blue")
  fill("Blue")
  textSize(20)
  text("Use Arrow Keys To Move The Hot Air Balloon",100,100)

  drawSprites();

  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0)
    balloon.x = balloon.x - 10
  }

  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0)
    balloon.x = balloon.x + 10
  }

  if(keyDown(UP_ARROW)){
    updateHeight(0,-10)
    balloon.y = balloon.y - 10
    balloon.scale = balloon.scale + 0.01
  }

  if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10)
    balloon.y = balloon.y + 10
    balloon.scale = balloon.scale - 0.01
  }
}

function readHeight (x,y){
  database.ref("balloon/height").set({
    'x' : height.x + x,
    'y' : height.y + y
  })
}

function readPosition(data){
  height = data.val()
  console.log(height)
  balloon.x = height.x
  balloon.y = height.y
}

function showError(){
  console.log("Error i n writing to the database")
}
