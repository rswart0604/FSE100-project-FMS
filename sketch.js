function setup() {
  createCanvas(1600, 1000);
  pageSelect = 0;
  debrisIndex = 0;
  debrisList = [];
  goodDebrisList = [];
  setInterval(timer, 1000);
  setInterval(addFillPoints, 700);
  time = 0;
  finalPoints = 0;
  mazePoints = 0;
  let x = 0;
  let y = 0;
  let w = 0;
  let h = 0;
  tRectX = 0;
  tRectY = 0;
  tRectW = 0;
  tRectH = 0;
  fillingPoints = 0;
  isInShape = false;
  isDrawing = false;
  gameOver = false;
  tWarning = false;
  tGameOver = false;
  tWon = false;
  tStarted = false;
  tHitAPoint = false;
  tUL = []
  tU = []
  tUR = []
  tR = []
  tBR = []
  tB = []
  tBL = []
  tL = []
  tHitPoints = [false, false, false, false, false, false, false, false]
  tTimerThing = 0;
  aThing = loadImage("doge.jpg");
}

function timer() {
  if (isInShape){  
    time++;
  }
}

function draw() {
  
  drawStuff(pageSelect);
  
}

function drawStuff(somePage) {
  //scale(1.8);
  switch(somePage) {
    case 0: // homepage
      stroke("black");
      strokeWeight(1);
      background('rgb(20, 170, 150)');
      fill("red");
      rect(650, 44, 300, 40); // + 400
      fill("white");
      textSize(20);
      textAlign(CENTER);
      text('Group 1 FMS App', 650, 55, 300, 40);
      fill(30, 20, 255);
      rect(500, 100, 280, 100); // maze button
      rect(820, 100, 280, 100); // trace button
      rect(500, 250, 280, 100); // fill button
      rect(820, 250, 280, 100); // avoid button
      fill("white");
      textSize(40);
      text("Maze Finding", 500, 130, 280, 100);
      text("Tracing Shapes", 820, 102, 280, 100);
      text("Filling in Shapes", 500, 252, 280, 100);
      text("Avoiding Debris", 820, 253, 280, 100);
      break;
    case 1: // maze intro
      mazeIntro();
      break;
    case 2: // maze game
      mazeGame();
      break;
    case 3: // trace shape intro
      traceIntro();
      break;
    case 4: // trace shape game
      traceGame();
      break;
    case 5: // color in shape intro
      fillIntro()
      break;
    case 6: // color in shape game
      
      if (gameOver){ //500, 50, 600, 600
        background('rgb(20, 170, 150)');
        noStroke();
        fill('white');
        rect(500, 50, 600, 600);
        stroke(20, 20, 190);
        strokeWeight(3);
        text("Game Over", 720, 90);
        text("Total Points " + finalPoints, 720, 130);
        image(aThing, 600, 300);
        aThing.resize(400,0)
        strokeWeight(1);
        rect(700, 200, 110, 40);
        text("HOME", 705, 205, 100, 30);
        
      } else {
        fillGame();
        mouseDrawing();
      }
      break;
    case 7: // avoid debris intro
      debrisIntro();
      break;
    case 8: // avoid debris game
      background('rgb(20, 170, 150)');
      debrisGame();
      break;
  }
}

function mousePressed() {
  switch(pageSelect) {
    case 0: // homepage
      /*
      rect(500, 100, 280, 100); // maze button
      rect(820, 100, 280, 100); // trace button
      rect(500, 250, 280, 100); // fill button
      rect(820, 250, 280, 100); // avoid button
      */
      if (500 <= mouseX && mouseX <= 780 && 100 <= mouseY && mouseY <= 200) {
        pageSelect = 1;
      } else if (820 <= mouseX && mouseX <= 1100 && 100 <= mouseY && mouseY <= 200) {
        pageSelect = 3;
      } else if (500 <= mouseX && mouseX <= 780 && 250 <= mouseY && mouseY <= 350) {
        pageSelect = 5;
      } else if (820 <= mouseX && mouseX <= 1100 && 250 <= mouseY && mouseY <= 350) {
        pageSelect = 7;
      }
      break;
    case 1: // maze intro
      if (600 <= mouseX && mouseX <= 750 && 400 <= mouseY && mouseY <= 460) {
        pageSelect += 1;
      } else if (850 <= mouseX && mouseX <= 1000 && 400 <= mouseY && mouseY <= 460) { //275, 260, 100, 30
        pageSelect = 0
      }
      break;
    case 2: // maze game
      //650, 400, 120, 40
      if (650 <= mouseX && mouseX <= 770 && 400 <= mouseY && mouseY <= 440) {
        pageSelect = 0;
      }
      
      break;
    case 3: // trace shape intro, 100, 560, 100, 30. this one is funky
      if (550 <= mouseX && mouseX <= 750 && 470 <= mouseY && mouseY <= 520) {
        tStarted = false;
        tGameOver = false;
        tWon = false;
        tHitAPoint = false;
        tTimerThing = 0;
        tWarning = false;
        tHitPoints = [false, false, false, false, false, false, false, false]
        pageSelect += 1;
      } else if (850 <= mouseX && mouseX <= 1050 && 470 <= mouseY && mouseY <= 520) { //225, 560, 100, 30
        pageSelect = 0;
      }
      break;
    case 4: // trace shape game
    
      //100, 200, 200, 40
      if (tWon && mouseX >= 700 && mouseX <= 900 && mouseY >= 200 && mouseY < 240) {
        pageSelect = 0;
      }
      if (tGameOver && mouseX >= 700 && mouseX <= 900 && mouseY >= 200 && mouseY < 240) {
        // restart
        tStarted = false;
        tGameOver = false;
        tWon = false;
        tTimerThing = 0;
        tWarning = false;
        tHitPoints = [false, false, false, false, false, false, false, false]
        tHitAPoint = false;
      }
      if (tGameOver && mouseX >= 700 && mouseX <= 900 && mouseY >= 300 && mouseY <           340) {
        pageSelect = 0;
      }

      break;
    case 5: // fill in shape intro, 150, 260, 100, 30
      if (500 <= mouseX && mouseX <= 650 && 370 <= mouseY && mouseY <= 420) {
        pageSelect += 1;
        madeRect = false;
        gameOver = false;
        fillingPoints = 0;
        time = 0;
      } else if (950 <= mouseX && mouseX <= 1100 && 370 <= mouseY && mouseY <= 420) { //275, 260, 100, 30
        pageSelect = 0
      }
      break;
    case 6: // fill in shape game
      if (gameOver) { // 700, 200, 110, 40
        if (700 <= mouseX && mouseX <= 810 && 200 <= mouseY && mouseY <= 240) {
          pageSelect = 0;
        }
      }
      isInShape = true;
      fillGame();
      addFillPoints();
      break;
    case 7: // avoid debris intro
      if (550 <= mouseX && mouseX <= 750 && 320 <= mouseY && mouseY <= 380) {
        pageSelect += 1;
        debrisOver = false;
        points = 0;
      } else if (850 <= mouseX && mouseX <= 1050 && 320 <= mouseY && mouseY <= 380) { //275, 260, 100, 30
        pageSelect = 0
      }
      break;
    case 8: // avoid debris game
      if (mouseIsPressed) {
        if (debrisOver) {
          pageSelect = 0;
          break;
        }
        //1023, 623, 80, 30
        if (1020 <= mouseX && mouseX <= 1100 && 620 <= mouseY && mouseY <= 650) {
          pageSelect = 0;
        }
        for (i=0; i<debrisList.length; i++) {
          if (dist(debrisList[i][0], debrisList[i][1], mouseX, mouseY) < 15) {
            debrisOver = true;
            console.log("hi!");
          }
        }
        for (i=0; i<goodDebrisList.length; i++) {
          if (dist(goodDebrisList[i][0], goodDebrisList[i][1], mouseX, mouseY) < 15) {
            points++;
            goodDebrisList.splice(i, 1);
            console.log("hey!");
          }
        }
      }
      break;
  }
}

// everything with a t before it is trace-related
function traceGame() {
  
  console.log(tGameOver)
  if (tWon) {
    fill("green")
    rect(550, 50, 500, 500)
    fill("white")
    text("You win!", 700, 100, 200, 200);
    rect(700, 200, 200, 40); // TODO THIS IS THE BUTTON TO LOOK AT TO GO HOME
    fill("black");
    text("HOME", 700, 210, 200, 40)
    return;
  } else if (tGameOver) {
    // console.log('yo?')
    fill("black")
    rect(550, 50, 500, 500)
    fill("white")
    text("You lose!", 700, 100, 200, 200);
    rect(700, 200, 200, 40); // TODO THIS IS THE BUTTON TO LOOK AT TO RESTART
    rect(700, 300, 200, 40); // TODO THIS GOES HOME
    fill("black");
    text("Restart?", 700, 210, 200, 40)
    text("HOME", 700, 310, 200, 40);
    return
  } else if (tWarning) {
    console.log("warning time!");
    fill("white");
    rect(100,500,200,40);
    fill("black");
    text("Warning! Outside the line.", 100, 500, 200, 40);
  }

  tCount = 0
  for (l=0; l<8; l++) {
    if (tHitPoints[l]) {
      tCount++;
    }
  }
  if (tCount >= 8) {
    tWon = true
  } else if (tCount >= 1) {
    tHitAPoint = true;
  }
  
  // remake canvas
  // strokeWeight(0)
  // fill("rgb(20, 170, 150)")
  background("rgb(20, 170, 150)")
  // rect(10, 390, 400, 400)
  
  strokeWeight(1);
  fill("red")
  rect(550, 50, 500, 500)
    
  if (tWarning) {
    console.log("warning time!");
    fill("white");
    rect(650,550,300,40);
    fill("black");
    text("Warning! Outside the line.", 650, 550, 300, 40);
  }

  
  // make a random rectangle
  if (!tStarted) {
    tRectX = Math.floor(Math.random() * 230) + 600;
    tRectY = Math.floor(Math.random() * 230) + 70;
    tRectW = Math.floor(Math.random() * 140) + 50;
    tRectH = Math.floor(Math.random() * 140) + 50;
    tStarted = true;
  }
  fill("green")
  rect(tRectX, tRectY, tRectW, tRectH);
  
  // make a slightly smaller rectangle
  fill("red")
  rect(tRectX + 10, tRectY+10, tRectW-20, tRectH-20);
  
  // define 8 points (the corners and the middle)
  tUL = [tRectX + 5, tRectY + 5];
  tU = [tRectX + tRectW/2, tRectY + 5];
  tUR = [tRectX + tRectW - 5, tRectY + 5];
  tR = [tRectX + tRectW - 5, tRectY + tRectH / 2];
  tBR = [tRectX + tRectW - 5, tRectY + tRectH - 5];
  tB = [tRectX + tRectW/2, tRectY + tRectH - 5];
  tBL = [tRectX + 5, tRectY + tRectH - 5];
  tL = [tRectX + 5, tRectY + tRectH/2];
  
  // make user hit those 8 points and stay inside of large rectangle,
  // console.log(mouseX)
  if (dist(mouseX, mouseY, tUL[0], tUL[1]) < 10) {
    tHitPoints[0] = true
  }
  if (dist(mouseX, mouseY, tU[0], tU[1]) < 10) {
    tHitPoints[1] = true
  }
  if (dist(mouseX, mouseY, tUR[0], tUR[1]) < 10) {
    tHitPoints[2] = true
  }
  if (dist(mouseX, mouseY, tR[0], tR[1]) < 10) {
    tHitPoints[3] = true
  }
  if (dist(mouseX, mouseY, tBR[0], tBR[1]) < 10) {
    tHitPoints[4] = true
  }
  if (dist(mouseX, mouseY, tB[0], tB[1]) < 10) {
    tHitPoints[5] = true
  }
  if (dist(mouseX, mouseY, tBL[0], tBL[1]) < 10) {
    tHitPoints[6] = true
  }
  if (dist(mouseX, mouseY, tL[0], tL[1]) < 10) {
    tHitPoints[7] = true
  }
  // outside of other rectangle
    if (!tGameOver && !tWon && tHitAPoint) {
      console.log("hey")
      console.log("new hey");
        // outside tRectX, etc
        if (mouseX < tRectX - 4 || tRectX + tRectW + 4 < mouseX || mouseY < tRectY - 4 || tRectY + tRectH + 4 < mouseY) {
          console.log("outside")
          if (tWarning && tTimerThing > 150) {
            tGameOver = true;
          } else {
            console.log("?" + tWarning);
            tWarning = true;
            tTimerThing++;
          }
          console.log('ho')
        } else if (mouseX > tRectX + 14 && mouseX < tRectX + tRectW - 14 && mouseY > tRectY           + 14 && mouseY < tRectY + tRectH - 14) {
          if (tWarning && tTimerThing > 150) {
            tGameOver = true;
          } else {
            tWarning = true;
            console.log("?");
            console.log("hey" + tWarning);
            tTimerThing++;
          }
          console.log("hee");
        } else {
          tWarning = false;
          tTimerThing = 0;
        }
  }
  // you win if you do that, lose if you go outside
}

function mazeGame() {
  var start = false;
  var end = false;
  var startedNow = false;
  background("rgb(20,170,150)");
  rect(650,50,300,300);
  rect(650, 400, 120, 40);
  fill("black");
  text("Home", 665, 410, 120, 40);
  
   //Start
  //125+c,50,15*2,15*2
  if(mouseX > 125+525 && mouseX < 125+525+30 && mouseY > 50 && mouseY < 80) {
    start = true;
    mazePoints = 0;
    
  }
  if(start == true) {
    strokeWeight(2);
    stroke('green')
  }
  if(mouseX > 125+525 && mouseX < 125+525+30 && mouseY > 185+135 && mouseY < 185+135+30 && mazePoints <= 0){
    strokeWeight(2);
    text("You win!", 800, 410, 160, 40);
    stroke('blue')
  }
  
  if (mazePoints > 0) {
    text("Game over!", 800, 410, 160, 40);
    text("Restart by hovering over the green box", 665, 470, 300, 200);
  }

  // console.log(mazePoints);
  
 // MAZE BOXES CREATION
  // plus 525, plus (125-x)
  c = 525
  fill("black");
  rect(125+c,75+25,50*c2,10*c2);
  rect(175+50+c,75+25,10*c2,50*c2);
  rect(175+50+c,125+75,50*c2,10*c2);
  rect(175+50+c,150+100,10*c2,50*c2);
  rect(150+25+c,125+75,10*c2,50*c2);
  rect(130+5+c,100+50,35*c2,10*c2);
  rect(225+50+c,150+100,50*c2,10*c2);
  rect(245+120+c,50,10*c2,50*c2);
  rect(215+90+c,75+25,10*c2,50*c2);
  rect(195+70+c,65+15,10*c2,50*c2);
  rect(200+75+c,175+125,50*c2,10*c2);
  rect(220+100+c,185+135,10*c2,15*c2);
  rect(125+c,150+100,30*c2,10*c2);
  rect(235+110+c,125+75,40*c2,10*c2);
  fill("green");
  rect(125+c,50,15*2,15*2);
  fill("red");
  rect(125+c,185+135,15*2,15*2);
  fill("white");
  
  //CHECK IF CURSOR TOUCHES BOUNDARIES
   if(mouseX > 125+c && mouseX < 125+c+100 && mouseY > 75+25 && mouseY < 100+20) {
     fill('red');
     mazePoints++;
  }
  if(mouseX > 175+50+c && mouseX < 175+50+c+20 && mouseY > 75+25 && mouseY < 100+110) {
     fill('red');
    mazePoints++;
  }
   if(mouseX > 175+50+c && mouseX < 175+c+50+100 && mouseY > 125+75 && mouseY < 200+20) {
     fill('red');
     mazePoints++;
  }
   if(mouseX > 175+50+c && mouseX < 175+c+50+20 && mouseY > 150+100 && mouseY < 150+100+100) {
     fill('red');
     mazePoints++;
  }
   if(mouseX > 150+25+c && mouseX < 150+25+c+20 && mouseY > 125+75 && mouseY < 300) {
     fill('red');
     mazePoints++;
  }
   if(mouseX > 130+5+c && mouseX < 130+5+c+70 && mouseY > 100+50 && mouseY < 170) {
     fill('red');
     mazePoints++;
  }
   if(mouseX > 225+50+c && mouseX < 225+50+c+100 && mouseY > 150+100 && mouseY < 150+100+220) {
     fill('red');
     mazePoints++;
  }
   if(mouseX > 245+120+c && mouseX < 245+120+c+20 && mouseY > 50 && mouseY < 150) {
     fill('red');
     mazePoints++;
  }
   if(mouseX > 215+90+c && mouseX < 215+90+c+20 && mouseY > 75+25 && mouseY < 200) {
     fill('red');
     mazePoints++;
  }
   if(mouseX > 195+70+c && mouseX < 195+70+c+20 && mouseY > 65+15 && mouseY < 65+15+100) {
     fill('red');
     mazePoints++;
  }
   if(mouseX > 200+75+c && mouseX < 200+75+c+100 && mouseY > 175+125 && mouseY < 175+125+20) {
     fill('red');
     mazePoints++;
  }
   if(mouseX > 220+100+c && mouseX < 220+100+c+20 && mouseY > 185+135 && mouseY < 185+135+30) {
     fill('red');
     mazePoints++;
  }
   if(mouseX > 125+c && mouseX < 125+c+60 && mouseY > 150+100 && mouseY < 270) {
     fill('red');
     mazePoints++;
  }
   if(mouseX > 235+110+c && mouseX < 235+110+c+80 && mouseY > 125+75 && mouseY < 220) {
     fill('red');
     mazePoints++;
  }



}

function fillGame() {
    if (!madeRect) {
    background('rgb(20, 170, 150)');
    noStroke();
  fill('white');
  rect(500, 50, 600, 600);
  
  stroke(50);
  strokeWeight(1);
    x = floor(Math.random() * 100) + 610;
    y = floor(Math.random() * 100) + 60;
    w = floor(Math.random() * 200) + 50;
    h = floor(Math.random() * 200) + 50;
    rect(x, y, w, h);
    madeRect = true;
  }
  else if (madeRect){
    isInShape = true;
    stroke('rgb(20, 170, 150)')
    fill('rgb(20, 170, 150)');
    rect(700, 651, 300, 100); // put a rect over the text
    stroke("black");
    fill("white");
    if (time <= 20){
      text("0:" + (30-time), 780, 700);
    } else if (time > 20 && time < 30) {
      text("0:0" + (30-time), 780, 700);
    } else if (time >= 30){
      gameOver = true;
    }
    if (time == 30){
      finalPoints = fillingPoints;
    }
  }
}

function mouseDrawing(){
    if (((mouseX > x) && (mouseX < x + w)) && ((mouseY > y) && (mouseY < y + h))){
        
      
        if (mouseIsPressed === true){
          stroke(50, 200, 50);
          strokeWeight(2);
          line(mouseX,mouseY,pmouseX,pmouseY);
          
          isDrawing = true;
        }
        else if (mouseIsPressed === false){
          isDrawing = false;
        }
    }
    else{
        
        if (mouseIsPressed === true){
          isDrawing = false;
          stroke(200, 30, 30);
          strokeWeight(2);
          line(mouseX,mouseY,pmouseX,pmouseY);
        }
    }

}

function addFillPoints(){
  if (!gameOver) {
    if (isInShape){
      if (isDrawing){
        fillingPoints = fillingPoints + 4;
        noStroke();
        fill("white");
        rect(1000, 580, 80, 50);
        stroke(50, 200, 50);
        text(fillingPoints, 1020, 620);
    }
    else{
      fillingPoints -= 2;
      noStroke();
      fill("white");
      rect(1000, 580, 80, 50);
      stroke(200, 30, 30);
      text(fillingPoints, 1020, 620);
    }
    }
  }
}


// radius of 30
function debrisGame() {
  
  
  fill("pink");
  rect(500, 50, 600, 600);
  stroke("black");
  fill("red");
  rect(1020, 620, 80, 30);
  fill("black");
  text("Home", 1023, 623, 80, 30) // HOME BUTTON
  if (debrisOver) {
    fill("red");
    textWidth(50);
    text("GAME OVER", 750, 710)
    fill("green");
  } else {
    debrisIndex = Math.floor(Math.random() * 225);
    if (debrisIndex == 0) {
      debrisList.push([520 + Math.floor(Math.random() * 560), 70 + Math.floor(Math.random() * 560)]);
    } else if (debrisIndex == 1 || debrisIndex == 2) {
      goodDebrisList.push([520 + Math.floor(Math.random() * 560), 70 + Math.floor(Math.random() * 560)]);
    }
    fill("red");
    for (i=0; i<debrisList.length; i++) {
      circle(debrisList[i][0], debrisList[i][1], 30);
    }
    fill("green");
    for (i=0; i<goodDebrisList.length; i++) {
      circle(goodDebrisList[i][0], goodDebrisList[i][1], 30);
    }
    fill("orange");
    textWidth(10);
    text("Points: " + points, 760, 680);
    fill("green");
  }
}




function debrisIntro() {
  background("rgb(20,170,150)");
  rect(600,400,400,400);
  textSize(24);
  fill("black");
  text("Description: Users will be prompted to click circles with different colors. These shapes will pop up on the screen and the user then can touch the shape to make the shape go away and get a point. Red circles that appear on the screen should be avoided as they end the game, while green ones add points.", 605, 405, 395, 400);
  fill("white");
  rect(600,50,400,250);
  fill("black");
  text("X", 670,80,30,30);
  text("X", 900,60,30,30);
  text("X", 650,230,30,30);
  text("X", 770,160,30,30);
  text("X", 890,240,30,30);
  
  fill("blue");
  circle(630,100,20);
  circle(770,120,20);
  circle(780,240,20);
  circle(870,100,20);
  
  fill("white")
  rect (550, 320, 200, 60) // START BUTTON!
  fill("black")
  text("START", 610, 335, 200, 60)
  fill("white")
  rect (850, 320, 200, 60) // HOME BUTTON!
  fill("black")
  text("HOME", 910, 335, 200, 60)
  
  
  
  fill("red");
  triangle(660,150, 670,160, 680, 130);
  triangle(840,150, 800,180, 830, 180);
  fill("white");
  
  
  
}

function mazeIntro() {
  textSize(24)
  background("rgb(20,170,150)");
  rect(600,500,400,300); 
  let str = "Description: The toddler will be instructed to guide a mouse through a maze to a green cheese. The toddler will receive various visual forms of feedback if they hit a wall into the maze, and they will receive positive feedback when they find the cheese."
  let s = "Maze Finding!"
  c = 525
  c2 = 2
  rect(125+c,50,150*c2,150*c2);
  
  
  fill("black")
  // add 525 + (current x - 125) to the x
  // add (current x - 50) to the x
  // multiply x and y by 2
  rect(125+c,75+25,50*c2,10*c2);
  rect(175+50+c,75+25,10*c2,50*c2);
  rect(175+50+c,125+75,50*c2,10*c2);
  rect(175+50+c,150+100,10*c2,50*c2);
  rect(150+25+c,125+75,10*c2,50*c2);
  rect(130+5+c,100+50,35*c2,10*c2);
  rect(225+50+c,150+100,50*c2,10*c2);
  rect(245+120+c,50,10*c2,50*c2);
  rect(215+90+c,75+25,10*c2,50*c2);
  rect(195+70+c,65+15,10*c2,50*c2);
  rect(200+75+c,175+125,50*c2,10*c2);
  rect(220+100+c,185+135,10*c2,15*c2);
  rect(125+c,150+100,30*c2,10*c2);
  rect(235+110+c,125+75,40*c2,10*c2);
  fill("green");
  rect(125+c,50,15*2,15*2);
  fill("red");
  rect(125+c,185+135,15*2,15*2);
 fill("black");
    text(str,602, 500, 400, 300);
    text(s,720,15,200, 40);
  
  fill("white")
  rect (600, 400, 150, 60) // START BUTTON!
  fill("black")
  text("START", 635, 420, 100, 60)
  fill("white")
  rect (850, 400, 150, 60) // HOME BUTTON!
  fill("black")
  text("HOME", 885, 420, 100, 60)
  
  fill("white");
  
  
}

function traceIntro() {
  background("rgb(20,170,150)");
  fill("white").rect(600, 50, 400, 400);
  textSize(25)
  fill("black").text('Tracing Shapes',700, 15,400,30);
  
  // fill("white").triangle(100, 125, 40, 250, 160, 250);
  // fill("pink").circle(100, 325, 115);
  fill("green").rect(700, 275, 100, 100);
  fill("yellow").rect(810, 155, 115, 60);
  
  fill("white");
  rect(600, 540, 400, 200)
  fill("black")
  textSize(25);
  text('Description: The toddler will see a rectangle and need to keep their finger on the line as they draw the shape. There will be visual feedback if the user wins or loses.', 605, 545, 390, 190);
  
  textSize(25)
  fill("white");
  rect(550, 470, 200, 50)
  fill("black")
  text("START", 608, 480, 200, 50)
  
  fill("white");
  rect(850, 470, 200, 50)
  fill("black")
  text("HOME", 908, 480, 200, 50)
  
  

}

function fillIntro() {
  background("rgb(20,170,150)");
  fill("white");
  rect(550,50,500,300);
  rect(550,450,500,210);
  fill("black");
  textSize(25);
  text("Filling Shapes", 700, 10, 200, 40)
  textSize(20);
  text("Description: The user will be instructed to color in the shapes, and they will be given 30 seconds to fill in the rectangle on the screen. If you color inside the rectangle you will gain points, and if you color outside the rectangle, you will lose points. Even if you stop coloring, you will lose points, so keep coloring in the shapes until the time limit is over. Touch the button to start.", 555, 455, 490, 200);
  fill("none");
  circle(700, 100, 50)
  rect(870, 120, 100, 60)
  fill("red");
  rect(860, 190, 50, 50);
  fill("blue")
  circle(650, 250, 60)
  
  textSize(30)
  fill("white")
  rect (500, 370, 150, 50) // START BUTTON!
  fill("black")
  text("START", 520, 380, 70, 50)
  
  fill("white")
  rect (950, 370, 150, 50) // HOME BUTTON!
  fill("black")
  text("HOME", 970, 380, 70, 50) 
}
