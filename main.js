var APP = APP || {};

var ctx = document.getElementById('canvas').getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

//negative level represents no state yet
var state = {level: -1};
APP.main = function(){
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    state = APP.update(state, APP.input());
    APP.output(state, ctx);
    window.requestAnimationFrame(APP.main);
};

APP.main();