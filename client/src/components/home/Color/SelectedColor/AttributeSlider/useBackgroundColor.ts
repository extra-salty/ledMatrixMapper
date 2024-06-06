import { ColorT } from '@/types/color/color.types';

export const useBackgroundColor = (color: ColorT) => {
	const { hue, saturation, brightness } = color;

	const satStart = hsvToHsl({ hue, saturation: 0, brightness });
	const satEnd = hsvToHsl({ hue, saturation: 100, brightness });

	const lightnessStart = hsvToHsl({ hue, saturation, brightness: 0 });
	const lightnessEnd = hsvToHsl({ hue, saturation, brightness: 100 });

	return {
		hueBackground: `linear-gradient(to right, ${Array.from({ length: 36 }, (_, i) => {
			const hsl = hsvToHsl({ hue: i * 10, saturation, brightness });

			return hslToString(hsl);
		}).join(',')})`,
		saturationBackground: `linear-gradient(to right, ${hslToString(
			satStart,
		)}, ${hslToString(satEnd)})`,
		brightnessBackground: `linear-gradient(to right, ${hslToString(
			lightnessStart,
		)}, ${hslToString(lightnessEnd)})`,
	};
};

export const hsvToHsl = (hsv: ColorT) => {
	let { hue: h, saturation: s, brightness: v } = hsv;

	s /= 100;
	v /= 100;
	let l = (2 - s) * v;
	let sl = s * v;
	sl /= l <= 1 ? l : 2 - l;
	l /= 2;

	return [h, isNaN(sl) ? 0 : sl * 100, l * 100];
};

export const hslToString = ([h, s, l]: number[]) =>
	`hsl(${h} ${s}% ${l}% / ${(l / 100) * 2})`;
