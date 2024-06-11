import { SvgIconProps } from '@mui/material';
import { MouseEvent, ReactElement, SyntheticEvent } from 'react';

export type ActionButtonProps = {
	text?: string;
	key?: string;
	icon?: ReactElement<SvgIconProps>;
	hidden?: boolean;
	disabled?: boolean;
	tooltip?: string;
	onClick: (e: MouseEvent<HTMLElement>) => void;
};

export type SliderPropsT = {
	value: number;
	text: string;
	min: number;
	max: number;
	step: number;
	icon: ReactElement<SvgIconProps>;
	unit?: string;
	onChange: (
		event: Event | SyntheticEvent<Element, Event>,
		value: number | number[],
	) => void;
};

export type ToggleButtonProps = {
	value: string;
	icon: ReactElement<SvgIconProps>;
	disabled?: boolean;
	tootlip?: string;
};
