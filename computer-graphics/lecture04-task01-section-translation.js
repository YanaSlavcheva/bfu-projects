function translateSectionClicked() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, 200, 150);

    const canvasScaleFactor = 10;

    const x0 = parseInt(document.getElementById('x0').value);
    const x1 = parseInt(document.getElementById('x1').value);
    const y0 = parseInt(document.getElementById('y0').value);
    const y1 = parseInt(document.getElementById('y1').value);
    const m = parseInt(document.getElementById('m').value);
    const n = parseInt(document.getElementById('n').value);

    drawLineWithTranslation(x0, x1, y0, y1, 0, 0, '#000000');
    
    // ctx.clearRect(0, 0, 200, 150);
    drawLineWithTranslation(x0, x1, y0, y1, m, n, '#FF0000');

    // the canvas is scaled -> 1 pixel is actually rectangle 10 x 10 pixels
    function drawPixel(ctx, xCoordinate, yCoordinate, canvasScaleFactor) {
        ctx.fillRect(xCoordinate * canvasScaleFactor, yCoordinate * canvasScaleFactor, canvasScaleFactor, canvasScaleFactor);
    }

    // works only for x > y
    function drawLineWithTranslation(x0, x1, y0, y1, m, n, fillColor) {
        ctx.fillStyle = fillColor;
        x0 = x0 + m;
        x1 = x1 + n;
        let deltaX = x1 - x0;
        let deltaY = y1 - y0;
        let error = 0;
        let deltaError = Math.abs(deltaY / deltaX)    
        y = y0
        for (let x = x0; x < x1; x++) {
            drawPixel(ctx, x, y,canvasScaleFactor);
            error = error + deltaError;
            if (error >= 0.5) {
                y = y + 1;
                error = error - 1;
            }
        }
    }
}
