function scaleSectionClicked() {
    const c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    //ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    const input = document.getElementById('input');
    input.addEventListener('change', handleFiles);

    //min max values required to know the bounds of the viewport
    function handleFiles(e) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        const files = e.target.files;
        for (let i = 0; i < files.length; i++) {
            const img = new Image;
            img.x = i * 100;
            img.onload = function () {
                ctx.drawImage(this, 0, 0);
            }
            img.src = URL.createObjectURL(files[i]);
        }
    }
}
