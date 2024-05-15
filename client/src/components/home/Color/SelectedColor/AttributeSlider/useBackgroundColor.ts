import { Attributes, ColorT } from '@/types/color/color.types';

export const useBackgroundColor = (color: ColorT, attribute: Attributes) => {
	const { hue: h, saturation: s, lightness: l } = color;

	switch (attribute) {
		case Attributes.hue:
			return `linear-gradient(to right, ${Array.from(
				{ length: 36 },
				(_, i) => `hsl(${i * 10} ${s}% ${l}% / ${(l / 100) * 2})`,
			).join(',')})`;

		case Attributes.saturation:
			return `linear-gradient(
        to right,
        hsl(${h} 0% ${l}% / ${(l / 100) * 2}),
        hsl(${h} 100% ${l}% / ${(l / 100) * 2})
        )`;

		case Attributes.lightness:
			return `linear-gradient(
      to right,
      hsl(${h} ${s}% 0% / 0),
      hsl(${h} ${s}% 50%),
      hsl(${h} ${s}% 100%)
      )`;
		default:
			return '';
	}
};
