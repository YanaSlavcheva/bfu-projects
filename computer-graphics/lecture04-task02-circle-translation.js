function drawCircleTranslatedClicked() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    const canvasWidth = 200;
    const canvasHeight = 200;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawMesh();

    const canvasScaleFactor = 10;

    const xCenter = parseInt(document.getElementById('x').value);
    const yCenter = parseInt(document.getElementById('y').value);
    const radius = parseInt(document.getElementById('r').value);
    const m = parseInt(document.getElementById('m').value);
    const n = parseInt(document.getElementById('n').value);

    drawCircleWithTranslation(xCenter, yCenter, radius, 0, 0, '#000000');
    drawCircleWithTranslation(xCenter, yCenter, radius, m, n, '#FF0000');

    // the canvas is scaled -> 1 pixel is actually rectangle 10 x 10 pixels
    function drawPixel(xCoordinate, yCoordinate) {
        ctx.fillRect(xCoordinate * canvasScaleFactor, yCoordinate * canvasScaleFactor, canvasScaleFactor, canvasScaleFactor);
    }

    function drawCircleWithTranslation(xCenter, yCenter, radius, m, n, fillColor) {
        ctx.fillStyle = fillColor;
        xCenter = xCenter + m;
        yCenter = yCenter + n;

        xStart = 0;
        yStart = radius;
        sum = 3 - 2*radius;
        while(xStart <= yStart) {
            setEight(xStart, yStart, xCenter, yCenter);
            if (sum <= 0) {
                sum = sum + 4*xStart + 6;
            } else {
                sum = sum + 4*(xStart - yStart) + 10;
                yStart--;
            }

            xStart++;
        }
    }

    function setEight(x, y, xCenter, yCenter) {
        drawPixel(x + xCenter, y + yCenter);
        drawPixel (x * (-1) + xCenter, y + yCenter);
        drawPixel (x + xCenter, y * (-1) + yCenter);
        drawPixel (x * (-1) + xCenter, y * (-1) + yCenter);
        drawPixel (y + xCenter, x + yCenter);
        drawPixel (y * (-1) + xCenter, x + yCenter);
        drawPixel (y + xCenter, x * (-1) + yCenter);
        drawPixel (y * (-1) + xCenter, x * (-1) + yCenter);
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
