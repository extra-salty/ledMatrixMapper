import { ChangeEvent } from 'react';
import { Attributes, ColorT } from '@/types/color/color.types';
import { useBackgroundColor } from './useBackgroundColor';
import styles from './AttributeSlider.module.scss';

const ColorAttributeSlider = ({
	max,
	color,
	id,
	onChange,
}: {
	max: number;
	color: ColorT;
	id: Attributes;
	onChange: (value: number) => void;
}) => {
	const backgroundColor = useBackgroundColor(color, id);

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const value = Number(e.target.value);

		onChange && onChange(value);
	};

	return (
		<div
			className={styles.background}
			style={{
				background: backgroundColor,
			}}
		>
			<input type='range' max={max} value={color[id]} onChange={onChangeHandler} />
		</div>
	);
};

export default ColorAttributeSlider;