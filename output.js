var APP = APP || {};
var CONFIG = CONFIG || {};

APP.output = function(state, ctx, input){
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    drawBackground(ctx);
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    var gap;
    var side;
    if (ctx.canvas.width > ctx.canvas.height){
        gap = height * CONFIG.gap_ratio;
        side = height - 2 * gap;
    } else {
        gap = width * CONFIG.gap_ratio;
        side = width - 2 * gap;
    }
    var min = Math.floor(Math.min(ctx.canvas.width, ctx.canvas.height)/6);
    ctx.lineWidth = min/80;
    var squares = mapCrossSection(state.maps[state.level-1],
                                  state.pos,
                                  state.u,
                                  state.v,
                                  ctx.canvas,
                                  side);
    //drawPlane(ctx);
    for (var i = 0; i < squares.length; i++){
        drawFigure(squares[i], ctx, gap, side);
    }
    
    // if (Math.random() < 0.1){
    //     console.log("next")
    //     console.log(TEST.tries);
    //     console.log(squares.length)
    // }
    
    drawForeground(ctx, input, gap, side);
    if (state.status === "alive"){
        drawCircle(ctx, side, "black");
    } else if (state.status === "dying") {
        drawCircle(ctx, side, "red")
    }
    
    ctx.font = String(min) + "px monospace";
    ctx.fillStyle = "black";
    ctx.strokeStyle = "white";
    ctx.textAlign = "center";
    
    var length = String(state.level).length;
    var dif = min /40;
    ctx.strokeText(String(state.level), length * min/3 + dif, 3 * min/4 - dif/2);
    ctx.fillText(String(state.level), length * min/3, 3 *min/4);
    //ctx.strokeText(String(state.level), width - length * min/3 + dif, height-min/16 - dif/2);
    //ctx.fillText(String(state.level),width - length * min/3, height- min/16);
    
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    length = String(state.deaths).length;
    ctx.strokeText(String(state.deaths), width - length * min/3 + dif, 3 * min/4 - dif/2);
    ctx.fillText(String(state.deaths), width - length * min/3, 3 *min/4);
    //ctx.strokeText(String(state.deaths), length * min/3 + dif, height-min/16 - dif/2);
    //ctx.fillText(String(state.deaths), length * min/3, height- min/16);
};


var mapCrossSection = function(map, pos, u, v, canvas, side){
    TEST.tries = 0;
    var res = [];
    var diff = CONFIG.blocks;
    var draw;
    var n = cross(u, v);
    var d = -(n.x * pos.x + n.y * pos.y + n.z * pos.z);
    for (var i = -diff; i < map.length + diff; i++){
        for (var j = -diff; j < map[0].length + diff; j++){
            for (var k = -diff; k < map[0][0].length + diff; k++){
                var x0 = i+0.5;
                var y0 = j+0.5;
                var z0 = k+0.5;
            
                if (Math.abs(n.x*x0 + n.y*y0 + n.z*z0 + d) < Math.sqrt(3)/2){
                    if ((x0-pos.x)*(x0-pos.x) + (y0-pos.y)*(y0-pos.y)+(z0 + (1/2-CONFIG.circle_pos_ratio)*CONFIG.zoom/2- pos.z)*(z0+(1/2-CONFIG.circle_pos_ratio)*CONFIG.zoom/2- pos.z) < CONFIG.vision_radius*CONFIG.vision_radius){
                        var points = squareCrossSection(i, j, k, pos, u, v);
                        if (points.length > 2){
                            draw = false;
                            var coords = points.map(function(p){
                                return uvToWindow(p, canvas, side);
                            });
                            for (var w = 0; w < coords.length; w++){
                                if (coords[w].x > canvas.width/2 - side/1.5 && coords[w].x < canvas.width/2 + side/1.5 &&
                                    coords[w].y > canvas.height/2 - side/1.5 && coords[w].y < canvas.height/2 + side/1.5){
                                    draw = true;
                                }
                            }
                            draw = true;
                            // if (Math.random() < 0.01){
                            //     console.log("in: " + String([i, j, k]))
                            //     console.log(Math.abs(n.x*x0 + n.y*y0 + n.z*z0 + d))
                            //     if (!(Math.abs(n.x*x0 + n.y*y0 + n.z*z0 + d) <= Math.sqrt(3)/2)){
                            //         console.log("Fails! and it had " + String(points.length) + " points!")
                            //     }
                            // }
                            // if (Math.abs(n.x*x0 + n.y*y0 + n.z*z0 + d) >2){
                            //     console.log("next")
                            //     console.log(n.x*x0 + n.y*y0 + n.z*z0 + d)
                            //     console.log(n.x*n.x + n.y*n.y + n.z*n.z);
                            // }
                            if (draw){
                                if (i < 0 || j < 0 || k < 0 || 
                                    i >= map.length|| j >= map[0].length || k>= map[0][0].length){
                                    res.push({type:"#", points:coords});
                                } else {
                                    res.push({type:map[i][j][k], points:coords});
                                }
                            }
                        } else if (Math.random() < 0.0001){
                            //console.log("out")
                            //console.log(Math.abs(n.x*x0 + n.y*y0 + n.z*z0 + d))
                        }
                    }
                }
            }
        }
    }
    return res;
};

var squareCrossSection = function(i, j, k, pos, u, v){
    TEST.tries += 1;
    var res = [];
    var point;
    if(u.z * v.y - u.y * v.z !== 0){
        point = lineIntersection(i, j, k, i + 1, j, k, pos, u, v);
        if (pos.x + point.x * u.x + point.y * v.x <= i + 1 && 
            pos.x + point.x * u.x + point.y * v.x >= i){
            res.push(point);
        }
        point = lineIntersection(i, j + 1, k, i + 1, j + 1, k, pos, u, v);
        if (pos.x + point.x * u.x + point.y * v.x <= i + 1 && 
            pos.x + point.x * u.x + point.y * v.x >= i){
            res.push(point);
        }
        point = lineIntersection(i, j+1, k+1, i + 1, j+1, k+1, pos, u, v);
        if (pos.x + point.x * u.x + point.y * v.x <= i + 1 && 
            pos.x + point.x * u.x + point.y * v.x >= i){
            res.push(point);
        }
        point = lineIntersection(i, j, k + 1, i + 1, j, k + 1, pos, u, v);
        if (pos.x + point.x * u.x + point.y * v.x <= i + 1 && 
            pos.x + point.x * u.x + point.y * v.x >= i){
            res.push(point);
        }
    }
    if(u.z * v.x - u.x * v.z !== 0){
        point = lineIntersection(i, j, k, i, j+1, k, pos, u, v);
        if (pos.y + point.x * u.y + point.y * v.y <= j + 1 && 
            pos.y + point.x * u.y + point.y * v.y >= j){
            res.push(point);
        }
        point = lineIntersection(i+1, j, k, i + 1, j + 1, k, pos, u, v);
        if (pos.y + point.x * u.y + point.y * v.y <= j + 1 && 
            pos.y + point.x * u.y + point.y * v.y >= j){
            res.push(point);
        }
        point = lineIntersection(i+1, j, k+1, i+1, j+1, k+1, pos, u, v);
        if (pos.y + point.x * u.y + point.y * v.y <= j + 1 && 
            pos.y + point.x * u.y + point.y * v.y >= j){
            res.push(point);
        }
        point = lineIntersection(i, j, k+1, i, j+1, k+1, pos, u, v);
        if (pos.y + point.x * u.y + point.y * v.y <= j + 1 && 
            pos.y + point.x * u.y + point.y * v.y >= j){
            res.push(point);
        }
    }
    if(u.y * v.x - u.x * v.y !== 0){
        point = lineIntersection(i, j, k, i, j, k+1, pos, u, v);
        if (pos.z + point.x * u.z + point.y * v.z <= k + 1 && 
            pos.z + point.x * u.z + point.y * v.z >= k){
            res.push(point);
        }
        point = lineIntersection(i+1, j, k, i + 1, j, k+1, pos, u, v);
        if (pos.z + point.x * u.z + point.y * v.z <= k + 1 && 
            pos.z + point.x * u.z + point.y * v.z >= k){
            res.push(point);
        }
        point = lineIntersection(i+1, j+1, k, i+1, j+1, k+1, pos, u, v);
        if (pos.z + point.x * u.z + point.y * v.z <= k + 1 && 
            pos.z + point.x * u.z + point.y * v.z >= k){
            res.push(point);
        }
        point = lineIntersection(i, j+1, k, i, j+1, k+1, pos, u, v);
        if (pos.z + point.x * u.z + point.y * v.z <= k + 1 && 
            pos.z + point.x * u.z + point.y * v.z >= k){
            res.push(point);
        }
    }
    return res;
};

var lineIntersection = function(x1, y1, z1, x2, y2, z2, p, u, v){
    if (x1 !== x2){
        return {
            x:-(v.y * p.z - v.y * z1 - v.z * p.y + v.z * y1)/(u.z * v.y - u.y * v.z),
            y:-(-u.y * p.z + u.y * z1 + u.z * p.y - u.z * y1)/(u.z * v.y - u.y * v.z)
        };
    } else if (y1 !== y2){
        return {
            x:-(v.x * p.z - v.x * z1 - v.z * p.x + v.z * x1)/(u.z * v.x - u.x * v.z),
            y:-(-u.x * p.z + u.x * z1 + u.z * p.x - u.z * x1)/(u.z * v.x - u.x * v.z)
        };
    } else if (z1 !== z2) {
        return {
            x:-(v.x * p.y - v.x * y1 - v.y * p.x + v.y * x1)/(u.y * v.x - u.x * v.y),
            y:-(u.x * p.y - u.x * y1 - u.y * p.x + u.y * x1)/(u.x * v.y - u.y * v.x)
        };
    }
};

var drawFigure = function(square, ctx, gap, side){
    var colour;
    if (square.type === "#"){
        colour = "black";
    } else if (square.type === "="){
        colour = "green";
    } else {
        colour = "grey";
    }
    ctx.fillStyle = colour;
    ctx.strokeStyle = "white";
    // for (var i = 0; i < square.points.length; i++){
    //     var x = ctx.canvas.width/2 + (square.points[i].x)/5 * side - side/2.5;
    //     var y = ctx.canvas.height/2 + (square.points[i].y)/5 * side;
    //     points.push({
    //         x:x,
    //         y:y
    //     });
    // }
    convexHull(ctx, square.points, square.type);
};

var drawCircle = function(ctx, side, colour){
    var r = Math.min(ctx.canvas.width, ctx.canvas.height)/600;
    ctx.fillStyle = colour;
    ctx.beginPath();
    ctx.ellipse(ctx.canvas.width/2 - side/2 + side * CONFIG.circle_pos_ratio, ctx.canvas.height/2, 2*r, 2*r, 0, 0, 2 * Math.PI);
    ctx.fill();
};

var drawBackground = function(ctx){
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fill();
};

var drawForeground = function(ctx, direction, gap, side){
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    var colourUp = "rgba(0, 0, 0, 0)"; //"grey";
    var colourLeft = "rgba(0, 0, 0, 0)"; //"grey";
    var colourRight = "rgba(0, 0, 0, 0)"; // "grey";
    var colourDown = "rgba(0, 0, 0, 0)"; //"grey";
    ctx.strokeStyle = "rgba(0, 0, 0, 0)"; //"black";
    
    if (direction === "u"){
        colourUp = "rgba(221, 221, 221, 0.5)";//#dddddd";
    } else if (direction === "d") {
        colourDown = "rgba(221, 221, 221, 0.5)";//#dddddd";
    } else if (direction === "l") {
        colourLeft = "rgba(221, 221, 221, 0.5)";//#dddddd";
    } else if (direction === "r") {
        colourRight = "rgba(221, 221, 221, 0.5)";//#dddddd";;
    }
    
    
    //testing new region
    var middle = {x:width/2, y:height/2};
    var upleft = {x:0, y:0};
    var downleft = {x:0, y:height};
    var upright = {x:width, y:0};
    var downright = {x:width, y:height};
    if (true) {
        ctx.fillStyle = colourUp;
        ctx.beginPath();
        ctx.moveTo(middle.x, middle.y);
        ctx.lineTo(upleft.x, upleft.y);
        ctx.lineTo(upright.x, upright.y);
        ctx.closePath();
        ctx.fill();
        
        
        ctx.fillStyle = colourDown;
        ctx.beginPath();
        ctx.moveTo(middle.x, middle.y);
        ctx.lineTo(downleft.x, downleft.y);
        ctx.lineTo(downright.x, downright.y);
        ctx.closePath();
        ctx.fill();
        
        
        ctx.fillStyle = colourLeft;
        ctx.beginPath();
        ctx.moveTo(middle.x, middle.y);
        ctx.lineTo(upleft.x, upleft.y);
        ctx.lineTo(downleft.x, downleft.y);
        ctx.closePath();
        ctx.fill();
        
        
        ctx.fillStyle = colourRight;
        ctx.beginPath();
        ctx.moveTo(middle.x, middle.y);
        ctx.lineTo(upright.x, upright.y);
        ctx.lineTo(downright.x, downright.y);
        ctx.closePath();
        ctx.fill();
        
        
    }
    else {
    if (ctx.canvas.width > ctx.canvas.height){
        ctx.fillStyle = colourUp;
        ctx.beginPath();
        ctx.rect(0, 0, width, gap);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = colourDown;
        ctx.beginPath();
        ctx.rect(0, ctx.canvas.height - gap, ctx.canvas.width, gap);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = colourLeft;
        ctx.beginPath();
        ctx.rect(0, gap, width/2 - side/2, side);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = colourRight;
        ctx.beginPath();
        ctx.rect(ctx.canvas.width/2 + side/2,
                 gap,
                 ctx.canvas.width/2 - side/2,
                 side);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    } else {
        ctx.fillStyle = colourUp;
        ctx.beginPath();
        ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height/2 - side/2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = colourDown;
        ctx.beginPath();
        ctx.rect(0,
                 height/2 + side/2,
                 width,
                 height/2 - side/2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = colourLeft;
        ctx.beginPath();
        ctx.rect(0, height/2 - side/2, gap, side);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = colourRight;
        ctx.beginPath();
        ctx.rect(width - gap, height/2 - side/2, gap, side);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
    }
};

var drawPlane = function(ctx){
    var gap;
    var side;
    ctx.fillStyle = "black";
    if (ctx.canvas.width > ctx.canvas.height){
        gap = ctx.canvas.height/5;
        side = ctx.canvas.height - 2 * gap;
        ctx.beginPath();
        ctx.rect(ctx.canvas.width/2 - side/2, gap, side, side);
        ctx.closePath();
        ctx.fill();
    } else{
        gap = ctx.canvas.width/5;
        side = ctx.canvas.width - 2 * gap;
        ctx.beginPath();
        ctx.rect(gap, ctx.canvas.height/2 - side/2, side, side);
        ctx.fill();
    }
};

var uvToWindow = function(point, canvas, side){
    return {x:canvas.width/2 - side/2 + (point.x)/CONFIG.zoom * side + side * CONFIG.circle_pos_ratio,
            y:canvas.height/2 + (point.y)/CONFIG.zoom * side
    };
};


var convexHull = function(ctx, points, type){
    // calculate max and min x and y
    var minX = points[0].x;
    var maxX = points[0].x;
    var minY = points[0].y;
    var maxY = points[0].y;

    for (var i = 1; i < points.length; i++) {
        if (points[i].x < minX) minX = points[i].x;
        if (points[i].x > maxX) maxX = points[i].x;
        if (points[i].y < minY) minY = points[i].y;
        if (points[i].y > maxY) maxY = points[i].y;
    }


    // choose a "central" point
    var center = {
        x: minX + (maxX - minX) / 2,
        y: minY + (maxY - minY) / 2
    };

    // precalculate the angles of each point to avoid multiple calculations on sort
    for (var i = 0; i < points.length; i++) {
        points[i].angle = Math.acos((points[i].x - center.x) / lineDistance(center, points[i]));

        if (points[i].y > center.y) {
            points[i].angle = Math.PI + Math.PI - points[i].angle;
        }
    }

    // sort by angle
    points = points.sort(function(a, b) {
        return a.angle - b.angle;
    });

    // Draw shape
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (var i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.closePath();
    if (type !== "#"){
        ctx.fill();
        ctx.stroke();
    }
    ctx.stroke();
};

function lineDistance(point1, point2) {
    var xs = 0;
    var ys = 0;

    xs = point2.x - point1.x;
    xs = xs * xs;

    ys = point2.y - point1.y;
    ys = ys * ys;

    return Math.sqrt(xs + ys);
}

var cross = function(v1, v2){
    return {x:v1.y*v2.z - v1.z*v2.y,
            y:v1.z*v2.x - v1.x*v2.z,
            z:v1.x*v2.y - v1.y*v2.x
    };
};

var TEST = {};
TEST.tries = 0;