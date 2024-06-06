import { FrameCellT, FrameDataT } from '@/types/effect/effect.types';

const pixelateImage = async (imageSrc: string): Promise<FrameDataT | undefined> => {
	return new Promise((resolve) => {
		const image = new Image();
		image.src = imageSrc;

		image.onload = () => {
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');

			if (!ctx) return;

			canvas.width = image.width;
			canvas.height = image.height;

			ctx.drawImage(image, 0, 0, image.width, image.height);

			const matrix: FrameDataT = [];
			const { width, height } = canvas;
			const cellSize = Math.min(width / 24, height / 12);

			for (let x = 0; x < 24; x++) {
				const column: FrameCellT[] = [];

				for (let y = 0; y < 12; y++) {
					const data = ctx.getImageData(
						x * cellSize,
						y * cellSize,
						cellSize,
						cellSize,
					).data;

					let r = 0,
						g = 0,
						b = 0;

					for (let i = 0; i < data.length; i += 4) {
						r += data[i];
						g += data[i + 1];
						b += data[i + 2];
					}

					const pixelCount = data.length / 4;
					r = Math.floor(r / pixelCount);
					g = Math.floor(g / pixelCount);
					b = Math.floor(b / pixelCount);

					// Convert RGB to HSL
					(r /= 255), (g /= 255), (b /= 255);

					const max = Math.max(r, g, b),
						min = Math.min(r, g, b);

					let h = 0,
						s,
						l = (max + min) / 2;

					if (max === min) {
						h = s = 0; // achromatic
					} else {
						const d = max - min;
						s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
						switch (max) {
							case r:
								h = (g - b) / d + (g < b ? 6 : 0);
								break;
							case g:
								h = (b - r) / d + 2;
								break;
							case b:
								h = (r - g) / d + 4;
								break;
						}
						h /= 6;
					}

					column.push({
						color: {
							hue: h * 360,
							saturation: s * 100,
							brightness: l * 100,
						},
						transition: undefined,
					});
				}
				matrix.push(column);
			}

			resolve(matrix);
		};
	});
};

export default pixelateImage;
