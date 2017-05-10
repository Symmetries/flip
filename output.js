var APP = APP || {};


var mapCrossSection = function(map, x, y, angle){
    var res = [];
    for (var i = 0; i < map.length; i++){
        for (var j = 0; j < map[i].length; j++){
            var points = squareCrossSection(i, j, x, y, angle);
            if (points.length > 1){
                res.push({type:map[i][j], points:points});
            }
        }
    }
    return res;
};

var squareCrossSection = function(i, j, x, y, angle){
    var res = [];
    var l;
    if (Math.sin(angle) !== 0){
        l = lineIntersection(i, j, i + 1, j, x, y, angle);
        if (x + l * Math.cos(angle) < i + 1 && x + l * Math.cos(angle) > i){
            res.push(l/3);
        }
        l = lineIntersection(i, j + 1, i+ 1, j + 1, x, y, angle);
        if (x + l * Math.cos(angle) < i + 1 && x + l * Math.cos(angle) > i){
            res.push(l/3);
        }
    } if (Math.cos(angle) !== 0){
        l = lineIntersection(i, j, i, j+1, x, y, angle);
        if (y + l * Math.sin(angle) < j + 1 && y + l * Math.sin(angle) > j){
            res.push(l/3);
        }
        l = lineIntersection(i+1, j, i + 1, j +1, x, y, angle);
        if (y + l * Math.sin(angle) < j + 1 && y + l * Math.sin(angle) > j){
            res.push(l/3);
        }
    }
    return res;
};

var lineIntersection = function(x1, y1, x2, y2, x, y, angle){
    //t = l sin(θ) + y0 - y1 and cos(θ) = sin(θ) and x0 = x1 + y0 - y1\
    if (x1 === x2){
        return (x1 - x)/Math.cos(angle);
    } else {
        return (y1 - y)/Math.sin(angle);
    }
};

var ccw = function(A, B, C){
    return (C.y-A.y) * (B.x-A.x) > (B.y-A.y) * (C.x-A.x);
};

var isIntersection = function(A, B, C, D){
    return ccw(A,C,D) != ccw(B,C,D) && ccw(A,B,C) != ccw(A,B,D);
};

var drawFigure = function(square, ctx){
    var colour;
    if (square.type === "#"){
        colour = "black";
    } else if (square.type === "="){
        colour = "green";
    } else if (square.type === "." ){
        colour = "white";
    } else {
        colour = "grey";
    }
    ctx.fillStyle = colour;
    ctx.strokeStyle = colour;
    ctx.beginPath();
    var width = ctx.canvas.width;
    ctx.rect((square.points[0] + 1.5)/3 * width,
             0,
             (square.points[1]- square.points[0])/3 * width,
             ctx.canvas.height);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
};

var drawCircle = function(ctx){
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.ellipse(ctx.canvas.width/2, ctx.canvas.height/2, 10, 10, 0, 0, 2 * Math.PI);
    ctx.fill();
};

var drawBackground = function(ctx){
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fill();
};

var drawForeground = function(ctx){
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height/3);
    ctx.fill();
    ctx.beginPath();
    ctx.rect(0, ctx.canvas.height*2/3, ctx.canvas.width, ctx.canvas.height/3);
    ctx.fill();
};

APP.output = function(state, ctx){
    drawBackground(ctx);
    var squares = mapCrossSection(state.maps[state.level],
                                  state.x,
                                  state.y,
                                  state.angle);
    for (var i = 0; i < squares.length; i++){
        drawFigure(squares[i], ctx);
    }
    drawForeground(ctx);
    drawCircle(ctx);
    ctx.font = "50px Arial";
    ctx.fillStyle = "Blue";
    ctx.textAlign = "left";
    ctx.fillText(String(state.level + 1), 50, 50); 
    console.log("number of squares:");
    console.log(squares.length);
};