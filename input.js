var APP = APP || {};

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
// document.addEventListener("mousedown", MouseDownHandler);
// document.addEventListener("mousemove", MouseMouveHandler);
// document.addEventListener("mouseup", MouseUpHandler);

document.addEventListener("touchstart", TouchStartHandler, false);
document.addEventListener("touchmove", TouchMoveHandler, false);
document.addEventListener("touchend", TouchEndHandler, false);
var TouchStartHandler = function(e) {
    e.preventDefault();
    var width = window.innerWidth;
    //var height = window.innerHeight;
    if (e.touches[0].clientX < width/2){
        APP.leftPressed = true;
    } else {
        APP.rightPressed = true;
    }
    //APP.mousey = e.touches[0].clientY;
};

var TouchMoveHandler = function(e) {
    e.preventDefault();
    var width = window.innerWidth;
    //var height = window.innerHeight;
    if (e.touches[0].clientX < width/2){
        APP.leftPressed = true;
    } else {
        APP.rightPressed = true;
    }
};


var TouchEndHandler = function(e) {
    e.preventDefault();
    if (e.touches.length === 0) resetInputs();
};

APP.input = function(){
    var res = "n";
    if (APP.upPressed){
        res = "u";
    } else if (APP.downPressed){
        res = "d";
    } else if (APP.leftPressed){
        res = "l";
    } else if (APP.rightPressed){
        res = "r";
    }
    return res;
};

function keyDownHandler(e) {
	if (e.keyCode == 40) {
		APP.downPressed = true;
	}
    if(e.keyCode == 39) {
        APP.rightPressed = true;
    }
	else if (e.keyCode == 38) {
		APP.upPressed = true;
	}
    else if(e.keyCode == 37) {
        APP.leftPressed = true;
    }
    if (e.keyCode == 32){
        APP.spacePressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 40) {
		APP.downPressed = false;
	}
    if(e.keyCode == 39) {
        APP.rightPressed = false;
    }
	else if (e.keyCode == 38) {
		APP.upPressed = false;
	}
    else if(e.keyCode == 37) {
        APP.leftPressed = false;
    }
    if (e.keyCode == 32){
        APP.spacePressed = false;
    }
}



// var getSpace = function(){
//     return APP.spacePressed;
// };

// var isInput = function(){
//     return APP.upPressed || APP.downPressed || APP.leftPressed || APP.rightPressed ||
//         APP.spacePressed;
// };

var resetInputs = function() {
    APP.upPressed = false;
    APP.downPressed = false;
    APP.leftPressed = false;
    APP.rightPressed = false;
    APP.spacePressed = false;
};

