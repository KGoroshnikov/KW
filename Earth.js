var json = null;
function openData() {
  fetch("earthData.json")
      .then((res) => {
      return res.json();
  })
  .then((data) => json = data);
}
openData();


var alignPlanet = document.getElementsByClassName("k");
if (window.screen.width < window.screen.height){
  for(let i = 0; i < alignPlanet.length; i++){
    alignPlanet[i].classList.remove("alignbyheight");
    alignPlanet[i].classList.add("alignbywidth");
  }
}


var sideVal = 2;

if (window.screen.width >= 1440) sideVal = 2;
else if (window.screen.width >= 1200) sideVal = 1.7;
else if (window.screen.width >= 1000) sideVal = 1.45;
else sideVal = 1;

var bushContainer = document.getElementById("bushContainer");

var bushLeft = document.getElementsByClassName("bushLeft");
for(let i = 0; i < bushLeft.length; i++){
  bushLeft[i].style.left = -bushLeft[i].width / sideVal + "px";
  bushLeft[i].style.top = -(bushLeft[i].height - window.innerHeight) / 2 + "px";
}

var bushRight = document.getElementsByClassName("bushRight");
for(let i = 0; i < bushRight.length; i++){
  bushRight[i].style.right = -bushRight[i].width / sideVal + "px";
  bushRight[i].style.top = -(bushRight[i].height - window.innerHeight) / 2 + "px";
}

var active = false;
setTimeout(() => {active = true}, 500);

var layers = [];
var ids = ["bush1", "bush1_shadow", "bush2", "bush2_shadow", "clouds", "clouds_glow"];
var speeds = [0.5, 1, 0.5, 1, 0.5, 0.5];
var zs = [0, 100, 0, 100, 200, 200];
for(let i = 0; i < ids.length; i++){
  layers.push(document.getElementById(ids[i]));
}
document.addEventListener('mousemove', function (e) {
  if (!active) return;
  var x = e.clientX / window.innerWidth - 0.5;
  var y = e.clientY / window.innerHeight - 0.5;

  layers.forEach(function (layer, index) {
    var speed = speeds[index];
    layer.style.transform = 'translate3d(' + (-x) * speed * 100 + 'px, ' + (-y) * speed * 100 + 'px, ' + zs[index] + 'px)';
  });
});


var mainPlanet = document.getElementById("mainPlanetContainer");
function rotateDivToMouse(event) {
  var mouseX = event.clientX;
  var mouseY = event.clientY;

  var divX = mainPlanet.offsetLeft + mainPlanet.clientWidth / 2;
  var divY = mainPlanet.offsetTop + mainPlanet.clientHeight / 2;

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

  mainPlanet.style.transform = 'rotateX(' + angleX + 'deg) rotateY(' + angleY + 'deg) rotateZ(' + 0 + 'deg)';
}
document.addEventListener('mousemove', rotateDivToMouse);

var arr = []
var planetObj = document.getElementById("mainPlanet");
var maintip = document.getElementById("maintip");
var maintipName = document.getElementById("maintip-name");
var maintipDescription = document.getElementById("maintip-description");
var textTipRepeat = document.getElementById("textTipRepeat");
var templateDiv = document.getElementsByClassName('location')[0];
document.addEventListener('click', function (event) {
  var containerRect = planetObj.getBoundingClientRect();
  var percentageX = ((-containerRect.x + event.clientX) / containerRect.width) * 100;
  var percentageY = ((-containerRect.y + event.clientY) / containerRect.height) * 100;

  let type = 0;
  for(let i = 1; i < json.countries.length; i++){
    console.log(isPointInsidePolygon(percentageX, percentageY, json.countries[i].points));
    if (isPointInsidePolygon(percentageX, percentageY, json.countries[i].points)){
      type = i;
      break;
    }
  }


  var clonedDiv = templateDiv.cloneNode(true);
  clonedDiv.style.display = "block";

  arr.push([parseInt(percentageX.toFixed(2)), parseInt(percentageY.toFixed(2))]);
  console.log(arr);

  clonedDiv.style.left = event.clientX - (templateDiv.width / 2) + 'px';
  clonedDiv.style.top = event.clientY - templateDiv.height + 'px';

  mainPlanet.appendChild(clonedDiv);

  maintip.style.display = "block";
  maintip.style.top = event.clientY - 150 + "px";
  maintip.style.left = event.clientX + 20 + "px";
  maintipName.textContent = json.countries[type].name;
  maintipDescription.textContent = json.countries[type].description;
  textTipRepeat.textContent = json.countries[type].description;
});

function isPointInsidePolygon(x, y, polygonVertices) {
  var isInside = false;

  for (var i = 0, j = polygonVertices.length - 1; i < polygonVertices.length; j = i++) {
    var xi = polygonVertices[i][0], yi = polygonVertices[i][1];
    var xj = polygonVertices[j][0], yj = polygonVertices[j][1];

    var intersect = ((yi > y) != (yj > y)) &&
      (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

    if (intersect) isInside = !isInside;
  }

  return isInside;
}

function loadPage(){
  window.location.href = "index.html";
}