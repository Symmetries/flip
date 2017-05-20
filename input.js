var APP = APP || {};

var mouseDownHandler = function(e){
    var width = window.innerWidth;
    var height = window.innerHeight;
    if (e.clientX < width/2 && e.clientY > height/3 && e.clientY < 2 *height/3){
        APP.leftPressed = true;
    } else if (e.clientY > height/3 && e.clientY < 2 *height/3){
        APP.rightPressed = true;
    } else if (e.clientY < height/3){
        APP.upPressed = true;
    } else {
        APP.downPressed = true;
    }
};

var mouseMoveHandler = function(e){
    var width = window.innerWidth;
    var height = window.innerHeight;
    if (e.clientX < width/2 && e.clientY > height/3 && e.clientY < height/3){
        //APP.leftPressed = true;
    } else {
        //APP.rightPressed = true;
    }
};

var mouseUpHandler = function(e){
    resetInputs();
};

var touchStartHandler = function(e) {
    e.preventDefault();
    var width = window.innerWidth;
    var height = window.innerHeight;
    var t = e.touches[0];
    if (t.clientX < width/2 && t.clientY > height/3 && t.clientY < 2 *height/3){
        APP.leftPressed = true;
    } else if (t.clientY > height/3 && t.clientY < 2 *height/3){
        APP.rightPressed = true;
    } else if (t.clientY < height/3){
        APP.upPressed = true;
    } else {
        APP.downPressed = true;
    }
    //APP.mousey = e.touches[0].clientY;
};

var touchMoveHandler = function(e) {
    e.preventDefault();
    // var width = window.innerWidth;
    // //var height = window.innerHeight;
    // if (e.touches[0].clientX < width/2){
    //     APP.leftPressed = true;
    // } else {
    //     APP.rightPressed = true;
    // }
};


var touchEndHandler = function(e) {
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

var keyDownHandler = function(e) {
	var map = {
        38: 0, // Up
        39: 1, // Right
        40: 2, // Down
        37: 3, // Left
        75: 0, // Vim up
        76: 1, // Vim right
        74: 2, // Vim down
        72: 3, // Vim left
        87: 0, // W
        68: 1, // D
        83: 2, // S
        65: 3  // A
    };
    var mapped = map[e.keyCode];
    if (mapped === 0){
        APP.upPressed = true;
    } else if (mapped === 1){
        APP.rightPressed = true;
    } else if (mapped === 2){
        APP.downPressed = true;
    } else if (mapped === 3){
        APP.leftPressed = true;
    }
};

var keyUpHandler = function(e) {
    var map = {
        38: 0, // Up
        39: 1, // Right
        40: 2, // Down
        37: 3, // Left
        75: 0, // Vim up
        76: 1, // Vim right
        74: 2, // Vim down
        72: 3, // Vim left
        87: 0, // W
        68: 1, // D
        83: 2, // S
        65: 3  // A
    };
    var mapped = map[e.keyCode];
    if (mapped === 0){
        APP.upPressed = false;
    } else if (mapped === 1){
        APP.rightPressed = false;
    } else if (mapped === 2){
        APP.downPressed = false;
    } else if (mapped === 3){
        APP.leftPressed = false;
    }
//     if (e.keyCode == 40) {
// 		APP.downPressed = false;
// 	}
//     if(e.keyCode == 39) {
//         APP.rightPressed = false;
//     }
// 	else if (e.keyCode == 38) {
// 		APP.upPressed = false;
// 	}
//     else if(e.keyCode == 37) {
//         APP.leftPressed = false;
//     }
//     if (e.keyCode == 32){
//         APP.spacePressed = false;
//     }
};

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousedown", mouseDownHandler);
document.addEventListener("mousemove", mouseMoveHandler);
document.addEventListener("mouseup", mouseUpHandler);
document.addEventListener("touchstart", touchStartHandler, false);
document.addEventListener("touchmove", touchMoveHandler, false);
document.addEventListener("touchend", touchEndHandler, false);

var resetInputs = function() {
    APP.upPressed = false;
    APP.downPressed = false;
    APP.leftPressed = false;
    APP.rightPressed = false;
    APP.spacePressed = false;
};

