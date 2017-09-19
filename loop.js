var APP = APP || {};

APP.loop = function(state, ctx, then){
    var now = Date.now();
    state = APP.update(state, now - then, APP.input());
    APP.output(state, ctx, APP.input());
    window.requestAnimationFrame(function(){
        APP.loop(state, ctx, now);
    });
};
