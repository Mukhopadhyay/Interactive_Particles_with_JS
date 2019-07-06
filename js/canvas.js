let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');

console.log("Hello!");

let w = window.innerWidth;
let h = window.innerHeight;
let size = 800;

canvas.width = w;
canvas.height = h;

let mouse = {
    x: undefined,
    y: undefined
}

let maxRadius = 35;
let minRadius = Math.random() * 4 + 1;
let distance = 100;

let colorArray = ["#BAF2E8", "#218DA6",
                    "#FEB2AD", "#F56358"];

console.log(colorArray);

window.addEventListener('mousemove',
        function(event) {
            mouse.x = event.x;
            mouse.y = event.y;
        });

function Circle(x,y,r,dx,dy) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = dx;
    this.dy = dy;
    
    let index = Math.random() * colorArray.length + 1;
    let i = parseInt(index);
    console.log(i);

    this.draw = function() {
        c.beginPath();
        c.arc(this.x,this.y,this.r,0,Math.PI*2,false);
        c.strokeStyle=colorArray[i];
        c.stroke();
        c.fillStyle = colorArray[i];
        c.fill();
    }
    this.update = function() {
        if(this.x + this.r > w || this.x - this.r < 0) {
            this.dx = -this.dx;
        }
        if(this.y + this.r > h || this.y - this.r < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        if(mouse.x - this.x < distance && mouse.x - this.x > -distance
            && mouse.y - this.y < distance && mouse.y - this.y > -distance) {
            if(this.r < maxRadius) {
                this.r += 1;
            }
        }
        else if(this.r > minRadius) {
            this.r -= 1;
        }

        this.draw();
    }
}

let circleArray = [];

for(let i=0;i<size;i++) {
    let r = Math.random() * 5 + 10;
    let x = Math.random() * (w - r * 2) + r;
    let y = Math.random() * (h - r * 2) + r;
    let dx = Math.random() * 1 + 1;
    let dy = Math.random() * 1 + 1;

    let tossX = Math.random();
    let tossY = Math.random();

    if(tossX <.5) {
        dx = -dx;
    }
    if(tossY <.5) {
        dy = -dy;
    }

    circleArray.push(new Circle(x,y,r,dx,dy));
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,w,h);

    for(let i=0;i<size;i++) {
        circleArray[i].update();
    }
}

animate();