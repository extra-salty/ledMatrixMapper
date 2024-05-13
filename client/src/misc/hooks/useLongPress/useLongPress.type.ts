type useLongPressType<T> = {
	delay?: number;
	shouldPreventDefault?: boolean;
	// onClick: (e: React.MouseEvent<T> | React.TouchEvent<T>) => void;
	onClick: (e: React.MouseEvent<T>) => void;
	// onPress: (e: React.MouseEvent<T> | React.TouchEvent<T>) => void;
	onPress: (e: React.MouseEvent<T>) => void;
};

export default useLongPressType;
