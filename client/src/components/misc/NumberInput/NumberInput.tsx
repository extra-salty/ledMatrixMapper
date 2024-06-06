import { ChangeEvent, memo, useRef, useState, FocusEvent, ReactElement } from 'react';
import Image from 'next/image';
import styles from './NumberInput.module.scss';
import { SvgIconProps } from '@mui/material';

export type NumberInputProps = {
	controlledValue: number;
	min?: number;
	max?: number;
	unit?: string;
	hasIncrements?: boolean;
	incrementAlwaysVisible?: boolean;
	incrementValue?: number;
	hasBorder?: boolean;
	disabled?: boolean;
	align?: 'left' | 'right';
	icon?: ReactElement<SvgIconProps>;
	onChange?: (value: number) => void;
	onBlur?: (value: number) => void;
};

const NumberInput = ({
	controlledValue,
	min = 0,
	max = 100,
	hasIncrements,
	incrementAlwaysVisible,
	incrementValue = 1,
	hasBorder,
	unit,
	align = 'left',
	disabled = false,
	icon,
	onChange,
	onBlur,
}: NumberInputProps) => {
	const ref = useRef<HTMLInputElement>(null);

	const [internalValue, setInternalValue] = useState(controlledValue);
	const isControlled = onChange !== undefined;
	const value = isControlled ? controlledValue : internalValue;

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = Number(e.target.value);
		const limitedValue = limitValue(value);

		if (isControlled) {
			onChange(limitedValue);
		} else {
			setInternalValue(limitedValue);
		}
	};

	const handleOnBlur = (event: FocusEvent<HTMLDivElement>) => {
		onBlur && onBlur(value);
	};

	const handleOnIncrement = (value: number, increase: 'increase' | 'decrease') => {
		ref.current && ref.current.focus();

		// if (value === internalValue) return;

		const newValue =
			increase === 'increase' ? value + incrementValue : value - incrementValue;
		const limitedValue = limitValue(newValue);

		if (isControlled) {
			onChange(limitedValue);
		} else {
			setInternalValue(limitedValue);
		}
	};

	const limitValue = (value: number) => Math.max(min, Math.min(max, value));

	const handleMouseDown = (event: React.MouseEvent) => {
		event.preventDefault();
		ref.current?.focus();
	};

	return (
		<div className={styles.numberInput} onBlur={handleOnBlur}>
			{icon}
			<input
				ref={ref}
				type='text'
				pattern='[0-9]*'
				min={min}
				max={max}
				value={value}
				disabled={disabled}
				onChange={handleOnChange}
				style={{ textAlign: align === 'left' ? 'left' : 'right' }}
			/>
			{unit && <span className={styles.unit}>{unit}</span>}
			{hasIncrements && (
				<div
					className={`${styles.increment} ${
						incrementAlwaysVisible ? styles.alwaysVisible : ''
					}`}
				>
					<Image
						src={'/increment.svg'}
						alt='increase'
						width={8}
						height={8}
						className={`${styles.enlarge} ${styles.alwaysVisible}`}
						onClick={() => handleOnIncrement(value, 'increase')}
						onMouseDown={handleMouseDown}
					/>
					<Image
						src={'/increment.svg'}
						alt='decrease'
						width={8}
						height={8}
						style={{ rotate: '180deg' }}
						className={styles.enlarge}
						onClick={() => handleOnIncrement(value, 'decrease')}
						onMouseDown={handleMouseDown}
					/>
				</div>
			)}
		</div>
	);
};

export default memo(NumberInput);
