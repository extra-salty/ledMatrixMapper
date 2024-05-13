import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay?: number): T {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

		return () => {
			clearTimeout(timer);
		};
	}, [value, delay]);

	return debouncedValue;
}

// import { useRef, useEffect } from 'react';

// type Timer = ReturnType<typeof setTimeout>;
// type SomeFunction = (...args: any[]) => void;

// export function useDebounce<Func extends SomeFunction>(func: Func, delay = 1000) {
// 	const timer = useRef<Timer>();

// 	useEffect(() => {
// 		return () => {
// 			if (!timer.current) return;
// 			clearTimeout(timer.current);
// 		};
// 	}, []);

// 	const debouncedFunction = ((...args) => {
// 		const newTimer = setTimeout(() => {
// 			func(...args);
// 		}, delay);
// 		clearTimeout(timer.current);
// 		timer.current = newTimer;
// 	}) as Func;

// 	return debouncedFunction;
// }
