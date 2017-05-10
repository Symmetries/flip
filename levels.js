var APP = APP || {};

APP.levels = [];

var map1 = "#######|" +
           "#######|" +
           "#######|" +
           "##@..##|" +
           "####.##|" +
           "#######|" +
           "#######|";

APP.mapToLevel = function(mapRepr){
    var row = [];
    var res = [];
    for(var i = 0; i < mapRepr.length; i++){
        if (mapRepr.charAt(i) === "|"){
            res.push(row);
            row = [];
        } else{
            row.push(mapRepr.charAt(i));
        }
    }
    return res;
};

APP.levels.push(APP.mapToLevel(map1));
console.log(APP.levels);