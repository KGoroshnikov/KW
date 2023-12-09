var json = null;
function openData() {
  fetch("data.json")
      .then((res) => {
      return res.json();
  })
  .then((data) => loadImgs(data));
}
openData();

var preloadedImages = [];
var currentImg = 0;
function loadImgs(data){
  json = data;
  for(let i = 0; i < json.planets.length; i++){
    let temp = new Image();
    temp.src = json.planets[i].url;
    preloadedImages.push(temp);
  }
}

var allCircles = document.getElementsByClassName("circle");
var targetAngles = [0, 0, 0];
var currentAngles = [0, 0, 0];
var currentPos = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
randMoons();
for(let i = 0; i < allCircles.length; i++){
  currentAngles[i] = -90 + Math.random() * 180;
  targetAngles[i] = currentAngles[i];
  currentPos[i][2] = -150 + Math.random() * 300;
  allCircles[i].style.transform = 'rotateX(' + 0 + 'deg) rotateY(' + 0 + 'deg) rotateZ(' + currentAngles[i] + 'deg) translate3d(' + 0 + 'px, ' + 0 + 'px, ' + currentPos[i][2] + 'px)';
}
function randMoons(){
  for(let i = 0; i < allCircles.length; i++){
    targetAngles[i] = -90 + Math.random() * 180;
  }
}

var mainPlanet = document.getElementById("mainImgContainer");
function rotateDivToMouse(event) {
  var mouseX = event.clientX;
  var mouseY = event.clientY;

  for(let i = 0; i < allCircles.length; i++){
    var divX = allCircles[i].offsetLeft + allCircles[i].clientWidth / 2;
    var divY = allCircles[i].offsetTop + allCircles[i].clientHeight / 2;
  }

  var deltaX = mouseX - divX;
  var deltaY = mouseY - divY;

  var maxAngleX = 30;
  var maxAngleY = 30;

  var angleX = Math.atan2(deltaY, divY) * (180 / Math.PI);
  var angleY = -Math.atan2(deltaX, divX) * (180 / Math.PI);

  angleX = Math.max(-maxAngleX, Math.min(maxAngleX, angleX));
  angleY = Math.max(-maxAngleY, Math.min(maxAngleY, angleY));

  angleX /= 2;
  angleY /= 2;

  for(let i = 0; i < allCircles.length; i++){
    currentPos[i][0] = angleX;
    currentPos[i][1] = angleY;
    allCircles[i].style.transform = 'rotateX(' + angleX + 'deg) rotateY(' + angleY + 'deg) rotateZ(' + currentAngles[i] + 'deg) translate3d(' + 0 + 'px, ' + 0 + 'px, ' + currentPos[i][2] + 'px)';
  }
  mainPlanet.style.transform = 'rotateX(' + (-angleX) + 'deg) rotateY(' + (-angleY) + 'deg) rotateZ(' + 0 + 'deg)';
}

document.addEventListener('mousemove', rotateDivToMouse);


var mainImg = document.getElementById("mainImg");
var glowImg = document.getElementById("glowImg");
var planetName = document.getElementById("planetName");
var weightText = document.getElementById("weightText");
var diameterText = document.getElementById("diameterText");
var dayText = document.getElementById("dayText");
var temperatureText = document.getElementById("temperatureText");
var glows = document.getElementsByClassName("glowBG");
var canClick = true;
function nextPlanet(){
  if (!canClick) return;
  canClick = false;
  currentImg++;
  if (currentImg >= preloadedImages.length) currentImg = 0;
  loadPlanet();
}

function prevPlanet(){
  if (!canClick) return;
  canClick = false;
  currentImg--;
  if (currentImg < 0) currentImg = preloadedImages.length - 1;
  loadPlanet();
}

var allAnimsMoon = [null, null, null];
function rotateMoons(){
  for(let i = 0; i < allCircles.length; i++){
    var anim = allCircles[i].animate(
      [{ transform: 'rotateX(' + currentPos[i][0] + 'deg) rotateY(' + currentPos[i][1] + 'deg) rotateZ(' + currentAngles[i] + 'deg) translate3d(' + 0 + 'px, ' + 0 + 'px, ' + currentPos[i][2] + 'px)' },
       { transform: 'rotateX(' + currentPos[i][0] + 'deg) rotateY(' + currentPos[i][1] + 'deg) rotateZ(' + targetAngles[i] + 'deg) translate3d(' + 0 + 'px, ' + 0 + 'px, ' + currentPos[i][2] + 'px)'  }],
      {
        fill: "forwards",
        easing: "ease",
        duration: 250,
      }
    );
    allAnimsMoon[i] = anim;
  }
  setTimeout(() => {
    for(let i = 0; i < allCircles.length; i++){
      currentAngles[i] = targetAngles[i];
      allCircles[i].style.transform = 'rotateX(' + currentPos[i][0] + 'deg) rotateY(' + currentPos[i][1] + 'deg) rotateZ(' + currentAngles[i] + 'deg) translate3d(' + 0 + 'px, ' + 0 + 'px, ' + currentPos[i][2] + 'px)';
      allAnimsMoon[i].cancel();
    }
    canClick = true;
  }, 250);
}


function loadPlanet(){
  var anim = mainImg.animate(
    [{ transform: 'rotateZ(' + 0 + 'deg)', filter: "blur(0)" },
     { transform: 'rotateZ(' + 90 + 'deg)', filter: "blur(20px)" }],
    {
      fill: "forwards",
      easing: "ease",
      duration: 250,
    }
  );

  setTimeout(() => {
    randMoons();
    mainImg.src = preloadedImages[currentImg].src;
    glowImg.src = preloadedImages[currentImg].src;

    for(let i = 0; i < glows.length; i++){
      glows[i].style.backgroundColor = json.planets[currentImg].clrs[i];
    }

    planetName.textContent = json.planets[currentImg].name;
    weightText.textContent = json.planets[currentImg].weight;
    diameterText.textContent = json.planets[currentImg].diameter;
    dayText.textContent = json.planets[currentImg].day;
    temperatureText.textContent = json.planets[currentImg].temperature;
    rotateMoons();

    var anim2 = mainImg.animate(
      [{ transform: 'rotateZ(' + 90 + 'deg)', filter: "blur(20px)" },
       { transform: 'rotateZ(' + 0 + 'deg)', filter: "blur(0)" }],
      {
        fill: "forwards",
        easing: "ease",
        duration: 250,
      }
    );
  }, 250);
}




var mobmenu = document.getElementById("burgerMenu");
var mobileMenuOpened = false;
function openMob(){
  mobileMenuOpened = true;
  mobmenu.style.display = "flex";
}

function closeMob(){
  mobileMenuOpened = false;
  mobmenu.style.display = "none";
}