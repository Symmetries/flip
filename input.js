var APP = APP || {};
var CONFIG = CONFIG || {};

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

function coordToMove(x, y){
    var width = window.innerWidth;
    var height = window.innerHeight;
    var gap; 
    var side;
    resetInputs();
    APP.click = true;
    
    // new region testing
    if (true){
        //out of screen
        if (x < 0 || y < 0 || x > width || y > height){
            APP.click = false;
        }
        //up
        if (x/ width > y/height && x/ width < 1- y/height){
            APP.upPressed = true;
        }
        //down
        if (x/ width < y/height && x/ width > 1- y/height){
            APP.downPressed = true;
        }
        //left
        if (x/ width < y/height && 1- x/ width > y/height){
            APP.leftPressed = true;
        }
        //right
        else {
            APP.rightPressed = true;
        }
        
    } else {
        if (width > height){
            gap = height * CONFIG.gap_ratio;
            side = height - 2 * gap;
            if (y < gap){
                APP.upPressed = true;
            } else if (y > height - gap) {
                APP.downPressed = true;
            } else if (x < width/2 - side/2) {
                APP.leftPressed = true;
            } else if (x > width/2 + side/2){
                APP.rightPressed = true;
            }
        } else {
            gap = width * CONFIG.gap_ratio;
            side = width - 2 * gap;
            if (y < height/2 - side/2){
                APP.upPressed = true;
            } else if (y > height/2 + side/2) {
                APP.downPressed = true;
            } else if (x < gap){
                APP.leftPressed = true;
            } else if (x > width - gap){
                APP.rightPressed = true;
            }
        }
    }
}


var mouseDownHandler = function(e){
    coordToMove(e.clientX, e.clientY);
    APP.click = true;
};

var mouseMoveHandler = function(e){
    if (APP.click){
        coordToMove(e.clientX, e.clientY);
    }
};

var mouseUpHandler = function(e){
    resetInputs();
    APP.click = false;
};

var touchStartHandler = function(e) {
    e.preventDefault();
    var last = e.touches.length - 1;
    coordToMove(e.touches[last].clientX, e.touches[last].clientY);
};

var touchMoveHandler = function(e) {
    e.preventDefault();
    var last = e.touches.length - 1;
    if (APP.click){
        coordToMove(e.touches[last].clientX, e.touches[last].clientY);
    }
};


var touchEndHandler = function(e) {
    e.preventDefault();
    if (e.touches.length === 0) resetInputs();
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
    resetInputs();
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
    APP.click = false;
};

