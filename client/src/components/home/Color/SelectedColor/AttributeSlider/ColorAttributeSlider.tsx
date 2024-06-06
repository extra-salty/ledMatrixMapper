import { ChangeEvent } from 'react';
import styles from './AttributeSlider.module.scss';

const ColorAttributeSlider = ({
	value,
	max,
	background,
	onChange,
}: {
	value: number;
	max: number;
	background: string;
	onChange: (value: number) => void;
}) => {
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const value = Number(e.target.value);

		onChange && onChange(value);
	};

	return (
		<div
			className={styles.background}
			style={{
				background,
			}}
		>
			<input type='range' max={max} value={value} onChange={onChangeHandler} />
		</div>
	);
};

export default ColorAttributeSlider;
