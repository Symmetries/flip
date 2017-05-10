var APP = APP || {};

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

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

// var resetInputs = function() {
//     APP.upPressed = false;
//     APP.downPressed = false;
//     APP.leftPressed = false;
//     APP.rightPressed = false;
//     APP.spacePressed = false;
// };

