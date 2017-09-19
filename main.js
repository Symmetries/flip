var APP = APP || {};

APP.main = function() {
         APP.loop(APP.setup(), 
                  document.getElementById('canvas').getContext('2d'),
                  Date.now());
};


APP.main();