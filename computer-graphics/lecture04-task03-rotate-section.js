function rotateSectionClicked() {
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
    const alpha = parseInt(document.getElementById('alpha').value);

    drawLineWithRotation(x0, x1, y0, y1, '#000000');
    
    let x1Rotated = calculateRotatedX(x1, y1, alpha);
    let y1Rotated = calculateRotatedY(x1, y1, alpha);
    drawLineWithRotation(x0, x1Rotated, y0, y1Rotated, '#FF0000');

    // the canvas is scaled -> 1 pixel is actually rectangle 10 x 10 pixels
    function drawPixel(ctx, xCoordinate, yCoordinate, canvasScaleFactor) {
        ctx.fillRect(xCoordinate * canvasScaleFactor, yCoordinate * canvasScaleFactor, canvasScaleFactor, canvasScaleFactor);
    }

    // works only for x > y
    function drawLineWithRotation(x0, x1, y0, y1, fillColor) {
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

    function calculateRotatedX (x, y, alpha) {
        return (x * Math.cos(alpha) - y * Math.sin(alpha));
    }

    function calculateRotatedY (x, y, alpha) {
        return (x * Math.sin(alpha) + y * Math.cos(alpha));
    }

    function drawMesh() {
        for (let x = 0; x < canvasWidth; x += 10){
            drawLine(x, 0, x, canvasHeight);
        }

        for (let y = 0; y < canvasHeight; y += 10) {
            drawLine(0, y, canvasWidth, y);
        }
    }

    function drawLine(xStart, yStart, xEnd, yEnd) {
        ctx.beginPath();
        ctx.moveTo(xStart, yStart);
        ctx.lineTo(xEnd, yEnd);
        ctx.stroke();
    }
}
