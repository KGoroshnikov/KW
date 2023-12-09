var layers = [];
var ids = ["BGMARS", "GroundMars", "groundFix", "RockMars", "SunMars", "mainPageContainer"];
for(let i = 0; i < ids.length; i++){
  layers.push(document.getElementById(ids[i]));
}
var speeds = [0.35, 0.5, 0.5, 1, 0.25, 1];
var posesY = [0, 0, 0, 0, 0, 0];

var windowHeight = window.innerHeight;
var boxContainer = document.getElementById("parallaxContainer");

window.addEventListener('wheel', function(event) {
  var wheelDelta = event.deltaY;

  for(let i = 0; i < speeds.length; i++){
    var newPosition = wheelDelta * -speeds[i];
    layers[i].style.transform = 'translate(0, ' + (posesY[i] + newPosition) + 'px)';
    posesY[i] += newPosition;
  }

  for(let i = 0; i < speeds.length; i++){
    if (posesY[i] + boxContainer.offsetHeight < 0){
      let d = boxContainer.offsetHeight + posesY[i];
      for(let j = 0; j < speeds.length; j++){
        var newPosition = -d * speeds[j];
        layers[j].style.transform = 'translate(0, ' + (posesY[j] + newPosition) + 'px)';
        posesY[j] += newPosition;
      }
    }
    else if(posesY[i] > 1688){
      let d = posesY[i] - 1688;
      for(let j = 0; j < speeds.length; j++){
        var newPosition = -d * speeds[j];
        layers[j].style.transform = 'translate(0, ' + (posesY[j] + newPosition) + 'px)';
        posesY[j] += newPosition;
      }
    }
  }
});

window.onload = function(){
  startPoses = [254, 364, 364, 728, 182, 728];
  for(let i = 0; i < startPoses.length; i++){
    layers[i].style.transform = 'translate(0, ' + startPoses[i] + 'px)';
    posesY[i] = startPoses[i];
  }
};