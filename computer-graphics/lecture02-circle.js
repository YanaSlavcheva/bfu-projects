function drawCircleClicked() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, 200, 200);

    const canvasScaleFactor = 10;

    const xCenter = parseInt(document.getElementById('x').value);
    const yCenter = parseInt(document.getElementById('y').value);
    const radius = parseInt(document.getElementById('r').value);

    drawCircle(xCenter, yCenter, radius);

    // the canvas is scaled -> 1 pixel is actually rectangle 10 x 10 pixels
    function drawPixel(xCoordinate, yCoordinate) {
        ctx.fillRect(xCoordinate * canvasScaleFactor, yCoordinate * canvasScaleFactor, canvasScaleFactor, canvasScaleFactor);
    }

    function drawCircle(xCenter, yCenter, radius) {
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
}
