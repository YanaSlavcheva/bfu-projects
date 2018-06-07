function scaleSectionClicked() {
    const c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    const canvasWidth = 2000;
    const canvasHeight = 2000;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    const x0 = parseInt(document.getElementById('x0').value);
    const y0 = parseInt(document.getElementById('y0').value);
    const x1 = parseInt(document.getElementById('x1').value);
    const y1 = parseInt(document.getElementById('y1').value);
    const x2 = parseInt(document.getElementById('x2').value);
    const y2 = parseInt(document.getElementById('y2').value);
    const x3 = parseInt(document.getElementById('x3').value);
    const y3 = parseInt(document.getElementById('y3').value);

    //min max values required to know the bounds of the viewport
    const xmin = x0;
    const xmax = x2;
    const ymin = y0;
    const ymax = y2;


    //vertices in the polygon and the new clipped polygon
    const polygonPath = [];
    var clippedPath = [];

    //Determines which edge to clip when mouse is clicked
    var clipEdge = 0;

    //Google "html5 compositing"
    ctx.globalCompositeOperation = 'source-over';

    drawLineForMesh(x0, y0, x1, y1);
    drawLineForMesh(x1, y1, x2, y2);
    drawLineForMesh(x2, y2, x3, y3);
    drawLineForMesh(x3, y3, x0, y0);

    polygonPath.push([100, 400]);
    polygonPath.push([350, 100]);
    polygonPath.push([600, 400]);
    polygonPath.push([400, 400]);
    polygonPath.push([380, 600]);
    polygonPath.push([320, 600]);
    polygonPath.push([300, 400]);
    polygonPath.push([100, 400]);

    //Draw the polygon filled with red
    ctx.fillStyle = "#ff0000";
    drawPolygon(polygonPath);

    c.addEventListener('mousedown', function () {
        clipEdge++;
        clip(polygonPath);
    });

    function drawPolygon(path) {
        ctx.beginPath();

        ctx.moveTo(path[0][0], path[0][1]);
        for (i = 1; i < path.length; i++) {
            ctx.lineTo(path[i][0], path[i][1]);
        }
        ctx.fill();
    }

    function drawLineForMesh(xStart, yStart, xEnd, yEnd) {
        ctx.beginPath();
        ctx.moveTo(xStart, yStart);
        ctx.lineTo(xEnd, yEnd);
        ctx.stroke();
    }

    function clip(path) {
        switch (clipEdge) {
            case 1:
                //We draw a white polygon of same dimensions of the original one to erase it
                //Then we draw the new clipped polygon with respect to each edge
                clip_left(path);
                ctx.fillStyle = "#ffffff";
                drawPolygon(path);
                ctx.fillStyle = "#00ff00";
                drawPolygon(clippedPath);
                break;

            case 2:
                //slice() clones an array and returns a reference to it
                //After each clipping, the clipped polygon becomes the polygon to be clipped next
                path = clippedPath.slice();
                clippedPath = [];

                clip_top(path);
                ctx.fillStyle = "#ffffff";
                drawPolygon(path);
                ctx.fillStyle = "#0000ff";
                drawPolygon(clippedPath);
                break;

            case 3:
                path = clippedPath.slice();
                clippedPath = [];

                clip_right(path);
                ctx.fillStyle = "#ffffff";
                drawPolygon(path);
                ctx.fillStyle = "#ffff00";
                drawPolygon(clippedPath);
                break;

            case 4:
                path = clippedPath.slice();
                clippedPath = [];

                clip_down(path);
                ctx.fillStyle = "#ffffff";
                drawPolygon(path);
                ctx.fillStyle = "#ff0000";
                drawPolygon(clippedPath);
                break;
        }
    }

    function clip_left(path) {
        console.log("clipping from left");
        console.log("path : " + path);

        for (i = 0; i < path.length - 1; i++) {
            //Both points outside
            if (!isInside(path[i], 'left') && !isInside(path[i + 1], 'left')) {
                console.log('Both ' + path[i] + " and " + path[i + 1] + " are outside the clipping area");
                //No points are added to the clipped polygon
            }

            //Both points inside
            else if (isInside(path[i], 'left') && isInside(path[i + 1], 'left')) {
                console.log('Both ' + path[i] + " and " + path[i + 1] + " are inside the  clipping area");
                //The ith point is added to the clipped polygon
                clippedPath.push(path[i]);
            }

            //ith point is inside and i+1t point is outside
            else if (isInside(path[i], 'left')) {
                if (!isInside(path[i + 1], 'left')) {
                    console.log('Point ' + path[i] + ' is inside and ' + path[i + 1] + ' is outside');

                    //Find the intersection of the point outside left edge and the left edge
                    endpoints = [path[i], path[i + 1]];
                    intersection = find_intersection(endpoints, 'left');
                    console.log("intersects at " + intersection);

                    clippedPath.push(path[i]);
                    clippedPath.push(intersection);
                }
            }

            else if (!isInside(path[i], 'left')) {
                if (isInside(path[i + 1], 'left')) {
                    console.log('Point ' + path[i] + ' is outside and ' + path[i + 1] + ' is inside');

                    endpoints = [path[i], path[i + 1]];
                    intersection = find_intersection(endpoints, 'left');
                    console.log("intersects at " + intersection);

                    clippedPath.push(intersection);
                    clippedPath.push(path[i + 1]);
                }
            }
        }

        //So that the clipped polygon is closed
        clippedPath.push(clippedPath[0]);
    }

    function clip_top(path) {
        for (i = 0; i < path.length - 1; i++) {
            if (!isInside(path[i], 'top') && !isInside(path[i + 1], 'top')) {
                //No points are added to the clipped polygon
            }
            else if (isInside(path[i], 'top') && isInside(path[i + 1], 'top')) {
                clippedPath.push(path[i]);
            }
            else if (isInside(path[i], 'top')) {
                if (!isInside(path[i + 1], 'top')) {
                    endpoints = [path[i], path[i + 1]];
                    intersection = find_intersection(endpoints, 'top');

                    clippedPath.push(path[i]);
                    clippedPath.push(intersection);
                }
            }
            else if (!isInside(path[i], 'top')) {
                if (isInside(path[i + 1], 'top')) {
                    endpoints = [path[i], path[i + 1]];
                    intersection = find_intersection(endpoints, 'top');

                    clippedPath.push(intersection);
                    clippedPath.push(path[i + 1]);
                }
            }
        }

        clippedPath.push(clippedPath[0]);
    }

    function clip_right(path) {
        console.log("clippingfrom right");

        for (i = 0; i < path.length - 1; i++) {
            if (!isInside(path[i], 'right') && !isInside(path[i + 1], 'right')) {
            }

            else if (isInside(path[i], 'right') && isInside(path[i + 1], 'right')) {
                clippedPath.push(path[i]);
            }

            else if (isInside(path[i], 'right')) {
                if (!isInside(path[i + 1], 'right')) {
                    endpoints = [path[i], path[i + 1]];
                    intersection = find_intersection(endpoints, 'right');

                    clippedPath.push(path[i]);
                    clippedPath.push(intersection);
                }
            }
            else if (!isInside(path[i], 'right')) {
                if (isInside(path[i + 1], 'right')) {
                    endpoints = [path[i], path[i + 1]];
                    intersection = find_intersection(endpoints, 'right');

                    clippedPath.push(intersection);
                    clippedPath.push(path[i + 1]);
                }
            }
        }
        clippedPath.push(clippedPath[0]);
    }

    function clip_down(path) {
        console.log("clipping down");
        for (i = 0; i < path.length - 1; i++) {
            if (!isInside(path[i], 'down') && !isInside(path[i + 1], 'down')) {

            }
            else if (isInside(path[i], 'down') && isInside(path[i + 1], 'down')) {
                clippedPath.push(path[i]);
            }
            else if (isInside(path[i], 'down')) {
                if (!isInside(path[i + 1], 'down')) {
                    endpoints = [path[i], path[i + 1]];
                    intersection = find_intersection(endpoints, 'down');

                    clippedPath.push(path[i]);
                    clippedPath.push(intersection);
                }
            }
            else if (!isInside(path[i], 'down')) {
                if (isInside(path[i + 1], 'down')) {
                    endpoints = [path[i], path[i + 1]];
                    intersection = find_intersection(endpoints, 'down');

                    clippedPath.push(intersection);
                    clippedPath.push(path[i + 1]);
                }
            }

        }
        clippedPath.push(clippedPath[0]);
    }

    function find_intersection(endpoints, edge) {
        //endpoints - the end points of an edge of the polygon
        //edge - the edge with which we want to calculate the intersection with

        intersection = [];

        //all lines are of the form y = mx + c
        //m = (y2-y1)/(x2-x1)

        start = endpoints[0];
        end = endpoints[1];

        const x1 = start[0];
        const y1 = start[1];
        const x2 = end[0];
        const y2 = end[1];

        m = (y2 - y1) / (x2 - x1);

        //find the constant c

        const c = y1 - m * x1;

        //To find intersection with left edge
        if (edge == 'left') {
            intersection[0] = xmin;
            intersection[1] = m * xmin + c;
        }
        else if (edge == 'right') {
            intersection[0] = xmax;
            intersection[1] = m * xmax + c;
        }
        else if (edge == 'top') {
            intersection[0] = (ymin - c) / m;
            intersection[1] = ymin;
        }
        else if (edge == 'down') {
            intersection[0] = (ymax - c) / m;
            intersection[1] = ymax;
        }

        return intersection;
    }

    //returns true if the point is inside with respect to a particular edge
    function isInside(point, orientation) {
        x = point[0];
        y = point[1];

        if (orientation == 'left') {
            if (x > xmin)
                return true;
            else
                return false;
        }

        else if (orientation == 'top') {
            if (y > ymin)
                return true;
            else
                return false;
        }

        else if (orientation == 'right') {
            if (x < xmax)
                return true;
            else
                return false;
        }

        else if (orientation == 'down') {
            if (y < ymax)
                return true;
            else
                return false;
        }
    }
}
