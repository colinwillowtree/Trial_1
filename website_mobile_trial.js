let vehicles = [];
let counter = 0;

let animation;
let coding;
let design;
let circle;

let animationX = [];
let animationY = [];

let codingX = [];
let codingY = [];

let circleX = [];
let circleY = [];

let vtX = [];
let vtY = [];

let squigX;
let squigY;

let buttons = [];

let button_coding;
let button_animation;
let button_design;

let button_video;
let button_illustration;
let button_contact;

let scale;

function preload() {
  animation = loadTable("data/structure_data/animation_structure_data_1.csv", "header");
  coding = loadTable("data/structure_data/coding_structure_data_1.csv", "header");
  design = loadTable("data/structure_data/design_structure_data.csv", "header");
  circle = loadTable("data/structure_data/circle_structure_data_1.csv", "header");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  loadVehicles();
  loadStructureData();
  loadButtons();
  vtX = circleX;
  vtY = circleY;
  rectMode(CENTER);
  textAlign(CENTER);
  scale = 1.5;
}
function loadVehicles() {
  for (var j=0; j<2383; j++) {
    var v = new Vehicle(random(width), random(height), random(1, 7));
    vehicles.push(v);
  }
}

function loadButtons() {
  button_coding = new Button(width/5, height*0.8, 50);
  buttons.push(button_coding);
  button_animation = new Button(4*width/5, height*0.8, 50);
  buttons.push(button_animation);
  button_design = new Button(width/2, height*0.8, 50);
  buttons.push(button_design);
}


function loadStructureData() {
  var animationRow = animation.getRows();
  var codingRow = coding.getRows();
  var circleRow = circle.getRows();

  for (var j=0; j<2383; j++) {
    animationX[j] = animationRow[j].getNum("X");
    animationY[j] = animationRow[j].getNum("Y");

    codingX[j] = codingRow[j].getNum("X");
    codingY[j] = codingRow[j].getNum("Y");

    circleX[j] = circleRow[j].getNum("X");
    circleY[j] = circleRow[j].getNum("Y");
  }
}

function increment() {
  counter++;
}

function chooseStructureData() {
  if (mouseX < width/3) {
    vtX = codingX;
    vtY = codingY;
  } else if (mouseX > 2*width/3) {
    vtX = animationX;
    vtY = animationY;
  } else {
    vtX = circleX;
    vtY = circleY;
  }
}

function draw() {
  //windowResized();
  chooseStructureData();
  push();
  fill(51, 100);
  rect(width/2, height/2, width, height);
  pop();
  scale = 0.5*width/540;


  for (var i=0; i<vehicles.length; i++) {
    var v = vehicles[i];
    if (mouseX < width/3) {
      v.sizeWord();
      squigX = 2;
      squigY = 2;
    } else if (mouseX > 2*width/3) {
      v.sizeWord();
      squigX = 2;
      squigY = 2;
    } else {
      v.sizeBall();
      squigX = sin(frameCount/10000.0*i);
      squigY = cos(frameCount/20000.0*i);
    }


    v.update(vtX[i]*squigX*scale+width/2, vtY[i]*squigY*scale+height/2);
    v.show();
    v.behaviors();
  }
  textSize(30);
  fill(255, 100);
  text(vehicles.length, width/2, height*0.86);
  text(int(frameRate()), width/2, height*0.86+30);
  text("window width" + windowWidth, width/2, height*0.86+30+30);
  text("window height" + windowHeight, width/2, height*0.86+30+30+30);


  button_coding.update(width/5, height*0.8);
  button_animation.update(4*width/5, height*0.8);
  button_design.update(width/2, height*0.8);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseDragged() {
  var v = new Vehicle(mouseX, mouseY, 7);
  vehicles.push(v);
}
