var APP = APP || {};

// All coordinates of the form (x, y) follow the usual cartesian coordinates
// on a computer (y points downwards, x points right)
// All matrices A[x][y] follow the cartesian coordinates, so
// [[1, 2, 3], [4, 5, 6]] shows up as
// 1 4
// 2 5
// 3 6
// on the user's screen.

APP.Game = class{
    // xs and ys (same size) are the initial positions of the cybercycles
    // dir is an array of the initial directions of the cybercycles, default is
    // up.
    // windowWidth and windowHeight describe the dimensions of the game board
    constructor(xs, ys, dir, boardWidth, boardHeight){
        this.xs = xs;
        this.ys = ys;
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.board = new Array(boardWidth);
        
        
        var column;
        for (var x = 0; x < boardWidth; x++){
            column = new Array(boardHeight);
            var isOccupied;
            for (var y = 0; y < boardHeight; y++){
                isOccupied = false;
                for (var i = 0; i < xs.length; i++){
                    if (xs[i] == x && ys[i] == y || x === 0 ||
                        y === 0 || x === boardWidth -1 ||
                        y === boardHeight - 1){
                        isOccupied = true;
                    }
                }
                column[y] = isOccupied;
            }
            this.board[x] = column;
        }
        this.prev = [];
        this.statuses = [];
        for (var i = 0; i < dir.length; i++){
            var vx = 0;
            var vy = 0;
            if (dir[i] == "u"){
                vy = -1;
            } else if (dir[i] == "d"){
                vy = 1;
            } else if (dir[i] == "l"){
                vx = -1;
            } else if (dir[i] == "r"){
                vx = 1;
            } else {
                vx = -1;
                vy = 0;
            }
            this.prev.push([vx, vy]);   
            this.statuses.push(true);
        }
    }
    getPrev(player){
        if (this.prev[player][1] === -1){
            return "u";
        } else if (this.prev[player][1] === 1){
            return "d";
        } else if (this.prev[player][0] === -1){
            return "l";
        }
        return "r";
    }
    // moves contains all the previous moves
    // it is an array of strings being either "u", "d", "l" or "r",
    // depending on the direction of the cybercycles
    update(moves){
        for (var i = 0; i < moves.length; i++){
            if(this.statuses[i]){
                var vx = 0;
                var vy = 0;
                if (moves[i] == "u"){
                    vy = -1;
                } else if (moves[i] == "d"){
                    vy = 1;
                } else if (moves[i] == "l"){
                    vx = -1;
                } else if (moves[i] == "r"){
                    vx = 1;
                } else {
                    vx = this.prev[i][0];
                    vy = this.prev[i][1];
                }
                
                if (this.board[this.xs[i] + vx][this.ys[i] + vy]) {
                    this.statuses[i] = false;
                    this.xs[i] += vx;
                    this.ys[i] += vy;
                    console.log("dead");
                } else {
                    this.xs[i] += vx;
                    this.ys[i] += vy;
                    this.board[this.xs[i]][this.ys[i]] = true;
                    this.prev[i] = [vx, vy];
                }
            }
        }
        for (var i = 0; i < moves.length; i++){
            for (var j = i + 1; j < moves.length; j++){
                if (this.xs[i] === this.xs[j] && this.ys[i] === this.ys[j]){
                    this.statuses[i] = false;
                }
            }
        }
        for (var i = 0; i < this.statuses.length; i++){
            if (!this.statuses[i]){
                this.xs[i] = -1;
                this.ys[i] = -1;
            }
        }
    }
    isOver(){
        var res = true;
        for (var i = 0; i < this.statuses.length; i++){
            if (this.statuses[i]){
                res = false;
            }
        }
        return res;
    }
};