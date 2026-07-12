const targetSize = 36;
const scale = targetSize / 122;

const iconObj = {
    position: "-245px -5253px",
    size: "512px 9856px"
};

let posMatch = iconObj.position.match(/(-?\d+\.?\d*)px\s+(-?\d+\.?\d*)px/);
let posX = 0, posY = 0;
if (posMatch) {
    posX = parseFloat(posMatch[1]) * scale;
    posY = parseFloat(posMatch[2]) * scale;
}

let sizeMatch = iconObj.size.match(/(\d+\.?\d*)px\s+(\d+\.?\d*)px/);
let sizeX = 512 * scale, sizeY = 9856 * scale;
if (sizeMatch) {
    sizeX = parseFloat(sizeMatch[1]) * scale;
    sizeY = parseFloat(sizeMatch[2]) * scale;
}

console.log("PosX:", posX, "PosY:", posY);
console.log("SizeX:", sizeX, "SizeY:", sizeY);
