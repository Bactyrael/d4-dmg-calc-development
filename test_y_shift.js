const targetSize = 36;
const cellWidth = 122.5; // (512 - offset) / 4 roughly
const cellHeight = 182;
const scale = targetSize / cellWidth;

console.log("Scale:", scale);

const iconObj = {
    position: "-245px -7801px", // Berú
    size: "512px 9856px"
};

let posMatch = iconObj.position.match(/(-?\d+\.?\d*)px\s+(-?\d+\.?\d*)px/);
let posX = 0, posY = 0;
if (posMatch) {
    let origX = parseFloat(posMatch[1]);
    let origY = parseFloat(posMatch[2]);
    
    posX = origX * scale;
    
    // The cell is cellHeight * scale tall. Our box is targetSize tall.
    let scaledCellHeight = cellHeight * scale;
    let yOffsetToCenter = (scaledCellHeight - targetSize) / 2;
    
    posY = (origY * scale) - yOffsetToCenter;
}

console.log("PosX:", posX, "PosY:", posY);
