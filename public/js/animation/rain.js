// number of drops created.
var nbDrop = 500;

// function to generate a random number range.
function randRange( minNum, maxNum) {
  return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
}

// function to generate drops
function createRain() {

  for( let i=1; i<nbDrop; i++ ) {
    let dropLeft = randRange(0,1600);
    let dropTop = randRange(-1000,1400);

    $('.rain').append('<div class="drop" id="drop'+i+'"></div>');
    $('#drop'+i).css('left',dropLeft);
    $('#drop'+i).css('top',dropTop);
  }

}
// Make it rain
createRain();
