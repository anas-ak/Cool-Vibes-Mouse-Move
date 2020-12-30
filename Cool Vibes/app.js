/* Code ported from Nathan Taylor - https://codepen.io/nathantaylor/pen/vvdMGQ?editors=1010 */

var mouse = {
    x: 0,
    y: 0,
}

var motions = [];
for (var i = 0; i < 8; i++){
    motions[i] = {
        xOffset: 0,
        yOffset: 0,
        xVel: 0,
        yVel: 0,
    }
}

var shdws;
var amnt = 150;
var damp = 0.66;
var lag = 50;
var stretch = 12;

var mousefound = false;


function init(){
    document.addEventListener('mousemove', function(e){
        mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
        mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
        mousefound = true;
    })
    var shdw1 = document.getElementById('shdw-1');
    var shdw2 = document.getElementById('shdw-2');
    var shdw3 = document.getElementById('shdw-3');
    var shdw4 = document.getElementById('shdw-4');
    var shdw5 = document.getElementById('shdw-5');
    var shdw6 = document.getElementById('shdw-6');
    var shdw7 = document.getElementById('shdw-7');
    shdws = [shdw1, shdw2, shdw3, shdw4, shdw5, shdw6, shdw7];
    animate();
}

document.addEventListener('mouseout', function(e){
    mousefound = false;
    animate();
})

function animate(){
    if (!mousefound){
        mouse.y = Math.sin(Date.now()/300)/2;
        mouse.x = 0;
    }

    shdws.forEach(function(svg, i){
        
        var motion = motions[i];
        var ii = 6 - (7 - i);

        // Calculate position

        var xDiff = mouse.x - motion.xOffset;
        var yDiff = mouse.y - motion.yOffset;

        motion.xVel += xDiff/(lag + ii*stretch);
        motion.yVel += yDiff/(lag + ii*stretch);

        motion.xVel *= damp + ii/220;
        motion.yVel *= damp + ii/220;

        motion.xOffset += motion.xVel;
        motion.yOffset += motion.yVel;

        // Apply transformation

        var tX = "translateX("+(motion.xOffset * amnt - 50 - ii*xDiff*3)+"%) ";
        var tY = "translateY("+(motion.yOffset * amnt - 50 - ii*yDiff*3)+"%) ";

        svg.style.transform = tX + tY;
    })

    requestAnimationFrame(animate);
}

init();