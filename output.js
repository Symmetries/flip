var APP = APP || {};


var mapCrossSection = function(map, x, y, z, u, v){
    var res = [];
    for (var i = 0; i < map.length; i++){
        for (var j = 0; j < map[i].length; j++){
            for (var k = 0; k < map[i][j].length; k++){
                var points = squareCrossSection(i, j, k, x, y, z, u, v);
                if (points.length > 2){
                    res.push({type:map[i][j][k], points:points});
                }
            }
        }
    }
    return res;
};

var squareCrossSection = function(i, j, k, x, y, z, u, v){
    var res = [];
    var point;
    if(u.z * v.y - u.y * v.z !== 0){
        point = lineIntersection(i, j, k, i + 1, j, k, x, y, z, u, v);
        if (x + point.x * u.x + point.y * v.x <= i + 1 && 
            x + point.x * u.x + point.y * v.x >= i){
            res.push(point);
        }
        point = lineIntersection(i, j + 1, k, i + 1, j + 1, k, x, y, z, u, v);
        if (x + point.x * u.x + point.y * v.x <= i + 1 && 
            x + point.x * u.x + point.y * v.x >= i){
            res.push(point);
        }
        point = lineIntersection(i, j+1, k+1, i + 1, j+1, k+1, x, y, z, u, v);
        if (x + point.x * u.x + point.y * v.x <= i + 1 && 
            x + point.x * u.x + point.y * v.x >= i){
            res.push(point);
        }
        point = lineIntersection(i, j, k + 1, i + 1, j, k + 1, x, y, z, u, v);
        if (x + point.x * u.x + point.y * v.x <= i + 1 && 
            x + point.x * u.x + point.y * v.x >= i){
            res.push(point);
        }
    }
    if(u.z * v.x - u.x * v.z !== 0){
        point = lineIntersection(i, j, k, i, j+1, k, x, y, z, u, v);
        if (y + point.x * u.y + point.y * v.y <= j + 1 && 
            y + point.x * u.y + point.y * v.y >= j){
            res.push(point);
        }
        point = lineIntersection(i+1, j, k, i + 1, j + 1, k, x, y, z, u, v);
        if (y + point.x * u.y + point.y * v.y <= j + 1 && 
            y + point.x * u.y + point.y * v.y >= j){
            res.push(point);
        }
        point = lineIntersection(i+1, j, k+1, i+1, j+1, k+1, x, y, z, u, v);
        if (y + point.x * u.y + point.y * v.y <= j + 1 && 
            y + point.x * u.y + point.y * v.y >= j){
            res.push(point);
        }
        point = lineIntersection(i, j, k+1, i, j+1, k+1, x, y, z, u, v);
        if (y + point.x * u.y + point.y * v.y <= j + 1 && 
            y + point.x * u.y + point.y * v.y >= j){
            res.push(point);
        }
    }
    if(u.y * v.x - u.x * v.y !== 0){
        point = lineIntersection(i, j, k, i, j, k+1, x, y, z, u, v);
        if (z + point.x * u.z + point.y * v.z <= k + 1 && 
            z + point.x * u.z + point.y * v.z >= k){
            res.push(point);
        }
        point = lineIntersection(i+1, j, k, i + 1, j, k+1, x, y, z, u, v);
        if (z + point.x * u.z + point.y * v.z <= k + 1 && 
            z + point.x * u.z + point.y * v.z >= k){
            res.push(point);
        }
        point = lineIntersection(i+1, j+1, k, i+1, j+1, k+1, x, y, z, u, v);
        if (z + point.x * u.z + point.y * v.z <= k + 1 && 
            z + point.x * u.z + point.y * v.z >= k){
            res.push(point);
        }
        point = lineIntersection(i, j+1, k, i, j+1, k+1, x, y, z, u, v);
        if (z + point.x * u.z + point.y * v.z <= k + 1 && 
            z + point.x * u.z + point.y * v.z >= k){
            res.push(point);
        }
    }
    return res;
};

var lineIntersection = function(x1, y1, z1, x2, y2, z2, x0, y0, z0, u, v){
    //t = l sin(θ) + y0 - y1 and cos(θ) = sin(θ) and x0 = x1 + y0 - y1\
    if (x1 !== x2){
        return {
            x:-(v.y * z0 - v.y * z1 - v.z * y0 + v.z * y1)/(u.z * v.y - u.y * v.z),
            y:-(-u.y * z0 + u.y * z1 + u.z * y0 - u.z * y1)/(u.z * v.y - u.y * v.z)
        };
    } else if (y1 !== y2){
        return {
            x:-(v.x * z0 - v.x * z1 - v.z * x0 + v.z * x1)/(u.z * v.x - u.x * v.z),
            y:-(-u.x * z0 + u.x * z1 + u.z * x0 - u.z * x1)/(u.z * v.x - u.x * v.z)
        };
    } else if (z1 !== z2) {
        return {
            x:-(v.x * y0 - v.x * y1 - v.y * x0 + v.y * x1)/(u.y * v.x - u.x * v.y),
            y:-(u.x * y0 - u.x * y1 - u.y * x0 + u.y * x1)/(u.x * v.y - u.y * v.x)
        };
    } else {
        console.log("nope"); 
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
        colour = "#ffe4c4";
    } else if (square.type === "@" ){
        colour = "grey";
    }
    ctx.fillStyle = colour;
    ctx.strokeStyle = "blue";
    
    var gap;
    var side;
    //console.log(square.points);
    if (ctx.canvas.width > ctx.canvas.height){
        gap = ctx.canvas.height/10;
        side = ctx.canvas.height - 2 * gap;
    } else {
        gap = ctx.canvas.width/10;
        side = ctx.canvas.width - 2 * gap;
    }
    
    if (square.type !== "#"){
        
        var points = [];
        for (var i = 0; i < square.points.length; i++){
            points.push({
                x:ctx.canvas.width/2 + (square.points[i].x)/15 * side,
                y:ctx.canvas.height/2 + (square.points[i].y)/15 * side
            });
        }
        convexHull(ctx, points);
        // ctx.fillStyle = "black";
        // ctx.beginPath();
        // ctx.rect(ctx.canvas.width/2 - side/2, gap, side, side);
        // ctx.fill();
        // ctx.beginPath();
        // //
        //console.log(square.points.length);
        // ctx.beginPath();
        // ctx.moveTo(ctx.canvas.width/2 + (square.points[0].x)/10 * side, gap + side/2 + side * (square.points[0].y)/10);
        // for (var i = 1; i < square.points.length; i++){
        //     ctx.lineTo(ctx.canvas.width/2 + (square.points[i].x)/10 * side, gap + side/2 + side * (square.points[i].y)/10);
        // }
        // ctx.closePath();
        // ctx.stroke();
        // ctx.fill();
        // ctx.rect(ctx.canvas.width/2 - side/2 + (square.points[0] + 1.5)/3 * side,
        //          gap + side/2 - side/18,
        //          (square.points[1]- square.points[0])/3 * side,
        //          (1)/9 * side);
        // ctx.closePath();
        // ctx.stroke();
        // ctx.fill();
        // var c2 = canvas.getContext('2d');
        // c2.fillStyle = '#f00';
        // c2.beginPath();
        // c2.moveTo(0, 0);
        // c2.lineTo(100,50);
        // c2.lineTo(50, 100);
        // c2.lineTo(0, 90);
        // c2.closePath();
        // c2.fill();
    } else{
        // gap = ctx.canvas.width/10;
        // side = ctx.canvas.width - 2 * gap;
        // ctx.beginPath();
        // ctx.rect(gap, ctx.canvas.height/2 - side/2, side, side);
        // ctx.fill();
    }
    // ctx.beginPath();
    // var width = ctx.canvas.width;
    // ctx.rect((square.points[0] + 1.5)/3 * width,
    //          0,
    //          (square.points[1]- square.points[0])/3 * width,
    //          ctx.canvas.height);
    // ctx.closePath();
    // ctx.stroke();
    // ctx.fill();
};

var drawCircle = function(ctx){
    var r = Math.round(Math.min(ctx.canvas.width, ctx.canvas.height)/200);
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.ellipse(ctx.canvas.width/2, ctx.canvas.height/2, r, r, 0, 0, 2 * Math.PI);
    ctx.fill();
};

var drawBackground = function(ctx){
    ctx.fillStyle = "#ffe4c4";
    ctx.beginPath();
    ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fill();
};

var drawForeground = function(ctx){
    var gap;
    var side;
    if (ctx.canvas.width > ctx.canvas.height){
        gap = ctx.canvas.height/10;
        side = ctx.canvas.height - 2 * gap;
        ctx.fillStyle = "#ffe4c4";
        ctx.beginPath();
        ctx.rect(0, 0, ctx.canvas.width, gap);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.rect(0, ctx.canvas.height - gap, ctx.canvas.width, gap);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.rect(0, 0, ctx.canvas.width/2 - side/2, ctx.canvas.height);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.rect(ctx.canvas.width/2 + side/2,
                 0,
                 ctx.canvas.width/2 - side/2,
                 ctx.canvas.height);
        ctx.closePath();
        ctx.fill();
    } else {
        
    }
};

var drawPlane = function(ctx){
    var gap;
    var side;
    ctx.fillStyle = "black";
    if (ctx.canvas.width > ctx.canvas.height){
        gap = ctx.canvas.height/10;
        side = ctx.canvas.height - 2 * gap;
        
        
        ctx.beginPath();
        ctx.rect(ctx.canvas.width/2 - side/2, gap, side, side);
        ctx.closePath();
        ctx.fill();
    } else{
        gap = ctx.canvas.width/10;
        side = ctx.canvas.width - 2 * gap;
        ctx.beginPath();
        ctx.rect(gap, ctx.canvas.height/2 - side/2, side, side);
        ctx.fill();
    }
};



var convexHull = function(ctx, points){
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

    ctx.lineTo(points[0].x, points[0].y);

    ctx.stroke();
    ctx.fill();
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

APP.output = function(state, ctx){
    drawBackground(ctx);
    var squares = mapCrossSection(state.maps[state.level-1],
                                  state.x,
                                  state.y,
                                  state.z,
                                  state.u,
                                  state.v);
    drawPlane(ctx);
    //console.log(squares.length);
    for (var i = 0; i < squares.length; i++){
        drawFigure(squares[i], ctx);
    }
    
    
    drawForeground(ctx);
    drawCircle(ctx);
    ctx.font = "50px Arial";
    ctx.fillStyle = "Blue";
    ctx.textAlign = "left";
    ctx.fillText(String(state.level), 50, 50); 
};