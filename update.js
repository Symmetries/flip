var APP = APP || {};
var CONFIG = CONFIG || {};

APP.update = function(state, dt, input){
    if (state.level < 0){
        return newState(1, 0, state.maps);
    } else if (state.status === "alive") {
        if (state.level == state.maps.length){
            state.status = "won";
            return state;
        }
        var axis;
        if (input === "u"){
            state.rotx += 0.005*dt;
            if (state.rotx > 1) {
                state.rotx = 1;
            }
            state.u = rotate(state.u, state.v, -Math.PI/2048 * dt * state.rotx);
        } else if (input === "d"){
            state.rotx += 0.005*dt;
            if (state.rotx > 1) {
                state.rotx = 1;
            }
            state.u = rotate(state.u, state.v, Math.PI/2048 * dt * state.rotx);
        } else if (input === "l"){
            state.roty += 0.005*dt;
            if (state.roty > 1) {
                state.roty = 1;
            }
            axis = cross(state.u, state.v);
            state.u = rotate(state.u, axis, -Math.PI/2048 * dt * state.roty);
            state.v = rotate(state.v, axis, -Math.PI/2048 * dt * state.roty);
        } else if (input === "r"){
            state.roty += 0.005*dt;
            if (state.roty > 1) {
                state.roty = 1;
            }
            axis = cross(state.u, state.v);
            state.u = rotate(state.u, axis, Math.PI/2048 * dt * state.roty);
            state.v = rotate(state.v, axis, Math.PI/2048 * dt * state.roty);
        } else {
            state.rotx *= 0;
            state.roty *= 0;
        }
        
        if (CONFIG.speed * dt < CONFIG.distance_to_death_by_lag) {
            state.pos.x += state.u.x * CONFIG.speed * dt;
            state.pos.y += state.u.y * CONFIG.speed * dt;
            state.pos.z += state.u.z * CONFIG.speed * dt;
        }
        
        
        
        var current;
        if (state.pos.x > 0 && state.pos.x < state.maps[state.level-1].length &&
            state.pos.y > 0 && state.pos.y < state.maps[state.level-1][0].length &&
            state.pos.z > 0 && state.pos.z < state.maps[state.level-1][0][0].length){
            var floorX = Math.floor(state.pos.x);
            var floorY = Math.floor(state.pos.y);
            var floorZ = Math.floor(state.pos.z);
            current = state.maps[state.level-1][floorX][floorY][floorZ];
            if (current === "#"){
                state.status = "dying";
                return state;
                //return newState(state.level, state.deaths + 1, state.maps);
            } else if (current === "="){
                state.status = "passed";
                return state;
            }
        } else {
            state.status = "dying";
            return state;
        }
        return state;
    } else if (state.status === "dying"){
        state.counter += dt;
        axis = cross(state.u, state.v);
        state.u = rotate(state.u, axis, -Math.PI/20000 * state.counter);
        state.v = rotate(state.v, axis, -Math.PI/20000 * state.counter);
        if (state.counter > 2000){
            return newState(state.level, state.deaths + 1, state.maps);
        }
        return state;
    } else if (state.status === "passed") {
        state.counter += dt;
        state.u = rotate(state.u, state.v, -Math.PI/20000 * state.counter);
        if (state.counter > 2000){
            return newState(state.level + 1, state.deaths, state.maps);
        }
        return state;
    } else if (state.status === "won") {
        state.u = rotate(state.u, state.v, -Math.PI/2048 * dt);
        axis = cross(state.u, state.v);
        state.u = rotate(state.u, axis, -Math.PI/2048 * dt);
        state.v = rotate(state.v, axis, -Math.PI/2048 * dt);
        return state;
    }
};

var cross = function(v1, v2){
    return {x:v1.y*v2.z - v1.z*v2.y,
            y:v1.z*v2.x - v1.x*v2.z,
            z:v1.x*v2.y - v1.y*v2.x
    };
};

var rotate = function(vec, axis, angle){
    var c = Math.cos(angle);
    var s = Math.sin(angle);
    return {
        x:vec.x * (c + axis.x * axis.x * (1-c)) +
          vec.y *(axis.x * axis.y * (1-c) - axis.z * s) +
          vec.z *(axis.x * axis.z * (1-c) + axis.y * s),
        y:vec.x *(axis.y * axis.x * (1-c) + axis.z * s) +
          vec.y *(c + axis.y *axis.y * (1-c)) +
          vec.z *(axis.y * axis.z * (1-c) - axis.x * s),
        z:vec.x *(axis.z * axis.x * (1-c) - axis.y * s) +
          vec.y *(axis.z * axis.y * (1-c) + axis.x * s) +
          vec.z *(c + axis.z * axis.z * (1-c))
    };
};

var coords = function(map){
    for (var i = 0; i < map.length; i++){
        for (var j = 0; j < map[i].length; j++){
            for (var k = 0; k < map[i][j].length; k++){
                if (map[i][j][k] === "@"){
                    return {x: i+ 0.5, y: j + 0.5, z: k + 0.01};
                }
            }
        }
    }
};

var newState = function(level, deaths, maps){
    var pos = coords(maps[level-1]);
    return {status:"alive",
            counter:0,
            level:level,
            deaths:deaths,
            alive:true,
            maps:maps,
            pos:pos,
            rotx:0,
            roty:0,
            x:pos.x,
            y:pos.y,
            z:pos.z,
            u:{x:0, y:0, z:1},
            v:{x:1, y:0, z:0}};
};