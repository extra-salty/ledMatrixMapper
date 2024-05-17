import { ColorActions } from '@/types/effects/effect.types';

const useCursor = ({
	colorAction,
	brushSize,
}: {
	colorAction: ColorActions;
	brushSize: number;
}) => {
	const defaultUrl = `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='white' xmlns='http://www.w3.org/2000/svg' version='1.1'`;

	switch (colorAction) {
		case ColorActions.fill:
			return `${defaultUrl} %3E%3Cpath d='M16.56 8.94 7.62 0 6.21 1.41l2.38 2.38-5.15 5.15c-.59.59-.59 1.54 0 2.12l5.5 5.5c.29.29.68.44 1.06.44s.77-.15 1.06-.44l5.5-5.5c.59-.58.59-1.53 0-2.12M5.21 10 10 5.21 14.79 10zM19 11.5s-2 2.17-2 3.5c0 1.1.9 2 2 2s2-.9 2-2c0-1.33-2-3.5-2-3.5M2 20h20v4H2z'%3E%3C/path%3E%3C/svg%3E") 12 12, auto`;
		case ColorActions.pipette:
			return `${defaultUrl} %3E%3Cpath d='m20.71 5.63-2.34-2.34a.9959.9959 0 0 0-1.41 0l-3.12 3.12-1.93-1.91-1.41 1.41 1.42 1.42L3 16.25V21h4.75l8.92-8.92 1.42 1.42 1.41-1.41-1.92-1.92 3.12-3.12c.4-.4.4-1.03.01-1.42M6.92 19 5 17.08l8.06-8.06 1.92 1.92z'/%3E%3C/svg%3E%0A") 0 24, auto`;
		default:
			const cursorSize = brushSize * 20;
			const cursorMiddle = cursorSize / 2;
			const cursorProps = `width='${cursorSize}' height='${cursorSize}'`;
			const circleProps = ` cx='${cursorMiddle}' cy='${cursorMiddle}' r='${
				cursorMiddle - 1
			}'`;

			return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1.1' ${cursorProps} %3E%3Ccircle ${circleProps} stroke='white' stroke-width='2' fill='none'/%3E%3C/svg%3E") ${cursorMiddle} ${cursorMiddle}, auto`;
	}
};

export default useCursor;
