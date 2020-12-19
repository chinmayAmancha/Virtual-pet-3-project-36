var doggy,dog, happyDog;
var database;
var foodS, foodStock;
var data;
var feed, addFood;
var fedTime, lastFeds;
var foodObj;
var readState, changeState;
var bedroom, garden, washroom;

function preload()
{

  garden = loadImage("Garden.png");
  bedroom = loadImage("images/BedRoom.png");
  dog = loadImage("images/Dog.png");
  happyDog = loadImage("images/happyDog.png");
}

function setup() {
	createCanvas(500, 500);
  doggy = createSprite(200,200);
  doggy.addImage(dog);
  doggy.scale = "0.15";

  var object = createSprite()

  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedTheDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFood);

  database = firebase.database();

  foodStock = database.ref("Food");
  foodStock.on("value",readStock);

  readState = datebase.ref('gameState');
  readState.on("value", function(data) {
    gameState = data.val();
  })

  currentTime = hour();
  if(currentTime ==(lastFed + 1)) {
    update("Playing");
    food.garden();
  } else if(currentTime ==(lastFed + 2)) {
    update("Sleeping");
    food.bedroom();
  } else if(currentTime > (lastFed + 2) && currentTime <= (lastFed + 4)) {
    update("Bathing");
  } else {
    update("Hungry")
    food.display();
  }

  if(gameState != "Hungry") {
    feed.hide();
    addFood.hide();
    dog.remove();
  } else {
    feed.show();
    addFood.show();
    dog.addImage(sadDog);

    function update(state) {
      database.ref('/').update({
        gameState:state
      });
    }
  }
}


function draw() {  
  background(46, 139, 87);

  text("Press Up arrow to feed the dog milk");

  if(keyDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data) {
      lastFed = data.val();
  })

  if(keyDown(addFood)) {
    addFood();   
  }

  if(keyDown(feed)) {
    feedTheDog();
  }

  drawSprites();
  //add styles here

  textSize(15);
  fill(255,255,254);

  if(lastfed >= 12) {
    text("Last Feed: "+ lastFed%12 + "PM", 350, 30);
  } else if(lastFed === 0) {
    text("Last feed : 12 AM", 350, 30);
  } else {
    text("Last Feed : " + lastfed + "AM", 350, 30);
  }
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {

    data.ref("food/value").update({
      food:x
    })
}

function addFood() {
   foodStock += 1;
}

function feedTheDog() {
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}