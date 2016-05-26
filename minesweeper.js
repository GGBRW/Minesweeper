var ctx = canvas.getContext("2d");

document.body.style.margin = 0;

var field = {
    size_h: 9,
    size_v: 9,
    cell_size: 0,
    mines: 10
} 
field.cell_size = canvas.height > canvas.width ? canvas.height / field.size_v : canvas.width / field.size_h;

function line(x,y,x2,y2,color) {
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x2,y2);
    if(typeof color != "undefined")
        ctx.strokeStyle = color;
    ctx.stroke();
}

function rect(x,y,width,height,color) {
    if(typeof color != "undefined")
        ctx.fillStyle = color;
    ctx.fillRect(x,y,width,height);
}

var minefield = new Array;
function createField() {
    minefield = [];
    for(var x = 0; x < field.size_h; ++x) {
        minefield[x] = [];
        for(var y = 0; y < field.size_v; ++y)
            minefield[x].push({status: 0, covered: true});
    }
    
    for(var i = 0; i < field.mines; ++i) {
        var x = Math.round(Math.random() * (field.size_h - 1)),
            y = Math.round(Math.random() * (field.size_v - 1));
        minefield[x][y].status = -1;
    
    for(var r = 0, len = Math.PI * 2; r < len; r += Math.PI / 4) 
        if(x + Math.round(Math.sin(r)) >= 0 && x + Math.round(Math.sin(r)) < field.size_h
        && y + Math.round(Math.cos(r)) >= 0 && y + Math.round(Math.cos(r)) < field.size_v)
            if(minefield[x + Math.round(Math.sin(r))][y + Math.round(Math.cos(r))].status > -1)
                ++minefield[x + Math.round(Math.sin(r))][y + Math.round(Math.cos(r))].status;
    }
}

ctx.font = field.cell_size - 20 + "px Segoe UI";

function update() {
    for(var x = 0, len = minefield.length; x < len; ++x) 
        for(var y = 0, len = minefield[x].length; y < len; ++y) {
            if(minefield[x][y].covered)
                rect(x * field.cell_size + 1,y * field.cell_size + 1,field.cell_size - 1,field.cell_size - 1,"lightgray");
            else 
                switch(minefield[x][y].status) {
                    case -1: 
                        rect(x * field.cell_size + 1, y * field.cell_size + 1,field.cell_size - 1,field.cell_size - 1,"darkred");
                        break;
                    case 0:
                        rect(x * field.cell_size + 1, y * field.cell_size + 1,field.cell_size - 1,field.cell_size - 1,"white");
                        break;
                    case 1:
                        rect(x * field.cell_size + 1, y * field.cell_size + 1,field.cell_size - 1,field.cell_size - 1,"white");
                        ctx.fillStyle = "blue";
                        ctx.fillText("1",x * field.cell_size + field.cell_size / 3,y * field.cell_size + field.cell_size * .75);
                        break;
                    case 2: 
                        rect(x * field.cell_size + 1, y * field.cell_size + 1,field.cell_size - 1,field.cell_size - 1,"white");
                        ctx.fillStyle = "green";
                        ctx.fillText("2",x * field.cell_size +field.cell_size / 3,y * field.cell_size + field.cell_size * .75);
                        break;
                    case 3: 
                        rect(x * field.cell_size + 1, y * field.cell_size + 1,field.cell_size - 1,field.cell_size - 1,"white");
                        ctx.fillStyle = "red";
                        ctx.fillText("3",x * field.cell_size +field.cell_size / 3,y * field.cell_size +field.cell_size * .75);
                        break;
                    case 4: 
                        rect(x * field.cell_size + 1, y * field.cell_size + 1,field.cell_size - 1,field.cell_size - 1,"white");
                        ctx.fillStyle = "darkblue";
                        ctx.fillText("4",x * field.cell_size +field.cell_size / 3,y * field.cell_size +field.cell_size * .75);
                        break;
                    case 5:
                        rect(x * field.cell_size + 1, y * field.cell_size + 1,field.cell_size - 1,field.cell_size - 1,"white");
                        ctx.fillStyle = "darkred";
                        ctx.fillText("5",x * field.cell_size +field.cell_size / 3,y * field.cell_size +field.cell_size * .75);
                        break;
                    case 6: 
                        rect(x * field.cell_size + 1, y * field.cell_size + 1,field.cell_size - 1,field.cell_size - 1,"white");
                        ctx.fillStyle = "darkgreen";
                        ctx.fillText("6",x * field.cell_size +field.cell_size / 3,y * field.cell_size +field.cell_size * .75);
                        break;
                    case 7: 
                        rect(x * field.cell_size + 1, y * field.cell_size + 1,field.cell_size - 1,field.cell_size - 1,"white");
                        ctx.fillStyle = "purple";
                        ctx.fillText("7",x * field.cell_size +field.cell_size / 3,y * field.cell_size +field.cell_size * .75);
                        break;
                    case 8: 
                        rect(x * field.cell_size + 1, y * field.cell_size + 1,field.cell_size - 1,field.cell_size - 1,"white");
                        ctx.fillStyle = "yellow";
                        ctx.fillText("8",x * field.cell_size +field.cell_size / 3,y * field.cell_size +field.cell_size * .75);
                        break;
                }
        }
    for(var x = 0, len = canvas.width; x < len; x +=field.cell_size)
        line(x,0,x + 1,canvas.height,"lightgray");
    
    for(var y = 0, len = canvas.height; y < len; y +=field.cell_size)
        line(0,y,canvas.width,y + 1,"lightgray");
}

update();

var timer = 0;
document.onmousedown = function(e) {
    var x = Math.floor(e.x / field.cell_size),
        y = Math.floor(e.y / field.cell_size);
    
    if(timer == 0) {
        do {
            createField();
        } while(minefield[x][y].status != 0);
        timer = 1;
    }
        
    minefield[x][y].covered = false;
    
    if(minefield[x][y].status == 0) {
        var cells = [{x: x, y: y}];
        while(cells.length != 0) {
            for(var i = cells.length - 1; i >= 0; --i) {
                cell: for(var r = 0, len = Math.PI * 2; r < len; r += Math.PI / 4) {
                    if(cells[i].x + Math.round(Math.sin(r)) >= 0 && cells[i].x + Math.round(Math.sin(r)) < field.size_h
                    && cells[i].y + Math.round(Math.cos(r)) >= 0 && cells[i].y + Math.round(Math.cos(r)) < field.size_v) {
                        if(!minefield[cells[i].x + Math.round(Math.sin(r))][cells[i].y + Math.round(Math.cos(r))].covered)
                            continue cell;

                        if(minefield[cells[i].x + Math.round(Math.sin(r))][cells[i].y + Math.round(Math.cos(r))].status == 0) {
                            minefield[cells[i].x + Math.round(Math.sin(r))][cells[i].y + Math.round(Math.cos(r))].covered = false;
                            cells.push({
                                x: cells[i].x + Math.round(Math.sin(r)),
                                y: cells[i].y + Math.round(Math.cos(r))
                            });
                        } else if(minefield[cells[i].x + Math.round(Math.sin(r))][cells[i].y + Math.round(Math.cos(r))].status > 0) 
                            minefield[cells[i].x + Math.round(Math.sin(r))][cells[i].y + Math.round(Math.cos(r))].covered = false;
                    }
                }
                cells.splice(i,1);
            }
        }
    }
    
    update();
    
    var gameover = false, won = true;
    for(var x = 0; x < field.size_h; ++x)
        for(var y = 0; y < field.size_v; ++y) {
            if(minefield[x][y].status != -1 && minefield[x][y].covered)
                won = false;
            else if(minefield[x][y].status == -1 && !minefield[x][y].covered)
                gameover = true;
        }
    
    if(won)
        alert("Je hebt gewonnen!");
    else if(gameover)
        alert("Game over!");
}