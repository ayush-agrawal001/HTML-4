// Select the canvas element from the DOM
var canvas = document.querySelector('canvas');

// Set canvas dimensions to match the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Adjust canvas dimensions on window resize
window.addEventListener('resize' , function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

// Get 2D rendering context
var c = canvas.getContext('2d');

// Define mouse object to track its position
var mouse = {
    x : undefined,
    y : undefined
}

// Define maximum radius for circles
var maxRadius = 40;

// Event listener to track mouse movement
window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})

// Array of colors for circles
var colorArray = [
    "#191970", // Midnight Blue
    "#4B0082", // Indigo
    "#F0F8FF", // Celestial White
    "#6A5ACD", // Cosmic Violet
    "#C0C0C0", // Stellar Silver
    "#FFD700"  // Galactic Gold
]

// Circle constructor function
function Circle(x, y, dx, dy, radius){
    this.x = x;
    this.y = y;
    this.dx = dx; 
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    
    // Randomly select color for each circle
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)]

    // Method to draw the circle
    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();        
    }

    // Method to update circle's position and size
    this.update = function(){
        // Bounce off the walls
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy
        }
            
        this.x += this.dx;
        this.y += this.dy;
        
        // Interaction with mouse
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
             mouse.y - this.y < 50 && mouse.y - this.y > -50){
                if (this.radius < maxRadius) {
                    this.radius += 1
                }
             }
        else if (this.radius > this.minRadius) {
            this.radius -= 1
        }

        this.draw();
    }
}

// Array to store multiple circles
var circleArray = [];
for (let i = 0; i < 1000; i++) {
    // Randomize initial position, velocity, and radius for each circle
    var x = Math.random() * (innerWidth - 2*maxRadius) + maxRadius ;
    var dx = (Math.random()- 0.5) * 2 ;
    var y = Math.random() * (innerHeight - 2*maxRadius) + maxRadius ;
    var dy = (Math.random() - 0.5) * 2 ;
    var radius = Math.random() * 3 + 1 ;
    // Add new circle to the array
    circleArray.push(new Circle(x,y,dx,dy,radius));
}

// Animation function to continuously update and render circles
function animateCircles(){
    requestAnimationFrame(animateCircles);
    c.clearRect(0,0,innerWidth,innerHeight);
    
    for (let i = 0; i < circleArray.length ; i++) {
        circleArray[i].update();
    }
}

// Start animation
animateCircles();
