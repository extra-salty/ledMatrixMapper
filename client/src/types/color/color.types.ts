import { SvgIconProps } from '@mui/material';
import { ReactElement } from 'react';

export type ColorT = {
	hue: number;
	saturation: number;
	brightness: number;
};

export type ColorAttributesT = keyof ColorT;

export class Color implements ColorT {
	hue: number;
	saturation: number;
	brightness: number;

	constructor(hue: number, saturation: number, lightness: number) {
		this.hue = hue;
		this.saturation = saturation;
		this.brightness = lightness;
	}
}

export enum Units {
	degree = '°',
	percentage = '%',
	second = 's',
}

export type AttributeType = {
	id: ColorAttributesT;
	value: number;
	max: number;
	unit: string;
	icon: ReactElement<SvgIconProps>;
	background: string;
	onChange: (value: number) => void;
};
