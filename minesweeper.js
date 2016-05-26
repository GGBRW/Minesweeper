var ctx = canvas.getContext("2d");

document.body.style.margin = 0;

var field_size = 16;
var cell_size = canvas.width / field_size;

var minefield = new Array;
for(var x = 0; x < field_size; ++x) {
    minefield[x] = new Array;
    for(var i = 0; i < field_size; ++i)
        minefield[x].push({status: 0, covered: false});
}

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

function update() {
    for(var x = 0, len = minefield.length; x < len; ++x) 
        for(var y = 0, len = minefield[x].length; y < len; ++y) {
            if(minefield[x][y].covered)
                rect(x * cell_size + 1,y * cell_size + 1,cell_size - 1,cell_size - 1,"lightgray");
            else {
                switch(minefield[x][y].status) {
                    case -1: 
                        rect(x * cell_size + 1, y * cell_size + 1,cell_size - 1,cell_size - 1,"darkred");
                        break;
                    case 0:
                        rect(x * cell_size + 1, y * cell_size + 1,cell_size - 1,cell_size - 1,"white");
                        break;
                    case 1:
                        rect(x * cell_size + 1, y * cell_size + 1,cell_size - 1,cell_size - 1,"white");
                        ctx.fillStyle = "blue";
                        ctx.font = cell_size + "px Arial";
                        ctx.fillText("1",x * cell_size + cell_size / 4,y * cell_size + cell_size - 2);
                        break;
                    case 2: 
                        rect(x * cell_size + 1, y * cell_size + 1,cell_size - 1,cell_size - 1,"white");
                        ctx.fillStyle = "green";
                        ctx.font = cell_size + "px Arial";
                        ctx.fillText("2",x * cell_size + cell_size / 4,y * cell_size + cell_size - 2);
                        break;
                    case 3: 
                        rect(x * cell_size + 1, y * cell_size + 1,cell_size - 1,cell_size - 1,"white");
                        ctx.fillStyle = "red";
                        ctx.font = cell_size + "px Arial";
                        ctx.fillText("3",x * cell_size + cell_size / 4,y * cell_size + cell_size - 2);
                        break;
                    case 4: 
                        rect(x * cell_size + 1, y * cell_size + 1,cell_size - 1,cell_size - 1,"white");
                        ctx.fillStyle = "darkblue";
                        ctx.font = cell_size + "px Arial";
                        ctx.fillText("4",x * cell_size + cell_size / 4,y * cell_size + cell_size - 2);
                        break;
                    case 5:
                        rect(x * cell_size + 1, y * cell_size + 1,cell_size - 1,cell_size - 1,"white");
                        ctx.fillStyle = "darkred";
                        ctx.font = cell_size + "px Arial";
                        ctx.fillText("5",x * cell_size + cell_size / 4,y * cell_size + cell_size - 2);
                        break;
                    case 6: 
                        rect(x * cell_size + 1, y * cell_size + 1,cell_size - 1,cell_size - 1,"white");
                        ctx.fillStyle = "darkgreen";
                        ctx.font = cell_size + "px Arial";
                        ctx.fillText("6",x * cell_size + cell_size / 4,y * cell_size + cell_size - 2);
                        break;
                    case 7: 
                        rect(x * cell_size + 1, y * cell_size + 1,cell_size - 1,cell_size - 1,"white");
                        ctx.fillStyle = "purple";
                        ctx.font = cell_size + "px Arial";
                        ctx.fillText("7",x * cell_size + cell_size / 4,y * cell_size + cell_size - 2);
                        break;
                    case 8: 
                        rect(x * cell_size + 1, y * cell_size + 1,cell_size - 1,cell_size - 1,"white");
                        ctx.fillStyle = "yellow";
                        ctx.font = cell_size + "px Arial";
                        ctx.fillText("8",x * cell_size + cell_size / 4,y * cell_size + cell_size - 2);
                        break;
                }
            }
        }
    for(var x = 0, len = canvas.width; x < len; x += cell_size)
        line(x,0,x + 1,canvas.height,"gray");
    
    for(var y = 0, len = canvas.height; y < len; y += cell_size)
        line(0,y,canvas.width,y + 1,"gray");
}

update();

var timer = 0;
canvas.addEventListener("mousedown", function(e) {
    var x = Math.floor(e.x / cell_size),
        y = Math.floor(e.y / cell_size);
    
    if(!timer) {
        do {
            for(var i = 0; i < 8; --i) {
                var x = Math.round(Math.random() * 15),
                    y = Math.round(Math.random() * 15);
            minefield[x][y].status = -1;

            for(var r = 0, len = Math.PI * 2; r < len; r += Math.PI / 4) 
                if(x + Math.round(Math.sin(r)) >= 0 && x + Math.round(Math.sin(r)) < 16
                && y + Math.round(Math.cos(r)) >= 0 && y + Math.round(Math.cos(r)) < 16)
                    if(minefield[x + Math.round(Math.sin(r))][y + Math.round(Math.cos(r))].status > -1)
                        ++minefield[x + Math.round(Math.sin(r))][y + Math.round(Math.cos(r))].status;
            }
        } while(minefield[x][y].status == 0)
    }
    
    minefield[x][y].covered = false;
    update();
});
