var APP = APP || {};

APP.update = function(state, input){
    if (state.level < 0){
        return newState(0);
    } else {
        if (input === "l"){
            state.angle += Math.PI/256;
        } else if (input === "r"){
            state.angle -= Math.PI/256;
        }
        state.x += 0.01 * Math.cos(state.angle);
        state.y += 0.01 * Math.sin(state.angle);
    } 
    var current = state.maps[state.level][Math.floor(state.x)][Math.floor(state.y)];
    if (current === "#"){
        return newState(state.level);
    } else if (current === "="){
        return newState(state.level + 1);
    }
    return state;
};

var strMap1 = "#######|" +
              "#.....#|" +
              "#@...=#|" + 
              "#.....#|" +
              "#######|";
              
var strMap2 = "#######|" +
              "#....=#|" +
              "#@....#|" +
              "#.....#|" +
              "#######|";

var strMap3 = "#######|" +
              "#.....#|" +
              "#@....#|" +
              "#....=#|" +
              "#######|";

var strMap4 = "#########|" +
              "#.......#|" +
              "#@..#..=#|" +
              "#.......#|" +
              "#########|";

var strMap5 = "#######|" +
              "#@....#|" +
              "#####=#|" +
              "#######|";
              
var strMap6 = "#######|" +
              "#@..#=#|" +
              "###...#|" +
              "#######|";

var strMap7 = "##########|" +
              "###..=####|" +
              "###.######|" +
              "###...####|" +
              "#####.####|" +
              "###@..####|" +
              "##########|";

var strMap8 = "#######|" +
              "###...#|" +
              "#=@.#.#|" +
              "###...#|" +
              "#######|";

var strMap9 = "##########|" +
              "##########|" +
              "#####..=##|" +
              "#####.#.##|" +
              "#.......##|" +
              "#.#.#.####|" +
              "#.....####|" +
              "#.#.#.####|" +
              "#@....####|" +
              "##########|";

var strMap10 = "###########|" +
               "#.......#=#|" +
               "#.#####.#.#|" +
               "#.#...#...#|" +
               "#...#.#####|" +
               "#####.....#|" +
               "#######.#.#|" +
               "####@.....#|" +
               "###########|";
              


// strMap1 = ".......|" +
//           ".......|" +
//           "#######|" +
//           "#=...##|" +
//           "####.##|" +
//           "..##=##|" +
//           "..#####|";


var strToMap = function(strMap){
    var row = [];
    var res = [];
    for(var i = 0; i < strMap.length; i++){
        if (strMap.charAt(i) === "|"){
            res.push(row);
            row = [];
        } else{
            row.push(strMap.charAt(i));
        }
    }
    return res;
};

var maps = [];

var coords = function(map){
    for (var i = 0; i < map.length; i++){
        for (var j = 0; j < map[i].length; j++){
            if (map[i][j] === "@"){
                return {x: i  + 0.5, y: j + 0.5};
            }
        }
    }
};

maps.push(strToMap(strMap1));
maps.push(strToMap(strMap2));
maps.push(strToMap(strMap3));
maps.push(strToMap(strMap4));
maps.push(strToMap(strMap5));
maps.push(strToMap(strMap6));
maps.push(strToMap(strMap7));
maps.push(strToMap(strMap8));
maps.push(strToMap(strMap9));
maps.push(strToMap(strMap10));

var newState = function(level){
    var pos = coords(maps[level]);
    return {level:level, maps:maps, x:pos.x, y:pos.y, angle: Math.PI/2};
};