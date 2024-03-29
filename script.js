
/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */

/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */

const SPELEN = 1;
const GAMEOVER = 2;
const UITLEG = 8;
var spelStatus = UITLEG;

var spelerX = 1050; // 1280 - 80 (breedte) - 150 (verte van muur)
var spelerY = 680; // y-positie van speler

var vijandX = 230;
var vijandY = 680;

var platformX = 300;
var platformY = 280;
var platform2X = 100;
var platform2Y = 300;
var platform3X = 880; // 1280(breedte) - 100(gat) - 300(balkbreedte)
var platform3Y = 300;

var spelerspringt = false;
var snelheid = 7;
var spelerspringt2 = false;
var snelheid2 = 7;

var kogelX = 0;
var kogelY = 0;
var kogel2X = 0;
var kogel2Y = 0;
var kogelvliegt = false;
var kogelvliegt2 = false;

var img; // plaatje
var img2; // plaatje 2

var health = 100;

/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
var beweegAlles = function () {
  // speler
  if (keyIsDown(37)) { // Left Arrow
  spelerX = spelerX - 7;
  }
  if (keyIsDown(39)) { // Right Arrow
  spelerX = spelerX + 7;
  }
  if (spelerY > 694) {
    spelerY = 694;
  }
  if (spelerX > 1280 - 45) {
    spelerX = 1280 - 45;
  }
  if (spelerX < 0 + 45) {
    spelerX = 0 + 45;
  }

  // vijand
  if (keyIsDown(68)) { // D
  vijandX = vijandX + 7;
  }
  if (keyIsDown(65)) { // A
  vijandX = vijandX - 7;
  }
  if (vijandY > 694) {
    vijandY = 694;
  }
  if (vijandX < 0 + 45) {
    vijandX = 0 + 45;
  }
    if (vijandX > 1280 - 45) {
    vijandX = 1280 - 45;
  }
      // springen speler
      if (spelerspringt === false && keyIsDown(38)) {
    snelheid = 10;
    spelerspringt = true;
  }
      if (spelerspringt === true ) {  // langzamer springen
    spelerY = spelerY - snelheid;
    snelheid = snelheid - 0.1;
  }
      if (spelerspringt === true && spelerY > 690) {
    spelerspringt = false;
    spelerY = 680;
  }
      // springer vijand
        if (spelerspringt2 === false && keyIsDown(87)) {
    snelheid2 = 10;
    spelerspringt2 = true;
  }
      if (spelerspringt2 === true ) {  // langzamer springen
    vijandY = vijandY - snelheid2;
    snelheid2 = snelheid2 - 0.1;
  }
      if (spelerspringt2 === true && vijandY > 690) {
    spelerspringt2 = false;
    vijandY = 680;
  }
    
  // kogel
 if (kogelvliegt === false &&
     keyIsDown(17)) { // start schieten
   kogelvliegt = true;
   kogelX = spelerX;
   kogelY = spelerY - 70;
  }
  if (kogelvliegt === true) { // kogelvliegt
    kogelX = kogelX - 10;
  }
  if (kogelvliegt === true &&
    kogelX < -15) { // kogel verdwijnt
    kogelvliegt = false;
  }

};

/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function () {
  // botsing speler tegen vijand

   
  // botsing kogel tegen vijand
  if (kogelX - vijandX < 50 &&
kogelX - vijandX >-50 &&
kogelY - vijandY < 50 &&
kogelY - vijandY >-50) {
  text("Health:"+0, 25, 50);
}
  if (health === 0) {
    spelStatus = GAMEOVER;
  }
  // update punten en health

  
};
  

/**
 * Tekent spelscherm
 */
var tekenAlles = function () {
  // achtergrond
fill (117, 147, 217)
  rect(0,0,1280,720)
  image(img, 0, 0, 1280, 720);
  // vijand
  image(img4, vijandX - 45, vijandY - 110, 100, 130);
  
    // speler
  image(img3, spelerX - 45, spelerY - 110, 70, 130);

    // kogel
  fill("red")
  ellipse(kogelX, kogelY, 30, 30);

  // punten en health
  fill("black")
  textSize(50)
  text("Health:"+health, 25, 50);
  
  // map & mechanic
fill(0, 0, 0);
  rect(platformX - 1000, platformY + 400, 10000, 50);
  rect(platform2X, platform2Y, 300, 20);
  rect(platform3X , platform3Y , 300, 20);
};
  // platform



/**
 * return true als het gameover is
 * anders return false
 */
var checkGameOver = function () {
  if (kogelX - vijandX < 50 &&
    kogelX - vijandX > -50 &&
    kogelY - vijandY < 50 &&
    kogelY - vijandY > -50) {
    console.log("Botsing");
    return true;
  }
  // check of HP 0 is , of tijd op is, of ...
  return false;
};

/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */

// Functie wordt 1x uitgevoerd voor setup
// Plaatjes worden hier geladen
function preload() {
  img = loadImage('background.jpg');
  img2 = loadImage('gameover.png');
  img3 = loadImage('speler.png'); // foto vijand
  img4 = loadImage('vijand.png'); // foto speler
}
/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background(117, 147, 217);
}

  
/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  if (spelStatus === SPELEN) {
    beweegAlles();
    verwerkBotsing();
    tekenAlles();
    if (checkGameOver()) {
      spelStatus = GAMEOVER;
    }
    console.log("spelen");
  }
  
  if (spelStatus === GAMEOVER) {
    // teken game-over scherm
    console.log("game over");
    textSize(50);
    fill(0, 0, 0);
    text("Druk spatie om weer te spelen!", 280, 600);
    image(img2, 320, 150, 640, 360);
    if (keyIsDown(32)) {
      spelerX = 1050; // x-positie van speler
      spelerY = 680; // y-positie van speler
      vijandX = 230; // x-positie van vijand
      vijandY = 680; // y-positie van vijand
      spelerspringt = false;
      spelerspringt2 = false;
      spelStatus = SPELEN;
    }
  }
  
  if (spelStatus === UITLEG) {
    // teken uitleg scherm
    console.log("uitleg");
    textSize(40);
    rect(0, 0, 1280, 720);
    fill("white");
    textFont('Helvetica');
    textStyle(BOLD);
    text("Je hebt twee spelers.", 450, 160);
    text("De eerste speler gebruikt 'W, A, S, D' om te bewegen,"
        ,150, 260);
    text("en moet de kogels vermijden.", 150, 360);
    text("De andere speler gebruikt de pijltjes om te bewegen,"
         ,150, 460);
    text("en de rechter 'CTRL' om te schieten.", 150, 560);
    text("Druk op enter om te beginnen!", 350, 660);
     fill(117, 147, 217);
    if (keyIsDown(13)) {
      spelStatus = SPELEN;
    }
    
    
    
  }
}
