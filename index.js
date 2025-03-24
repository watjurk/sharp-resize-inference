const sharp = require("sharp");

let o = sharp("./image.jpeg");
const targetWidth = 496;
o.metadata((_, metadata) => {
	const imageWidth = metadata.width;
	const imageHeight = metadata.height;
	const inferredHeight = inferHeight(imageWidth, imageHeight, targetWidth);

	console.log(`Inferred height is ${inferredHeight}`);
});

o = o.resize({ width: targetWidth });
o.toFile("./image_resized.jpeg", (_, info) => {
	console.log(`Image height after resizing is ${info.height}`);
});

// https://github.com/lovell/sharp/blob/7c631c0787915416e20a567a039516e99c81c42d/src/pipeline.cc#L176-L184
function inferHeight(currentWidth, currentHeight, newWidth) {
	const xFactor = currentWidth / newWidth;
	const newHeightNotRounded = currentHeight / xFactor;
	const newHeight = Math.round(newHeightNotRounded);
	return newHeight;
}
