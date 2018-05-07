function calculateCmyk() {
    const rValue = document.getElementById('r').value;
    const gValue = document.getElementById('g').value;
    const bValue = document.getElementById('b').value;

    const R = normalizeValue(rValue);
    const G = normalizeValue(gValue);
    const B = normalizeValue(bValue);

    const K = 1 - Math.max(R, G, B);
    const C = calculateValue(R, K);
    const M = calculateValue(G, K);
    const Y = calculateValue(B, K);

    const resultCmyk = 'CMYK -> ' + prettify(C) + '/ ' + prettify(M) + '/ ' + prettify(Y) + '/ ' + prettify(K);

    document.getElementById('convertRgbToCmykResult').innerHTML = resultCmyk;
}

function normalizeValue(originalValue) {
    return originalValue / 255;
}

function calculateValue(parameter, kValue) {
    const divisor = 1 - kValue;
    return (1 - parameter - kValue) / divisor;
}

function prettify(value) {
    return value.toFixed(2);
}

function calculateRgb() {
    const cValue = document.getElementById('c').value;
    const mValue = document.getElementById('m').value;
    const yValue = document.getElementById('y').value;
    const kValue = document.getElementById('k').value;

    const multiplier = 1 - kValue;
    const R = 255 * (1 - cValue) * multiplier;
    const G = 255 * (1 - mValue) * multiplier;
    const B = 255 * (1 - yValue) * multiplier;

    const resultRgb = 'RGB -> ' + prettify(R) + '/ ' + prettify(G) + '/ ' + prettify(B);

    document.getElementById('convertCmykToRgbResult').innerHTML = resultRgb;
}
