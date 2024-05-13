export type ColorT = {
	hue: number;
	saturation: number;
	lightness: number;
};

export class Color implements ColorT {
	hue: number;
	saturation: number;
	lightness: number;

	constructor(hue: number, saturation: number, lightness: number) {
		this.hue = hue;
		this.saturation = saturation;
		this.lightness = lightness;
	}
}
