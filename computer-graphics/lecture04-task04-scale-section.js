function scaleSectionClicked() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    
    const canvasWidth = 2000;
    const canvasHeight = 2000;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    // drawMesh();

    const canvasScaleFactor = 10;

    const x0 = parseInt(document.getElementById('x0').value);
    const x1 = parseInt(document.getElementById('x1').value);
    const y0 = parseInt(document.getElementById('y0').value);
    const y1 = parseInt(document.getElementById('y1').value);
    const k = parseInt(document.getElementById('k').value);

    drawLine (x0, x1, y0, y1, '#000000');
    
    setInterval ( function() {
        let x1scaled = x1 * k;
        let y1scaled = y1 * k;
        drawLine (x0, x1scaled, y0, y1scaled, '#FF0000');
    }, 3000);

    // the canvas is scaled -> 1 pixel is actually rectangle 10 x 10 pixels
    function drawPixel (ctx, xCoordinate, yCoordinate, canvasScaleFactor) {
        ctx.fillRect(xCoordinate * canvasScaleFactor, yCoordinate * canvasScaleFactor, canvasScaleFactor, canvasScaleFactor);
    }

    // works only for x > y
    function drawLine (x0, x1, y0, y1, fillColor) {
        ctx.fillStyle = fillColor;
        let deltaX = x1 - x0;
        let deltaY = y1 - y0;
        let error = 0;
        let deltaError = Math.abs(deltaY / deltaX)    
        y = y0
        for (let x = x0; x < x1; x++) {
            drawPixel(ctx, x, y, canvasScaleFactor);
            error = error + deltaError;
            if (error >= 0.5) {
                y = y + 1;
                error = error - 1;
            }
        }
    }

    function drawMesh() {
        for (let x = 0; x < canvasWidth; x += 10){
            drawLineForMesh(x, 0, x, canvasHeight);
        }

        for (let y = 0; y < canvasHeight; y += 10) {
            drawLineForMesh(0, y, canvasWidth, y);
        }
    }

    function drawLineForMesh(xStart, yStart, xEnd, yEnd) {
        ctx.beginPath();
        ctx.moveTo(xStart, yStart);
        ctx.lineTo(xEnd, yEnd);
        ctx.stroke();
    }
}
